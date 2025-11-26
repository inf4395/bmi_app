import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../AuthContext";
import { BrowserRouter } from "react-router-dom";

// Mock fetch
global.fetch = vi.fn();

const wrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("initializes with no user when localStorage is empty", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });

  it("initializes with user from localStorage", () => {
    const mockUser = { id: 1, name: "Test User", email: "test@example.com" };
    const mockToken = "mock-token";
    localStorage.setItem("bmi_app_user", JSON.stringify(mockUser));
    localStorage.setItem("bmi_app_token", mockToken);

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toBe(mockToken);
  });

  it("registers a new user successfully", async () => {
    const mockResponse = {
      user: { id: 1, name: "New User", email: "new@example.com" },
      token: "new-token",
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.register({
        name: "New User",
        email: "new@example.com",
        password: "password123",
      });
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockResponse.user);
      expect(result.current.token).toBe(mockResponse.token);
    });

    expect(localStorage.getItem("bmi_app_user")).toBe(JSON.stringify(mockResponse.user));
    expect(localStorage.getItem("bmi_app_token")).toBe(mockResponse.token);
  });

  it("logs in a user successfully", async () => {
    const mockResponse = {
      user: { id: 1, name: "Test User", email: "test@example.com" },
      token: "login-token",
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({
        email: "test@example.com",
        password: "password123",
      });
    });

    await waitFor(() => {
      expect(result.current.user).toEqual(mockResponse.user);
      expect(result.current.token).toBe(mockResponse.token);
    });
  });

  it("handles login error", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "Invalid credentials" }),
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      try {
        await result.current.login({
          email: "test@example.com",
          password: "wrong",
        });
      } catch (error) {
        expect(error.message).toBe("Invalid credentials");
      }
    });

    expect(result.current.user).toBeNull();
  });

  it("logs out a user", () => {
    const mockUser = { id: 1, name: "Test User", email: "test@example.com" };
    const mockToken = "mock-token";
    localStorage.setItem("bmi_app_user", JSON.stringify(mockUser));
    localStorage.setItem("bmi_app_token", mockToken);

    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
    expect(localStorage.getItem("bmi_app_user")).toBeNull();
    expect(localStorage.getItem("bmi_app_token")).toBeNull();
  });
});

