import React, { useState } from "react";
import { DIMENSIONS, CV_STAKEHOLDERS } from "../../lib/constants";
import FormGroup from "../ui/FormGroup";
import TextInput from "../ui/TextInput";
import TextArea from "../ui/TextArea";
import ListInput from "../ui/ListInput";

// Card configuration for scraping sources
const CARD_CONFIG = [
  {
    id: "website",
    label: "School website",
    icon: "🌐",
    desc: "Homepage, about, faculty, programmes",
    targets: ["school", "p2", "p3", "p5"]
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "💼",
    desc: "Alumni profiles, job placements, company connections",
    targets: ["p2", "p3", "p7"]
  },
  {
    id: "scholar",
    label: "Google Scholar / Scopus",
    icon: "📚",
    desc: "Publications, citations, h-index, co-authors",
    targets: ["p4"]
  },
  {
    id: "news",
    label: "News & media",
    icon: "📰",
    desc: "Regional and national press mentions",
    targets: ["p7"]
  },
  {
    id: "courses",
    label: "Course catalogue",
    icon: "📖",
    desc: "Programme content, CSR/SDG courses, pedagogy",
    targets: ["p2", "p6"]
  },
  {
    id: "pure",
    label: "Research portal (PURE/CRIS)",
    icon: "🔬",
    desc: "PhD defences, research groups, funding",
    targets: ["p4", "p5"]
  },
  {
    id: "rankings",
    label: "Rankings databases",
    icon: "🏆",
    desc: "QS, THE, FT, KARVI ratings",
    targets: ["p7"]
  },
  {
    id: "annual",
    label: "Annual report (public PDF)",
    icon: "📄",
    desc: "Budget overview, KPIs, strategic priorities",
    targets: ["school", "p1", "p6"]
  }
];

/**
 * SetupScrape page - school identity and scraping configuration
 */
export function SetupScrape({ data, setField }) {
  const name = data.school?.name || "";
  const city = data.school?.city || "";
  const country = data.school?.country || "";
  const website = data.school?.website || "";
  const canScrape = name && country;

  return (
    <div>
      <div className="sec-badge">⚡ Setup</div>
      <h1 className="sec-title">Setup & Scraping Engine</h1>
      <p className="sec-desc">
        Enter your school identity. The scraping engine uses this to crawl web, LinkedIn, research portals, course catalogues, and media — automatically populating ~43% of all BSIS indicators.
      </p>

      <div className="setup-card">
        <h3>School Identity</h3>
        <p>The scraping engine builds search queries from these fields — accuracy matters.</p>
        <div className="fr2">
          <FormGroup label="Institution name">
            <input
              type="text"
              value={name}
              onChange={e => setField("name", e.target.value)}
              placeholder="e.g. University of Vaasa"
            />
          </FormGroup>
          <FormGroup label="Country">
            <input
              type="text"
              value={country}
              onChange={e => setField("country", e.target.value)}
              placeholder="e.g. Finland"
            />
          </FormGroup>
        </div>
        <div className="fr2">
          <FormGroup label="City / Region">
            <input
              type="text"
              value={city}
              onChange={e => setField("city", e.target.value)}
              placeholder="e.g. Vaasa"
            />
          </FormGroup>
          <FormGroup label="Website">
            <input
              type="text"
              value={website}
              onChange={e => setField("website", e.target.value)}
              placeholder="https://www.uwasa.fi"
            />
          </FormGroup>
        </div>
      </div>

      <div className="setup-card">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div>
            <h3 style={{ marginBottom: 2 }}>Scraping Sources</h3>
            <p style={{ margin: 0 }}>Each source is a targeted crawler. The engine adapts queries based on your school identity.</p>
          </div>
          <button className="btn btn-green" style={{ opacity: canScrape ? 1 : 0.4 }}>
            ⚡ Run all scrapers
          </button>
        </div>

        {CARD_CONFIG.map(source => {
          const hasData = source.targets.some(targetId => {
            const section = data[targetId];
            return section && Object.values(section).some(val =>
              val !== null && val !== "" && !(Array.isArray(val) && val.length === 0)
            );
          });
          const status = hasData ? "done" : "pending";
          return (
            <div key={source.id} className={`scrape-status ${status}`}>
              <div className={`scrape-dot ${status}`} />
              <span style={{ fontSize: 16, marginRight: 2 }}>{source.icon}</span>
              <div style={{ flex: 1 }}>
                <div className="scrape-label">{source.label}</div>
                <div style={{ fontSize: 10, color: "#9ca3af" }}>{source.desc}</div>
              </div>
              <div className="scrape-count">
                {source.targets.map(targetId => {
                  const dim = DIMENSIONS.find(d => d.id === targetId);
                  return dim ? (
                    <span key={targetId} className="cv-feed-tag" style={{ marginLeft: 3 }}>
                      {dim.label.split("·")[0]?.trim() || dim.label}
                    </span>
                  ) : null;
                })}
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginLeft: 8 }}>
                {status === "done" ? "Re-run" : "Run"}
              </button>
            </div>
          );
        })}
      </div>

      {!canScrape && (
        <div className="warn">
          Enter at least the institution name and country above to enable the scraping engine.
        </div>
      )}
    </div>
  );
}

