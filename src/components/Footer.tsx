"use client";

import React from "react";
import { useReveal } from "@/hooks/useReveal";

export default function Footer() {
  const [ref, isVisible] = useReveal<HTMLElement>();

  return (
    <footer
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""}`}
      style={{
        borderTop: "1px solid var(--border-subtle)",
        background: "#020202",
        padding: "4rem 0 3rem 0",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "3rem",
            marginBottom: "4rem",
          }}
        >
          {/* Brand/Logo Info */}
          <div style={{ flex: "1 1 300px" }}>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.125rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              DOX INTERACTIVE
            </h3>
            <p
              style={{
                color: "var(--text-tertiary)",
                fontSize: "0.875rem",
                maxWidth: "280px",
                lineHeight: 1.6,
              }}
            >
              An independent interactive entertainment studio crafting premium, cinematic game experiences.
            </p>
          </div>

          {/* Links columns */}
          <div
            style={{
              display: "flex",
              gap: "clamp(2rem, 8vw, 6rem)",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                  marginBottom: "1.25rem",
                  fontWeight: 500,
                }}
              >
                Studio
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li>
                  <a href="#hero" className="footer-link">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#games" className="footer-link">
                    Games
                  </a>
                </li>
                <li>
                  <a href="#process" className="footer-link">
                    Our Philosophy
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                  marginBottom: "1.25rem",
                  fontWeight: 500,
                }}
              >
                Follow Updates
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li>
                  <a href="https://www.instagram.com/dox_interactive?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="footer-link">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4
                style={{
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-secondary)",
                  marginBottom: "1.25rem",
                  fontWeight: 500,
                }}
              >
                Contact
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <li>
                  <a href="https://www.instagram.com/dox_interactive?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="footer-link">
                    DM on Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright/legal */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1.5rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
            }}
          >
            &copy; {new Date().getFullYear()} DOX Interactive. All rights reserved.
          </span>

          <div style={{ display: "flex", gap: "1.5rem" }}>
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
