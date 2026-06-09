"use client";

import React from "react";
import { useReveal } from "@/hooks/useReveal";
import { PHILOSOPHY_STATEMENTS } from "@/lib/constants";

export default function PhilosophySection() {
  return (
    <section
      id="philosophy"
      style={{
        padding: "var(--space-section) 0",
        position: "relative",
      }}
    >
      <div className="container-narrow">
        {/* Section label */}
        <SectionLabel text="Our Philosophy" />

        {/* Statements */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "clamp(5rem, 12vh, 10rem)",
            marginTop: "clamp(4rem, 8vh, 8rem)",
          }}
        >
          {PHILOSOPHY_STATEMENTS.map((statement, i) => (
            <PhilosophyStatement
              key={i}
              highlight={statement.highlight}
              follow={statement.follow}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionLabel({ text }: { text: string }) {
  const [ref, isVisible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""}`}
      style={{
        textAlign: "center",
      }}
    >
      <span className="text-caption-sm" style={{ color: "var(--text-muted)" }}>
        {text}
      </span>
      <div className="divider" />
    </div>
  );
}

function PhilosophyStatement({
  highlight,
  follow,
  index,
}: {
  highlight: string;
  follow: string;
  index: number;
}) {
  const [ref, isVisible] = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""}`}
      style={{
        textAlign: index % 2 === 0 ? "left" : "right",
        transitionDelay: `${index * 0.05}s`,
      }}
    >
      <h2
        className="text-display"
        style={{
          color: "var(--text-primary)",
          marginBottom: "0.25em",
        }}
      >
        {highlight}
      </h2>
      <p
        className="text-headline"
        style={{
          color: "var(--text-secondary)",
          fontWeight: 300,
        }}
      >
        {follow}
      </p>
    </div>
  );
}
