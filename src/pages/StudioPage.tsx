import { useId, useState, type ChangeEvent } from "react";
import { projectVisualKeys } from "../assets/project-visuals";
import { StudioEntryPreview } from "../components/StudioEntryPreview";
import type { PortfolioEntry, ProductEntry, ResearchEntry } from "../types/project";
import styles from "./StudioPage.module.css";

type EntryMode = "product" | "research";

type ProductFormState = {
  slug: string;
  title: string;
  summary: string;
  tags: string;
  visualKey: string;
  repoUrl: string;
  liveUrl: string;
};

type ResearchFormState = {
  slug: string;
  title: string;
  summary: string;
  tags: string;
  visualKey: string;
  year: string;
  roleLabel: string;
  primaryUrl: string;
  repoUrl: string;
};

const initialProductState: ProductFormState = {
  slug: "",
  title: "",
  summary: "",
  tags: "",
  visualKey: projectVisualKeys[0],
  repoUrl: "",
  liveUrl: ""
};

const initialResearchState: ResearchFormState = {
  slug: "",
  title: "",
  summary: "",
  tags: "",
  visualKey: projectVisualKeys[0],
  year: "",
  roleLabel: "",
  primaryUrl: "",
  repoUrl: ""
};

const parseTags = (tags: string) =>
  tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const createDraftProduct = (form: ProductFormState): ProductEntry => ({
  slug: form.slug || "new-project",
  title: form.title || "Untitled project",
  summary: form.summary || "Add a short description that explains what this project does.",
  tags: parseTags(form.tags),
  visualKey: form.visualKey,
  repoUrl: form.repoUrl || undefined,
  liveUrl: form.liveUrl || undefined
});

const createDraftResearch = (form: ResearchFormState): ResearchEntry => ({
  slug: form.slug || "new-research-entry",
  title: form.title || "Untitled research entry",
  summary: form.summary || "Add a concise research summary that explains the question and the artifact.",
  tags: parseTags(form.tags),
  visualKey: form.visualKey,
  year: form.year || "2026",
  roleLabel: form.roleLabel || "Solo research system",
  primaryUrl: form.primaryUrl || "https://github.com/your-name/research-entry",
  repoUrl: form.repoUrl || undefined
});

const createProductSnippet = (product: ProductEntry) => `{
  slug: "${product.slug}",
  title: "${product.title}",
  summary: "${product.summary}",
  tags: [${product.tags.map((tag) => `"${tag}"`).join(", ")}],
  visualKey: "${product.visualKey}",${
    product.repoUrl ? `
  repoUrl: "${product.repoUrl}",` : ""
  }${
    product.liveUrl ? `
  liveUrl: "${product.liveUrl}"` : ""
  }
}`;

const createResearchSnippet = (entry: ResearchEntry) => `{
  slug: "${entry.slug}",
  title: "${entry.title}",
  summary: "${entry.summary}",
  tags: [${entry.tags.map((tag) => `"${tag}"`).join(", ")}],
  visualKey: "${entry.visualKey}",
  year: "${entry.year}",
  roleLabel: "${entry.roleLabel}",
  primaryUrl: "${entry.primaryUrl}"${
    entry.repoUrl ? `,
  repoUrl: "${entry.repoUrl}"` : ""
  }
}`;

const getProductValidationErrors = (form: ProductFormState) => {
  const errors: string[] = [];

  if (!form.slug.trim()) {
    errors.push("Slug is required.");
  }

  if (!form.title.trim()) {
    errors.push("Title is required.");
  }

  if (!form.summary.trim()) {
    errors.push("Summary is required.");
  }

  if (!parseTags(form.tags).length) {
    errors.push("At least one tag is required.");
  }

  return errors;
};

const getResearchValidationErrors = (form: ResearchFormState) => {
  const errors: string[] = [];

  if (!form.slug.trim()) {
    errors.push("Slug is required.");
  }

  if (!form.title.trim()) {
    errors.push("Title is required.");
  }

  if (!form.summary.trim()) {
    errors.push("Summary is required.");
  }

  if (!parseTags(form.tags).length) {
    errors.push("At least one tag is required.");
  }

  if (!form.year.trim()) {
    errors.push("Year is required.");
  }

  if (!form.roleLabel.trim()) {
    errors.push("Role label is required.");
  }

  if (!form.primaryUrl.trim()) {
    errors.push("Primary URL is required.");
  }

  return errors;
};

