import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Watchlist from "../../../components/Watchlist";

const movies = [
  { id: 1, title: "Action Hero", genre: "Action", rating: 8.4, image: "1.jpg" },
  { id: 2, title: "Drama Club", genre: "Drama", rating: 6.2, image: "2.jpg" },
];

describe("Watchlist", () => {
  it("watchlist_noMoviesSaved_showsEmptyState", () => {
    render(
      <Watchlist movies={movies} watchlist={[]} toggleWatchlist={vi.fn()} />,
    );

    expect(screen.getByText("You have no saved movies yet.")).not.toBeNull();
  });

  it("watchlist_unknownIdentifiers_rendersOnlyExistingMovies", () => {
    render(
      <Watchlist
        movies={movies}
        watchlist={[1, 999]}
        toggleWatchlist={vi.fn()}
      />,
    );

    expect(screen.getByText("Action Hero")).not.toBeNull();
    expect(screen.queryByText("Drama Club")).toBeNull();
    expect(screen.queryByText("You have no saved movies yet.")).toBeNull();
  });

  it("watchlist_savedOrder_preservesAdditionOrder", () => {
    render(
      <Watchlist
        movies={movies}
        watchlist={[2, 1]}
        toggleWatchlist={vi.fn()}
      />,
    );
    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(["Drama Club", "Action Hero"]);
  });
});
