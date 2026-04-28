// utils/generatePdf.js
import { jsPDF } from 'jspdf'

export function generateWorkshopPDF({ student, score, total, pct, details, openAnswers, gameResults, now }) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210, PL = 18, PR = 192, LH = 7
  let y = 0

  const addPage = () => { doc.addPage(); y = 20 }
  const checkY = (need = 12) => { if (y + need > 275) addPage() }

  // ── Header ──
  doc.setFillColor(26, 58, 107)
  doc.rect(0, 0, W, 32, 'F')
  doc.setFillColor(192, 57, 43)
  doc.rect(0, 32, W, 4, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18); doc.setFont('helvetica', 'bold')
  doc.text('7th Grade Science Workshop', W / 2, 13, { align: 'center' })
  doc.setFontSize(10); doc.setFont('helvetica', 'normal')
  doc.text('Colegio Boston Flexible · 1st Period 2026', W / 2, 21, { align: 'center' })
  doc.text('Año de la Pureza · Great Disciples', W / 2, 28, { align: 'center' })

  y = 44

  // ── Student info ──
  doc.setFillColor(221, 232, 247)
  doc.roundedRect(PL, y, PR - PL, 28, 3, 3, 'F')
  doc.setTextColor(26, 58, 107); doc.setFontSize(11); doc.setFont('helvetica', 'bold')
  doc.text('Student Information', PL + 4, y + 7)
  doc.setFontSize(10); doc.setFont('helvetica', 'normal'); doc.setTextColor(30, 30, 60)
  doc.text(`Name:  ${student.name}`, PL + 4, y + 14)
  doc.text(`Email: ${student.email}`, PL + 4, y + 20)
  doc.text(`Date:  ${now}`, PL + 4, y + 26)
  y += 34

  // ── Score box ──
  const [sr, sg, sb] = pct >= 70 ? [39, 174, 96] : pct >= 50 ? [211, 84, 0] : [192, 57, 43]
  doc.setFillColor(sr, sg, sb)
  doc.roundedRect(PL, y, PR - PL, 22, 3, 3, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14); doc.setFont('helvetica', 'bold')
  doc.text(`SCORE: ${score} / ${total}   (${pct}%)`, W / 2, y + 9, { align: 'center' })
  doc.setFontSize(10); doc.setFont('helvetica', 'normal')
  const verdict = pct >= 90 ? 'Outstanding!' : pct >= 70 ? 'Good job!' : pct >= 50 ? 'Keep studying!' : 'Needs improvement'
  doc.text(verdict, W / 2, y + 17, { align: 'center' })
  y += 30

  // ── Game Results (if present) ──
  if (gameResults?.length) {
    sectionTitle('GAMES SCORE', [26,58,107])
    gameResults.forEach(gameRow => {
      checkY(12)
      const ok = gameRow.correct === gameRow.total
      doc.setFillColor(ok ? 234 : 248, ok ? 250 : 248, ok ? 241 : 240)
      doc.roundedRect(PL, y, PR-PL, 10, 2, 2, 'F')
      doc.setTextColor(30,30,60); doc.setFontSize(9); doc.setFont('helvetica','bold')
      doc.text(`${gameRow.label}: ${gameRow.correct}/${gameRow.total}`, PL+4, y+6.5)
      y += 12
    })
    y += 4
  }

  // ── Section title helper ──
  const sectionTitle = (title, sectionColor = [26, 58, 107]) => {
    checkY(14)
    doc.setFillColor(...sectionColor)
    doc.rect(PL, y, PR - PL, 8, 'F')
    doc.setTextColor(255, 255, 255); doc.setFontSize(10); doc.setFont('helvetica', 'bold')
    doc.text(title, PL + 3, y + 5.5)
    y += 11; doc.setTextColor(30, 30, 60)
  }

  // ── MC/TF Results ──
  sectionTitle('PART 1 — Multiple Choice & True/False Results', [26,58,107])

  const qLabels = {
    wq1: 'Q1 · Ecosystems — Abiotic/Biotic pair',
    wq2: 'Q2 · Ecosystems — Biome vs Ecosystem',
    wq3: 'Q3 · Food Webs — Trophic Level',
    wq4: 'Q4 · Food Webs — Top Predator removal',
    wq5: 'Q5 · Fast Fashion — Aquatic impact',
    wq6: 'Q6 · Stewardship — Upcycling',
  }

  details.forEach(d => {
    checkY(16)
    doc.setFillColor(d.ok ? 234 : 253, d.ok ? 250 : 240, d.ok ? 241 : 240)
    doc.roundedRect(PL, y, PR - PL, 13, 2, 2, 'F')
    doc.setFillColor(d.ok ? 39 : 192, d.ok ? 174 : 57, d.ok ? 96 : 43)
    doc.circle(PL + 6, y + 6.5, 4, 'F')
    doc.setTextColor(255, 255, 255); doc.setFontSize(9); doc.setFont('helvetica', 'bold')
    doc.text(d.ok ? '✓' : '✗', PL + 4.2, y + 7.3)
    doc.setTextColor(30, 30, 60); doc.setFontSize(9); doc.setFont('helvetica', 'bold')
    doc.text(qLabels[d.id] || `Question ${d.id}`, PL + 13, y + 5.5)
    doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5)
    doc.text(`Your answer: ${d.given}   |   Correct: ${d.correct}`, PL + 13, y + 10.5)
    y += 16
  })

  y += 4

  // ── Open questions ──
  sectionTitle('PART 2 — Open Questions', [26,58,107])

  openAnswers.forEach(({ label, instruction, answer }) => {
    checkY(20)
    doc.setFontSize(10); doc.setFont('helvetica', 'bold'); doc.setTextColor(26, 58, 107)
    doc.text(label, PL, y + 6)
    doc.setFontSize(8.5); doc.setFont('helvetica', 'italic'); doc.setTextColor(80, 80, 100)
    const instrLines = doc.splitTextToSize(instruction, PR - PL)
    doc.text(instrLines, PL, y + 12)
    y += 12 + instrLines.length * 5

    const lines = doc.splitTextToSize(answer || '(No answer provided)', PR - PL - 6)
    const boxH = Math.max(20, lines.length * LH + 8)
    checkY(boxH + 4)
    doc.setFillColor(248, 250, 255); doc.setDrawColor(26, 58, 107); doc.setLineWidth(0.3)
    doc.roundedRect(PL, y, PR - PL, boxH, 2, 2, 'FD')
    doc.setTextColor(30, 30, 60); doc.setFontSize(9.5); doc.setFont('helvetica', 'normal')
    doc.text(lines, PL + 3, y + 6)
    y += boxH + 8
  })

  // ── Footer ──
  const pages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setFillColor(26, 58, 107); doc.rect(0, 285, W, 12, 'F')
    doc.setTextColor(255, 255, 255); doc.setFontSize(7.5); doc.setFont('helvetica', 'normal')
    doc.text('Colegio Boston Flexible · 7th Grade Science · 1st Period 2026', PL, 292)
    doc.text(`Page ${i} of ${pages}`, PR, 292, { align: 'right' })
  }

  return doc.output('blob')
}