/**
 * CVCollection page - stakeholder CV collection
 */
export function CVCollection() {
  const [cvStakeholders, setCvStakeholders] = useState(
    CV_STAKEHOLDERS.map(s => ({ ...s, uploaded: false, fileName: "" }))
  );
  const [additionalStakeholders, setAdditionalStakeholders] = useState([]);

  const uploaded = cvStakeholders.filter(c => c.uploaded).length + additionalStakeholders.filter(c => c.uploaded).length;
  const total = cvStakeholders.length + additionalStakeholders.length;

  return (
    <div>
      <div className="sec-badge">📄 CV Collection</div>
      <h1 className="sec-title">Stakeholder CV Collection</h1>
      <p className="sec-desc">
        Structured CVs from {total} key stakeholders feed directly into BSIS indicators. Each role maps to specific dimensions — the CV template asks the right questions so you get structured data, not generic CVs.
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, background: "#f0fdf4", borderRadius: 10, padding: 16 }}>
        <div style={{ fontSize: 28, fontWeight: 800, color: "#2e8b57" }}>
          {uploaded}/{total}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#166534" }}>CVs collected</div>
          <div className="prog-track" style={{ marginTop: 4 }}>
            <div className="prog-fill" style={{ width: (total > 0 ? uploaded / total * 100 : 0) + "%" }} />
          </div>
        </div>
        <button className="btn btn-green">📧 Send CV requests to all</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".08em" }}>
          Core Stakeholders
        </div>
      </div>

      {cvStakeholders.map(stakeholder => (
        <div key={stakeholder.id} className={`cv-slot${stakeholder.uploaded ? " uploaded" : ""}`}>
          <div
            className="cv-avatar"
            style={{ background: stakeholder.uploaded ? "#dcfce7" : "#f3f4f6" }}
          >
            {stakeholder.uploaded ? "✓" : "👤"}
          </div>
          <div className="cv-info">
            <div className="cv-role">{stakeholder.role}</div>
            <div className="cv-name">
              {stakeholder.uploaded ? stakeholder.fileName : "No CV uploaded yet"}
            </div>
            <div className="cv-feeds">
              {stakeholder.feeds.map(f => {
                const dim = DIMENSIONS.find(d => d.id === f);
                return dim ? <span key={f} className="cv-feed-tag">{dim.label}</span> : null;
              })}
            </div>
          </div>
          <div className="cv-action">
            {stakeholder.uploaded ? (
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-ghost btn-sm">View</button>
                <button className="btn btn-ghost btn-sm">Re-upload</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  className="btn btn-green btn-sm"
                  onClick={() => {
                    setCvStakeholders(cvStakeholders.map(s =>
                      s.id === stakeholder.id
                        ? { ...s, uploaded: true, fileName: s.role.split("/")[0].trim() + "_CV.pdf" }
                        : s
                    ));
                  }}
                >
                  Upload CV
                </button>
                <button className="btn btn-ghost btn-sm">Send request</button>
              </div>
            )}
          </div>
        </div>
      ))}

      <div style={{ marginTop: 24 }}>
        <button
          className="btn btn-ghost"
          onClick={() => setAdditionalStakeholders([...additionalStakeholders, {
            id: "extra_" + Date.now(),
            role: "Additional stakeholder",
            name: "",
            feeds: [],
            uploaded: false,
            fileName: ""
          }])}
        >
          + Add stakeholder slot
        </button>
      </div>

      <div style={{ marginTop: 32 }}>
        <div className="setup-card">
          <h3>CV Template Design</h3>
          <p>The Calibre CV template is not a generic academic CV. It's structured to extract exactly the data BSIS needs — regional consulting days, civic board memberships, startup involvement, SDG-linked research. Each role gets a tailored template.</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-burg btn-sm">⬇ Download all CV templates (ZIP)</button>
            <button className="btn btn-ghost btn-sm">Preview template</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const DOCUMENT_TYPES = [
  { name: "Faculty CVs", desc: "PDF or Word CVs for all faculty members", maps: 28, tags: ["4.1", "5.3", "6.3"] },
  { name: "Enrolment Records", desc: "Student data exports, spreadsheets", maps: 10, tags: ["2.1", "2.4"] },
  { name: "Alumni Records", desc: "Alumni spreadsheets or LinkedIn data", maps: 6, tags: ["2.5"] },
  { name: "Partnership / MOU Docs", desc: "PDF agreements, MOU documents", maps: 5, tags: ["5.1"] },
  { name: "Annual Report", desc: "Institutional review or annual report", maps: 8, tags: ["1.1", "School"] },
  { name: "Publication Lists", desc: "PURE export, research lists", maps: 12, tags: ["4.1", "4.2"] },
  { name: "Exec Education Records", desc: "Programme records, participant lists", maps: 7, tags: ["2.3"] },
  { name: "Press / Media Clippings", desc: "Regional and national media", maps: 7, tags: ["7.2", "7.3"] },
  { name: "Student CVs", desc: "Student placement data", maps: 8, tags: ["2.2", "3.1"] },
  { name: "Sustainability / CSR Report", desc: "CSR report or sustainability audit", maps: 10, tags: ["6.1", "6.2", "6.3"] },
  { name: "Accreditation Self-Eval", desc: "AACSB, EQUIS or AMBA self-evaluation", maps: 30, tags: ["All"] }
];

