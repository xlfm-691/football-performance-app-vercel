import jsPDF from 'jspdf';

export function exportToPDF(history) {
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text('Historique Performance Football', 10, 10);
  let y = 20;
  history.forEach((entry, idx) => {
    doc.text(`${entry.date}`, 10, y);
    y += 10;
    doc.text(`Notes: ${JSON.stringify(entry.data)}`, 10, y);
    y += 10;
    if (entry.comment) {
      doc.text(`Commentaire: ${entry.comment}`, 10, y);
      y += 10;
    }
    y += 5;
  });
  doc.save('historique_performance.pdf');
}
