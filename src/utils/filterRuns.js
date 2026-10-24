export function filterRuns(runs, { query, status }) {
  const normalizedQuery = query.trim().toLowerCase();

  return runs.filter((run) => {
    const matchesStatus = status === "all" || run.status === status;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      run.name.toLowerCase().includes(normalizedQuery) ||
      run.repository.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
}
