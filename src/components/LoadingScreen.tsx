"use client";

import React, { useEffect, useState } from "react";

interface LoadingScreenProps {
  isLoaded: boolean;
  loadProgress: number;
  onComplete: () => void;
}

export default function LoadingScreen({
  isLoaded,
  loadProgress,
  onComplete,
}: LoadingScreenProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      // Brief pause to let user see "ready" state
      const timer = setTimeout(() => {
        setIsExiting(true);
        // Wait for exit animation
        setTimeout(() => {
          setIsVisible(false);
          onComplete();
        }, 800);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className="loading-screen"
      style={{
        opacity: isExiting ? 0 : 1,
        transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1rem, 2vw, 1.5rem)",
          fontWeight: 600,
          letterSpacing: "0.15em",
          color: "var(--text-primary)",
          opacity: 0.9,
        }}
      >
        DOX INTERACTIVE
      </div>

      {/* Progress bar */}
      <div style={{ width: 200, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "100%",
            height: 2,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.round(loadProgress * 100)}%`,
              background: "rgba(255,255,255,0.5)",
              borderRadius: 1,
              transition: "width 0.3s ease",
            }}
          />
        </div>
        <span
          style={{
            fontSize: "var(--text-caption)",
            fontFamily: "var(--font-body)",
            color: "var(--text-tertiary)",
            letterSpacing: "0.1em",
          }}
        >
          {isLoaded ? "ENTERING" : "LOADING"}
        </span>
      </div>
    </div>
  );
}
