# Component Map - Original to Extracted

This document maps the minified variable names and function locations from the original app to the extracted components and files.

## Core Utilities & Constants

| Minified | Description | Extracted To | Type |
|----------|-------------|--------------|------|
| `c` | DIMENSIONS array | `src/lib/constants.js` | Constant |
| `u` | NAV_ITEMS array | `src/lib/constants.js` | Constant |
| `d` | FIELD_SOURCES object | `src/lib/constants.js` | Constant |
| `f` | CV_STAKEHOLDERS array | `src/lib/constants.js` | Constant |
| `p` | STORAGE_KEY string | `src/lib/constants.js` | Constant |
| `h` | DEFAULT_DATA object | `src/lib/dataModel.js` | Data |
| `b` | FIELD_TOTALS object | `src/lib/constants.js` | Constant |
| `y` | PRIMARY_COLOR #2e8b57 | `src/lib/constants.js` | Constant |
| `k` | Inline CSS string | `src/styles/app.css` | CSS |

## Utility Functions

| Minified | Description | Extracted To | Signature |
|----------|-------------|--------------|-----------|
| `m()` | Load from localStorage with migration | `src/lib/storage.js` | `loadStoredData()` |
| `g()` | Count filled fields in section | `src/lib/completion.js` | `countFilledFields(section)` |
| `v()` | Get dimension completion % | `src/lib/completion.js` | `getDimensionCompletion(data, dimensionId)` |
| `x()` | Get overall completion % | `src/lib/completion.js` | `getOverallCompletion(data)` |

## UI Components

| Minified | Name | Lines | Extracted To | Purpose |
|----------|------|-------|--------------|---------|
| `w()` | SourceBadge | 892-904 | `src/components/ui/SourceBadge.jsx` | Display data source type badge |
| `S()` | FieldLabel | 906-936 | `src/components/ui/FieldLabel.jsx` | Label with hint and source |
| `j()` | FormGroup | 938-954 | `src/components/ui/FormGroup.jsx` | Wrapper with label |
| `C()` | TextInput | 956-1001 | `src/components/ui/TextInput.jsx` | Text/number input |
| `N()` | TextArea | 1003-1027 | `src/components/ui/TextArea.jsx` | Textarea field |
| `E()` | ListInput | 1028-1075 | `src/components/ui/ListInput.jsx` | Dynamic list |
| `P()` | Section | 1076-1101 | `src/components/ui/Section.jsx` | Collapsible card |
| `T()` | DimensionIntro | 1130-1163 | `src/components/ui/DimensionIntro.jsx` | CV progress banner |

## Page Components

| Minified | Name | Lines | Extracted To | Route |
|----------|------|-------|--------------|-------|
| `B()` | HomePage | 2391-2909 | `src/components/pages/HomePage.jsx` | /home |
| `U()` | Dashboard | 2910-3067 | `src/components/pages/Dashboard.jsx` | /dashboard |
| `$()` | SetupScrape | 3118-3266 | `src/components/pages/ToolPages.jsx` | /setup |
| `H()` | CVCollection | 3268-3447 | `src/components/pages/ToolPages.jsx` | /cvs |
| `R()` | SchoolProfile | 1207-1410 | `src/components/pages/SchoolProfile.jsx` | /school |
| `A()` | P1Financial | 1412-1544 | `src/components/pages/P1Financial.jsx` | /p1 |
| `D()` | P2Educational | 1545-1792 | `src/components/pages/DimensionPages.jsx` | /p2 |
| `L()` | P3BusinessDev | 1793-1884 | `src/components/pages/DimensionPages.jsx` | /p3 |
| `I()` | P4Intellectual | 1885-2062 | `src/components/pages/DimensionPages.jsx` | /p4 |
| `F()` | P5Ecosystem | 2063-2140 | `src/components/pages/DimensionPages.jsx` | /p5 |
| `O()` | P6Societal | 2141-2269 | `src/components/pages/DimensionPages.jsx` | /p6 |
| `M()` | P7Image | 2270-2390 | `src/components/pages/DimensionPages.jsx` | /p7 |
| `W()` | DataSources | 3506-3599 | `src/components/pages/ToolPages.jsx` | /sources |
| `Q()` | MediaIntel | 3644-3743 | `src/components/pages/ToolPages.jsx` | /media |
| `K()` | Export | 3745-3843 | `src/components/pages/ToolPages.jsx` | /export |

