import styles from "./RunFilters.module.css";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "queued", label: "Queued" },
  { id: "running", label: "Running" },
  { id: "succeeded", label: "Succeeded" },
  { id: "failed", label: "Failed" },
];

export function RunFilters({ value, onChange }) {
  return (
    <div className={styles.group}>
      <span className={styles.label} id="status-filter-label">
        Status
      </span>
      <div
        className={styles.list}
        role="group"
        aria-labelledby="status-filter-label"
      >
        {FILTERS.map((filter) => (
          <button
            key={filter.id}
            type="button"
            className={value === filter.id ? styles.active : styles.button}
            aria-pressed={value === filter.id}
            onClick={() => onChange(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}
