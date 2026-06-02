import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getProjectVisual } from "../assets/project-visuals";
import { products, researchEntries } from "../data/projects";
import type { PortfolioEntry, ProductEntry, ResearchEntry } from "../types/project";
import { isResearchEntry } from "../types/project";
import styles from "./PortfolioPage.module.css";

type EntryKind = "applied" | "research";

type SelectedEntry = {
  kind: EntryKind;
  entry: PortfolioEntry;
};

const hasUrl = (url: string | undefined): url is string => Boolean(url);

export function PortfolioPage() {
  const firstSelection = useMemo<SelectedEntry>(
    () => ({
      kind: "applied",
      entry: products[0]
    }),
    []
  );
  const [selected, setSelected] = useState<SelectedEntry>(firstSelection);
  const [activeKind, setActiveKind] = useState<EntryKind>("applied");
  const [detailOpen, setDetailOpen] = useState(false);

  useEffect(() => {
    if (!detailOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDetailOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [detailOpen]);

  const selectEntry = (kind: EntryKind, entry: PortfolioEntry) => {
    setSelected({ kind, entry });
    setActiveKind(kind);
    setDetailOpen(true);
  };

  const showApplied = () => {
    setActiveKind("applied");
    setSelected({ kind: "applied", entry: products[0] });
    setDetailOpen(false);
  };

  const showResearch = () => {
    setActiveKind("research");
    setSelected({ kind: "research", entry: researchEntries[0] });
    setDetailOpen(false);
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.masthead}>
          <div className={styles.identity}>
            <h1>Sami Bou Khaled</h1>
            <span className={styles.titleRule} aria-hidden="true" />
            <ContactLinks />
          </div>
        </header>

        <div className={styles.mobileSwitch} role="tablist" aria-label="Portfolio category">
          <button
            type="button"
            role="tab"
            aria-selected={activeKind === "applied"}
            className={activeKind === "applied" ? styles.switchActive : ""}
            onClick={showApplied}
          >
            Applied
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeKind === "research"}
            className={activeKind === "research" ? styles.switchActive : ""}
            onClick={showResearch}
          >
            Research
          </button>
        </div>

        <section className={styles.workspace} aria-label="Portfolio command board">
          <div className={styles.board}>
            <EntryRow
              title="Applied Work"
              count={products.length}
              isVisible={activeKind === "applied"}
            >
              {products.map((project, index) => (
                <PortfolioCard
                  key={project.slug}
                  entry={project}
                  kind="applied"
                  index={index}
                  isSelected={selected.kind === "applied" && selected.entry.slug === project.slug}
                  onSelect={() => selectEntry("applied", project)}
                />
              ))}
            </EntryRow>

            <EntryRow
              title="Research Papers"
              count={researchEntries.length}
              isVisible={activeKind === "research"}
            >
              {researchEntries.map((entry, index) => (
                <PortfolioCard
                  key={entry.slug}
                  entry={entry}
                  kind="research"
                  index={index}
                  isSelected={selected.kind === "research" && selected.entry.slug === entry.slug}
                  onSelect={() => selectEntry("research", entry)}
                />
              ))}
            </EntryRow>
          </div>
        </section>

        {detailOpen ? <DetailModal selected={selected} onClose={() => setDetailOpen(false)} /> : null}
      </div>
    </main>
  );
}

function ContactLinks() {
  return (
    <nav className={styles.contactRail} aria-label="Contact links">
      <a href="https://github.com/simenzzz" target="_blank" rel="noreferrer" aria-label="GitHub">
        <GithubIcon />
        <span>GitHub</span>
      </a>
      <a href="https://www.linkedin.com/in/samibk/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
        <LinkedinIcon />
        <span>LinkedIn</span>
      </a>
      <a href="mailto:samibk2005@gmail.com" aria-label="Email samibk2005@gmail.com">
        <GmailIcon />
        <span>samibk2005@gmail.com</span>
      </a>
    </nav>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.09.68-.22.68-.49v-1.87c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.95c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.95.68 1.92v2.77c0 .27.18.58.69.48A10.16 10.16 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z"
      />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M5.4 8.76h3.08v9.86H5.4V8.76Zm1.55-4.9a1.78 1.78 0 1 1-.02 3.56 1.78 1.78 0 0 1 .02-3.56Zm3.47 4.9h2.95v1.35h.04c.41-.78 1.42-1.61 2.92-1.61 3.12 0 3.7 2.06 3.7 4.73v5.39h-3.08v-4.78c0-1.14-.02-2.61-1.59-2.61-1.59 0-1.84 1.24-1.84 2.53v4.86h-3.1V8.76Z"
      />
    </svg>
  );
}

function GmailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M4.4 6.2h15.2c.77 0 1.4.63 1.4 1.4v8.8c0 .77-.63 1.4-1.4 1.4H4.4c-.77 0-1.4-.63-1.4-1.4V7.6c0-.77.63-1.4 1.4-1.4Zm.86 2.08v7.44h13.48V8.28l-6.28 4.63a.78.78 0 0 1-.92 0L5.26 8.28Zm12.05-.58H6.69L12 11.62l5.31-3.92Z"
      />
    </svg>
  );
}

type EntryRowProps = {
  title: string;
  count: number;
  isVisible: boolean;
  children: ReactNode;
};

function EntryRow({ title, count, isVisible, children }: EntryRowProps) {
  const headingId = `${title.toLowerCase().replace(/\s+/g, "-")}-heading`;

  return (
    <section className={[styles.entryRow, isVisible ? styles.entryRowVisible : ""].join(" ")} aria-labelledby={headingId}>
      <div className={styles.rowHeader}>
        <div>
          <h2 id={headingId}>{title}</h2>
        </div>
        <span>{String(count).padStart(2, "0")}</span>
      </div>

      <div className={styles.cardGrid}>{children}</div>
    </section>
  );
}

type PortfolioCardProps = {
  entry: PortfolioEntry;
  kind: EntryKind;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
};

