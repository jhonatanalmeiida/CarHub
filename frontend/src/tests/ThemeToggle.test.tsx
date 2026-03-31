import { fireEvent, render, screen } from "@testing-library/react";

import { ThemeProvider } from "../contexts/ThemeContext";
import { ThemeToggle } from "../components/ui";

describe("ThemeToggle", () => {
  it("toggles the light theme class on document root", () => {
    document.documentElement.classList.remove("light");
    window.localStorage.removeItem("carhub.theme");

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(window.localStorage.getItem("carhub.theme")).toBe("light");
  });
});
