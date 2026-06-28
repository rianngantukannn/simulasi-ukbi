/**
 * js/app.js
 * Controller Utama UKBI Simulasi
 * State, Routing, Orkestrasi 3 Seksi, Scoring UKBI
 */

/* ── Konfigurasi ─────────────────────────────────────── */
const SEKSI_CONFIG = {
  1: { nama: 'Mendengarkan',    durasi: 1800, total: 40 },
  2: { nama: 'Merespons Kaidah', durasi: 1200, total: 25 },
  3: { nama: 'Membaca',         durasi: 2700, total: 40 }
};

/* ── State ───────────────────────────────────────────── */
const examState = {
  peserta: '',
  mulai: null,
  seksiAktif: 0,    // 0 = landing, 1/2/3 = seksi, 4 = selesai
  soalAktif: 0,
  jawaban: {
    s1: new Array(40).fill(null),
    s2: new Array(25).fill(null),
    s3: new Array(40).fill(null)
  },
  flagged: { s1: [], s2: [], s3: [] },
  skor: { s1: 0, s2: 0, s3: 0, komposit: 0 },
  selesai: false
};

/* ── Instansi global ─────────────────────────────────── */
let examTimer   = new ExamTimer();
let activeSection = null;

/* ── Router ──────────────────────────────────────────── */
function navigateTo(viewId) {
  document.querySelectorAll('[id^="view-"]').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(viewId);
  if (target) target.classList.remove('hidden');
}

/* ── Tracker bottom nav ──────────────────────────────── */
function renderTracker() {
  const trackerEl = document.getElementById('tracker-grid');
  if (!trackerEl) return;
  const sec = examState.seksiAktif;
  if (sec < 1 || sec > 3) return;

  const key = `s${sec}`;
  const jawaban = examState.jawaban[key];
  const flagged = examState.flagged[key];

  trackerEl.innerHTML = '';

  if (sec === 1) {
    // Seksi I: tampilkan hanya 5 chip untuk monolog aktif
    const mIdx = Math.floor(examState.soalAktif / 5);
    const blockStart = mIdx * 5;
    const blockEnd   = blockStart + 5;

    // Label monolog di atas tracker
    const label = document.createElement('div');
    label.className = 'tracker-monolog-label';
    label.textContent = `Monolog ${['I','II','III','IV','V','VI','VII','VIII'][mIdx]} — Soal ${blockStart + 1}–${blockEnd}`;
    trackerEl.appendChild(label);

    for (let i = blockStart; i < blockEnd; i++) {
      const chip = document.createElement('button');
      chip.className = 'tracker-chip';
      chip.textContent = i + 1;
      chip.setAttribute('data-idx', i);
      chip.setAttribute('aria-label', `Soal ${i + 1}`);

      if (i === examState.soalAktif) chip.classList.add('active');
      else if (flagged.includes(i)) chip.classList.add('flagged');
      else if (jawaban[i] !== null) chip.classList.add('answered');

      chip.addEventListener('click', () => {
        if (activeSection) activeSection.goTo(i);
        renderTracker();
      });
      trackerEl.appendChild(chip);
    }
  } else {
    // Seksi II dan III: tampilkan semua soal
    const total = SEKSI_CONFIG[sec].total;
    for (let i = 0; i < total; i++) {
      const chip = document.createElement('button');
      chip.className = 'tracker-chip';
      chip.textContent = i + 1;
      chip.setAttribute('data-idx', i);
      chip.setAttribute('aria-label', `Soal ${i + 1}`);

      if (i === examState.soalAktif) chip.classList.add('active');
      else if (flagged.includes(i)) chip.classList.add('flagged');
      else if (jawaban[i] !== null) chip.classList.add('answered');

      chip.addEventListener('click', () => {
        if (activeSection) activeSection.goTo(i);
        renderTracker();
      });
      trackerEl.appendChild(chip);
    }
  }
}


