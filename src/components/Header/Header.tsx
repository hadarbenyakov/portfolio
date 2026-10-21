import Link from "next/link";
import { firstCaseStudyHref } from "@/data/projects";
import styles from "./Header.module.css";

const CONTACT_HREF =
  "mailto:hadarbenyakov@gmail.com" +
  "?subject=Let%E2%80%99s%20work%20together" +
  "&body=Hi%2C%20I%20loved%20your%20portfolio%20and%20would%20love%20to%20connect.";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Works", href: firstCaseStudyHref },
  { label: "About", href: "/about" },
];

export default function Header({ active = "Home" }: { active?: string }) {
  return (
    <header className={styles.header}>
      <Link className={styles.wordmark} href="/">
        HADAR BY
      </Link>

      <nav className={styles.nav} aria-label="Main">
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = label === active;
          return (
            <Link
              key={label}
              href={href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <a className={styles.contact} href={CONTACT_HREF}>
        Contact Me
      </a>
    </header>
  );
}
