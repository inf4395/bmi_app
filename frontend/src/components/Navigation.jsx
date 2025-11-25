import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "./Navigation.css";

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/dashboard">BMI Tracker</Link>
        </div>
        <ul className="nav-menu">
          <li>
            <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/bmi" className={isActive("/bmi") ? "active" : ""}>
              BMI Rechner
            </Link>
          </li>
          <li>
            <Link to="/statistiken" className={isActive("/statistiken") ? "active" : ""}>
              Statistiken
            </Link>
          </li>
          <li>
            <Link to="/programme" className={isActive("/programme") ? "active" : ""}>
              Programme
            </Link>
          </li>
          <li>
            <Link to="/profil" className={isActive("/profil") ? "active" : ""}>
              Profil
            </Link>
          </li>
        </ul>
        <div className="nav-user">
          <span className="user-name">{user?.name}</span>
          <button onClick={logout} className="logout-btn">
            Abmelden
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

