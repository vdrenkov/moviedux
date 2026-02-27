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
  it("renders movie info and rating class", () => {
    render(
      <MovieCard movie={movie} isWatchlisted={false} toggleWatchlist={vi.fn()} />,
    );

    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(screen.getByText("Fantasy")).toBeInTheDocument();
    expect(screen.getByText("8.6")).toHaveClass("rating-good");
  });

  it("calls toggleWatchlist with movie id", () => {
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

  it("falls back to default image when image fails to load", () => {
    render(
      <MovieCard movie={movie} isWatchlisted={false} toggleWatchlist={vi.fn()} />,
    );

    const image = screen.getByRole("img", { name: "Interstellar" });
    fireEvent.error(image);

    expect(image.getAttribute("src")).toBe("/images/default.jpg");
  });
});
