import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MovieCard from "../../../components/MovieCard";

const movie = {
  id: 7,
  title: "Interstellar",
  genre: "Fantasy",
  rating: 8.6,
  image: "7.jpg",
};

describe("MovieCard", () => {
  it("movieCard_highRating_rendersMovieAndScore", () => {
    render(
      <MovieCard
        movie={movie}
        isWatchlisted={false}
        toggleWatchlist={vi.fn()}
      />,
    );

    expect(screen.getByText("Interstellar")).not.toBeNull();
    expect(screen.getByText("Fantasy")).not.toBeNull();
    expect(screen.getByText("8.6").className).toContain("rating-good");
  });

  it("movieCard_middleRating_usesAmberScore", () => {
    render(
      <MovieCard
        movie={{ ...movie, rating: 6.4 }}
        isWatchlisted={false}
        toggleWatchlist={vi.fn()}
      />,
    );

    expect(screen.getByText("6.4").className).toContain("rating-ok");
  });

  it("movieCard_lowRating_usesRedScore", () => {
    render(
      <MovieCard
        movie={{ ...movie, rating: 3.1 }}
        isWatchlisted={false}
        toggleWatchlist={vi.fn()}
      />,
    );

    expect(screen.getByText("3.1").className).toContain("rating-bad");
  });

  it("movieCard_selectMovie_togglesItsIdentifier", () => {
    const toggleWatchlist = vi.fn();

    render(
      <MovieCard
        movie={movie}
        isWatchlisted={false}
        toggleWatchlist={toggleWatchlist}
      />,
    );

    fireEvent.click(
      screen.getByRole("checkbox", {
        name: "Add Interstellar to watchlist",
      }),
    );
    expect(toggleWatchlist).toHaveBeenCalledWith(7);
  });

  it("movieCard_imageLoadFails_usesFallback", () => {
    render(
      <MovieCard
        movie={movie}
        isWatchlisted={false}
        toggleWatchlist={vi.fn()}
      />,
    );

    const image = screen.getByRole("img", { name: "Interstellar" });
    fireEvent.error(image);

    expect(image.getAttribute("src")).toBe("/images/default.jpg");
  });
});
