// Supabase configuration
export const SUPABASE_URL = "https://jzhcjenhsbcftinzfozz.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6aGNqZW5oc2JjZnRpbnpmb3p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1MTUxNTIsImV4cCI6MjA5MDA5MTE1Mn0.vvkajGZYuZMMEY4OEu6khmfFgd51UOKozFKh1e85vCM";
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
