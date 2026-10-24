import styles from "./RunSearch.module.css";

export function RunSearch({ value, onChange }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>Search</span>
      <input
        className={styles.input}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by run name or repository"
      />
    </label>
  );
}
