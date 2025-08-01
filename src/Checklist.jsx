import React from 'react';

export default function Checklist({ title, items, scores, onScoreChange }) {
  return (
    <div>
      <h3>{title}</h3>
      {items.map(item => (
        <div key={item} style={{marginBottom:'5px'}}>
          {item} :
          <input
            type="number"
            min="0"
            max="6"
            value={scores[item] || ''}
            onChange={(e) => onScoreChange(item, e.target.value)}
            style={{marginLeft:'5px', width:'50px'}}
          />
        </div>
      ))}
    </div>
  );
}
