import { createContext, useContext, useCallback, useMemo, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const AuthContext = createContext(null);

const persistAuthState = (user, token) => {
  if (!user || !token) return;
  localStorage.setItem("bmi_app_user", JSON.stringify(user));
  localStorage.setItem("bmi_app_token", token);
};

const clearPersistedAuth = () => {
  localStorage.removeItem("bmi_app_user");
  localStorage.removeItem("bmi_app_token");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("bmi_app_user");
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("bmi_app_token"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = useCallback((data) => {
    setUser(data.user);
    setToken(data.token);
    persistAuthState(data.user, data.token);
  }, []);

  const request = useCallback(async (endpoint, payload) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log("API Request:", url, payload);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = "Fehler bei der Anfrage.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // Si la réponse n'est pas du JSON, utiliser le statut
          errorMessage = `Fehler ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (err) {
      // Gestion des erreurs réseau
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setError("Verbindung zum Server fehlgeschlagen. Bitte überprüfen Sie, ob der Backend-Server läuft.");
      } else {
        setError(err.message);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(
    async ({ email, password }) => {
      const data = await request("/auth/login", { email, password });
      handleAuth(data);
      return data;
    },
    [request, handleAuth]
  );

  const register = useCallback(
    async ({ name, email, password }) => {
      const data = await request("/auth/register", { name, email, password });
      handleAuth(data);
      return data;
    },
    [request, handleAuth]
  );

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    clearPersistedAuth();
  }, []);

  const updateUser = useCallback((updatedUser) => {
    setUser(updatedUser);
    persistAuthState(updatedUser, token);
  }, [token]);

  const clearError = useCallback(() => setError(null), []);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      login,
      register,
      logout,
      updateUser,
      clearError,
    }),
    [user, token, loading, error, login, register, logout, updateUser, clearError]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth muss innerhalb von AuthProvider verwendet werden.");
  }
  return context;
};

