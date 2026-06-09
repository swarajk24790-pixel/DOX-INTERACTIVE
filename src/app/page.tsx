"use client";

import { useState, useEffect, useCallback } from "react";
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
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const [appReady, setAppReady] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  const handleVideoLoaded = useCallback(() => {
    setVideoReady(true);
    setLoadProgress(1);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoReady(true);
    setLoadProgress(1);
  }, []);

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
    if (!appReady) return;

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setNavVisible(scrollY > 40);
      setShowScrollIndicator(scrollY < 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [appReady]);

  return (
    <main style={{ position: "relative", minHeight: "100vh", overflowX: "hidden" }}>
      <SmoothScroll>
        {/* Futuristic Custom Cursor */}
        <CustomCursor />

        {/* Loading overlay */}
        <LoadingScreen
          isLoaded={videoReady}
          loadProgress={loadProgress}
          onComplete={handleLoadComplete}
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

            {/* Hero Section - background video hero with overlay text */}
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
                <div className="hero-video-container">
                  <video
                    className="hero-bg-video"
                    playsInline
                    muted
                    loop
                    autoPlay
                    preload="auto"
                    onLoadedData={handleVideoLoaded}
                    onError={handleVideoError}
                  >
                    <source src="/hero-bg.webm" type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="hero-video-overlay" />
                </div>

                <HeroTextOverlay />
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
