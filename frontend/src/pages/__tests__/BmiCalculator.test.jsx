import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import BmiCalculator from "../BmiCalculator";
import { AuthProvider } from "../../context/AuthContext";

// Mock fetch
// eslint-disable-next-line no-undef
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
    expect(screen.getByText(/BMI Rechner/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Alter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Größe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gewicht/i)).toBeInTheDocument();
  });

  it("pre-fills form with user data", () => {
    renderWithProviders(<BmiCalculator />);
    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/E-Mail/i);
    
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

    // eslint-disable-next-line no-undef
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    renderWithProviders(<BmiCalculator />);

    await user.type(screen.getByLabelText(/Größe/i), "180");
    await user.type(screen.getByLabelText(/Gewicht/i), "75");
    
    const submitButton = screen.getByRole("button", { name: /BMI berechnen/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/BMI/i)).toBeInTheDocument();
      expect(screen.getByText(/Normalgewicht/i)).toBeInTheDocument();
    });
  });

  it("displays error message on API failure", async () => {
    const user = userEvent.setup();

    // eslint-disable-next-line no-undef
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    renderWithProviders(<BmiCalculator />);

    await user.type(screen.getByLabelText(/Größe/i), "180");
    await user.type(screen.getByLabelText(/Gewicht/i), "75");
    
    const submitButton = screen.getByRole("button", { name: /BMI berechnen/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Fehler/i)).toBeInTheDocument();
    });
  });

  it("validates required fields", async () => {
    const user = userEvent.setup();
    renderWithProviders(<BmiCalculator />);

    const heightInput = screen.getByLabelText(/Größe/i);
    const weightInput = screen.getByLabelText(/Gewicht/i);
    
    expect(heightInput).toBeRequired();
    expect(weightInput).toBeRequired();
  });
});

