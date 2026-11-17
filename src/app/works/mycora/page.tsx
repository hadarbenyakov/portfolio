import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import MacbookMockup from "@/components/MacbookMockup/MacbookMockup";
import ProjectNav from "@/components/ProjectNav/ProjectNav";
import DeviceVideo from "@/components/DeviceVideo/DeviceVideo";
import CroppedImage from "./CroppedImage";
import styles from "./page.module.css";

const A = "/projects/mycora";

/** Cycles the global reveal-N stagger delays across a mapped list. */
const REVEAL_STAGGER = ["", "reveal-1", "reveal-2"];

export const metadata: Metadata = {
  title: "Mycora — Hadar Ben Yaakov",
  description:
    "A platform for managing truffle cultivation. Connecting growers and hunters through transparency and real-time data.",
};

const PROTOTYPE_OWNER =
  "https://www.figma.com/proto/BCAvgf4k3Ey7ZJK3x0QvmQ/Truffles--Copy-?page-id=0%3A1&node-id=352-8520&viewport=-3641%2C-3540%2C0.21&t=FE5iMdnmplfs13PT-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=352%3A8520&show-proto-sidebar=1";

const LIFECYCLE = [
  {
    img: "life-growth.png",
    title: "Growth",
    body: "Truffles develop underground near tree roots.",
  },
  {
    img: "life-growth-overlay.png",
    title: "Expert Foraging",
    body: "Hunters with trained dogs search forests to locate the rare truffle",
  },
  {
    img: "life-landowner.png",
    title: "Landowner Acquisition",
    body: "The property owner receives the harvested truffles.",
  },
  {
    img: "life-transport.png",
    title: "Controlled Transport",
    body: "Truffles are kept cool during transport.",
  },
  {
    img: "life-restaurant.png",
    title: "Restaurant Preparation",
    body: "Customers enjoy truffles shaved over their dishes.",
  },
];

const UX_ROWS = [
  {
    logo: "ux-logo-1.png",
    shot: "ux-shot-a.png",
    w: 706,
    h: 550,
    crop: { left: "-22.27%", width: "242.19%", height: "100.1%" },
  },
  {
    logo: "ux-logo-2.png",
    shot: "ux-shot-a.png",
    w: 687,
    h: 492,
    crop: { left: "-122.62%", width: "222.62%", height: "100.1%" },
  },
  {
    logo: "ux-logo-3.png",
    shot: "ux-shot-b.png",
    w: 905,
    h: 461,
    crop: { left: "-10.42%", width: "110.42%", height: "99.99%" },
  },
  {
    logo: "ux-logo-3.png",
    shot: "ux-shot-c.png",
    w: 805,
    h: 400,
    crop: { left: "-20.29%", top: "0.08%", width: "120.29%", height: "99.92%" },
  },
  {
    logo: "ux-logo-4.png",
    shot: "ux-shot-d.png",
    w: 771,
    h: 638,
    crop: {
      left: "-24.27%",
      top: "-0.04%",
      width: "174.86%",
      height: "99.87%",
    },
  },
];

const OWNER_FEATURES = [
  { title: "Dashboard", body: "Predicted and realtime status of the orchard" },
  { title: "Status by Block", body: "Yield, prediction & hunters status" },
  {
    title: "Inventory and Sales",
    body: "View, sell and learn about truffle findings",
  },
  {
    title: "Insights Management",
    body: "Get instant alerts via ph and hydration sensors, optimize harvesting session",
  },
];

/** Paired 1:1 with OWNER_FEATURES by index, so each sketch moves together
 *  with its own caption at every breakpoint instead of two rows that can
 *  drift apart once they reflow independently. */
const OWNER_SKETCHES = [
  { src: "oo-sketch-1.png", width: 162, height: 207, rotated: true },
  { src: "oo-sketch-2.png", width: 225, height: 152 },
  { src: "oo-sketch-3.png", width: 166, height: 219.8, rotated: true },
  { src: "oo-sketch-4.png", width: 227, height: 155 },
];

const OWNER_SCREENS = [
  {
    title: "Dashboard+Insights Management",
    body: "Predicted and realtime status of the orchard, Get instant alerts ,optimize harvesting session",
    video: "owner-dashboard.mp4",
  },
  {
    title: "Status by Block",
    body: "Yield, prediction & hunters status",
    video: "owner-status-by-block.mp4",
  },
  {
    title: "Inventory and Sales",
    body: "View, sell and learn about truffle findings",
    video: "owner-inventory.mp4",
  },
];

const HUNTER_FEATURES = [
  {
    title: "Est. Income & Findings",
    body: "No surprises when it comes to salary",
  },
  {
    title: "Curated Routes",
    body: "A detailed plan of stops for the hunting day",
  },
  { title: "Navigator", body: "Optimizes routing system" },
  { title: "Log Weight", body: "Report exactly what you found" },
  { title: "Change Routs", body: "for higher success odds" },
  { title: "Summary", body: "earnings and findings" },
];

/** Paired 1:1 with HUNTER_FEATURES by index — same reasoning as
 *  OWNER_SKETCHES above. */
