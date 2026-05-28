import { ProjectCard } from "./ProjectCard";
import { ResearchEntryCard } from "./ResearchEntryCard";
import { isResearchEntry, type PortfolioEntry } from "../types/project";

type StudioEntryPreviewProps = {
  entry: PortfolioEntry;
};

export function StudioEntryPreview({ entry }: StudioEntryPreviewProps) {
  if (isResearchEntry(entry)) {
    return <ResearchEntryCard entry={entry} />;
  }

  return <ProjectCard project={entry} />;
}
