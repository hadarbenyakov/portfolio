import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Orbit } from "next/font/google";
import Image from "next/image";
import DeviceVideo from "@/components/DeviceVideo/DeviceVideo";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProjectNav from "@/components/ProjectNav/ProjectNav";
import SplitStory from "@/components/SplitStory/SplitStory";
import styles from "./page.module.css";

const A = "/projects/cults";

/* Orbit is the project's tertiary face (free on Google Fonts); the two
   commercial display faces are shown as rendered specimen images instead
   of being shipped as web fonts. */
const orbit = Orbit({ weight: "400", subsets: ["latin"] });

const PALETTE = ["#F80000", "#000000", "#FFFFFF"];

/* Block sizes (px) for the title's pixelate-in, coarse → fine */
const PIXEL_STEPS = [28, 18, 11, 6, 3];

const STATEMENT = "This platform invites you to dive into the hidden world of cults.";

export const metadata: Metadata = {
  title: "Inside The Cults — Hadar Ben Yaakov",
  description:
    "An experiential platform that invites users to dive into the hidden world of cults.",
};

const WEB_PROTOTYPE =
  "https://www.figma.com/proto/0aW58oYpIjovZMcGCWXUnR/Hadar-Ben-Yaakov-Definer?page-id=1258%3A3069&node-id=1258-3135&viewport=3973%2C2668%2C0.2&t=V4eNBOskjpPwehOS-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1258%3A3071";

const DIVE_IN_PROTOTYPE =
  "https://www.figma.com/proto/0aW58oYpIjovZMcGCWXUnR/Hadar-Ben-Yaakov-Definer?page-id=910%3A45310&node-id=1103-28005&viewport=7539%2C-22579%2C0.4&t=oVRP7CPVAvfpau7V-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1118%3A29838";

/** Figma crops these three research captures inside narrower frames. */
const RESEARCH_SHOTS = [
  { src: "research-1.png", w: 339, h: 324, crop: {} },
  {
    src: "research-2.png",
    w: 347,
    h: 324,
    crop: { left: "-3.61%", width: "103.61%", height: "108.1%" },
  },
  {
    src: "research-3.png",
    w: 349,
    h: 323,
    crop: {
      left: "-3.38%",
      top: "-2.94%",
      width: "106.22%",
      height: "102.94%",
    },
  },
];

const PORTRAITS = [
  { png: "chinies.png", svg: "chinies.svg", label: "Cult leader portrait" },
  { png: "osho.png", svg: "osho.svg", label: "Osho portrait" },
  { png: "god.png", svg: "oldguy.svg", label: "Roch portrait" },
];

const WALKTHROUGH = [
  {
    file: "phone-home.mp4",
    title: "Home Screen",
    body: "Navigate between different types of cults, experience the transformation of the cult leader, and find general information about the site.",
  },
  {
    file: "phone-selection.mp4",
    title: "Cult Leader Selection",
    body: "The platform will lead you into the pixelated image. From here, you can choose whether to dive deeper or stay on the outside.",
  },
  {
    file: "phone-deep-dive.mp4",
    title: "Deeper Dive",
    body: "Uncover the cult itself, its members, and detailed information about life inside it, including years of activity, beliefs, and stages of control and more.",
  },
];

