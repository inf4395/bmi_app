import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../Login";
import { AuthProvider } from "../../context/AuthContext";

// Mock useNavigate
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

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

describe("LoginPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders login form", () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText("Anmeldung")).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail-Adresse/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Passwort/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Einloggen/i })).toBeInTheDocument();
  });

  it("shows link to registration page", () => {
    renderWithProviders(<LoginPage />);
    const registerLink = screen.getByRole("link", { name: /Jetzt registrieren/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute("href", "/registrierung");
  });

  it("submits login form with valid credentials", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      user: { id: 1, name: "Test User", email: "test@example.com" },
      token: "mock-token",
    };

    // eslint-disable-next-line no-undef
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    renderWithProviders(<LoginPage />);

    await user.type(screen.getByLabelText(/E-Mail-Adresse/i), "test@example.com");
    await user.type(screen.getByLabelText(/Passwort/i), "password123");
    await user.click(screen.getByRole("button", { name: /Einloggen/i }));

    await waitFor(() => {
      // eslint-disable-next-line no-undef
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("/auth/login"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
          }),
        })
      );
    });
  });

  it("displays error message on login failure", async () => {
    const user = userEvent.setup();

    // Mock fetch to return an error response
    // eslint-disable-next-line no-undef
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      json: async () => ({ error: "Ungültige Zugangsdaten." }),
    });

    renderWithProviders(<LoginPage />);

    await user.type(screen.getByLabelText(/E-Mail-Adresse/i), "test@example.com");
    await user.type(screen.getByLabelText(/Passwort/i), "wrong");
    
    // Submit the form
    const submitButton = screen.getByRole("button", { name: /Einloggen/i });
    await user.click(submitButton);

    // Wait for the error to appear - the AuthContext should set the error state
    // The error is set in the catch block of the request function
    // Use findByText which automatically waits for the element to appear
    const errorMessage = await screen.findByText(/Ungültige Zugangsdaten/i, {}, { timeout: 3000 });
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("error-message");
  });
});

