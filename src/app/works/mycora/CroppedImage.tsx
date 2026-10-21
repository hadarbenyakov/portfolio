import Image from "next/image";
import styles from "./page.module.css";

type CroppedImageProps = {
  src: string;
  alt: string;
  /** Visible box, in Figma px. */
  width: number;
  height: number;
  /** Figma's inner crop transform, as percentages of the visible box. */
  crop?: { left?: string; top?: string; width?: string; height?: string };
  /** Figma rotates several scans -90°. */
  rotated?: boolean;
  sizes?: string;
};

/**
 * Reproduces a Figma image fill that is cropped (and sometimes rotated) inside a
 * smaller frame, rather than re-cropping the exported asset.
 */
export default function CroppedImage({
  src,
  alt,
  width,
  height,
  crop,
  rotated = false,
  sizes = "(min-width: 1280px) 33vw, 50vw",
}: CroppedImageProps) {
  const box = (
    <div className={styles.crop} style={{ width, height }}>
      <div
        className={styles.cropInner}
        style={{
          left: crop?.left ?? 0,
          top: crop?.top ?? 0,
          width: crop?.width ?? "100%",
          height: crop?.height ?? "100%",
        }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} />
      </div>
    </div>
  );

  if (!rotated) return box;

  // The rotated child is taken out of flow, so the wrapper holds the swapped box.
  return (
    <div className={styles.rotateWrap} style={{ width: height, height: width }}>
      {box}
    </div>
  );
}
