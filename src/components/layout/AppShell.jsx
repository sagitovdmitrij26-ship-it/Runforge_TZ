import styles from "./AppShell.module.css";

const NAV_ITEMS = [
  "Runs",
  "Projects",
  "Devboxes",
  "Previews",
  "Snapshots",
  "Settings",
];

export function AppShell({ children }) {
  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <p className={styles.brand}>Runforge</p>
        <nav className={styles.nav} aria-label="Workspace">
          {NAV_ITEMS.map((item) => (
            <button
              key={item}
              type="button"
              className={item === "Runs" ? styles.navItemActive : styles.navItem}
              aria-current={item === "Runs" ? "page" : undefined}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <div>
            <div className={styles.projectLabel}>Project</div>
            <div className={styles.projectName}>web-platform</div>
          </div>
          <span className={styles.live}>Live</span>
        </header>
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}
