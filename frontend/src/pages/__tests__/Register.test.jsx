import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "../Register";
import { AuthProvider } from "../../context/AuthContext";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock fetch
global.fetch = vi.fn();

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe("RegisterPage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it("renders registration form", () => {
    renderWithProviders(<RegisterPage />);
    expect(screen.getByText("Registrierung")).toBeInTheDocument();
    expect(screen.getByLabelText(/Ihr Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/E-Mail-Adresse/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Passwort/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Konto erstellen/i })).toBeInTheDocument();
  });

  it("shows link to login page", () => {
    renderWithProviders(<RegisterPage />);
    const loginLink = screen.getByRole("link", { name: /Jetzt anmelden/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/anmeldung");
  });

  it("submits registration form with valid data", async () => {
    const user = userEvent.setup();
    const mockResponse = {
      user: { id: 1, name: "New User", email: "new@example.com" },
      token: "mock-token",
    };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    renderWithProviders(<RegisterPage />);

    await user.type(screen.getByLabelText(/Ihr Name/i), "New User");
    await user.type(screen.getByLabelText(/E-Mail-Adresse/i), "new@example.com");
    await user.type(screen.getByLabelText(/Passwort/i), "password123");
    await user.click(screen.getByRole("button", { name: /Konto erstellen/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("/auth/register"),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "New User",
            email: "new@example.com",
            password: "password123",
          }),
        })
      );
    });
  });

  it("validates password minimum length", async () => {
    const user = userEvent.setup();
    renderWithProviders(<RegisterPage />);

    const passwordInput = screen.getByLabelText(/Passwort/i);
    await user.type(passwordInput, "12345"); // Less than 6 characters

    expect(passwordInput).toHaveAttribute("minLength", "6");
  });
});

