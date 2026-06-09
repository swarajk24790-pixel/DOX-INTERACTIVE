"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { PROCESS_STEPS, type ProcessStep } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <section
      id="process"
      style={{
        position: "relative",
        padding: "var(--space-section) 0",
      }}
    >
      <div className="container-narrow">
        <SectionHeader />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
            marginTop: "clamp(3rem, 6vh, 5rem)",
          }}
        >
          {PROCESS_STEPS.map((step, index) => (
            <ProcessCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader() {
  const [ref, isVisible] = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""}`}
      style={{ textAlign: "center" }}
    >
      <span className="text-caption-sm" style={{ color: "var(--text-muted)" }}>
        How We Build
      </span>
      <div className="divider" />
      <h2
        className="text-display"
        style={{ marginTop: "1.5rem", color: "var(--text-primary)" }}
      >
        From vision to polish.
      </h2>
    </div>
  );
}

function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  const [ref, isVisible] = useReveal<HTMLDivElement>();
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const tiltX = isHovered ? (mousePos.y - 0.5) * -8 : 0;
  const tiltY = isHovered ? (mousePos.x - 0.5) * 8 : 0;

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div
        ref={cardRef}
        className="process-card sci-fi-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setMousePos({ x: 0.5, y: 0.5 });
        }}
        style={{
          transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) ${isHovered ? "translateY(-4px)" : ""}`,
          height: "100%",
          minHeight: 260,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Mouse-following spotlight */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(400px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.04), transparent 50%)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Step number */}
        <span
          className="text-caption-sm"
          style={{
            color: "var(--text-muted)",
            marginBottom: "1.5rem",
          }}
        >
          {step.number}
        </span>

        {/* Icon */}
        <div
          style={{
            fontSize: "1.5rem",
            marginBottom: "1rem",
            opacity: 0.4,
            transition: "opacity 0.3s ease, transform 0.3s ease",
            transform: isHovered ? "scale(1.2)" : "scale(1)",
          }}
        >
          {step.icon}
        </div>

        {/* Title */}
        <h3
          className="text-title"
          style={{
            color: "var(--text-primary)",
            marginBottom: "0.75rem",
          }}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p
          className="text-body-lg"
          style={{
            color: "var(--text-secondary)",
            marginTop: "auto",
          }}
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}
