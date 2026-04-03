import React from "react";

/**
 * DimensionIntro component - introduction banner with CV auto-fill indicator
 */
export default function DimensionIntro({
  completed,
  total,
  fields,
  percentage
}) {
  return (
    <div className="cv-banner">
      <span className="cv-banner-icon">📄</span>
      <div className="cv-banner-body">
        <div className="cv-banner-title">
          CV Auto-fill · {completed}/{total} indicators
        </div>
        <div className="cv-banner-desc">
          {fields}
        </div>
        <div className="cv-bar">
          <div
            className="cv-bar-fill"
            style={{
              width: percentage + "%"
            }}
          />
        </div>
      </div>
      <div className="cv-banner-pct">
        {percentage}%
      </div>
    </div>
  );
}
