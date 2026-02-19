import "../styles.css";

export default function MovieCard({ movie, isWatchlisted, toggleWatchlist }) {
  const handleImageError = (event) => {
    event.target.src = "/images/default.jpg";
  };
  const watchlistControlId = `watchlist-${movie.id}`;
  const watchlistLabel = isWatchlisted
    ? `Remove ${movie.title} from watchlist`
    : `Add ${movie.title} to watchlist`;

  const getRatingClass = (rating) => {
    if (rating >= 8) return "rating-good";

    if (rating >= 5 && rating < 8) return "rating-ok";

    return "rating-bad";
  };

  return (
    <div className="movie-card">
      <img
        src={`/images/${movie.image}`}
        alt={movie.title}
        onError={handleImageError}
      />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>

        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>

        <label className="switch" htmlFor={watchlistControlId}>
          <span className="sr-only">{watchlistLabel}</span>
          <input
            id={watchlistControlId}
            type="checkbox"
            aria-label={watchlistLabel}
            checked={isWatchlisted}
            onChange={() => toggleWatchlist(movie.id)}
          />
          <span className="slider">
            <span className="slider-label" aria-hidden="true">
              {isWatchlisted ? "In Watchlist" : "Add to watchlist"}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
