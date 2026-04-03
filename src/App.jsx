import React, { useState, useEffect, useRef, useCallback } from "react";
import { DIMENSIONS, NAV_ITEMS, PRIMARY_COLOR } from "./lib/constants";
import { getDimensionCompletion, getOverallCompletion } from "./lib/completion";

// Auth + school state
import { useAuth } from "./contexts/AuthContext";
import { useSchool } from "./contexts/SchoolContext";

// Auth / school-selection screens
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import SchoolPicker from "./components/pages/SchoolPicker";

// BSIS pages
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import SchoolProfile from "./components/pages/SchoolProfile";
import P1Financial from "./components/pages/P1Financial";
import P2Educational from "./components/pages/P2Educational";
import P3BusinessDev from "./components/pages/P3BusinessDev";
import P4Intellectual from "./components/pages/P4Intellectual";
import P5Ecosystem from "./components/pages/P5Ecosystem";
import P6Societal from "./components/pages/P6Societal";
import P7Image from "./components/pages/P7Image";
import { SetupScrape, CVCollection, DataSources, MediaIntel, Export } from "./components/pages/ToolPages";

import "./styles/app.css";

/**
 * Loading splash — shown only while Supabase resolves the session on first load.
 */
function LoadingScreen() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#131313",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        color: "#333",
        fontSize: 14,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ color: "#00FF41", fontSize: 22, marginBottom: 16 }}>◉</div>
        <div>Initialising Calibre…</div>
      </div>
    </div>
  );
}

/**
 * Root App component.
 *
 * Auth gate:
 *   1. authLoading  → LoadingScreen (session not yet resolved)
 *   2. !user        → LoginPage
 *   3. !activeSchool → SchoolPicker
 *   4. schoolData loading → LoadingScreen
 *   5. Ready        → main app (sidebar + content)
 */
