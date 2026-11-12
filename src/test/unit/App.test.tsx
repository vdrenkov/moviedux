import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "../../App";

const storageKey = "moviedux.watchlist";

afterEach(() => {
  vi.restoreAllMocks();
  window.localStorage.clear();
});

describe("App", () => {
  it("catalog_initialVisit_rendersBundledMovies", () => {
    renderApp();
    expect(screen.getByText("Dark Storm")).not.toBeNull();
    expect(screen.getAllByRole("checkbox")).toHaveLength(20);
  });

  it("watchlist_routeChange_preservesSelection", () => {
    renderApp();
    fireEvent.click(
      screen.getByRole("checkbox", { name: "Add Dark Storm to watchlist" }),
    );
    fireEvent.click(screen.getByRole("link", { name: "Watchlist 1" }));
    expect(
      screen.getByRole("heading", { name: "Your Watchlist" }),
    ).not.toBeNull();
    expect(screen.getByText("Dark Storm")).not.toBeNull();
    expect(screen.queryByText("Whisper of Fate")).toBeNull();
    expect(window.localStorage.getItem(storageKey)).toBe("[1]");
    fireEvent.click(
      screen.getByRole("checkbox", {
        name: "Remove Dark Storm from watchlist",
      }),
    );
    expect(screen.getByText("You have no saved movies yet.")).not.toBeNull();
    expect(window.localStorage.getItem(storageKey)).toBe("[]");
  });

  it("watchlist_existingStorage_restoresSelection", () => {
    window.localStorage.setItem(storageKey, "[1]");
    renderApp("/watchlist");
    expect(screen.getByText("Dark Storm")).not.toBeNull();
    expect(screen.queryByText("Whisper of Fate")).toBeNull();
  });

  it.each(["{bad-json", "{}", '"not an array"'])(
    "watchlist_invalidStorage%s_showsRecoveryNotice",
    (value) => {
      window.localStorage.setItem(storageKey, value);
      renderApp();
      expect(
        screen.getByText(/saved watchlist could not be read/),
      ).not.toBeNull();
      fireEvent.click(
        screen.getByRole("checkbox", { name: "Add Dark Storm to watchlist" }),
      );
      expect(window.localStorage.getItem(storageKey)).toBe("[1]");
      expect(screen.queryByText(/could not be read/)).toBeNull();
    },
  );

  it("watchlist_invalidIdentifiers_ignoresUnknownAndDuplicateEntries", () => {
    window.localStorage.setItem(storageKey, '[1,1,999,"2",null,1.5,-1,2]');
    renderApp("/watchlist");
    expect(screen.getAllByRole("checkbox")).toHaveLength(2);
    expect(screen.getByRole("link", { name: "Watchlist 2" })).not.toBeNull();
  });

  it("watchlist_storageReadBlocked_keepsApplicationUsable", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("Blocked", "SecurityError");
    });
    renderApp();
    expect(
      screen.getByText(/saved watchlist could not be read/),
    ).not.toBeNull();
    expect(screen.getAllByRole("checkbox")).toHaveLength(20);
  });

  it("watchlist_storageWriteBlocked_keepsInMemorySelectionAndWarns", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("Full", "QuotaExceededError");
    });
    renderApp();
    fireEvent.click(
      screen.getByRole("checkbox", { name: "Add Dark Storm to watchlist" }),
    );
    expect(screen.getByText(/could not be saved/)).not.toBeNull();
    fireEvent.click(screen.getByRole("link", { name: "Watchlist 1" }));
    expect(screen.getByText("Dark Storm")).not.toBeNull();
  });

  it("watchlist_otherTabChange_updatesWithoutWritingBack", () => {
    renderApp("/watchlist");
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");
    act(() =>
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: storageKey,
          newValue: "[2]",
          storageArea: window.localStorage,
        }),
      ),
    );
    expect(screen.getByText("Whisper of Fate")).not.toBeNull();
    expect(storageSpy).not.toHaveBeenCalled();
    act(() =>
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: null,
          newValue: null,
          storageArea: window.localStorage,
        }),
      ),
    );
    expect(screen.getByText("You have no saved movies yet.")).not.toBeNull();
  });

  it("watchlist_invalidOtherTabChange_keepsCurrentSelection", () => {
    window.localStorage.setItem(storageKey, "[1]");
    renderApp("/watchlist");
    act(() =>
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: storageKey,
          newValue: "{",
          storageArea: window.localStorage,
        }),
      ),
    );
    expect(screen.getByText("Dark Storm")).not.toBeNull();
    expect(screen.getByRole("status").textContent).toContain("Another tab");
  });

  it("watchlist_unrelatedStorageChange_keepsCurrentSelection", () => {
    renderApp("/watchlist");
    act(() =>
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "unrelated",
          newValue: "[1]",
          storageArea: window.localStorage,
        }),
      ),
    );
    act(() =>
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: storageKey,
          newValue: "[1]",
          storageArea: window.sessionStorage,
        }),
      ),
    );
    expect(screen.getByText("You have no saved movies yet.")).not.toBeNull();
  });

  it("routing_unknownPath_showsRecoveryLink", () => {
    renderApp("/missing");
    expect(
      screen.getByRole("heading", { name: "Page not found" }),
    ).not.toBeNull();
    expect(
      screen.getAllByRole("link", { name: "Explore movies" }),
    ).toHaveLength(2);
  });
});

function renderApp(path = "/") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}
