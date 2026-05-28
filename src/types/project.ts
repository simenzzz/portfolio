export type ProductEntry = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  visualKey: string;
  repoUrl?: string;
  liveUrl?: string;
  liveLabel?: string;
};

export type ResearchEntry = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  visualKey: string;
  year: string;
  roleLabel: string;
  primaryUrl: string;
  repoUrl?: string;
  thesis?: string;
  question?: string;
  method?: string;
  finding?: string;
  metrics?: ResearchMetric[];
  caveat?: string;
  artifactLinks?: ResearchArtifactLink[];
};

export type PortfolioEntry = ProductEntry | ResearchEntry;

export type Project = ProductEntry;

export const isResearchEntry = (entry: PortfolioEntry): entry is ResearchEntry => "primaryUrl" in entry;

export type ResearchMetric = {
  value: string;
  label: string;
  detail: string;
};

export type ResearchArtifactLink = {
  label: string;
  href: string;
};
