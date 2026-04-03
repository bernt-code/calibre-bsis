import React from "react";
import { DIMENSIONS } from "../../lib/constants";

// Indicator count per dimension
const INDICATOR_COUNTS = {
  school: 15,
  p1: 15,
  p2: 28,
  p3: 10,
  p4: 22,
  p5: 8,
  p6: 14,
  p7: 12
};

/**
 * Count filled fields in a section
 * Returns number of non-empty, non-blank values
 */
function countFilledFields(section) {
  if (!section) return 0;
  let count = 0;
  for (let value of Object.values(section)) {
    if (
      value != null &&
      value !== "" &&
      !(Array.isArray(value) && (value.length === 0 || value.every(v => v === "")))
    ) {
      count++;
    }
  }
  return count;
}

/**
 * Calculate completion percentage for a dimension
 */
function getDimensionCompletion(data, dimensionId) {
  const sectionData = data[dimensionId] || {};
  const filled = countFilledFields(sectionData);
  const total = INDICATOR_COUNTS[dimensionId] || 1;
  return Math.min(100, Math.round((filled / total) * 100));
}

/**
 * Calculate overall completion percentage across all dimensions
 */
function getOverallCompletion(data) {
  const totalIndicators = Object.values(INDICATOR_COUNTS).reduce((sum, val) => sum + val, 0);
  const totalFilled = DIMENSIONS.reduce((sum, dim) => {
    return sum + countFilledFields(data[dim.id] || {});
  }, 0);
  return Math.min(100, Math.round((totalFilled / totalIndicators) * 100));
}

/**
 * Calculate distribution of data by source (scraped, cv, derived, manual, empty)
 */
function calculateSourceDistribution(data) {
  let scraped = 0;
  let cv = 0;
  let derived = 0;
  let manual = 0;
  let empty = 0;

  // Define which fields come from which sources
  const sourceMap = {
    school: { /* field mappings */ },
    p1: { /* field mappings */ },
    p2: { /* field mappings */ },
    p3: { /* field mappings */ },
    p4: { /* field mappings */ },
    p5: { /* field mappings */ },
    p6: { /* field mappings */ },
    p7: { /* field mappings */ }
  };

  for (let dimension of DIMENSIONS) {
    const sectionData = data[dimension.id] || {};
    const sourceMapForDim = sourceMap[dimension.id] || {};

    for (let [fieldName, fieldValue] of Object.entries(sectionData)) {
      const source = sourceMapForDim[fieldName];

      // Check if field is empty
      if (fieldValue == null || fieldValue === "" || (Array.isArray(fieldValue) && fieldValue.length === 0)) {
        empty++;
      } else if (source === "scraped") {
        scraped++;
      } else if (source === "cv") {
        cv++;
      } else if (source === "derived") {
        derived++;
      } else {
        manual++;
      }
    }
  }

  return { scraped, cv, derived, manual, empty };
}

/**
 * Dashboard component - shows completion metrics and progress across all dimensions
 * Props:
 *   data: object containing all dimension data
 *   go: function to navigate to a page
 */
export default function Dashboard({ data, go }) {
  const overallCompletion = getOverallCompletion(data);
  const sourceDistribution = calculateSourceDistribution(data);

  return (
    <div>
      {/* Hero card with overall metrics */}
      <div className="dash-hero">
        <h1>Assessment Dashboard</h1>
        <p>
          {data.school?.name || "Your school"} — BSIS data collection progress
        </p>
        <div className="dash-stats">
          <div className="dash-stat">
            <div className="dash-stat-val">{overallCompletion}%</div>
            <div className="dash-stat-lbl">Complete</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-val">{sourceDistribution.scraped}</div>
            <div className="dash-stat-lbl">Scraped</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-val">{sourceDistribution.cv}</div>
            <div className="dash-stat-lbl">From CVs</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-val">{sourceDistribution.empty}</div>
            <div className="dash-stat-lbl">Remaining</div>
          </div>
        </div>
      </div>

      {/* Source distribution bar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20
        }}
      >
        <div
          style={{
            flex: sourceDistribution.scraped || 0.1,
            height: 6,
            background: "#3b82f6",
            borderRadius: 99
          }}
        />
        <div
          style={{
            flex: sourceDistribution.cv || 0.1,
            height: 6,
            background: "#ec4899",
            borderRadius: 99
          }}
        />
        <div
          style={{
            flex: sourceDistribution.derived || 0.1,
            height: 6,
            background: "#8b5cf6",
            borderRadius: 99
          }}
        />
        <div
          style={{
            flex: sourceDistribution.manual || 0.1,
            height: 6,
            background: "#f59e0b",
            borderRadius: 99
          }}
        />
        <div
          style={{
            flex: sourceDistribution.empty || 0.1,
            height: 6,
            background: "#e5e7eb",
            borderRadius: 99
          }}
        />
      </div>

      {/* Dimension cards grid */}
      <div className="dash-grid">
        {DIMENSIONS.map(dimension => {
          const completion = getDimensionCompletion(data, dimension.id);
          return (
            <div
              key={dimension.id}
              className="dash-card"
              onClick={() => go(dimension.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="dash-card-top">
                <span className="dash-card-icon">{dimension.icon}</span>
                <span className="dash-card-name">{dimension.label}</span>
                <span className="dash-card-count">{INDICATOR_COUNTS[dimension.id]} indicators</span>
              </div>
              <div className="dash-card-bar">
                <div
                  className="dash-card-fill"
                  style={{
                    width: completion + "%",
                    background: dimension.color
                  }}
                />
              </div>
              <div className="dash-card-pct">
                {completion}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
