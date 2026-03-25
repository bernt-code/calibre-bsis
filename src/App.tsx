import { useState, useEffect, useCallback, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   CALIBRE for BSIS — Full Data Collection Platform
   BSIS Green (#2e8b57) + EFMD Burgundy (#9B243E)
   ═══════════════════════════════════════════════════════════════════════════ */

// ── Types ────────────────────────────────────────────────────────────────────
type FD = Record<string, any>;
type Setter = (key: string, val: any) => void;

// ── Dimensions ───────────────────────────────────────────────────────────────
const DIMS = [
  { id:"school", label:"School Profile",   icon:"🏫", color:"#0ea5e9" },
  { id:"p1",     label:"1 · Financial",    icon:"💰", color:"#2e8b57" },
  { id:"p2",     label:"2 · Educational",  icon:"🎓", color:"#1d4ed8" },
  { id:"p3",     label:"3 · Business Dev", icon:"🚀", color:"#c44b22" },
  { id:"p4",     label:"4 · Intellectual", icon:"🔬", color:"#7c3aed" },
  { id:"p5",     label:"5 · Ecosystem",    icon:"🌐", color:"#0f766e" },
  { id:"p6",     label:"6 · Societal",     icon:"🌱", color:"#15803d" },
  { id:"p7",     label:"7 · Image",        icon:"⭐", color:"#9B243E" },
];

const ALL_PAGES = [
  { id:"dashboard", label:"Overview",     icon:"◈" },
  ...DIMS,
  { id:"sources",   label:"Data Sources", icon:"📥" },
  { id:"media",     label:"Media Intel",  icon:"🔍" },
  { id:"export",    label:"Export",       icon:"↓"  },
];

// ── Storage ──────────────────────────────────────────────────────────────────
const SKEY = "calibre_bsis_v1";
const EMPTY: FD = { school:{}, p1:{}, p2:{}, p3:{}, p4:{}, p5:{}, p6:{}, p7:{} };

function initData(): FD {
  // Try original key first, then our fallback keys
  for (const k of [SKEY, "calibre", "calibre-v4", "calibre-v3", "calibre-v2", "calibre-data"]) {
    try {
      const s = localStorage.getItem(k);
      if (s) {
        const d = JSON.parse(s);
        // Ensure nested structure
        if (d.school || d.p1) {
          localStorage.setItem(SKEY, s);
          return d;
        }
      }
    } catch {}
  }
  return EMPTY;
}

// ── Field counting ───────────────────────────────────────────────────────────
// Count filled fields in a section data object
function countFilled(d: FD): number {
  if (!d) return 0;
  let n = 0;
  for (const v of Object.values(d)) {
    if (v === null || v === undefined || v === "") continue;
    if (Array.isArray(v)) { if (v.length > 0 && v.some((x: any) => x !== "")) n++; }
    else if (typeof v === "string" && v.trim() !== "") n++;
    else if (typeof v === "number") n++;
    else n++;
  }
  return n;
}

const FIELD_COUNTS: Record<string, number> = {
  school: 15, p1: 15, p2: 28, p3: 10, p4: 22, p5: 8, p6: 14, p7: 12
};

function dimPct(data: FD, id: string): number {
  const filled = countFilled(data[id] || {});
  const total = FIELD_COUNTS[id] || 1;
  return Math.min(100, Math.round((filled / total) * 100));
}

function overallPct(data: FD): number {
  const total = Object.values(FIELD_COUNTS).reduce((a, b) => a + b, 0);
  const filled = DIMS.reduce((a, d) => a + countFilled(data[d.id] || {}), 0);
  return Math.min(100, Math.round((filled / total) * 100));
}

/* ═══════════════════════════════════════════════════════════════════════════
   CSS
   ═══════════════════════════════════════════════════════════════════════════ */
const GRN = "#2e8b57";
const BRG = "#9B243E";
const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html, body { height: 100%; overflow: hidden; }
body {
  background: #f8f9fb;
  color: #1f2937;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
input[type=number] { -moz-appearance: textfield; }
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }

/* Layout */
.app { display: flex; height: 100vh; }
.sidebar {
  width: 260px; min-width: 260px;
  background: white;
  border-right: 1px solid #e5e7eb;
  display: flex; flex-direction: column;
  overflow: hidden;
}
.sb-brand {
  padding: 20px 20px 16px;
  border-bottom: 1px solid #e5e7eb;
}
.sb-wordmark {
  display: flex; align-items: baseline; gap: 6px;
  font-size: 18px; font-weight: 800; color: #111827;
}
.sb-wordmark-for { font-size: 12px; font-weight: 400; color: #9ca3af; }
.sb-wordmark-bsis { color: ${GRN}; }
.sb-tagline { font-size: 11px; color: #9ca3af; margin-top: 2px; }
.sb-progress { padding: 16px 20px; border-bottom: 1px solid #e5e7eb; }
.sb-prog-row { display: flex; justify-content: space-between; font-size: 11px; color: #6b7280; margin-bottom: 6px; }
.sb-prog-row strong { color: ${GRN}; font-size: 13px; }
.prog-track { height: 4px; background: #e5e7eb; border-radius: 99px; overflow: hidden; }
.prog-fill { height: 100%; background: ${GRN}; border-radius: 99px; transition: width .4s; }
.sb-nav { flex: 1; overflow-y: auto; padding: 8px 0; }
.sb-sec-lbl { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: #9ca3af; padding: 12px 20px 4px; }
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 8px 20px; cursor: pointer;
  transition: background .1s; position: relative;
}
.nav-item:hover { background: #f9fafb; }
.nav-item.active { background: #f0fdf4; }
.nav-item.active::before {
  content: ""; position: absolute; left: 0; top: 4px; bottom: 4px;
  width: 3px; background: ${GRN}; border-radius: 0 2px 2px 0;
}
.nav-icon { font-size: 14px; width: 20px; text-align: center; flex-shrink: 0; }
.nav-label { font-size: 13px; color: #6b7280; flex: 1; }
.nav-item.active .nav-label { color: #111827; font-weight: 600; }
.nav-pct { font-size: 10px; font-weight: 600; color: #9ca3af; }
.nav-item.active .nav-pct { color: ${GRN}; }
.sb-footer { padding: 12px 20px; border-top: 1px solid #e5e7eb; }
.sb-saved { font-size: 10px; color: #9ca3af; text-align: center; margin-bottom: 8px; }

/* Main */
.main { flex: 1; overflow-y: auto; background: #f8f9fb; }
.topbar {
  position: sticky; top: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 32px; background: rgba(248,249,251,.92);
  backdrop-filter: blur(12px); border-bottom: 1px solid #e5e7eb;
}
.topbar-l { font-size: 14px; font-weight: 600; color: #111827; }
.topbar-r { display: flex; gap: 12px; align-items: center; }
.topbar-saved { font-size: 10px; color: #9ca3af; }
.content { max-width: 900px; margin: 0 auto; padding: 32px 32px 80px; }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 6px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  border: 1px solid transparent; transition: all .15s;
}
.btn-green { background: ${GRN}; color: white; }
.btn-green:hover { background: #236b43; }
.btn-burg { background: ${BRG}; color: white; }
.btn-burg:hover { background: #7d1d32; }
.btn-ghost { background: white; border-color: #e5e7eb; color: #374151; }
.btn-ghost:hover { border-color: #9ca3af; }
.btn-sm { padding: 5px 12px; font-size: 12px; }

/* Section header */
.sec-badge { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 600; color: ${GRN}; margin-bottom: 4px; }
.sec-title { font-size: 24px; font-weight: 700; color: #111827; margin-bottom: 4px; }
.sec-desc { font-size: 13px; color: #6b7280; margin-bottom: 24px; }

/* Card */
.card {
  background: white; border: 1px solid #e5e7eb; border-radius: 10px;
  margin-bottom: 16px; overflow: hidden;
}
.card-hdr {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 20px; cursor: pointer; user-select: none;
  transition: background .1s;
}
.card-hdr:hover { background: #f9fafb; }
.card-hdr-l { display: flex; align-items: center; gap: 12px; }
.card-num {
  width: 28px; height: 28px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; font-weight: 700; color: white; flex-shrink: 0;
}
.card-ttl { font-size: 14px; font-weight: 600; color: #111827; }
.card-sub { font-size: 11px; color: #9ca3af; }
.chevron { font-size: 14px; color: #9ca3af; transition: transform .2s; }
.card-open .chevron { transform: rotate(180deg); }
.card-body { display: none; padding: 0 20px 20px; }
.card-open .card-body { display: block; }

/* Form fields */
.fg { margin-bottom: 16px; }
.lbl { display: block; font-size: 12px; font-weight: 600; color: #374151; margin-bottom: 5px; }
.lbl-hint { font-weight: 400; color: #9ca3af; }
.ind {
  font-size: 9px; font-weight: 700; color: ${GRN};
  background: #ecfdf5; border: 1px solid #bbf7d0;
  border-radius: 3px; padding: 1px 5px; letter-spacing: .04em;
  margin-right: 4px;
}
input[type=text], input[type=number], select, textarea {
  width: 100%; padding: 9px 12px;
  background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;
  font-size: 14px; font-family: inherit; color: #111827;
  outline: none; transition: border-color .2s, box-shadow .2s;
}
input:focus, select:focus, textarea:focus {
  border-color: ${GRN}; box-shadow: 0 0 0 3px rgba(46,139,87,.1);
}
input::placeholder, textarea::placeholder { color: #9ca3af; }
textarea { resize: vertical; min-height: 72px; }

/* Grid */
.fr2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px; }
.fr3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px 20px; }

/* Prefix / suffix */
.pfx, .sfx {
  display: flex; align-items: center;
  background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px;
  overflow: hidden; transition: border-color .2s, box-shadow .2s;
}
.pfx:focus-within, .sfx:focus-within {
  border-color: ${GRN}; box-shadow: 0 0 0 3px rgba(46,139,87,.1);
}
.pfx > span, .sfx > span {
  padding: 0 10px; font-size: 13px; font-weight: 500; color: #6b7280;
  background: #f3f4f6; border-right: 1px solid #e5e7eb; flex-shrink: 0;
}
.sfx > span { border-right: none; border-left: 1px solid #e5e7eb; }
.pfx input, .sfx input {
  border: none; background: transparent; box-shadow: none !important;
}

/* Dynamic list */
.dlist { display: flex; flex-direction: column; gap: 6px; }
.dlist-item {
  display: flex; align-items: center; gap: 8px;
}
.dlist-idx {
  width: 22px; height: 22px; border-radius: 4px;
  background: #f3f4f6; display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 700; color: #9ca3af; flex-shrink: 0;
}
.dlist-item input { flex: 1; }
.rm-btn {
  background: none; border: none; cursor: pointer;
  color: #d1d5db; font-size: 18px; padding: 0 4px;
  transition: color .15s;
}
.rm-btn:hover { color: #ef4444; }
.dlist-add {
  font-size: 12px; font-weight: 600; color: ${GRN};
  cursor: pointer; padding: 6px 0; transition: opacity .15s;
}
.dlist-add:hover { opacity: .7; }

/* Allsorter upload zone */
.az {
  display: flex; align-items: center; gap: 16px;
  background: #f0fdf4; border: 1px dashed #86efac;
  border-radius: 8px; padding: 14px 20px; margin-bottom: 16px;
}
.az-icon { font-size: 20px; flex-shrink: 0; }
.az-text h4 { font-size: 13px; font-weight: 700; color: #166534; }
.az-text p { font-size: 11px; color: #4ade80; }
.az-right { margin-left: auto; flex-shrink: 0; }

/* Checkbox grid */
.cbgrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.cb-item {
  display: flex; align-items: center; gap: 6px;
  padding: 6px 10px; border: 1px solid #e5e7eb; border-radius: 6px;
  cursor: pointer; font-size: 12px; color: #6b7280;
  transition: all .15s;
}
.cb-item input { display: none; }
.cb-item.on { background: #f0fdf4; border-color: #86efac; color: #166534; font-weight: 600; }
.cb-item:hover { border-color: #a7f3d0; }

/* CV banner */
.cv-banner {
  display: flex; align-items: center; gap: 12px;
  background: #eff6ff; border: 1px solid #bfdbfe;
  border-radius: 8px; padding: 12px 16px; margin-bottom: 16px;
}
.cv-banner-icon { font-size: 18px; }
.cv-banner-body { flex: 1; }
.cv-banner-title { font-size: 12px; font-weight: 700; color: #1e40af; }
.cv-banner-desc { font-size: 10px; color: #3b82f6; }
.cv-bar { height: 3px; background: #dbeafe; border-radius: 99px; margin-top: 4px; overflow: hidden; }
.cv-bar-fill { height: 100%; background: #3b82f6; border-radius: 99px; }
.cv-banner-pct { font-size: 16px; font-weight: 700; color: #1e40af; }

/* Info / warning boxes */
.info {
  background: #eff6ff; border-left: 3px solid #3b82f6;
  padding: 10px 14px; border-radius: 0 6px 6px 0;
  font-size: 12px; color: #1e40af; margin-bottom: 16px;
}
.warn {
  background: #fff7ed; border-left: 3px solid #f97316;
  padding: 10px 14px; border-radius: 0 6px 6px 0;
  font-size: 12px; color: #c2410c; margin-bottom: 16px;
}

/* Dashboard */
.dash-hero {
  background: linear-gradient(135deg, ${GRN}, #236b43);
  border-radius: 12px; padding: 32px; color: white; margin-bottom: 24px;
}
.dash-hero h1 { font-size: 22px; font-weight: 700; margin-bottom: 4px; }
.dash-hero p { font-size: 13px; opacity: .8; margin-bottom: 16px; }
.dash-stats { display: flex; gap: 24px; }
.dash-stat { text-align: center; }
.dash-stat-val { font-size: 28px; font-weight: 800; }
.dash-stat-lbl { font-size: 10px; opacity: .7; text-transform: uppercase; letter-spacing: .08em; }
.dash-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.dash-card {
  background: white; border: 1px solid #e5e7eb; border-radius: 10px;
  padding: 20px; cursor: pointer; transition: border-color .15s, box-shadow .15s;
}
.dash-card:hover { border-color: ${GRN}; box-shadow: 0 2px 8px rgba(46,139,87,.08); }
.dash-card-top { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.dash-card-icon { font-size: 18px; }
.dash-card-name { font-size: 14px; font-weight: 600; color: #111827; flex: 1; }
.dash-card-count { font-size: 11px; color: #9ca3af; }
.dash-card-bar { height: 4px; background: #e5e7eb; border-radius: 99px; overflow: hidden; }
.dash-card-fill { height: 100%; border-radius: 99px; transition: width .4s; }
.dash-card-pct { font-size: 12px; font-weight: 600; color: #6b7280; margin-top: 6px; text-align: right; }

/* Sources page */
.src-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
.src-card {
  background: white; border: 1px solid #e5e7eb; border-radius: 10px;
  padding: 20px;
}
.src-card h4 { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 4px; }
.src-card p { font-size: 11px; color: #9ca3af; margin-bottom: 12px; }
.src-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 12px; }
.src-tag {
  font-size: 9px; font-weight: 600; color: ${GRN}; background: #ecfdf5;
  border-radius: 3px; padding: 2px 6px;
}

/* Media page */
.media-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 0; border-bottom: 1px solid #f3f4f6;
}
.media-code { font-size: 10px; font-weight: 700; color: ${GRN}; background: #ecfdf5; padding: 2px 6px; border-radius: 3px; }
.media-title { flex: 1; font-size: 13px; font-weight: 500; color: #374151; }

/* Export page */
.export-actions { display: flex; gap: 12px; margin-top: 24px; }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   REUSABLE FIELD COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function Lbl({ children, hint, ind }: { children: string; hint?: string; ind?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 5, flexWrap: "wrap" }}>
      {ind && <span className="ind">{ind}</span>}
      <label className="lbl" style={{ marginBottom: 0 }}>
        {children}
        {hint && <span className="lbl-hint"> — {hint}</span>}
      </label>
    </div>
  );
}

function FG({ label, hint, ind, children }: { label: string; hint?: string; ind?: string; children: React.ReactNode }) {
  return <div className="fg"><Lbl hint={hint} ind={ind}>{label}</Lbl>{children}</div>;
}

function Num({ label, hint, ind, prefix, suffix, value, onChange, ph }: {
  label: string; hint?: string; ind?: string; prefix?: string; suffix?: string;
  value: any; onChange: (v: string) => void; ph?: string;
}) {
  return (
    <div className="fg">
      <Lbl hint={hint} ind={ind}>{label}</Lbl>
      {prefix ? (
        <div className="pfx">
          <span>{prefix}</span>
          <input type="number" value={value ?? ""} onChange={e => onChange(e.target.value)} placeholder={ph ?? "0"} />
        </div>
      ) : suffix ? (
        <div className="sfx">
          <input type="number" value={value ?? ""} onChange={e => onChange(e.target.value)} placeholder={ph ?? "0"} />
          <span>{suffix}</span>
        </div>
      ) : (
        <input type="number" value={value ?? ""} onChange={e => onChange(e.target.value)} placeholder={ph ?? "0"} />
      )}
    </div>
  );
}

function TA({ label, hint, ind, value, onChange, rows = 3 }: {
  label: string; hint?: string; ind?: string; value: any; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div className="fg">
      <Lbl hint={hint} ind={ind}>{label}</Lbl>
      <textarea rows={rows} value={value ?? ""} onChange={e => onChange(e.target.value)} placeholder="Enter description…" />
    </div>
  );
}

function DList({ label, hint, ind, items, onChange, ph = "Enter item…" }: {
  label: string; hint?: string; ind?: string; items: string[]; onChange: (v: string[]) => void; ph?: string;
}) {
  const add = () => onChange([...items, ""]);
  const upd = (i: number, v: string) => { const a = [...items]; a[i] = v; onChange(a); };
  const rm = (i: number) => onChange(items.filter((_, j) => j !== i));
  return (
    <div className="fg">
      <Lbl hint={hint} ind={ind}>{label}</Lbl>
      <div className="dlist">
        {items.map((it, i) => (
          <div key={i} className="dlist-item">
            <span className="dlist-idx">{i + 1}</span>
            <input type="text" value={it} onChange={e => upd(i, e.target.value)} placeholder={ph} />
            <button className="rm-btn" onClick={() => rm(i)}>×</button>
          </div>
        ))}
        <div className="dlist-add" onClick={add}>+ Add row</div>
      </div>
    </div>
  );
}

function AZ({ label, types }: { label: string; types: string }) {
  return (
    <div className="az">
      <div className="az-icon">✦</div>
      <div className="az-text">
        <h4>Allsorter — {label}</h4>
        <p>Upload {types} to auto-populate fields in this section</p>
      </div>
      <div className="az-right">
        <button className="btn btn-green btn-sm">Upload & parse</button>
      </div>
    </div>
  );
}

function CBGroup({ label, hint, ind, options, selected, onChange }: {
  label: string; hint?: string; ind?: string; options: string[]; selected: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (v: string) => onChange(selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v]);
  return (
    <div className="fg">
      <Lbl hint={hint} ind={ind}>{label}</Lbl>
      <div className="cbgrid">
        {options.map(o => (
          <label key={o} className={`cb-item${selected.includes(o) ? " on" : ""}`}>
            <input type="checkbox" checked={selected.includes(o)} onChange={() => toggle(o)} />{o}
          </label>
        ))}
      </div>
    </div>
  );
}

function CVBanner({ n, total, fields, pct }: { n: number; total: number; fields: string; pct: number }) {
  return (
    <div className="cv-banner">
      <span className="cv-banner-icon">📄</span>
      <div className="cv-banner-body">
        <div className="cv-banner-title">CV Auto-fill · {n}/{total} indicators</div>
        <div className="cv-banner-desc">{fields}</div>
        <div className="cv-bar"><div className="cv-bar-fill" style={{ width: pct + "%" }} /></div>
      </div>
      <div className="cv-banner-pct">{pct}%</div>
    </div>
  );
}

function Card({ num, title, sub, color, open: initOpen, children }: {
  num: string; title: string; sub?: string; color?: string; open?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(initOpen ?? false);
  return (
    <div className={`card${open ? " card-open" : ""}`}>
      <div className="card-hdr" onClick={() => setOpen(!open)}>
        <div className="card-hdr-l">
          <div className="card-num" style={{ background: color || GRN }}>{num}</div>
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

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION COMPONENTS — ALL 8 DIMENSIONS
   ═══════════════════════════════════════════════════════════════════════════ */

function SchoolProfile({ d, s }: { d: FD; s: Setter }) {
  return (
    <div>
      <div className="sec-badge">🏫 School Profile</div>
      <h1 className="sec-title">Institution Details</h1>
      <p className="sec-desc">Basic information that frames every dimension of your BSIS pre-visit report.</p>

      <Card num="A" color="#0ea5e9" title="Identity" open>
        <div className="fr2">
          <FG label="Institution name"><input type="text" value={d.name ?? ""} onChange={e => s("name", e.target.value)} placeholder="e.g. University of Vaasa" /></FG>
          <FG label="Public or private">
            <select value={d.type ?? ""} onChange={e => s("type", e.target.value)}>
              <option value="">Select…</option><option>Public</option><option>Private</option><option>Public-Private</option>
            </select>
          </FG>
        </div>
        <FG label="Institution type">
          <select value={d.instType ?? ""} onChange={e => s("instType", e.target.value)}>
            <option value="">Select…</option>
            <option>University Faculty</option><option>University Business School</option>
            <option>Business University</option><option>Independent School of Business</option>
            <option>Graduate School of Business</option>
          </select>
        </FG>
        <div className="fr2">
          <FG label="Dean / Director"><input type="text" value={d.dean ?? ""} onChange={e => s("dean", e.target.value)} /></FG>
          <FG label="Country"><input type="text" value={d.country ?? ""} onChange={e => s("country", e.target.value)} /></FG>
        </div>
        <FG label="City / Region"><input type="text" value={d.city ?? ""} onChange={e => s("city", e.target.value)} /></FG>
        <TA label="Mission" value={d.mission} onChange={v => s("mission", v)} />
        <div className="fr2">
          <TA label="Vision" value={d.vision} onChange={v => s("vision", v)} />
          <TA label="Core values" value={d.values} onChange={v => s("values", v)} />
        </div>
      </Card>

      <Card num="B" color="#0ea5e9" title="Competitive Context">
        <DList label="Direct competitors" items={d.competitors ?? [""]} onChange={v => s("competitors", v)} ph="School name…" />
        <DList label="Inspirational schools" items={d.inspirational ?? [""]} onChange={v => s("inspirational", v)} ph="School name…" />
      </Card>

      <Card num="C" color="#0ea5e9" title="Impact Zone & Scope">
        <div className="info">Define the geographic area where you will measure impact.</div>
        <div className="fr2">
          <FG label="Impact zone"><input type="text" value={d.zone ?? ""} onChange={e => s("zone", e.target.value)} placeholder="e.g. Ostrobothnia region" /></FG>
          <FG label="Scope of assessment">
            <select value={d.scope ?? ""} onChange={e => s("scope", e.target.value)}>
              <option value="">Select…</option><option>Business school only</option>
              <option>Multiple faculties</option><option>Entire university</option><option>Specific campus</option>
            </select>
          </FG>
        </div>
        <TA label="Rationale for zone definition" value={d.zoneRationale} onChange={v => s("zoneRationale", v)} />
        <TA label="Link between school mission and regional environment" value={d.missionLink} onChange={v => s("missionLink", v)} />
      </Card>

      <Card num="D" color="#0ea5e9" title="Faculty & Staff Headcount">
        <AZ label="Faculty CVs" types="PDF or Word CVs for all faculty members" />
        <div className="fr3">
          <Num label="Core faculty (full-time)" value={d.coreFaculty} onChange={v => s("coreFaculty", v)} />
          <Num label="Teaching assistants" value={d.tas} onChange={v => s("tas", v)} />
          <Num label="Adjunct / part-time" value={d.adjunct} onChange={v => s("adjunct", v)} />
        </div>
        <div className="fr2">
          <Num label="Admin staff" value={d.adminStaff} onChange={v => s("adminStaff", v)} />
          <Num label="Adjunct teaching (%)" suffix="%" value={d.adjunctPct} onChange={v => s("adjunctPct", v)} />
        </div>
      </Card>
    </div>
  );
}

function P1({ d, s }: { d: FD; s: Setter }) {
  return (
    <div>
      <div className="sec-badge">💰 Part 1</div>
      <h1 className="sec-title">Financial Impact</h1>
      <p className="sec-desc">Direct and indirect economic contributions to the impact zone.</p>

      <Card num="1.1" title="Budget — Direct Impact" open>
        <div className="fr2">
          <Num ind="1.1.1" label="Total annual budget" prefix="€" value={d.totalBudget} onChange={v => s("totalBudget", v)} />
          <Num ind="1.1.2" label="% spent in impact zone" suffix="%" value={d.budgetZonePct} onChange={v => s("budgetZonePct", v)} />
        </div>
        <div className="fr2">
          <Num ind="1.1.3" label="Foundation budget" prefix="€" value={d.foundationBudget} onChange={v => s("foundationBudget", v)} />
          <Num ind="1.1.4" label="Junior enterprise budget" prefix="€" value={d.jeBudget} onChange={v => s("jeBudget", v)} />
        </div>
        <div className="fr2">
          <Num ind="1.1.5" label="Student association budgets" prefix="€" value={d.assocBudget} onChange={v => s("assocBudget", v)} />
          <Num ind="1.1.6" label="Local alumni budget" prefix="€" value={d.alumniBudget} onChange={v => s("alumniBudget", v)} />
        </div>
        <Num ind="1.1.7" label="Ad hoc / special project budgets" prefix="€" value={d.adhocBudget} onChange={v => s("adhocBudget", v)} />
        <TA ind="1.1.8" label="Methodology & reference period" value={d.budgetMethod} onChange={v => s("budgetMethod", v)} />
      </Card>

      <Card num="1.2" title="Expenditures — Indirect Impact">
        <div className="fr2">
          <Num ind="1.2.1" label="Student expenditures in zone" prefix="€" value={d.studentExp} onChange={v => s("studentExp", v)} />
          <Num ind="1.2.2" label="Admission interviewees — board & lodging" prefix="€" value={d.intervieweeExp} onChange={v => s("intervieweeExp", v)} />
        </div>
        <div className="fr2">
          <Num ind="1.2.3" label="Conference participants" prefix="€" value={d.confExp} onChange={v => s("confExp", v)} />
          <Num ind="1.2.4" label="Exec-ed participants from outside region" prefix="€" value={d.execEdExp} onChange={v => s("execEdExp", v)} />
        </div>
        <div className="fr2">
          <Num ind="1.2.5" label="Visiting professors" prefix="€" value={d.visitProfExp} onChange={v => s("visitProfExp", v)} />
          <Num ind="1.2.6" label="Visiting family/friends (ceremonies)" prefix="€" value={d.familyExp} onChange={v => s("familyExp", v)} />
        </div>
        <TA ind="1.2.7" label="Methodology notes" value={d.expMethod} onChange={v => s("expMethod", v)} />
      </Card>
    </div>
  );
}

function P2({ d, s }: { d: FD; s: Setter }) {
  return (
    <div>
      <div className="sec-badge">🎓 Part 2</div>
      <h1 className="sec-title">Educational Impact</h1>
      <p className="sec-desc">Admission flows, graduate employment, executive education, and alumni networks.</p>

      <Card num="2.1" title="Admission Flows" open>
        <AZ label="Student data" types="enrolment reports, student data spreadsheets" />
        <div className="fr2">
          <Num ind="2.1.1" label="Students from region" value={d.studRegion} onChange={v => s("studRegion", v)} />
          <Num ind="2.1.2" label="National (outside region)" value={d.studNational} onChange={v => s("studNational", v)} />
        </div>
        <div className="fr2">
          <Num ind="2.1.3" label="International (degree)" value={d.studIntlDegree} onChange={v => s("studIntlDegree", v)} />
          <Num ind="2.1.4" label="International on exchange" value={d.studIntlExch} onChange={v => s("studIntlExch", v)} />
        </div>
        <Num ind="2.1.5" label="Total student body" value={d.studTotal} onChange={v => s("studTotal", v)} />
        <TA ind="2.1.6" label="Comments on student mix and regional significance" value={d.studComments} onChange={v => s("studComments", v)} />
      </Card>

      <Card num="2.2" title="Entry into the Job Market">
        <div className="fr2">
          <Num ind="2.2.1" label="Total graduates (past 12mo)" value={d.gradsTotal} onChange={v => s("gradsTotal", v)} />
          <Num ind="2.2.2" label="Entering regional job market" value={d.gradsRegion} onChange={v => s("gradsRegion", v)} />
        </div>
        <div className="fr2">
          <Num ind="2.2.3" label="Entering national market" value={d.gradsNational} onChange={v => s("gradsNational", v)} />
          <Num ind="2.2.4" label="Entering international market" value={d.gradsIntl} onChange={v => s("gradsIntl", v)} />
        </div>
        <div className="fr2">
          <Num ind="2.2.5" label="% intl grads — first job in region" suffix="%" value={d.intlGradRegion} onChange={v => s("intlGradRegion", v)} />
          <Num ind="2.2.6" label="% intl grads — first job in country" suffix="%" value={d.intlGradCountry} onChange={v => s("intlGradCountry", v)} />
        </div>
        <TA ind="2.2.7" label="Breakdown by programme segment" value={d.gradBreakdown} onChange={v => s("gradBreakdown", v)} />
      </Card>

      <Card num="2.3" title="Executive Education">
        <div className="fr2">
          <Num ind="2.3.1" label="Exec-ed participants from zone" value={d.execEdZone} onChange={v => s("execEdZone", v)} />
          <Num ind="2.3.2" label="Total exec-ed days in zone" value={d.execEdDays} onChange={v => s("execEdDays", v)} />
        </div>
        <DList ind="2.3.3" label="Companies sending managers to open courses" items={d.execEdCompanies ?? [""]} onChange={v => s("execEdCompanies", v)} ph="Company name…" />
        <DList ind="2.3.4" label="Companies receiving customised courses" items={d.execEdCustom ?? [""]} onChange={v => s("execEdCustom", v)} ph="Company name…" />
        <CBGroup ind="2.3.5" label="Target groups" options={["Top managers","Middle managers","Junior managers","Technicians","Functional specialists","Job seekers","Other"]} selected={d.execEdTargets ?? []} onChange={v => s("execEdTargets", v)} />
        <CBGroup ind="2.3.6" label="Course content areas" options={["Sales","Finance","Marketing","Export","Project management","Leadership","Digital / AI","Sustainability","Other"]} selected={d.execEdContent ?? []} onChange={v => s("execEdContent", v)} />
      </Card>

      <Card num="2.4" title="Part-time Degree & Certification">
        <div className="fr3">
          <Num ind="2.4.1" label="Graduates — Bachelor's (PT)" value={d.ptBachelor} onChange={v => s("ptBachelor", v)} />
          <Num ind="2.4.2" label="Graduates — Master's (PT)" value={d.ptMaster} onChange={v => s("ptMaster", v)} />
          <Num ind="2.4.3" label="Graduates — MBA (PT)" value={d.ptMBA} onChange={v => s("ptMBA", v)} />
        </div>
        <div className="fr2">
          <Num ind="2.4.4" label="Graduates — DBA (PT)" value={d.ptDBA} onChange={v => s("ptDBA", v)} />
          <Num ind="2.4.5" label="Certification programmes (1+ yr)" value={d.ptCerts} onChange={v => s("ptCerts", v)} />
        </div>
        <DList ind="2.4.6" label="Companies sending employees to PT programmes" items={d.ptCompanies ?? [""]} onChange={v => s("ptCompanies", v)} ph="Company name…" />
      </Card>

      <Card num="2.5" title="Alumni">
        <AZ label="Alumni records" types="alumni spreadsheets or LinkedIn data exports" />
        <div className="fr2">
          <Num ind="2.5.1" label="Total alumni in region" value={d.alumniRegion} onChange={v => s("alumniRegion", v)} />
          <Num ind="2.5.2" label="International alumni in region" value={d.alumniIntl} onChange={v => s("alumniIntl", v)} />
        </div>
        <FG label="Structured Alumni Association in region?" ind="2.5.3">
          <select value={d.alumniAssoc ?? ""} onChange={e => s("alumniAssoc", e.target.value)}>
            <option value="">Select…</option><option>Yes</option><option>No</option><option>Informal network only</option>
          </select>
        </FG>
        <DList ind="2.5.4" label="Alumni Association events (past 12 months)" items={d.alumniEvents ?? [""]} onChange={v => s("alumniEvents", v)} ph="Event name…" />
        <DList ind="2.5.5" label="Alumni in senior roles at local companies (500+)" items={d.alumniSenior ?? [""]} onChange={v => s("alumniSenior", v)} ph="Name — Company — Role" />
        <TA ind="2.5.6" label="Evidence of alumni impact at regional level" value={d.alumniEvidence} onChange={v => s("alumniEvidence", v)} />
      </Card>
    </div>
  );
}

function P3({ d, s }: { d: FD; s: Setter }) {
  return (
    <div>
      <div className="sec-badge">🚀 Part 3</div>
      <h1 className="sec-title">Business Development Impact</h1>
      <p className="sec-desc">Resources provided to companies, new venture creation, and job creation.</p>
      <CVBanner n={2} total={10} fields="Consulting days, professor startups" pct={20} />

      <Card num="3.1" title="Resources for Companies" open>
        <div className="fr2">
          <Num ind="3.1.1" label="Internships with local companies" value={d.internships} onChange={v => s("internships", v)} />
          <Num ind="3.1.2" label="Short student missions / projects" value={d.missions} onChange={v => s("missions", v)} />
        </div>
        <div className="fr2">
          <Num ind="3.1.3" label="Gap years at local company abroad" value={d.gapYears} onChange={v => s("gapYears", v)} />
          <Num ind="3.1.4" label="Students on apprenticeships" value={d.apprentices} onChange={v => s("apprentices", v)} />
        </div>
        <Num ind="3.1.5" label="Professor consulting / teaching days" value={d.profConsulting} onChange={v => s("profConsulting", v)} />
      </Card>

      <Card num="3.2" title="New Business Creation & Takeovers">
        <DList ind="3.2.1" label="Entrepreneurial structures (incubators, centres)" items={d.incubators ?? [""]} onChange={v => s("incubators", v)} ph="Name & description…" />
        <div className="fr3">
          <Num ind="3.2.2" label="Start-ups by students (12mo)" value={d.startupStudents} onChange={v => s("startupStudents", v)} />
          <Num ind="3.2.3" label="Start-ups by professors" value={d.startupProfs} onChange={v => s("startupProfs", v)} />
          <Num ind="3.2.4" label="Start-ups by alumni" value={d.startupAlumni} onChange={v => s("startupAlumni", v)} />
        </div>
        <Num ind="3.2.5" label="Jobs created by start-ups" value={d.startupJobs} onChange={v => s("startupJobs", v)} />
      </Card>
    </div>
  );
}

function P4({ d, s }: { d: FD; s: Setter }) {
  return (
    <div>
      <div className="sec-badge">🔬 Part 4</div>
      <h1 className="sec-title">Intellectual Impact</h1>
      <p className="sec-desc">Research production, regional publications, chairs, and public events.</p>
      <CVBanner n={16} total={22} fields="Publications, citations, expertise, PhD supervision" pct={72} />

      <Card num="4.1" title="National & International Production" open>
        <AZ label="Research data" types="faculty CVs, PURE exports, research lists, or annual reports" />
        <div className="fr3">
          <Num ind="4.1.1" label="PhD defences" value={d.phdDefences} onChange={v => s("phdDefences", v)} />
          <Num ind="4.1.2" label="Academic journal articles" value={d.journalArticles} onChange={v => s("journalArticles", v)} />
          <Num ind="4.1.3" label="Professional articles" value={d.profArticles} onChange={v => s("profArticles", v)} />
        </div>
        <div className="fr3">
          <Num ind="4.1.4" label="Books authored" value={d.books} onChange={v => s("books", v)} />
          <Num ind="4.1.5" label="Co-authored books" value={d.coBooks} onChange={v => s("coBooks", v)} />
          <Num ind="4.1.6" label="Book chapters" value={d.chapters} onChange={v => s("chapters", v)} />
        </div>
        <div className="fr3">
          <Num ind="4.1.7" label="Conference papers" value={d.confPapers} onChange={v => s("confPapers", v)} />
          <Num ind="4.1.8" label="Published cases" value={d.cases} onChange={v => s("cases", v)} />
          <Num ind="4.1.9" label="Conferences organised" value={d.confsOrg} onChange={v => s("confsOrg", v)} />
        </div>
        <TA ind="4.1.10" label="How research productivity is measured" value={d.resProdMethod} onChange={v => s("resProdMethod", v)} />
        <TA ind="4.1.11" label="How research impact is measured" value={d.resImpactMethod} onChange={v => s("resImpactMethod", v)} />
        <DList ind="4.1.12" label="Fields of nationally recognised expertise" items={d.natExpertise ?? [""]} onChange={v => s("natExpertise", v)} />
        <DList ind="4.1.13" label="Fields of internationally recognised expertise" items={d.intlExpertise ?? [""]} onChange={v => s("intlExpertise", v)} />
        <TA ind="4.1.14" label="Link between research expertise and UN SDGs" value={d.resSDGLink} onChange={v => s("resSDGLink", v)} />
      </Card>

      <Card num="4.2" title="Regional Publications & Communications">
        <DList ind="4.2.1" label="PhDs on topics concerning the region" items={d.regPhds ?? [""]} onChange={v => s("regPhds", v)} />
        <DList ind="4.2.2" label="Academic articles concerning the region" items={d.regArticles ?? [""]} onChange={v => s("regArticles", v)} />
        <DList ind="4.2.3" label="Books/chapters concerning the region" items={d.regBooks ?? [""]} onChange={v => s("regBooks", v)} />
        <DList ind="4.2.4" label="Research partnerships with regional orgs" items={d.regPartnerships ?? [""]} onChange={v => s("regPartnerships", v)} />
        <TA ind="4.2.5" label="Consulting reports for regional companies / authorities" value={d.regConsulting} onChange={v => s("regConsulting", v)} />
      </Card>

      <Card num="4.3" title="Chairs and Research Partnerships">
        <DList ind="4.3.1" label="Chairs linked to the impact zone" items={d.chairs ?? [""]} onChange={v => s("chairs", v)} ph="Chair name — sponsor…" />
        <DList ind="4.3.2" label="Research partnerships with regional organisations" items={d.resPartners ?? [""]} onChange={v => s("resPartners", v)} />
      </Card>

      <Card num="4.4" title="Public Lectures and Events">
        <DList ind="4.4.1" label="Public events and lectures (past 12 months)" items={d.pubEvents ?? [""]} onChange={v => s("pubEvents", v)} ph="Event name — date — attendance" />
      </Card>

      <Card num="4.5" title="Research Impact on Teaching">
        <TA ind="4.5.1" label="Influence on programme design and course content" value={d.resTeachInfluence} onChange={v => s("resTeachInfluence", v)} />
        <TA ind="4.5.2" label="Coherent link: research agenda ↔ programme offer ↔ regional environment" value={d.resTeachLink} onChange={v => s("resTeachLink", v)} />
      </Card>
    </div>
  );
}

function P5({ d, s }: { d: FD; s: Setter }) {
  return (
    <div>
      <div className="sec-badge">🌐 Part 5</div>
      <h1 className="sec-title">Regional Ecosystem Impact</h1>
      <p className="sec-desc">Academic networks, visiting lecturers, and civic engagement.</p>

      <Card num="5.1" title="Academic and Professional Networks" open>
        <AZ label="Partnerships" types="PDF agreements, MOU documents, or partnership spreadsheets" />
        <DList ind="5.1.1" label="Partnerships with academic institutions in zone" items={d.acadPartners ?? [""]} onChange={v => s("acadPartners", v)} />
        <DList ind="5.1.2" label="Partnerships with professional institutions" items={d.profPartners ?? [""]} onChange={v => s("profPartners", v)} />
        <DList ind="5.1.3" label="Partnerships with local / regional public authorities" items={d.govtPartners ?? [""]} onChange={v => s("govtPartners", v)} />
        <DList ind="5.1.4" label="Collaborative initiatives within the wider university" items={d.uniInitiatives ?? [""]} onChange={v => s("uniInitiatives", v)} />
        <TA ind="5.1.5" label="Regional ecosystem diagram / description" value={d.ecoDesc} onChange={v => s("ecoDesc", v)} />
      </Card>

      <Card num="5.2" title="Visiting Lecturers and Adjunct Professors">
        <Num ind="5.2.1" label="Managers/professionals from region in educational activities" value={d.visitMgrs} onChange={v => s("visitMgrs", v)} />
        <TA ind="5.2.2" label="Key practitioners and their contributions" value={d.visitContrib} onChange={v => s("visitContrib", v)} />
      </Card>

      <Card num="5.3" title="Staff in Professional or Civic Functions">
        <AZ label="Staff CVs" types="faculty and staff CVs highlighting board memberships and civic roles" />
        <DList ind="5.3.1" label="Staff members in local professional or civic bodies" items={d.civicRoles ?? [""]} onChange={v => s("civicRoles", v)} ph="Name — Organisation — Role" />
      </Card>
    </div>
  );
}

function P6({ d, s }: { d: FD; s: Setter }) {
  const allSDGs = ["SDG 1","SDG 2","SDG 3","SDG 4","SDG 5","SDG 6","SDG 7","SDG 8","SDG 9","SDG 10","SDG 11","SDG 12","SDG 13","SDG 14","SDG 15","SDG 16","SDG 17"];
  return (
    <div>
      <div className="sec-badge">🌱 Part 6</div>
      <h1 className="sec-title">Societal Impact</h1>
      <p className="sec-desc">CSR policies, SDG commitment, diversity, inclusion, and environmental practices.</p>

      <Card num="6.1" title="CSR and SDG Commitment" open>
        <TA ind="6.1.1" label="School's specific CSR and sustainable development policies" value={d.csrPolicies} onChange={v => s("csrPolicies", v)} />
        <TA ind="6.1.2" label="Management structure for implementing CSR" value={d.csrMgmt} onChange={v => s("csrMgmt", v)} />
        <CBGroup ind="6.1.3" label="SDGs actively addressed" options={allSDGs} selected={d.sdgs ?? []} onChange={v => s("sdgs", v)} />
        <TA ind="6.1.4" label="School as environmental management role model" value={d.envModel} onChange={v => s("envModel", v)} />
        <TA ind="6.1.5" label="School as diversity and inclusion role model" value={d.divModel} onChange={v => s("divModel", v)} />
      </Card>

      <Card num="6.2" title="CSR in Academic and Educational Activities">
        <TA ind="6.2.1" label="Programmes and courses on CSR and SDGs" value={d.csrCourses} onChange={v => s("csrCourses", v)} />
        <DList ind="6.2.2" label="Innovative educational projects on CSR / sustainability" items={d.csrProjects ?? [""]} onChange={v => s("csrProjects", v)} />
        <TA ind="6.2.3" label="CSR in research and publications — mapped against SDGs" value={d.csrResearch} onChange={v => s("csrResearch", v)} />
      </Card>

      <Card num="6.3" title="CSR in Organisational Practices">
        <TA ind="6.3.1" label="Environmental sustainability practices" value={d.envPractices} onChange={v => s("envPractices", v)} />
        <div className="fr3">
          <Num ind="6.3.2" label="Female faculty" suffix="%" value={d.femaleFaculty} onChange={v => s("femaleFaculty", v)} />
          <Num ind="6.3.3" label="Female admin staff" suffix="%" value={d.femaleAdmin} onChange={v => s("femaleAdmin", v)} />
          <Num ind="6.3.4" label="Female students" suffix="%" value={d.femaleStudents} onChange={v => s("femaleStudents", v)} />
        </div>
        <div className="fr3">
          <Num ind="6.3.5" label="International faculty" suffix="%" value={d.intlFaculty} onChange={v => s("intlFaculty", v)} />
          <Num ind="6.3.6" label="International admin" suffix="%" value={d.intlAdmin} onChange={v => s("intlAdmin", v)} />
          <Num ind="6.3.7" label="International students" suffix="%" value={d.intlStudents} onChange={v => s("intlStudents", v)} />
        </div>
        <Num ind="6.3.8" label="Disadvantaged students admitted (annual)" value={d.disadvStudents} onChange={v => s("disadvStudents", v)} />
        <TA ind="6.3.9" label="Financial support for access and inclusion" value={d.finSupport} onChange={v => s("finSupport", v)} />
      </Card>
    </div>
  );
}

function P7({ d, s }: { d: FD; s: Setter }) {
  return (
    <div>
      <div className="sec-badge">⭐ Part 7</div>
      <h1 className="sec-title">Image Impact</h1>
      <p className="sec-desc">Business attractiveness, media presence, rankings, and regional reputation.</p>

      <Card num="7.1" title="Attractiveness for Business Enterprise" open>
        <TA ind="7.1.1" label="Contribution to local development projects attracting new companies" value={d.devContrib} onChange={v => s("devContrib", v)} />
        <DList ind="7.1.2" label="Examples of supporting companies that relocated to the region" items={d.relocatedCos ?? [""]} onChange={v => s("relocatedCos", v)} />
      </Card>

      <Card num="7.2" title="Regional Image">
        <TA ind="7.2.1" label="School's image among regional stakeholders" value={d.regImage} onChange={v => s("regImage", v)} />
        <div className="fr2">
          <Num ind="7.2.2" label="Citations in regional media (12mo)" value={d.regCitations} onChange={v => s("regCitations", v)} />
          <Num ind="7.2.3" label="Feature articles in regional press" value={d.regFeatures} onChange={v => s("regFeatures", v)} />
        </div>
        <DList ind="7.2.4" label="Significant regional media examples" items={d.regMediaEx ?? [""]} onChange={v => s("regMediaEx", v)} />
        <Num ind="7.2.5" label="Regional forums where school was present" value={d.regForums} onChange={v => s("regForums", v)} />
      </Card>

      <Card num="7.3" title="National Image">
        <div className="fr2">
          <Num ind="7.3.1" label="Citations in national media (12mo)" value={d.natCitations} onChange={v => s("natCitations", v)} />
          <Num ind="7.3.2" label="Feature articles in national press" value={d.natFeatures} onChange={v => s("natFeatures", v)} />
        </div>
        <DList ind="7.3.3" label="Significant national media examples" items={d.natMediaEx ?? [""]} onChange={v => s("natMediaEx", v)} />
      </Card>

      <Card num="7.4" title="International Image and Rankings">
        <DList ind="7.4.1" label="International rankings and positions" items={d.intlRankings ?? [""]} onChange={v => s("intlRankings", v)} ph="Ranking — Position — Year" />
        <DList ind="7.4.2" label="International media coverage" items={d.intlMedia ?? [""]} onChange={v => s("intlMedia", v)} />
        <TA ind="7.4.3" label="International partnerships that enhance regional visibility" value={d.intlPartVis} onChange={v => s("intlPartVis", v)} />
      </Card>

      <Card num="7.5" title="Overall Contribution to Regional Attractiveness">
        <TA ind="7.5.1" label="How does the school's reputation reinforce the city/region's image?" value={d.repContrib} onChange={v => s("repContrib", v)} />
        <TA ind="7.5.2" label="Distinctive alignment of school expertise with regional traditions" value={d.alignment} onChange={v => s("alignment", v)} />
      </Card>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DASHBOARD, DATA SOURCES, MEDIA INTEL, EXPORT
   ═══════════════════════════════════════════════════════════════════════════ */

function Dashboard({ data, go }: { data: FD; go: (v: string) => void }) {
  const overall = overallPct(data);
  const totalFields = Object.values(FIELD_COUNTS).reduce((a, b) => a + b, 0);
  return (
    <div>
      <div className="dash-hero">
        <h1>BSIS Data Collection</h1>
        <p>Calibre assessment tool — evidence-based impact measurement</p>
        <div className="dash-stats">
          <div className="dash-stat"><div className="dash-stat-val">{overall}%</div><div className="dash-stat-lbl">Complete</div></div>
          <div className="dash-stat"><div className="dash-stat-val">{totalFields}</div><div className="dash-stat-lbl">Indicators</div></div>
          <div className="dash-stat"><div className="dash-stat-val">7</div><div className="dash-stat-lbl">Dimensions</div></div>
          <div className="dash-stat"><div className="dash-stat-val">4–6</div><div className="dash-stat-lbl">Months typical</div></div>
        </div>
      </div>
      <div className="dash-grid">
        {DIMS.map(d => {
          const p = dimPct(data, d.id);
          return (
            <div key={d.id} className="dash-card" onClick={() => go(d.id)}>
              <div className="dash-card-top">
                <span className="dash-card-icon">{d.icon}</span>
                <span className="dash-card-name">{d.label}</span>
                <span className="dash-card-count">{FIELD_COUNTS[d.id]} indicators</span>
              </div>
              <div className="dash-card-bar">
                <div className="dash-card-fill" style={{ width: p + "%", background: d.color }} />
              </div>
              <div className="dash-card-pct">{p}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const SOURCES = [
  { name: "Faculty CVs", desc: "PDF or Word CVs for all faculty members", maps: 28, tags: ["4.1","5.3","6.3"] },
  { name: "Enrolment Records", desc: "Student data exports, spreadsheets", maps: 10, tags: ["2.1","2.4"] },
  { name: "Alumni Records", desc: "Alumni spreadsheets or LinkedIn data", maps: 6, tags: ["2.5"] },
  { name: "Partnership / MOU Docs", desc: "PDF agreements, MOU documents", maps: 5, tags: ["5.1"] },
  { name: "Annual Report", desc: "Institutional review or annual report", maps: 8, tags: ["1.1","School"] },
  { name: "Publication Lists", desc: "PURE export, research lists", maps: 12, tags: ["4.1","4.2"] },
  { name: "Exec Education Records", desc: "Programme records, participant lists", maps: 7, tags: ["2.3"] },
  { name: "Press / Media Clippings", desc: "Regional and national media", maps: 7, tags: ["7.2","7.3"] },
  { name: "Student CVs", desc: "Student placement data", maps: 8, tags: ["2.2","3.1"] },
  { name: "Sustainability / CSR Report", desc: "CSR report or sustainability audit", maps: 10, tags: ["6.1","6.2","6.3"] },
  { name: "Accreditation Self-Eval", desc: "AACSB, EQUIS or AMBA self-evaluation", maps: 30, tags: ["All"] },
];

function DataSources() {
  return (
    <div>
      <div className="sec-badge">📥 Data Sources</div>
      <h1 className="sec-title">Document Upload & Data Sources</h1>
      <p className="sec-desc">Upload documents to auto-populate indicators across all dimensions. Each source maps to specific BSIS indicators.</p>

      <div style={{ marginBottom: 24 }}>
        <button className="btn btn-green">Upload All Documents (Batch)</button>
      </div>

      <div className="src-grid">
        {SOURCES.map(s => (
          <div key={s.name} className="src-card">
            <h4>{s.name}</h4>
            <p>{s.desc}</p>
            <div className="src-tags">{s.tags.map(t => <span key={t} className="src-tag">{t}</span>)}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: "#9ca3af" }}>Maps to ~{s.maps} indicators</span>
              <button className="btn btn-green btn-sm">Upload & parse</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Web Crawler — School Website</h2>
        <div className="info">Enter URLs for key pages on your institution's website. The crawler will extract relevant data points.</div>
        {["Main website","Faculty directory","Research pages","Partnerships","CSR / Sustainability","News & Events","Executive education","Alumni pages","Programme catalogue","Entrepreneurship / Incubator","Diversity / People"].map(p => (
          <div key={p} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151", width: 180, flexShrink: 0 }}>{p}</span>
            <input type="text" placeholder="https://..." style={{ flex: 1 }} />
            <button className="btn btn-ghost btn-sm">Crawl</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const MEDIA_QUERIES = [
  { cat: "Regional Media", items: [
    { code: "7.2.2", title: "Regional newspaper citations", query: "\"University of Vaasa\" site:*.fi" },
    { code: "7.2.3", title: "Regional feature articles", query: "\"University of Vaasa\" business school region" },
    { code: "7.2.5", title: "Regional forums & conferences", query: "\"University of Vaasa\" forum conference Ostrobothnia" },
    { code: "7.2.1", title: "School reputation — regional", query: "\"University of Vaasa\" ranking reputation" },
  ]},
  { cat: "National Media", items: [
    { code: "7.3.1", title: "National newspaper citations", query: "\"University of Vaasa\" site:hs.fi OR site:yle.fi" },
    { code: "7.3.2", title: "National feature articles", query: "\"University of Vaasa\" business school Finland" },
  ]},
  { cat: "Academic & Publications", items: [
    { code: "4.2", title: "Google Scholar — regional research", query: "site:scholar.google.com \"University of Vaasa\" Ostrobothnia" },
    { code: "4.1", title: "Google Scholar — all faculty output", query: "site:scholar.google.com \"University of Vaasa\"" },
  ]},
];

function MediaIntel() {
  return (
    <div>
      <div className="sec-badge">🔍 Media Intelligence</div>
      <h1 className="sec-title">Media Intelligence</h1>
      <p className="sec-desc">Pre-built search queries to gather media citations, rankings, and publication data. Click "Open search" to run each query in your browser.</p>

      {MEDIA_QUERIES.map(cat => (
        <div key={cat.cat} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{cat.cat}</h3>
          {cat.items.map(q => (
            <div key={q.code} className="media-row">
              <span className="media-code">{q.code}</span>
              <span className="media-title">{q.title}</span>
              <span style={{ fontSize: 11, color: "#9ca3af", flex: 1, textAlign: "right", marginRight: 8 }}>{q.query}</span>
              <a href={`https://www.google.com/search?q=${encodeURIComponent(q.query)}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">Open search →</a>
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Results Recording</h3>
        <div className="fr2">
          <FG label="Regional media citations — count"><input type="number" placeholder="0" /></FG>
          <FG label="Regional feature articles — count"><input type="number" placeholder="0" /></FG>
        </div>
        <div className="fr2">
          <FG label="National media citations — count"><input type="number" placeholder="0" /></FG>
          <FG label="National feature articles — count"><input type="number" placeholder="0" /></FG>
        </div>
        <TA label="Paste regional media examples" value="" onChange={() => {}} />
        <TA label="Paste national media examples" value="" onChange={() => {}} />
      </div>
    </div>
  );
}

function ExportPage({ data }: { data: FD }) {
  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "calibre-bsis-export.json"; a.click();
    URL.revokeObjectURL(url);
  };
  const overall = overallPct(data);
  return (
    <div>
      <div className="sec-badge">↓ Export</div>
      <h1 className="sec-title">Export Report</h1>
      <p className="sec-desc">Download your collected data for submission to EFMD or for internal review.</p>

      <div className="warn">Review all sections before exporting. Incomplete fields will appear blank in the output.</div>

      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 10, padding: 24, marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Overall Completion: {overall}%</div>
        <div className="prog-track" style={{ marginBottom: 16 }}>
          <div className="prog-fill" style={{ width: overall + "%" }} />
        </div>
        {DIMS.map(d => {
          const p = dimPct(data, d.id);
          return (
            <div key={d.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ width: 20, textAlign: "center" }}>{d.icon}</span>
              <span style={{ flex: 1, fontSize: 13, color: "#374151" }}>{d.label}</span>
              <span style={{ fontSize: 12, fontWeight: 600, color: p === 100 ? "#16a34a" : "#6b7280", width: 40, textAlign: "right" }}>{p}%</span>
            </div>
          );
        })}
      </div>

      <div className="export-actions">
        <button className="btn btn-green" onClick={exportJSON}>⬇ Export JSON</button>
        <button className="btn btn-burg">⬇ Export Excel</button>
        <button className="btn btn-ghost">Send to BSIS Portal</button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════════════════════════════ */

export default function App() {
  const [view, setView] = useState("dashboard");
  const [data, setData] = useState<FD>(initData);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      try { localStorage.setItem(SKEY, JSON.stringify(data)); } catch {}
    }, 500);
    return () => clearTimeout(t);
  }, [data]);

  const set = useCallback((sec: string) => (k: string, v: any) => {
    setData(prev => ({ ...prev, [sec]: { ...prev[sec], [k]: v } }));
  }, []);

  const go = useCallback((id: string) => {
    setView(id);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const overall = overallPct(data);
  const cur = ALL_PAGES.find(x => x.id === view);

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sb-brand">
            <div className="sb-wordmark">
              <span>Calibre</span>
              <span className="sb-wordmark-for">for</span>
              <span className="sb-wordmark-bsis">BSIS</span>
            </div>
            <div className="sb-tagline">Evidence, not opinion.</div>
          </div>
          <div className="sb-progress">
            <div className="sb-prog-row"><span>Progress</span><strong>{overall}%</strong></div>
            <div className="prog-track"><div className="prog-fill" style={{ width: overall + "%" }} /></div>
          </div>
          <nav className="sb-nav">
            <div className="sb-sec-lbl">Navigation</div>
            {ALL_PAGES.map(p => {
              const pct = DIMS.find(d => d.id === p.id) ? dimPct(data, p.id) : undefined;
              return (
                <div key={p.id} className={`nav-item${view === p.id ? " active" : ""}`} onClick={() => go(p.id)}>
                  <div className="nav-icon">{p.icon}</div>
                  <div className="nav-label">{p.label}</div>
                  {pct !== undefined && <div className="nav-pct">{pct > 0 ? pct + "%" : ""}</div>}
                </div>
              );
            })}
          </nav>
          <div className="sb-footer">
            <div className="sb-saved">Saved automatically</div>
            <button className="btn btn-ghost btn-sm" style={{ width: "100%" }} onClick={() => go("export")}>↓ Export report</button>
          </div>
        </aside>

        {/* Main */}
        <main className="main" ref={mainRef}>
          <div className="topbar">
            <div className="topbar-l">{cur?.label}</div>
            <div className="topbar-r">
              <span className="topbar-saved">auto-saved</span>
              <button className="btn btn-green btn-sm" onClick={() => go("export")}>Export</button>
            </div>
          </div>
          <div className="content">
            {view === "dashboard" && <Dashboard data={data} go={go} />}
            {view === "school" && <SchoolProfile d={data.school || {}} s={set("school")} />}
            {view === "p1" && <P1 d={data.p1 || {}} s={set("p1")} />}
            {view === "p2" && <P2 d={data.p2 || {}} s={set("p2")} />}
            {view === "p3" && <P3 d={data.p3 || {}} s={set("p3")} />}
            {view === "p4" && <P4 d={data.p4 || {}} s={set("p4")} />}
            {view === "p5" && <P5 d={data.p5 || {}} s={set("p5")} />}
            {view === "p6" && <P6 d={data.p6 || {}} s={set("p6")} />}
            {view === "p7" && <P7 d={data.p7 || {}} s={set("p7")} />}
            {view === "sources" && <DataSources />}
            {view === "media" && <MediaIntel />}
            {view === "export" && <ExportPage data={data} />}
          </div>
        </main>
      </div>
    </>
  );
}
