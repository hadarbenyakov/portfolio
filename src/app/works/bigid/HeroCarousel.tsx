"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

const DWELL_MS = 2200;
const TRANSITION_MS = 900;
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

/**
 * Takes pre-rendered items (one per screen, already tripled by the caller
 * so there's always a real neighbour on either side of center) and drives
 * them as a center-focused, step-at-a-time carousel: the item nearest the
 * middle scales up to full size, its neighbours recede, and autoplay
 * dwells at each centered position before easing to the next — so the pace
 * rises and falls with each swap instead of running at one constant speed.
 *
 * Takes rendered nodes rather than importing MacbookMockup itself — that
 * component's video slot reads the filesystem (@/lib/assets), which only
 * resolves server-side; pulling it into this "use client" file would drag
 * that server-only import into the browser bundle.
 */
export default function HeroCarousel({
  items,
  setCount,
}: {
  items: ReactNode[];
  /** How many real screens make up one copy (items.length / setCount copies). */
  setCount: number;
}) {
  const [current, setCurrent] = useState(setCount);
  const [jumping, setJumping] = useState(false);
  const [paused, setPaused] = useState(false);
  const [metrics, setMetrics] = useState({ step: 0, itemWidth: 0, containerWidth: 0 });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track) return;

    function measure() {
      const children = track!.children;
      if (children.length < 2) return;
      const a = (children[0] as HTMLElement).offsetLeft;
      const b = (children[1] as HTMLElement).offsetLeft;
      setMetrics({
        step: b - a,
        itemWidth: (children[0] as HTMLElement).offsetWidth,
        containerWidth: wrapper!.clientWidth,
      });
    }

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || paused) return;

    const id = setInterval(() => {
      setCurrent((c) => c + 1);
    }, DWELL_MS + TRANSITION_MS);
    return () => clearInterval(id);
  }, [paused]);

  // Silent loop reset once the middle copy has been fully walked through.
  useEffect(() => {
    if (current < setCount * 2) return;
    const id = setTimeout(() => {
      setJumping(true);
      setCurrent((c) => c - setCount);
    }, TRANSITION_MS);
    return () => clearTimeout(id);
  }, [current, setCount]);

  useEffect(() => {
    if (!jumping) return;
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setJumping(false))
    );
    return () => cancelAnimationFrame(id);
  }, [jumping]);

  const { step, itemWidth, containerWidth } = metrics;
  const offset =
    containerWidth > 0
      ? containerWidth / 2 - (current * step + itemWidth / 2)
      : 0;

  return (
    <div
      className={styles.carousel}
      ref={wrapperRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={styles.carouselTrack}
        ref={trackRef}
        style={{
          transform: `translateX(${offset}px)`,
          transition: jumping ? "none" : `transform ${TRANSITION_MS}ms ${EASE}`,
        }}
      >
        {items.map((item, i) => {
          const distance = Math.abs(i - current);
          const scale = distance === 0 ? 1 : distance === 1 ? 0.78 : 0.62;
          const opacity = distance === 0 ? 1 : distance === 1 ? 0.5 : 0.22;

          return (
            <div
              className={styles.carouselItem}
              key={i}
              style={{
                transform: `scale(${scale})`,
                opacity,
                transition: jumping
                  ? "none"
                  : `transform ${TRANSITION_MS}ms ${EASE}, opacity ${TRANSITION_MS}ms ${EASE}`,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
