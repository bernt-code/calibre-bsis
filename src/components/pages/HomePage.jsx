import React, { useState } from "react";
import { DIMENSIONS } from "../../lib/constants";

const PRIMARY_COLOR = "#2e8b57";

/**
 * HomePage component - landing page with lead form, feature cards, and process steps
 * Props:
 *   go: function to navigate to a page (e.g., go("dashboard"))
 */
export default function HomePage({ go }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (name && email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="lp">
      {/* Hero section */}
      <div className="lp-hero">
        <div className="lp-hero-inner">
          <div className="lp-kicker">
            EFMD BSIS Assessment — Powered by Calibre
          </div>
          <h1 className="lp-h1">
            Collect <em>80% of BSIS data</em> before anyone opens a spreadsheet.
          </h1>
          <p className="lp-sub">
            Calibre's intelligent scraping engine crawls your school's web presence, LinkedIn alumni networks, research portals, and course catalogues — then maps everything directly to BSIS indicators. Structured stakeholder CVs fill the next 20%. You only type budget numbers.
          </p>
          <div className="lp-ctas">
            <button
              className="lp-btn-primary"
              onClick={() => go("dashboard")}
            >
              Open dashboard →
            </button>
            <button
              className="lp-btn-secondary"
              onClick={() => {
                document.getElementById("lp-lead")?.scrollIntoView({
                  behavior: "smooth"
                });
              }}
            >
              Request a demo
            </button>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="lp-stats">
        {[
          { val: "124", lbl: "BSIS Indicators", sub: "7 impact dimensions" },
          { val: "80%", lbl: "Auto-collected", sub: "Scraping + CVs" },
          { val: "2 wks", lbl: "Typical completion", sub: "Down from 6 months" },
          { val: "8", lbl: "Scraping sources", sub: "Web, LinkedIn, Scholar…" }
        ].map((stat, index) => (
          <div key={index} className="lp-stat">
            <div className="lp-stat-val">{stat.val}</div>
            <div className="lp-stat-lbl">{stat.lbl}</div>
            <div className="lp-stat-sub">{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="lp-section">
        <div className="lp-sh">How it works</div>
        <div className="lp-h2">Three data channels. One complete assessment.</div>
        <div className="lp-h2-sub">
          Each channel feeds directly into BSIS indicators — no copy-pasting, no double entry.
        </div>

        <div className="lp-features">
          {[
            {
              stripe: "linear-gradient(90deg, #3b82f6, #60a5fa)",
              icon: "⚡",
              title: "Intelligent Scraping",
              desc: "Our engine crawls 8 data sources simultaneously — your school website, LinkedIn alumni profiles, Google Scholar, Scopus, course catalogues, PURE/CRIS research portals, news archives, and ranking databases. It extracts structured data and maps each finding to specific BSIS indicator codes.",
              num: "~43%",
              numColor: "#3b82f6",
              numLbl: "of all indicators auto-populated",
              onClick: () => go("setup")
            },
            {
              stripe: "linear-gradient(90deg, #ec4899, #f472b6)",
              icon: "📄",
              title: "Structured CV Collection",
              desc: "Forget generic academic CVs. Our templates are designed to mirror BSIS indicators — asking for regional consulting days, civic board memberships, startup involvement, and SDG-linked research. 7 stakeholders, 7 tailored templates, instant data extraction.",
              num: "+22%",
              numColor: "#ec4899",
              numLbl: "additional coverage from 7 CVs",
              onClick: () => go("cvs")
            },
            {
              stripe: "linear-gradient(90deg, #f59e0b, #fbbf24)",
              icon: "✏️",
              title: "Guided Manual Entry",
              desc: "Only ~15% of indicators need manual input — primarily budget figures from finance and strategic narrative fields where the Dean's voice matters. Every field shows where its data came from and what's still missing, so you know exactly what to ask for.",
              num: "~15%",
              numColor: "#f59e0b",
              numLbl: "manual entry — mostly P1 financials"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="lp-feat"
              style={{
                cursor: feature.onClick ? "pointer" : "default"
              }}
              onClick={feature.onClick}
            >
              <div className="lp-feat-stripe" style={{ background: feature.stripe }} />
              <div className="lp-feat-icon">{feature.icon}</div>
              <div className="lp-feat-title">{feature.title}</div>
              <div className="lp-feat-desc">{feature.desc}</div>
              <div className="lp-feat-num" style={{ color: feature.numColor }}>
                {feature.num}
              </div>
              <div className="lp-feat-num-lbl">{feature.numLbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scraper section */}
      <div className="lp-section">
        <div className="lp-sh">The moat</div>
        <div className="lp-h2">8 intelligent scrapers, one click.</div>
        <div className="lp-h2-sub">
          Enter your school name and location. The engine builds targeted queries for each source, adapting to your region, language, and institutional profile.
        </div>

        <div className="lp-scrapers">
          {[
            { icon: "🌐", name: "School website", desc: "Faculty, programmes, partnerships, news", badge: "P1–P7" },
            { icon: "💼", name: "LinkedIn", desc: "Alumni careers, company connections, job placements", badge: "P2, P3, P7" },
            { icon: "📚", name: "Google Scholar / Scopus", desc: "Publications, citations, h-index, co-authors", badge: "P4" },
            { icon: "📰", name: "News & media archives", desc: "Regional and national press mentions, features", badge: "P7" },
            { icon: "📖", name: "Course catalogue", desc: "SDG/CSR course content, pedagogy, programme mix", badge: "P2, P6" },
            { icon: "🔬", name: "Research portal (PURE)", desc: "PhD defences, research groups, funded projects", badge: "P4, P5" },
            { icon: "🏆", name: "Rankings databases", desc: "QS, THE, FT positions, KARVI ratings", badge: "P7" },
            { icon: "📄", name: "Public annual report", desc: "Budget overview, KPIs, strategic priorities", badge: "P1, P6" }
          ].map((scraper, index) => (
            <div key={index} className="lp-scraper">
              <span className="lp-scraper-icon">{scraper.icon}</span>
              <div style={{ flex: 1 }}>
                <div className="lp-scraper-name">{scraper.name}</div>
                <div className="lp-scraper-desc">{scraper.desc}</div>
              </div>
              <span className="lp-scraper-badge">{scraper.badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CV Roles */}
      <div className="lp-section">
        <div className="lp-sh">Structured collection</div>
        <div className="lp-h2">7 stakeholder CVs. Each one purpose-built.</div>
        <div className="lp-h2-sub">
          Every CV template is mapped to the BSIS dimensions that role contributes to. The template asks the right questions — no interpretation needed.
        </div>

        <div className="lp-cv-grid">
          {[
            { icon: "👔", role: "Dean / Director", dims: "School, P1, P3, P7" },
            { icon: "🔬", role: "VP Research", dims: "P4, P5" },
            { icon: "🎓", role: "VP Academic", dims: "P2, P6" },
            { icon: "💼", role: "Exec Ed Director", dims: "P2, P3" },
            { icon: "🤝", role: "Alumni Director", dims: "P2, P7" },
            { icon: "🌍", role: "International Director", dims: "P5, P2" },
            { icon: "🌱", role: "CSR / Sustainability", dims: "P6, P5" }
          ].map((cv, index) => (
            <div key={index} className="lp-cv-card">
              <div className="lp-cv-avatar">{cv.icon}</div>
              <div className="lp-cv-role">{cv.role}</div>
              <div className="lp-cv-dims">{cv.dims}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Process steps */}
      <div className="lp-section">
        <div className="lp-sh">Your timeline</div>
        <div className="lp-h2">From zero to submission-ready in 4 steps.</div>
        <div className="lp-h2-sub">
          What used to take 6 months now takes 2 weeks of mostly automated work.
        </div>

        <div className="lp-steps">
          {[
            { num: "1", title: "Setup", desc: "Enter school identity. Engine builds scraping queries.", time: "5 minutes" },
            { num: "2", title: "Auto-scrape", desc: "8 scrapers run in parallel. Results mapped to indicators.", time: "~24 hours" },
            { num: "3", title: "CV collection", desc: "Send 7 templates. CVs parsed and data extracted automatically.", time: "1 week" },
            { num: "4", title: "Review & submit", desc: "Validate auto-filled data. Enter budget numbers. Export.", time: "2–3 days" }
          ].map((step, index) => (
            <div key={index} className="lp-step">
              <div className="lp-step-num">{step.num}</div>
              <div className="lp-step-title">{step.title}</div>
              <div className="lp-step-desc">{step.desc}</div>
              <div className="lp-step-time">{step.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Full coverage */}
      <div className="lp-section">
        <div className="lp-sh">Full coverage</div>
        <div className="lp-h2">All 7 BSIS impact dimensions. 124 indicators.</div>
        <div className="lp-h2-sub">
          Click any dimension to see the indicators and how data flows in.
        </div>

        <div className="dash-grid">
          {DIMENSIONS.map(dimension => (
            <div
              key={dimension.id}
              className="dash-card"
              onClick={() => go(dimension.id)}
              style={{ cursor: "pointer" }}
            >
              <div className="dash-card-top">
                <span className="dash-card-icon">{dimension.icon}</span>
                <span className="dash-card-name">{dimension.label}</span>
              </div>
              <div className="dash-card-bar">
                <div
                  className="dash-card-fill"
                  style={{
                    width: "100%",
                    background: dimension.color,
                    opacity: 0.3
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead form */}
      <div id="lp-lead" className="lp-lead">
        {submitted ? (
          <div style={{ textAlign: "center", padding: "32px 0" }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>✓</div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", marginBottom: 6 }}>
              Thank you, {name.split(" ")[0]}!
            </h3>
            <p style={{ fontSize: 14, color: "#6b7280" }}>
              We'll be in touch within 24 hours to show you how Calibre can accelerate your BSIS assessment.
            </p>
          </div>
        ) : (
          <>
            <h2>Ready to simplify your BSIS assessment?</h2>
            <p>
              Get a personalized demo showing how Calibre automates data collection for your school — with a preview using your actual institutional data.
            </p>

            <div className="lp-lead-grid">
              <div>
                <label>Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Prof. Jane Smith"
                />
              </div>
              <div>
                <label>Work email</label>
                <input
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="jane@business-school.edu"
                />
              </div>
              <div>
                <label>Institution</label>
                <input
                  type="text"
                  value={institution}
                  onChange={e => setInstitution(e.target.value)}
                  placeholder="e.g. ESCP Business School"
                />
              </div>
              <div>
                <label>Your role</label>
                <select
                  value={role}
                  onChange={e => setRole(e.target.value)}
                >
                  <option value="">Select your role…</option>
                  <option>Dean / Director</option>
                  <option>Associate Dean</option>
                  <option>BSIS Project Lead</option>
                  <option>Quality Assurance</option>
                  <option>Accreditation Manager</option>
                  <option>EFMD Staff</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="lp-lead-actions">
              <button className="lp-btn-primary" onClick={handleSubmit}>
                Request a demo
              </button>
              <span className="lp-lead-note">
                Or email <strong style={{ color: PRIMARY_COLOR }}>hello@calibre-bsis.com</strong> · Response within 24h
              </span>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="lp-footer">
        <span style={{ fontWeight: 700, color: "#111827" }}>BSIS</span>
        {" by "}
        <a href="#">Calibre</a>
        {" · Built for EFMD Business Schools · "}
        <a href="#">EdTech Solutions</a>
      </div>
    </div>
  );
}
