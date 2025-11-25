import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import BmiCalculator from "./pages/BmiCalculator.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Statistics from "./pages/Statistics.jsx";
import Programs from "./pages/Programs.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/anmeldung" element={<LoginPage />} />
      <Route path="/registrierung" element={<RegisterPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bmi"
        element={
          <ProtectedRoute>
            <BmiCalculator />
          </ProtectedRoute>
        }
      />
      <Route
        path="/statistiken"
        element={
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/programme"
        element={
          <ProtectedRoute>
            <Programs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profil"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/anmeldung" replace />} />
    </Routes>
  );
}

export default App;
