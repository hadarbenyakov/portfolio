"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import styles from "./SplitStory.module.css";

export type StoryStep = {
  id: string;
  /** Left column: heading + copy for this beat of the story. */
  content: ReactNode;
  /** Right column: the image/video that belongs to this text. */
  media: ReactNode;
};

const SPLIT_QUERY = "(min-width: 768px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(SPLIT_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** "split" on tablet/desktop, "stack" on phones, null during SSR. */
function useLayoutMode(): "split" | "stack" | null {
  return useSyncExternalStore(
    subscribe,
    () => (window.matchMedia(SPLIT_QUERY).matches ? "split" : "stack"),
    () => null,
  );
}

/**
 * Scroll-told split screen: text scrolls on the left while the right column
 * stays pinned and swaps to the media for whichever text is crossing the
 * middle of the viewport. On phones it unfolds into text → media pairs.
 *
 * Media is mounted only once the layout is known (after hydration), and
 * only in one place, so heavy videos never load twice.
 */
export default function SplitStory({
  steps,
  className,
  runOut = true,
}: {
  steps: StoryStep[];
  className?: string;
  /** Extra scroll after the last beat so its text rises to the top before
   *  the section ends. Off = the section ends with the last text centred. */
  runOut?: boolean;
}) {
  const mode = useLayoutMode();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (mode !== "split") return;
    // The active beat is the last one whose top has scrolled past the middle
    // of the viewport. Computed from positions on every scroll (not from an
    // IntersectionObserver band), so a fast flick or a scrollbar drag that
    // jumps over the middle still lands on the right media.
    let raf = 0;
    const update = () => {
      raf = 0;
      const middle = window.innerHeight / 2;
      let next = 0;
      stepRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= middle) next = i;
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [mode, steps.length]);

  return (
    <div className={`${styles.story} ${mode === "split" ? styles.split : ""} ${
        runOut ? styles.runOut : ""
      } ${className ?? ""}`}>
      <div className={styles.texts}>
        {steps.map((step, i) => (
          <div
            key={step.id}
            ref={(el) => {
              stepRefs.current[i] = el;
            }}
            className={`${styles.step} ${mode === "split" && i === active ? styles.stepActive : ""}`}
          >
            <div className={styles.stepContent}>{step.content}</div>
            {mode === "stack" && <div className={styles.inlineMedia}>{step.media}</div>}
          </div>
        ))}
      </div>

      {mode === "split" && (
        <div className={styles.stage} aria-live="off">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`${styles.stageItem} ${
                i === active ? styles.stageActive : i < active ? styles.stagePast : ""
              }`}
              aria-hidden={i !== active}
            >
              {step.media}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
