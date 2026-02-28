import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";

const WATCHLIST_STORAGE_KEY = "moviedux.watchlist";

function loadStoredWatchlist() {
  try {
    const storedValue = globalThis.localStorage.getItem(WATCHLIST_STORAGE_KEY);
    if (!storedValue) return [];

    const parsed = JSON.parse(storedValue);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((id) => Number.isInteger(id));
  } catch {
    return [];
  }
}

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState(loadStoredWatchlist);

  useEffect(() => {
    fetch("/movies.json")
      .then((response) => response.json())
      .then((data) =>
        setMovies(
          data.map((movie) => ({ ...movie, rating: Number(movie.rating) })),
        ),
      );
  }, []);

  useEffect(() => {
    try {
      globalThis.localStorage.setItem(
        WATCHLIST_STORAGE_KEY,
        JSON.stringify(watchlist),
      );
    } catch {
      // Ignore localStorage write errorss (for example private browsing restrictions).
    }
  }, [watchlist]);

  const toggleWatchlist = (movieId) => {
    setWatchlist((previous) =>
      previous.includes(movieId)
        ? previous.filter((id) => id !== movieId)
        : [...previous, movieId],
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header />

        <nav aria-label="Primary">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/watchlist">Watchlist</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <MoviesGrid
                movies={movies}
                watchlist={watchlist}
                toggleWatchlist={toggleWatchlist}
              />
            }
          />
          <Route
            path="/watchlist"
            element={
              <Watchlist
                movies={movies}
                watchlist={watchlist}
                toggleWatchlist={toggleWatchlist}
              />
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