function PortfolioCard({ entry, kind, index, isSelected, onSelect }: PortfolioCardProps) {
  const visual = getProjectVisual(entry.visualKey);
  const sequence = String(index + 1).padStart(2, "0");
  const isResearch = isResearchEntry(entry);
  const summary = isResearch ? entry.thesis ?? entry.summary : entry.summary;

  return (
    <button
      type="button"
      className={[styles.card, isSelected ? styles.cardSelected : ""].join(" ")}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <span className={styles.cardMedia}>
        <img src={visual} alt="" />
        {isResearch ? <span>{entry.year}</span> : null}
      </span>

      <span className={styles.cardBody}>
        <span className={styles.cardMeta}>
          <span>{sequence}</span>
          <span>{kind === "applied" ? "Applied" : "Research"}</span>
        </span>
        <span className={styles.cardTitle}>{entry.title}</span>
        <span className={styles.cardSummary}>{summary}</span>
      </span>

      <span className={styles.tagRail} aria-label={`${entry.title} tags`}>
        {entry.tags.slice(0, 4).map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </span>
    </button>
  );
}

type DetailPanelProps = {
  selected: SelectedEntry;
  onClose: () => void;
};

function DetailModal({ selected, onClose }: DetailPanelProps) {
  const { entry, kind } = selected;
  const visual = getProjectVisual(entry.visualKey);

  return (
    <div className={styles.modalLayer} onClick={onClose}>
      <aside
        className={styles.detailModal}
        role="dialog"
        aria-modal="true"
        aria-label={`${entry.title} details`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.detailTopbar}>
          <p className={styles.eyebrow}>{kind === "applied" ? "Applied work" : "Research paper"}</p>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close details">
            Close
          </button>
        </div>

        <div className={styles.detailScroll}>
          {isResearchEntry(entry) ? (
            <div className={styles.researchLayout}>
              <section className={styles.researchEvidencePanel} aria-label={`${entry.title} evidence`}>
                <figure className={styles.detailVisual}>
                  <img src={visual} alt="" />
                </figure>

                <MetricsList metrics={entry.metrics ?? []} />
              </section>

              <section className={styles.researchPaperPanel} aria-label={`${entry.title} paper`}>
                <div className={styles.detailHeading}>
                  <h2>{entry.title}</h2>
                  <p>{entry.thesis ?? entry.summary}</p>
                </div>

                <div className={styles.researchMeta}>
                  <span>{entry.year}</span>
                  <span>{entry.roleLabel}</span>
                </div>

                <TagList tags={entry.tags} label={`${entry.title} themes`} />

                <ActionLinks
                  links={[
                    { label: "Open Research", href: entry.primaryUrl },
                    ...(entry.artifactLinks ?? [])
                  ]}
                />

                <div className={styles.briefGrid}>
                  <DetailBrief title="Question" body={entry.question ?? entry.summary} />
                  <DetailBrief title="Method" body={entry.method ?? entry.summary} />
                  <DetailBrief title="Finding" body={entry.finding ?? entry.summary} />
                </div>

                {entry.caveat ? <p className={styles.caveat}>{entry.caveat}</p> : null}
              </section>
            </div>
          ) : (
            <>
              <figure className={styles.detailVisual}>
                <img src={visual} alt="" />
              </figure>

              <div className={styles.detailHeading}>
                <h2>{entry.title}</h2>
                <p>{entry.summary}</p>
              </div>

              <AppliedDetail entry={entry} />
            </>
          )}
        </div>
      </aside>
    </div>
  );
}

function AppliedDetail({ entry }: { entry: ProductEntry }) {
  return (
    <>
      <TagList tags={entry.tags} label={`${entry.title} technologies`} />
      <ActionLinks
        links={[
          { label: "Repository", href: entry.repoUrl },
          { label: entry.liveLabel ?? "Live Preview", href: entry.liveUrl }
        ]}
      />
    </>
  );
}

function DetailBrief({ title, body }: { title: string; body: string }) {
  return (
    <section>
      <h3>{title}</h3>
      <p>{body}</p>
    </section>
  );
}

function TagList({ tags, label }: { tags: string[]; label: string }) {
  return (
    <ul className={styles.detailTags} aria-label={label}>
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  );
}

function MetricsList({ metrics }: { metrics: ResearchEntry["metrics"] }) {
  if (!metrics?.length) {
    return null;
  }

  return (
    <dl className={styles.metricGrid}>
      {metrics.map((metric) => (
        <div key={`${metric.label}-${metric.value}`}>
          <dt>{metric.value}</dt>
          <dd>
            <span>{metric.label}</span>
            {metric.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function ActionLinks({ links }: { links: { label: string; href?: string }[] }) {
  const visibleLinks = links.filter((link): link is { label: string; href: string } => hasUrl(link.href));

  if (!visibleLinks.length) {
    return null;
  }

  return (
    <div className={styles.actionLinks}>
      {visibleLinks.map((link) => (
        <a key={`${link.label}-${link.href}`} href={link.href} target="_blank" rel="noreferrer">
          <ActionIcon label={link.label} />
          {link.label}
        </a>
      ))}
    </div>
  );
}

function ActionIcon({ label }: { label: string }) {
  const normalized = label.toLowerCase();

  if (normalized.includes("repository") || normalized.includes("repo")) {
    return <GithubIcon />;
  }

  if (normalized.includes("demo") || normalized.includes("preview") || normalized.includes("runbook")) {
    return <DemoIcon />;
  }

  return <DocumentIcon />;
}

function DemoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M4.75 5.25h14.5c.97 0 1.75.78 1.75 1.75v8.7c0 .97-.78 1.75-1.75 1.75h-5.4l.42 1.55h1.83a.75.75 0 0 1 0 1.5H7.9a.75.75 0 0 1 0-1.5h1.83l.42-1.55h-5.4A1.75 1.75 0 0 1 3 15.7V7c0-.97.78-1.75 1.75-1.75Zm0 1.5A.25.25 0 0 0 4.5 7v8.7c0 .14.11.25.25.25h14.5c.14 0 .25-.11.25-.25V7a.25.25 0 0 0-.25-.25H4.75Zm6.63 2.43 3.38 2.12a.8.8 0 0 1 0 1.36l-3.38 2.12a.8.8 0 0 1-1.22-.68V9.86a.8.8 0 0 1 1.22-.68Z"
      />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M6.75 3.5h7.1c.47 0 .92.19 1.25.52l2.88 2.88c.33.33.52.78.52 1.25v9.1A2.25 2.25 0 0 1 16.25 19.5h-9.5a2.25 2.25 0 0 1-2.25-2.25V5.75A2.25 2.25 0 0 1 6.75 3.5Zm6.75 1.65V8c0 .28.22.5.5.5h2.85L13.5 5.15ZM8 11.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5H8Zm0 3a.75.75 0 0 0 0 1.5h5.75a.75.75 0 0 0 0-1.5H8Z"
      />
    </svg>
  );
}
