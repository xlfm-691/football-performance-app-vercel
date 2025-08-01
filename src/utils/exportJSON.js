export function exportToJSON(history) {
  const blob = new Blob([JSON.stringify(history, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'historique_performance.json';
  a.click();
}
