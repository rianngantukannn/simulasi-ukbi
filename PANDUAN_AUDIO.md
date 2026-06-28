# Panduan Menyiapkan File Audio MP3 (Seksi I)

Untuk mencocokkan simulasi dengan UKBI resmi yang menggunakan rekaman suara berkualitas tinggi (bebas aksen Inggris dari default browser TTS), kami telah mengubah sistem audio ke **HTML5 Audio Player** yang memutar file MP3 lokal.

## 📂 Lokasi Folder Audio
Harap buat folder bernama `audio` di dalam direktori project utama Anda:
`d:\porto projek\belajarukbi\audio\`

Masukkan 8 file MP3 hasil generator dengan nama persis seperti di bawah ini:
* `monolog-1.mp3`
* `monolog-2.mp3`
* `monolog-3.mp3`
* `monolog-4.mp3`
* `monolog-5.mp3`
* `monolog-6.mp3`
* `monolog-7.mp3`
* `monolog-8.mp3`

---

## 🎙️ Cara Menghasilkan File MP3 Kualitas Tinggi (Gratis & Cepat)

### Opsi A: ElevenLabs (Rekomendasi Utama - Suara Sangat Alami)
1. Buka situs [elevenlabs.io](https://elevenlabs.io/) (Anda bisa mendaftar akun gratis).
2. Di bagian **Speech Synthesis**:
   * Pilih model: **Eleven Multilingual v2**.
   * Pilih suara: **"Bella"** atau **"Sarah"** (suara wanita Indonesia yang jernih dan berintonasi natural).
   * Atur bahasa ke **Indonesian**.
3. Buka file [data.js](file:///d:/porto%20projek/belajarukbi/js/data.js) dan salin teks monolog (elemen `teks`) untuk masing-masing monolog.
4. Tempel teks tersebut ke ElevenLabs dan klik **Generate**.
5. Unduh hasilnya, lalu ubah nama filenya menjadi `monolog-1.mp3` s.d. `monolog-8.mp3` dan simpan di folder `audio/`.

### Opsi B: TTSMP3 (Gratis, Tanpa Registrasi)
1. Buka [ttsmp3.com](https://ttsmp3.com/).
2. Tempel teks monolog Anda ke kotak teks.
3. Pilih bahasa/suara: **Indonesian (Ardi)** atau **Indonesian (Putri)**.
4. Klik **Read** untuk mencoba, lalu klik **Download as MP3**.
5. Simpan ke folder `audio/` dengan penamaan yang sesuai.

---

## ⚡ Fitur Fallback Otomatis
Jika Anda belum mengunduh file MP3 di atas, **sistem secara otomatis akan mendeteksi ketidakberadaan file** dan melakukan *fallback* ke Web Speech API (suara bawaan browser) sehingga simulasi ujian tetap dapat dimainkan tanpa error.
