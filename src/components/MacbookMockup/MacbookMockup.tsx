import Image from "next/image";
import DeviceVideo from "@/components/DeviceVideo/DeviceVideo";
import styles from "./MacbookMockup.module.css";

type MacbookMockupProps = {
  /** Still shown on the screen. Defaults to the screenshot Figma ships in the mockup. */
  src?: string;
  /** Screen recording; replaces the still once the file exists under /public. */
  video?: string;
  /** "cover" (default) fills the frame and crops; "contain" shows the
   *  whole recording letterboxed, for clips whose aspect ratio doesn't
   *  match the device frame. Only applies when `video` is set. */
  videoFit?: "cover" | "contain";
  alt: string;
  sizes?: string;
  className?: string;
};

export default function MacbookMockup({
  src = "/projects/mycora/mac-screen.png",
  video,
  videoFit,
  alt,
  sizes = "(min-width: 1280px) 820px, 100vw",
  className,
}: MacbookMockupProps) {
  return (
    <div className={[styles.mockup, className].filter(Boolean).join(" ")}>
      {/* Figma paints the bezel first and the screen content over it, so the
          chrome must come before .screen in source order. */}
      <div className={styles.chrome} aria-hidden>
        <span className={styles.screenFrame} />
        <span className={styles.deviceBody} />
        <span className={styles.deviceBottom} />
        <span className={styles.bevelLight} />
        <span className={styles.bevelMultiply} />
      </div>
      <div className={styles.screen}>
        {video ? (
          <DeviceVideo src={video} label={alt} poster={src} fit={videoFit} />
        ) : (
          <Image className={styles.screenImage} src={src} alt={alt} fill sizes={sizes} />
        )}
      </div>
      <div className={styles.displayBottom} />
    </div>
  );
}
