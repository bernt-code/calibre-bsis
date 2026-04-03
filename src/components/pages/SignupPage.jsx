import React, { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useSchool } from "../../contexts/SchoolContext";

const LABEL_STYLE = {
  display: "block",
  color: "#555",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: 6,
  fontWeight: 600,
};

const SECTION_LABEL = {
  color: "#00FF41",
  fontSize: 9,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  marginBottom: 14,
  marginTop: 28,
  fontWeight: 700,
};

function inputStyle(focused) {
  return {
    width: "100%",
    padding: "10px 12px",
    background: "#111",
    border: `1px solid ${focused ? "#00FF41" : "#2a2a2a"}`,
    borderRadius: 4,
    color: "#e8e8e8",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  };
}

export default function SignupPage({ onGoToLogin }) {
  const { provisionSchool } = useSchool();

  const [schoolName, setSchoolName] = useState("");
  const [country, setCountry]       = useState("");
  const [city, setCity]             = useState("");
  const [website, setWebsite]       = useState("");
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [focused, setFocused]       = useState(null); // name of focused field
  const [error, setError]           = useState(null);
  const [loading, setLoading]       = useState(false);

  const focus = (name) => () => setFocused(name);
  const blur  = ()     => setFocused(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Client-side validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create the auth user
      const { data: authData, error: authErr } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authErr) {
        setError(authErr.message);
        setLoading(false);
        return;
      }

      if (!authData?.user) {
        setError("Account created — please check your email to confirm before signing in.");
        setLoading(false);
        return;
      }

      // 2. Provision the school (insert school + user_schools + seed school_data)
      await provisionSchool(authData.user.id, {
        name: schoolName,
        country,
        city,
        website: website || null,
      });

      // Auth state change fires → App re-renders with user + activeSchool set
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#131313",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        padding: 24,
      }}
    >
      <div
        style={{
          width: 420,
          padding: "44px 40px",
          background: "#1a1a1a",
          border: "1px solid #222",
          borderRadius: 8,
        }}
      >
        {/* Wordmark */}
        <div style={{ marginBottom: 8, textAlign: "center" }}>
          <div
            style={{
              color: "#00FF41",
              fontSize: 10,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            BSIS by
          </div>
          <div
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            Calibre
          </div>
          <div style={{ color: "#444", fontSize: 12, marginTop: 10, lineHeight: 1.5 }}>
            See your BSIS data in action — set up your demo in 60 seconds.
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* School info */}
          <div style={SECTION_LABEL}>Your school</div>

          <div style={{ marginBottom: 14 }}>
            <label style={LABEL_STYLE}>School name</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              required
              placeholder="University of Example"
              style={inputStyle(focused === "schoolName")}
              onFocus={focus("schoolName")}
              onBlur={blur}
            />
          </div>

          <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
            <div style={{ flex: 1 }}>
              <label style={LABEL_STYLE}>Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                placeholder="Finland"
                style={inputStyle(focused === "country")}
                onFocus={focus("country")}
                onBlur={blur}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={LABEL_STYLE}>City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                placeholder="Helsinki"
                style={inputStyle(focused === "city")}
                onFocus={focus("city")}
                onBlur={blur}
              />
            </div>
          </div>

          <div style={{ marginBottom: 4 }}>
            <label style={LABEL_STYLE}>
              Website{" "}
              <span style={{ color: "#333", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>
                (optional)
              </span>
            </label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://www.example.edu"
              style={inputStyle(focused === "website")}
              onFocus={focus("website")}
              onBlur={blur}
            />
          </div>

          {/* Account info */}
          <div style={SECTION_LABEL}>Your account</div>

          <div style={{ marginBottom: 14 }}>
            <label style={LABEL_STYLE}>Work email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@institution.edu"
              style={inputStyle(focused === "email")}
              onFocus={focus("email")}
              onBlur={blur}
            />
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={LABEL_STYLE}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete="new-password"
              placeholder="Min. 6 characters"
              style={inputStyle(focused === "password")}
              onFocus={focus("password")}
              onBlur={blur}
            />
          </div>

          {error && (
            <div
              style={{
                padding: "10px 12px",
                background: "rgba(220, 38, 38, 0.08)",
                border: "1px solid rgba(220, 38, 38, 0.25)",
                borderRadius: 4,
                color: "#f87171",
                fontSize: 13,
                marginBottom: 20,
                lineHeight: 1.5,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "11px",
              background: loading ? "#009924" : "#00FF41",
              border: "none",
              borderRadius: 4,
              color: "#0a0a0a",
              fontSize: 14,
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.03em",
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
          >
            {loading ? "Setting up your demo…" : "Create demo account →"}
          </button>
        </form>

        {/* Sign in link */}
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            color: "#444",
            fontSize: 13,
          }}
        >
          Already have an account?{" "}
          <button
            onClick={onGoToLogin}
            style={{
              background: "none",
              border: "none",
              color: "#00FF41",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "inherit",
              padding: 0,
              textDecoration: "underline",
              textDecorationColor: "rgba(0,255,65,0.3)",
            }}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
