import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { movies } from "../../movies";

describe("catalog", () => {
  it("catalog_localEntries_haveUniqueIdsAndValidRatings", () => {
    expect(new Set(movies.map((movie) => movie.id)).size).toBe(movies.length);
    for (const movie of movies) {
      expect(Number.isSafeInteger(movie.id) && movie.id > 0).toBe(true);
      expect(movie.title.trim().length).toBeGreaterThan(0);
      expect(movie.rating).toBeGreaterThanOrEqual(0);
      expect(movie.rating).toBeLessThanOrEqual(10);
    }
  });

  it.each(movies)("catalog_posterExists_$title", (movie) => {
    expect(movie.image).toMatch(/^\d+\.jpg$/);
    expect(existsSync(resolve("public/images", movie.image))).toBe(true);
  });

  it("catalog_fallbackPoster_exists", () => {
    expect(existsSync(resolve("public/images/default.jpg"))).toBe(true);
  });
});
