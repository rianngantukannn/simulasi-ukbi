/**
 * js/sections/section2.js
 * Seksi II — Merespons Kaidah
 * Layout: Single-column, kalimat bermasalah + 4 pilihan
 */
class Section2 {
  constructor(container, data, state, onAnswer, onFlag) {
    this.container = container;
    this.data = data; // SECTION2_DATA flat array (25 soal)
    this.state = state;
    this.onAnswer = onAnswer;
    this.onFlag = onFlag;
    this._render();
  }

  get activeIdx() { return this.state.soalAktif; }
  get activeSoal() { return this.data[this.activeIdx]; }

  _render() {
    this.container.innerHTML = `
      <div class="s2-layout">
        <div class="s2-content">
          <div class="soal-header">
            <div class="soal-badge" id="s2-soal-badge"></div>
            <button class="flag-btn" id="s2-flag-btn" title="Tandai Ragu-ragu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>
              <span id="s2-flag-label">Tandai</span>
            </button>
          </div>
          <div class="s2-tipe-badge" id="s2-tipe-badge"></div>
          <div class="soal-instruksi" id="s2-instruksi"></div>
          <div class="s2-kalimat" id="s2-kalimat"></div>
          <div class="soal-pilihan s2-pilihan" id="s2-pilihan"></div>
          <div class="soal-nav">
            <button class="nav-btn secondary" id="s2-prev-btn">← Sebelumnya</button>
            <button class="nav-btn primary" id="s2-next-btn">Selanjutnya →</button>
          </div>
        </div>
      </div>`;
    this._updateAll();
    this._bindEvents();
  }

  _updateAll() {
    const idx = this.activeIdx;
    const soal = this.activeSoal;
    const jawaban = this.state.jawaban.s2;
    const flagged = this.state.flagged.s2;

    document.getElementById('s2-soal-badge').textContent = `Soal ${idx + 1} dari 25`;

    // Tipe badge
    const tipeMap = { ejaan: 'Ejaan & Tanda Baca', kbbi: 'Kata Baku', tbbbi: 'Kalimat Efektif' };
    const tipeEl = document.getElementById('s2-tipe-badge');
    tipeEl.textContent = tipeMap[soal.tipe] || soal.tipe;
    tipeEl.className = `s2-tipe-badge tipe-${soal.tipe}`;

    document.getElementById('s2-instruksi').textContent = soal.instruksi;

    // Kalimat (can contain HTML underline)
    const kalimatEl = document.getElementById('s2-kalimat');
    if (soal.kalimat) {
      kalimatEl.innerHTML = soal.kalimat;
      kalimatEl.style.display = 'block';
    } else {
      kalimatEl.style.display = 'none';
    }

    // Flag state
    const isFlagged = flagged.includes(idx);
    document.getElementById('s2-flag-label').textContent = isFlagged ? 'Ditandai' : 'Tandai';
    document.getElementById('s2-flag-btn').classList.toggle('flagged', isFlagged);

    // Pilihan
    const pilEl = document.getElementById('s2-pilihan');
    pilEl.innerHTML = '';
    ['A', 'B', 'C', 'D'].forEach(key => {
      if (!soal.pilihan[key]) return;
      const chosen = jawaban[idx] === key;
      const btn = document.createElement('button');
      btn.className = `pilihan-btn s2-pilihan-btn ${chosen ? 'selected' : ''}`;
      btn.setAttribute('data-key', key);
      btn.setAttribute('aria-pressed', chosen);
      btn.innerHTML = `<span class="pilihan-key">${key}</span><span class="pilihan-text">${soal.pilihan[key]}</span>`;
      btn.addEventListener('click', () => this._handleAnswer(key));
      pilEl.appendChild(btn);
    });

    // Nav
    document.getElementById('s2-prev-btn').disabled = idx === 0;
    document.getElementById('s2-next-btn').textContent = idx === 24 ? 'Selesai Seksi II' : 'Selanjutnya →';
  }

  _handleAnswer(key) {
    this.onAnswer('s2', this.activeIdx, key);
    document.querySelectorAll('#s2-pilihan .pilihan-btn').forEach(btn => {
      const k = btn.getAttribute('data-key');
      btn.classList.toggle('selected', k === key);
      btn.setAttribute('aria-pressed', k === key);
    });
  }

  _bindEvents() {
    document.getElementById('s2-flag-btn').addEventListener('click', () => {
      this.onFlag('s2', this.activeIdx);
      const isFlagged = this.state.flagged.s2.includes(this.activeIdx);
      document.getElementById('s2-flag-label').textContent = isFlagged ? 'Ditandai' : 'Tandai';
      document.getElementById('s2-flag-btn').classList.toggle('flagged', isFlagged);
    });

    document.getElementById('s2-prev-btn').addEventListener('click', () => this._navigate(-1));
    document.getElementById('s2-next-btn').addEventListener('click', () => this._navigate(1));
  }

  _navigate(dir) {
    const newIdx = this.activeIdx + dir;
    if (newIdx < 0) return;
    if (newIdx > 24) {
      document.dispatchEvent(new CustomEvent('section-complete', { detail: { section: 2 } }));
      return;
    }
    this.state.soalAktif = newIdx;
    this._updateAll();
    if (typeof renderTracker === 'function') renderTracker();
  }

  goTo(idx) {
    if (idx < 0 || idx > 24) return;
    this.state.soalAktif = idx;
    this._updateAll();
    if (typeof renderTracker === 'function') renderTracker();
  }

  destroy() {}
}
