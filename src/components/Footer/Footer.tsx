import styles from "./Footer.module.css";

const EMAIL = "Hadarbenyakov@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/hadar-ben-yaakov-6b153939b/";
const CV =
  "https://drive.google.com/file/d/1N6iYfKnpzNHpXy70BkRPGllhrqTU9-iz/view?usp=sharing";

type FooterProps = {
  /** The About page lists the CV first and drops the rule above the row. */
  variant?: "default" | "about";
};

export default function Footer({ variant = "default" }: FooterProps) {
  const isAbout = variant === "about";

  return (
    <footer className={`${styles.footer} ${isAbout ? styles.footerFlush : ""}`}>
      <div className={`${styles.inner} ${isAbout ? styles.innerFlush : ""}`}>
        <h2 className={styles.heading}>Reach out</h2>
        <nav className={styles.links} aria-label="Social">
          {isAbout && (
            <a
              className={`${styles.link} ${styles.underlined}`}
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
            >
              CV
            </a>
          )}
          {isAbout ? (
            <>
              <a
                className={`${styles.link} ${styles.underlined}`}
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a className={styles.link} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </>
          ) : (
            <>
              <a className={styles.link} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              <a
                className={`${styles.link} ${styles.underlined}`}
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </>
          )}
        </nav>
      </div>
    </footer>
  );
}