const HUNTER_SKETCHES = [
  {
    src: "hunter-sketch-a.png",
    width: 209,
    height: 106.756,
    crop: { left: "-9.13%", width: "109.13%", height: "283.93%" },
    rotated: true,
  },
  {
    src: "hunter-sketch-b.png",
    width: 150,
    height: 209,
    crop: { height: "105.84%" },
  },
  {
    src: "hunter-sketch-c.png",
    width: 150,
    height: 210,
    crop: { height: "106.37%" },
  },
  {
    src: "hunter-sketch-a.png",
    width: 215,
    height: 121.181,
    crop: {
      left: "-20.42%",
      top: "-190.19%",
      width: "120.42%",
      height: "283.93%",
    },
    rotated: true,
  },
  {
    src: "hunter-sketch-d.png",
    width: 215,
    height: 127.621,
    crop: { left: "-38.42%", width: "138.42%", height: "311.33%" },
    rotated: true,
  },
  {
    src: "hunter-sketch-d.png",
    width: 215,
    height: 105.488,
    crop: {
      left: "-14.41%",
      top: "-104.72%",
      width: "114.41%",
      height: "311.33%",
    },
    rotated: true,
  },
];

function RoleHeading({ name, kind }: { name: string; kind: string }) {
  return (
    <div className={styles.roleHeading}>
      <p className={`${styles.roleName} reveal-heading`}>{name}</p>
      <p className={styles.roleKind}>{kind}</p>
    </div>
  );
}

