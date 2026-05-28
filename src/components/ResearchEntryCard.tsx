import { getProjectVisual } from "../assets/project-visuals";
import type { ResearchEntry } from "../types/project";
import styles from "./ResearchEntryCard.module.css";

type ResearchEntryCardProps = {
  entry: ResearchEntry;
};

export function ResearchEntryCard({ entry }: ResearchEntryCardProps) {
  const visual = getProjectVisual(entry.visualKey);

  return (
    <article className={styles.card}>
      <div className={styles.copy}>
        <div className={styles.metaRail}>
          <p className={styles.eyebrow}>Research</p>
          <p className={styles.meta}>
            <span>{entry.year}</span>
            <span>{entry.roleLabel}</span>
          </p>
        </div>

        <h3 className={styles.title}>{entry.title}</h3>
        <p className={styles.summary}>{entry.summary}</p>

        <ul className={styles.tags} aria-label={`${entry.title} themes`}>
          {entry.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className={styles.links}>
          <a href={entry.primaryUrl} target="_blank" rel="noreferrer">
            Open Research
          </a>
          {entry.repoUrl ? (
            <a href={entry.repoUrl} target="_blank" rel="noreferrer">
              Repository
            </a>
          ) : null}
        </div>
      </div>

      <figure className={styles.visualBlock}>
        <img className={styles.visual} src={visual} alt="" />
        <figcaption>Research plate with attribution and primary artifact link.</figcaption>
      </figure>
    </article>
  );
}
