# BSIS by Calibre - React Multi-File Source Structure

Extracted and restructured from minified single-file React app into a proper multi-file project architecture.

## Project Structure

```
calibre-bsis/
├── public/
│   └── index.html                 # HTML entry point
├── src/
│   ├── main.jsx                   # React entry point (createRoot)
│   ├── App.jsx                    # Root component with routing & sidebar
│   │
│   ├── lib/
│   │   ├── constants.js           # Navigation, dimensions, field sources, CV roles
│   │   ├── dataModel.js           # Default data with University of Vaasa sample
│   │   ├── completion.js          # Field counting, percentage calculations
│   │   ├── storage.js             # localStorage load/save with migration
│   │   └── supabase.js            # Supabase config & document type mappings
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── SourceBadge.jsx    # Data source type badge (scraped/cv/manual/derived)
│   │   │   ├── FieldLabel.jsx     # Label with hint and source badge
│   │   │   ├── FormGroup.jsx      # Wrapper with label
│   │   │   ├── TextInput.jsx      # Text/number input with optional prefix/suffix
│   │   │   ├── TextArea.jsx       # Textarea field
│   │   │   ├── ListInput.jsx      # Dynamic list with add/remove items
│   │   │   ├── Section.jsx        # Collapsible card section
│   │   │   └── DimensionIntro.jsx # CV auto-fill progress banner
│   │   │
│   │   └── pages/
│   │       ├── HomePage.jsx           # Landing page with lead form
│   │       ├── Dashboard.jsx          # Completion metrics & overview
│   │       ├── SchoolProfile.jsx      # Institution identity, competitors, impact zone
│   │       ├── P1Financial.jsx        # Financial impact (budgets, expenditures)
│   │       ├── DimensionPages.jsx     # P2–P7 dimension pages (stubs)
│   │       │   - P2Educational
│   │       │   - P3BusinessDev
│   │       │   - P4Intellectual
│   │       │   - P5Ecosystem
│   │       │   - P6Societal
│   │       │   - P7Image
│   │       └── ToolPages.jsx          # Setup, CV collection, data sources, export
│   │           - SetupScrape
│   │           - CVCollection
│   │           - DataSources
│   │           - MediaIntel
│   │           - Export
│   │
│   └── styles/
│       └── app.css                # Component-scoped CSS (all styling)
│
├── package.json                   # Dependencies (React, ReactDOM)
├── .gitignore                     # Git ignore rules
└── README.md                      # This file
```

## Data Flow

### State Management
- **Root Component (App.jsx)**: Manages global state (`data`) and page navigation
- **localStorage**: Auto-saves data with 500ms debounce via `useEffect`
- **Storage Utilities**: Loads data with fallback to default (University of Vaasa sample)

### Form Updates
- Each page receives `data` object and `setField` function
- `setField` is created via `createFieldSetter(sectionId)` which updates nested section data
- Changes automatically trigger localStorage save

### Completion Calculations
- `countFilledFields()`: Counts non-empty fields in a section
- `getDimensionCompletion()`: Calculates % for a single dimension
- `getOverallCompletion()`: Calculates % across all dimensions

## Key Components

### UI Components
- **SourceBadge**: Shows data source type (Web, CV, Manual, Calculated)
- **FieldLabel**: Displays label with optional indicator code and source badge
- **FormGroup**: Wraps fields with label and children
- **TextInput**: Number or text input with optional prefix/suffix (€, %)
- **TextArea**: Multi-line text input with configurable rows
- **ListInput**: Dynamic array input with add/remove item buttons
- **Section**: Collapsible card with number badge and color
- **DimensionIntro**: Progress banner for CV auto-fill

### Pages
- **HomePage**: Marketing landing page with feature cards, CV roles, process steps, lead form
- **Dashboard**: Progress overview, dimension cards with completion %, source distribution
- **SchoolProfile**: Institution identity (A), Competitive context (B), Impact zone (C), Faculty headcount (D)
- **P1Financial**: Direct budget impact (1.1), Indirect expenditures (1.2)
- **P2–P7**: Dimension pages (stub structure ready for expansion)
- **SetupScrape**: School identity, scraper sources with status
- **CVCollection**: Stakeholder CV slots with upload tracking
- **DataSources**: Document types with indicator mapping
- **MediaIntel**: Pre-built search queries with Google Search links
- **Export**: Completion summary and JSON/Excel export

## Sample Data

University of Vaasa sample data included in `lib/dataModel.js`:
- 5200 students, 1260 annual graduates
- 28,000+ alumni with regional chapters
- 15 research groups, 450+ annual publications
- Energy sector focus (VEBIC partnership)
- €12M annual external research funding
- AACSB, EFMD, PRME accreditation

## Build & Run

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Conversion Notes

This structure was extracted from a minified single-file React app with compiled JSX. Key transformations:

1. **Minified variable names** → **Readable names**
   - `e`, `t`, `n` → `data`, `setField`, `index`
   - `c` (DIMENSIONS) → Proper constant names
   - `u` (NAV_ITEMS) → Proper constant names

2. **JSX conversion**: `(0, i.jsx)()` calls → JSX template syntax

3. **Component extraction**: Each page/component in separate file with proper imports/exports

4. **State management**: Redux/Context would be next evolution (currently using local state + localStorage)

5. **API integration**: Supabase wiring functions available in `lib/supabase.js` (not yet integrated into React components)

## Next Steps

1. Complete P2–P7 dimension pages with full field mappings
2. Integrate Supabase client for file uploads and data syncing
3. Implement CV parsing and auto-extraction
4. Add real scraper integration (currently UI-only)
5. Build export to Excel and PDF
6. Add authentication (currently local storage only)
7. Implement dark mode toggle
8. Add data validation and required field indicators
