import React from "react";

/**
 * SourceBadge component - displays the source type (scraped, cv, manual, derived)
 */
export default function SourceBadge({ source }) {
  if (!source) return null;

  const sourceLabels = {
    scraped: "web",
    cv: "cv",
    manual: "manual",
    derived: "calc"
  };

  const label = sourceLabels[source] || source;

  return (
    <span className={`src-badge ${source}`}>
      {label}
    </span>
  );
}
