import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../Home";

describe("Home Component Security (XSS Prevention)", () => {
  it("should escape malicious payloads and prevent XSS in the Home component", () => {
    // Malicious payload simulating a Cross-Site Scripting (XSS) attack
    const maliciousPayload = "<script>alert('XSS Attack!')</script>";
    const maliciousTitle = "<img src=x onerror=alert('XSS') />";

    render(<Home name={maliciousPayload} title={maliciousTitle} />);

    // Check that the text is rendered correctly as text, not executed as HTML
    // React automatically escapes string variables placed in braces {}
    const nameElement = screen.getByText(maliciousPayload);
    const titleElement = screen.getByText(maliciousTitle);

    expect(nameElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();

    // We expect the literal strings to be in the document's innerHTML,
    // but correctly escaped by React (so no actual <script> or <img> tags)
    // Here we query for elements that might have been created if XSS was successful

    // Check there are no script tags inside the home section
    const homeSection = document.getElementById('home');
    const scripts = homeSection.getElementsByTagName('script');
    expect(scripts.length).toBe(0);

    // Check there are no image elements with dangerous inline event handlers
    const dangerousImages = homeSection.querySelectorAll('img[onerror]');
    expect(dangerousImages.length).toBe(0);
  });
});
