import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import ScrollHint from "@/components/ScrollHint/ScrollHint";
import { projects } from "@/data/projects";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header active="Home" />

      <main className={styles.main}>
        <section className={styles.hero}>
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
          <div className={styles.worksHeader}>
            <span className={styles.worksCount}>Items: {projects.length}</span>
          </div>

          <div className={styles.worksGrid}>
            {projects.map((project, index) => (
              <ProjectCard key={project.slug} index={index} {...project} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
