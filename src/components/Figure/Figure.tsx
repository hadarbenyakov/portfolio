import Image from "next/image";
import styles from "./Figure.module.css";

type FigureProps = {
  /** Figma aspect ratio, e.g. 1.6 — keeps the slot stable before the export lands. */
  ratio: number;
  alt: string;
  src?: string;
  sizes?: string;
  className?: string;
};

export default function Figure({
  ratio,
  alt,
  src,
  sizes = "100vw",
  className,
}: FigureProps) {
  const style = { aspectRatio: String(ratio) };
  const classes = [styles.figure, className].filter(Boolean).join(" ");

  if (!src) {
    return (
      <div
        className={`${classes} ${styles.placeholder}`}
        style={style}
        role="img"
        aria-label={alt}
      >
        {alt}
      </div>
    );
  }

  return (
    <div className={classes} style={style}>
      <Image className={styles.image} src={src} alt={alt} fill sizes={sizes} />
    </div>
  );
}
