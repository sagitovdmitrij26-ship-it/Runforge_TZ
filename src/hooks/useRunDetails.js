import { useCallback, useEffect, useState } from "react";
import { getRunById } from "../api/runsApi";

export function useRunDetails(runId) {
  const [run, setRun] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!runId) {
      setRun(null);
      setStatus("idle");
      setError("");
      return undefined;
    }

    let cancelled = false;

    async function loadRun() {
      setStatus("loading");
      setError("");

      try {
        const data = await getRunById(runId);

        if (!cancelled) {
          setRun(data);
          setStatus("success");
        }
      } catch (loadError) {
        if (!cancelled) {
          setRun(null);
          setError(loadError.message);
          setStatus("error");
        }
      }
    }

    loadRun();

    return () => {
      cancelled = true;
    };
  }, [reloadKey, runId]);

  const retry = useCallback(() => {
    setReloadKey((current) => current + 1);
  }, []);

  return { run, status, error, retry };
}
