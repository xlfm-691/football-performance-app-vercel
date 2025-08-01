import React, { useState, useEffect } from "react";
import Checklist from "./Checklist";

export default function App() {
  const categories = {
    "Condition Physique": [
      "Endurance",
      "Vitesse",
      "Force",
      "Agilité",
      "Réactivité",
    ],
    "Technique": [
      "Contrôle de balle",
      "Passes",
      "Tirs",
      "Dribbles",
      "Jonglerie",
    ],
    "Tactique": [
      "Positionnement",
      "Lecture du jeu",
      "Prise de décision",
      "Travail défensif",
      "Travail offensif",
    ],
    "Mental": [
      "Motivation",
      "Concentration",
      "Confiance",
      "Gestion du stress",
      "Esprit d'équipe",
    ],
    "Récupération": [
      "Échauffement",
      "Étirements",
      "Récupération active",
      "Hydratation et alimentation",
      "Sommeil",
    ],
  };

  const [selected, setSelected] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("checklistHistory")) || [];
    setHistory(savedHistory);
  }, []);

  const handleToggle = (category, item) => {
    setSelected((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category]?.[item],
      },
    }));
  };

  const handleSave = () => {
    const newEntry = {
      date: new Date().toLocaleString(),
      data: selected,
    };
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("checklistHistory", JSON.stringify(updatedHistory));
    alert("✅ Session enregistrée !");
  };

  return (
    <div style={{ padding: "1rem", maxWidth: 600, margin: "auto" }}>
      <h1>🏆 Checklist Football</h1>
      {Object.keys(categories).map((cat) => (
        <Checklist
          key={cat}
          title={cat}
          items={categories[cat]}
          selected={selected[cat] || {}}
          onToggle={(item) => handleToggle(cat, item)}
        />
      ))}

      <button
        onClick={handleSave}
        style={{
          backgroundColor: "#4caf50",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          marginTop: "1rem",
          width: "100%",
        }}
      >
        Enregistrer la session
      </button>

      <button
        disabled
        style={{
          backgroundColor: "#ccc",
          color: "#555",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          marginTop: "0.5rem",
          width: "100%",
        }}
      >
        Exporter en PDF (bientôt)
      </button>

      <h2 style={{ marginTop: "2rem" }}>📜 Historique</h2>
      <ul>
        {history.map((entry, idx) => (
          <li key={idx} style={{ marginBottom: "0.5rem" }}>
            <strong>{entry.date}</strong>
            <pre style={{ background: "#f9f9f9", padding: "5px" }}>
              {JSON.stringify(entry.data, null, 2)}
            </pre>
          </li>
        ))}
      </ul>
    </div>
  );
}