/**
 * DataSources page - document upload and data source configuration
 */
export function DataSources() {
  return (
    <div>
      <div className="sec-badge">📥 Data Sources</div>
      <h1 className="sec-title">Document Upload & Data Sources</h1>
      <p className="sec-desc">
        Upload documents to auto-populate indicators across all dimensions. Each source maps to specific BSIS indicators.
      </p>

      <div style={{ marginBottom: 24 }}>
        <button className="btn btn-green">Upload All Documents (Batch)</button>
      </div>

      <div className="src-grid">
        {DOCUMENT_TYPES.map(doc => (
          <div key={doc.name} className="src-card">
            <h4>{doc.name}</h4>
            <p>{doc.desc}</p>
            <div className="src-tags">
              {doc.tags.map(tag => (
                <span key={tag} className="src-tag">{tag}</span>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#9ca3af" }}>Maps to ~{doc.maps} indicators</span>
              <button className="btn btn-green btn-sm">Upload & parse</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Web Crawler — School Website</h2>
        <div className="info">
          Enter URLs for key pages on your institution's website. The crawler will extract relevant data points.
        </div>
        {["Main website", "Faculty directory", "Research pages", "Partnerships", "CSR / Sustainability", "News & Events", "Executive education", "Alumni pages", "Programme catalogue", "Entrepreneurship / Incubator", "Diversity / People"].map(pageType => (
          <div key={pageType} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", width: 180, flexShrink: 0 }}>
              {pageType}
            </span>
            <input
              type="text"
              placeholder="https://..."
              style={{ flex: 1 }}
            />
            <button className="btn btn-ghost btn-sm">Crawl</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const MEDIA_SOURCES = [
  {
    cat: "Regional Media",
    items: [
      {
        code: "7.2.2",
        title: "Regional newspaper citations",
        query: '"University of Vaasa" site:*.fi'
      },
      {
        code: "7.2.3",
        title: "Regional feature articles",
        query: '"University of Vaasa" business school region'
      },
      {
        code: "7.2.5",
        title: "Regional forums & conferences",
        query: '"University of Vaasa" forum conference Ostrobothnia'
      },
      {
        code: "7.2.1",
        title: "School reputation — regional",
        query: '"University of Vaasa" ranking reputation'
      }
    ]
  },
  {
    cat: "National Media",
    items: [
      {
        code: "7.3.1",
        title: "National newspaper citations",
        query: '"University of Vaasa" site:hs.fi OR site:yle.fi'
      },
      {
        code: "7.3.2",
        title: "National feature articles",
        query: '"University of Vaasa" business school Finland'
      }
    ]
  },
  {
    cat: "Academic & Publications",
    items: [
      {
        code: "4.2",
        title: "Google Scholar — regional research",
        query: 'site:scholar.google.com "University of Vaasa" Ostrobothnia'
      },
      {
        code: "4.1",
        title: "Google Scholar — all faculty output",
        query: 'site:scholar.google.com "University of Vaasa"'
      }
    ]
  }
];

/**
 * MediaIntel page - media intelligence and search queries
 */
export function MediaIntel() {
  return (
    <div>
      <div className="sec-badge">🔍 Media Intelligence</div>
      <h1 className="sec-title">Media Intelligence</h1>
      <p className="sec-desc">
        Pre-built search queries to gather media citations, rankings, and publication data. Click "Open search" to run each query in your browser.
      </p>

      {MEDIA_SOURCES.map(section => (
        <div key={section.cat} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{section.cat}</h3>
          {section.items.map(item => (
            <div key={item.code} className="media-row">
              <span className="media-code">{item.code}</span>
              <span className="media-title">{item.title}</span>
              <span style={{ fontSize: 11, color: "#9ca3af", flex: 1, textAlign: "right", marginRight: 8 }}>
                {item.query}
              </span>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(item.query)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
              >
                Open search →
              </a>
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Results Recording</h3>
        <div className="fr2">
          <FormGroup label="Regional media citations — count">
            <input type="number" placeholder="0" />
          </FormGroup>
          <FormGroup label="Regional feature articles — count">
            <input type="number" placeholder="0" />
          </FormGroup>
        </div>
        <div className="fr2">
          <FormGroup label="National media citations — count">
            <input type="number" placeholder="0" />
          </FormGroup>
          <FormGroup label="National feature articles — count">
            <input type="number" placeholder="0" />
          </FormGroup>
        </div>
        <TextArea
          label="Paste regional media examples"
          value=""
          onChange={() => {}}
        />
        <TextArea
          label="Paste national media examples"
          value=""
          onChange={() => {}}
        />
      </div>
    </div>
  );
}

// Helper function to count filled fields
function countFilledFields(section) {
  if (!section) return 0;
  let count = 0;
  for (let value of Object.values(section)) {
    if (value !== null && value !== "" && !(Array.isArray(value) && value.length === 0)) {
      if (Array.isArray(value) ? value.length > 0 && value.some(v => v !== "") : true) {
        count++;
      }
    }
  }
  return count;
}

const FIELD_TOTALS = {
  school: 15,
  p1: 15,
  p2: 28,
  p3: 10,
  p4: 22,
  p5: 8,
  p6: 14,
  p7: 12
};

function calculateSectionCompletion(data, sectionId) {
  return Math.min(100, Math.round(countFilledFields(data[sectionId] || {}) / (FIELD_TOTALS[sectionId] || 1) * 100));
}

function calculateOverallCompletion(data) {
  const allDimensions = DIMENSIONS;
  const totalFields = Object.values(FIELD_TOTALS).reduce((sum, count) => sum + count, 0);
  return Math.min(100, Math.round(
    allDimensions.reduce((sum, dim) => sum + countFilledFields(data[dim.id] || {}), 0) / totalFields * 100
  ));
}

/**
 * Export page - data export and submission
 */
export function Export({ data }) {
  const overallCompletion = calculateOverallCompletion(data);

  return (
    <div>
      <div className="sec-badge">↓ Export</div>
      <h1 className="sec-title">Export Report</h1>
      <p className="sec-desc">
        Download your collected data for submission to EFMD or for internal review.
      </p>

      <div className="warn">
        Review all sections before exporting. Incomplete fields will appear blank in the output.
      </div>

      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 10, padding: 24, marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Overall Completion: {overallCompletion}%</div>
        <div className="prog-track" style={{ marginBottom: 16 }}>
          <div className="prog-fill" style={{ width: overallCompletion + "%" }} />
        </div>
        {DIMENSIONS.map(dim => {
          const completion = calculateSectionCompletion(data, dim.id);
          return (
            <div key={dim.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ width: 20, textAlign: "center" }}>{dim.icon}</span>
              <span style={{ flex: 1, fontSize: 13, color: "#374151" }}>{dim.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: completion === 100 ? "#16a34a" : "#6b7280", width: 40, textAlign: "right" }}>
                {completion}%
              </span>
            </div>
          );
        })}
      </div>

      <div className="export-actions">
        <button
          className="btn btn-green"
          onClick={() => {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "calibre-bsis-export.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          ⬇ Export JSON
        </button>
        <button className="btn btn-burg">⬇ Export Excel</button>
        <button className="btn btn-ghost">Send to BSIS Portal</button>
      </div>
    </div>
  );
}
