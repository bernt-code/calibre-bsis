import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext";
import { DEFAULT_DATA } from "../lib/dataModel";

const SchoolContext = createContext(null);

/**
 * Provides:
 *   - schools          — list of schools the current user can access
 *   - activeSchool     — the currently selected school object
 *   - setActiveSchool  — select a school and load its BSIS data
 *   - schoolData       — the full BSIS data blob for the active school
 *   - setSchoolData    — update schoolData in memory (triggers auto-save in App)
 *   - saveSchoolData   — persist schoolData to Supabase (upsert)
 *   - provisionSchool  — create a new school + membership + seed data (self-service signup)
 *   - loadingSchools   — true while fetching the user's school list
 *   - saving           — true while a Supabase write is in-flight
 */
export function SchoolProvider({ children }) {
  const { user } = useAuth();

  const [schools, setSchools]               = useState([]);
  const [activeSchool, setActiveSchoolState] = useState(null);
  const [schoolData, setSchoolData]         = useState(null);
  const [loadingSchools, setLoadingSchools] = useState(false);
  const [saving, setSaving]                 = useState(false);
  const [saveError, setSaveError]           = useState(false);

  // Ref keeps fetchSchools from using a stale activeSchool closure
  const activeSchoolRef = useRef(null);

  // ── Load the user's accessible schools ────────────────────────────────────
  useEffect(() => {
    if (!user) {
      setSchools([]);
      setActiveSchoolState(null);
      activeSchoolRef.current = null;
      setSchoolData(null);
      return;
    }

    const fetchSchools = async () => {
      setLoadingSchools(true);

      const { data, error } = await supabase
        .from("user_schools")
        .select("role, schools(*)")
        .eq("user_id", user.id);

      if (!error && data) {
        const list = data.map((row) => ({ ...row.schools, role: row.role }));
        setSchools(list);

        // Auto-select if the user has exactly one school and none is active yet.
        // The ref check avoids a stale closure issue when provisionSchool has
        // already set the active school before this fetch completes.
        if (list.length === 1 && !activeSchoolRef.current) {
          _loadSchoolData(list[0]);
        }
      }

      setLoadingSchools(false);
    };

    fetchSchools();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Internal helper: fetch + set school data ──────────────────────────────
  const _loadSchoolData = async (school) => {
    setActiveSchoolState(school);
    activeSchoolRef.current = school;
    setSchoolData(null); // clear while loading

    const { data, error } = await supabase
      .from("school_data")
      .select("data")
      .eq("school_id", school.id)
      .maybeSingle();

    if (!error && data?.data) {
      setSchoolData(data.data);
    } else {
      setSchoolData(DEFAULT_DATA);
    }
  };

  // ── Public: select a school (or pass null to deselect) ───────────────────
  const setActiveSchool = async (school) => {
    if (!school) {
      setActiveSchoolState(null);
      activeSchoolRef.current = null;
      setSchoolData(null);
      return;
    }
    await _loadSchoolData(school);
  };

  // ── Persist the current data blob to Supabase ─────────────────────────────
  const saveSchoolData = async (data) => {
    if (!activeSchool || !user) return;

    setSaving(true);
    setSaveError(false);

    const { error } = await supabase.from("school_data").upsert(
      {
        school_id: activeSchool.id,
        data,
        updated_by: user.id,
      },
      { onConflict: "school_id" }
    );

    if (error) {
      console.error("saveSchoolData failed:", error);
      setSaveError(true);
    }

    setSaving(false);
  };

  // ── Self-service signup: create school + membership + seed data ────────────
  /**
   * Called from SignupPage right after supabase.auth.signUp succeeds.
   * Takes the new user's ID directly (auth context user may not be set yet).
   *
   * @param {string} userId  - the newly created auth.users.id
   * @param {{ name, country, city, website }} schoolInfo
   */
  const provisionSchool = async (userId, schoolInfo) => {
    // 1 + 2. Insert school + link user as admin via SECURITY DEFINER function
    //        (bypasses RLS so this works even before the session is fully established)
    const { data: schoolId, error: rpcErr } = await supabase.rpc("provision_demo_school", {
      p_user_id: userId,
      p_name:    schoolInfo.name,
      p_country: schoolInfo.country,
      p_city:    schoolInfo.city,
      p_website: schoolInfo.website || "",
    });

    if (rpcErr) { console.error("provisionSchool: rpc failed", rpcErr); throw rpcErr; }

    // 3. Seed school_data with sample data personalised to the prospect's school
    const seedData = {
      ...DEFAULT_DATA,
      school: {
        ...DEFAULT_DATA.school,
        name:    schoolInfo.name,
        country: schoolInfo.country,
        city:    schoolInfo.city,
        website: schoolInfo.website || DEFAULT_DATA.school.website,
      },
    };

    const { error: sdErr } = await supabase
      .from("school_data")
      .insert({
        school_id:  schoolId,
        data:       seedData,
        updated_by: userId,
      });

    if (sdErr) { console.error("provisionSchool: school_data insert failed", sdErr); throw sdErr; }

    // 4. Update local state immediately — no need to wait for a re-fetch
    const newSchool = {
      id:          schoolId,
      name:        schoolInfo.name,
      country:     schoolInfo.country,
      city:        schoolInfo.city,
      website:     schoolInfo.website || null,
      bsis_status: "collecting",
      role:        "admin",
    };
    setSchools([newSchool]);
    setActiveSchoolState(newSchool);
    activeSchoolRef.current = newSchool; // prevent fetchSchools from re-selecting
    setSchoolData(seedData);
  };

  return (
    <SchoolContext.Provider
      value={{
        schools,
        activeSchool,
        setActiveSchool,
        schoolData,
        setSchoolData,
        saveSchoolData,
        provisionSchool,
        loadingSchools,
        saving,
        saveError,
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
}

export function useSchool() {
  return useContext(SchoolContext);
}
