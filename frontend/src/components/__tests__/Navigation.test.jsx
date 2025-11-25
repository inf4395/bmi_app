import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "../Navigation";
import { AuthProvider } from "../../context/AuthContext";

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("Navigation Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders navigation links", () => {
    // Set a mock user in localStorage
    localStorage.setItem("bmi_app_user", JSON.stringify({ id: 1, name: "Test User" }));
    localStorage.setItem("bmi_app_token", "mock-token");
    
    renderWithRouter(<Navigation />);
    
    expect(screen.getByText("BMI Tracker")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("BMI Rechner")).toBeInTheDocument();
    expect(screen.getByText("Statistiken")).toBeInTheDocument();
    expect(screen.getByText("Programme")).toBeInTheDocument();
    expect(screen.getByText("Profil")).toBeInTheDocument();
  });

  it("displays user name when logged in", () => {
    localStorage.setItem("bmi_app_user", JSON.stringify({ id: 1, name: "John Doe" }));
    localStorage.setItem("bmi_app_token", "mock-token");
    
    renderWithRouter(<Navigation />);
    
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});

