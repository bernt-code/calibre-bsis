import React from "react";
import TextInput from "../ui/TextInput";
import ListInput from "../ui/ListInput";

// Helper component for CV Progress Banner
function CVProgressBanner({
  n,
  total,
  fields,
  pct
}) {
  return (
    <div className="cv-banner">
      <span className="cv-banner-icon">📄</span>
      <div className="cv-banner-body">
        <div className="cv-banner-title">
          CV Auto-fill · {n}/{total} indicators
        </div>
        <div className="cv-banner-desc">{fields}</div>
        <div className="cv-bar">
          <div
            className="cv-bar-fill"
            style={{
              width: pct + "%"
            }}
          />
        </div>
      </div>
      <div className="cv-banner-pct">
        {pct}%
      </div>
    </div>
  );
}

// Helper component for Card Section
function CardSection({
  num,
  title,
  sub,
  color,
  open,
  children
}) {
  const [isOpen, setIsOpen] = React.useState(open ?? false);

  return (
    <div className={`card${isOpen ? " card-open" : ""}`}>
      <div className="card-hdr" onClick={() => setIsOpen(!isOpen)}>
        <div className="card-hdr-l">
          <div
            className="card-num"
            style={{
              background: color || "#c44b22"
            }}
          >
            {num}
          </div>
          <div>
            <div className="card-ttl">{title}</div>
            {sub && <div className="card-sub">{sub}</div>}
          </div>
        </div>
        <span className="chevron">▾</span>
      </div>
      <div className="card-body">{children}</div>
    </div>
  );
}

export default function P3BusinessDev({ data, setField }) {
  return (
    <div>
      <div className="sec-badge">🚀 Part 3</div>
      <h1 className="sec-title">Business Development Impact</h1>
      <p className="sec-desc">
        Resources provided to companies, new venture creation, and job creation.
      </p>

      <CVProgressBanner
        n={2}
        total={10}
        fields="Consulting days, professor startups"
        pct={20}
      />

      <CardSection num="3.1" title="Resources for Companies" open={true}>
        <div className="fr2">
          <TextInput
            indicator="3.1.1"
            label="Internships with local companies"
            value={data.internships}
            onChange={(e) => setField("internships", e)}
          />
          <TextInput
            indicator="3.1.2"
            label="Short student missions / projects"
            value={data.missions}
            onChange={(e) => setField("missions", e)}
          />
        </div>
        <div className="fr2">
          <TextInput
            indicator="3.1.3"
            label="Gap years at local company abroad"
            value={data.gapYears}
            onChange={(e) => setField("gapYears", e)}
          />
          <TextInput
            indicator="3.1.4"
            label="Students on apprenticeships"
            value={data.apprentices}
            onChange={(e) => setField("apprentices", e)}
          />
        </div>
        <TextInput
          indicator="3.1.5"
          label="Professor consulting / teaching days"
          value={data.profConsulting}
          onChange={(e) => setField("profConsulting", e)}
        />
      </CardSection>

      <CardSection num="3.2" title="New Business Creation & Takeovers">
        <ListInput
          indicator="3.2.1"
          label="Entrepreneurial structures (incubators, centres)"
          items={data.incubators ?? [""]}
          onChange={(e) => setField("incubators", e)}
          placeholder="Name & description…"
        />
        <div className="fr3">
          <TextInput
            indicator="3.2.2"
            label="Start-ups by students (12mo)"
            value={data.startupStudents}
            onChange={(e) => setField("startupStudents", e)}
          />
          <TextInput
            indicator="3.2.3"
            label="Start-ups by professors"
            value={data.startupProfs}
            onChange={(e) => setField("startupProfs", e)}
          />
          <TextInput
            indicator="3.2.4"
            label="Start-ups by alumni"
            value={data.startupAlumni}
            onChange={(e) => setField("startupAlumni", e)}
          />
        </div>
        <TextInput
          indicator="3.2.5"
          label="Jobs created by start-ups"
          value={data.startupJobs}
          onChange={(e) => setField("startupJobs", e)}
        />
      </CardSection>
    </div>
  );
}
