import React from "react";
import { render, screen } from "@testing-library/react";
import Portfolio from "../Portfolio";

describe("Portfolio Component Security", () => {
  it('should use rel="noopener noreferrer" for all external links', () => {
    render(<Portfolio />);

    // Select all links in the component
    const links = screen.getAllByRole("link");

    // There should be at least one link to test
    expect(links.length).toBeGreaterThan(0);

    // Check every link to ensure it has target="_blank" and rel="noopener noreferrer"
    links.forEach(link => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
