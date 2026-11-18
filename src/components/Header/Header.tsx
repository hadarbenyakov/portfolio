import Link from "next/link";
import { ViewTransition } from "react";
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
              {/* The black pill is its own element with a shared view-transition
                  name, so on navigation it flies from the old tab to the new
                  one (globals.css styles the flight). */}
              {isActive && (
                <ViewTransition name="nav-pill" share="nav-pill" default="none">
                  <span className={styles.activePill} aria-hidden />
                </ViewTransition>
              )}
              {/* Each label is its own view-transition layer, stacked above
                  the flying pill, so it turns white as the pill arrives
                  instead of popping in after the animation ends. */}
              <span
                className={`${styles.navLabel} nav-label-layer`}
                style={{ viewTransitionName: `nav-label-${label.toLowerCase()}` }}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      <a className={`${styles.contact} link-underline`} href={CONTACT_HREF}>
        Contact Me
      </a>
    </header>
  );
}
