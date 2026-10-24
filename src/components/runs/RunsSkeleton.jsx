import styles from "./RunsSkeleton.module.css";

export function RunsSkeleton() {
  return (
    <div className={styles.list} role="status" aria-live="polite">
      <span className="visually-hidden">Loading runs</span>
      <div className={styles.row} />
      <div className={styles.row} />
      <div className={styles.row} />
      <div className={styles.row} />
    </div>
  );
}