## Root Component

| Minified | Name | Lines | Extracted To | Purpose |
|----------|------|-------|--------------|---------|
| (Anonymous) | App | 3844-4054 | `src/App.jsx` | Root routing & sidebar |

## Configuration Arrays

| Name | Used In | Data Items |
|------|---------|-----------|
| `DIMENSIONS` | Sidebar nav, dashboard | 8 dimensions (school + P1-P7) |
| `NAV_ITEMS` | Full navigation menu | 15 items (home, collection, dimensions, tools) |
| `FIELD_SOURCES` | Field source badges | 122 field definitions |
| `CV_STAKEHOLDERS` | CV collection | 7 stakeholder roles |
| `FIELD_TOTALS` | Completion calculations | 8 section totals |

## Data Sample

| School | Value |
|--------|-------|
| Name | University of Vaasa |
| Country | Finland |
| Type | Public |
| Students | 5200 |
| Faculty FTE | 650 |
| Annual Graduates | 1260 |
| Alumni Network | 28,000+ |
| Research Groups | 15 |
| Annual Publications | 450+ (Scopus) |
| External Funding | €12M annually |
| Founded | 1968 |

## Supabase Integration

Not yet integrated into React components, but available via:
- `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `src/lib/supabase.js`
- `SCHOOL_ID` for University of Vaasa (a52748ab-65cf-46d8-b28d-74a4a7c88020)
- Document type mappings for file uploads
- Constants for scraper function URLs

Functions from `supabase-wiring.js` to integrate:
- `showToast()` - Toast notifications
- `createFileInput()` - File upload handler
- `uploadFiles()` - Supabase storage upload
- `loadScrapeStatus()` - Load scrape results
- `updateScrapeCards()` - Update UI with scrape data
- `updateDimensionBadges()` - Update progress percentages
- `buildProgressPanel()` - Floating progress sidebar

## Props Mapping

### SourceBadge
- `source: string` - "scraped" | "cv" | "manual" | "derived"

### FieldLabel
- `children: ReactNode` - Label text
- `hint: string` - Additional help text
- `indicator: string` - Indicator code (e.g., "1.1.1")
- `source: string` - Data source type

### FormGroup
- `label: string` - Field label
- `hint: string` - Additional help text
- `indicator: string` - Indicator code
- `source: string` - Data source
- `children: ReactNode` - Form input element

### TextInput
- `label: string`
- `hint: string`
- `indicator: string`
- `prefix: string` - Left-side text (e.g., "€")
- `suffix: string` - Right-side text (e.g., "%")
- `value: string|number`
- `onChange: function`
- `placeholder: string`
- `source: string`

### ListInput
- `label: string`
- `hint: string`
- `indicator: string`
- `items: string[]`
- `onChange: function`
- `placeholder: string`
- `source: string`

### Section
- `number: string` - Section badge (e.g., "A", "1.1")
- `title: string` - Section title
- `subtitle: string` - Optional subtitle
- `color: string` - Badge background color
- `open: boolean` - Initially expanded
- `children: ReactNode` - Section content

## CSS Classes

All CSS classes are component-scoped and prefixed:
- `.btn` / `.btn-*` - Button styles
- `.card*` - Card and section styles
- `.fg` - Form group
- `.lbl` - Label
- `.ind` - Indicator badge
- `.src-badge*` - Source badges
- `.dash-*` - Dashboard components
- `.cv-*` - CV collection
- `.lp-*` - Landing page
- `.setup-*` - Setup page
- `.scrape-*` - Scraper UI

All CSS is in a single file (`src/styles/app.css`) for easy management.
