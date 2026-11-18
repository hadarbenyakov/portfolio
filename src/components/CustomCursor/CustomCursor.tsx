"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import styles from "./CustomCursor.module.css";

const FOLLOW_EASE = 0.35;
const ACTIVE_CLASS = "custom-cursor-active";
// Half the dot's own width/height (CustomCursor.module.css), to center it on the pointer.
const RADIUS = 11;
// Half of .label's size (CustomCursor.module.css).
const LABEL_RADIUS = 48;
// Anything clickable makes the dot swell (and drop the x-ray blend), so the
// cursor confirms "this does something". A whole <nav> counts, so the gaps
// and padding between its links don't flicker the x-ray back on.
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, nav';
// How long the dot stays swollen after leaving a link. Bridges the small
// gaps between neighbouring links (e.g. Home / Works / About in the nav), so
// sweeping across them doesn't make the dot pulse grow-shrink-grow.
const SHRINK_DELAY_MS = 120;

// Inside a case study the dot drops the x-ray and turns solid in that
// project's colour (keyed by the slug in /works/<slug>). `onDark` swaps in a
// second colour while the pointer is over a dark background, so the dot never
// vanishes into it.
type CursorTheme = { color: string; onDark?: string };
const PROJECT_THEMES: Record<string, CursorTheme> = {
  "inside-the-cults": { color: "#000000", onDark: "#ff0000" },
  bigid: { color: "#e92373" },
  xchange: { color: "#f75f19" },
  mycora: { color: "#3a6e11" },
  "sound-playground": { color: "#ffffff" },
};

/** Whether the first opaque background *visually* under (x, y) is dark
 *  (relative luminance below ~0.2). Uses the hit-test stack rather than DOM
 *  ancestors, so a transparent fixed element (like the floating nav) reports
 *  whatever section is scrolling behind it. The cursor dots themselves are
 *  pointer-events: none, so they never show up in the stack. */
function isOverDarkBackground(x: number, y: number): boolean {
  for (const node of document.elementsFromPoint(x, y)) {
    const match = getComputedStyle(node).backgroundColor.match(/[\d.]+/g);
    if (!match) continue;
    const [r, g, b, a = 1] = match.map(Number);
    if (a < 0.5) continue;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.2 * 255;
  }
  return false;
}

