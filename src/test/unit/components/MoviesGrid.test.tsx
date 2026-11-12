import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MoviesGrid from "../../../components/MoviesGrid";

const movies = [
  { id: 1, title: "Action Hero", genre: "Action", rating: 8.4, image: "1.jpg" },
  { id: 2, title: "Drama Club", genre: "Drama", rating: 6.2, image: "2.jpg" },
  { id: 3, title: "Nightmare", genre: "Horror", rating: 3.9, image: "3.jpg" },
];

describe("MoviesGrid", () => {
  it("moviesGrid_initialVisit_showsAllMovies", () => {
    render(
      <MoviesGrid movies={movies} watchlist={[]} toggleWatchlist={vi.fn()} />,
    );

    expect(screen.getByText("Action Hero")).not.toBeNull();
    expect(screen.getByText("Drama Club")).not.toBeNull();
    expect(screen.getByText("Nightmare")).not.toBeNull();
  });

  it("moviesGrid_searchTitle_filtersCaseInsensitively", () => {
    render(
      <MoviesGrid movies={movies} watchlist={[]} toggleWatchlist={vi.fn()} />,
    );

    fireEvent.change(screen.getByPlaceholderText("Search movies..."), {
      target: { value: " DRAMA " },
    });

    expect(screen.queryByText("Action Hero")).toBeNull();
    expect(screen.getByText("Drama Club")).not.toBeNull();
    expect(screen.queryByText("Nightmare")).toBeNull();
  });

  it("moviesGrid_genreAndRating_combinesFilters", () => {
    render(
      <MoviesGrid movies={movies} watchlist={[]} toggleWatchlist={vi.fn()} />,
    );

    fireEvent.change(screen.getByLabelText("Genre"), {
      target: { value: "action" },
    });
    fireEvent.change(screen.getByLabelText("Rating"), {
      target: { value: "Good" },
    });

    expect(screen.getByText("Action Hero")).not.toBeNull();
    expect(screen.queryByText("Drama Club")).toBeNull();
    expect(screen.queryByText("Nightmare")).toBeNull();
  });

  it("moviesGrid_noResults_resetsAllFilters", () => {
    render(
      <MoviesGrid movies={movies} watchlist={[]} toggleWatchlist={vi.fn()} />,
    );
    fireEvent.change(screen.getByLabelText("Genre"), {
      target: { value: "drama" },
    });
    fireEvent.change(screen.getByLabelText("Rating"), {
      target: { value: "Bad" },
    });
    fireEvent.change(screen.getByLabelText("Search movies"), {
      target: { value: "missing" },
    });
    expect(
      screen.getByRole("heading", { name: "No movies found" }),
    ).not.toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Reset filters" }));
    expect(screen.getAllByRole("article")).toHaveLength(3);
    expect(screen.getByRole("status").textContent).toBe("3 movies");
  });

  it.each([
    ["Good", [8, 10]],
    ["Ok", [5, 7.9]],
    ["Bad", [0, 4.9]],
  ])(
    "moviesGrid_ratingBoundary%s_includesCorrectScores",
    (rating, expectedScores) => {
      const scores = [0, 4.9, 5, 7.9, 8, 10];
      render(
        <MoviesGrid
          movies={scores.map((score) => ({
            id: score,
            title: `Score ${score}`,
            genre: "Drama",
            rating: score,
            image: "1.jpg",
          }))}
          watchlist={[]}
          toggleWatchlist={vi.fn()}
        />,
      );
      fireEvent.change(screen.getByLabelText("Rating"), {
        target: { value: rating },
      });
      expect(screen.getAllByRole("article")).toHaveLength(2);
      for (const score of expectedScores) {
        expect(
          screen.getByRole("heading", { name: `Score ${score}` }),
        ).not.toBeNull();
      }
    },
  );
});
