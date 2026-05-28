import { getProjectVisual } from "../assets/project-visuals";
import type { ProductEntry } from "../types/project";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: ProductEntry;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const visual = getProjectVisual(project.visualKey);

  return (
    <article className={styles.card}>
      <img className={styles.visual} src={visual} alt="" />
      <div className={styles.body}>
        <p className={styles.eyebrow}>Project</p>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.summary}>{project.summary}</p>
        <ul className={styles.tags} aria-label={`${project.title} technologies`}>
          {project.tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              {tag}
            </li>
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
              Live Preview
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