export default function InsideTheCultsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <Header active="Works" />
        <ProjectNav slug="inside-the-cults" />
      </div>

      <main className={styles.main}>
        <section className={`${styles.hero} ${styles.bleed}`}>
          <div className={styles.heroInner}>
            <div className={styles.heroHeading}>
              {/* SVG pixelate filters: each samples one point per block and fills
                  the block with it. The title steps through them, coarse to
                  fine, echoing the project's pixelated portraits. */}
              <svg className={styles.pixelDefs} aria-hidden focusable="false">
                {PIXEL_STEPS.map((b) => (
                  <filter
                    key={b}
                    id={`cults-px-${b}`}
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood x={b / 2} y={b / 2} width="1" height="1" />
                    <feComposite width={b} height={b} />
                    <feTile result="grid" />
                    <feComposite in="SourceGraphic" in2="grid" operator="in" />
                    <feMorphology operator="dilate" radius={b / 2} />
                  </filter>
                ))}
              </svg>
              <h1 className={`${styles.title} ${styles.titlePixelate}`}>Inside The Cults</h1>
              <p className={styles.tagline}>
                An experiential platform that invites users to dive into the
                hidden world of cults.
              </p>
            </div>

            <div className={styles.heroMedia}>
              <DeviceVideo
                src={`${A}/hero.mp4`}
                label="Inside The Cults web prototype recording"
              />
            </div>

            <a
              className={styles.prototypeLink}
              href={WEB_PROTOTYPE}
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Prototype
            </a>
          </div>
        </section>

        <SplitStory
          steps={[
            {
              id: "about",
              content: (
                <>
                  <h2 className={styles.heading}>About</h2>
                  <p className={styles.body}>
                    The project explores the psychological and emotional
                    mechanisms behind cult dynamics, translating in depth
                    research into an immersive digital narrative.
                  </p>
                </>
              ),
              media: (
                <div className={styles.frameWide}>
                  <DeviceVideo src={`${A}/overview.mp4`} label="Platform overview recording" />
                </div>
              ),
            },
            {
              id: "research",
              content: (
                <>
                  <h2 className={styles.heading}>Research</h2>
                  <p className={styles.body}>
                    I began this project with in-depth research into cults,
                    exploring a wide range of types and structures. As I read
                    and analyzed different cases, it became clear that each
                    cult has its own distinct character and internal logic.
                  </p>
                </>
              ),
              media: (
                <div className={styles.researchShots}>
                  {RESEARCH_SHOTS.map(({ src, w, h, crop }, i) => (
                    <div
                      className={styles.shot}
                      key={src}
                      style={{ flex: `${w} 1 0`, aspectRatio: `${w} / ${h}` }}
                    >
                      <div
                        className={styles.cropInner}
                        style={{
                          left: crop.left ?? 0,
                          top: crop.top ?? 0,
                          width: crop.width ?? "100%",
                          height: crop.height ?? "100%",
                        }}
                      >
                        <Image
                          src={`${A}/${src}`}
                          alt={`Cult research reference ${i + 1}`}
                          fill
                          sizes="(min-width: 768px) 240px, 33vw"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />

        {/* Long copy takes the whole screen, then the split resumes */}
        <section className={`${styles.takeover} ${styles.bleed}`}>
          <div className={styles.takeoverInner}>
            <h2 className={`${styles.takeoverHeading} reveal-heading`}>Visual Language</h2>
            <p className={`${styles.takeoverText} reveal`}>
              The visual language is built around pixelation as both a graphic
              system and a conceptual framework. By deconstructing portraits of
              cult leaders into individual pixels, the design exposes the gap
              between the constructed image and the person behind it, a leader
              whose presence exists only through the collective belief of
              followers.
            </p>

            {/* The project's style sheet: palette + typefaces */}
            <div className={`${styles.styleGuide} reveal`}>
              <div className={styles.guideCol}>
                <h3 className={styles.guideLabel}>Colors</h3>
                <ul className={styles.swatches}>
                  {PALETTE.map((hex, i) => (
                    <li
                      className={styles.swatchRow}
                      key={hex}
                      style={{ "--i": i } as CSSProperties}
                    >
                      <span className={styles.swatch} style={{ background: hex }} aria-hidden />
                      <span>{hex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.guideCol}>
                <h3 className={styles.guideLabel}>Fonts</h3>
                <Image
                  className={styles.fontAmbivalenti}
                  src={`${A}/font-ambivalenti-ink.png`}
                  alt="Ambivalenti"
                  width={2014}
                  height={140}
                  sizes="(min-width: 768px) 520px, 90vw"
                />
                <Image
                  className={styles.fontArbel}
                  src={`${A}/font-arbel-hagilda-ink.png`}
                  alt="Arbel Hagilda"
                  width={970}
                  height={132}
                  sizes="260px"
                />
                <span className={`${styles.fontOrbit} ${orbit.className}`}>Orbit</span>
              </div>
            </div>

            <div className={styles.portraits}>
              {PORTRAITS.map(({ png, svg, label }) => (
                <div className={styles.portrait} key={png}>
                  <Image
                    className={styles.portraitPhoto}
                    src={`${A}/${png}`}
                    alt={label}
                    fill
                    sizes="280px"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.portraitSvg}
                    src={`${A}/${svg}`}
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>

            <p className={styles.portraitHint}>
              <span className={styles.hintHover}>
                Hover over the portraits to reveal the pixels behind them
              </span>
              <span className={styles.hintTap}>
                Tap the portraits to reveal the pixels behind them
              </span>
            </p>
          </div>
        </section>

        <section className={`${styles.statement} ${styles.bleed}`}>
          {/* Each word rises in turn as the red screen scrolls into view */}
          <p className={styles.statementText}>
            {STATEMENT.split(" ").map((word, i) => (
              <span
                key={i}
                className={styles.statementWord}
                style={{ "--i": i } as CSSProperties}
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </section>

        <SplitStory
          steps={WALKTHROUGH.map(({ file, title, body }, i) => ({
            id: file,
            content: (
              <>
                <h3 className={styles.heading}>{title}</h3>
                <p className={styles.body}>{body}</p>
                {i === WALKTHROUGH.length - 1 && (
                  <a
                    className={styles.diveIn}
                    href={DIVE_IN_PROTOTYPE}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dive In
                  </a>
                )}
              </>
            ),
            media: (
              <div className={styles.framePhone}>
                <DeviceVideo src={`${A}/${file}`} label={`${title} recording`} />
              </div>
            ),
          }))}
        />

        <section className={`${styles.automation} ${styles.bleed}`}>
          <SplitStory
            runOut={false}
            steps={[
              {
                id: "automation",
                content: (
                  <>
                    <h2 className={styles.automationHeading}>Can I Just AI This?</h2>
                    <div className={`${styles.body} ${styles.automationBody}`}>
                      <p>
                        As I built the site, I felt there was one task that
                        come back again and again: taking images, cropping
                        them to the right dimensions, compressing, saving in
                        different formats.
                      </p>
                      <p>
                        So instead of doing it manually every time, I built a
                        small automation in Webflow using AI image processing.
                        Now when I need to add visuals to the site, the heavy
                        lifting happens automatically.
                      </p>
                    </div>
                  </>
                ),
                media: (
                  <div className={styles.frameShot}>
                    <Image
                      src={`${A}/ai-automation.png`}
                      alt="AI image automation in Webflow"
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                    />
                  </div>
                ),
              },
            ]}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
