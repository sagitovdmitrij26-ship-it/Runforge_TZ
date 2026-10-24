import styles from "./StatusBadge.module.css";

const STATUS_META = {
  queued: { label: "Queued", mark: "○" },
  running: { label: "Running", mark: "●" },
  succeeded: { label: "Succeeded", mark: "✓" },
  failed: { label: "Failed", mark: "✕" },
};

export function StatusBadge({ status }) {
  const meta = STATUS_META[status] ?? STATUS_META.queued;

  return (
    <span className={`${styles.badge} ${styles[status] ?? styles.queued}`}>
      <span aria-hidden="true" className={styles.mark}>
        {meta.mark}
      </span>
      {meta.label}
    </span>
  );
}
