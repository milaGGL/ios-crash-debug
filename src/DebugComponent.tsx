import React, { useCallback } from "react";
import { fetchDocs, fetchDocsGradually } from "./api";

export const DebugComponent: React.FC = () => {
  const [count, setCount] = React.useState<string | number>(0);
  const [started, setStarted] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const startOnfetchDocs = useCallback(async (maxCount: number) => {
    setStarted(true);
    await fetchDocs(maxCount, setCount);
    setDone(true);
  }, []);
  const startOnfetchDocsGradually = useCallback(async (maxCount: number) => {
    setStarted(true);
    await fetchDocsGradually(maxCount, setCount);
    setDone(true);
  }, []);

  const reset = () => {
    setStarted(false);
    setDone(false);
    setCount(0);
  };

  return (
    <div>
      {started ? null : (
        <>
          <h4>Grab documents by number</h4>

          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[100, 500, 1000, 2000, 5000].map((maxCount) => {
              return (
                <li key={maxCount}>
                  <button onClick={() => startOnfetchDocs(maxCount)}>
                    click to load {maxCount} documents
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {started ? null : (
        <>
          <h4>Grab documents repeatedly by fetching 50 documents each time</h4>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {[100, 500, 1000, 2000, 5000].map((maxCount) => {
              return (
                <li key={maxCount}>
                  <button onClick={() => startOnfetchDocsGradually(maxCount)}>
                    click to load {maxCount} documents gradually
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
      {started ? <p>loaded documents: {count}</p> : null}

      {done && <h1>Finished!</h1>}
      {done && <button onClick={reset}>reset</button>}
    </div>
  );
};
