import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Profile from "../Profile";
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

describe("Profile", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    
    localStorage.setItem("bmi_app_user", JSON.stringify({ id: 1, name: "Test User", email: "test@example.com" }));
    localStorage.setItem("bmi_app_token", "mock-token");
  });

  it("renders profile form", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      gender: "männlich",
      birth_date: "1990-01-01",
      height: 180,
    };

    // eslint-disable-next-line no-undef
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    renderWithProviders(<Profile />);

    await waitFor(() => {
      expect(screen.getByText(/Mein Profil/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/E-Mail/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Geschlecht/i)).toBeInTheDocument();
    });
  });

  it("loads and displays user profile data", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
      gender: "männlich",
      birth_date: "1990-01-01",
      height: 180,
    };

    // eslint-disable-next-line no-undef
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    renderWithProviders(<Profile />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
      expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
    });
  });

  it("updates profile successfully", async () => {
    const user = userEvent.setup();
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
    };

    const updatedUser = {
      id: 1,
      name: "Updated Name",
      email: "updated@example.com",
      gender: "weiblich",
      height: 175,
    };

    // eslint-disable-next-line no-undef
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: mockUser }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: updatedUser, message: "Profil erfolgreich aktualisiert." }),
      });

    renderWithProviders(<Profile />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
    });

    const nameInput = screen.getByLabelText(/Name/i);
    await user.clear(nameInput);
    await user.type(nameInput, "Updated Name");

    const submitButton = screen.getByRole("button", { name: /Profil speichern/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/erfolgreich aktualisiert/i)).toBeInTheDocument();
    });
  });

  it("validates required fields", async () => {
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
    };

    // eslint-disable-next-line no-undef
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    renderWithProviders(<Profile />);

    await waitFor(() => {
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/E-Mail/i);
      
      expect(nameInput).toBeRequired();
      expect(emailInput).toBeRequired();
    });
  });

  it("displays error message on update failure", async () => {
    const user = userEvent.setup();
    const mockUser = {
      id: 1,
      name: "Test User",
      email: "test@example.com",
    };

    // eslint-disable-next-line no-undef
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ user: mockUser }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: "Fehler beim Aktualisieren" }),
      });

    renderWithProviders(<Profile />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test User")).toBeInTheDocument();
    });

    const submitButton = screen.getByRole("button", { name: /Profil speichern/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Fehler/i)).toBeInTheDocument();
    });
  });
});

