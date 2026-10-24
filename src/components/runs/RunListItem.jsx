import { StatusBadge } from "../status/StatusBadge";
import { formatCreatedAt, formatDuration } from "../../utils/formatRun";
import styles from "./RunListItem.module.css";

export function RunListItem({ run, onSelect }) {
  return (
    <button
      className={styles.item}
      type="button"
      onClick={() => onSelect(run.id)}
    >
      <div className={styles.nameBlock}>
        <span className={styles.name}>{run.name}</span>
        <span className={styles.branch}>{run.branch}</span>
      </div>

      <div className={styles.repository}>
        <span className={styles.fieldLabel}>Repository</span>
        <span className={styles.meta}>{run.repository}</span>
      </div>

      <div className={styles.status}>
        <span className={styles.fieldLabel}>Status</span>
        <StatusBadge status={run.status} />
      </div>

      <div className={styles.created}>
        <span className={styles.fieldLabel}>Created</span>
        <span className={styles.meta}>{formatCreatedAt(run.createdAt)}</span>
      </div>

      <div className={styles.duration}>
        <span className={styles.fieldLabel}>Duration</span>
        <span className={styles.meta}>
          {formatDuration(run.durationSeconds)}
        </span>
      </div>
    </button>
  );
}
