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
      const flat = mIdx * 10 + sIdx;
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
      const flat = mIdx * 10 + sIdx;
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

  // Export laporan
  document.getElementById('result-export-btn')?.addEventListener('click', exportReport);

  // Mulai ulang
  document.getElementById('result-restart-btn')?.addEventListener('click', () => {
    Storage.clear();
    location.reload();
  });

  // Instruksi Seksi 1 di layar transisi
  // (diisi saat showTransition dipanggil, callback onstart sudah handle startSection)
});
