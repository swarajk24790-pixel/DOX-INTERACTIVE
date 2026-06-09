"use client";

import React from "react";
import { HERO_TEXT_TIMELINE } from "@/lib/constants";

/**
 * Cinematic text overlays that are absolute-positioned and centered.
 * Intentionally static for React: opacity and transforms are driven
 * entirely by GSAP ScrollTrigger to prevent any React re-renders during scroll.
 */
export default function HeroTextOverlay() {
  return (
    <div 
      className="hero-text-overlay"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {HERO_TEXT_TIMELINE.map((segment) => (
        <div
          key={segment.id}
          id={`hero-text-${segment.id}`}
          className="hero-text-item"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: segment.subtitle ? "1rem" : "0",
            pointerEvents: "none",
            width: "100%",
            maxWidth: "900px",
            textAlign: "center",
            willChange: "transform, opacity",
          }}
        >
          <h1
            className={segment.id === "intro" ? "text-hero" : "text-display"}
            style={{
              color: "var(--text-primary)",
              textAlign: "center",
              textShadow: "0 0 80px rgba(0,0,0,0.9)",
              lineHeight: 1.15,
            }}
          >
            {segment.text}
          </h1>
          {segment.subtitle && (
            <p
              className="text-subtitle"
              style={{
                color: "var(--text-secondary)",
                textShadow: "0 0 40px rgba(0,0,0,0.8)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 300,
              }}
            >
              {segment.subtitle}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
