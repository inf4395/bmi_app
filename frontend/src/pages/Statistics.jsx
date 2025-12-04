import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useAuth } from "../context/AuthContext.jsx";
import Navigation from "../components/Navigation.jsx";
import "./Statistics.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Statistics = () => {
  const { token } = useAuth();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      fetchStatistics();
    } else {
      setLoading(false);
      setError("Nicht angemeldet");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching statistics...", API_BASE_URL);
      
      const [recordsRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/history?limit=100`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/stats/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      console.log("Records response:", recordsRes.status, recordsRes.ok);
      console.log("Stats response:", statsRes.status, statsRes.ok);

      if (!recordsRes.ok) {
        const errorText = await recordsRes.text();
        console.error("Error fetching records:", errorText);
        throw new Error(`Fehler beim Laden der Historie: ${recordsRes.status}`);
      }

      if (!statsRes.ok) {
        const errorText = await statsRes.text();
        console.error("Error fetching stats:", errorText);
        throw new Error(`Fehler beim Laden der Statistiken: ${statsRes.status}`);
      }

      const data = await recordsRes.json();
      const statsData = await statsRes.json();
      
      console.log("Records data:", data);
      console.log("Stats data:", statsData);

      setRecords(data.reverse()); // Plus ancien au plus récent pour le graphique
      setStats(statsData);
    } catch (error) {
      console.error("Fehler beim Laden der Statistiken:", error);
      setError(error.message || "Fehler beim Laden der Daten");
    } finally {
      setLoading(false);
    }
  };

  // Préparer les données pour les graphiques
  const chartData = records.map((record) => ({
    date: new Date(record.created_at).toLocaleDateString("de-DE", {
      month: "short",
      day: "numeric",
    }),
    bmi: parseFloat(record.bmi),
    weight: parseFloat(record.weight),
    fullDate: record.created_at,
  }));

  // Calculer les domaines dynamiques pour les axes
  const calculateDomain = (dataKey, minValue = null) => {
    if (chartData.length === 0) return ["auto", "auto"];
    
    const values = chartData.map(d => d[dataKey]);
    const min = minValue !== null ? Math.min(minValue, Math.min(...values)) : Math.min(...values);
    const max = Math.max(...values);
    
    // Si min et max sont identiques (une seule valeur), ajouter une marge fixe
    if (min === max) {
      const padding = minValue !== null && minValue < min ? Math.max(1, min * 0.1) : Math.max(1, min * 0.1);
      return [Math.max(0, min - padding).toFixed(1), (max + padding).toFixed(1)];
    }
    
    // Ajouter une marge de 10% en haut et en bas pour que la courbe ne touche pas les bords
    const range = max - min;
    const padding = range * 0.1;
    
    const domainMin = Math.max(0, min - padding);
    const domainMax = max + padding;
    
    return [domainMin.toFixed(1), domainMax.toFixed(1)];
  };

  const bmiDomain = calculateDomain("bmi");
  const weightDomain = calculateDomain("weight", 10);

  if (loading) {
    return (
      <div className="statistics-container">
        <Navigation />
        <div className="statistics-content">
          <div className="statistics-loading">Lade Statistiken...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-container">
        <Navigation />
        <div className="statistics-content">
          <h1>Statistiken</h1>
          <div className="no-data">
            <p style={{ color: "red" }}>Fehler: {error}</p>
            <button onClick={fetchStatistics} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
              Erneut versuchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="statistics-container">
        <Navigation />
        <div className="statistics-content">
          <h1>Statistiken</h1>
          <div className="no-data">
            <p>Noch keine Daten vorhanden.</p>
            <p>Füge deine erste BMI-Messung hinzu, um Statistiken zu sehen.</p>
            <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
              Gehe zur Seite <strong>BMI Rechner</strong> und füge eine Messung hinzu.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="statistics-container">
      <Navigation />
      <div className="statistics-content">
        <h1>Statistiken & Entwicklung</h1>

        {stats && (
          <div className="stats-overview">
            <div className="stat-item">
              <span className="stat-label">Durchschnittlicher BMI</span>
              <span className="stat-value">{stats.averageBMI?.toFixed(1) || "—"}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Aktueller BMI</span>
              <span className="stat-value">
                {records[records.length - 1]?.bmi
                  ? parseFloat(records[records.length - 1].bmi).toFixed(1)
                  : "—"}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Gewichtsänderung</span>
              <span className="stat-value">
                {records.length >= 2
                  ? `${(parseFloat(records[records.length - 1].weight) - parseFloat(records[0].weight)).toFixed(1)} kg`
                  : "—"}
              </span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Gesamtmessungen</span>
              <span className="stat-value">{stats.totalRecords || 0}</span>
            </div>
          </div>
        )}

        <div className="charts-section">
          <div className="chart-card">
            <h2>BMI-Entwicklung</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  label={{ value: 'Datum', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#666' } }}
                />
                <YAxis 
                  domain={bmiDomain}
                  label={{ value: 'BMI', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#666' } }}
                  allowDecimals={false}
                  tickFormatter={(value) => Math.round(value)}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="bmi"
                  stroke="#0a9396"
                  strokeWidth={2}
                  name="BMI"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>Gewichtsentwicklung</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  label={{ value: 'Datum', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#666' } }}
                />
                <YAxis 
                  domain={weightDomain}
                  label={{ value: 'Gewicht (kg)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#666' } }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#007f82"
                  strokeWidth={2}
                  name="Gewicht (kg)"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="records-table-section">
          <h2>Alle Messungen</h2>
          <div className="table-container">
            <table className="statistics-table">
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Gewicht (kg)</th>
                  <th>Größe (cm)</th>
                  <th>BMI</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id}>
                    <td>{new Date(record.created_at).toLocaleDateString("de-DE")}</td>
                    <td>{record.weight}</td>
                    <td>{record.height}</td>
                    <td>{parseFloat(record.bmi).toFixed(1)}</td>
                    <td>
                      <span className={`status-badge status-${record.status?.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;

