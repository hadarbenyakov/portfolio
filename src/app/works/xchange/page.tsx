import type { Metadata } from "next";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import DeviceVideo from "@/components/DeviceVideo/DeviceVideo";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProjectNav from "@/components/ProjectNav/ProjectNav";
import styles from "./page.module.css";

/* The app runs on Plus Jakarta Sans; three section labels and the closing
   link use Inter instead — both exactly as authored in Figma (get_design_context
   on node 1426:2254, "Desktop"). Loaded locally to this page so the rest of
   the site keeps its own type. */
const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-pjs",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const A = "/projects/xchange";

export const metadata: Metadata = {
  title: "Xchange — Hadar Ben Yaakov",
  description:
    "Track and manage your resources, negotiate with the people around you, and navigate to complete exchanges in person — Xchange for a world without sunlight.",
};

const USER_FLOW_SITE = "https://malt-aloft-65733068.figma.site/";

/* The flow chart in the Figma file was a leftover from an earlier project
   template (a cat-behavior app's diagram), not Xchange's own. This is the
   real one, walked step by step: fuel reads low on Track, a request gets
   filled in from the My Exchanges drawer, Negotiate turns up a match, an
   offer goes out, and — once it's accepted — Navigate closes the loop with
   fuel back on Track. */
const FLOW_NODES = [
  {
    title: "Track",
    body: "Fuel reads 12%, about an hour left, right there on the dashboard.",
  },
  {
    title: "New Request",
    body: "Open My Exchanges and start a request: pick the resource, and how much you need.",
  },
  {
    title: "Negotiate",
    body: "Browse nearby offers, sorted by distance, until something matches.",
  },
  {
    title: "Offer Details",
    body: "Pick the neighbor whose offer actually fits.",
  },
];

const NEGOTIATE_NODE = {
  title: "Send Offer",
  body: "Offer something back, and send it.",
};

const AFTER_NODES = [
  {
    title: "Request Accepted",
    body: "The neighbor says yes, it's confirmed.",
  },
  {
    title: "Navigate",
    body: "Follow the route and meet them to make the trade.",
  },
];

const PILLS = [
  { label: "Manage", left: 186, top: 476 },
  { label: "Negotiate", left: 106, top: 571 },
  { label: "Exchange", left: 744, top: 532 },
  { label: "Navigate", left: 782, top: 637 },
] as const;

/* Real Mobbin exports, cropped to drop Mobbin's own "curated by" footer (the
   crop line was measured pixel-for-pixel against several frames — constant
   across apps since Mobbin exports at a fixed canvas size). */
const MOBBIN_SHOT_RATIO = 1179 / 2458;

const RESEARCH = [
  {
    app: "Revolut",
    icon: "banking-icon.jpg",
    shots: [
      "banking/flow-0.png",
      "banking/flow-1.png",
      "banking/flow-2.png",
      "banking/flow-3.png",
      "banking/flow-4.png",
      "banking/flow-5.png",
    ],
    ratio: MOBBIN_SHOT_RATIO,
  },
  {
    app: "eBay",
    icon: "bidding-icon.jpg",
    shots: [
      "bidding/flow-0.png",
      "bidding/flow-1.png",
      "bidding/flow-2.png",
      "bidding/flow-3.png",
      "bidding/flow-4.png",
      "bidding/flow-5.png",
      "bidding/flow-6.png",
      "bidding/flow-7.png",
      "bidding/flow-8.png",
    ],
    ratio: MOBBIN_SHOT_RATIO,
  },
  {
    app: "BeReal",
    icon: "social-icon.jpg",
    shots: [
      "social/flow-0.png",
      "social/flow-1.png",
      "social/flow-2.png",
      "social/flow-3.png",
      "social/flow-4.png",
    ],
    ratio: MOBBIN_SHOT_RATIO,
  },
  {
    app: "Slopes",
    icon: "navigation-icon.jpg",
    shots: [
      "navigation/flow-0.png",
      "navigation/flow-1.png",
      "navigation/flow-2.png",
      "navigation/flow-3.png",
      "navigation/flow-4.png",
    ],
    ratio: MOBBIN_SHOT_RATIO,
  },
] as const;

const MAIN_FLOW = [
  {
    file: "flow-track.mp4",
    title: "Track",
    body: "See exactly how much is left, and how long it'll last.",
  },
  {
    file: "flow-negotiate.mp4",
    title: "Negotiate",
    body: "Browse neighbors with a surplus, and counter until the deal feels fair.",
  },
  {
    file: "flow-navigate.mp4",
    title: "Navigate",
    body: "Head to your neighbor and complete the exchange in person, safely, even in the dark.",
  },
];

