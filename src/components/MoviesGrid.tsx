import { useState } from "react";
import MovieCard from "./MovieCard";
import type { MovieListProps } from "../movies";

export default function MoviesGrid({
  movies,
  watchlist,
  toggleWatchlist,
}: MovieListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All Genres");
  const [rating, setRating] = useState("All Ratings");
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.trim().toLowerCase()) &&
      (genre === "All Genres" ||
        movie.genre.toLowerCase() === genre.toLowerCase()) &&
      (rating === "All Ratings" ||
        (rating === "Good" && movie.rating >= 8) ||
        (rating === "Ok" && movie.rating >= 5 && movie.rating < 8) ||
        (rating === "Bad" && movie.rating < 5)),
  );

  return (
    <section>
      <h1 className="title">Find your next movie</h1>
      <label htmlFor="movie-search">Search movies</label>
      <input
        id="movie-search"
        type="search"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label htmlFor="genre-filter">Genre</label>
          <select
            id="genre-filter"
            className="filter-dropdown"
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          >
            <option>All Genres</option>
            {[...new Set(movies.map((movie) => movie.genre.toLowerCase()))]
              .sort()
              .map((name) => (
                <option key={name} value={name}>
                  {name[0]!.toUpperCase() + name.slice(1)}
                </option>
              ))}
          </select>
        </div>
        <div className="filter-slot">
          <label htmlFor="rating-filter">Rating</label>
          <select
            id="rating-filter"
            className="filter-dropdown"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <option>All Ratings</option>
            <option value="Good">8 and above</option>
            <option value="Ok">5 to under 8</option>
            <option value="Bad">Under 5</option>
          </select>
        </div>
      </div>
      <p className="results-count" role="status">
        {filteredMovies.length}{" "}
        {filteredMovies.length === 1 ? "movie" : "movies"}
      </p>
      {filteredMovies.length === 0 ? (
        <div className="empty-state">
          <h2>No movies found</h2>
          <p>Try another title or reset your filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setGenre("All Genres");
              setRating("All Ratings");
            }}
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isWatchlisted={watchlist.includes(movie.id)}
              toggleWatchlist={toggleWatchlist}
            />
          ))}
        </div>
      )}
    </section>
  );
}
