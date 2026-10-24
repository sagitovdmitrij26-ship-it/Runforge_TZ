import { mockRuns } from "../data/mockRuns";

const LOAD_DELAY_MS = 700;

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function shouldFailRequest() {
  return new URLSearchParams(window.location.search).get("error") === "1";
}

export async function getRuns() {
  await wait(LOAD_DELAY_MS);

  if (shouldFailRequest()) {
    throw new Error("Failed to load runs");
  }

  return mockRuns;
}

export async function getRunById(id) {
  await wait(LOAD_DELAY_MS);

  if (shouldFailRequest()) {
    throw new Error("Failed to load run details");
  }

  const run = mockRuns.find((item) => item.id === id);

  if (!run) {
    throw new Error(`Run ${id} was not found`);
  }

  return run;
}
