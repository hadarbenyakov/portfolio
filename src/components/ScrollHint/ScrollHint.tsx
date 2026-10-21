"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollHint.module.css";

/** Fades out once the page has scrolled a little, so it doesn't linger over the content below. */
const FADE_THRESHOLD_PX = 24;

export default function ScrollHint({ className }: { className?: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < FADE_THRESHOLD_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <p
      className={`${className ?? ""} ${styles.hint} ${visible ? "" : styles.hidden}`}
      aria-hidden
    >
      SCROLL DOWN
    </p>
  );
}
