import Link from "next/link";
import { getProjectSiblings } from "@/data/projects";
import styles from "./ProjectNav.module.css";

/** Previous/next arrows that walk the project list from `slug`. */
export default function ProjectNav({ slug }: { slug: string }) {
  const { previous, next } = getProjectSiblings(slug);

  return (
    <nav className={styles.nav} aria-label="Project navigation">
      <div className={styles.inner}>
        {previous ? (
          <Link
            className={styles.arrow}
            href={previous.href}
            aria-label={`Previous project: ${previous.title}`}
          />
        ) : (
          <span className={`${styles.arrow} ${styles.disabled}`} aria-hidden />
        )}

        {next ? (
          <Link
            className={`${styles.arrow} ${styles.next}`}
            href={next.href}
            aria-label={`Next project: ${next.title}`}
          />
        ) : (
          <span
            className={`${styles.arrow} ${styles.next} ${styles.disabled}`}
            aria-hidden
          />
        )}
      </div>
    </nav>
  );
}
