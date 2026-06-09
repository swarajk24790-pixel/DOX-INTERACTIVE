"use client";

import React from "react";
import { useReveal } from "@/hooks/useReveal";

export default function CTASection() {
  const [ref, isVisible] = useReveal<HTMLDivElement>();

  return (
    <section
      id="cta"
      style={{
        position: "relative",
        padding: "var(--space-section) 0",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      {/* Cinematic radial glow */}
      <div className="cta-glow" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

      <div
        ref={ref}
        className={`reveal ${isVisible ? "visible" : ""} container-narrow`}
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <span className="text-caption-sm" style={{ color: "var(--text-muted)", letterSpacing: "0.2em" }}>
          Next Chapter
        </span>
        <div className="divider" />

        <h2
          className="text-display gradient-text"
          style={{
            marginTop: "2rem",
            marginBottom: "1.5rem",
            fontWeight: 600,
          }}
        >
          The next chapter starts soon.
        </h2>

        <p
          className="text-subtitle"
          style={{
            color: "var(--text-secondary)",
            maxWidth: "600px",
            margin: "0 auto 3rem auto",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Follow our Instagram for the latest updates, announcements, and behind-the-scenes developments. For business inquiries or collaborations, reach out directly via DM.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="https://www.instagram.com/dox_interactive?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Follow on Instagram
          </a>
          <a
            href="https://www.instagram.com/dox_interactive?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            DM on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
