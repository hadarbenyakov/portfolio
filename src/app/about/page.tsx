import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About — Hadar Ben Yaakov",
  description:
    "A Visual Communication student at Shenkar College, focusing on interaction and app design.",
};

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Header active="About" />

      <main className={styles.main}>
        <section className={styles.intro}>
          <div className={styles.portrait}>
            <div className={styles.portraitInner}>
              <Image
                src="/about/portrait.jpg"
                alt="Hadar Ben Yaakov"
                fill
                sizes="(min-width: 1280px) 576px, (min-width: 768px) 55vw, 100vw"
                priority
              />
            </div>
          </div>

          <div className={styles.introText}>
            <h1 className={styles.title}>
              Hey,
              <br />
              I&rsquo;m Hadar
            </h1>
            <p className={styles.body}>
              A Visual Communication student at Shenkar College, focusing on interaction and app
              design. creating user-centered digital experiences end to end. Looking to grow as a
              Product Creator who combines design, product thinking, and code.
            </p>
          </div>
        </section>

        <section className={styles.more}>
          <h2 className={styles.moreHeading}>Just a Little More</h2>
          <div className={`${styles.body} ${styles.moreBody}`}>
            <p>
              Outside of design, I love my dog Sushi, good burgers, and travel around the country.
              I dance when I can, hike when the weather&rsquo;s right, and spend as much time as
              possible with the people I care about.
            </p>
            <p>I&rsquo;m also low-key obsessed with finding the best burger in Tel Aviv.</p>
          </div>
        </section>
      </main>

      <Footer variant="about" />
    </div>
  );
}
