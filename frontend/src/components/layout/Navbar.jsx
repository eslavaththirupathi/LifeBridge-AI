import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartPulse } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          🩺 LifeBridge AI
        </Link>

        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>

          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>

          <a href="#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>

          <a href="#how-it-works" onClick={() => setMenuOpen(false)}>
            How It Works
          </a>

          <Link to="/diagnosis" onClick={() => setMenuOpen(false)}>
            Diagnosis
          </Link>

          <a href="#about" onClick={() => setMenuOpen(false)}>
            About
          </a>

          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>

          <Link
            to="/diagnosis"
            className="diagnosis-btn"
            onClick={() => setMenuOpen(false)}
          >
            Start Diagnosis
          </Link>
        </nav>

        <div
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

      </div>
    </header>
  );
}