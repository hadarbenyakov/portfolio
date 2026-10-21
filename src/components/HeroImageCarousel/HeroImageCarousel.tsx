"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./HeroImageCarousel.module.css";

const INTERVAL_MS = 900;
const SCROLL_FADE_THRESHOLD_PX = 24;
const FOLLOW_EASE = 0.18;

export type HeroImage = { src: string; alt: string };

export default function HeroImageCarousel({ images }: { images: HeroImage[] }) {
  const [index, setIndex] = useState(0);
  const [hasPosition, setHasPosition] = useState(false);
  const [pastThreshold, setPastThreshold] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  useEffect(() => {
    // iPad-and-below doesn't get the cursor-follower at all — only a real
    // pointer (mouse/trackpad) on a desktop-wide viewport enables it.
    if (
      !window.matchMedia("(pointer: fine)").matches ||
      !window.matchMedia("(min-width: 1280px)").matches
    ) {
      return;
    }

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      setHasPosition((was) => {
        if (!was) current.current = { ...target.current };
        return true;
      });
    };
    const onScroll = () => setPastThreshold(window.scrollY >= SCROLL_FADE_THRESHOLD_PX);

    let raf = requestAnimationFrame(function tick() {
      current.current.x += (target.current.x - current.current.x) * FOLLOW_EASE;
      current.current.y += (target.current.y - current.current.y) * FOLLOW_EASE;
      if (wrapRef.current) {
        wrapRef.current.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const visible = hasPosition && !pastThreshold;

  return (
    <div
      ref={wrapRef}
      className={`${styles.cursorFollow} ${visible ? styles.visible : ""}`}
      aria-hidden
    >
      <div className={styles.carousel}>
        {images.map((image, i) => (
          <div
            key={image.src}
            className={`${styles.slide} ${i === index ? styles.active : ""}`}
          >
            <Image src={image.src} alt={image.alt} fill sizes="280px" priority={i === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
