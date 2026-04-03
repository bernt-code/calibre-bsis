import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

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

const LABEL_STYLE = {
  display: "block",
  color: "#555",
  fontSize: 11,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  marginBottom: 6,
  fontWeight: 600,
};

export default function LoginPage({ onGoToSignup }) {
  const { signIn } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [focused, setFocused]   = useState(null);
  const [error, setError]       = useState(null);
  const [loading, setLoading]   = useState(false);

  const focus = (name) => () => setFocused(name);
  const blur  = ()     => setFocused(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signIn(email, password);
    if (error) setError(error.message);

    setLoading(false);
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
          width: 380,
          padding: "44px 40px",
          background: "#1a1a1a",
          border: "1px solid #222",
          borderRadius: 8,
        }}
      >
        {/* Wordmark */}
        <div style={{ marginBottom: 36, textAlign: "center" }}>
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
            Intelligence platform for EFMD BSIS certification
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={LABEL_STYLE}>Email</label>
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
              autoComplete="current-password"
              placeholder="••••••••"
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
            {loading ? "Signing in…" : "Sign in →"}
          </button>
        </form>

        {/* Sign up link */}
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
            color: "#444",
            fontSize: 13,
          }}
        >
          No account yet?{" "}
          <button
            onClick={onGoToSignup}
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
            Create a demo account →
          </button>
        </div>
      </div>
    </div>
  );
}
