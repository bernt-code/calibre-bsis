import React, { useState, useEffect, useRef, useCallback } from "react";
import { DIMENSIONS, NAV_ITEMS, PRIMARY_COLOR } from "./lib/constants";
import { loadStoredData, saveData } from "./lib/storage";
import { getDimensionCompletion, getOverallCompletion } from "./lib/completion";

// Pages
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import SchoolProfile from "./components/pages/SchoolProfile";
import P1Financial from "./components/pages/P1Financial";
import P2Educational from "./components/pages/P2Educational";
import P3BusinessDev from "./components/pages/P3BusinessDev";
import P4Intellectual from "./components/pages/P4Intellectual";
import P5Ecosystem from "./components/pages/P5Ecosystem";
import P6Societal from "./components/pages/P6Societal";
import P7Image from "./components/pages/P7Image";
import { SetupScrape, CVCollection, DataSources, MediaIntel, Export } from "./components/pages/ToolPages";

// CSS
import "./styles/app.css";

/**
 * Root App component with routing, sidebar, and main content area
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [data, setData] = useState(() => loadStoredData());
  const mainRef = useRef(null);

  // Auto-save data to localStorage with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        saveData(data);
      } catch (error) {
        console.error("Failed to save data:", error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [data]);

  // Create field setter for each section
  const createFieldSetter = useCallback((sectionId) => {
    return (fieldName, fieldValue) => {
      setData(prevData => ({
        ...prevData,
        [sectionId]: {
          ...prevData[sectionId],
          [fieldName]: fieldValue
        }
      }));
    };
  }, []);

  // Navigate and scroll to top
  const goToPage = useCallback((pageId) => {
    setCurrentPage(pageId);
    mainRef.current?.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const overallCompletion = getOverallCompletion(data);
  const currentNav = NAV_ITEMS.find(item => item.id === currentPage);

  // Render current page
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage goToPage={goToPage} />;
      case "dashboard":
        return <Dashboard data={data} goToPage={goToPage} />;
      case "setup":
        return <SetupScrape data={data} setField={createFieldSetter("school")} />;
      case "cvs":
        return <CVCollection />;
      case "school":
        return <SchoolProfile data={data.school || {}} setField={createFieldSetter("school")} />;
      case "p1":
        return <P1Financial data={data.p1 || {}} setField={createFieldSetter("p1")} />;
      case "p2":
        return <P2Educational data={data.p2 || {}} setField={createFieldSetter("p2")} />;
      case "p3":
        return <P3BusinessDev data={data.p3 || {}} setField={createFieldSetter("p3")} />;
      case "p4":
        return <P4Intellectual data={data.p4 || {}} setField={createFieldSetter("p4")} />;
      case "p5":
        return <P5Ecosystem data={data.p5 || {}} setField={createFieldSetter("p5")} />;
      case "p6":
        return <P6Societal data={data.p6 || {}} setField={createFieldSetter("p6")} />;
      case "p7":
        return <P7Image data={data.p7 || {}} setField={createFieldSetter("p7")} />;
      case "sources":
        return <DataSources />;
      case "media":
        return <MediaIntel />;
      case "export":
        return <Export data={data} />;
      default:
        return <HomePage goToPage={goToPage} />;
    }
  };

  return (
    <>
      <style>{}</style>
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sb-brand">
            <div className="sb-wordmark">
              <span className="sb-wordmark-bsis">BSIS</span>
              <span className="sb-wordmark-for">by</span>
              <span>Calibre</span>
            </div>
            <div className="sb-tagline">Automated impact evidence.</div>
          </div>

          <div className="sb-progress">
            <div className="sb-prog-row">
              <span>Progress</span>
              <strong>{overallCompletion}%</strong>
            </div>
            <div className="prog-track">
              <div className="prog-fill" style={{ width: overallCompletion + "%" }} />
            </div>
          </div>

          <nav className="sb-nav">
            {/* Home */}
            <div
              className={`nav-item${currentPage === "home" ? " active" : ""}`}
              onClick={() => goToPage("home")}
            >
              <div className="nav-icon">●</div>
              <div className="nav-label" style={{ fontWeight: 700 }}>
                Home
              </div>
            </div>

            {/* Collection section */}
            <div className="sb-sec-lbl">Collection</div>
            {["dashboard", "setup", "cvs"].map(id => {
              const nav = NAV_ITEMS.find(item => item.id === id);
              return (
                <div
                  key={id}
                  className={`nav-item${currentPage === id ? " active" : ""}`}
                  onClick={() => goToPage(id)}
                >
                  <div className="nav-icon">{nav.icon}</div>
                  <div className="nav-label">{nav.label}</div>
                </div>
              );
            })}

            {/* BSIS Dimensions section */}
            <div className="sb-sec-lbl">BSIS Dimensions</div>
            {DIMENSIONS.map(dim => {
              const completion = getDimensionCompletion(data, dim.id);
              return (
                <div
                  key={dim.id}
                  className={`nav-item${currentPage === dim.id ? " active" : ""}`}
                  onClick={() => goToPage(dim.id)}
                >
                  <div className="nav-icon">{dim.icon}</div>
                  <div className="nav-label">{dim.label}</div>
                  <div className="nav-pct">
                    {completion > 0 ? completion + "%" : ""}
                  </div>
                </div>
              );
            })}

            {/* Tools section */}
            <div className="sb-sec-lbl">Tools</div>
            {["sources", "media", "export"].map(id => {
              const nav = NAV_ITEMS.find(item => item.id === id);
              return (
                <div
                  key={id}
                  className={`nav-item${currentPage === id ? " active" : ""}`}
                  onClick={() => goToPage(id)}
                >
                  <div className="nav-icon">{nav.icon}</div>
                  <div className="nav-label">{nav.label}</div>
                </div>
              );
            })}
          </nav>

          <div className="sb-footer">
            <div className="sb-saved">Saved automatically</div>
            <button
              className="btn btn-ghost btn-sm"
              style={{ width: "100%" }}
              onClick={() => goToPage("export")}
            >
              ↓ Export report
            </button>
          </div>
        </aside>

        {/* Main content area */}
        <main className="main" ref={mainRef}>
          <div className="topbar">
            <div className="topbar-l">{currentNav?.label}</div>
            <div className="topbar-r">
              <span className="topbar-saved">auto-saved</span>
              <button
                className="btn btn-green btn-sm"
                onClick={() => goToPage("export")}
              >
                Export
              </button>
            </div>
          </div>

          <div className="content">
            {renderPage()}
          </div>
        </main>
      </div>
    </>
  );
}