function pillStyle(left: number, top: number) {
  return {
    left: `${(left / 1155) * 100}%`,
    top: `${(top / 1117) * 100}%`,
  };
}

export default function XchangePage() {
  return (
    <div className={`${styles.page} ${plusJakarta.variable}`}>
      <Header active="Works" />

      <ProjectNav slug="xchange" />

      <main className={styles.main}>
        {/* ---------- hero collage ---------- */}
        <section className={styles.hero}>
          <div className={styles.heroStack}>
            <div className={styles.heroCollage}>
              <h1 className={styles.heroWatermark}>Xchange</h1>

              <div className={styles.heroPhoto}>
                <Image
                  src={`${A}/hero-photo.png`}
                  alt="A hand holding a phone showing the Xchange app, glowing in the dark"
                  fill
                  sizes="(min-width: 1280px) 940px, 80vw"
                  priority
                />
              </div>

              <p className={styles.heroTagline}>
                The sun is gone, Your resources won&rsquo;t last forever.
              </p>

              <p className={styles.heroBody}>
                Track and manage your resources, negotiate with the people
                around you and navigate to complete exchanges in person, so
                you&rsquo;re never left without the resource you need.
              </p>

              <div className={styles.heroPills}>
                {PILLS.map(({ label, left, top }) => (
                  <span
                    className={styles.pill}
                    key={label}
                    style={pillStyle(left, top)}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ---------- crisis (app dark) ---------- */}
        <section className={`${styles.bleed} ${styles.crisis}`}>
          <div className={styles.crisisInner}>
            <h2 className={styles.crisisTitle}>It&rsquo;s 2250</h2>
            <div className={styles.crisisBody}>
              <p>The sun is gone.</p>
              <p>
                Decades of climate crisis reached a point of no return, and
                in a single day, ash covered the sky. Since then, the world
                has lived in darkness. Temperatures are dropping. Resources
                are running out. And people are trying to figure out how to
                keep going.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- HMW (orange) ---------- */}
        <section className={`${styles.bleed} ${styles.system}`}>
          <div className={styles.systemInner}>
            <div className={styles.hmw}>
              {/* eslint-disable-next-line @next/next/no-img-element -- local SVG, next/image optimizer rejects SVG by default */}
              <img
                className={styles.hmwBlob}
                src={`${A}/hmw-blob.svg`}
                alt=""
                aria-hidden
              />
              <p className={styles.hmwLabel}>HMW</p>
              <p className={styles.hmwQuestion}>
                Help people in a resource-scarce world track what they need,
                find neighbors with surplus, and negotiate fair exchanges, so
                they never have to accept a bad deal or run out without
                warning.
              </p>
            </div>

            <div className={styles.resourceRow}>
              <div className={styles.resourceItem}>
                {/* eslint-disable-next-line @next/next/no-img-element -- local SVG, next/image optimizer rejects SVG by default */}
                <img
                  className={styles.resourceIcon}
                  src={`${A}/icon-fire.svg`}
                  alt=""
                  width={51}
                  height={64}
                />
                <span className={styles.resourceLabel}>Feul</span>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element -- local SVG, next/image optimizer rejects SVG by default */}
              <img
                className={styles.swapIcon}
                src={`${A}/icon-swap.svg`}
                alt=""
                width={62}
                height={54}
              />
              <div className={styles.resourceItem}>
                {/* eslint-disable-next-line @next/next/no-img-element -- local SVG, next/image optimizer rejects SVG by default */}
                <img
                  className={styles.resourceIcon}
                  src={`${A}/icon-lightning.svg`}
                  alt=""
                  width={46}
                  height={64}
                />
                <span className={styles.resourceLabel}>Power</span>
              </div>
            </div>

            <p className={styles.resourcesNote}>
              Fuel keeps a generator running. Power keeps it stored and
              moving through the grid. Together, they&rsquo;re the only thing
              standing between a dark room and a lit one, which is why
              Xchange tracks them first, and why a few liters or kilowatts
              from a neighbor can matter more than anything else you own.
            </p>
          </div>
        </section>

        {/* ---------- UX UI research ---------- */}
        <section className={`${styles.section} ${styles.uxSection}`}>
          <h2 className={`${styles.sectionTitle} ${styles.inter}`}>
            UX UI Research
          </h2>

          <div className={styles.uxRows}>
            {RESEARCH.map(({ app, icon, shots, ratio }) => (
              <div className={styles.uxRow} key={app}>
                <div className={styles.uxHeader}>
                  <div className={styles.uxLogos}>
                    <Image
                      src={`${A}/research/${icon}`}
                      alt={`${app} icon`}
                      fill
                      sizes="48px"
                    />
                  </div>
                  <p className={styles.uxAppName}>{app}</p>
                </div>

                <div className={styles.uxShotPair}>
                  {shots.map((shot, i) => (
                    <div
                      className={styles.uxShot}
                      key={shot}
                      style={{ aspectRatio: ratio }}
                    >
                      <Image
                        src={`${A}/research/${shot}`}
                        alt={`${app} screen ${i + 1}`}
                        fill
                        sizes="(min-width: 768px) 180px, 140px"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- user flow (full-bleed, app-dark) ---------- */}
        <section className={`${styles.bleed} ${styles.userFlowSection}`}>
          <div className={styles.userFlowInner}>
            <h2 className={`${styles.sectionTitle} ${styles.inter}`}>
              User Flow
            </h2>

            <div className={styles.flowchart}>
              {FLOW_NODES.map((node) => (
                <div className={styles.flowGroup} key={node.title}>
                  <div className={styles.flowBox}>
                    <p className={styles.flowBoxTitle}>{node.title}</p>
                    <p className={styles.flowBoxBody}>{node.body}</p>
                  </div>
                  <span className={styles.flowArrow} aria-hidden />
                </div>
              ))}

              {/* Negotiate → Deal Agreed? — the only real branch in the
                  flow, so it gets the loop-back arrow when the answer is
                  "no" and both sides keep countering. */}
              <div className={styles.loopWrap}>
                <div className={styles.flowBox}>
                  <p className={styles.flowBoxTitle}>{NEGOTIATE_NODE.title}</p>
                  <p className={styles.flowBoxBody}>{NEGOTIATE_NODE.body}</p>
                </div>
                <span className={styles.flowArrow} aria-hidden />
                <div className={styles.diamond}>
                  <span>Deal Agreed?</span>
                </div>

                {/* Orthogonal bracket, not a bezier — a curve gets visibly
                    warped once the SVG is stretched to fill a container
                    whose height varies with text length; straight segments
                    don't. */}
                <svg
                  className={styles.loopSvg}
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <defs>
                    <marker
                      id="xchangeLoopArrow"
                      markerWidth="7"
                      markerHeight="7"
                      refX="5.5"
                      refY="3.5"
                      orient="auto"
                    >
                      <path
                        className={styles.loopArrowhead}
                        d="M0,0 L7,3.5 L0,7 Z"
                      />
                    </marker>
                  </defs>
                  <path
                    className={styles.loopPath}
                    d="M 8 92 L 62 92 L 62 8 L 8 8"
                    markerEnd="url(#xchangeLoopArrow)"
                  />
                </svg>
                <span className={styles.noLabel}>No</span>
              </div>

              <span className={`${styles.flowArrow} ${styles.flowArrowYes}`}>
                <span className={styles.flowArrowLabel}>Yes</span>
              </span>

              {AFTER_NODES.map((node) => (
                <div className={styles.flowGroup} key={node.title}>
                  <div className={styles.flowBox}>
                    <p className={styles.flowBoxTitle}>{node.title}</p>
                    <p className={styles.flowBoxBody}>{node.body}</p>
                  </div>
                  <span className={styles.flowArrow} aria-hidden />
                </div>
              ))}

              <div className={`${styles.flowBox} ${styles.flowBoxAccent}`}>
                <p className={styles.flowBoxTitle}>Exchange Complete</p>
                <p className={styles.flowBoxBody}>
                  The trade happens, and fuel climbs back up on Track.
                </p>
              </div>
            </div>

            <p className={styles.flowCaption}>
              If it&rsquo;s not accepted, it loops back to negotiating, only
              moving to Navigate once both sides agree.
            </p>
          </div>
        </section>

        {/* ---------- main flow ---------- */}
        <section className={styles.section}>
          <h2 className={`${styles.sectionTitle} ${styles.inter}`}>
            Main Flow
          </h2>

          <div className={styles.walkthrough}>
            {MAIN_FLOW.map(({ file, title, body }) => (
              <div className={styles.walkStep} key={title}>
                <div className={styles.walkPhone}>
                  <DeviceVideo
                    src={`${A}/${file}`}
                    label={`${title} screen recording`}
                  />
                </div>
                <div className={styles.walkCaption}>
                  <h3 className={styles.walkTitle}>{title}</h3>
                  <p className={styles.walkBody}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- closing ---------- */}
        <section className={styles.closing}>
          <a
            className={`${styles.closingLink} ${styles.inter}`}
            href={USER_FLOW_SITE}
            target="_blank"
            rel="noopener noreferrer"
          >
            View the complete user flow
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}
