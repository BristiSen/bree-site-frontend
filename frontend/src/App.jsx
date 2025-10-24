// src/App.jsx
import React, { useEffect, useState } from "react";
import "./index.css";
import ProfessionalHome from "./components/ProfessionalHome";
import WhimsicalHome from "./components/WhimsicalHome";
import FlipToggle from "./components/FlipToggle";

/**
 * Mode:
 * - "pro" = front (professional) (default)
 * - "bree" = back (whimsical)
 */
export default function App() {
  const [mode, setMode] = useState(() => {
    // default to "pro"
    try {
      return localStorage.getItem("siteMode") || "pro";
    } catch {
      return "pro";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("siteMode", mode);
    } catch {}
  }, [mode]);

  // Is flipped when mode === "bree"
  const isFlipped = mode === "bree";

  return (
    <div className="app-root relative min-h-screen bg-transparent">
      {/* Flip toggle (top-right) */}
      <FlipToggle mode={mode} onToggle={() => setMode(mode === "pro" ? "bree" : "pro")} />

      {/* 3D flip container */}
      <div className={`flip-container mx-auto max-w-6xl py-8 ${isFlipped ? "flipped" : ""}`}>
        <div className="flipper">
          {/* FRONT = Professional */}
          <div className="front">
            <ProfessionalHome />
          </div>

          {/* BACK = Whimsical - your existing page */}
          <div className="back">
            <WhimsicalHome />
          </div>
        </div>
      </div>
    </div>
  );
}
