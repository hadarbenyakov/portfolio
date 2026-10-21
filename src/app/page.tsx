import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import HeroImageCarousel from "@/components/HeroImageCarousel/HeroImageCarousel";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import ScrollHint from "@/components/ScrollHint/ScrollHint";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

/** A shot pulled from inside each case study, cycled in the hero. */
const HERO_IMAGES = [
  { src: "/projects/bigid/screen-overview.png", alt: "BigID" },
  { src: "/projects/bigid/hero-intro.png", alt: "BigID" },
  { src: "/projects/cults/god.png", alt: "Inside The Cults" },
  { src: "/projects/sound/make.png", alt: "Sound Playground" },
  { src: "/projects/mycora/hero-dashboard.png", alt: "Mycora" },
  { src: "/projects/mycora/hero-map.png", alt: "Mycora" },
  { src: "/projects/xchange/hero-card.png", alt: "Xchange" },
];

export default function Home() {
  return (
    <>
      <Header active="Home" />

      <main className={styles.main}>
        <section className={styles.hero}>
          <HeroImageCarousel images={HERO_IMAGES} />

          <h1 className={styles.title}>
            <span className={`${styles.line} ${styles.line1}`}>HEY, I&rsquo;M</span>
            <span className={`${styles.line} ${styles.line2}`}>HADAR</span>
            <span className={`${styles.line} ${styles.line3}`}>BEN YAAKOV</span>
          </h1>

          <div className={styles.heroMeta}>
            <p className={styles.tagline}>PRODUCT DESIGNER BASED IN TEL AVIV</p>
            <ScrollHint className={styles.scrollHint} />
          </div>
        </section>

        <section className={styles.works} id="works">
          {projects.map((project) => (
            <ProjectCard key={project.slug} {...project} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
