import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading, error, user, clearError } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    clearError();
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate, clearError]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await login(formData);
      navigate("/dashboard");
    } catch {
      // Fehler bereits im Kontext gesetzt
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Anmeldung</h1>
        <p className="auth-subtitle">Melden Sie sich an, um den BMI-Rechner zu nutzen.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            E-Mail-Adresse
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="max@example.com"
            />
          </label>
          <label>
            Passwort
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Wird angemeldet..." : "Einloggen"}
          </button>
        </form>
        <p className="auth-switch">
          Noch kein Konto? <Link to="/registrierung">Jetzt registrieren</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

