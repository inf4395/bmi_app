import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
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

describe("Dashboard", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    
    // Set up a mock user
    localStorage.setItem("bmi_app_user", JSON.stringify({ id: 1, name: "Test User", email: "test@example.com" }));
    localStorage.setItem("bmi_app_token", "mock-token");
  });

  it("renders dashboard with loading state", () => {
    // eslint-disable-next-line no-undef
    global.fetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    renderWithProviders(<Dashboard />);
    expect(screen.getByText(/Lade Dashboard/i)).toBeInTheDocument();
  });

  it("displays user welcome message", async () => {
    const mockStats = {
      totalRecords: 5,
      averageBMI: 23.5,
      latestBMI: 24.0,
      latestWeight: 75,
    };

    const mockHistory = [
      {
        id: 1,
        weight: 75,
        bmi: 24.0,
        status: "Normalgewicht",
        created_at: new Date().toISOString(),
      },
    ];

    // eslint-disable-next-line no-undef
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockHistory,
      });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Willkommen zurück/i)).toBeInTheDocument();
      expect(screen.getByText(/Test User/i)).toBeInTheDocument();
    });
  });

  it("displays statistics cards", async () => {
    const mockStats = {
      totalRecords: 10,
      averageBMI: 23.5,
      latestBMI: 24.0,
      latestWeight: 75,
    };

    const mockHistory = [
      {
        id: 1,
        weight: 75,
        bmi: 24.0,
        status: "Normalgewicht",
        created_at: new Date().toISOString(),
      },
    ];

    // eslint-disable-next-line no-undef
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockHistory,
      });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Aktueller BMI/i)).toBeInTheDocument();
      expect(screen.getByText(/Aktuelles Gewicht/i)).toBeInTheDocument();
      expect(screen.getByText(/Gesamtmessungen/i)).toBeInTheDocument();
      expect(screen.getByText(/Durchschnittlicher BMI/i)).toBeInTheDocument();
    });
  });

  it("displays action cards", async () => {
    const mockStats = { totalRecords: 0 };
    const mockHistory = [];

    // eslint-disable-next-line no-undef
    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockHistory,
      });

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Neue BMI-Messung/i)).toBeInTheDocument();
      expect(screen.getByText(/Statistiken ansehen/i)).toBeInTheDocument();
      expect(screen.getByText(/Programme entdecken/i)).toBeInTheDocument();
    });
  });

  it("handles API errors gracefully", async () => {
    // eslint-disable-next-line no-undef
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    renderWithProviders(<Dashboard />);

    await waitFor(() => {
      // Should not crash, just show empty state or loading
      expect(screen.queryByText(/Lade Dashboard/i)).not.toBeInTheDocument();
    });
  });
});

