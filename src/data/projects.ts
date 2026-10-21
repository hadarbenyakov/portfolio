export type Project = {
  slug: string;
  title: string;
  year: string;
  image: string;
  /** Keyword chips shown on the home card instead of a description. */
  tags?: string[];
  /** Set once the case study page exists, so cards without one stay unlinked. */
  href?: string;
};

/** Display order on the home page, and the order the project arrows follow. */
export const projects: Project[] = [
  {
    slug: "inside-the-cults",
    title: "Inside The Cults",
    year: "2025",
    image: "/projects/inside-the-cults.png",
    tags: ["UI/UX Design", "Interaction Design", "Motion"],
    href: "/works/inside-the-cults",
  },
  {
    slug: "bigid",
    title: "BigID",
    year: "2026",
    image: "/projects/bigid.png",
    tags: ["Vibe Coding", "Dashboard", "Design Systems"],
    href: "/works/bigid",
  },
  {
    slug: "xchange",
    title: "Xchange",
    year: "2026",
    image: "/projects/xchange.png",
    tags: ["Product Design", "Vibe Coding"],
    href: "/works/xchange",
  },
  {
    slug: "mycora",
    title: "Mycora",
    year: "2025",
    image: "/projects/mycora.png",
    tags: ["UX Research", "Dashboard"],
    href: "/works/mycora",
  },
  {
    slug: "sound-playground",
    title: "Sound Playground",
    year: "2024",
    image: "/projects/sound-playground.png",
    tags: ["Sound Design", "Interactive"],
    href: "/works/sound-playground",
  },
];

export type CaseStudy = Project & { href: string };

/** Only projects with a built page — what "Works" and the arrows navigate. */
export const caseStudies: CaseStudy[] = projects.filter(
  (project): project is CaseStudy => Boolean(project.href)
);

/** Where the "Works" nav item points: the first project. */
export const firstCaseStudyHref = caseStudies[0]?.href ?? "/";

/** Previous/next project, skipping any that have no page yet. */
export function getProjectSiblings(slug: string): {
  previous?: CaseStudy;
  next?: CaseStudy;
} {
  const index = caseStudies.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return {
    previous: caseStudies[index - 1],
    next: caseStudies[index + 1],
  };
}