/* ── Timer UI ────────────────────────────────────────── */
function updateTimerUI(remaining) {
  const el = document.getElementById('header-timer');
  if (!el) return;
  el.textContent = ExamTimer.format(remaining);
  if (remaining <= 120) {
    el.classList.add('timer-warning');
  } else {
    el.classList.remove('timer-warning');
  }
}

function updateHeaderInfo() {
  const sec = examState.seksiAktif;
  const titleEl = document.getElementById('header-section-title');
  if (titleEl && sec >= 1 && sec <= 3) {
    titleEl.textContent = `Seksi ${sec} — ${SEKSI_CONFIG[sec].nama}`;
  }
}

/* ── Mulai Seksi ─────────────────────────────────────── */
function startSection(n) {
  examState.seksiAktif = n;
  examState.soalAktif = 0;
  if (activeSection) activeSection.destroy();
  activeSection = null;

  navigateTo('view-exam');
  updateHeaderInfo();
  renderTracker();

  const container = document.getElementById('exam-content');
  container.innerHTML = '';

  const key = `s${n}`;
  const onAnswer = (sec, idx, val) => {
    examState.jawaban[sec][idx] = val;
    Storage.save(examState);
    renderTracker();
  };
  const onFlag = (sec, idx) => {
    const arr = examState.flagged[sec];
    const pos = arr.indexOf(idx);
    if (pos === -1) arr.push(idx);
    else arr.splice(pos, 1);
    Storage.save(examState);
    renderTracker();
  };

  if (n === 1) {
    activeSection = new Section1(container, DataLoader.getSection1(), examState, onAnswer, onFlag);
  } else if (n === 2) {
    activeSection = new Section2(container, DataLoader.getSection2(), examState, onAnswer, onFlag);
  } else if (n === 3) {
    activeSection = new Section3(container, DataLoader.getSection3(), examState, onAnswer, onFlag);
  }

  examTimer.stop();
  examTimer.start(SEKSI_CONFIG[n].durasi, updateTimerUI, () => {
    finishSection(n);
  });
}

/* ── Selesai Seksi ───────────────────────────────────── */
function finishSection(n) {
  examTimer.stop();
  if (activeSection) activeSection.destroy();
  activeSection = null;

  if (n < 3) {
    showTransition(n + 1);
  } else {
    showResult();
  }
}

/* ── Transisi antar seksi ────────────────────────────── */
function showTransition(nextSec) {
  navigateTo('view-transition');
  const cfg = SEKSI_CONFIG[nextSec];
  document.getElementById('trans-title').textContent = `Seksi ${nextSec} — ${cfg.nama}`;
  document.getElementById('trans-durasi').textContent =
    `Durasi: ${Math.floor(cfg.durasi / 60)} menit | ${cfg.total} soal`;

  const instruksiMap = {
    2: 'Pada seksi ini, Anda akan diminta untuk memilih perbaikan yang tepat bagi kalimat atau kata yang mengandung kesalahan ejaan, kosakata, atau kaidah tata bahasa.',
    3: 'Pada seksi ini, Anda akan membaca beberapa teks bacaan dan menjawab pertanyaan berdasarkan isi teks tersebut. Baca teks dengan saksama sebelum menjawab.'
  };
  document.getElementById('trans-instruksi').textContent =
    instruksiMap[nextSec] || '';

  document.getElementById('trans-mulai-btn').onclick = () => startSection(nextSec);
}

