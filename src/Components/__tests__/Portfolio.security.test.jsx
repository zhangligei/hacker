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

    // Check every link to ensure it has target="_blank" and secure rel tokens
    links.forEach(link => {
      expect(link).toHaveAttribute("target", "_blank");
      const rel = link.getAttribute("rel") || "";
      const relTokens = rel.split(/\s+/).filter(Boolean);
      expect(relTokens).toContain("noopener");
      expect(relTokens).toContain("noreferrer");
    });
  });
});
