import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Footer from "../../../components/Footer";

describe("Footer", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("footer_currentDate_rendersCurrentYear", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-28T12:00:00Z"));

    render(<Footer />);

    expect(screen.getByText("© 2026 Moviedux")).not.toBeNull();
  });
});
