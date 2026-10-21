import Image from "next/image";
import Link from "next/link";
import { hasPublicAsset } from "@/lib/assets";
import type { Project } from "@/data/projects";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({ title, image, tags, href }: Project) {
  const body = (
    <>
      <div className={styles.imageWrap}>
        {hasPublicAsset(image) ? (
          <Image
            className={styles.image}
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 582px, 100vw"
          />
        ) : (
          <div className={styles.placeholder} role="img" aria-label={title}>
            {title}
          </div>
        )}
      </div>
      <div className={styles.meta}>
        <h2 className={styles.title}>{title}</h2>
        {tags && tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );

  if (!href) return <article className={styles.card}>{body}</article>;

  return (
    <article className={styles.card}>
      <Link className={styles.link} href={href}>
        {body}
      </Link>
    </article>
  );
}
