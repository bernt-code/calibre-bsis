// Brand color
export const PRIMARY_COLOR = "#2e8b57";

// localStorage key for data persistence
export const STORAGE_KEY = "calibre_bsis_v1";

// Legacy storage keys to check for migration
export const LEGACY_STORAGE_KEYS = ["calibre", "calibre-v4", "calibre-v3", "calibre-v2", "calibre-data"];

// Dimension tabs configuration
export const DIMENSIONS = [
  {
    id: "school",
    label: "School Profile",
    icon: "🏫",
    color: "#0ea5e9"
  },
  {
    id: "p1",
    label: "1 · Financial",
    icon: "💰",
    color: "#2e8b57"
  },
  {
    id: "p2",
    label: "2 · Educational",
    icon: "🎓",
    color: "#1d4ed8"
  },
  {
    id: "p3",
    label: "3 · Business Dev",
    icon: "🚀",
    color: "#c44b22"
  },
  {
    id: "p4",
    label: "4 · Intellectual",
    icon: "🔬",
    color: "#7c3aed"
  },
  {
    id: "p5",
    label: "5 · Ecosystem",
    icon: "🌐",
    color: "#0f766e"
  },
  {
    id: "p6",
    label: "6 · Societal",
    icon: "🌱",
    color: "#15803d"
  },
  {
    id: "p7",
    label: "7 · Image",
    icon: "⭐",
    color: "#9B243E"
  }
];

// All navigation items
export const NAV_ITEMS = [
  {
    id: "home",
    label: "Home",
    icon: "●"
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "◈"
  },
  {
    id: "setup",
    label: "Setup & Scrape",
    icon: "⚡"
  },
  {
    id: "cvs",
    label: "CV Collection",
    icon: "📄"
  },
  ...DIMENSIONS,
  {
    id: "sources",
    label: "Data Sources",
    icon: "📥"
  },
  {
    id: "media",
    label: "Media Intel",
    icon: "🔍"
  },
  {
    id: "export",
    label: "Export",
    icon: "↓"
  }
];

// CV stakeholder roles
export const CV_STAKEHOLDERS = [
  {
    id: "dean",
    role: "Dean / Director",
    name: "",
    feeds: ["school", "p1", "p3", "p7"]
  },
  {
    id: "research",
    role: "VP Research / Research Director",
    name: "",
    feeds: ["p4", "p5"]
  },
  {
    id: "academic",
    role: "VP Academic / Programme Director",
    name: "",
    feeds: ["p2", "p6"]
  },
  {
    id: "exec_ed",
    role: "Executive Education Director",
    name: "",
    feeds: ["p2", "p3"]
  },
  {
    id: "alumni",
    role: "Alumni Relations Director",
    name: "",
    feeds: ["p2", "p7"]
  },
  {
    id: "intl",
    role: "International Relations Director",
    name: "",
    feeds: ["p5", "p2"]
  },
  {
    id: "csr",
    role: "CSR / Sustainability Officer",
    name: "",
    feeds: ["p6", "p5"]
  }
];

// Field totals per section
export const FIELD_TOTALS = {
  school: 15,
  p1: 15,
  p2: 28,
  p3: 10,
  p4: 22,
  p5: 8,
  p6: 14,
  p7: 12
};