export default function App() {
  const { user, loading: authLoading, signOut } = useAuth();
  const {
    activeSchool,
    setActiveSchool,
    schoolData,
    setSchoolData,
    saveSchoolData,
    saving,
    saveError,
  } = useSchool();

  const [currentPage, setCurrentPage] = useState("home");
  const [showSignup, setShowSignup]   = useState(false);
  const mainRef = useRef(null);

  // ── Auto-save to Supabase on data change ──────────────────────────────────
  useEffect(() => {
    if (!schoolData || !activeSchool) return;
    const timer = setTimeout(() => {
      saveSchoolData(schoolData).catch(console.error);
    }, 1000);
    return () => clearTimeout(timer);
  }, [schoolData, activeSchool]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Field setter (matches existing page API) ──────────────────────────────
  const createFieldSetter = useCallback(
    (sectionId) => (fieldName, fieldValue) => {
      setSchoolData((prev) => ({
        ...prev,
        [sectionId]: { ...prev[sectionId], [fieldName]: fieldValue },
      }));
    },
    [setSchoolData]
  );

  // ── Navigate + scroll to top ──────────────────────────────────────────────
  const goToPage = useCallback((pageId) => {
    setCurrentPage(pageId);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // ── Auth gate ─────────────────────────────────────────────────────────────
  if (authLoading) return <LoadingScreen />;
  if (!user) {
    if (showSignup) {
      return <SignupPage onGoToLogin={() => setShowSignup(false)} />;
    }
    return <LoginPage onGoToSignup={() => setShowSignup(true)} />;
  }
  if (!activeSchool) return <SchoolPicker />;
  if (!schoolData)   return <LoadingScreen />;

  // ── Main app ──────────────────────────────────────────────────────────────
  const data = schoolData;
  const overallCompletion = getOverallCompletion(data);
  const currentNav = NAV_ITEMS.find((item) => item.id === currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage goToPage={goToPage} />;
      case "dashboard":
        return <Dashboard data={data} goToPage={goToPage} />;
      case "setup":
        return <SetupScrape data={data} setField={createFieldSetter("school")} />;
      case "cvs":
        return <CVCollection />;
      case "school":
        return <SchoolProfile data={data.school || {}} setField={createFieldSetter("school")} />;
      case "p1":
        return <P1Financial data={data.p1 || {}} setField={createFieldSetter("p1")} />;
      case "p2":
        return <P2Educational data={data.p2 || {}} setField={createFieldSetter("p2")} />;
      case "p3":
        return <P3BusinessDev data={data.p3 || {}} setField={createFieldSetter("p3")} />;
      case "p4":
        return <P4Intellectual data={data.p4 || {}} setField={createFieldSetter("p4")} />;
      case "p5":
        return <P5Ecosystem data={data.p5 || {}} setField={createFieldSetter("p5")} />;
      case "p6":
        return <P6Societal data={data.p6 || {}} setField={createFieldSetter("p6")} />;
      case "p7":
        return <P7Image data={data.p7 || {}} setField={createFieldSetter("p7")} />;
      case "sources":
        return <DataSources />;
      case "media":
        return <MediaIntel />;
      case "export":
        return <Export data={data} />;
      default:
        return <HomePage goToPage={goToPage} />;
    }
  };

  return (
    <>
      <div className="app">
        {/* ── Sidebar ──────────────────────────────────────────────────── */}
        <aside className="sidebar">
          <div className="sb-brand">
            <div className="sb-wordmark">
              <span className="sb-wordmark-bsis">BSIS</span>
              <span className="sb-wordmark-for">by</span>
              <span>Calibre</span>
            </div>
            <div className="sb-tagline">Automated impact evidence.</div>
          </div>

          {/* Active school indicator */}
          <div
            style={{
              padding: "10px 16px",
              background: "#1a1a1a",
              borderTop: "1px solid #1e1e1e",
              borderBottom: "1px solid #1e1e1e",
              marginBottom: 4,
            }}
          >
            <div
              style={{
                color: "#00FF41",
                fontSize: 9,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: 3,
              }}
            >
              Active school
            </div>
            <div
              style={{
                color: "#ccc",
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {activeSchool.name}
            </div>
          </div>

          <div className="sb-progress">
            <div className="sb-prog-row">
              <span>Progress</span>
              <strong>{overallCompletion}%</strong>
            </div>
            <div className="prog-track">
              <div className="prog-fill" style={{ width: overallCompletion + "%" }} />
            </div>
          </div>

          <nav className="sb-nav">
            {/* Home */}
            <div
              className={`nav-item${currentPage === "home" ? " active" : ""}`}
              onClick={() => goToPage("home")}
            >
              <div className="nav-icon">●</div>
              <div className="nav-label" style={{ fontWeight: 700 }}>Home</div>
            </div>

            {/* Collection */}
            <div className="sb-sec-lbl">Collection</div>
            {["dashboard", "setup", "cvs"].map((id) => {
              const nav = NAV_ITEMS.find((item) => item.id === id);
              return (
                <div
                  key={id}
                  className={`nav-item${currentPage === id ? " active" : ""}`}
                  onClick={() => goToPage(id)}
                >
                  <div className="nav-icon">{nav.icon}</div>
                  <div className="nav-label">{nav.label}</div>
                </div>
              );
            })}

            {/* BSIS Dimensions */}
            <div className="sb-sec-lbl">BSIS Dimensions</div>
            {DIMENSIONS.map((dim) => {
              const completion = getDimensionCompletion(data, dim.id);
              return (
                <div
                  key={dim.id}
                  className={`nav-item${currentPage === dim.id ? " active" : ""}`}
                  onClick={() => goToPage(dim.id)}
                >
                  <div className="nav-icon">{dim.icon}</div>
                  <div className="nav-label">{dim.label}</div>
                  <div className="nav-pct">
                    {completion > 0 ? completion + "%" : ""}
                  </div>
                </div>
              );
            })}

            {/* Tools */}
            <div className="sb-sec-lbl">Tools</div>
            {["sources", "media", "export"].map((id) => {
              const nav = NAV_ITEMS.find((item) => item.id === id);
              return (
                <div
                  key={id}
                  className={`nav-item${currentPage === id ? " active" : ""}`}
                  onClick={() => goToPage(id)}
                >
                  <div className="nav-icon">{nav.icon}</div>
                  <div className="nav-label">{nav.label}</div>
                </div>
              );
            })}
          </nav>

          {/* Footer — save status, switch school, sign out */}
          <div className="sb-footer">
            <div
              className="sb-saved"
              style={{ marginBottom: 8, color: saveError ? "#f87171" : undefined }}
            >
              {saving ? "Saving…" : saveError ? "⚠ Save failed" : "Saved to cloud"}
            </div>

            <button
              className="btn btn-ghost btn-sm"
              style={{ width: "100%", marginBottom: 6 }}
              onClick={() => goToPage("export")}
            >
              ↓ Export report
            </button>

            <button
              className="btn btn-ghost btn-sm"
              style={{ width: "100%", marginBottom: 6 }}
              onClick={() => setActiveSchool(null)}
            >
              ⇄ Switch school
            </button>

            <button
              className="btn btn-ghost btn-sm"
              style={{ width: "100%", color: "#555" }}
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </aside>

        {/* ── Main content ─────────────────────────────────────────────── */}
        <main className="main" ref={mainRef}>
          <div className="topbar">
            <div className="topbar-l">{currentNav?.label}</div>
            <div className="topbar-r">
              <span
                className="topbar-saved"
                style={saveError ? { color: "#f87171" } : undefined}
              >
                {saving ? "saving…" : saveError ? "save failed" : "auto-saved"}
              </span>
              <button
                className="btn btn-green btn-sm"
                onClick={() => goToPage("export")}
              >
                Export
              </button>
            </div>
          </div>

          <div className="content">{renderPage()}</div>
        </main>
      </div>
    </>
  );
}
