import React from 'react';

export default function History({ history }) {
  return (
    <div>
      <h2>📜 Historique</h2>
      {history.length === 0 && <p>Aucune session enregistrée.</p>}
      {history.map((entry, idx) => (
        <div key={idx} style={{marginBottom:'1rem', borderBottom:'1px solid #ccc', paddingBottom:'0.5rem'}}>
          <strong>{entry.date}</strong>
          <pre style={{background:'#f9f9f9', padding:'5px'}}>{JSON.stringify(entry.data, null, 2)}</pre>
          {entry.comment && <p><strong>Commentaire:</strong> {entry.comment}</p>}
        </div>
      ))}
    </div>
  );
}
