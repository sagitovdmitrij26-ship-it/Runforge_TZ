import styles from "./RunsEmptyState.module.css";

export function RunsEmptyState({ onReset }) {
  return (
    <div className={styles.panel}>
      <h2 className={styles.title}>No runs found</h2>
      <p className={styles.text}>
        Nothing matches the current search or status filter.
      </p>
      <button className={styles.button} type="button" onClick={onReset}>
        Reset search and filters
      </button>
    </div>
  );
}
