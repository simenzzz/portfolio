import careconnect from "./careconnect.svg";
import council from "./council.svg";
import deckgraph from "./deckgraph.svg";
import ishtirak from "./ishtirak.svg";
import lucubrum from "./lucubrum.svg";
import realtimeCollaborationPlatform from "./realtime-collaboration-platform.svg";
import tideway from "./tideway.svg";
import uncertaintyRouted3TierWaf from "./uncertainty-routed-3-tier-waf.svg";
import v2gAnomalyDetection from "./v2g-anomaly-detection.svg";

export const projectVisualRegistry = {
  careconnect,
  council,
  deckgraph,
  ishtirak,
  lucubrum,
  "realtime-collaboration-platform": realtimeCollaborationPlatform,
  tideway,
  "uncertainty-routed-3-tier-waf": uncertaintyRouted3TierWaf,
  "v2g-anomaly-detection": v2gAnomalyDetection
} as const;

export const projectVisualKeys = Object.keys(projectVisualRegistry);

export const getProjectVisual = (visualKey: string) =>
  projectVisualRegistry[visualKey as keyof typeof projectVisualRegistry] ?? deckgraph;
