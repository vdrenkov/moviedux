import type { SyntheticEvent } from "react";
import type { Movie } from "../movies";

export default function MovieCard({
  movie,
  isWatchlisted,
  toggleWatchlist,
}: {
  movie: Movie;
  isWatchlisted: boolean;
  toggleWatchlist: (movieId: number) => void;
}) {
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    if (!event.currentTarget.src.endsWith("/images/default.jpg")) {
      event.currentTarget.src = "/images/default.jpg";
    }
  };
  const watchlistControlId = `watchlist-${movie.id}`;
  const watchlistLabel = isWatchlisted
    ? `Remove ${movie.title} from watchlist`
    : `Add ${movie.title} to watchlist`;

  const getRatingClass = (rating: number) => {
    if (rating >= 8) {
      return "rating-good";
    }

    if (rating >= 5) {
      return "rating-ok";
    }

    return "rating-bad";
  };

  return (
    <article className="movie-card">
      <img
        src={`/images/${movie.image}`}
        alt={movie.title}
        onError={handleImageError}
        width="320"
        height="480"
        loading="lazy"
        decoding="async"
      />
      <div className="movie-card-info">
        <h2 className="movie-card-title">{movie.title}</h2>

        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span
            className={`movie-card-rating ${getRatingClass(movie.rating)}`}
            aria-label={`Rating ${movie.rating} out of 10`}
          >
            {movie.rating}
          </span>
        </div>

        <label className="save-control" htmlFor={watchlistControlId}>
          <input
            id={watchlistControlId}
            type="checkbox"
            aria-label={watchlistLabel}
            checked={isWatchlisted}
            onChange={() => toggleWatchlist(movie.id)}
          />
          <span aria-hidden="true">
            {isWatchlisted ? "In your watchlist" : "Add to watchlist"}
          </span>
        </label>
      </div>
    </article>
  );
}
