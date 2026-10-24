import { RunListItem } from "./RunListItem";
import styles from "./RunList.module.css";

export function RunList({ runs, onSelect }) {
  return (
    <div>
      <div className={styles.header} aria-hidden="true">
        <span>Run</span>
        <span>Repository</span>
        <span>Status</span>
        <span>Created</span>
        <span>Duration</span>
      </div>
      <ul className={styles.list}>
        {runs.map((run) => (
          <li key={run.id}>
            <RunListItem run={run} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
}
