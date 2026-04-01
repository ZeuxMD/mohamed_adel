import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Header from "./Header";

describe("Header", () => {
  it("renders hero content with a scene layer inside the hero", () => {
    render(
      <Header
        refProps={null}
        projectsRef={{ current: document.createElement("div") }}
        handleNavigate={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "I'm Mohamed" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "See my work" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText("my-photo")).toBeInTheDocument();
    expect(screen.getByTestId("hero-scene")).toBeInTheDocument();
  });
});
