import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";

import App from "../../App";

const WATCHLIST_STORAGE_KEY = "moviedux.watchlist";

const movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Fantasy",
    rating: "8.6",
    image: "7.jpg",
  },
  {
    id: 2,
    title: "Nightcrawler",
    genre: "Drama",
    rating: "7.9",
    image: "2.jpg",
  },
];

describe("App", () => {
  afterEach(() => {
    globalThis.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("loads movies from /movies.json and renders home grid", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => movies,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Interstellar")).toBeInTheDocument();
    expect(screen.getByText("Nightcrawler")).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledWith("/movies.json");
  });

  it("persists watchlist state when navigating between routes", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => movies,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(
      await screen.findByRole("checkbox", {
        name: "Add Interstellar to watchlist",
      }),
    );

    fireEvent.click(screen.getByRole("link", { name: "Watchlist" }));

    expect(await screen.findByText("Your Watchlist")).toBeInTheDocument();
    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(screen.queryByText("Nightcrawler")).not.toBeInTheDocument();
  });

  it("hydrates watchlist from localStorage on reload", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => movies,
    });
    globalThis.localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify([1]));

    render(
      <MemoryRouter initialEntries={["/watchlist"]}>
        <App />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Interstellar")).toBeInTheDocument();
    expect(screen.queryByText("Nightcrawler")).not.toBeInTheDocument();
  });

  it("writes watchlist changes to localStorage", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => movies,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    fireEvent.click(
      await screen.findByRole("checkbox", {
        name: "Add Interstellar to watchlist",
      }),
    );

    await waitFor(() => {
      expect(globalThis.localStorage.getItem(WATCHLIST_STORAGE_KEY)).toBe(
        "[1]",
      );
    });
  });

  it("falls back to an empty watchlist for invalid localStorage data", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => movies,
    });
    globalThis.localStorage.setItem(WATCHLIST_STORAGE_KEY, "{bad-json");

    render(
      <MemoryRouter initialEntries={["/watchlist"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText("You have no saved movies yet."),
    ).toBeInTheDocument();
  });

  it("shows empty watchlist state when no movies are selected", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      json: async () => movies,
    });

    render(
      <MemoryRouter initialEntries={["/watchlist"]}>
        <App />
      </MemoryRouter>,
    );

    expect(
      await screen.findByText("You have no saved movies yet."),
    ).toBeInTheDocument();
  });
});
