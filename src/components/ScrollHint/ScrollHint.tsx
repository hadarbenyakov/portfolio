"use client";

import { useEffect, useState, type MouseEvent } from "react";
import styles from "./ScrollHint.module.css";

/** Fades out once the page has scrolled a little, so it doesn't linger over the content below. */
const FADE_THRESHOLD_PX = 24;

/**
 * "Scroll down" + a looping arrow that drops out of its ring and drops back in.
 * Doubles as a link: clicking it glides down to `targetId`.
 */
export default function ScrollHint({
  className,
  targetId,
}: {
  className?: string;
  targetId: string;
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < FADE_THRESHOLD_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={onClick}
      className={`${className ?? ""} ${styles.hint} ${visible ? "" : styles.hidden}`}
      aria-label="Scroll down to projects"
      tabIndex={visible ? 0 : -1}
    >
      <span className={styles.label}>Scroll down</span>
      <span className={styles.ring} aria-hidden>
        <svg className={styles.arrow} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 4v15M5.5 12.5 12 19l6.5-6.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}
