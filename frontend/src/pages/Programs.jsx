import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Navigation from "../components/Navigation.jsx";
import "./Programs.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Programs = () => {
  const { token } = useAuth();
  const [currentBMI, setCurrentBMI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);

  useEffect(() => {
    fetchCurrentBMI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCurrentBMI = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/stats/summary`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.latestBMI) {
          setCurrentBMI(parseFloat(data.latestBMI));
        }
      }
    } catch (error) {
      console.error("Fehler beim Laden des BMI:", error);
    } finally {
      setLoading(false);
    }
  };

  const getBMIStatus = () => {
    if (!currentBMI) return null;
    if (currentBMI < 18.5) return "untergewicht";
    if (currentBMI < 25) return "normalgewicht";
    if (currentBMI < 30) return "übergewicht";
    return "adipositas";
  };

  const getRecommendedPrograms = () => {
    const status = getBMIStatus();
    if (!status) return [];

    const programs = {
      untergewicht: [
        {
          id: 1,
          type: "Ernährung",
          title: "Gewichtszunahme-Programm",
          description: "Gesunde Gewichtszunahme durch ausgewogene Ernährung",
          duration: "12 Wochen",
          difficulty: "Anfänger",
          exercises: [
            "Erhöhte Kalorienzufuhr mit gesunden Fetten",
            "Regelmäßige Mahlzeiten (5-6 pro Tag)",
            "Proteinreiche Snacks",
            "Krafttraining 3x pro Woche",
          ],
        },
        {
          id: 2,
          type: "Sport",
          title: "Muskelaufbau-Training",
          description: "Gezieltes Training zum Aufbau von Muskelmasse",
          duration: "16 Wochen",
          difficulty: "Mittel",
          exercises: [
            "Krafttraining: 3-4x pro Woche",
            "Fokus auf Grundübungen (Kniebeugen, Bankdrücken)",
            "Progressive Überlastung",
            "Ausreichend Regeneration",
          ],
        },
      ],
      normalgewicht: [
        {
          id: 3,
          type: "Fitness",
          title: "Erhaltungs-Programm",
          description: "Gesundes Gewicht halten und Fitness verbessern",
          duration: "Dauerhaft",
          difficulty: "Alle Level",
          exercises: [
            "Ausgewogene Ernährung beibehalten",
            "Kardio: 150 Minuten pro Woche",
            "Krafttraining: 2x pro Woche",
            "Flexibilitätstraining",
          ],
        },
        {
          id: 4,
          type: "Sport",
          title: "Ganzkörper-Fitness",
          description: "Vielseitiges Training für Körper und Geist",
          duration: "12 Wochen",
          difficulty: "Mittel",
          exercises: [
            "HIIT-Training: 2x pro Woche",
            "Yoga/Pilates: 2x pro Woche",
            "Ausdauertraining: 1x pro Woche",
            "Aktive Erholung",
          ],
        },
      ],
      übergewicht: [
        {
          id: 5,
          type: "Gewichtsverlust",
          title: "Gewichtsreduktions-Programm",
          description: "Gesunder und nachhaltiger Gewichtsverlust",
          duration: "16 Wochen",
          difficulty: "Anfänger",
          exercises: [
            "Kaloriendefizit: 500-750 kcal/Tag",
            "Kardio: 200-300 Minuten pro Woche",
            "Krafttraining: 2-3x pro Woche",
            "Ernährungsumstellung",
          ],
        },
        {
          id: 6,
          type: "Sport",
          title: "Fettverbrennungs-Training",
          description: "Intensives Training zur Fettverbrennung",
          duration: "12 Wochen",
          difficulty: "Mittel",
          exercises: [
            "HIIT: 3x pro Woche",
            "Laufen/Walking: 3x pro Woche",
            "Krafttraining: 2x pro Woche",
            "Intervallfasten (optional)",
          ],
        },
      ],
      adipositas: [
        {
          id: 7,
          type: "Gewichtsverlust",
          title: "Intensives Abnehm-Programm",
          description: "Strukturiertes Programm für nachhaltigen Gewichtsverlust",
          duration: "24 Wochen",
          difficulty: "Anfänger",
          exercises: [
            "Medizinische Betreuung empfohlen",
            "Schrittweise Steigerung der Aktivität",
            "Ernährungsberatung",
            "Niedrigintensives Kardio: 150-200 Min/Woche",
          ],
        },
        {
          id: 8,
          type: "Bewegung",
          title: "Sanftes Bewegungsprogramm",
          description: "Schonendes Training für den Einstieg",
          duration: "16 Wochen",
          difficulty: "Anfänger",
          exercises: [
            "Spaziergänge: täglich 30-45 Min",
            "Wassergymnastik: 2x pro Woche",
            "Dehnübungen: täglich",
            "Schrittweise Steigerung",
          ],
        },
      ],
    };

    return programs[status] || [];
  };

  const recommendedPrograms = getRecommendedPrograms();

  if (loading) {
    return (
      <div>
        <Navigation />
        <div className="programs-loading">Lade Programme...</div>
      </div>
    );
  }

  return (
    <div className="programs-container">
      <Navigation />
      <div className="programs-content">
        <h1>Personalisiertes Programm</h1>
        <p className="programs-intro">
          Basierend auf deinem aktuellen BMI von{" "}
          <strong>{currentBMI ? currentBMI.toFixed(1) : "—"}</strong> haben wir dir passende
          Programme zusammengestellt.
        </p>

        {recommendedPrograms.length === 0 ? (
          <div className="no-programs">
            <p>Füge zuerst eine BMI-Messung hinzu, um personalisierte Programme zu erhalten.</p>
          </div>
        ) : (
          <div className="programs-grid">
            {recommendedPrograms.map((program) => (
              <div key={program.id} className="program-card">
                <div className="program-header">
                  <span className={`program-type program-type-${program.type.toLowerCase()}`}>
                    {program.type}
                  </span>
                  <h2>{program.title}</h2>
                </div>
                <p className="program-description">{program.description}</p>
                <div className="program-meta">
                  <span>⏱️ {program.duration}</span>
                  <span>📊 {program.difficulty}</span>
                </div>
                <button
                  className="program-details-btn"
                  onClick={() =>
                    setSelectedProgram(selectedProgram === program.id ? null : program.id)
                  }
                >
                  {selectedProgram === program.id ? "Weniger anzeigen" : "Details anzeigen"}
                </button>
                {selectedProgram === program.id && (
                  <div className="program-details">
                    <h3>Programm-Inhalte:</h3>
                    <ul>
                      {program.exercises.map((exercise, index) => (
                        <li key={index}>{exercise}</li>
                      ))}
                    </ul>
                    <button className="start-program-btn">Programm starten</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="programs-info">
          <h2>Wichtige Hinweise</h2>
          <ul>
            <li>
              Konsultiere vor Beginn eines neuen Trainingsprogramms einen Arzt, besonders bei
              gesundheitlichen Problemen.
            </li>
            <li>
              Starte langsam und steigere die Intensität allmählich, um Verletzungen zu vermeiden.
            </li>
            <li>
              Eine ausgewogene Ernährung ist genauso wichtig wie regelmäßige Bewegung.
            </li>
            <li>
              Höre auf deinen Körper und gönne dir ausreichend Ruhe und Regeneration.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Programs;

