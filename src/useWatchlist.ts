import { useEffect, useState } from "react";
import { movies } from "./movies";

const storageKey = "moviedux.watchlist";
const storageWarning =
  "Your watchlist is available for this visit, but could not be saved. Allow browser storage to keep it after reloading.";

function parseWatchlist(value: string | null): number[] {
  const parsed: unknown = value === null ? [] : JSON.parse(value);

  if (!Array.isArray(parsed)) {
    throw new Error("Invalid watchlist");
  }

  return [
    ...new Set(
      parsed.filter(
        (identifier: unknown): identifier is number =>
          typeof identifier === "number" &&
          movies.some((movie) => movie.id === identifier),
      ),
    ),
  ];
}

function loadWatchlist() {
  try {
    return {
      watchlist: parseWatchlist(window.localStorage.getItem(storageKey)),
      warning: "",
    };
  } catch {
    return {
      watchlist: [],
      warning:
        "Your saved watchlist could not be read. Add a movie to start a new one.",
    };
  }
}

export function useWatchlist() {
  const [state, setState] = useState(loadWatchlist);

  useEffect(() => {
    function syncWatchlist(event: StorageEvent) {
      if (event.key !== storageKey && event.key !== null) {
        return;
      }

      try {
        if (event.storageArea !== window.localStorage) {
          return;
        }

        setState({ watchlist: parseWatchlist(event.newValue), warning: "" });
      } catch {
        setState((previous) => ({
          ...previous,
          warning:
            "Another tab changed the saved watchlist, but it could not be read. Your current list is still available.",
        }));
      }
    }

    window.addEventListener("storage", syncWatchlist);
    return () => window.removeEventListener("storage", syncWatchlist);
  }, []);

  function toggleWatchlist(movieId: number) {
    const watchlist = state.watchlist.includes(movieId)
      ? state.watchlist.filter((identifier) => identifier !== movieId)
      : [...state.watchlist, movieId];

    try {
      window.localStorage.setItem(storageKey, JSON.stringify(watchlist));
      setState({ watchlist, warning: "" });
    } catch {
      setState({ watchlist, warning: storageWarning });
    }
  }

  return { ...state, toggleWatchlist };
}
