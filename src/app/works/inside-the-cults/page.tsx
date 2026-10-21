import type { Metadata } from "next";
import Image from "next/image";
import DeviceVideo from "@/components/DeviceVideo/DeviceVideo";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProjectNav from "@/components/ProjectNav/ProjectNav";
import styles from "./page.module.css";

const A = "/projects/cults";

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
    title: "Deeper Dive into the Cult",
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
              <h1 className={styles.title}>Inside The Cults</h1>
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

        <section className={styles.prose}>
          <p className={styles.body}>
            An experiential platform created as part of an Emotional Design
            course.
            <br />
            The project explores the psychological and emotional mechanisms
            behind cult dynamics, translating in depth research into an
            immersive digital narrative.
          </p>

          <div className={styles.block}>
            <h2 className={styles.heading}>Research</h2>
            <p className={styles.body}>
              I began this project with in-depth research into cults, exploring
              a wide range of types and structures. As I read and analyzed
              different cases, it became clear that each cult has its own
              distinct character and internal logic.
            </p>
          </div>
        </section>

        <section className={styles.researchShots}>
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
                  sizes="(min-width: 1280px) 349px, 33vw"
                />
              </div>
            </div>
          ))}
        </section>

        <section className={styles.visual}>
          <div className={`${styles.block} ${styles.visualIntro}`}>
            <h2 className={styles.heading}>Visual Language</h2>
            <p className={styles.body}>
              The visual language is built around pixelation as both a graphic
              system and a conceptual framework. By deconstructing portraits of
              cult leaders into individual pixels, the design exposes the gap
              between the constructed image and the person behind it, a leader
              whose presence exists only through the collective belief of
              followers. This principle guided every design decision, from the
              typography and layout to the interaction model, creating a
              cohesive visual system where form and meaning are inseparable.
            </p>
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

          <div className={styles.overview}>
            <DeviceVideo
              src={`${A}/overview.mp4`}
              label="Platform overview recording"
            />
          </div>
        </section>

        <section className={styles.statement}>
          <p className={styles.statementText}>
            This platform invites you to dive into the hidden world of cults.
          </p>
        </section>

        <section className={styles.walkthrough}>
          {WALKTHROUGH.map(({ file, title, body }) => (
            <div className={styles.walkStep} key={file}>
              <div className={styles.walkPhone}>
                <DeviceVideo
                  src={`${A}/${file}`}
                  label={`${title} recording`}
                />
              </div>
              <div className={styles.walkCaption}>
                <h3 className={styles.walkTitle}>{title}</h3>
                <p className={styles.walkBody}>{body}</p>
              </div>
            </div>
          ))}
        </section>

        <a
          className={styles.diveIn}
          href={DIVE_IN_PROTOTYPE}
          target="_blank"
          rel="noopener noreferrer"
        >
          Dive In
        </a>

        <section className={`${styles.automation} ${styles.bleed}`}>
          <div className={styles.automationInner}>
            <div className={`${styles.block} ${styles.automationIntro}`}>
              <h2 className={styles.automationHeading}>Can I Just AI This?</h2>
              <div className={`${styles.body} ${styles.automationBody}`}>
                <p>
                  As I built the site, I felt there was one task that come back
                  again and again: taking images, cropping them to the right
                  dimensions, compressing, saving in different formats.
                </p>
                <p>
                  So instead of doing it manually every time, I built a small
                  automation in Webflow using AI image processing. Now when I
                  need to add visuals to the site, the heavy lifting happens
                  automatically.
                </p>
              </div>
            </div>

            <div className={styles.automationShot}>
              <Image
                src={`${A}/ai-automation.png`}
                alt="AI image automation in Webflow"
                fill
                sizes="(min-width: 1280px) 1060px, 100vw"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
