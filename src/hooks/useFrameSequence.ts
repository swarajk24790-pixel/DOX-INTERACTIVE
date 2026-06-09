"use client";

import { useEffect, useState, useRef } from "react";
import { FRAME_COUNT, FRAME_PATH, FRAME_EXT } from "@/lib/constants";

function getFrameSrc(index: number): string {
  return `${FRAME_PATH}${String(index).padStart(4, "0")}${FRAME_EXT}`;
}

/**
 * Preloads an image and creates an ImageBitmap from it.
 * ImageBitmap is pre-decoded and GPU-ready — drawing it to canvas is instant
 * with zero decode/rasterization cost at paint time.
 */
async function preloadFrame(src: string): Promise<ImageBitmap | null> {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    // createImageBitmap decodes the image off the main thread
    const bitmap = await createImageBitmap(blob);
    return bitmap;
  } catch {
    return null;
  }
}

export interface UseFrameSequenceReturn {
  isLoaded: boolean;
  loadProgress: number;
  frames: (ImageBitmap | null)[];
}

/**
 * Pure Preloader hook — loads all hero frame images as ImageBitmaps.
 * ImageBitmap is the fastest possible image format for canvas drawing:
 * - Decoded off the main thread via createImageBitmap
 * - No decode cost at draw time (unlike HTMLImageElement)
 * - No rasterization stalls during scroll
 * 
 * Uses 8 concurrent fetch workers to maximize throughput without
 * saturating the browser's connection pool.
 */
export function useFrameSequence(): UseFrameSequenceReturn {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const framesRef = useRef<(ImageBitmap | null)[]>([]);

  useEffect(() => {
    let active = true;
    const frames: (ImageBitmap | null)[] = new Array(FRAME_COUNT).fill(null);
    framesRef.current = frames;

    const startPreload = async () => {
      let loadedCount = 0;
      let nextIndex = 0;

      // Concurrent worker function pulling from shared index queue
      const worker = async () => {
        while (active) {
          const index = nextIndex++;
          if (index >= FRAME_COUNT) break;

          const src = getFrameSrc(index);
          const bitmap = await preloadFrame(src);
          frames[index] = bitmap;

          loadedCount++;
          if (active) {
            setLoadProgress(loadedCount / FRAME_COUNT);
          }
        }
      };

      // Spawn 8 parallel workers (sweet spot for HTTP/2 multiplexing)
      const workers = Array.from({ length: 8 }).map(() => worker());
      await Promise.all(workers);

      if (active) {
        setIsLoaded(true);
      }
    };

    startPreload();

    return () => {
      active = false;
    };
  }, []);

  return { isLoaded, loadProgress, frames: framesRef.current };
}
