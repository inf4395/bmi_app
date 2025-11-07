import { useState } from "react";
import "./App.css";
import bild1 from "./assets/bild1.JPG";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    height: "",
    weight: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/api/bmi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          age: parseInt(formData.age),
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight),
        }),
      });

      if (!response.ok) throw new Error("Serverfehler");

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError("Fehler beim Abrufen der Daten. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bmi-container">
      {/* === HEADER === */}
      <header className="bmi-header">
        <div className="header-content">
          <h1>BMI Rechner</h1>
        </div>
      </header>

      {/* --- Section d’introduction --- */}
      <section className="bmi-intro">
        <div className="intro-image">
          <img src={bild1} alt="BMI Illustration" />
        </div>

        <div className="intro-text">
          <h2>Bin ich wirklich zu dick?</h2>
          <p>
            Oder schätze ich mein Gewicht ganz falsch ein? Der BMI
            (Body-Mass-Index) hilft, das Körpergewicht richtig zu deuten. Mit
            unserem BMI-Rechner lässt sich ganz einfach berechnen, ob Sie
            Normalgewicht haben, unter- oder übergewichtig sind.
          </p>
          <p>
            Sie müssen lediglich älter als 18 Jahre alt sein und Ihr Alter
            entsprechend auf dem Schieberegler "Alter in Jahren" links
            einstellen. Dann das aktuelle Gewicht und die Größe eingeben, um
            unseren Rechner gleich jetzt zu nutzen.
          </p>
        </div>
      </section>

      {/* --- Formulaire principal --- */}
      <main className="bmi-main">
        <section className="bmi-form-section">
          <h1>BMI Rechner</h1>
          <form onSubmit={handleSubmit} className="bmi-form">
            <div className="form-group">
              <label>Ihr Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Max Mustermann"
                required
              />
            </div>

            <div className="form-group">
              <label>E-Mail-Adresse</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="max@example.com"
                required
              />
            </div>

            <div className="form-group half">
              <label>Alter</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="z. B. 25"
                required
              />
            </div>

            <div className="form-group half">
              <label>Größe (in cm)</label>
              <input
                type="number"
                step="0.1"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="z. B. 180"
                required
              />
            </div>

            <div className="form-group half">
              <label>Gewicht (in kg)</label>
              <input
                type="number"
                step="0.1"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="z. B. 75"
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Berechne..." : "BMI berechnen"}
            </button>
          </form>

          {error && <p className="error-message">{error}</p>}

          {result && (
            <div className="bmi-result">
              <h2>Dein Ergebnis</h2>
              <p><strong>BMI:</strong> {result.bmi}</p>
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Name:</strong> {result.name}</p>
              <p><strong>E-Mail:</strong> {result.email}</p>
            </div>
          )}
        </section>
      </main>

      {/* --- Section d’explication --- */}
      <section className="bmi-info">
        <h2>Was ist der BMI?</h2>
        <p>
          Der Body-Mass-Index, kurz BMI, ist die gebräuchlichste Formel zur
          Bewertung des Körpergewichts. Er ergibt sich aus dem Verhältnis des
          Körpergewichts in Kilogramm und der Körpergröße in Metern zum Quadrat.
          Je nach Höhe des errechneten Werts unterscheiden wir in unserem
          Rechner genau wie die World Health Organization (WHO) die Kategorien:
          Kritisches Untergewicht, Untergewicht, Normalgewicht, leichtes
          Übergewicht und Übergewicht (Adipositas).
        </p>
        <p className="bmi-formula">
          <strong>BMI = Körpergewicht : (Körpergröße)²</strong>
        </p>
        <h3>BMI-Bewertung erfolgt unabhängig von Alter und Geschlecht</h3>
        <p>
          Ob Ihr Gewicht im grünen Bereich liegt, können Sie ganz einfach mit
          unserem BMI-Rechner testen. Dieser basiert auf der oben genannten
          klassischen Formel. Die Bewertung des BMI erfolgt unabhängig von Alter
          und Geschlecht. Zugrunde gelegt werden das Körpergewicht und die
          Körpergröße.
        </p>
        <p>
          <em>
            Beispiel: Ein 30-jähriger Mann mit einem Körpergewicht von 80 kg und
            einer Größe von 1,85 m hat einen BMI von 23,4 und ist damit
            normalgewichtig.
          </em>
        </p>
      </section>

      <footer className="bmi-footer">
        <p>© 2025 BMI Rechner – Beispielanwendung für CI/CD Bachelorarbeit</p>
      </footer>
    </div>
  );
}

export default App;