/* ── Perhitungan Skor UKBI ───────────────────────────── */
function calculateScores() {
  const data1 = DataLoader.getSection1();
  const data2 = DataLoader.getSection2();
  const data3 = DataLoader.getSection3();

  // Seksi I
  let benar1 = 0;
  data1.forEach((monolog, mIdx) => {
    monolog.soal.forEach((soal, sIdx) => {
      const flat = mIdx * 5 + sIdx;
      if (examState.jawaban.s1[flat] === soal.jawaban) benar1++;
    });
  });

  // Seksi II
  let benar2 = 0;
  data2.forEach((soal, idx) => {
    if (examState.jawaban.s2[idx] === soal.jawaban) benar2++;
  });

  // Seksi III
  let benar3 = 0;
  data3.forEach((bacaan, bIdx) => {
    bacaan.soal.forEach((soal, sIdx) => {
      const flat = bIdx * 8 + sIdx;
      if (examState.jawaban.s3[flat] === soal.jawaban) benar3++;
    });
  });

  // Konversi ke skala UKBI 251–800
  const toUKBI = (benar, total) => Math.round(251 + (benar / total) * 549);
  const s1 = toUKBI(benar1, 40);
  const s2 = toUKBI(benar2, 25);
  const s3 = toUKBI(benar3, 40);
  // Komposit: I=30%, II=30%, III=40%
  const komposit = Math.round(s1 * 0.3 + s2 * 0.3 + s3 * 0.4);

  examState.skor = { s1, s2, s3, komposit, benar1, benar2, benar3 };
  return { s1, s2, s3, komposit, benar1, benar2, benar3 };
}

function getPredikat(skor) {
  if (skor >= 725) return { label: 'Istimewa',     color: '#7c3aed', bg: '#ede9fe' };
  if (skor >= 641) return { label: 'Sangat Unggul', color: '#1d4ed8', bg: '#dbeafe' };
  if (skor >= 578) return { label: 'Unggul',        color: '#0369a1', bg: '#e0f2fe' };
  if (skor >= 482) return { label: 'Madya',         color: '#166534', bg: '#dcfce7' };
  if (skor >= 405) return { label: 'Semenjana',     color: '#92400e', bg: '#fef3c7' };
  if (skor >= 326) return { label: 'Marginal',      color: '#9a3412', bg: '#fee2e2' };
  return                  { label: 'Terbatas',      color: '#7f1d1d', bg: '#fca5a5' };
}

/* ── Halaman Hasil ───────────────────────────────────── */
function showResult() {
  const { s1, s2, s3, komposit, benar1, benar2, benar3 } = calculateScores();
  const p1 = getPredikat(s1);
  const p2 = getPredikat(s2);
  const p3 = getPredikat(s3);
  const pk = getPredikat(komposit);

  // Update global state scores
  examState.skor = { s1, s2, s3, komposit };

  navigateTo('view-result');

  const durasi = examState.mulai
    ? Math.round((Date.now() - examState.mulai) / 60000)
    : '—';
  const tgl = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  document.getElementById('result-peserta').textContent = examState.peserta;
  document.getElementById('result-tgl').textContent = tgl;
  document.getElementById('result-durasi').textContent = `${durasi} menit`;

  // Skor cards
  const renderCard = (id, label, skor, benar, total, predikat) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = `
      <div class="result-card-label">${label}</div>
      <div class="result-card-skor" style="color:${predikat.color}">${skor}</div>
      <div class="result-card-benar">${benar} / ${total} benar</div>
      <div class="result-card-predikat" style="background:${predikat.bg};color:${predikat.color}">${predikat.label}</div>`;
  };
  renderCard('rc-s1', 'Seksi I — Mendengarkan',    s1, benar1, 40, p1);
  renderCard('rc-s2', 'Seksi II — Merespons Kaidah', s2, benar2, 25, p2);
  renderCard('rc-s3', 'Seksi III — Membaca',        s3, benar3, 40, p3);

  // Komposit
  document.getElementById('result-komposit-skor').textContent = komposit;
  document.getElementById('result-komposit-skor').style.color = pk.color;
  document.getElementById('result-komposit-predikat').textContent = pk.label;
  document.getElementById('result-komposit-predikat').style.cssText =
    `background:${pk.bg};color:${pk.color}`;

  // Review Seksi I
  _renderReview();

  Storage.save({ ...examState, selesai: true });
}

