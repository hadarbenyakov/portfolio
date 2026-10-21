import type { Metadata } from "next";
import Image from "next/image";
import DeviceVideo from "@/components/DeviceVideo/DeviceVideo";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProjectNav from "@/components/ProjectNav/ProjectNav";
import styles from "./page.module.css";

const A = "/projects/sound";

export const metadata: Metadata = {
  title: "Sound Playground — Hadar Ben Yaakov",
  description:
    "A Figma Community asset for people who love sound and its connection to visuals.",
};

const STEPS = [
  {
    heading: "First Step - Explore",
    body: "I used four different elements, kick, bass, drums, and lead. I created a unique animation for each sound. This way, the user can act like a DJ, turning sounds and animations on and off with a toggle. It becomes both a visual and audio experience, where the user gets to enjoy the interaction on both levels.",
    image: { src: "explore.png", w: 1280, h: 765 },
  },
  {
    heading: "Second Step - Make",
    body: "At this step, the user can build their own tool based on the kind of music they like. By following a few simple steps, they can add sounds they enjoy and tweak the animations directly in the Figma interface, creating a completely new setup and a fully personalized experience.Each sound element, kick, bass, drums, and lead is paired with a visual response, so any change in sound can be reflected visually as well.",
    image: { src: "make.png", w: 1280, h: 1009 },
  },
];

export default function SoundPlaygroundPage() {
  return (
    <div className={styles.page}>
      <Header active="Works" />

      <ProjectNav slug="sound-playground" />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.deviceFrame}>
            <DeviceVideo src={`${A}/hero.mp4`} label="Sound Playground in Figma" />
          </div>
          <h1 className={styles.title}>Sound Playground</h1>
          <p className={styles.subtitle}>
            This is a Figma Community asset for for people who love sound and its connection to
            visuals. It&rsquo;s a space to play and explore the relationship between the two.
          </p>
        </section>

        <section className={styles.textBlock}>
          <div className={styles.block}>
            <h2 className={styles.heading}>Why ?</h2>
            <p className={styles.body}>
              The connection between visuals and sound has always fascinated me. When I was given
              an assignment to create an asset in Figma for people to experience within the
              interface, it was clear to me that I wanted to try and combine the two.
            </p>
          </div>
        </section>

        {STEPS.map(({ heading, body, image }) => (
          <div key={heading}>
            <div
              className={styles.figure}
              style={{ aspectRatio: `${image.w} / ${image.h}` }}
            >
              <Image
                src={`${A}/${image.src}`}
                alt={heading}
                fill
                sizes="(min-width: 1280px) 1280px, 100vw"
              />
            </div>
            <section className={styles.textBlockTight}>
              <div className={styles.block}>
                <h2 className={styles.heading}>{heading}</h2>
                <p className={styles.body}>{body}</p>
              </div>
            </section>
          </div>
        ))}

        <div className={styles.showcase}>
          <DeviceVideo src={`${A}/showcase.mp4`} label="Sound Playground walkthrough" />
        </div>

        <section className={styles.quote}>
          <p className={styles.quoteText}>
            A playful place to explore the connection between sound and visuals, inviting users to
            explore, experiment, and create their own personalized sound playground.
          </p>
        </section>

        <section className={styles.cta}>
          <button className={styles.ctaButton} type="button">
            Check It Out
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
}
