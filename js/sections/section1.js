/**
 * js/sections/section1.js
 * Seksi I — Mendengarkan
 * Layout: Split-pane | Kiri: TTS Audio Player | Kanan: Soal PG
 */
class Section1 {
  constructor(container, data, state, onAnswer, onFlag) {
    this.container = container;
    this.data = data; // SECTION1_DATA array
    this.state = state;
    this.onAnswer = onAnswer;
    this.onFlag = onFlag;
    this.audioPlayer = null;
    this._hasPlayed = [false, false, false, false, false, false, false, false]; // 8 monologs
    this._activeMonologIdx = 0;
    this._render();
  }

  // Returns flat array index from {monolog, soal}
  // 8 monologs × 5 soal each = 40 total
  static flatIndex(mIdx, sIdx) { return mIdx * 5 + sIdx; }
  static monologFromFlat(flat) { return Math.floor(flat / 5); }
  static soalFromFlat(flat) { return flat % 5; }

  get activeFlat() { return this.state.soalAktif; }
  get activeMonologIdx() { return Section1.monologFromFlat(this.activeFlat); }
  get activeSoalIdx() { return Section1.soalFromFlat(this.activeFlat); }
  get activeMonolog() { return this.data[this.activeMonologIdx]; }
  get activeSoal() { return this.activeMonolog.soal[this.activeSoalIdx]; }

  _render() {
    this.container.innerHTML = `
      <div class="s1-layout">
        <!-- LEFT: Audio Player -->
        <div class="s1-left" id="s1-left">
          <div class="audio-card">
            <div class="audio-monolog-label" id="s1-monolog-label"></div>
            <div class="audio-title" id="s1-audio-title"></div>
            <div class="audio-waveform" id="s1-waveform"></div>
            <div class="audio-progress-bar" id="s1-audio-progress">
              <div class="audio-progress-fill" id="s1-audio-progress-fill"></div>
            </div>
            <div class="audio-time" id="s1-audio-time">00:00 / 00:00</div>
            <div class="audio-status" id="s1-audio-status">Siap diputar</div>
            <button class="audio-play-btn" id="s1-play-btn" aria-label="Putar Audio">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span id="s1-play-label">Putar Audio</span>
            </button>
            <div class="audio-rule">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
              Audio hanya dapat diputar <strong>1 kali</strong> per monolog
            </div>
          </div>
        </div>
        <!-- RIGHT: Soal -->
        <div class="s1-right" id="s1-right">
          <div class="soal-header">
            <div class="soal-badge" id="s1-soal-badge"></div>
            <button class="flag-btn" id="s1-flag-btn" title="Tandai Ragu-ragu">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>
              <span id="s1-flag-label">Tandai</span>
            </button>
          </div>
          <div class="soal-pertanyaan" id="s1-pertanyaan"></div>
          <div class="soal-pilihan" id="s1-pilihan"></div>
          <div class="soal-nav">
            <button class="nav-btn secondary" id="s1-prev-btn">← Sebelumnya</button>
            <button class="nav-btn primary" id="s1-next-btn">Selanjutnya →</button>
          </div>
        </div>
      </div>`;

    this._initAudio();
    this._updateAll();
    this._bindEvents();
  }

  _initAudio() {
    const waveEl = document.getElementById('s1-waveform');
    this.audioPlayer = new AudioPlayer(waveEl);

    // Hubungkan progress bar dan time
    const progEl = document.getElementById('s1-audio-progress-fill');
    if (progEl) this.audioPlayer.setProgressEl(progEl);

    const timeEl = document.getElementById('s1-audio-time');
    if (timeEl) this.audioPlayer.setTimeEl(timeEl);

    this.audioPlayer.onStart(() => {
      document.getElementById('s1-audio-status').textContent = 'Sedang diputar...';
      document.getElementById('s1-play-btn').disabled = true;
      document.getElementById('s1-play-btn').classList.add('playing');
    });
    this.audioPlayer.onEnd(() => {
      this._hasPlayed[this.activeMonologIdx] = true;
      const btn = document.getElementById('s1-play-btn');
      if (btn) {
        btn.disabled = true;
        btn.classList.remove('playing');
        btn.classList.add('played');
        document.getElementById('s1-play-label').textContent = 'Sudah Diputar';
        document.getElementById('s1-audio-status').textContent = 'Audio selesai — jawab soal di sebelah kanan';
      }
    });
  }

  _updateAll() {
    this._updateAudioPanel();
    this._updateSoalPanel();
  }

  _updateAudioPanel() {
    const mIdx = this.activeMonologIdx;
    const monolog = this.activeMonolog;
    document.getElementById('s1-monolog-label').textContent = monolog.label;
    document.getElementById('s1-audio-title').textContent = monolog.judul;

    const btn = document.getElementById('s1-play-btn');
    const statusEl = document.getElementById('s1-audio-status');
    const labelEl = document.getElementById('s1-play-label');

    if (this._hasPlayed[mIdx]) {
      btn.disabled = true;
      btn.classList.add('played');
      labelEl.textContent = 'Sudah Diputar';
      statusEl.textContent = 'Audio selesai — jawab soal di sebelah kanan';
    } else {
      btn.disabled = false;
      btn.classList.remove('played', 'playing');
      labelEl.textContent = 'Putar Audio';
      statusEl.textContent = 'Siap diputar';
    }

    // Re-init waveform element reference for new monolog
    const waveEl = document.getElementById('s1-waveform');
    if (waveEl) {
      this.audioPlayer._waveformEl = waveEl;
      this.audioPlayer._bars = [];
      this.audioPlayer._initWaveform();
    }
    // Reconnect progress bar & time
    const progEl = document.getElementById('s1-audio-progress-fill');
    if (progEl) this.audioPlayer.setProgressEl(progEl);

    const timeEl = document.getElementById('s1-audio-time');
    if (timeEl) {
      this.audioPlayer.setTimeEl(timeEl);
      timeEl.textContent = '00:00 / 00:00';
    }
  }

