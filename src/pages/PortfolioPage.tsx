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
const publicDemoSlugs = new Set(["deckgraph", "realtime-collaboration-platform"]);

const publicDemos = products.filter((product) => publicDemoSlugs.has(product.slug) && product.liveUrl);

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
          </div>
          <DemoLinks projects={publicDemos} />
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
              label="Product systems"
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
              label="Evidence tracks"
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

function DemoLinks({ projects }: { projects: ProductEntry[] }) {
  if (!projects.length) {
    return null;
  }

  return (
    <nav className={styles.statusRail} aria-label="Project demos">
      {projects.map((project) => (
        <a
          key={project.slug}
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.title} ${project.liveLabel ?? "Live Demo"}`}
        >
          <span>{project.title}</span>
          <strong>{project.liveLabel ?? "Live Demo"}</strong>
        </a>
      ))}
    </nav>
  );
}

type EntryRowProps = {
  title: string;
  label: string;
  count: number;
  isVisible: boolean;
  children: ReactNode;
};

function EntryRow({ title, label, count, isVisible, children }: EntryRowProps) {
  const headingId = `${title.toLowerCase().replace(/\s+/g, "-")}-heading`;

  return (
    <section className={[styles.entryRow, isVisible ? styles.entryRowVisible : ""].join(" ")} aria-labelledby={headingId}>
      <div className={styles.rowHeader}>
        <div>
          <p className={styles.eyebrow}>{label}</p>
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
        <span>{isResearch ? entry.year : "Build"}</span>
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
          <p className={styles.eyebrow}>{kind === "applied" ? "Selected applied work" : "Selected research paper"}</p>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close details">
            Close
          </button>
        </div>

        <div className={styles.detailScroll}>
          <figure className={styles.detailVisual}>
            <img src={visual} alt="" />
            <figcaption>{entry.slug.replace(/-/g, " / ")}</figcaption>
          </figure>

          <div className={styles.detailHeading}>
            <h2>{entry.title}</h2>
            <p>{isResearchEntry(entry) ? entry.thesis ?? entry.summary : entry.summary}</p>
          </div>

          {isResearchEntry(entry) ? <ResearchDetail entry={entry} /> : <AppliedDetail entry={entry} />}
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

function ResearchDetail({ entry }: { entry: ResearchEntry }) {
  const metrics = entry.metrics ?? [];

  return (
    <>
      <div className={styles.researchMeta}>
        <span>{entry.year}</span>
        <span>{entry.roleLabel}</span>
      </div>

      <TagList tags={entry.tags} label={`${entry.title} themes`} />

      <div className={styles.briefGrid}>
        <DetailBrief title="Question" body={entry.question ?? entry.summary} />
        <DetailBrief title="Method" body={entry.method ?? entry.summary} />
        <DetailBrief title="Finding" body={entry.finding ?? entry.summary} />
      </div>

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

      {entry.caveat ? <p className={styles.caveat}>{entry.caveat}</p> : null}

      <ActionLinks
        links={[
          { label: "Open Research", href: entry.primaryUrl },
          ...(entry.artifactLinks ?? [])
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

function ActionLinks({ links }: { links: { label: string; href?: string }[] }) {
  const visibleLinks = links.filter((link): link is { label: string; href: string } => hasUrl(link.href));

  if (!visibleLinks.length) {
    return null;
  }

  return (
    <div className={styles.actionLinks}>
      {visibleLinks.map((link) => (
        <a key={`${link.label}-${link.href}`} href={link.href} target="_blank" rel="noreferrer">
          {link.label}
        </a>
      ))}
    </div>
  );
}
