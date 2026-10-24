import styles from "./RunsErrorState.module.css";

export function RunsErrorState({ message, onRetry }) {
  return (
    <div className={styles.panel} role="alert">
      <h2 className={styles.title}>Could not load runs</h2>
      <p className={styles.text}>{message}</p>
      <button className={styles.button} type="button" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}
