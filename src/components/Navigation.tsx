"use client";

import React, { useState, useEffect } from "react";
import { NAV_LINKS } from "@/lib/constants";

interface NavigationProps {
  isVisible: boolean;
}

export default function Navigation({ isVisible }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Detect active section
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      id="main-nav"
      className={`nav-container ${isVisible ? "visible" : "hidden"} ${isScrolled ? "scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-backdrop" />

      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => handleNavClick(e, "#hero")}
        style={{
          position: "relative",
          zIndex: 2,
          fontFamily: "var(--font-display)",
          fontSize: "0.875rem",
          fontWeight: 600,
          letterSpacing: "0.15em",
          color: "var(--text-primary)",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span style={{ opacity: 0.4, fontSize: "0.6rem" }}>◆</span>
        DOX
      </a>

      {/* Links */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          gap: "clamp(1.5rem, 3vw, 2.5rem)",
        }}
      >
        {NAV_LINKS.map((link) => {
          const sectionId = link.href.replace("#", "");
          const isActive = activeSection === sectionId;
          return (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: isActive ? "var(--text-primary)" : "var(--text-tertiary)",
                textDecoration: "none",
                transition: "color 0.3s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = isActive
                  ? "var(--text-primary)"
                  : "var(--text-tertiary)";
              }}
            >
              {link.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
