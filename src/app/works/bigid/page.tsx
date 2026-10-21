import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MacbookMockup from "@/components/MacbookMockup/MacbookMockup";
import ProjectNav from "@/components/ProjectNav/ProjectNav";
import HeroCarousel from "./HeroCarousel";
import styles from "./page.module.css";

const A = "/projects/bigid";

export const metadata: Metadata = {
  title: "BigID — Hadar Ben Yaakov",
  description:
    "DS Analytics: a dashboard built during my internship at BigID that watches a design system after it ships. Adoption, usage quality, consistency, and trust, measured straight from the live codebase.",
};

const HERO_SCREENS = [
  { src: "screen-overview.png", alt: "DS Analytics — Overview" },
  { src: "screen-adoption.png", alt: "DS Analytics — Adoption Rate" },
  { src: "screen-usage-quality.png", alt: "DS Analytics — Usage Quality" },
  { src: "screen-design-consistency.png", alt: "DS Analytics — Design Consistency" },
  { src: "screen-satisfaction-trust.png", alt: "DS Analytics — Satisfaction & Trust" },
];

// Tripled so the carousel always has a real neighbour on either side of
// whichever item is centered — see HeroCarousel for the loop mechanics.
const HERO_CAROUSEL_ITEMS = [
  ...HERO_SCREENS,
  ...HERO_SCREENS,
  ...HERO_SCREENS,
].map(({ src, alt }, i) => (
  <MacbookMockup
    className={styles.carouselMac}
    src={`${A}/${src}`}
    alt={alt}
    sizes="620px"
    key={i}
  />
));

// Each shot's real pixel dimensions, read straight off the exported files —
// the grid lays them out at their native aspect ratio instead of cropping
// everything into a uniform box.
const RESEARCH_SHOTS = [
  {
    slug: "twilio",
    name: "Twilio",
    shots: [
      [1, 842, 182],
      [2, 537, 411],
    ],
  },
  {
    slug: "productboard",
    name: "Productboard",
    shots: [
      [1, 1336, 468],
      [2, 1024, 584],
      [3, 1024, 421],
      [4, 1024, 260],
      [5, 1024, 454],
    ],
  },
  {
    slug: "brevo",
    name: "Brevo — Indigo DS",
    shots: [
      [1, 2598, 1400],
      [2, 2264, 1440],
      [3, 2016, 1056],
    ],
  },
  {
    slug: "figma",
    name: "Figma Library Analytics",
    shots: [
      [1, 1920, 1441],
      [2, 1920, 1440],
      [3, 1920, 695],
      [4, 1920, 695],
      [5, 1920, 695],
      [6, 1920, 1441],
    ],
  },
  {
    slug: "zeroheight",
    name: "zeroheight & Storybook add-ons",
    shots: [
      [1, 1704, 1245],
      [2, 1704, 1245],
      [3, 1860, 826],
      [4, 1494, 790],
      [5, 3462, 1551],
    ],
  },
  {
    slug: "omlet",
    name: "omlet",
    shots: [
      [1, 1464, 1040],
      [2, 1532, 1106],
      [3, 1532, 1114],
      [4, 3600, 1800],
      [5, 3600, 1800],
      [6, 3600, 1800],
    ],
  },
  {
    slug: "react-scanner-studio",
    name: "React Scanner Studio",
    shots: [
      [1, 1924, 991],
      [2, 1923, 993],
      [3, 960, 992],
      [4, 1919, 992],
    ],
  },
].map((entry) => ({ ...entry, logo: `${A}/research/${entry.slug}/logo.png` }));

const PILLARS = [
  {
    num: "01",
    title: "Adoption Rate",
    question: "Is the design system being used, and where?",
    body: "The most basic question of all: are people actually using what you built, and is that number moving.",
    metrics: ["% DS vs. custom", "Teams using the DS", "Usage frequency", "Adoption trend"],
  },
  {
    num: "02",
    title: "Usage Quality",
    question: "Is it being used correctly and consistently?",
    body: "Adoption alone isn't enough. A component used wrong is barely better than no component at all.",
    metrics: ["Overrides", "Deprecated usage", "Detached instances", "Token consistency"],
  },
  {
    num: "03",
    title: "Design Consistency",
    question: "Is the product coherent end to end?",
    body: "Checks whether what's in Figma, Storybook, and the shipped code still agree with each other.",
    metrics: ["Guideline adherence", "Design ↔ code parity", "Naming consistency", "Shadow components"],
  },
  {
    num: "04",
    title: "Efficiency & Impact",
    question: "What operational value does it actually create?",
    body: "How often the components you built get reused, instead of rebuilt from scratch again.",
    metrics: ["Time saved", "Reuse rate", "Fewer ad-hoc components", "Effort before/after"],
  },
  {
    num: "05",
    title: "Satisfaction & Trust",
    question: "How do people experience it, day to day?",
    body: "A system can clear every metric above and still be something teams quietly route around.",
    metrics: ["Satisfaction score", "Docs clarity", "Production confidence", "Open feedback"],
  },
];

