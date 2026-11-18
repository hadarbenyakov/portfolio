import Image from "next/image";
import Link from "next/link";
import { hasPublicAsset } from "@/lib/assets";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

const IMAGE_SIZES = "(min-width: 1024px) 582px, 100vw";

export default function ProjectCard({
  title,
  image,
  video,
  tags,
  href,
  index = 0,
}: Project & { index?: number }) {
  const revealClass = index % 2 === 0 ? "reveal" : "reveal-1";
  const badge = tags?.[0];
  const body = (
    <>
      <div className={styles.imageWrap}>
        {hasPublicAsset(image) ? (
          <>
            <Image
              className={styles.image}
              src={image}
              alt={title}
              fill
              sizes={IMAGE_SIZES}
            />
            {video && hasPublicAsset(video) && (
              <video
                className={styles.video}
                src={video}
                autoPlay
                loop
                muted
                playsInline
                aria-hidden
              />
            )}
          </>
        ) : (
          <div className={styles.placeholder} role="img" aria-label={title}>
            {title}
          </div>
        )}
      </div>
      <div className={styles.meta}>
        <h2 className={styles.title}>{title}</h2>
        {badge && <span className={styles.badge}>{badge}</span>}
      </div>
    </>
  );

  if (!href) return <article className={`${styles.card} ${revealClass}`}>{body}</article>;

  return (
    <article className={`${styles.card} ${revealClass}`}>
      <Link className={styles.link} href={href} data-cursor="view">
        {body}
      </Link>
    </article>
  );
}
