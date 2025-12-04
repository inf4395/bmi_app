import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Programs from "../Programs";
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

describe("Programs", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    
    localStorage.setItem("bmi_app_user", JSON.stringify({ id: 1, name: "Test User" }));
    localStorage.setItem("bmi_app_token", "mock-token");
  });

  it("renders loading state", () => {
    global.fetch.mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<Programs />);
    expect(screen.getByText(/Lade Programme/i)).toBeInTheDocument();
  });

  it("displays programs for normal weight BMI", async () => {
    const mockStats = {
      latestBMI: 23.0, // Normalgewicht
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Personalisiertes Programm/i)).toBeInTheDocument();
      expect(screen.getByText(/Erhaltungs-Programm/i)).toBeInTheDocument();
    });
  });

  it("displays programs for overweight BMI", async () => {
    const mockStats = {
      latestBMI: 27.0, // Übergewicht
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Gewichtsreduktions-Programm/i)).toBeInTheDocument();
    });
  });

  it("displays programs for underweight BMI", async () => {
    const mockStats = {
      latestBMI: 17.0, // Untergewicht
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Gewichtszunahme-Programm/i)).toBeInTheDocument();
    });
  });

  it("displays empty state when no BMI data", async () => {
    const mockStats = {
      latestBMI: null,
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Füge zuerst eine BMI-Messung hinzu/i)).toBeInTheDocument();
    });
  });

  it("expands program details when clicked", async () => {
    const user = userEvent.setup();
    const mockStats = {
      latestBMI: 23.0,
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Erhaltungs-Programm/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    const detailsButtons = screen.getAllByText(/Details anzeigen/i);
    expect(detailsButtons.length).toBeGreaterThan(0);
    
    await user.click(detailsButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Programm-Inhalte/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("displays important notes", async () => {
    const mockStats = {
      latestBMI: 23.0,
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Wichtige Hinweise/i)).toBeInTheDocument();
    });
  });

  it("displays programs for obesity BMI", async () => {
    const mockStats = {
      latestBMI: 32.0, // Adipositas
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Intensives Abnehm-Programm/i)).toBeInTheDocument();
    });
  });

  it("handles fetch error gracefully", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    renderWithProviders(<Programs />);

    await waitFor(() => {
      // Should still render, just without BMI data
      expect(screen.getByText(/Füge zuerst eine BMI-Messung hinzu/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("handles response not ok in fetchCurrentBMI", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Füge zuerst eine BMI-Messung hinzu/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("successfully starts a program", async () => {
    const user = userEvent.setup();
    const mockStats = {
      latestBMI: 23.0,
    };

    const mockProgramResponse = {
      id: 1,
      message: "Programm erfolgreich gestartet!",
      program: {
        id: 1,
        programType: "Fitness",
        programName: "Erhaltungs-Programm",
      },
    };

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockProgramResponse,
      });

    // Mock window.alert
    window.alert = vi.fn();

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Erhaltungs-Programm/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    const detailsButtons = screen.getAllByText(/Details anzeigen/i);
    await user.click(detailsButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Programm-Inhalte/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    const startButtons = screen.getAllByText(/Programm starten/i);
    await user.click(startButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/erfolgreich gestartet/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it("handles program start error", async () => {
    const user = userEvent.setup();
    const mockStats = {
      latestBMI: 23.0,
    };

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: "Server error" }),
      });

    // Mock window.alert
    window.alert = vi.fn();

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Erhaltungs-Programm/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    const detailsButtons = screen.getAllByText(/Details anzeigen/i);
    await user.click(detailsButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Programm-Inhalte/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    const startButtons = screen.getAllByText(/Programm starten/i);
    await user.click(startButtons[0]);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it("handles program start network error", async () => {
    const user = userEvent.setup();
    const mockStats = {
      latestBMI: 23.0,
    };

    global.fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockStats,
      })
      .mockRejectedValueOnce(new Error("Network error"));

    // Mock window.alert
    window.alert = vi.fn();

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Erhaltungs-Programm/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    const detailsButtons = screen.getAllByText(/Details anzeigen/i);
    await user.click(detailsButtons[0]);

    await waitFor(() => {
      expect(screen.getByText(/Programm-Inhalte/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    const startButtons = screen.getAllByText(/Programm starten/i);
    await user.click(startButtons[0]);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    }, { timeout: 3000 });
  });

  it("displays workout video section", async () => {
    const mockStats = {
      latestBMI: 23.0,
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockStats,
    });

    renderWithProviders(<Programs />);

    await waitFor(() => {
      expect(screen.getByText(/Workout-Training Video/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});

