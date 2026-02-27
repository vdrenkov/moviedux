import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import MoviesGrid from "../../../components/MoviesGrid";

const movies = [
  { id: 1, title: "Action Hero", genre: "Action", rating: 8.4, image: "1.jpg" },
  { id: 2, title: "Drama Club", genre: "Drama", rating: 6.2, image: "2.jpg" },
  { id: 3, title: "Nightmare", genre: "Horror", rating: 3.9, image: "3.jpg" },
];

describe("MoviesGrid", () => {
  it("shows all movies by default", () => {
    render(
      <MoviesGrid movies={movies} watchlist={[]} toggleWatchlist={vi.fn()} />,
    );

    expect(screen.getByText("Action Hero")).toBeInTheDocument();
    expect(screen.getByText("Drama Club")).toBeInTheDocument();
    expect(screen.getByText("Nightmare")).toBeInTheDocument();
  });

  it("filters movies by search term", () => {
    render(
      <MoviesGrid movies={movies} watchlist={[]} toggleWatchlist={vi.fn()} />,
    );

    fireEvent.change(screen.getByPlaceholderText("Search movies..."), {
      target: { value: "drama" },
    });

    expect(screen.queryByText("Action Hero")).not.toBeInTheDocument();
    expect(screen.getByText("Drama Club")).toBeInTheDocument();
    expect(screen.queryByText("Nightmare")).not.toBeInTheDocument();
  });

  it("filters by genre and rating", () => {
    render(
      <MoviesGrid movies={movies} watchlist={[]} toggleWatchlist={vi.fn()} />,
    );

    fireEvent.change(screen.getByLabelText("Genre"), {
      target: { value: "Action" },
    });
    fireEvent.change(screen.getByLabelText("Rating"), {
      target: { value: "Good" },
    });

    expect(screen.getByText("Action Hero")).toBeInTheDocument();
    expect(screen.queryByText("Drama Club")).not.toBeInTheDocument();
    expect(screen.queryByText("Nightmare")).not.toBeInTheDocument();
  });
});
