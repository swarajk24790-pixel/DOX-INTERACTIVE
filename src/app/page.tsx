"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import Navigation from "@/components/Navigation";
import HeroTextOverlay from "@/components/HeroTextOverlay";
import PhilosophySection from "@/components/PhilosophySection";
import GamesSection from "@/components/GamesSection";
import FutureSection from "@/components/FutureSection";
import ProcessSection from "@/components/ProcessSection";
import TrustSection from "@/components/TrustSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { useFrameSequence } from "@/hooks/useFrameSequence";
import SmoothScroll from "@/components/SmoothScroll";
import { FRAME_COUNT } from "@/lib/constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [appReady, setAppReady] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Height of scrollable space dedicated to the door sequence animation
  const heroScrollHeight = 6000;

  // Pure preloader: preloads all 193 frames as ImageBitmaps before allowing play
  const { isLoaded, loadProgress, frames } = useFrameSequence();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Memoize the onComplete callback to prevent re-triggering LoadingScreen effect
  const handleLoadComplete = useCallback(() => setAppReady(true), []);

  // ── Scroll Restoration & Initialization ──
  useEffect(() => {
    // Force scroll to top on fresh mount
    window.scrollTo(0, 0);
    
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // ── Scroll Locking during Preloading ──
  useEffect(() => {
    if (!appReady) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      // Ensure we start at the absolute top when scrolling becomes active
      window.scrollTo(0, 0);
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [appReady]);

  useEffect(() => {
    if (!appReady || !isLoaded || frames.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── 1. Get 2D context once ──
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // ── 2. Canvas sizing with DPR handling ──
    let vw = 0;
    let vh = 0;

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      if (w === vw && h === vh) return;
      vw = w;
      vh = h;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();

    // ── 3. Frame painting with fallback safety ──
    let lastDrawnFrame = -1;

    const paintFrame = (frameIndex: number) => {
      if (frameIndex === lastDrawnFrame) return;

      // Find the closest loaded frame to prevent black screens/flickers
      let bitmap = frames[frameIndex];
      if (!bitmap) {
        let left = frameIndex - 1;
        let right = frameIndex + 1;
        while (left >= 0 || right < FRAME_COUNT) {
          if (left >= 0 && frames[left]) {
            bitmap = frames[left];
            break;
          }
          if (right < FRAME_COUNT && frames[right]) {
            bitmap = frames[right];
            break;
          }
          left--;
          right++;
        }
      }

      if (!bitmap) return;
      lastDrawnFrame = frameIndex;

      // Cover-fit calculation (same as object-fit: cover)
      const imgRatio = bitmap.width / bitmap.height;
      const canvasRatio = vw / vh;
      let dw: number, dh: number, dx: number, dy: number;

      if (imgRatio > canvasRatio) {
        dh = vh;
        dw = vh * imgRatio;
        dx = (vw - dw) / 2;
        dy = 0;
      } else {
        dw = vw;
        dh = vw / imgRatio;
        dx = 0;
        dy = (vh - dh) / 2;
      }

      ctx.clearRect(0, 0, vw, vh);
      ctx.drawImage(bitmap, dx, dy, dw, dh);
    };

    // Draw first frame immediately
    paintFrame(0);

    // ── 4. GSAP ScrollTrigger timeline ──
    const gsapCtx = gsap.context(() => {
      const frameProxy = { index: 0 };

      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: `+=${heroScrollHeight}`,
          scrub: true, // Synced scrubbing with zero lag (since Lenis already smooths scroll)
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate frame index — synchronous paint in onUpdate
      heroTl.to(frameProxy, {
        index: FRAME_COUNT - 1,
        ease: "none",
        duration: 10,
        onUpdate: () => {
          paintFrame(Math.round(frameProxy.index));
        },
      }, 0);

      // Canvas scale-in push effect at final stages (85% to 100% progress)
      heroTl.to(".hero-canvas-container", {
        scale: 1.04,
        ease: "power1.inOut",
        duration: 1.5,
      }, 8.5);

      // Ambient logo glow fade-in at DOX logo reveal
      heroTl.to("#hero-glow", {
        opacity: 1,
        ease: "power1.inOut",
        duration: 1.2,
      }, 8.8);

      // Scanline sweep visibility
      heroTl.to("#hero-scanline-sweep", {
        opacity: 1,
        ease: "none",
        duration: 1.2,
      }, 8.8);

      // White overlay blend transition
      heroTl.to("#hero-transition-overlay", {
        opacity: 1,
        ease: "sine.in",
        duration: 1.2,
      }, 8.5)
      .to("#hero-transition-overlay", {
        opacity: 0,
        ease: "sine.out",
        duration: 0.2,
      }, 9.8);

      // --- TEXT OVERLAYS STORYTELLING TIMELINE ---
      const animateText = (id: string, start: number, showDur: number, hideDur: number) => {
        heroTl.to(`#hero-text-${id}`, {
          opacity: 1,
          y: -10,
          duration: showDur,
          ease: "power2.out",
        }, start)
        .to(`#hero-text-${id}`, {
          opacity: 0,
          y: -30,
          duration: hideDur,
          ease: "power2.in",
        }, start + showDur + 0.6);
      };

      animateText("intro", 0.1, 0.8, 0.6);
      animateText("door", 2.3, 0.8, 0.6);
      animateText("stories", 4.5, 0.8, 0.6);
      animateText("worlds", 6.7, 0.8, 0.6);

      // Last text fades in and then disappears fast during difference blend burst
      heroTl.to("#hero-text-build", {
        opacity: 1,
        y: -10,
        duration: 0.8,
        ease: "power2.out",
      }, 8.9)
      .to("#hero-text-build", {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: "power2.in",
      }, 9.8);

      // Navigation bar visibility toggling
      ScrollTrigger.create({
        trigger: "#hero",
        start: "bottom-=100px top",
        onEnter: () => setNavVisible(true),
        onLeaveBack: () => setNavVisible(false),
      });

      // Scroll indicator toggling
      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=200",
        onLeave: () => setShowScrollIndicator(false),
        onEnterBack: () => setShowScrollIndicator(true),
      });

      ScrollTrigger.refresh();
    });

    // ── 5. Resize handler ──
    const handleResize = () => {
      updateCanvasSize();
      lastDrawnFrame = -1; // force redraw on next update
      // Redraw current frame immediately after resize
      const currentFrame = Math.round(
        (ScrollTrigger.getAll().find(st => st.vars.trigger === "#hero")?.progress || 0) * (FRAME_COUNT - 1)
      );
      paintFrame(currentFrame);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsapCtx.revert();
      window.removeEventListener("resize", handleResize);
    };
  }, [appReady, isLoaded, frames, heroScrollHeight]);

  return (
    <main style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      <SmoothScroll>
        {/* Futuristic Custom Cursor */}
        <CustomCursor />

        {/* Loading overlay */}
        <LoadingScreen
          isLoaded={isLoaded}
          loadProgress={loadProgress}
          onComplete={() => setAppReady(true)}
        />

        {appReady && (
          <>
            {/* Scroll Indicator */}
            {showScrollIndicator && (
              <div className="scroll-indicator">
                <span
                  style={{
                    fontSize: "var(--text-caption)",
                    fontFamily: "var(--font-body)",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    opacity: 0.8,
                  }}
                >
                  Scroll to enter
                </span>
                <div className="scroll-indicator-line" />
              </div>
            )}

            {/* Navigation */}
            <Navigation isVisible={navVisible} />

            {/* Hero Section - Pinned and managed entirely by GSAP ScrollTrigger */}
            {/* Stable container to isolate GSAP pinning from React DOM reconciliation */}
            <div>
              <div
                id="hero"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100vh",
                  overflow: "hidden",
                  zIndex: 1,
                }}
              >
                {/* Canvas painting frame sequence with cinematic scale push-in */}
                <div 
                  className="hero-canvas-container"
                  style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    zIndex: 1,
                    transform: "scale(1)",
                    willChange: "transform",
                  }}
                >
                  <canvas ref={canvasRef} />
                </div>

                {/* Special ambient logo lighting pulsing in the final frames */}
                <div
                  id="hero-glow"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "250px",
                    height: "250px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(74, 158, 255, 0.45) 0%, transparent 70%)",
                    pointerEvents: "none",
                    zIndex: 2,
                    opacity: 0,
                    mixBlendMode: "screen",
                    filter: "blur(16px)",
                    animation: "logoPulse 3.5s infinite ease-in-out",
                    willChange: "opacity",
                  }}
                />

                {/* Scanline sweep effect across the logo sequence */}
                <div 
                  id="hero-scanline-sweep"
                  className="scanline-sweep" 
                  style={{
                    opacity: 0,
                    willChange: "opacity",
                  }}
                />

                {/* Static Text timelines - opacity/position fully controlled by GSAP */}
                <HeroTextOverlay />

                {/* White screen transition overlay for door opening at the end of the scroll */}
                <div
                  id="hero-transition-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "#ffffff",
                    opacity: 0,
                    pointerEvents: "none",
                    zIndex: 6,
                    mixBlendMode: "difference", // Cinematic light burst blend mode
                    willChange: "opacity",
                  }}
                />
              </div>
            </div>

            {/* Rest of page content (slides up or appears sequentially) */}
            <div
              style={{
                position: "relative",
                zIndex: 5,
                background: "var(--bg-primary)",
                boxShadow: "0 -20px 40px rgba(0,0,0,0.9)",
              }}
            >
              {/* Philosophy */}
              <PhilosophySection />

              {/* Games Showcase */}
              <GamesSection />

              {/* Future/Mystery */}
              <FutureSection />

              {/* How We Build */}
              <ProcessSection />

              {/* Trust Section */}
              <TrustSection />

              {/* Call to Action */}
              <CTASection />

              {/* Footer */}
              <Footer />
            </div>
          </>
        )}
      </SmoothScroll>
    </main>
  );
}