export function StudioPage() {
  const formId = useId();
  const [mode, setMode] = useState<EntryMode>("product");
  const [productForm, setProductForm] = useState<ProductFormState>(initialProductState);
  const [researchForm, setResearchForm] = useState<ResearchFormState>(initialResearchState);
  const [showErrors, setShowErrors] = useState(false);

  const draftProduct = createDraftProduct(productForm);
  const draftResearch = createDraftResearch(researchForm);
  const entry: PortfolioEntry = mode === "product" ? draftProduct : draftResearch;
  const errors =
    mode === "product" ? getProductValidationErrors(productForm) : getResearchValidationErrors(researchForm);
  const snippet = mode === "product" ? createProductSnippet(draftProduct) : createResearchSnippet(draftResearch);

  const updateProductField =
    (field: keyof ProductFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setProductForm((current) => ({
        ...current,
        [field]: event.target.value
      }));
    };

  const updateResearchField =
    (field: keyof ResearchFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setResearchForm((current) => ({
        ...current,
        [field]: event.target.value
      }));
    };

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Internal Studio</p>
          <h1>Draft a portfolio entry and copy the generated source snippet.</h1>
          <p className={styles.lede}>
            This route is intentionally unlinked from the public portfolio. It helps you author
            consistent product and research objects without introducing a backend or public CMS surface.
          </p>
        </div>
        <div className={styles.callout}>
          <p className={styles.calloutLabel}>Publishing flow</p>
          <ol>
            <li>Choose product or research mode, then review the live preview.</li>
            <li>Copy the generated object into the matching array in `src/data/projects.ts`.</li>
            <li>Add or register the matching SVG under `src/assets/project-visuals/`.</li>
          </ol>
        </div>
      </header>

      <section className={styles.grid}>
        <form
          className={styles.form}
          aria-describedby={`${formId}-hint`}
          onSubmit={(event) => {
            event.preventDefault();
            setShowErrors(true);
          }}
        >
          <div className={styles.modeSwitcher} role="tablist" aria-label="Entry type">
            <button
              type="button"
              role="tab"
              aria-selected={mode === "product"}
              className={mode === "product" ? styles.modeButtonActive : styles.modeButton}
              onClick={() => {
                setMode("product");
                setShowErrors(false);
              }}
            >
              Product
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "research"}
              className={mode === "research" ? styles.modeButtonActive : styles.modeButton}
              onClick={() => {
                setMode("research");
                setShowErrors(false);
              }}
            >
              Research
            </button>
          </div>

          <p id={`${formId}-hint`} className={styles.formHint}>
            {mode === "product"
              ? "Required fields: slug, title, summary, and at least one tag."
              : "Required fields: slug, title, summary, tags, year, role label, and primary URL."}
          </p>

          {mode === "product" ? (
            <>
              <label>
                Slug
                <input value={productForm.slug} onChange={updateProductField("slug")} placeholder="learning-helper" />
              </label>

              <label>
                Title
                <input value={productForm.title} onChange={updateProductField("title")} placeholder="Learning Helper" />
              </label>

              <label>
                Summary
                <textarea
                  rows={5}
                  value={productForm.summary}
                  onChange={updateProductField("summary")}
                  placeholder="A short, useful explanation of what the product does and why it matters."
                />
              </label>

              <label>
                Tags
                <input
                  value={productForm.tags}
                  onChange={updateProductField("tags")}
                  placeholder="React, FastAPI, LLM Systems"
                />
              </label>

              <label>
                Visual key
                <select value={productForm.visualKey} onChange={updateProductField("visualKey")}>
                  {projectVisualKeys.map((visualKey) => (
                    <option key={visualKey} value={visualKey}>
                      {visualKey}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Repository URL
                <input
                  value={productForm.repoUrl}
                  onChange={updateProductField("repoUrl")}
                  placeholder="https://github.com/your-name/learning-helper"
                />
              </label>

              <label>
                Live URL
                <input
                  value={productForm.liveUrl}
                  onChange={updateProductField("liveUrl")}
                  placeholder="https://learning-helper.example.com"
                />
              </label>
            </>
          ) : (
            <>
              <label>
                Slug
                <input
                  value={researchForm.slug}
                  onChange={updateResearchField("slug")}
                  placeholder="v2g-anomaly-detection"
                />
              </label>

              <label>
                Title
                <input
                  value={researchForm.title}
                  onChange={updateResearchField("title")}
                  placeholder="V2G Anomaly Detection"
                />
              </label>

              <label>
                Summary
                <textarea
                  rows={5}
                  value={researchForm.summary}
                  onChange={updateResearchField("summary")}
                  placeholder="A concise explanation of the research question, implementation, and outcome."
                />
              </label>

              <label>
                Tags
                <input
                  value={researchForm.tags}
                  onChange={updateResearchField("tags")}
                  placeholder="Research, ML, Cybersecurity, Time Series"
                />
              </label>

              <label>
                Visual key
                <select value={researchForm.visualKey} onChange={updateResearchField("visualKey")}>
                  {projectVisualKeys.map((visualKey) => (
                    <option key={visualKey} value={visualKey}>
                      {visualKey}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Year
                <input value={researchForm.year} onChange={updateResearchField("year")} placeholder="2026" />
              </label>

              <label>
                Role label
                <input
                  value={researchForm.roleLabel}
                  onChange={updateResearchField("roleLabel")}
                  placeholder="2-person team"
                />
              </label>

              <label>
                Primary URL
                <input
                  value={researchForm.primaryUrl}
                  onChange={updateResearchField("primaryUrl")}
                  placeholder="https://github.com/your-name/research-entry"
                />
              </label>

              <label>
                Repository URL
                <input
                  value={researchForm.repoUrl}
                  onChange={updateResearchField("repoUrl")}
                  placeholder="https://github.com/your-name/research-entry"
                />
              </label>
            </>
          )}

          <button type="submit">Validate entry</button>

          {showErrors && errors.length ? (
            <div className={styles.errors} role="alert">
              <p>Missing fields:</p>
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </form>

        <div className={styles.previewPanel}>
          <div>
            <p className={styles.panelLabel}>{mode === "product" ? "Product preview" : "Research preview"}</p>
            <StudioEntryPreview entry={entry} />
          </div>

          <div className={styles.snippetBlock}>
            <div className={styles.snippetHeader}>
              <p className={styles.panelLabel}>Generated snippet</p>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(snippet).catch(() => undefined);
                }}
              >
                Copy snippet
              </button>
            </div>
            <pre>{snippet}</pre>
          </div>
        </div>
      </section>
    </main>
  );
}
