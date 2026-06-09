"use client";

import React from "react";
import { useReveal } from "@/hooks/useReveal";

export default function FutureSection() {
  return (
    <section
      id="future"
      style={{
        position: "relative",
        padding: "var(--space-section) 0",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(74,158,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="container-narrow" style={{ position: "relative", zIndex: 1 }}>
        {/* Opening statement */}
        <FutureOpening />

        {/* Mystery reveal area */}
        <FutureReveal />

        {/* CTAs */}
        <FutureCTAs />
      </div>
    </section>
  );
}

function FutureOpening() {
  const [ref, isVisible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""}`}
      style={{ textAlign: "center", marginBottom: "clamp(5rem, 10vh, 10rem)" }}
    >
      <span className="text-caption-sm" style={{ color: "var(--text-muted)" }}>
        The Future
      </span>
      <div className="divider" />
      <h2
        className="text-display"
        style={{
          marginTop: "2rem",
          color: "var(--text-primary)",
          maxWidth: 800,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Our biggest world is still ahead.
      </h2>
    </div>
  );
}

function FutureReveal() {
  const [ref, isVisible] = useReveal<HTMLDivElement>({ threshold: 0.05 });
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""}`}
      style={{ marginBottom: "clamp(4rem, 8vh, 8rem)" }}
    >
      {/* Currently in development badge */}
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <span
          style={{
            display: "inline-block",
            padding: "0.5rem 1.25rem",
            borderRadius: 100,
            border: "1px solid rgba(74,158,255,0.2)",
            background: "rgba(74,158,255,0.05)",
            fontSize: "0.75rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            color: "var(--accent-blue)",
            textTransform: "uppercase",
          }}
        >
          Currently In Development
        </span>
      </div>

      {/* Mystery cards grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem",
          maxWidth: 1000,
          margin: "0 auto",
        }}
      >
        <MysteryCard label="Game Logo" height={200} delay={0} />
        <MysteryCard label="Concept Art" height={280} delay={0.1} />
        <MysteryCard label="Environment Art" height={240} delay={0.2} />
      </div>
    </div>
  );
}

function MysteryCard({
  label,
  height,
  delay,
}: {
  label: string;
  height: number;
  delay: number;
}) {
  const [ref, isVisible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""} sci-fi-card`}
      style={{
        transitionDelay: `${delay}s`,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)",
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Scan line effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 4px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          textAlign: "center",
          opacity: 0.3,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            margin: "0 auto 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.875rem",
          }}
        >
          ?
        </div>
        <span
          className="text-caption-sm"
          style={{ color: "var(--text-tertiary)" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

function FutureCTAs() {
  const [ref, isVisible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""}`}
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <p
        className="text-subtitle"
        style={{
          color: "var(--text-secondary)",
          fontWeight: 300,
          marginBottom: "0.5rem",
        }}
      >
        Be the first to know.
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <a href="#" className="btn-primary">
          Wishlist
        </a>
        <a href="#" className="btn-secondary">
          Join Discord
        </a>
      </div>
    </div>
  );
}
