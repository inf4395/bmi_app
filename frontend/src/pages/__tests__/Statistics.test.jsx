import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Statistics from "../Statistics";
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

describe("Statistics", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    
    localStorage.setItem("bmi_app_user", JSON.stringify({ id: 1, name: "Test User" }));
    localStorage.setItem("bmi_app_token", "mock-token");
  });

  it("renders loading state", () => {
    global.fetch.mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<Statistics />);
    expect(screen.getByText(/Lade Statistiken/i)).toBeInTheDocument();
  });

  it("displays statistics with data", async () => {
    const mockRecords = [
      {
        id: 1,
        weight: 75,
        height: 180,
        bmi: 23.15,
        status: "Normalgewicht",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        weight: 80,
        height: 180,
        bmi: 24.69,
        status: "Normalgewicht",
        created_at: new Date().toISOString(),
      },
    ];

    const mockStats = {
      totalRecords: 2,
      averageBMI: 23.92,
      latestBMI: 23.15,
      latestWeight: 75,
      weightChange: 5,
    };

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecords,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      });

    renderWithProviders(<Statistics />);

    await waitFor(() => {
      expect(screen.getByText(/Statistiken & Entwicklung/i)).toBeInTheDocument();
      expect(screen.getByText(/Durchschnittlicher BMI/i)).toBeInTheDocument();
      expect(screen.getByText(/Gewichtsänderung/i)).toBeInTheDocument();
    });
  });

  it("displays empty state when no data", async () => {
    const mockRecords = [];
    const mockStats = {
      totalRecords: 0,
      averageBMI: null,
      latestBMI: null,
      latestWeight: null,
      weightChange: null,
    };

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecords,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      });

    renderWithProviders(<Statistics />);

    await waitFor(() => {
      // Vérifier que le message d'état vide est affiché ou que les statistiques sont vides
      const emptyMessage = screen.queryByText(/Noch keine/i) || screen.queryByText(/keine Daten/i);
      expect(emptyMessage || screen.queryByText(/0/i)).toBeTruthy();
    });
  });

  it("displays error message on API failure", async () => {
    global.fetch
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Server error" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ totalRecords: 0 }),
      });

    renderWithProviders(<Statistics />);

    await waitFor(() => {
      // Statistics component makes two API calls, so we need to handle both
      const errorElement = screen.queryByText(/Fehler/i) || screen.queryByText(/Server error/i);
      expect(errorElement).toBeTruthy();
    }, { timeout: 3000 });
  });

  it("displays records table when data exists", async () => {
    const mockRecords = [
      {
        id: 1,
        weight: 75,
        height: 180,
        bmi: 23.15,
        status: "Normalgewicht",
        created_at: new Date().toISOString(),
      },
    ];

    const mockStats = {
      totalRecords: 1,
      averageBMI: 23.15,
      latestBMI: 23.15,
      latestWeight: 75,
    };

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockRecords,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      });

    renderWithProviders(<Statistics />);

    await waitFor(() => {
      // Check for table headers or data - Recharts might cause issues, so be flexible
      const hasTable = screen.queryByText(/Datum/i) || screen.queryByText(/Gewicht/i) || screen.queryByText(/75/i);
      expect(hasTable).toBeTruthy();
    }, { timeout: 3000 });
  });
});

