import type { ProductEntry, ResearchEntry } from "../types/project";

export const products: ProductEntry[] = [
  {
    slug: "deckgraph",
    title: "Deckgraph",
    summary:
      "A hosted dependency explorer for polyglot codebases: import a curated GitHub repo, scan npm, PyPI, Go, Cargo, and Maven modules, and inspect dependency health, module structure, and cross-language edges through a live React dashboard.",
    tags: ["TypeScript", "Developer Tools", "Architecture", "Visualization"],
    visualKey: "deckgraph",
    repoUrl: "https://github.com/simenzzz/Deckgraph",
    liveUrl: "https://deckgraph-demo.onrender.com",
    liveLabel: "Live Demo"
  },
  {
    slug: "lucubrum",
    title: "Lucubrum",
    summary:
      "A two-service learning platform that generates structured study roadmaps, attaches curated resources, creates adaptive exercises, and tracks mastery across a React, Node, and FastAPI stack.",
    tags: ["React", "Node.js", "FastAPI", "LLM Systems"],
    visualKey: "lucubrum",
    repoUrl: "https://github.com/simenzzz/learningProj",
    liveUrl: "https://lucubrum.vercel.app/"
  },
  {
    slug: "realtime-collaboration-platform",
    title: "Realtime Collaboration Platform",
    summary:
      "A channel-based collaboration platform with live chat, presence, synchronized watch rooms, and a CRDT whiteboard for shared drawing and editing.",
    tags: ["Svelte", "WebSockets", "Yjs", "Realtime"],
    visualKey: "realtime-collaboration-platform",
    liveUrl: "https://nexus.wizconsults.com",
    liveLabel: "Live Demo"
  }
];

export const researchEntries: ResearchEntry[] = [
  {
    slug: "v2g-anomaly-detection",
    title: "V2G Anomaly Detection",
    summary:
      "An explainable transformer that fuses raw host and network event tokens for five-class EVSE attack detection on CICEVSE2024, evaluated under a strict session-level holdout that exposes the leakage easier splits hide, with SHAP and attention evidence for analyst review.",
    tags: ["Research", "Transformers", "Cybersecurity", "Explainable AI"],
    visualKey: "v2g-anomaly-detection",
    year: "2026",
    roleLabel: "2-person team",
    primaryUrl: "/papers/v2g-anomaly-detection.pdf",
    thesis:
      "EVSE attack detection is only credible under a disjoint session-level split: it separates a model that detects attacks from one that memorizes capture structure.",
    question:
      "Can a multi-modal transformer detect five EVSE attack classes across host and network evidence while generalizing to capture sessions it has never seen?",
    method:
      "Built a token-fusion transformer (4 layers, d=128, 8 heads) over raw 30-second windows with up to 32 host and 64 network tokens, modality embeddings, and timestamp positional encoding, trained under a session-level holdout, with SHAP over 18,944 attribution dimensions, attention exports, and modality-masking ablations.",
    finding:
      "Under the strict session-level holdout the fused transformer reached 90.30% accuracy and 0.6952 macro-F1 across five classes, detecting Reconnaissance, Backdoor, and Cryptojacking strongly while exposing a benign cross-device failure that the looser blocked split (0.951 macro-F1) had concealed.",
    metrics: [
      {
        value: "90.30%",
        label: "accuracy",
        detail: "session-level holdout, 701 windows"
      },
      {
        value: "0.6952",
        label: "macro-F1",
        detail: "five-class session-level result"
      },
      {
        value: "0.9175",
        label: "macro-AUC",
        detail: "ranking quality under session holdout"
      },
      {
        value: "705",
        label: "features",
        detail: "501 host and 204 network, fused"
      }
    ],
    caveat:
      "Backdoor and Cryptojacking have only one or two independent sessions, so their near-perfect scores are within-dataset evidence; the benign class fails entirely across devices, showing sensitivity to capture-environment shift.",
    artifactLinks: [
      {
        label: "Research Repo",
        href: "https://github.com/simenzzz/IntroML"
      }
    ]
  },
  {
    slug: "uncertainty-routed-3-tier-waf",
    title: "Uncertainty-Routed 3-Tier WAF",
    summary:
      "A research-driven web application firewall that routes HTTP requests through deterministic rules, a calibrated neural gate, and a conformal specialist for the uncertain slice.",
    tags: ["Research", "Security", "ML", "Systems"],
    visualKey: "uncertainty-routed-3-tier-waf",
    year: "2026",
    roleLabel: "Solo research system",
    primaryUrl: "/papers/uncertainty-routed-3-tier-waf.pdf",
    thesis:
      "A WAF should not force one detector to solve every request; it should spend expensive inspection only where calibrated uncertainty justifies it.",
    question:
      "Can a three-tier cascade improve attack recall on ambiguous HTTP traffic while keeping the hot path fast and policy-driven?",
    method:
      "Implemented ReDoS-safe regex screening, a temperature-calibrated character BiLSTM router, a Tier-3 MLP specialist trained on the uncertain band, Mondrian conformal abstention, and a saliency-driven regex-synthesis feedback loop.",
    finding:
      "The cascade reached 0.972 F1 on CSIC2010, escalated only 3.04% of requests to Tier 3, and recovered detections on adversarial mutations that Tier 2 missed.",
    metrics: [
      {
        value: "0.972",
        label: "cascade F1",
        detail: "CSIC2010 held-out test split"
      },
      {
        value: "3.04%",
        label: "escalation",
        detail: "requests routed to Tier 3"
      },
      {
        value: "91.6%",
        label: "coverage",
        detail: "conformal set coverage at alpha 0.10"
      },
      {
        value: "0.022",
        label: "FNR",
        detail: "full specialist cascade"
      }
    ],
    caveat:
      "The evidence is CSIC-only; cross-dataset generalization and a production control plane remain future work.",
    artifactLinks: [
      {
        label: "Research Repo",
        href: "https://github.com/simenzzz/WAF"
      }
    ]
  }
];
