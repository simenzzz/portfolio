import { getProjectVisual } from "../assets/project-visuals";
import type { ResearchEntry } from "../types/project";
import styles from "./ResearchDossier.module.css";

type ResearchDossierProps = {
  entries: ResearchEntry[];
};

const fallbackMetrics: NonNullable<ResearchEntry["metrics"]> = [];

export function ResearchDossier({ entries }: ResearchDossierProps) {
  return (
    <div className={styles.dossierList}>
      {entries.map((entry, index) => {
        const visual = getProjectVisual(entry.visualKey);
        const metrics = entry.metrics ?? fallbackMetrics;
        const sequence = String(index + 1).padStart(2, "0");

        return (
          <article className={styles.dossier} key={entry.slug}>
            <div className={styles.indexRail}>
              <span>{sequence}</span>
              <span>{entry.year}</span>
            </div>

            <div className={styles.copy}>
              <div className={styles.metaRow}>
                <p>{entry.roleLabel}</p>
                <ul aria-label={`${entry.title} themes`}>
                  {entry.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>

              <h3>{entry.title}</h3>
              <p className={styles.thesis}>{entry.thesis ?? entry.summary}</p>

              <div className={styles.briefGrid}>
                <section>
                  <h4>Question</h4>
                  <p>{entry.question ?? entry.summary}</p>
                </section>
                <section>
                  <h4>Method</h4>
                  <p>{entry.method ?? entry.summary}</p>
                </section>
                <section>
                  <h4>Finding</h4>
                  <p>{entry.finding ?? entry.summary}</p>
                </section>
              </div>

              {entry.caveat ? <p className={styles.caveat}>{entry.caveat}</p> : null}

              <div className={styles.links}>
                <a href={entry.primaryUrl} target="_blank" rel="noreferrer">
                  Open Research
                </a>
                {entry.artifactLinks?.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            <aside className={styles.evidence} aria-label={`${entry.title} evidence`}>
              <figure className={styles.visualBlock}>
                <img className={styles.visual} src={visual} alt="" />
                <figcaption>{entry.slug.replace(/-/g, " / ")}</figcaption>
              </figure>

              {metrics.length ? (
                <dl className={styles.metricGrid}>
                  {metrics.map((metric) => (
                    <div key={`${entry.slug}-${metric.label}`}>
                      <dt>{metric.value}</dt>
                      <dd>
                        <span>{metric.label}</span>
                        {metric.detail}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </aside>
          </article>
        );
      })}
    </div>
  );
}
