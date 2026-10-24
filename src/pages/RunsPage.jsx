import { useCallback, useMemo, useState } from "react";
import { RunDetailsDrawer } from "../components/runs/RunDetailsDrawer";
import { RunFilters } from "../components/runs/RunFilters";
import { RunList } from "../components/runs/RunList";
import { RunSearch } from "../components/runs/RunSearch";
import { RunsEmptyState } from "../components/runs/RunsEmptyState";
import { RunsErrorState } from "../components/runs/RunsErrorState";
import { RunsSkeleton } from "../components/runs/RunsSkeleton";
import { useRuns } from "../hooks/useRuns";
import { filterRuns } from "../utils/filterRuns";
import styles from "./RunsPage.module.css";

export function RunsPage() {
  const { runs, status, error, retry } = useRuns();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRunId, setSelectedRunId] = useState(null);

  const visibleRuns = useMemo(
    () => filterRuns(runs, { query, status: statusFilter }),
    [query, runs, statusFilter],
  );

  const closeDetails = useCallback(() => {
    setSelectedRunId(null);
  }, []);

  function resetFilters() {
    setQuery("");
    setStatusFilter("all");
  }

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Recent runs</h1>
      <p className={styles.lead}>
        Review AI agent runs, then filter and inspect a single run.
      </p>

      {status === "error" ? (
        <RunsErrorState message={error} onRetry={retry} />
      ) : (
        <>
          <div className={styles.toolbar}>
            <RunSearch value={query} onChange={setQuery} />
            <RunFilters value={statusFilter} onChange={setStatusFilter} />
          </div>

          {status === "loading" ? (
            <RunsSkeleton />
          ) : visibleRuns.length === 0 ? (
            <RunsEmptyState onReset={resetFilters} />
          ) : (
            <>
              <p className={styles.summary}>
                {visibleRuns.length} of {runs.length} runs
              </p>
              <RunList runs={visibleRuns} onSelect={setSelectedRunId} />
            </>
          )}
        </>
      )}

      {selectedRunId ? (
        <RunDetailsDrawer
          runId={selectedRunId}
          onClose={closeDetails}
        />
      ) : null}
    </section>
  );
}
