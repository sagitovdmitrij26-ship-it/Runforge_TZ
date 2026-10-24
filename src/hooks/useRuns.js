import { useCallback, useEffect, useState } from "react";
import { getRuns } from "../api/runsApi";

export function useRuns() {
  const [runs, setRuns] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function loadRuns() {
      setStatus("loading");
      setError("");

      try {
        const data = await getRuns();

        if (!cancelled) {
          setRuns(data);
          setStatus("success");
        }
      } catch (loadError) {
        if (!cancelled) {
          setRuns([]);
          setError(loadError.message);
          setStatus("error");
        }
      }
    }

    loadRuns();

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const retry = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("error");
    window.history.replaceState({}, "", url);
    setReloadKey((current) => current + 1);
  }, []);

  return { runs, status, error, retry };
}