const CLAUDE_TRIES = [
  { src: "claude-tries/1a.png", w: 404, h: 412 },
  { src: "claude-tries/1b.png", w: 505, h: 412 },
  { src: "claude-tries/1c.png", w: 544, h: 412 },
  { src: "claude-tries/1d.png", w: 554, h: 412 },
];

export default function BigIdPage() {
  return (
    <div className={styles.page}>
      <Header active="Works" />

      <ProjectNav slug="bigid" />

      <main className={styles.main}>
        {/* ---------- hero ---------- */}
        <section className={`${styles.bleed} ${styles.hero}`}>
          <HeroCarousel
            items={HERO_CAROUSEL_ITEMS}
            setCount={HERO_SCREENS.length}
          />

          <div className={styles.heroText}>
            <p className={styles.heroBadge}>Real product · Built in code</p>
            <h1 className={styles.heroTitle}>
              Design System Analytics for BigID
            </h1>
            <p className={styles.heroTagline}>
              Designed during my product design internship, a dashboard
              that tracks how BigID&rsquo;s own design system is actually
              adopted, used, and trusted across the real codebase.
            </p>
          </div>
        </section>

        {/* ---------- about BigID (bleed) ---------- */}
        <section className={`${styles.bleed} ${styles.about}`}>
          <div className={styles.aboutInner}>
            <div className={styles.aboutLogo}>
              {/* eslint-disable-next-line @next/next/no-img-element -- local SVG, next/image optimizer rejects SVG by default */}
              <img
                className={styles.aboutLogoMark}
                src={`${A}/bigid-logo-full.svg`}
                alt="BigID"
              />
            </div>

            <p className={styles.aboutText}>
              BigID is a data intelligence company, helping enterprises
              discover, classify, secure, and govern their most sensitive
              data. I joined BigID&rsquo;s UX team as a product design
              intern.
              <br />
              DS Analytics was my assignment for the month and a half that
              followed, from first sketch to the dashboard shown here.
            </p>
          </div>
        </section>

        {/* ---------- problem ---------- */}
        <section className={`${styles.section} ${styles.problemSection}`}>
          <div className={styles.problemIntro}>
            <h2 className={styles.problemTitle}>The Problem</h2>
            <p className={styles.problemLede}>
              BigID has more than one design system, depending on where you
              look. There&rsquo;s the one in Figma, which designers work
              from, and there&rsquo;s the one in Storybook, where developers
              pull components from to build. Designers at BigID have no way
              to actually monitor their design system in practice. It
              lives in several places at once, developers sometimes break
              the components, and nobody tracks it. The design system
              changes daily, and the company works in genuine chaos around
              its own components. I was asked to build them a dashboard
              that watches Figma, Storybook, and the live code together,
              and shows exactly what&rsquo;s happening to components in the
              product.
            </p>
          </div>
        </section>

        {/* ---------- HMW (its own full beat) ---------- */}
        <section className={`${styles.section} ${styles.statementSection}`}>
          <div className={styles.statement}>
            <p className={styles.statementHmw}>HMW</p>
            <p className={styles.statementText}>
              give BigID teams real visibility into how their components
              are actually built, used, and trusted once they leave Figma?
            </p>
          </div>
        </section>

        {/* ---------- research ---------- */}
        <section className={styles.section}>
          <div className={styles.intro}>
            <h2 className={styles.eyebrowDark}>Research</h2>
            <p className={styles.lede}>
              Before building anything new, I mapped how teams who&rsquo;d
              already solved pieces of this problem were doing it, from
              scrappy internal scripts to paid governance platforms.
            </p>
          </div>

          <div className={styles.shotsGroups}>
            {RESEARCH_SHOTS.map(({ slug, name, shots, logo }) => (
              <div className={styles.shotRow} key={slug}>
                <div className={styles.shotMeta}>
                  <div className={styles.shotLogo}>
                    <Image src={logo} alt={name} fill sizes="220px" />
                  </div>
                </div>
                <div className={styles.shotGrid}>
                  {shots.map(([i, w, h]) => (
                    <div
                      className={styles.shotThumbWrap}
                      key={i}
                      style={{ aspectRatio: `${w} / ${h}` }}
                    >
                      <Image
                        className={styles.shotThumb}
                        src={`/projects/bigid/research/${slug}/${i}.png`}
                        alt={`${name} — screenshot ${i}`}
                        fill
                        sizes="100vw"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- framework ---------- */}
        <section className={styles.section}>
          <div className={styles.intro}>
            <h2 className={styles.eyebrowDark}>The Framework</h2>
            <p className={styles.lede}>
              Every screen in DS Analytics answers one question. Together
              they&rsquo;re the full health check, from whether anyone&rsquo;s
              using the system at all, to whether they&rsquo;d vouch for it.
            </p>
          </div>

          <div className={styles.pillarGrid}>
            {PILLARS.map(({ num, title, question, body, metrics }) => (
              <div className={styles.pillarCard} key={title}>
                <span className={styles.pillarNum}>{num}</span>
                <h3 className={styles.pillarTitle}>{title}</h3>
                <p className={styles.pillarQuestion}>{question}</p>
                <p className={styles.pillarBody}>{body}</p>
                <ul className={styles.pillarMetrics}>
                  {metrics.map((metric) => (
                    <li key={metric}>{metric}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- claude design tries (bleed) ---------- */}
        <section className={`${styles.bleed} ${styles.claudeTries}`}>
          <div className={styles.claudeTriesInner}>
            <h2 className={styles.claudeTriesTitle}>
              Claude&rsquo;s First Crack at Adoption
            </h2>

            <div className={styles.claudeTriesRow}>
              {CLAUDE_TRIES.map(({ src, w, h }) => (
                <div
                  className={styles.claudeTriesShot}
                  key={src}
                  style={{ aspectRatio: `${w} / ${h}` }}
                >
                  <Image
                    src={`${A}/${src}`}
                    alt="Early design exploration for the Adoption Rate screen"
                    fill
                    sizes="(min-width: 1280px) 550px, 70vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- product screens ---------- */}
        <section className={styles.section}>
          <div className={styles.intro}>
            <h2 className={styles.eyebrowDark}>Inside the Dashboard</h2>
          </div>

          <div className={styles.screenBlock}>
            <MacbookMockup
              className={styles.screenMac}
              alt="DS Analytics — Adoption Rate screen"
              src={`${A}/screen-adoption.png`}
            />
            <div className={styles.screenCaption}>
              <h3 className={styles.screenTitle}>Adoption Rate</h3>
              <p className={styles.screenBody}>
                The front door: a trend line for adoption over time, a split
                between design-system and custom components, and a
                searchable table ranking every component by how hard the
                product actually leans on it.
              </p>
            </div>
          </div>

          <div className={`${styles.screenBlock} ${styles.screenBlockReverse}`}>
            <MacbookMockup
              className={styles.screenMac}
              alt="DS Analytics — Usage Quality screen"
              src={`${A}/screen-usage-quality.png`}
            />
            <div className={styles.screenCaption}>
              <h3 className={styles.screenTitle}>Usage Quality</h3>
              <p className={styles.screenBody}>
                Catches the failures that still pass code review:
                components that technically ship the right name but
                quietly override the spacing, sizing, or color the
                design system actually specified.
              </p>
            </div>
          </div>

          <div className={styles.screenBlock}>
            <MacbookMockup
              className={styles.screenMac}
              alt="DS Analytics — Design Consistency screen"
              src={`${A}/screen-design-consistency.png`}
            />
            <div className={styles.screenCaption}>
              <h3 className={styles.screenTitle}>Design Consistency</h3>
              <p className={styles.screenBody}>
                Storybook is where the names actually drift. The same
                component Figma and the code both call &ldquo;Dialog&rdquo;
                ships there as &ldquo;dialog-modal,&rdquo; and
                &ldquo;Button&rdquo; becomes &ldquo;btn-primary.&rdquo;
              </p>
            </div>
          </div>

          <div className={`${styles.screenBlock} ${styles.screenBlockReverse}`}>
            <MacbookMockup
              className={styles.screenMac}
              alt="DS Analytics — Satisfaction & Trust screen"
              src={`${A}/screen-satisfaction-trust.png`}
            />
            <div className={styles.screenCaption}>
              <h3 className={styles.screenTitle}>Satisfaction &amp; Trust</h3>
              <p className={styles.screenBody}>
                Turns raw developer complaints into a queue the
                design-system team can act on, and right now the loudest
                one is the same Dialog inconsistency the Design Consistency
                screen already flagged.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- closing ---------- */}
        <section className={styles.closing}>
          <Image
            className={styles.closingMark}
            src={`${A}/logo-icon.svg`}
            alt=""
            width={32}
            height={32}
            aria-hidden
          />
          <p className={styles.closingText}>
            A design system is only as strong as its weakest shipped
            screen. DS Analytics is how BigID started checking.
          </p>
          <p className={styles.closingNote}>
            DS Analytics is a real, shipped product. Every screen on this
            page was built in code, not generated by AI.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
