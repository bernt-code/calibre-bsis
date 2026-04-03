import React, { useState } from "react";

/**
 * Section component - collapsible card section
 */
export default function Section({
  number,
  title,
  subtitle,
  color,
  open = false,
  children
}) {
  const [isOpen, setIsOpen] = useState(open);

  return (
    <div className={`card${isOpen ? " card-open" : ""}`}>
      <div
        className="card-hdr"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="card-hdr-l">
          <div
            className="card-num"
            style={{
              background: color
            }}
          >
            {number}
          </div>
          <div>
            <div className="card-ttl">{title}</div>
            {subtitle && (
              <div className="card-sub">{subtitle}</div>
            )}
          </div>
        </div>
        <span className="chevron">▾</span>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}
