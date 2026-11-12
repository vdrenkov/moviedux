import { useEffect, useRef } from "react";
import { NavLink, Link, Route, Routes, useLocation } from "react-router";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import Watchlist from "./components/Watchlist";
import { movies } from "./movies";
import { useWatchlist } from "./useWatchlist";

export default function App() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);
  const main = useRef<HTMLElement>(null);
  const { watchlist, warning, toggleWatchlist } = useWatchlist();
  const movieListProps = { movies, watchlist, toggleWatchlist };

  useEffect(() => {
    document.title =
      pathname === "/"
        ? "Moviedux | Movie Explorer"
        : pathname === "/watchlist"
          ? "Your Watchlist | Moviedux"
          : "Page not found | Moviedux";

    if (previousPath.current !== pathname) {
      main.current?.focus();
      previousPath.current = pathname;
    }
  }, [pathname]);

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to movies
      </a>
      <div className="container">
        <Header />
        <nav aria-label="Primary">
          <NavLink to="/" end>
            Explore movies
          </NavLink>
          <NavLink to="/watchlist">
            Watchlist <span className="count">{watchlist.length}</span>
          </NavLink>
        </nav>
        {warning && (
          <p role="status" className="storage-warning">
            {warning}
          </p>
        )}
        <main ref={main} id="main" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<MoviesGrid {...movieListProps} />} />
            <Route
              path="/watchlist"
              element={<Watchlist {...movieListProps} />}
            />
            <Route
              path="*"
              element={
                <section className="empty-state">
                  <h1>Page not found</h1>
                  <p>There are plenty of stories waiting on the home page.</p>
                  <Link to="/">Explore movies</Link>
                </section>
              }
            />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}
