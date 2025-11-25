import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Navigation from "../components/Navigation.jsx";
import "./Dashboard.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentRecords, setRecentRecords] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, historyRes] = await Promise.all([
        fetch(`${API_BASE_URL}/stats/summary`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_BASE_URL}/history?limit=5`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      if (historyRes.ok) {
        const historyData = await historyRes.json();
        setRecentRecords(historyData);
      }
    } catch (error) {
      console.error("Fehler beim Laden der Dashboard-Daten:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navigation />
        <div className="dashboard-loading">Lade Dashboard...</div>
      </div>
    );
  }

  const latestRecord = recentRecords[0];

  return (
    <div className="dashboard-container">
      <Navigation />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Willkommen zurück, {user?.name}!</h1>
          <p>Hier ist eine Übersicht über deine Gesundheitsdaten</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Aktueller BMI</h3>
              <p className="stat-value">
                {latestRecord?.bmi ? parseFloat(latestRecord.bmi).toFixed(1) : "—"}
              </p>
              <p className="stat-label">{latestRecord?.status || "Noch keine Messung"}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">⚖️</div>
            <div className="stat-content">
              <h3>Aktuelles Gewicht</h3>
              <p className="stat-value">
                {latestRecord?.weight ? `${latestRecord.weight} kg` : "—"}
              </p>
              <p className="stat-label">
                {latestRecord?.created_at
                  ? new Date(latestRecord.created_at).toLocaleDateString("de-DE")
                  : "Noch keine Messung"}
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-content">
              <h3>Gesamtmessungen</h3>
              <p className="stat-value">{stats?.totalRecords || 0}</p>
              <p className="stat-label">Einträge gesamt</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <h3>Durchschnittlicher BMI</h3>
              <p className="stat-value">
                {stats?.averageBMI ? stats.averageBMI.toFixed(1) : "—"}
              </p>
              <p className="stat-label">Alle Messungen</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <Link to="/bmi" className="action-card">
            <div className="action-icon">➕</div>
            <h3>Neue BMI-Messung</h3>
            <p>Füge eine neue Gewichts- und Größenmessung hinzu</p>
          </Link>

          <Link to="/statistiken" className="action-card">
            <div className="action-icon">📊</div>
            <h3>Statistiken ansehen</h3>
            <p>Analysiere deine Entwicklung mit detaillierten Grafiken</p>
          </Link>

          <Link to="/programme" className="action-card">
            <div className="action-icon">💪</div>
            <h3>Programme entdecken</h3>
            <p>Finde personalisierte Trainings- und Ernährungspläne</p>
          </Link>
        </div>

        {recentRecords.length > 0 && (
          <div className="recent-records">
            <h2>Letzte Messungen</h2>
            <table className="records-table">
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Gewicht</th>
                  <th>BMI</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{new Date(record.created_at).toLocaleDateString("de-DE")}</td>
                    <td>{record.weight} kg</td>
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
            <Link to="/statistiken" className="view-all-link">
              Alle Statistiken ansehen →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

