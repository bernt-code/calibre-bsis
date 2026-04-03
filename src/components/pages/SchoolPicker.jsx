import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useSchool } from "../../contexts/SchoolContext";

const ROLE_LABELS = {
  admin:  "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

export default function SchoolPicker() {
  const { user, signOut }               = useAuth();
  const { schools, loadingSchools, setActiveSchool } = useSchool();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#131313",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
        padding: "40px 24px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div
          style={{
            color: "#00FF41",
            fontSize: 10,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          BSIS by Calibre
        </div>
        <h1
          style={{
            color: "#fff",
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            margin: "0 0 10px",
          }}
        >
          Select a school
        </h1>
        <p style={{ color: "#555", fontSize: 14, margin: 0 }}>
          Choose the institution you're working on
        </p>
      </div>

      {/* Content */}
      {loadingSchools ? (
        <div style={{ color: "#444", fontSize: 14 }}>Loading schools…</div>
      ) : schools.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "32px 40px",
            background: "#1a1a1a",
            border: "1px solid #222",
            borderRadius: 8,
            maxWidth: 360,
          }}
        >
          <div style={{ color: "#00FF41", fontSize: 22, marginBottom: 12 }}>◉</div>
          <div style={{ color: "#ccc", fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
            No schools assigned
          </div>
          <div style={{ color: "#555", fontSize: 13, lineHeight: 1.6 }}>
            Your account has no school access yet.
            <br />
            Contact your Calibre administrator.
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
            maxWidth: 760,
            width: "100%",
          }}
        >
          {schools.map((school) => (
            <SchoolCard
              key={school.id}
              school={school}
              onSelect={() => setActiveSchool(school)}
            />
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ marginTop: 56, textAlign: "center" }}>
        <div style={{ color: "#3a3a3a", fontSize: 12, marginBottom: 10 }}>
          {user?.email}
        </div>
        <button
          onClick={signOut}
          style={{
            background: "none",
            border: "1px solid #2a2a2a",
            color: "#555",
            fontSize: 12,
            padding: "6px 16px",
            borderRadius: 4,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#444")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#2a2a2a")}
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function SchoolCard({ school, onSelect }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block",
        width: "100%",
        padding: "24px 22px",
        background: hovered ? "#1e251e" : "#1a1a1a",
        border: `1px solid ${hovered ? "#00FF41" : "#222"}`,
        borderRadius: 8,
        textAlign: "left",
        cursor: "pointer",
        transition: "border-color 0.15s, background 0.15s",
        fontFamily: "inherit",
      }}
    >
      {/* Role badge */}
      <div
        style={{
          color: "#00FF41",
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        {ROLE_LABELS[school.role] ?? school.role}
      </div>

      {/* School name */}
      <div
        style={{
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          lineHeight: 1.3,
          marginBottom: 6,
        }}
      >
        {school.name}
      </div>

      {/* Country */}
      <div style={{ color: "#555", fontSize: 12 }}>{school.country}</div>

      {/* Arrow */}
      <div
        style={{
          color: hovered ? "#00FF41" : "#333",
          fontSize: 16,
          marginTop: 16,
          transition: "color 0.15s",
        }}
      >
        →
      </div>
    </button>
  );
}