function _renderReview() {
  const data1 = DataLoader.getSection1();
  const data2 = DataLoader.getSection2();
  const data3 = DataLoader.getSection3();

  const buildTable = (rows) => `
    <table class="review-table">
      <thead><tr><th>#</th><th>Jawaban Anda</th><th>Jawaban Benar</th><th>Status</th></tr></thead>
      <tbody>${rows.join('')}</tbody>
    </table>`;

  // Seksi I
  let rows1 = [];
  data1.forEach((m, mIdx) => {
    m.soal.forEach((soal, sIdx) => {
      const flat = mIdx * 5 + sIdx;
      const jaw = examState.jawaban.s1[flat] || '—';
      const benar = soal.jawaban;
      const ok = jaw === benar;
      rows1.push(`<tr class="${ok ? 'row-benar' : 'row-salah'}">
        <td>${flat + 1}</td><td>${jaw}</td><td>${benar}</td>
        <td><span class="status-chip ${ok ? 'chip-benar' : 'chip-salah'}">${ok ? '✓' : '✗'}</span></td>
      </tr>`);
    });
  });

  // Seksi II
  let rows2 = [];
  data2.forEach((soal, idx) => {
    const jaw = examState.jawaban.s2[idx] || '—';
    const benar = soal.jawaban;
    const ok = jaw === benar;
    rows2.push(`<tr class="${ok ? 'row-benar' : 'row-salah'}">
      <td>${idx + 1}</td><td>${jaw}</td><td>${benar}</td>
      <td><span class="status-chip ${ok ? 'chip-benar' : 'chip-salah'}">${ok ? '✓' : '✗'}</span></td>
    </tr>`);
  });

  // Seksi III
  let rows3 = [];
  data3.forEach((bacaan, bIdx) => {
    bacaan.soal.forEach((soal, sIdx) => {
      const flat = bIdx * 8 + sIdx;
      const jaw = examState.jawaban.s3[flat] || '—';
      const benar = soal.jawaban;
      const ok = jaw === benar;
      rows3.push(`<tr class="${ok ? 'row-benar' : 'row-salah'}">
        <td>${flat + 1}</td><td>${jaw}</td><td>${benar}</td>
        <td><span class="status-chip ${ok ? 'chip-benar' : 'chip-salah'}">${ok ? '✓' : '✗'}</span></td>
      </tr>`);
    });
  });

  const el = document.getElementById('result-review');
  if (el) {
    el.innerHTML = `
      <div class="review-section">
        <h3 class="review-title">Seksi I — Mendengarkan</h3>
        ${buildTable(rows1)}
      </div>
      <div class="review-section">
        <h3 class="review-title">Seksi II — Merespons Kaidah</h3>
        ${buildTable(rows2)}
      </div>
      <div class="review-section">
        <h3 class="review-title">Seksi III — Membaca</h3>
        ${buildTable(rows3)}
      </div>`;
  }
}

/* ── Export Laporan ──────────────────────────────────── */
function exportReport() {
  const report = {
    peserta: examState.peserta,
    tanggal: new Date().toISOString(),
    skor: examState.skor,
    predikat: {
      s1: getPredikat(examState.skor.s1).label,
      s2: getPredikat(examState.skor.s2).label,
      s3: getPredikat(examState.skor.s3).label,
      komposit: getPredikat(examState.skor.komposit).label
    },
    jawaban: examState.jawaban
  };
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `UKBI_${examState.peserta.replace(/\s+/g, '_')}_${Date.now()}.json`;
  a.click();
}

