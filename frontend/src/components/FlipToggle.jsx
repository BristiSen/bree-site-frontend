// src/components/FlipToggle.jsx
import React from "react";

/**
 * Decorative toggle placed at top-right.
 * - mode: current mode ("pro" | "bree")
 * - onToggle: function to flip modes
 */
export default function FlipToggle({ mode, onToggle }) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={onToggle}
        aria-label="Toggle professional / personal"
        className="relative flex items-center p-2 rounded-full shadow-lg bg-gradient-to-br from-yellow-400 to-yellow-600 transform hover:scale-105 transition"
        title={mode === "pro" ? "Show Bree (fun)" : "Show Professional side"}
      >
        <div className="w-10 h-10 rounded-full bg-[#071029] flex items-center justify-center text-yellow-300 font-semibold"> {mode === "pro" ? "Pro" : "Bree"}</div>
        {/* little vine/glimmer */}
        <span className={`absolute -right-3 -top-2 w-6 h-6 rounded-full bg-green-400/60 blur-sm opacity-70`} />
      </button>
    </div>
  );
}