export default function MycoraPage() {
  return (
    <div className={styles.page}>
      <Header active="Works" />

      <ProjectNav slug="mycora" />

      <main className={styles.main}>
        <h1 className={`${styles.heroTitle} hero-title-in`}>Mycora</h1>

        <div className={styles.heroMedia}>
          <MacbookMockup
            className={styles.heroMac}
            src={`${A}/mac-overlay.png`}
            alt="Mycora orchard owner dashboard"
            sizes="(min-width: 1280px) 727px, 100vw"
          />
          <div className={styles.heroPhone}>
            <Image
              className={styles.heroPhoneImage}
              src={`${A}/hero-phone.png`}
              alt="Mycora hunter app"
              fill
              sizes="233px"
            />
          </div>
        </div>

        <p className={styles.tagline}>
          A platform for managing truffle cultivation
          <br />
          Connecting growers and hunters through transparency and real-time
          data.
        </p>

        {/* ---------- Research ---------- */}
        <section className={`${styles.research} reveal`}>
          <div className={styles.intro}>
            <h2 className={`${styles.eyebrow} reveal-heading`}>Research</h2>
            <p className={styles.lede}>
              The research began by mapping the full lifecycle of a truffle.
              From the moment it begins growing underground, through the hunt
              and harvest, to the point it reaches a plate.
            </p>
          </div>

          <ol className={styles.lifecycle}>
            {LIFECYCLE.map(({ img, title, body }, i) => (
              <li
                className={`${styles.step} reveal-scale ${REVEAL_STAGGER[i % REVEAL_STAGGER.length]}`}
                key={title}
              >
                <div className={styles.stepImage}>
                  <Image
                    src={`${A}/${img}`}
                    alt={title}
                    fill
                    sizes="(min-width: 1280px) 202px, (min-width: 768px) 33vw, 100vw"
                  />
                </div>
                <div className={styles.stepText}>
                  <h3 className={styles.stepTitle}>{title}</h3>
                  <p className={styles.stepBody}>{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------- Focus area ---------- */}
        <section className={`${styles.focus} reveal`}>
          <div className={`${styles.intro} ${styles.introCentered}`}>
            <h2 className={`${styles.eyebrow} ${styles.eyebrowBold} reveal-heading`}>
              Focus Area - Optimizing the Workflow
            </h2>
            <p className={styles.lede}>
              Truffle cultivators aim to increase harvest yields Yet they face
              uncertainty conditions that impact truffle growth beneath the
              surface.
            </p>
          </div>

          <div className={styles.diagram}>
            <div
              className={`${styles.diagramColumn} ${styles.diagramSide} ${styles.persona} reveal-left`}
            >
              <div className={styles.personaImage}>
                <Image
                  src={`${A}/life-growth.png`}
                  alt="Hunter"
                  fill
                  sizes="323px"
                />
              </div>
              <p className={styles.personaName}>Hunter</p>
            </div>

            <div
              className={`${styles.diagramColumn} ${styles.diagramCentre} reveal-scale reveal-1`}
            >
              <div className={styles.frictionCard}>
                <div className={styles.frictionInner}>
                  <p className={styles.frictionTitle}>Friction</p>
                  <div className={styles.frictionList}>
                    <p>
                      Financial and Yield
                      <br />
                      Uncertainty
                    </p>
                    <p>The Trust Gap</p>
                  </div>
                </div>
              </div>
              <div className={styles.diagramArrow} aria-hidden />
            </div>

            <div
              className={`${styles.diagramColumn} ${styles.diagramSide} ${styles.persona} reveal-right`}
            >
              <div className={styles.personaImage}>
                <Image
                  src={`${A}/life-landowner.png`}
                  alt="Orchard Owner"
                  fill
                  sizes="317px"
                />
              </div>
              <p className={styles.personaName}>Orchard Owner</p>
            </div>
          </div>
        </section>

        {/* ---------- HMW ---------- */}
        <section className={`${styles.statement} reveal`}>
          <p className={styles.statementText}>
            HMW create more certainty around truffle growth and hunting process?
          </p>
        </section>

        {/* ---------- UX/UI research ---------- */}
        <section className={`${styles.uxResearch} reveal`}>
          <div className={`${styles.intro} ${styles.uxIntro}`}>
            <h2 className={`${styles.eyebrow} reveal-heading`}>UX UI Research</h2>
            <p className={styles.lede}>
              As part of this project, I conducted extensive UX/UI research
              across a range of apps and websites, identifying key values and
              patterns that informed the design of my own platform. These
              insights helped shape a more thoughtful, user-centered experience
              grounded in both inspiration and critical analysis.
            </p>
          </div>

          {UX_ROWS.map(({ logo, shot, w, h, crop }, i) => (
            <div className={styles.uxRow} key={i}>
              <div className={styles.uxLogo}>
                <Image src={`${A}/${logo}`} alt="" fill sizes="54px" />
              </div>
              <div
                className={styles.uxShot}
                style={{ aspectRatio: `${w} / ${h}`, maxWidth: w }}
              >
                <div
                  className={styles.cropInner}
                  style={{
                    left: crop.left,
                    top: crop.top ?? 0,
                    width: crop.width,
                    height: crop.height,
                  }}
                >
                  <Image
                    src={`${A}/${shot}`}
                    alt={`UX research reference ${i + 1}`}
                    fill
                    sizes={`(min-width: 1280px) ${Math.round(
                      w * (parseFloat(crop.width) / 100),
                    )}px, ${Math.round(parseFloat(crop.width))}vw`}
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ---------- Orchard Owner sketches ---------- */}
        <section className={`${styles.sketches} reveal`}>
          <RoleHeading name="Orchard Owner" kind="sketches" />

          <div className={styles.pairGrid}>
            {OWNER_FEATURES.map(({ title, body }, i) => {
              const sketch = OWNER_SKETCHES[i];
              return (
                <div
                  className={`${styles.pairCard} reveal ${REVEAL_STAGGER[i % REVEAL_STAGGER.length]}`}
                  key={title}
                >
                  <CroppedImage
                    src={`${A}/${sketch.src}`}
                    alt=""
                    width={sketch.width}
                    height={sketch.height}
                    rotated={sketch.rotated}
                  />
                  <h3 className={styles.featureTitle}>{title}</h3>
                  <p className={styles.featureBody}>{body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- Orchard Owner screens ---------- */}
        <section className={`${styles.screens} reveal`}>
          <RoleHeading name="Orchard Owner" kind="Screens" />

          <div className={styles.screenStack}>
            {OWNER_SCREENS.map(({ title, body, video }, i) => (
              <div
                className={`${styles.screenBlock} reveal-scale ${REVEAL_STAGGER[i % REVEAL_STAGGER.length]}`}
                key={title}
              >
                <MacbookMockup
                  alt={title}
                  video={`${A}/${video}`}
                  videoFit="contain"
                />
                <div className={styles.screenCaption}>
                  <h3 className={styles.featureTitle}>{title}</h3>
                  <p className={styles.featureBody}>{body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.screenBlock}>
            <div className={styles.phone}>
              <DeviceVideo
                src={`${A}/owner-daily-summary.mp4`}
                label="Daily Summary recording"
              />
            </div>
            <div className={styles.screenCaption}>
              <h3 className={styles.featureTitle}>Daily Summary</h3>
              <p className={styles.featureBody}>
                An end of day review of accomplishments and challenges,
                identifying improvements to apply tomorrow.
              </p>
            </div>
          </div>

          <a
            className={styles.prototypeLink}
            href={PROTOTYPE_OWNER}
            target="_blank"
            rel="noopener noreferrer"
          >
            Orchard Owner Prototype
          </a>
        </section>

        {/* ---------- Hunter sketches ---------- */}
        <section className={`${styles.sketches} reveal`}>
          <RoleHeading name="Hunter" kind="sketches" />

          <div className={`${styles.pairGrid} ${styles.pairGridWide}`}>
            {HUNTER_FEATURES.map(({ title, body }, i) => {
              const sketch = HUNTER_SKETCHES[i];
              return (
                <div
                  className={`${styles.pairCard} reveal ${REVEAL_STAGGER[i % REVEAL_STAGGER.length]}`}
                  key={title}
                >
                  <CroppedImage
                    src={`${A}/${sketch.src}`}
                    alt=""
                    width={sketch.width}
                    height={sketch.height}
                    crop={sketch.crop}
                    rotated={sketch.rotated}
                  />
                  <h3
                    className={`${styles.featureTitle} ${styles.featureTitleLarge}`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`${styles.featureBody} ${styles.featureBodyLight}`}
                  >
                    {body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
