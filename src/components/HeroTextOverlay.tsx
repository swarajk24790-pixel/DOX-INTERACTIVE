"use client";

import { HERO_TEXT_TIMELINE } from "@/lib/constants";

/**
 * Cinematic text overlay centered over the hero video.
 * The initial hero message is rendered directly to keep the hero static.
 */
export default function HeroTextOverlay() {
  const introSegment = HERO_TEXT_TIMELINE.find((segment) => segment.id === "intro") ?? HERO_TEXT_TIMELINE[0];

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
      <div
        id={`hero-text-${introSegment.id}`}
        className="hero-text-item"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: introSegment.subtitle ? "1rem" : "0",
          pointerEvents: "none",
          width: "100%",
          maxWidth: "900px",
          textAlign: "center",
          willChange: "transform, opacity",
        }}
      >
        <h1
          className={introSegment.id === "intro" ? "text-hero" : "text-display"}
          style={{
            color: "var(--text-primary)",
            textAlign: "center",
            textShadow: "0 0 80px rgba(0,0,0,0.9)",
            lineHeight: 1.15,
          }}
        >
          {introSegment.text}
        </h1>
        {introSegment.subtitle && (
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
            {introSegment.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
