import type { ProductEntry, ResearchEntry } from "../types/project";

export const products: ProductEntry[] = [
  {
    slug: "deckgraph",
    title: "Deckgraph",
    summary:
      "An installable CLI (`npx deckgraph`) and VS Code extension that builds a unified dependency graph across npm, PyPI, Go, Cargo, and Maven, detecting cross-language edges (gRPC/proto, FFI, OpenAPI), flagging outdated packages, and presenting layered, filterable views through a live React dashboard. Zero native dependencies: all parsing via WebAssembly tree-sitter grammars.",
    tags: ["Polyglot Dependency Graphs", "Cross-Language Analysis", "Tree-sitter WASM", "AST Analysis"],
    visualKey: "deckgraph",
    repoUrl: "https://github.com/simenzzz/Deckgraph",
    liveUrl: "https://deckgraph-demo.onrender.com",
    liveLabel: "Live Demo"
  },
  {
    slug: "tideway",
    title: "Tideway",
    summary:
      "A research-grade Rust pipeline for scientific sensor networks that ingests at 14–17M samples/s, durably buffers offline during partitions, and reconciles zones on reconnection using IBLT set diffing (~93 bytes per differing record). Ships Ed25519-signed bundle transport, CRDT control-plane state, federated drift detection, and partial-result query semantics, with zero `unsafe` code and 88% line coverage across ~710 tests.",
    tags: ["IBLT Set Reconciliation", "CRDTs", "High-Throughput Ingest", "Zero-Unsafe Rust"],
    visualKey: "tideway",
    repoUrl: "https://github.com/simenzzz/tideway",
    liveUrl: "https://github.com/simenzzz/tideway#demo-runbook",
    liveLabel: "Demo Runbook"
  },
  {
    slug: "lucubrum",
    title: "Lucubrum",
    summary:
      "A fully-deployed two-service platform (Node.js/TypeScript orchestrator + FastAPI/Python curriculum service) that generates DAG-structured learning roadmaps, ranks and attaches YouTube resources deterministically, creates LLM-graded adaptive exercises, and tracks mastery with weighted scoring. All LLM outputs are schema-validated via Pydantic with retry logic and full audit logging; provider (Gemini/Claude) is swappable via config.",
    tags: ["Two-Service Platform", "Schema-Validated LLM", "Adaptive Learning", "DAG Roadmaps"],
    visualKey: "lucubrum",
    repoUrl: "https://github.com/simenzzz/learningProj",
    liveUrl: "https://lucubrum.vercel.app/"
  },
  {
    slug: "realtime-collaboration-platform",
    title: "Cove",
    summary:
      "A Rust/Axum + SvelteKit collaboration platform backed by SurrealDB's graph data model for social connections (follows, friends-of-friends discovery, server recommendations). Real-time messaging runs via a room-actor WebSocket architecture with sequence numbers and resume capability; collaborative editing uses Yrs (Rust Yjs port) for conflict-free document and whiteboard sync, with synchronized watch-together rooms.",
    tags: ["Graph Database", "Real-Time Collaboration", "Actor Model", "Yrs / Yjs"],
    visualKey: "realtime-collaboration-platform",
    liveUrl: "https://cove.samibk.com/",
    liveLabel: "Live Demo"
  },
  {
    slug: "careconnect",
    title: "CareConnect",
    summary:
      "A Lebanon-based two-sided marketplace connecting parents with vetted child- and pet-sitters: parents describe their care needs while sitters onboard through CV + KYC verification, a deterministic matching engine ranks candidates by proximity, rating, experience, and availability, and bookings are scheduled and paid (Whish Money) over a React 19 + Firebase frontend and a Node/Express + PostgreSQL backend. Double-booking is blocked at the database level via a PostgreSQL EXCLUDE constraint (btree_gist), payment callbacks are re-verified server-side rather than trusted from query params, and both apps fail fast under Zod-validated environment schemas.",
    tags: ["Two-Sided Marketplace", "Deterministic Matching", "KYC Verification", "Firebase"],
    visualKey: "careconnect",
    repoUrl: "https://github.com/simenzzz/CareConnect"
  },
  {
    slug: "ishtirak",
    title: "Ishtirak",
    summary:
      "A polyglot, multi-tenant SaaS for Lebanon's neighborhood diesel-generator operators (ishtirak / اشتراك): a Java/Spring system-of-record manages subscribers, amperage tiers, meter readings, and atomic monthly billing in USD/LBP; a Python/FastAPI streaming service flags meter tampering and electricity theft from reading deltas; and a Node/Express gateway pushes real-time outage countdowns and tampering alerts over WebSockets. The services are wired by a RabbitMQ topic exchange (at-least-once domain events) and Redis, with every entity, query, and event hard-scoped by operatorId for strict tenant isolation.",
    tags: ["Polyglot Microservices", "Event-Driven", "IoT Edge Pipeline", "Multi-Tenant SaaS"],
    visualKey: "ishtirak",
    repoUrl: "https://github.com/simenzzz/Ishtirak"
  },
  {
    slug: "council",
    title: "Council",
    summary:
      "A live AI-debate web app: ask one question and a panel of 3–5 personas (skeptic, optimist, domain expert, contrarian) answer and rebut each other across multiple rounds, streaming in parallel into a multi-column UI before a moderator synthesizes a final verdict. The Go backend runs the signature fan-out/fan-in pattern: N persona goroutines stream tagged token deltas into a single channel that exactly one writer drains to the WebSocket, because WebSocket writes are not concurrency-safe, multiplexing GLM/z.ai streams over one socket, with a React Three Fiber stage of procedural 3D robots that animate to the active speaker.",
    tags: ["Go Concurrency", "Multi-Agent Debate", "Real-Time Streaming", "WebSockets"],
    visualKey: "council",
    repoUrl: "https://github.com/simenzzz/Council"
  }
];

