import { getProjectVisual } from "../assets/project-visuals";
import type { ProductEntry } from "../types/project";
import styles from "./FeaturedProject.module.css";

type FeaturedProjectProps = {
  index: number;
  project: ProductEntry;
};

export function FeaturedProject({ index, project }: FeaturedProjectProps) {
  const visual = getProjectVisual(project.visualKey);
  const sequence = String(index + 1).padStart(2, "0");

  return (
    <article className={[styles.band, index % 2 === 1 ? styles.bandReverse : ""].join(" ")}>
      <div className={styles.sequenceBlock}>
        <p className={styles.sequence}>{sequence}</p>
        <p className={styles.sequenceLabel}>Selected Build</p>
      </div>

      <div className={styles.copyBlock}>
        <p className={styles.eyebrow}>{project.slug.replace(/-/g, " / ")}</p>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>

        <ul className={styles.tags} aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className={styles.links}>
          {project.repoUrl ? (
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              Repository
            </a>
          ) : null}
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              {project.liveLabel ?? "Live Preview"}
            </a>
          ) : null}
        </div>
      </div>

      <figure className={styles.visualBlock}>
        <img className={styles.visual} src={visual} alt="" />
        <figcaption>Visual plate from the project archive.</figcaption>
      </figure>
    </article>
  );
}
