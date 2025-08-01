import React, { useState, useEffect } from 'react';
import Checklist from './Checklist';
import History from './History';
import ChartComponent from './Chart';
import { exportToPDF } from './utils/exportPDF';
import { exportToJSON } from './utils/exportJSON';

export default function App() {
  const categories = {
    "Condition Physique": ["Endurance", "Vitesse", "Force", "Agilité", "Réactivité"],
    "Technique": ["Contrôle de balle", "Passes", "Tirs", "Dribbles", "Jonglerie"],
    "Tactique": ["Positionnement", "Lecture du jeu", "Prise de décision", "Travail défensif", "Travail offensif"],
    "Mental": ["Motivation", "Concentration", "Confiance", "Gestion du stress", "Esprit d'équipe"],
    "Récupération": ["Échauffement", "Étirements", "Récupération active", "Hydratation et alimentation", "Sommeil"],
  };

  const [scores, setScores] = useState({});
  const [comment, setComment] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('checklistHistory')) || [];
    setHistory(saved);
  }, []);

  const handleScoreChange = (category, item, value) => {
    setScores(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: value
      }
    }));
  };

  const handleSave = () => {
    const entry = {
      date: new Date().toLocaleString(),
      data: scores,
      comment
    };
    const updated = [entry, ...history];
    setHistory(updated);
    localStorage.setItem('checklistHistory', JSON.stringify(updated));
    setComment('');
    alert('✅ Session enregistrée !');
  };

  return (
    <div className="container">
      <h1>🏆 Checklist Football Pro</h1>
      <div className="section">
        {Object.keys(categories).map(cat => (
          <Checklist
            key={cat}
            title={cat}
            items={categories[cat]}
            scores={scores[cat] || {}}
            onScoreChange={(item, value) => handleScoreChange(cat, item, value)}
          />
        ))}
        <textarea
          placeholder="📝 Commentaires"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{width: '100%', marginTop: '1rem'}}
        />
        <button onClick={handleSave} style={{width: '100%', marginTop: '0.5rem', background:'#4caf50', color:'#fff', padding:'0.5rem', border:'none', borderRadius:'5px'}}>Enregistrer la session</button>
        <button onClick={() => exportToJSON(history)} style={{width: '100%', marginTop: '0.5rem', background:'#2196F3', color:'#fff', padding:'0.5rem', border:'none', borderRadius:'5px'}}>Exporter JSON</button>
        <button onClick={() => exportToPDF(history)} style={{width: '100%', marginTop: '0.5rem', background:'#f44336', color:'#fff', padding:'0.5rem', border:'none', borderRadius:'5px'}}>Exporter PDF</button>
      </div>
      <div className="section">
        <History history={history} />
      </div>
      <div className="section">
        <ChartComponent history={history} />
      </div>
    </div>
  );
}
