import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function ChartComponent({ history }) {
  if (history.length === 0) return <p>Aucune donnée pour graphique.</p>;

  const categories = Object.keys(history[0].data);
  const datasets = [];

  categories.forEach(cat => {
    Object.keys(history[0].data[cat] || {}).forEach(item => {
      datasets.push({
        label: `${cat} - ${item}`,
        data: history.map(h => Number(h.data[cat]?.[item] || 0)),
        borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),
        fill: false
      });
    });
  });

  const labels = history.map(h => h.date);

  return (
    <div>
      <h2>📊 Progression</h2>
      <Line
        data={{
          labels,
          datasets
        }}
      />
    </div>
  );
}
