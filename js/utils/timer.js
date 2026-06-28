/**
 * js/utils/timer.js
 * Countdown timer per seksi — auto-submit on expire
 */
class ExamTimer {
  constructor() {
    this._interval = null;
    this._remaining = 0;
    this._onTick = null;
    this._onExpire = null;
  }

  start(durationSeconds, onTick, onExpire) {
    this.stop();
    this._remaining = durationSeconds;
    this._onTick = onTick;
    this._onExpire = onExpire;

    // Immediate first tick
    this._onTick(this._remaining);

    this._interval = setInterval(() => {
      this._remaining--;
      if (this._onTick) this._onTick(this._remaining);
      if (this._remaining <= 0) {
        this.stop();
        if (this._onExpire) this._onExpire();
      }
    }, 1000);
  }

  stop() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = null;
    }
  }

  pause() { this.stop(); }

  getRemaining() { return this._remaining; }

  /** Format seconds → "MM:SS" */
  static format(seconds) {
    const m = Math.floor(Math.max(0, seconds) / 60).toString().padStart(2, '0');
    const s = (Math.max(0, seconds) % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }
}
