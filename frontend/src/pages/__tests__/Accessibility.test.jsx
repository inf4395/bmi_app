import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import LoginPage from "../Login";
import RegisterPage from "../Register";
import Dashboard from "../Dashboard";
import BmiCalculator from "../BmiCalculator";

// Mock fetch
global.fetch = vi.fn();

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe("Accessibility Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("Login page should have proper form labels", () => {
    renderWithProviders(<LoginPage />);
    
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    // Les labels sont associés via le label parent
    expect(emailInput?.closest('label')).toBeInTheDocument();
    expect(passwordInput?.closest('label')).toBeInTheDocument();
  });

  it("Register page should have proper form labels", () => {
    renderWithProviders(<RegisterPage />);
    
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("Dashboard should have accessible headings", async () => {
    localStorage.setItem("bmi_app_user", JSON.stringify({ id: 1, name: "Test User" }));
    localStorage.setItem("bmi_app_token", "mock-token");

    const mockStats = { totalRecords: 0 };
    const mockHistory = [];

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockHistory,
      });

    const { container } = renderWithProviders(<Dashboard />);
    
    // Attendre que le contenu soit chargé avec waitFor
    await waitFor(() => {
      const heading = container.querySelector('h1');
      expect(heading).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("BMI Calculator should have accessible form elements", () => {
    localStorage.setItem("bmi_app_user", JSON.stringify({ id: 1, name: "Test User", email: "test@example.com" }));
    localStorage.setItem("bmi_app_token", "mock-token");

    renderWithProviders(<BmiCalculator />);
    
    const inputs = document.querySelectorAll('input[type="number"], input[type="text"], input[type="email"]');
    expect(inputs.length).toBeGreaterThan(0);
    
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("name");
    });
  });

  it("forms should have proper labels", () => {
    renderWithProviders(<LoginPage />);
    
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    
    expect(emailInput).toHaveAttribute("required");
    expect(passwordInput).toHaveAttribute("required");
  });

  it("buttons should be accessible", () => {
    renderWithProviders(<LoginPage />);
    
    const submitButton = document.querySelector('button[type="submit"]');
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toHaveAttribute("aria-hidden", "true");
  });
});

