import { useEffect, useRef } from "react";
import { StatusBadge } from "../status/StatusBadge";
import { useRunDetails } from "../../hooks/useRunDetails";
import { formatCreatedAt, formatDuration } from "../../utils/formatRun";
import styles from "./RunDetailsDrawer.module.css";

export function RunDetailsDrawer({ runId, onClose }) {
  const { run, status, error, retry } = useRunDetails(runId);
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="run-details-title"
      >
        <header className={styles.header}>
          <button
            ref={closeRef}
            className={styles.back}
            type="button"
            onClick={onClose}
          >
            Back to list
          </button>
          <div className={styles.titleRow}>
            <h2 id="run-details-title" className={styles.title}>
              {run?.name ?? "Run details"}
            </h2>
            {run ? <StatusBadge status={run.status} /> : null}
          </div>
        </header>

        <div className={styles.body}>
          {status === "loading" || status === "idle" ? (
            <div className={styles.center} role="status">
              Loading run details…
            </div>
          ) : null}

          {status === "error" ? (
            <div className={styles.center} role="alert">
              <p>{error}</p>
              <button className={styles.retry} type="button" onClick={retry}>
                Retry
              </button>
            </div>
          ) : null}

          {status === "success" && run ? <RunDetailsContent run={run} /> : null}
        </div>
      </aside>
    </>
  );
}

function RunDetailsContent({ run }) {
  return (
    <>
      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Repository</dt>
          <dd className={styles.metaValue}>{run.repository}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Branch</dt>
          <dd className={styles.metaValue}>{run.branch}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Created</dt>
          <dd className={styles.metaValue}>{formatCreatedAt(run.createdAt)}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt className={styles.metaLabel}>Duration</dt>
          <dd className={styles.metaValue}>
            {formatDuration(run.durationSeconds)}
          </dd>
        </div>
      </dl>

      <section>
        <h3 className={styles.sectionTitle}>Logs</h3>
        <div className={styles.logs}>
          {run.logs.map((line, index) => (
            <p key={`${run.id}-log-${index}`} className={styles.logLine}>
              {line}
            </p>
          ))}
        </div>
      </section>

      <section>
        <h3 className={styles.sectionTitle}>Result</h3>
        {run.result ? (
          <p className={styles.result}>{run.result}</p>
        ) : (
          <p className={styles.empty}>No result yet for this run.</p>
        )}
      </section>
    </>
  );
}
