"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { TRUST_METRICS, type TrustMetric } from "@/lib/constants";

export default function TrustSection() {
  return (
    <section
      id="trust"
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
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginTop: "clamp(3rem, 6vh, 5rem)",
          }}
        >
          {TRUST_METRICS.map((metric, index) => (
            <MetricCounter key={metric.id} metric={metric} index={index} />
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
        Trust
      </span>
      <div className="divider" />
    </div>
  );
}

function MetricCounter({ metric, index }: { metric: TrustMetric; index: number }) {
  const [ref, isVisible] = useReveal<HTMLDivElement>();
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const target = metric.value;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out quart for premium feel
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    // Delay based on index for stagger
    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, index * 150);

    return () => clearTimeout(timer);
  }, [isVisible, metric.value, index]);

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""}`}
      style={{
        textAlign: "center",
        padding: "2rem",
        transitionDelay: `${index * 0.1}s`,
      }}
    >
      <div className="counter-value">
        {count}
        {metric.suffix}
      </div>
      <p
        className="text-body-lg"
        style={{
          color: "var(--text-secondary)",
          marginTop: "0.75rem",
        }}
      >
        {metric.label}
      </p>
    </div>
  );
}
