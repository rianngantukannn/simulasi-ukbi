/**
 * js/sections/section3.js
 * Seksi III — Membaca
 * Layout: Split-pane | Kiri: Teks Wacana | Kanan: Soal PG
 */
class Section3 {
  constructor(container, data, state, onAnswer, onFlag) {
    this.container = container;
    this.data = data; // SECTION3_DATA array (5 bacaan × 8 soal)
    this.state = state;
    this.onAnswer = onAnswer;
    this.onFlag = onFlag;
    this._render();
  }

  static flatIndex(bIdx, sIdx) { return bIdx * 8 + sIdx; }
  static bacaanFromFlat(flat) { return Math.floor(flat / 8); }
  static soalFromFlat(flat) { return flat % 8; }

  get activeFlat() { return this.state.soalAktif; }
  get activeBacaanIdx() { return Section3.bacaanFromFlat(this.activeFlat); }
  get activeSoalIdx() { return Section3.soalFromFlat(this.activeFlat); }
  get activeBacaan() { return this.data[this.activeBacaanIdx]; }
  get activeSoal() { return this.activeBacaan.soal[this.activeSoalIdx]; }

  _render() {
    this.container.innerHTML = `
      <div class="s3-layout">
        <!-- LEFT: Teks Wacana -->
        <div class="s3-left" id="s3-left">
          <div class="wacana-header">
            <div class="wacana-label" id="s3-bacaan-label"></div>
            <div class="wacana-judul" id="s3-wacana-judul"></div>
          </div>
          <div class="wacana-scroll-wrapper">
            <div class="scroll-mask-top" id="s3-mask-top"></div>
            <div class="wacana-body" id="s3-wacana-body"></div>
            <div class="scroll-mask-bottom" id="s3-mask-bottom"></div>
          </div>
          <div class="wacana-sumber" id="s3-wacana-sumber"></div>
        </div>
        <!-- RIGHT: Soal -->
        <div class="s3-right" id="s3-right">
          <div class="soal-header">
            <div class="soal-badge" id="s3-soal-badge"></div>
            <button class="flag-btn" id="s3-flag-btn" title="Tandai Ragu-ragu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>
              <span id="s3-flag-label">Tandai</span>
            </button>
          </div>
          <div class="soal-pertanyaan" id="s3-pertanyaan"></div>
          <div class="soal-pilihan" id="s3-pilihan"></div>
          <div class="soal-nav">
            <button class="nav-btn secondary" id="s3-prev-btn">← Sebelumnya</button>
            <button class="nav-btn primary" id="s3-next-btn">Selanjutnya →</button>
          </div>
        </div>
      </div>`;

    this._updateAll();
    this._bindEvents();
    this._initScrollMask();
  }

  _updateAll() {
    this._updateWacana();
    this._updateSoal();
  }

  _updateWacana() {
    const bacaan = this.activeBacaan;
    document.getElementById('s3-bacaan-label').textContent =
      `Bacaan ${this.activeBacaanIdx + 1} dari ${this.data.length}`;
    document.getElementById('s3-wacana-judul').textContent = bacaan.judul;

    // Render paragraphs
    const bodyEl = document.getElementById('s3-wacana-body');
    const paragraphs = bacaan.teks.trim().split('\n\n').filter(p => p.trim());
    bodyEl.innerHTML = paragraphs.map(p =>
      `<p class="wacana-para">${p.trim().replace(/\n/g, ' ')}</p>`
    ).join('');

    document.getElementById('s3-wacana-sumber').textContent = bacaan.sumber;
    // Reset scroll position when changing bacaan
    bodyEl.scrollTop = 0;
  }

