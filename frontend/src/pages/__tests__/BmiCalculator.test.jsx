import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import BmiCalculator from "../BmiCalculator";
import { AuthProvider } from "../../context/AuthContext";

// Mock fetch
global.fetch = vi.fn();

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe("BmiCalculator", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    
    // Set up a mock user
    localStorage.setItem("bmi_app_user", JSON.stringify({ id: 1, name: "Test User", email: "test@example.com" }));
    localStorage.setItem("bmi_app_token", "mock-token");
  });

  it("renders BMI calculator form", () => {
    renderWithProviders(<BmiCalculator />);
    // Use getAllByText since "BMI Rechner" appears in navigation and heading
    expect(screen.getAllByText(/BMI Rechner/i).length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/Ihr Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail-Adresse/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Alter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Größe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gewicht/i)).toBeInTheDocument();
  });

  it("pre-fills form with user data", () => {
    renderWithProviders(<BmiCalculator />);
    // Use getByRole or getByDisplayValue since labels might not be properly associated
    const nameInput = screen.getByDisplayValue("Test User");
    const emailInput = screen.getByDisplayValue("test@example.com");
    
    expect(nameInput).toHaveValue("Test User");
    expect(emailInput).toHaveValue("test@example.com");
  });

  it("calculates and displays BMI result", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      bmi: "23.15",
      status: "Normalgewicht",
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    renderWithProviders(<BmiCalculator />);

    const heightInput = screen.getByPlaceholderText(/z\. B\. 180/i);
    const weightInput = screen.getByPlaceholderText(/z\. B\. 75/i);
    
    await user.type(heightInput, "180");
    await user.type(weightInput, "75");
    
    const submitButton = screen.getByRole("button", { name: /BMI berechnen/i });
    await user.click(submitButton);

    await waitFor(() => {
      // The result should be displayed somewhere in the component
      expect(screen.getByText(/Normalgewicht/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("displays error message on API failure", async () => {
    const user = userEvent.setup();

    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    renderWithProviders(<BmiCalculator />);

    const heightInput = screen.getByPlaceholderText(/z\. B\. 180/i) || screen.getByRole("spinbutton", { name: /Größe/i });
    const weightInput = screen.getByPlaceholderText(/z\. B\. 75/i) || screen.getByRole("spinbutton", { name: /Gewicht/i });
    
    await user.type(heightInput, "180");
    await user.type(weightInput, "75");
    
    const submitButton = screen.getByRole("button", { name: /BMI berechnen/i });
    await user.click(submitButton);

    await waitFor(() => {
      // Error message should appear
      const errorElement = screen.queryByText(/Fehler/i) || screen.queryByText(/Serverfehler/i);
      expect(errorElement).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("validates required fields", () => {
    renderWithProviders(<BmiCalculator />);

    // Use getByPlaceholderText since labels might not be properly associated
    const heightInput = screen.getByPlaceholderText(/z\. B\. 180/i);
    const weightInput = screen.getByPlaceholderText(/z\. B\. 75/i);
    
    expect(heightInput).toBeRequired();
    expect(weightInput).toBeRequired();
  });
});

