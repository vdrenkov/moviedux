import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Watchlist from "../../../components/Watchlist";

const movies = [
  { id: 1, title: "Action Hero", genre: "Action", rating: 8.4, image: "1.jpg" },
  { id: 2, title: "Drama Club", genre: "Drama", rating: 6.2, image: "2.jpg" },
];

describe("Watchlist", () => {
  it("shows empty state when no movies are saved", () => {
    render(<Watchlist movies={movies} watchlist={[]} toggleWatchlist={vi.fn()} />);

    expect(screen.getByText("You have no saved movies yet.")).toBeInTheDocument();
  });

  it("renders only existing watchlisted movies and ignores missing ids", () => {
    render(
      <Watchlist movies={movies} watchlist={[1, 999]} toggleWatchlist={vi.fn()} />,
    );

    expect(screen.getByText("Action Hero")).toBeInTheDocument();
    expect(screen.queryByText("Drama Club")).not.toBeInTheDocument();
    expect(screen.queryByText("You have no saved movies yet.")).not.toBeInTheDocument();
  });
});