/* ── Cetak Sertifikat Resmi UKBI ──────────────────────── */
function printCertificate() {
  const { s1, s2, s3, komposit } = examState.skor;
  const p1 = getPredikat(s1).label;
  const p2 = getPredikat(s2).label;
  const p3 = getPredikat(s3).label;
  const pk = getPredikat(komposit).label;

  const tglTest = new Date(examState.mulai || Date.now()).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Dapatkan nomor sertifikat acak berformat resmi
  const certNumber = `UKBI/SIM/${new Date().getFullYear()}/${Math.floor(100000 + Math.random() * 900000)}`;

  const certHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Sertifikat UKBI - ${examState.peserta}</title>
  <style>
    /* Reset & Page Setup */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Times New Roman', Georgia, serif;
      background: #fafafa;
      color: #111827;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
    }

    /* Print settings */
    @page {
      size: A4 landscape;
      margin: 0;
    }

    /* Container Sertifikat */
    .cert-frame {
      width: 1120px;
      height: 792px;
      background: #fff;
      border: 24px solid #1e3f20; /* Bingkai hijau tua khas Kemdikbud */
      padding: 40px;
      position: relative;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
    }

    /* Garis Emas Bingkai */
    .cert-frame::before {
      content: '';
      position: absolute;
      top: 8px; left: 8px; right: 8px; bottom: 8px;
      border: 2px solid #d4af37; /* Emas */
      pointer-events: none;
    }

    /* Header Kop */
    .cert-header {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: 2px double #1e3f20;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    .kemdikbud-title {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #111827;
      text-transform: uppercase;
      font-family: 'Arial', sans-serif;
    }
    .badan-title {
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: #1e3f20;
      text-transform: uppercase;
      font-family: 'Arial', sans-serif;
      margin-top: 2px;
    }
    .cert-title-block {
      text-align: center;
      margin-top: 14px;
    }
    .cert-main-title {
      font-size: 26px;
      font-weight: 700;
      color: #111827;
      letter-spacing: 0.04em;
    }
    .cert-sub-title {
      font-size: 12px;
      font-style: italic;
      color: #4b5563;
      margin-top: 2px;
    }
    .cert-number {
      font-size: 11px;
      font-family: 'Courier New', Courier, monospace;
      margin-top: 4px;
      font-weight: bold;
    }

    /* Content Body */
    .cert-body {
      text-align: center;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 40px;
    }
    .menerangkan {
      font-size: 15px;
      font-style: italic;
      margin-bottom: 8px;
    }
    .peserta-name {
      font-size: 32px;
      font-weight: bold;
      color: #1e3f20;
      border-bottom: 1px solid #d4af37;
      display: inline-block;
      padding: 0 30px 4px;
      margin-bottom: 10px;
      text-transform: uppercase;
    }
    .keterangan {
      font-size: 14px;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto 16px;
    }

    /* Tables & Scores */
    .score-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 8px auto 0;
      width: 100%;
      max-width: 840px;
      gap: 30px;
    }
    .score-table {
      flex: 1.2;
      border-collapse: collapse;
      font-size: 12px;
      text-align: left;
    }
    .score-table th, .score-table td {
      border: 1px solid #9ca3af;
      padding: 6px 10px;
    }
    .score-table th {
      background: #f3f4f6;
      font-weight: 700;
    }
    .komposit-box {
      flex: 0.8;
      background: #f0fdf4;
      border: 2px solid #1e3f20;
      border-radius: 8px;
      padding: 16px;
      text-align: center;
      position: relative;
    }
    .komposit-value {
      font-size: 40px;
      font-weight: bold;
      color: #1e3f20;
      line-height: 1;
    }
    .komposit-label {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: #4b5563;
      margin-top: 4px;
    }
    .predikat-badge {
      display: inline-block;
      background: #1e3f20;
      color: #fff;
      font-weight: bold;
      font-size: 15px;
      padding: 4px 16px;
      border-radius: 4px;
      margin-top: 6px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    /* Footer Signatures */
    .cert-footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 14px;
      padding: 0 40px;
    }
    .sign-date {
      font-size: 12px;
      margin-bottom: 60px;
      text-align: left;
    }
    .sign-block {
      text-align: center;
      width: 250px;
      position: relative;
    }
    .sign-title {
      font-size: 12px;
      margin-bottom: 45px;
    }
    .sign-name {
      font-size: 13px;
      font-weight: 700;
      text-decoration: underline;
    }
    .sign-nip {
      font-size: 11px;
      color: #4b5563;
    }
    
    /* Stempel & Signature Simulation */
    .stempel-sim {
      position: absolute;
      top: -20px;
      left: -30px;
      width: 100px;
      height: 100px;
      border: 3px double rgba(30,63,32,0.45);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 7px;
      font-weight: bold;
      color: rgba(30,63,32,0.45);
      text-transform: uppercase;
      transform: rotate(-15deg);
      pointer-events: none;
    }
    .stempel-inner {
      text-align: center;
      line-height: 1.1;
    }
    .sign-graphic {
      position: absolute;
      top: 10px;
      left: 60px;
      font-family: 'Brush Script MT', cursive, sans-serif;
      font-size: 32px;
      color: #1d4ed8;
      transform: rotate(-5deg);
      pointer-events: none;
      opacity: 0.85;
    }

    /* Floating Print Button for Screen Mode */
    .print-control {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #059669;
      color: #fff;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: sans-serif;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transition: background 0.2s;
      z-index: 1000;
    }
    .print-control:hover { background: #047857; }

    /* Media Print Adjustments */
    @media print {
      body { background: #fff; padding: 0; }
      .cert-frame {
        box-shadow: none;
        border-width: 24px !important;
        width: 100vw;
        height: 100vh;
        page-break-inside: avoid;
      }
      .print-control { display: none; }
    }
  </style>
</head>
<body>

  <button class="print-control" onclick="window.print()">🖨️ Cetak / Simpan PDF</button>

  <div class="cert-frame">
    <!-- Kop Resmi -->
    <div class="cert-header">
      <div class="kemdikbud-title">Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi</div>
      <div class="badan-title">Badan Pengembangan dan Pembinaan Bahasa</div>
      
      <div class="cert-title-block">
        <h1 class="cert-main-title">SERTIFIKAT KEMAHIRAN BERBAHASA INDONESIA</h1>
        <div class="cert-sub-title">Simulasi Komputerisasi Adaptif (UKBI SIM)</div>
        <div class="cert-number">Nomor Sertifikat: ${certNumber}</div>
      </div>
    </div>

    <!-- Badan Sertifikat -->
    <div class="cert-body">
      <p class="menerangkan">menerangkan bahwa</p>
      <h2 class="peserta-name">${examState.peserta}</h2>
      <p class="keterangan">
        telah mengikuti Ujian Kemahiran Berbahasa Indonesia (UKBI) Simulasi Mandiri pada tanggal <strong>${tglTest}</strong>, dan memperoleh hasil kemahiran berbahasa Indonesia sebagai berikut:
      </p>

      <!-- Hasil Skor -->
      <div class="score-container">
        <!-- Tabel Detail -->
        <table class="score-table">
          <thead>
            <tr>
              <th>Seksi Ujian</th>
              <th>Predikat Kemahiran</th>
              <th>Skor Maksimal</th>
              <th>Skor Perolehan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Seksi I (Mendengarkan)</td>
              <td>${p1}</td>
              <td>800</td>
              <td><strong>${s1}</strong></td>
            </tr>
            <tr>
              <td>Seksi II (Merespons Kaidah)</td>
              <td>${p2}</td>
              <td>800</td>
              <td><strong>${s2}</strong></td>
            </tr>
            <tr>
              <td>Seksi III (Membaca)</td>
              <td>${p3}</td>
              <td>800</td>
              <td><strong>${s3}</strong></td>
            </tr>
          </tbody>
        </table>

        <!-- Total Skor -->
        <div class="komposit-box">
          <div class="komposit-value">${komposit}</div>
          <div class="komposit-label">Skor Komposit Akhir</div>
          <div class="predikat-badge">${pk}</div>
        </div>
      </div>
    </div>

    <!-- Tanda Tangan & Keterangan Legitimasi -->
    <div class="cert-footer">
      <div class="sign-date">
        Ditetapkan di Jakarta<br>
        Pada tanggal ${tglTest}
      </div>
      
      <div class="sign-block">
        <div class="sign-title">
          Kepala Badan Pengembangan<br>
          dan Pembinaan Bahasa
        </div>
        
        <!-- Simulasi Tandatangan & Stempel -->
        <div class="sign-graphic">Aminudin</div>
        <div class="stempel-sim">
          <div class="stempel-inner">
            KEMDIKBUDRISTEK<br>
            *<br>
            BADAN BAHASA
          </div>
        </div>

        <div class="sign-name">Prof. Dr. E. Aminudin Aziz, M.A., Ph.D.</div>
        <div class="sign-nip">NIP 196711141991031002</div>
      </div>
    </div>
  </div>

</body>
</html>`;

  // Coba buka jendela baru untuk preview
  const certWindow = window.open('', '_blank');
  if (certWindow) {
    certWindow.document.open();
    certWindow.document.write(certHtml);
    certWindow.document.close();
  } else {
    // Fallback: Cetak langsung menggunakan hidden iframe (menembus pop-up blocker)
    console.warn('[printCertificate] Pop-up diblokir. Menggunakan fallback cetak via iframe.');
    let iframe = document.getElementById('cert-print-iframe');
    if (!iframe) {
      iframe = document.createElement('iframe');
      iframe.id = 'cert-print-iframe';
      iframe.style.position = 'fixed';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = 'none';
      iframe.style.top = '-1000px';
      document.body.appendChild(iframe);
    }
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(certHtml);
    doc.close();

    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }, 500);
  }
}

/* ── Init ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  // Pre-load databases
  await DataLoader.loadDatabases();

  // Landing page
  navigateTo('view-landing');

  // Cek session tersimpan
  const savedSession = Storage.load();
  if (savedSession && savedSession.peserta && !savedSession.selesai) {
    const banner = document.getElementById('resume-banner');
    if (banner) {
      banner.classList.remove('hidden');
      document.getElementById('resume-name').textContent = savedSession.peserta;
      document.getElementById('resume-btn').addEventListener('click', () => {
        Object.assign(examState, savedSession);
        banner.classList.add('hidden');
        if (examState.seksiAktif >= 1 && examState.seksiAktif <= 3) {
          startSection(examState.seksiAktif);
        }
      });
      document.getElementById('resume-dismiss').addEventListener('click', () => {
        Storage.clear();
        banner.classList.add('hidden');
      });
    }
  }

  // Tombol mulai dari landing
  const mulaiBtn = document.getElementById('landing-mulai-btn');
  const namaInput = document.getElementById('landing-nama');

  mulaiBtn.addEventListener('click', () => {
    const nama = namaInput.value.trim();
    if (!nama) {
      namaInput.classList.add('input-error');
      namaInput.focus();
      return;
    }
    namaInput.classList.remove('input-error');
    examState.peserta = nama;
    examState.mulai = Date.now();
    Storage.save(examState);
    showTransition(1);
  });

  namaInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') mulaiBtn.click();
  });

  // Transisi ke seksi 1 (instruksi seksi 1 diset saat klik)
  document.getElementById('trans-mulai-btn')?.addEventListener('click', () => {});

  // Tombol seksi selesai via event
  document.addEventListener('section-complete', (e) => {
    finishSection(e.detail.section);
  });

  // Cetak Sertifikat
  document.getElementById('result-print-btn')?.addEventListener('click', printCertificate);

  // Export laporan JSON
  document.getElementById('result-export-btn')?.addEventListener('click', exportReport);

  // Mulai ulang
  document.getElementById('result-restart-btn')?.addEventListener('click', () => {
    Storage.clear();
    location.reload();
  });

  // Instruksi Seksi 1 di layar transisi
  // (diisi saat showTransition dipanggil, callback onstart sudah handle startSection)
});

