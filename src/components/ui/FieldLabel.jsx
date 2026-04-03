import React from "react";
import SourceBadge from "./SourceBadge";

/**
 * FieldLabel component - label with hint and source badge
 */
export default function FieldLabel({ children, hint, indicator, source }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        marginBottom: 5,
        flexWrap: "wrap"
      }}
    >
      {indicator && (
        <span className="ind">
          {indicator}
        </span>
      )}
      <label
        className="lbl"
        style={{
          marginBottom: 0
        }}
      >
        {children}
        {hint && (
          <span className="lbl-hint">
            {" — "}
            {hint}
          </span>
        )}
      </label>
      {source && <SourceBadge source={source} />}
    </div>
  );
}