export const researchEntries: ResearchEntry[] = [
  {
    slug: "v2g-anomaly-detection",
    title: "V2G Anomaly Detection",
    summary:
      "A multi-modal transformer (4 layers, d=128, 8 heads) that fuses host and network event tokens for five-class EVSE attack detection (Recon, DoS, Backdoor, Cryptojacking) on CICEVSE2024, achieving 90.30% accuracy and 0.695 macro-F1 under a strict session-level holdout that exposes the leakage random splits conceal. SHAP over 18,944 attribution dimensions and attention exports provide analyst-facing evidence for each prediction.",
    tags: ["Multi-Modal Fusion", "SHAP", "Session-Level Holdout", "Cybersecurity"],
    visualKey: "v2g-anomaly-detection",
    year: "2026",
    roleLabel: "2-person team",
    primaryUrl: "/papers/v2g-anomaly-detection.pdf",
    thesis:
      "A multi-modal transformer that fuses network flows and host events to detect five categories of cyberattacks on EV charging stations (Recon, DoS, Backdoor, Cryptojacking, and Benign) with SHAP explainability under a strict session-level holdout on CICEVSE2024.",
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
      "A three-tier cascading WAF: ReDoS-safe regex screening → temperature-calibrated char-BiLSTM router → Mondrian conformal specialist trained on the uncertain slice. The cascade reaches 0.972 F1 on CSIC2010, escalating only 3.04% of requests to Tier 3, with a saliency-driven feedback loop that synthesizes new regex rules from neural attribution scores.",
    tags: ["Cascading Classifier", "Char-BiLSTM", "ReDoS-Safe Regex", "Conformal Prediction"],
    visualKey: "uncertainty-routed-3-tier-waf",
    year: "2026",
    roleLabel: "Solo research system",
    primaryUrl: "/papers/uncertainty-routed-3-tier-waf.pdf",
    thesis:
      "A three-tier cascading WAF: ReDoS-safe regex screening → temperature-calibrated char-BiLSTM router → Mondrian conformal specialist trained on the uncertain slice. The cascade reaches 0.972 F1 on CSIC2010, escalating only 3.04% of requests to Tier 3, with a saliency-driven feedback loop that synthesizes new regex rules from neural attribution scores.",
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
