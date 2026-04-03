// Supabase configuration — credentials read from .env.local (gitignored).
// See .env.example for required variable names.
export const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const SCHOOL_ID = "a52748ab-65cf-46d8-b28d-74a4a7c88020"; // University of Vaasa
export const SCHOOL_WEBSITE = "https://www.uwasa.fi/en";
export const SCRAPE_FN_URL = SUPABASE_URL + "/functions/v1/run-school-scrape";

// Document type mappings for uploads
export const DOCUMENT_TYPE_MAP = {
  "Faculty CVs": {
    table: "faculty_cvs",
    type: null
  },
  "Alumni Records": {
    table: "alumni_records",
    type: null
  },
  "Student CVs": {
    table: "faculty_cvs",
    type: null,
    employment_type: "visiting"
  },
  "Enrolment Records": {
    table: "documents",
    type: "enrolment_data"
  },
  "Partnership / MOU Docs": {
    table: "documents",
    type: "partnership_mou"
  },
  "Annual Report": {
    table: "documents",
    type: "annual_report"
  },
  "Publication Lists": {
    table: "documents",
    type: "publication_list"
  },
  "Exec Education Records": {
    table: "documents",
    type: "exec_education"
  },
  "Press / Media Clippings": {
    table: "documents",
    type: "press_clipping"
  },
  "Sustainability / CSR Report": {
    table: "documents",
    type: "strategy_doc"
  },
  "Accreditation Self-Eval": {
    table: "documents",
    type: "other"
  }
};
