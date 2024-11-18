// eslint-disable @typescript-eslint/no-explicit-any

import { useBotpressClientStore } from "@/stores";
import { useEffect, useState } from "react";

type UseFetchDataResult<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};

function useFetchData<T>(
  fn: (...args: any[]) => Promise<T>,
  deps: any[] = []
): UseFetchDataResult<T> {
  const botpressClient = useBotpressClientStore(
    (state) => state.botpressClient
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!botpressClient) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fn(botpressClient, ...deps);
        setData(result);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [...deps, botpressClient]);

  if (!botpressClient) return { loading, error, data };

  return { loading, error, data };
}

export default useFetchData;
