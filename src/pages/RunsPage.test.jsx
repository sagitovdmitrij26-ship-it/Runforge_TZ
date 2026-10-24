import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getRunById, getRuns } from "../api/runsApi";
import { RunsPage } from "./RunsPage";

vi.mock("../api/runsApi", () => ({
  getRuns: vi.fn(),
  getRunById: vi.fn(),
}));

const runs = [
  {
    id: "run-failed",
    name: "Snapshot preview build",
    repository: "web-platform",
    branch: "main",
    status: "failed",
    createdAt: "2026-10-23T18:22:00.000Z",
    durationSeconds: 96,
    logs: ["vite build"],
    result: "Build failed during static asset resolution.",
  },
  {
    id: "run-ok",
    name: "Fix checkout tests",
    repository: "payments",
    branch: "fix/checkout-flakes",
    status: "succeeded",
    createdAt: "2026-10-24T09:40:00.000Z",
    durationSeconds: 184,
    logs: ["12 tests passed, 0 failed"],
    result: "Checkout regression suite is green.",
  },
  {
    id: "run-running",
    name: "Auth refactor",
    repository: "web-platform",
    branch: "feature/auth-session",
    status: "running",
    createdAt: "2026-10-24T11:12:00.000Z",
    logs: ["Installing workspace dependencies"],
  },
];

async function renderLoadedPage() {
  render(<RunsPage />);
  expect(await screen.findByText("3 of 3 runs")).toBeInTheDocument();
}

describe("RunsPage", () => {
  beforeEach(() => {
    getRuns.mockResolvedValue(runs);
    getRunById.mockImplementation(async (id) => {
      const run = runs.find((item) => item.id === id);

      if (!run) {
        throw new Error(`Run ${id} was not found`);
      }

      return run;
    });
  });

  it("filters runs by status", async () => {
    const user = userEvent.setup();
    await renderLoadedPage();

    await user.click(screen.getByRole("button", { name: "Failed" }));

    expect(screen.getByText("1 of 3 runs")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Snapshot preview build/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Fix checkout tests/ }),
    ).not.toBeInTheDocument();
  });

  it("searches by run name or repository", async () => {
    const user = userEvent.setup();
    await renderLoadedPage();

    await user.type(screen.getByRole("searchbox", { name: "Search" }), "payments");

    expect(screen.getByText("1 of 3 runs")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Fix checkout tests/ }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Auth refactor/ }),
    ).not.toBeInTheDocument();
  });

  it("opens run details", async () => {
    const user = userEvent.setup();
    await renderLoadedPage();

    await user.click(screen.getByRole("button", { name: /Fix checkout tests/ }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Fix checkout tests" }),
    ).toBeInTheDocument();
    expect(screen.getByText("12 tests passed, 0 failed")).toBeInTheDocument();
    expect(
      screen.getByText("Checkout regression suite is green."),
    ).toBeInTheDocument();
  });
});
