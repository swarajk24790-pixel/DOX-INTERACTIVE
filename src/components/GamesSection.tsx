"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RELEASED_GAMES, type GameData } from "@/lib/constants";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GamesSection() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for storytelling text steps
  const textRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  // Refs for cards
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const cardSpotlightsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const pinSection = pinSectionRef.current;
    if (!pinSection) return;

    // Reset timeline if already created
    const ctx = gsap.context(() => {
      // Create master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSection,
          start: "top top",
          end: "+=500%", // 500% viewport height for long, smooth storytelling
          scrub: 1.2,    // Smooth scrub duration
          pin: true,     // Pin the section
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // --- STAGE 1: Text Storytelling Sequences ---
      // Initial states: all text hidden
      textRefs.forEach((ref) => {
        if (ref.current) {
          gsap.set(ref.current, { opacity: 0, scale: 0.9, y: 30 });
        }
      });

      // Step 1: "We build worlds."
      tl.to(textRefs[0].current, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" })
        .to(textRefs[0].current, { opacity: 0, scale: 0.95, y: -20, duration: 0.8, ease: "power2.in" }, "+=0.6");

      // Step 2: "Some become experiments."
      tl.to(textRefs[1].current, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }, "+=0.2")
        .to(textRefs[1].current, { opacity: 0, scale: 0.95, y: -20, duration: 0.8, ease: "power2.in" }, "+=0.6");

      // Step 3: "Some become adventures."
      tl.to(textRefs[2].current, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }, "+=0.2")
        .to(textRefs[2].current, { opacity: 0, scale: 0.95, y: -20, duration: 0.8, ease: "power2.in" }, "+=0.6");

      // Step 4: "Some become memories."
      tl.to(textRefs[3].current, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }, "+=0.2")
        .to(textRefs[3].current, { opacity: 0, scale: 0.95, y: -20, duration: 0.8, ease: "power2.in" }, "+=0.6");

      // Step 5: "These are ours." — dramatic pause then clean exit
      tl.to(textRefs[4].current, { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power2.out" }, "+=0.2")
        .to(textRefs[4].current, { opacity: 0, scale: 0.95, y: -30, duration: 0.8, ease: "power2.in" }, "+=1.0");

      // Ensure all texts are fully hidden before cards appear
      textRefs.forEach((ref) => {
        if (ref.current) {
          tl.set(ref.current, { visibility: "hidden" }, "<");
        }
      });

      // --- STAGE 2: Stacked Cards Animation ---
      const cards = cardsRef.current;

      // Set initial states for cards
      // Card 0: Centered on screen, starts at y: 0, scale 1. Let's make it reveal as text fades out
      // Card 1: y: 100vh
      // Card 2: y: 100vh
      gsap.set(cards[0], { opacity: 0, y: 100, scale: 0.95 });
      gsap.set(cards[1], { y: "115vh", scale: 1, zIndex: 2 });
      gsap.set(cards[2], { y: "115vh", scale: 1, zIndex: 3 });

      // Reveal Card 01
      tl.to(cards[0], { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.out" }, "-=0.2");

      // Card 02 rises up and stacks on top of Card 01
      // Card 01 scales down and slides up slightly to show stack depth
      tl.to(cards[1], {
        y: "0vh",
        duration: 2.5,
        ease: "power2.inOut",
      }, "+=0.5");
      tl.to(cards[0], {
        scale: 0.93,
        y: -30,
        opacity: 0.6,
        duration: 2.5,
        ease: "power2.inOut",
      }, "<");

      // Card 03 rises up and stacks on top of Card 02 (which wraps Card 01)
      // Card 02 scales down, Card 01 scales down further
      tl.to(cards[2], {
        y: "0vh",
        duration: 2.5,
        ease: "power2.inOut",
      }, "+=0.5");
      tl.to(cards[1], {
        scale: 0.93,
        y: -30,
        opacity: 0.6,
        duration: 2.5,
        ease: "power2.inOut",
      }, "<");
      tl.to(cards[0], {
        scale: 0.86,
        y: -60,
        opacity: 0.3,
        duration: 2.5,
        ease: "power2.inOut",
      }, "<");

      // Hold final layout for a bit before unpinning
      tl.to({}, { duration: 1.5 });
    }, pinSection);

    return () => {
      ctx.revert();
    };
  }, []);

  // Spotlight mouse tracking logic for cards
  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardsRef.current[index];
    const spotlight = cardSpotlightsRef.current[index];
    if (!card || !spotlight) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Apply mouse spotlight position
    spotlight.style.background = `radial-gradient(800px circle at ${x}px ${y}px, ${RELEASED_GAMES[index].color}12, transparent 50%)`;

    // Subtle 3D card tilt
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -4; // Max tilt 4 degrees
    const tiltY = ((x - centerX) / centerX) * 4;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translate3d(0, 0, 0)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    const spotlight = cardSpotlightsRef.current[index];
    if (!card || !spotlight) return;

    // Reset spotlight & rotation smoothly
    spotlight.style.background = "radial-gradient(800px circle at 50% 50%, transparent, transparent)";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
    card.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
  };

  const handleMouseEnter = (index: number) => {
    const card = cardsRef.current[index];
    if (card) {
      card.style.transition = "none"; // disable transitions on enter for real-time mouse follow
    }
  };

  return (
    <section
      ref={pinSectionRef}
      id="games"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        background: "var(--bg-primary)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* ── SCROLL STORYTELLING TEXT ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "800px",
          textAlign: "center",
          padding: "0 2rem",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <div ref={textRefs[0]} className="storytelling-text">We build worlds.</div>
        <div ref={textRefs[1]} className="storytelling-text">Some become experiments.</div>
        <div ref={textRefs[2]} className="storytelling-text">Some become adventures.</div>
        <div ref={textRefs[3]} className="storytelling-text">Some become memories.</div>
        <div ref={textRefs[4]} className="storytelling-text font-display gradient-text" style={{ fontSize: "var(--text-headline)" }}>
          These are ours.
        </div>
      </div>

      {/* ── STACKED CARDS WRAPPER ── */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "clamp(320px, 92vw, 1200px)",
          height: "clamp(450px, 74vh, 700px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {RELEASED_GAMES.map((game, index) => (
          <div
            key={game.id}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            onMouseMove={(e) => handleMouseMove(index, e)}
            onMouseLeave={() => handleMouseLeave(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            className="sci-fi-card"
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.85)), url(${game.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              overflow: "hidden",
              padding: "clamp(2rem, 6vw, 4.5rem)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              boxShadow: "0 30px 60px rgba(0,0,0,0.8)",
              willChange: "transform, opacity",
              zIndex: index + 1,
            }}
          >
            {/* Mouse Interactive Spotlight */}
            <div
              ref={(el) => {
                if (el) cardSpotlightsRef.current[index] = el;
              }}
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(800px circle at 50% 50%, transparent, transparent)",
                pointerEvents: "none",
                willChange: "background",
              }}
            />

            {/* Huge Number */}
            <div
              style={{
                position: "absolute",
                top: "clamp(1rem, 2vw, 2rem)",
                right: "clamp(1rem, 2vw, 2rem)",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(4.5rem, 9vw, 9rem)",
                fontWeight: 700,
                lineHeight: 1,
                color: "rgba(255,255,255,0.025)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            >
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Card Content details */}
            <div style={{ position: "relative", zIndex: 1, maxWidth: "600px" }}>
              {/* Tagline */}
              <span
                className="text-caption-sm"
                style={{
                  color: game.color,
                  marginBottom: "0.75rem",
                  display: "block",
                  opacity: 0.8,
                  fontWeight: 500,
                }}
              >
                {game.tagline}
              </span>

              {/* Title */}
              <h3
                className="text-headline"
                style={{
                  color: "var(--text-primary)",
                  marginBottom: "1rem",
                  fontWeight: 600,
                  letterSpacing: "-0.015em",
                }}
              >
                {game.title}
              </h3>

              {/* Description */}
              <p
                className="text-body-lg"
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "2rem",
                  maxWidth: "480px",
                  fontSize: "1rem",
                  lineHeight: "1.6",
                }}
              >
                {game.description}
              </p>

              {/* Platforms & Instagram Action */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {game.platforms.map((platform) => (
                    <span
                      key={platform}
                      style={{
                        padding: "0.375rem 0.875rem",
                        borderRadius: 100,
                        border: "1px solid rgba(255,255,255,0.08)",
                        fontSize: "0.75rem",
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        color: "var(--text-secondary)",
                        background: "rgba(255,255,255,0.02)",
                      }}
                    >
                      {platform}
                    </span>
                  ))}
                </div>
                <a
                  href={game.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    padding: "0.625rem 1.5rem",
                    fontSize: "0.8125rem",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {game.link.includes("itch.io") ? "Download on Itch.io →" : "Follow Updates on Instagram →"}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