  _updateSoalPanel() {
    const flat = this.activeFlat;
    const mIdx = this.activeMonologIdx;
    const sIdx = this.activeSoalIdx;
    const soal = this.activeSoal;
    const total = 40;
    const jawaban = this.state.jawaban.s1;
    const flagged = this.state.flagged.s1;

    const soalDalamMonolog = this.activeSoalIdx + 1;
    document.getElementById('s1-soal-badge').textContent =
      `${this.activeMonolog.label} — Soal ${soalDalamMonolog}/5 (No. ${flat + 1} dari ${total})`;
    document.getElementById('s1-pertanyaan').textContent = soal.pertanyaan;

    const flagBtn = document.getElementById('s1-flag-btn');
    const isFlagged = flagged.includes(flat);
    document.getElementById('s1-flag-label').textContent = isFlagged ? 'Ditandai' : 'Tandai';
    flagBtn.classList.toggle('flagged', isFlagged);

    // Pilihan
    const pilEl = document.getElementById('s1-pilihan');
    pilEl.innerHTML = '';
    ['A', 'B', 'C', 'D'].forEach(key => {
      const chosen = jawaban[flat] === key;
      const btn = document.createElement('button');
      btn.className = `pilihan-btn ${chosen ? 'selected' : ''}`;
      btn.setAttribute('data-key', key);
      btn.setAttribute('aria-pressed', chosen);
      btn.innerHTML = `<span class="pilihan-key">${key}</span><span class="pilihan-text">${soal.pilihan[key]}</span>`;
      btn.addEventListener('click', () => this._handleAnswer(key));
      pilEl.appendChild(btn);
    });

    // Nav buttons — lock prev at start of each monolog block
    const isFirstInBlock = this.activeSoalIdx === 0;
    document.getElementById('s1-prev-btn').disabled = isFirstInBlock;
    const isLastInBlock = this.activeSoalIdx === 4;
    const isLastMonolog = this.activeMonologIdx === 7;
    if (flat === 39) {
      document.getElementById('s1-next-btn').textContent = 'Selesai Seksi I';
    } else if (isLastInBlock) {
      document.getElementById('s1-next-btn').textContent = 'Lanjut ke Monolog Berikutnya →';
    } else {
      document.getElementById('s1-next-btn').textContent = 'Selanjutnya →';
    }
  }

  _handleAnswer(key) {
    this.onAnswer('s1', this.activeFlat, key);
    // Update UI immediately
    document.querySelectorAll('#s1-pilihan .pilihan-btn').forEach(btn => {
      const k = btn.getAttribute('data-key');
      btn.classList.toggle('selected', k === key);
      btn.setAttribute('aria-pressed', k === key);
    });
  }

  _bindEvents() {
    document.getElementById('s1-play-btn').addEventListener('click', () => {
      const mIdx = this.activeMonologIdx;
      if (!this._hasPlayed[mIdx]) {
        // Path file MP3: audio/monolog-N.mp3
        const mp3Path = `audio/monolog-${mIdx + 1}.mp3`;
        this.audioPlayer.play(mp3Path);
      }
    });

    document.getElementById('s1-flag-btn').addEventListener('click', () => {
      this.onFlag('s1', this.activeFlat);
      const isFlagged = this.state.flagged.s1.includes(this.activeFlat);
      document.getElementById('s1-flag-label').textContent = isFlagged ? 'Ditandai' : 'Tandai';
      document.getElementById('s1-flag-btn').classList.toggle('flagged', isFlagged);
    });

    document.getElementById('s1-prev-btn').addEventListener('click', () => this._navigate(-1));
    document.getElementById('s1-next-btn').addEventListener('click', () => this._navigate(1));
  }

  _navigate(dir) {
    const newFlat = this.activeFlat + dir;
    if (newFlat < 0) return;
    if (newFlat > 39) {
      // Signal section complete
      document.dispatchEvent(new CustomEvent('section-complete', { detail: { section: 1 } }));
      return;
    }
    const oldMonolog = this.activeMonologIdx;
    this.state.soalAktif = newFlat;
    const newMonolog = this.activeMonologIdx;

    // If switching monolog, stop audio
    if (oldMonolog !== newMonolog) {
      this.audioPlayer.stop();
    }
    this._updateAll();
    if (typeof renderTracker === 'function') renderTracker();
  }

  goTo(flatIdx) {
    if (flatIdx < 0 || flatIdx > 39) return;
    const oldM = this.activeMonologIdx;
    this.state.soalAktif = flatIdx;
    if (oldM !== this.activeMonologIdx) this.audioPlayer.stop();
    this._updateAll();
    if (typeof renderTracker === 'function') renderTracker();
  }

  destroy() {
    if (this.audioPlayer) this.audioPlayer.stop();
  }
}
