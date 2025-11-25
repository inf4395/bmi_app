import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Navigation from "../components/Navigation.jsx";
import "./Profile.css";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const Profile = () => {
  const { user, token, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    gender: "",
    birthDate: "",
    height: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setProfile({
            name: data.user.name || "",
            email: data.user.email || "",
            gender: data.user.gender || "",
            birthDate: data.user.birth_date || "",
            height: data.user.height || "",
          });
        }
      }
    } catch (error) {
      console.error("Fehler beim Laden des Profils:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Préparer les données pour l'envoi
      const profileData = {
        ...profile,
        height: profile.height ? parseFloat(profile.height) : null,
        birthDate: profile.birthDate || null,
        gender: profile.gender || null,
      };

      console.log("Saving profile:", profileData);
      
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      console.log("Profile update response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Profile update error:", errorData);
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Profile updated successfully:", data);

      // Mettre à jour le contexte avec les nouvelles données
      if (data.user) {
        updateUser(data.user);
      }

      // Recharger les données du profil depuis le serveur pour être sûr
      await fetchProfile();
      
      setMessage({ type: "success", text: "Profil erfolgreich aktualisiert!" });
      
      // Effacer le message après 3 secondes
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ 
        type: "error", 
        text: error.message || "Fehler beim Aktualisieren des Profils." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <Navigation />
      <div className="profile-content">
        <h1>Mein Profil</h1>
        <div className="profile-card">
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>E-Mail</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Geschlecht</label>
              <select name="gender" value={profile.gender} onChange={handleChange}>
                <option value="">Bitte wählen</option>
                <option value="männlich">Männlich</option>
                <option value="weiblich">Weiblich</option>
                <option value="divers">Divers</option>
              </select>
            </div>

            <div className="form-group">
              <label>Geburtsdatum</label>
              <input
                type="date"
                name="birthDate"
                value={profile.birthDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Größe (cm)</label>
              <input
                type="number"
                name="height"
                value={profile.height}
                onChange={handleChange}
                min="100"
                max="250"
                step="0.1"
              />
            </div>

            {message && (
              <div className={`message message-${message.type}`}>{message.text}</div>
            )}

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Wird gespeichert..." : "Profil speichern"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;

