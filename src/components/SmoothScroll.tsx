"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom Apple-style exponential easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    // 3. Connect Lenis scroll events to ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 4. Hook into GSAP's ticker to run Lenis raf (requestAnimationFrame) loop
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000); // lenis expects milliseconds
    };
    gsap.ticker.add(tickerUpdate);

    // Disable GSAP lag smoothing to keep scrolling and triggers perfectly in sync
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger on resize or page layout shift
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    return () => {
      // Clean up on component unmount
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  return <>{children}</>;
}
