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
    expect(screen.getByRole("heading", { name: /applied work/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /research papers/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /deckgraph/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /lucubrum/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /realtime collaboration platform/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /v2g anomaly detection/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /uncertainty-routed 3-tier waf/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /deckgraph live demo/i })).toHaveAttribute(
      "href",
      "https://deckgraph-demo.onrender.com"
    );
    expect(screen.getByRole("link", { name: /realtime collaboration platform live demo/i })).toHaveAttribute(
      "href",
      "https://nexus.wizconsults.com"
    );
    expect(screen.getAllByText(/import a curated github repo/i).length).toBeGreaterThan(0);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens applied project details in a modal", async () => {
    const user = userEvent.setup();

    renderRoute(["/"]);

    await user.click(screen.getByRole("button", { name: /deckgraph/i }));

    const dialog = screen.getByRole("dialog", { name: /deckgraph details/i });

    expect(within(dialog).getByRole("heading", { name: /deckgraph/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/import a curated github repo/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /repository/i })).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /live demo/i })).toHaveAttribute(
      "href",
      "https://deckgraph-demo.onrender.com"
    );
  });

  it("opens realtime collaboration project details with the live demo link", async () => {
    const user = userEvent.setup();

    renderRoute(["/"]);

    await user.click(screen.getByRole("button", { name: /realtime collaboration platform/i }));

    const dialog = screen.getByRole("dialog", { name: /realtime collaboration platform details/i });

    expect(within(dialog).getByRole("heading", { name: /realtime collaboration platform/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/synchronized watch rooms/i)).toBeInTheDocument();
    expect(within(dialog).getByRole("link", { name: /live demo/i })).toHaveAttribute(
      "href",
      "https://nexus.wizconsults.com"
    );
  });

  it("opens research details in a modal and closes it", async () => {
    const user = userEvent.setup();

    renderRoute(["/"]);

    await user.click(screen.getByRole("button", { name: /uncertainty-routed 3-tier waf/i }));

    const dialog = screen.getByRole("dialog", { name: /uncertainty-routed 3-tier waf details/i });

    expect(within(dialog).getByRole("heading", { name: /uncertainty-routed 3-tier waf/i })).toBeInTheDocument();
    expect(within(dialog).getByText(/a waf should not force one detector/i)).toBeInTheDocument();
    expect(within(dialog).getAllByText(/0\.972/i).length).toBeGreaterThan(0);
    expect(within(dialog).getAllByText(/3\.04%/i).length).toBeGreaterThan(0);
    expect(within(dialog).getByText(/91\.6%/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/the evidence is csic-only/i)).toBeInTheDocument();
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
