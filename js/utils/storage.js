/**
 * js/utils/storage.js
 * localStorage-based session persistence
 */
const Storage = {
  KEY: 'ukbi_session',

  save(state) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify({
        ...state,
        _savedAt: Date.now()
      }));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  },

  load() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      // Expire sessions older than 6 hours
      if (Date.now() - data._savedAt > 6 * 60 * 60 * 1000) {
        this.clear();
        return null;
      }
      return data;
    } catch (e) {
      return null;
    }
  },

  clear() {
    localStorage.removeItem(this.KEY);
  },

  hasSession() {
    const s = this.load();
    return s !== null && s.peserta && s.seksiAktif;
  }
};