  _updateSoal() {
    const flat = this.activeFlat;
    const soal = this.activeSoal;
    const jawaban = this.state.jawaban.s3;
    const flagged = this.state.flagged.s3;

    const bIdx = this.activeBacaanIdx;
    const sIdx = this.activeSoalIdx;
    document.getElementById('s3-soal-badge').textContent =
      `Soal ${flat + 1} dari 40 | Soal ${sIdx + 1} dari 8 – Bacaan ${bIdx + 1}`;

    document.getElementById('s3-pertanyaan').textContent = soal.pertanyaan;

    // Flag
    const isFlagged = flagged.includes(flat);
    document.getElementById('s3-flag-label').textContent = isFlagged ? 'Ditandai' : 'Tandai';
    document.getElementById('s3-flag-btn').classList.toggle('flagged', isFlagged);

    // Pilihan
    const pilEl = document.getElementById('s3-pilihan');
    pilEl.innerHTML = '';
    ['A', 'B', 'C', 'D'].forEach(key => {
      if (!soal.pilihan[key]) return;
      const chosen = jawaban[flat] === key;
      const btn = document.createElement('button');
      btn.className = `pilihan-btn ${chosen ? 'selected' : ''}`;
      btn.setAttribute('data-key', key);
      btn.setAttribute('aria-pressed', chosen);
      btn.innerHTML = `<span class="pilihan-key">${key}</span><span class="pilihan-text">${soal.pilihan[key]}</span>`;
      btn.addEventListener('click', () => this._handleAnswer(key));
      pilEl.appendChild(btn);
    });

    // Nav
    document.getElementById('s3-prev-btn').disabled = flat === 0;
    document.getElementById('s3-next-btn').textContent = flat === 39 ? 'Selesai Seksi III' : 'Selanjutnya →';
  }

  _handleAnswer(key) {
    this.onAnswer('s3', this.activeFlat, key);
    document.querySelectorAll('#s3-pilihan .pilihan-btn').forEach(btn => {
      const k = btn.getAttribute('data-key');
      btn.classList.toggle('selected', k === key);
      btn.setAttribute('aria-pressed', k === key);
    });
  }

  _initScrollMask() {
    const wrapper = document.getElementById('s3-wacana-body');
    if (!wrapper) return;
    const maskTop = document.getElementById('s3-mask-top');
    const maskBot = document.getElementById('s3-mask-bottom');
    if (!maskTop || !maskBot) return;

    wrapper.addEventListener('scroll', () => {
      const { scrollTop, scrollHeight, clientHeight } = wrapper;
      maskTop.style.opacity = scrollTop > 8 ? '1' : '0';
      maskBot.style.opacity = scrollTop + clientHeight < scrollHeight - 8 ? '1' : '0';
    });
    // Initial check
    setTimeout(() => {
      const { scrollHeight, clientHeight } = wrapper;
      maskBot.style.opacity = scrollHeight > clientHeight ? '1' : '0';
    }, 100);
  }

  _bindEvents() {
    document.getElementById('s3-flag-btn').addEventListener('click', () => {
      this.onFlag('s3', this.activeFlat);
      const isFlagged = this.state.flagged.s3.includes(this.activeFlat);
      document.getElementById('s3-flag-label').textContent = isFlagged ? 'Ditandai' : 'Tandai';
      document.getElementById('s3-flag-btn').classList.toggle('flagged', isFlagged);
    });

    document.getElementById('s3-prev-btn').addEventListener('click', () => this._navigate(-1));
    document.getElementById('s3-next-btn').addEventListener('click', () => this._navigate(1));
  }

  _navigate(dir) {
    const newFlat = this.activeFlat + dir;
    if (newFlat < 0) return;
    if (newFlat > 39) {
      document.dispatchEvent(new CustomEvent('section-complete', { detail: { section: 3 } }));
      return;
    }
    const oldBacaan = this.activeBacaanIdx;
    this.state.soalAktif = newFlat;
    // If bacaan changed, update wacana panel
    if (oldBacaan !== this.activeBacaanIdx) this._updateWacana();
    this._updateSoal();
    if (typeof renderTracker === 'function') renderTracker();
  }

  goTo(flatIdx) {
    if (flatIdx < 0 || flatIdx > 39) return;
    const oldB = this.activeBacaanIdx;
    this.state.soalAktif = flatIdx;
    if (oldB !== this.activeBacaanIdx) this._updateWacana();
    this._updateSoal();
    if (typeof renderTracker === 'function') renderTracker();
  }

  destroy() {}
}
