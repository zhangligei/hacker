import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component Security", () => {
  it('should use rel="noopener noreferrer" for all external links', () => {
    const mockProps = {
      email: "test@example.com",
      devDotTo: "testuser",
      gitHub: "testuser",
      instagram: "testuser",
      linkedIn: "testuser",
      medium: "testuser",
      twitter: "testuser",
      youTube: "testuser",
      primaryColor: "#000",
      secondaryColor: "#fff",
    };

    render(<Footer {...mockProps} />);

    // Select all links in the component
    const links = screen.getAllByRole("link");

    // There should be at least one link to test
    expect(links.length).toBeGreaterThan(0);

    // Check every link to ensure it has target="_blank" and rel="noopener noreferrer"
    // with the exception of the mailto link which doesn't need it
    links.forEach(link => {
      if (!link.getAttribute('href').startsWith('mailto:')) {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    });
  });
});
