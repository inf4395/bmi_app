import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, user, clearError } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

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
      await register(formData);
      navigate("/dashboard");
    } catch {
      // Fehler bereits im Kontext gesetzt
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Registrierung</h1>
        <p className="auth-subtitle">Erstellen Sie ein Konto, um Ihre BMI-Historie zu speichern.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Ihr Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Max Mustermann"
            />
          </label>
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
              minLength={6}
              placeholder="Mind. 6 Zeichen"
            />
          </label>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Wird erstellt..." : "Konto erstellen"}
          </button>
        </form>
        <p className="auth-switch">
          Bereits registriert? <Link to="/anmeldung">Jetzt anmelden</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

