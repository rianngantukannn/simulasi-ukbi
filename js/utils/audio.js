/**
 * js/utils/audio.js
 * AudioPlayer — HTML5 Audio API
 * Menggantikan Web Speech API dengan file MP3 pre-generated.
 * Fallback ke Web Speech API jika file MP3 tidak tersedia.
 */
class AudioPlayer {
  constructor(waveformEl) {
    this._audio       = null;
    this._waveformEl  = waveformEl;
    this._waveInterval= null;
    this._bars        = [];
    this._playing     = false;
    this._onEndCb     = null;
    this._onStartCb   = null;
    this._progressBar = null;
    this._timeEl      = null;
    this._fallbackInterval = null;
    if (waveformEl) this._initWaveform();
  }

  /* ── Waveform ─────────────────────────────────────────── */
  _initWaveform() {
    this._waveformEl.innerHTML = '';
    const count = 36;
    for (let i = 0; i < count; i++) {
      const bar = document.createElement('div');
      bar.className = 'waveform-bar';
      bar.style.cssText = `
        width: 4px; border-radius: 4px; background: #b0c8eb;
        height: 8px; transition: height 0.15s ease, background 0.15s ease;
        flex-shrink: 0;
      `;
      this._waveformEl.appendChild(bar);
      this._bars.push(bar);
    }
  }

  _startWave() {
    this._stopWave();
    this._waveInterval = setInterval(() => {
      this._bars.forEach(bar => {
        const h = Math.random() * 48 + 6;
        bar.style.height = `${h}px`;
        bar.style.background = h > 32 ? '#fff' : '#b0c8eb';
      });
    }, 120);
  }

  _stopWave() {
    if (this._waveInterval) {
      clearInterval(this._waveInterval);
      this._waveInterval = null;
    }
    this._bars.forEach(bar => {
      bar.style.height = '8px';
      bar.style.background = '#b0c8eb';
    });
  }

  /* ── Callbacks ────────────────────────────────────────── */
  onStart(cb) { this._onStartCb = cb; }
  onEnd(cb)   { this._onEndCb = cb; }

  /* ── Progress bar & Time ──────────────────────────────── */
  setProgressEl(el) { this._progressBar = el; }
  setTimeEl(el)     { this._timeEl = el; }

  static formatTime(secs) {
    if (isNaN(secs) || secs === Infinity || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  _updateProgress() {
    const cur = this._audio ? this._audio.currentTime : 0;
    const dur = this._audio ? (this._audio.duration || 0) : 0;

    if (this._progressBar) {
      const pct = dur ? (cur / dur) * 100 : 0;
      this._progressBar.style.width = `${pct}%`;
    }

    if (this._timeEl) {
      this._timeEl.textContent = `${AudioPlayer.formatTime(cur)} / ${AudioPlayer.formatTime(dur)}`;
    }
  }

  /* ── Play ─────────────────────────────────────────────── */
  play(src) {
    this.stop();

    // Coba load MP3
    const audio = new Audio(src);
    this._audio = audio;
    audio.preload = 'auto';

    audio.addEventListener('loadedmetadata', () => this._updateProgress());

    audio.addEventListener('canplaythrough', () => {
      audio.play().catch(() => this._fallbackTTS());
    }, { once: true });

    audio.addEventListener('play', () => {
      this._playing = true;
      this._startWave();
      if (this._progressBar) this._progressBar.style.width = '0%';
      if (this._onStartCb) this._onStartCb();
    });

    audio.addEventListener('timeupdate', () => this._updateProgress());

    audio.addEventListener('ended', () => {
      this._playing = false;
      this._stopWave();
      if (this._progressBar) this._progressBar.style.width = '100%';
      if (this._onEndCb) this._onEndCb();
    });

    audio.addEventListener('error', () => {
      // File MP3 tidak ditemukan → fallback ke TTS
      console.warn(`[AudioPlayer] File tidak ditemukan: ${src}. Fallback ke Web Speech API.`);
      this._fallbackTTS(src);
    });

    audio.load();
  }

  /* ── Fallback Web Speech API ──────────────────────────── */
  _fallbackTTS(src) {
    // Ambil teks dari data.js berdasarkan nama file MP3
    // Format: audio/monolog-N.mp3 → ambil teks dari SECTION1_DATA[N-1].teks
    let teks = null;
    if (src && typeof SECTION1_DATA !== 'undefined') {
      const match = src.match(/monolog-(\d+)\.mp3/);
      if (match) {
        const idx = parseInt(match[1]) - 1;
        if (SECTION1_DATA[idx]) teks = SECTION1_DATA[idx].teks;
      }
    }

    if (!teks || !('speechSynthesis' in window)) {
      // Tidak ada fallback sama sekali — anggap selesai
      this._playing = false;
      this._stopWave();
      if (this._onEndCb) this._onEndCb();
      return;
    }

    const utter = new SpeechSynthesisUtterance(teks);
    utter.lang  = 'id-ID';
    utter.rate  = 0.88;
    utter.pitch = 1.0;

    // Pilih suara Indonesia terbaik yang tersedia
    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const priority = [
        v => v.lang === 'id-ID' && v.name.toLowerCase().includes('andika'),
        v => v.lang === 'id-ID' && /natural|neural|online/i.test(v.name),
        v => v.lang === 'id-ID',
        v => v.lang.startsWith('id'),
      ];
      for (const fn of priority) {
        const found = voices.find(fn);
        if (found) return found;
      }
      return null;
    };

    const voice = pickVoice();
    if (voice) utter.voice = voice;

    let elapsed = 0;
    const startFallbackTimer = () => {
      this._fallbackInterval = setInterval(() => {
        elapsed++;
        if (this._timeEl) {
          this._timeEl.textContent = `${AudioPlayer.formatTime(elapsed)} / --:-- (TTS)`;
        }
      }, 1000);
    };

    const stopFallbackTimer = () => {
      if (this._fallbackInterval) {
        clearInterval(this._fallbackInterval);
        this._fallbackInterval = null;
      }
    };

    utter.onstart = () => {
      this._playing = true;
      this._startWave();
      startFallbackTimer();
      if (this._onStartCb) this._onStartCb();
    };
    utter.onend = () => {
      this._playing = false;
      this._stopWave();
      stopFallbackTimer();
      if (this._onEndCb) this._onEndCb();
    };
    utter.onerror = () => {
      this._playing = false;
      this._stopWave();
      stopFallbackTimer();
      if (this._onEndCb) this._onEndCb();
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }

  /* ── Stop ─────────────────────────────────────────────── */
  stop() {
    if (this._audio) {
      this._audio.pause();
      this._audio.src = '';
      this._audio = null;
    }
    if (this._fallbackInterval) {
      clearInterval(this._fallbackInterval);
      this._fallbackInterval = null;
    }
    window.speechSynthesis.cancel();
    this._playing = false;
    this._stopWave();
  }

  isPlaying()   { return this._playing; }
  isSupported() { return true; }
}