export default function CustomCursor() {
  const pathname = usePathname();
  const dotRef = useRef<HTMLDivElement>(null);
  const solidRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef<CursorTheme | undefined>(undefined);

  // Per-page mode: solid project colour on /works/<slug>, x-ray elsewhere.
  useEffect(() => {
    const dot = dotRef.current;
    const solid = solidRef.current;
    if (!dot || !solid) return;
    const slug = pathname.match(/^\/works\/([^/]+)/)?.[1];
    const theme = slug ? PROJECT_THEMES[slug] : undefined;
    themeRef.current = theme;
    dot.classList.toggle(styles.solidMode, Boolean(theme));
    solid.classList.toggle(styles.solidMode, Boolean(theme));
    if (theme) solid.style.setProperty("--cursor-color", theme.color);
    else solid.style.removeProperty("--cursor-color");
  }, [pathname]);

  useEffect(() => {
    const dot = dotRef.current;
    const solid = solidRef.current;
    const label = labelRef.current;
    if (!dot || !solid || !label) return;

    // Replaces the system cursor, so it only takes over where that makes
    // sense: a real pointer (mouse/trackpad) on a desktop-wide viewport.
    // Watched live, not checked once: if the window shrinks below 1280 the
    // CSS hides the dot, so the system cursor must come back at the same
    // moment — otherwise there's no cursor at all.
    const query = window.matchMedia("(pointer: fine) and (min-width: 1280px)");

    // All of the dot's state classes are toggled straight on the DOM nodes
    // (never through React's className), so a re-render can't wipe them and
    // make the dot jump.
    const start = () => {
      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };
      let hasPosition = false;
      let shrinkTimer: number | undefined;

      document.documentElement.classList.add(ACTIVE_CLASS);

      const setHovering = (on: boolean) => {
        window.clearTimeout(shrinkTimer);
        if (on) {
          dot.classList.add(styles.hovering);
          solid.classList.add(styles.hovering);
        } else if (dot.classList.contains(styles.hovering)) {
          shrinkTimer = window.setTimeout(() => {
            dot.classList.remove(styles.hovering);
            solid.classList.remove(styles.hovering);
          }, SHRINK_DELAY_MS);
        }
      };

      const updateHoverState = (el: Element | null) => {
        const overCard = el?.closest('[data-cursor="view"]') != null;
        const overInteractive = el?.closest(INTERACTIVE) != null;
        setHovering(overInteractive && !overCard);
        dot.classList.toggle(styles.hidden, overCard);
        const theme = themeRef.current;
        if (theme?.onDark) {
          solid.style.setProperty(
            "--cursor-color",
            isOverDarkBackground(target.x, target.y) ? theme.onDark : theme.color,
          );
        }
        solid.classList.toggle(styles.hidden, overCard);
        label.classList.toggle(styles.labelOn, overCard);
      };

      const onMove = (e: MouseEvent) => {
        target.x = e.clientX;
        target.y = e.clientY;
        if (!hasPosition) {
          // Snap on (re)entry instead of gliding in from the last spot.
          current.x = target.x;
          current.y = target.y;
          hasPosition = true;
          dot.classList.add(styles.visible);
          solid.classList.add(styles.visible);
        }
        updateHoverState(e.target instanceof Element ? e.target : null);
      };

      // Pointer left the window: hide, and snap back in on the next move.
      const onOut = (e: MouseEvent) => {
        if (e.relatedTarget) return;
        hasPosition = false;
        dot.classList.remove(styles.visible);
        solid.classList.remove(styles.visible);
        updateHoverState(null);
      };

      // Scrolling moves the page under a still pointer without firing
      // mousemove, so re-check what's under it (e.g. a card scrolling away
      // shouldn't leave the "View" bubble stuck on).
      const onScroll = () => {
        if (hasPosition) updateHoverState(document.elementFromPoint(target.x, target.y));
      };

      let raf = requestAnimationFrame(function tick() {
        current.x += (target.x - current.x) * FOLLOW_EASE;
        current.y += (target.y - current.y) * FOLLOW_EASE;
        // Position goes on `translate`, NOT `transform`: CSS applies the
        // standalone `scale` / `rotate` (used for the hover swell and the
        // View bubble's spin) on top of `transform`, which would multiply the
        // x/y offset and fling the dot off-screen. `translate` is applied
        // after them, so they act around the dot's own centre.
        dot.style.translate = `${current.x - RADIUS}px ${current.y - RADIUS}px`;
        solid.style.translate = dot.style.translate;
        label.style.translate = `${current.x - LABEL_RADIUS}px ${current.y - LABEL_RADIUS}px`;
        raf = requestAnimationFrame(tick);
      });

      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseout", onOut);
      window.addEventListener("scroll", onScroll, { passive: true });

      return () => {
        document.documentElement.classList.remove(ACTIVE_CLASS);
        window.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseout", onOut);
        window.removeEventListener("scroll", onScroll);
        cancelAnimationFrame(raf);
        window.clearTimeout(shrinkTimer);
        dot.classList.remove(styles.visible, styles.hovering, styles.hidden);
        solid.classList.remove(styles.visible, styles.hovering, styles.hidden);
        label.classList.remove(styles.labelOn);
      };
    };

    let stop = query.matches ? start() : undefined;
    const onChange = () => {
      stop?.();
      stop = query.matches ? start() : undefined;
    };
    query.addEventListener("change", onChange);

    return () => {
      query.removeEventListener("change", onChange);
      stop?.();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} aria-hidden />
      {/* Separate solid-orange twin for hover. The x-ray dot never switches
          blend mode; the two just crossfade, which renders reliably
          (toggling mix-blend-mode mid-transition can snap back in Safari). */}
      <div ref={solidRef} className={`${styles.dot} ${styles.solid}`} aria-hidden />
      {/* Over a project card the dot hands over to a big "View" bubble */}
      <div ref={labelRef} className={styles.label} aria-hidden>
        <span className={styles.labelText}>View ↗</span>
      </div>
    </>
  );
}
