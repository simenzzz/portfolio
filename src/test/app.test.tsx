import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderRoute } from "./renderApp";

describe("portfolio app", () => {
  it("renders the one-screen public portfolio board and featured entries", () => {
    renderRoute(["/"]);

    expect(
      screen.getByRole("heading", {
        name: /sami bou khaled/i
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^github$/i })).toHaveAttribute("href", "https://github.com/simenzzz");
    expect(screen.getByRole("link", { name: /^linkedin$/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/samibk/"
    );
    expect(screen.getByRole("link", { name: /email samibk2005@gmail\.com/i })).toHaveAttribute(
      "href",
      "mailto:samibk2005@gmail.com"
    );
    expect(screen.getByRole("heading", { name: /applied work/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /research papers/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /deckgraph/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /tideway/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /lucubrum/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /\bcove\b/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /v2g anomaly detection/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /uncertainty-routed 3-tier waf/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /careconnect/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ishtirak/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /\bcouncil\b/i })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /deckgraph live demo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /cove live demo/i })).not.toBeInTheDocument();
    expect(screen.getAllByText(/unified dependency graph/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/research-grade rust pipeline/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/vetted child- and pet-sitters/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/diesel-generator operators/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/fan-out\/fan-in/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens applied project details in a modal", async () => {
    const user = userEvent.setup();

    renderRoute(["/"]);

    await user.click(screen.getByRole("button", { name: /deckgraph/i }));

    const dialog = screen.getByRole("dialog", { name: /deckgraph details/i });

    expect(within(dialog).getByText(/applied work/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: /deckgraph/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/unified dependency graph/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /repository/i })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /live demo/i })).toHaveAttribute(
      "href",
      "https://deckgraph-demo.onrender.com"
    );
  });

  it("opens Tideway details with repository and demo runbook links", async () => {
    const user = userEvent.setup();

    renderRoute(["/"]);

    await user.click(screen.getByRole("button", { name: /tideway/i }));

    const dialog = screen.getByRole("dialog", { name: /tideway details/i });

    expect(within(dialog).getByRole("heading", { name: /tideway/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/reconciles zones on reconnection/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /repository/i })).toHaveAttribute(
      "href",
      "https://github.com/simenzzz/tideway"
    );
    expect(within(dialog).getByRole("link", { name: /demo runbook/i })).toHaveAttribute(
      "href",
      "https://github.com/simenzzz/tideway#demo-runbook"
    );
  });

  it("opens Cove project details with the live demo link", async () => {
    const user = userEvent.setup();

    renderRoute(["/"]);

    await user.click(screen.getByRole("button", { name: /\bcove\b/i }));

    const dialog = screen.getByRole("dialog", { name: /cove details/i });

    expect(within(dialog).getByRole("heading", { name: /cove/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/synchronized watch-together rooms/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /live demo/i })).toHaveAttribute(
      "href",
      "https://cove.samibk.com/"
    );
  });

  it("opens research details in a modal and closes it", async () => {
    const user = userEvent.setup();

    renderRoute(["/"]);

    await user.click(screen.getByRole("button", { name: /uncertainty-routed 3-tier waf/i }));

    const dialog = screen.getByRole("dialog", { name: /uncertainty-routed 3-tier waf details/i });

    expect(within(dialog).getByText(/research paper/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("heading", { name: /uncertainty-routed 3-tier waf/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/three-tier cascading waf/i)).toBeInTheDocument();
    expect(within(dialog).getAllByText(/0\.972/i).length).toBeGreaterThan(0);
    expect(within(dialog).getAllByText(/3\.04%/i).length).toBeGreaterThan(0);
    expect(within(dialog).getByText(/91\.6%/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/the evidence is csic-only/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /open research/i })).toHaveAttribute(
      "href",
      "/papers/uncertainty-routed-3-tier-waf.pdf"
    );
    expect(within(dialog).getByRole("link", { name: /research repo/i })).toHaveAttribute(
      "href",
      "https://github.com/simenzzz/WAF"
    );
    expect(within(dialog).queryByText(/v2g\s*\/\s*anomaly\s*\/\s*detection/i)).not.toBeInTheDocument();
    expect(within(dialog).queryByRole("link", { name: /demo|preview/i })).not.toBeInTheDocument();

    await user.click(within(dialog).getByRole("button", { name: /close details/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps the studio route out of public navigation", () => {
    renderRoute(["/"]);

    expect(screen.queryByRole("link", { name: /studio/i })).not.toBeInTheDocument();
  });

  it("renders the isolated studio flow and validates required product fields", async () => {
    const user = userEvent.setup();

    renderRoute(["/studio"]);

    expect(
      screen.getByRole("heading", {
        name: /draft a portfolio entry and copy the generated source snippet/i
      })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /validate entry/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/slug is required/i);
    expect(screen.getByRole("alert")).toHaveTextContent(/title is required/i);
    expect(screen.getByRole("alert")).toHaveTextContent(/summary is required/i);
    expect(screen.getByRole("alert")).toHaveTextContent(/at least one tag is required/i);
  });

  it("validates required research fields in studio mode", async () => {
    const user = userEvent.setup();

    renderRoute(["/studio"]);

    await user.click(screen.getByRole("tab", { name: /research/i }));
    await user.click(screen.getByRole("button", { name: /validate entry/i }));

    expect(screen.getByRole("alert")).toHaveTextContent(/slug is required/i);
    expect(screen.getByRole("alert")).toHaveTextContent(/title is required/i);
    expect(screen.getByRole("alert")).toHaveTextContent(/summary is required/i);
    expect(screen.getByRole("alert")).toHaveTextContent(/at least one tag is required/i);
    expect(screen.getByRole("alert")).toHaveTextContent(/year is required/i);
    expect(screen.getByRole("alert")).toHaveTextContent(/role label is required/i);
    expect(screen.getByRole("alert")).toHaveTextContent(/primary url is required/i);
  });

  it("updates the product snippet and preview content from the studio form", async () => {
    const user = userEvent.setup();

    renderRoute(["/studio"]);

    await user.type(screen.getByLabelText(/^slug$/i), "motion-archive");
    await user.type(screen.getByLabelText(/^title$/i), "Motion Archive");
    await user.type(
      screen.getByLabelText(/^summary$/i),
      "An editorial collection for experiments in animation systems."
    );
    await user.type(screen.getByLabelText(/^tags$/i), "React, Motion");

    const previewHeading = screen.getByRole("heading", { level: 3, name: /motion archive/i });

    expect(previewHeading).toBeInTheDocument();
    expect(
      within(previewHeading.closest("article")!).getByText(
        /an editorial collection for experiments in animation systems\./i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/slug: "motion-archive"/i)).toBeInTheDocument();
    expect(screen.getByText(/tags: \["React", "Motion"\]/i)).toBeInTheDocument();
  });

  it("updates the research snippet and preview content from the studio form", async () => {
    const user = userEvent.setup();

    renderRoute(["/studio"]);

    await user.click(screen.getByRole("tab", { name: /research/i }));
    await user.type(screen.getByLabelText(/^slug$/i), "v2g-anomaly-detection");
    await user.type(screen.getByLabelText(/^title$/i), "V2G Anomaly Detection");
    await user.type(
      screen.getByLabelText(/^summary$/i),
      "A leakage-aware anomaly detection study for charging environments."
    );
    await user.type(screen.getByLabelText(/^tags$/i), "Research, ML");
    await user.type(screen.getByLabelText(/^year$/i), "2026");
    await user.type(screen.getByLabelText(/^role label$/i), "2-person team");
    await user.type(screen.getByLabelText(/^primary url$/i), "https://github.com/simenzzz/IntroML");

    const previewHeading = screen.getByRole("heading", {
      level: 3,
      name: /v2g anomaly detection/i
    });

    expect(previewHeading).toBeInTheDocument();
    expect(
      within(previewHeading.closest("article")!).getByText(
        /a leakage-aware anomaly detection study for charging environments\./i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/year: "2026"/i)).toBeInTheDocument();
    expect(screen.getByText(/roleLabel: "2-person team"/i)).toBeInTheDocument();
    expect(screen.getByText(/primaryUrl: "https:\/\/github\.com\/simenzzz\/IntroML"/i)).toBeInTheDocument();
  });
});
