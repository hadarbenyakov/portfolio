import { hasPublicAsset } from "@/lib/assets";
import styles from "./DeviceVideo.module.css";

type DeviceVideoProps = {
  /** Path under /public, e.g. /projects/mycora/hunter-1.mp4 */
  src: string;
  /** Shown in the slot while the recording is missing. */
  label: string;
  poster?: string;
  /** "cover" (default) fills the frame and crops; "contain" shows the
   *  whole recording letterboxed, for clips whose aspect ratio doesn't
   *  match the device frame. */
  fit?: "cover" | "contain";
};

export default function DeviceVideo({ src, label, poster, fit = "cover" }: DeviceVideoProps) {
  if (!hasPublicAsset(src)) {
    return <div className={styles.slot}>{label}</div>;
  }

  return (
    <video
      className={styles.media}
      style={fit === "contain" ? { objectFit: fit, backgroundColor: "#000" } : { objectFit: fit }}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      aria-label={label}
    />
  );
}
