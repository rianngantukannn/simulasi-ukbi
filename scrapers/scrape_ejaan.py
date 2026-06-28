"""
scrape_ejaan.py
===============
Scraper untuk ejaan.kemdikbud.go.id (EYD Edisi V)

Mengambil seluruh kaidah ejaan beserta contoh benar/salah dari setiap bab/seksi.
Output : ../database/ejaan_db.json

Struktur output JSON:
[
  {
    "bab": "I",
    "judul": "Pemakaian Huruf",
    "seksi": "A",
    "sub_judul": "Huruf Kapital",
    "aturan": "Huruf kapital dipakai sebagai huruf pertama ...",
    "contoh_benar": ["Ahmad Rozak", "Dewi Sartika"],
    "contoh_salah": ["ahmad rozak", "dewi sartika"],
    "catatan": ""
  },
  ...
]
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import re
import os
import sys

BASE_URL = "https://ejaan.kemdikbud.go.id"
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "database")
OUTPUT_FILE = os.path.join(OUTPUT_DIR, "ejaan_db.json")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/125.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8",
}

# ─── Navigasi halaman EYD berdasarkan struktur situs ─────────────────────────
EYD_SECTIONS = [
    {"bab": "I",   "judul": "Pemakaian Huruf",      "path": "/eyd/pemakaian-huruf"},
    {"bab": "II",  "judul": "Penulisan Kata",        "path": "/eyd/penulisan-kata"},
    {"bab": "III", "judul": "Pemakaian Tanda Baca",  "path": "/eyd/pemakaian-tanda-baca"},
    {"bab": "IV",  "judul": "Penulisan Unsur Serapan", "path": "/eyd/penulisan-unsur-serapan"},
]

# Seksi-seksi di tiap bab (digunakan untuk mengambil halaman yang lebih spesifik)
EYD_SUBSECTIONS = {
    "I": [
        ("A", "Huruf Abjad",               "/eyd/huruf-abjad"),
        ("B", "Huruf Vokal",               "/eyd/huruf-vokal"),
        ("C", "Huruf Konsonan",            "/eyd/huruf-konsonan"),
        ("D", "Gabungan Huruf Konsonan",   "/eyd/gabungan-huruf-konsonan"),
        ("E", "Huruf Kapital",             "/eyd/huruf-kapital"),
        ("F", "Huruf Miring",              "/eyd/huruf-miring"),
        ("G", "Huruf Tebal",               "/eyd/huruf-tebal"),
    ],
    "II": [
        ("A", "Kata Dasar",                "/eyd/kata-dasar"),
        ("B", "Kata Berimbuhan",           "/eyd/kata-berimbuhan"),
        ("C", "Bentuk Ulang",              "/eyd/bentuk-ulang"),
        ("D", "Gabungan Kata",             "/eyd/gabungan-kata"),
        ("E", "Pemenggalan Kata",          "/eyd/pemenggalan-kata"),
        ("F", "Kata Depan",                "/eyd/kata-depan"),
        ("G", "Partikel",                  "/eyd/partikel"),
        ("H", "Singkatan dan Akronim",     "/eyd/singkatan-dan-akronim"),
        ("I", "Angka dan Bilangan",        "/eyd/angka-dan-bilangan"),
        ("J", "Kata Sandang",              "/eyd/kata-sandang"),
        ("K", "Kata Ganti",                "/eyd/kata-ganti"),
    ],
    "III": [
        ("A", "Tanda Titik",               "/eyd/tanda-titik"),
        ("B", "Tanda Koma",                "/eyd/tanda-koma"),
        ("C", "Tanda Titik Koma",          "/eyd/tanda-titik-koma"),
        ("D", "Tanda Titik Dua",           "/eyd/tanda-titik-dua"),
        ("E", "Tanda Hubung",              "/eyd/tanda-hubung"),
        ("F", "Tanda Pisah",               "/eyd/tanda-pisah"),
        ("G", "Tanda Tanya",               "/eyd/tanda-tanya"),
        ("H", "Tanda Seru",                "/eyd/tanda-seru"),
        ("I", "Tanda Elipsis",             "/eyd/tanda-elipsis"),
        ("J", "Tanda Petik",               "/eyd/tanda-petik"),
        ("K", "Tanda Petik Tunggal",       "/eyd/tanda-petik-tunggal"),
        ("L", "Tanda Kurung",              "/eyd/tanda-kurung"),
        ("M", "Tanda Kurung Siku",         "/eyd/tanda-kurung-siku"),
        ("N", "Tanda Garis Miring",        "/eyd/tanda-garis-miring"),
        ("O", "Tanda Penyingkat",          "/eyd/tanda-penyingkat"),
    ],
    "IV": [
        ("A", "Kaidah Penulisan Unsur Serapan", "/eyd/kaidah-penulisan-unsur-serapan"),
        ("B", "Daftar Padanan Ejaan",           "/eyd/daftar-padanan-ejaan"),
    ],
}

# ─── Dataset fallback komprehensif (jika website tidak dapat diakses) ─────────
# Berdasarkan EYD Edisi V yang telah terstandarisasi
EJAAN_FALLBACK: list[dict] = [
    # ── BAB I: PEMAKAIAN HURUF ─────────────────────────────────────────────────
    {
        "bab": "I", "judul": "Pemakaian Huruf",
        "seksi": "E", "sub_judul": "Huruf Kapital",
        "aturan": (
            "Huruf kapital dipakai sebagai huruf pertama unsur nama orang, "
            "termasuk julukan."
        ),
        "contoh_benar": ["Wage Rudolf Supratman", "Dewi Sartika", "Kha Daeng Buang"],
        "contoh_salah": ["wage rudolf supratman", "dewi sartika"],
        "catatan": "Nama orang selalu diawali huruf kapital, termasuk nama julukan.",
    },
    {
        "bab": "I", "judul": "Pemakaian Huruf",
        "seksi": "E", "sub_judul": "Huruf Kapital",
        "aturan": (
            "Huruf kapital dipakai sebagai huruf pertama nama jabatan dan pangkat "
            "yang diikuti nama orang atau yang dipakai sebagai pengganti nama orang "
            "tertentu, nama instansi, atau nama tempat."
        ),
        "contoh_benar": [
            "Wakil Presiden Adam Malik",
            "Gubernur Papua",
            "Laksamana Muda Udara Husein Sastranegara",
        ],
        "contoh_salah": [
            "wakil presiden Adam Malik",
            "gubernur Papua",
        ],
        "catatan": "",
    },
    {
        "bab": "I", "judul": "Pemakaian Huruf",
        "seksi": "E", "sub_judul": "Huruf Kapital",
        "aturan": (
            "Huruf kapital dipakai sebagai huruf pertama kata pada awal kalimat."
        ),
        "contoh_benar": [
            "Dia membaca buku.",
            "Apa yang dimaksud dengan geografi?",
        ],
        "contoh_salah": [
            "dia membaca buku.",
        ],
        "catatan": "",
    },
    {
        "bab": "I", "judul": "Pemakaian Huruf",
        "seksi": "E", "sub_judul": "Huruf Kapital",
        "aturan": (
            "Huruf kapital tidak dipakai sebagai huruf pertama kata yang menunjukkan "
            "hubungan kekerabatan (seperti bapak, ibu, saudara, kakak, adik, dan "
            "paman) yang tidak diikuti nama orang atau tidak dipakai sebagai sapaan."
        ),
        "contoh_benar": [
            "Kita harus menghormati bapak dan ibu kita.",
            "Semua kakak dan adiknya hadir.",
        ],
        "contoh_salah": [
            "Kita harus menghormati Bapak dan Ibu kita.",
        ],
        "catatan": "Kata kekerabatan tanpa nama = huruf kecil.",
    },
    {
        "bab": "I", "judul": "Pemakaian Huruf",
        "seksi": "F", "sub_judul": "Huruf Miring",
        "aturan": (
            "Huruf miring dipakai untuk menuliskan judul buku, nama majalah, "
            "atau nama surat kabar yang dikutip dalam tulisan."
        ),
        "contoh_benar": [
            "Majalah Bahasa dan Sastra terbit pada tahun 1975.",
            "Saya membaca buku Negarakertagama karangan Empu Prapanca.",
        ],
        "contoh_salah": [
            'Majalah "Bahasa dan Sastra" terbit pada tahun 1975.',
        ],
        "catatan": "Judul buku/majalah ditulis miring, bukan dalam tanda petik.",
    },
    {
        "bab": "I", "judul": "Pemakaian Huruf",
        "seksi": "F", "sub_judul": "Huruf Miring",
        "aturan": (
            "Huruf miring dipakai untuk menegaskan atau mengkhususkan huruf, "
            "bagian kata, kata, atau kelompok kata dalam teks."
        ),
        "contoh_benar": [
            "Huruf terakhir kata adik adalah k.",
            "Dalam pengembangan bahasa perlu diperhatikan masalah baku tidaknya kata.",
        ],
        "contoh_salah": [],
        "catatan": "",
    },
    # ── BAB II: PENULISAN KATA ─────────────────────────────────────────────────
    {
        "bab": "II", "judul": "Penulisan Kata",
        "seksi": "B", "sub_judul": "Kata Berimbuhan",
        "aturan": (
            "Imbuhan (awalan, sisipan, akhiran, serta gabungan awalan dan akhiran) "
            "ditulis serangkai dengan bentuk dasarnya."
        ),
        "contoh_benar": [
            "berkelanjutan", "pelajaran", "mempermasalahkan",
            "keterangan", "pemberitahuan",
        ],
        "contoh_salah": [
            "ber-kelanjutan", "mem-permasalahkan",
        ],
        "catatan": "Imbuhan ditulis serangkai, tidak pakai tanda hubung.",
    },
    {
        "bab": "II", "judul": "Penulisan Kata",
        "seksi": "B", "sub_judul": "Kata Berimbuhan",
        "aturan": (
            "Awalan atau akhiran ditulis serangkai dengan kata yang langsung "
            "mengikuti atau mendahuluinya jika bentuk dasarnya berupa gabungan kata."
        ),
        "contoh_benar": [
            "bertepuk tangan",
            "menganak sungai",
            "sebar luaskan",
        ],
        "contoh_salah": [
            "ber-tepuk tangan",
        ],
        "catatan": "",
    },
    {
        "bab": "II", "judul": "Penulisan Kata",
        "seksi": "D", "sub_judul": "Gabungan Kata",
        "aturan": (
            "Unsur gabungan kata yang lazim disebut kata majemuk, termasuk istilah "
            "khusus, ditulis terpisah."
        ),
        "contoh_benar": [
            "duta besar", "model linear", "kambing hitam",
            "orang tua", "simpang siur",
        ],
        "contoh_salah": [
            "dutabesar", "kambing-hitam",
        ],
        "catatan": "Kata majemuk ditulis terpisah kecuali yang sudah padu.",
    },
    {
        "bab": "II", "judul": "Penulisan Kata",
        "seksi": "D", "sub_judul": "Gabungan Kata",
        "aturan": (
            "Gabungan kata yang sudah padu benar ditulis serangkai."
        ),
        "contoh_benar": [
            "acapkali", "adakalanya", "apalagi",
            "bagaimana", "barangkali", "bilamana",
            "daripada", "dukacita", "kacamata",
            "kasatmata", "kilometer", "manasuka",
            "matahari", "olahraga", "padahal",
            "paramedis", "peribahasa", "puspawarna",
            "saputangan", "sediakala", "segitiga",
            "sukarela", "sukacita", "syahbandar",
            "waspadai", "wiraswasta",
        ],
        "contoh_salah": [
            "olah raga", "mata hari", "kaca mata", "suka rela",
        ],
        "catatan": "Daftar kata padu yang sudah baku dalam EYD V.",
    },
    {
        "bab": "II", "judul": "Penulisan Kata",
        "seksi": "F", "sub_judul": "Kata Depan",
        "aturan": (
            "Kata depan, seperti di, ke, dan dari, ditulis terpisah dari kata "
            "yang mengikutinya."
        ),
        "contoh_benar": [
            "Bermalam di sana.",
            "Dia berasal dari Jawa Barat.",
            "Ke mana dia pergi?",
            "di rumah", "ke pasar", "dari desa",
        ],
        "contoh_salah": [
            "Bermalam disana.",
            "Kemana dia pergi?",
            "dirumah", "kepasar", "daridesa",
        ],
        "catatan": "di/ke/dari sebagai kata depan selalu terpisah dari kata berikutnya.",
    },
    {
        "bab": "II", "judul": "Penulisan Kata",
        "seksi": "G", "sub_judul": "Partikel",
        "aturan": (
            "Partikel -lah, -kah, dan -tah ditulis serangkai dengan kata yang "
            "mendahuluinya."
        ),
        "contoh_benar": [
            "Bacalah buku itu baik-baik!",
            "Apakah yang tersirat dalam surat itu?",
            "Apakah benar ia lulusan universitas itu?",
        ],
        "contoh_salah": [
            "Baca lah buku itu!",
            "Apa kah yang tersirat?",
        ],
        "catatan": "Partikel -lah/-kah/-tah serangkai.",
    },
    {
        "bab": "II", "judul": "Penulisan Kata",
        "seksi": "G", "sub_judul": "Partikel",
        "aturan": (
            "Partikel pun ditulis terpisah dari kata yang mendahuluinya."
        ),
        "contoh_benar": [
            "Apa pun yang terjadi, kami siap.",
            "Jika kamu pergi, aku pun akan ikut.",
            "Satu pun tidak ada yang lolos.",
        ],
        "contoh_salah": [
            "Apapun yang terjadi.",
            "akupun akan ikut.",
        ],
        "catatan": "Pun selalu terpisah, kecuali dalam kata: adapun, andaipun, ataupun, bagaimanapun, biarpun, kalaupun, kendatipun, maupun, meskipun, sekalipun, sungguhpun, walaupun.",
    },
    {
        "bab": "II", "judul": "Penulisan Kata",
        "seksi": "H", "sub_judul": "Singkatan dan Akronim",
        "aturan": (
            "Singkatan nama orang, gelar, sapaan, jabatan, atau pangkat diikuti "
            "dengan tanda titik pada setiap unsur singkatan itu."
        ),
        "contoh_benar": [
            "A.H. Nasution", "H. Hamid", "Suman Hs.",
            "W.R. Supratman",
        ],
        "contoh_salah": [
            "AH Nasution", "H Hamid",
        ],
        "catatan": "",
    },
    {
        "bab": "II", "judul": "Penulisan Kata",
        "seksi": "H", "sub_judul": "Singkatan dan Akronim",
        "aturan": (
            "Akronim nama diri yang terdiri atas huruf awal setiap kata ditulis "
            "seluruhnya dengan huruf kapital tanpa tanda titik."
        ),
        "contoh_benar": [
            "BIG (Badan Informasi Geospasial)",
            "LIPI (Lembaga Ilmu Pengetahuan Indonesia)",
            "LAN (Lembaga Administrasi Negara)",
        ],
        "contoh_salah": [
            "B.I.G.", "L.I.P.I.",
        ],
        "catatan": "Akronim kapital semua tanpa titik.",
    },
    # ── BAB III: PEMAKAIAN TANDA BACA ─────────────────────────────────────────
    {
        "bab": "III", "judul": "Pemakaian Tanda Baca",
        "seksi": "A", "sub_judul": "Tanda Titik",
        "aturan": (
            "Tanda titik dipakai pada akhir kalimat pernyataan."
        ),
        "contoh_benar": [
            "Mereka akan datang ke pesta itu.",
            "Saya suka makan nasi goreng.",
        ],
        "contoh_salah": [
            "Mereka akan datang ke pesta itu",
        ],
        "catatan": "Kalimat pernyataan harus diakhiri tanda titik.",
    },
    {
        "bab": "III", "judul": "Pemakaian Tanda Baca",
        "seksi": "A", "sub_judul": "Tanda Titik",
        "aturan": (
            "Tanda titik tidak dipakai pada akhir judul yang merupakan kepala "
            "karangan, kepala ilustrasi, tabel, dan sebagainya."
        ),
        "contoh_benar": [
            "Acara Kunjungan Presiden ke Universitas Riau",
            "Cara Pengisian Formulir",
        ],
        "contoh_salah": [
            "Acara Kunjungan Presiden ke Universitas Riau.",
            "Cara Pengisian Formulir.",
        ],
        "catatan": "Judul tidak diakhiri tanda titik.",
    },
    {
        "bab": "III", "judul": "Pemakaian Tanda Baca",
        "seksi": "B", "sub_judul": "Tanda Koma",
        "aturan": (
            "Tanda koma dipakai di antara unsur-unsur dalam suatu pemerincian "
            "atau pembilangan yang mengandung lebih dari dua unsur."
        ),
        "contoh_benar": [
            "Saya membeli buku, pena, dan kertas.",
            "Buku, majalah, dan jurnal termasuk sumber kepustakaan.",
        ],
        "contoh_salah": [
            "Saya membeli buku pena dan kertas.",
        ],
        "catatan": "Gunakan koma sebelum 'dan' dalam daftar tiga unsur atau lebih.",
    },
    {
        "bab": "III", "judul": "Pemakaian Tanda Baca",
        "seksi": "B", "sub_judul": "Tanda Koma",
        "aturan": (
            "Tanda koma dipakai sebelum kata penghubung, seperti tetapi, melainkan, "
            "dan sedangkan, dalam kalimat majemuk (setara)."
        ),
        "contoh_benar": [
            "Saya ingin membeli kamera itu, tetapi uang saya tidak cukup.",
            "Ini bukan milik saya, melainkan milik ayah saya.",
        ],
        "contoh_salah": [
            "Saya ingin membeli kamera itu tetapi uang saya tidak cukup.",
        ],
        "catatan": "Koma sebelum tetapi/melainkan/sedangkan.",
    },
    {
        "bab": "III", "judul": "Pemakaian Tanda Baca",
        "seksi": "B", "sub_judul": "Tanda Koma",
        "aturan": (
            "Tanda koma tidak dipakai untuk memisahkan anak kalimat dari induk kalimat "
            "jika anak kalimat itu mengiringi induk kalimatnya."
        ),
        "contoh_benar": [
            "Dia datang karena kami mengundangnya.",
            "Kami mengundangnya karena dia punya ilmu yang bermanfaat.",
        ],
        "contoh_salah": [
            "Dia datang, karena kami mengundangnya.",
        ],
        "catatan": "Anak kalimat di belakang induk tidak perlu koma pemisah.",
    },
    {
        "bab": "III", "judul": "Pemakaian Tanda Baca",
        "seksi": "D", "sub_judul": "Tanda Titik Dua",
        "aturan": (
            "Tanda titik dua dipakai pada akhir suatu pernyataan lengkap "
            "yang diikuti pemerincian atau penjelasan."
        ),
        "contoh_benar": [
            "Mereka memerlukan perabot rumah tangga: kursi, meja, dan lemari.",
            "Hanya ada dua pilihan bagi pejuang kemerdekaan itu: hidup atau mati.",
        ],
        "contoh_salah": [
            "Mereka memerlukan: kursi, meja, dan lemari.",
        ],
        "catatan": "Tanda titik dua tidak dipakai jika pernyataan sebelumnya tidak lengkap.",
    },
    {
        "bab": "III", "judul": "Pemakaian Tanda Baca",
        "seksi": "E", "sub_judul": "Tanda Hubung",
        "aturan": (
            "Tanda hubung dipakai untuk menyambung unsur kata ulang."
        ),
        "contoh_benar": [
            "anak-anak", "berlari-lari", "sayur-mayur",
            "ramah-tamah", "lauk-pauk",
        ],
        "contoh_salah": [
            "anakanak", "berlarilarilari", "sayur mayur",
        ],
        "catatan": "Kata ulang wajib pakai tanda hubung.",
    },
    {
        "bab": "III", "judul": "Pemakaian Tanda Baca",
        "seksi": "J", "sub_judul": "Tanda Petik",
        "aturan": (
            "Tanda petik dipakai untuk mengapit petikan langsung yang berasal "
            "dari pembicaraan, naskah, atau bahan tertulis lain."
        ),
        "contoh_benar": [
            '"Merdeka atau mati!" seru Bung Tomo dalam pidatonya.',
            '"Sudah lama tidak bertemu," katanya.',
        ],
        "contoh_salah": [
            "Merdeka atau mati! seru Bung Tomo.",
        ],
        "catatan": "Petikan langsung diapit tanda petik ganda.",
    },
    # ── BAB IV: PENULISAN UNSUR SERAPAN ───────────────────────────────────────
    {
        "bab": "IV", "judul": "Penulisan Unsur Serapan",
        "seksi": "A", "sub_judul": "Kaidah Penulisan Unsur Serapan",
        "aturan": (
            "Kata serapan dari bahasa asing dan bahasa daerah disesuaikan "
            "ejaannya dengan kaidah bahasa Indonesia."
        ),
        "contoh_benar": [
            "apotek (bukan apotik)",
            "analisis (bukan analisa)",
            "teknik (bukan tehnik)",
            "jadwal (bukan jadual)",
            "metode (bukan metoda)",
            "sistem (bukan sistim)",
            "izin (bukan ijin)",
            "sah (bukan syah)",
            "foto (bukan photo)",
            "tim (bukan team)",
        ],
        "contoh_salah": [
            "apotik", "analisa", "tehnik", "jadual",
            "metoda", "sistim", "ijin", "syah", "photo", "team",
        ],
        "catatan": "Daftar kata baku sesuai EYD Edisi V.",
    },
    {
        "bab": "IV", "judul": "Penulisan Unsur Serapan",
        "seksi": "A", "sub_judul": "Kaidah Penulisan Unsur Serapan",
        "aturan": (
            "Gugus konsonan ck dalam bahasa asing diserap menjadi k."
        ),
        "contoh_benar": [
            "akuarium (aquarium)", "akustik (acoustic)",
            "aksen (accent)", "akting (acting)",
        ],
        "contoh_salah": [
            "aquarium", "acoustic",
        ],
        "catatan": "qu- → kw-, ck → k, dll.",
    },
]


def get_page(url: str, retries: int = 3, delay: float = 1.5) -> requests.Response | None:
    """Ambil halaman web dengan retry dan jeda antar request."""
    for attempt in range(retries):
        try:
            time.sleep(delay)
            resp = requests.get(url, headers=HEADERS, timeout=20)
            resp.raise_for_status()
            return resp
        except requests.RequestException as exc:
            print(f"  [WARN] Percobaan {attempt + 1}/{retries} gagal: {exc}")
            if attempt < retries - 1:
                time.sleep(2 ** attempt)
    return None


def extract_rules_from_page(soup: BeautifulSoup, bab: str, judul: str,
                             seksi: str, sub_judul: str) -> list[dict]:
    """Ekstrak aturan + contoh dari konten halaman."""
    entries: list[dict] = []
    content_div = (
        soup.find("div", class_="content")
        or soup.find("div", class_="entry-content")
        or soup.find("main")
        or soup.find("article")
        or soup.find("div", id="content")
    )
    if not content_div:
        return entries

    paragraphs = content_div.find_all(["p", "li"])
    current_aturan = ""
    current_benar: list[str] = []
    current_salah: list[str] = []
    current_catatan = ""

    for elem in paragraphs:
        text = elem.get_text(" ", strip=True)
        if not text:
            continue

        # Heuristik: paragraf panjang = aturan, paragraf pendek dalam tabel/span = contoh
        if len(text) > 60 and not text.startswith("Contoh"):
            if current_aturan:
                entries.append({
                    "bab": bab, "judul": judul,
                    "seksi": seksi, "sub_judul": sub_judul,
                    "aturan": current_aturan,
                    "contoh_benar": current_benar,
                    "contoh_salah": current_salah,
                    "catatan": current_catatan,
                })
                current_benar, current_salah, current_catatan = [], [], ""
            current_aturan = text
        elif text.startswith("Contoh") or ":" in text:
            # Pisahkan teks yang mengandung pasangan benar vs. salah
            parts = text.split("(bukan")
            if len(parts) == 2:
                current_benar.append(parts[0].strip().lstrip("- "))
                current_salah.append(parts[1].rstrip(")").strip())
            else:
                current_benar.append(text.lstrip("- "))

    # Simpan aturan terakhir
    if current_aturan:
        entries.append({
            "bab": bab, "judul": judul,
            "seksi": seksi, "sub_judul": sub_judul,
            "aturan": current_aturan,
            "contoh_benar": current_benar,
            "contoh_salah": current_salah,
            "catatan": current_catatan,
        })

    return entries


def scrape_from_web() -> list[dict]:
    """Coba ambil data dari website ejaan.kemdikbud.go.id."""
    all_data: list[dict] = []
    for bab, seksi_list in EYD_SUBSECTIONS.items():
        bab_judul = next((s["judul"] for s in EYD_SECTIONS if s["bab"] == bab), "")
        for seksi_kode, sub_judul, path in seksi_list:
            url = BASE_URL + path
            print(f"  Mengambil Bab {bab}-{seksi_kode}: {sub_judul} → {url}")
            resp = get_page(url)
            if resp is None:
                print(f"  [SKIP] Gagal mengambil {url}")
                continue
            soup = BeautifulSoup(resp.text, "lxml")
            entries = extract_rules_from_page(soup, bab, bab_judul, seksi_kode, sub_judul)
            if entries:
                all_data.extend(entries)
                print(f"    ✓ {len(entries)} aturan ditemukan")
            else:
                print(f"    ~ Tidak ada aturan terparsing dari halaman ini")
    return all_data


def main() -> None:
    print("=" * 60)
    print("  SCRAPER: ejaan.kemdikbud.go.id (EYD Edisi V)")
    print("=" * 60)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    all_data: list[dict] = []

    # Coba ambil dari web terlebih dahulu
    print("\n[1/2] Mencoba scraping dari website ...")
    try:
        web_data = scrape_from_web()
        if web_data:
            all_data.extend(web_data)
            print(f"\n✓ Berhasil mendapatkan {len(web_data)} aturan dari website.")
    except Exception as exc:
        print(f"  [WARN] Scraping website gagal: {exc}")

    # Gabungkan dengan dataset fallback yang sudah dikurasi
    print("\n[2/2] Menggabungkan dengan dataset kaidah EYD V yang sudah dikurasi ...")
    # Hindari duplikasi berdasarkan aturan
    existing_aturan = {e["aturan"] for e in all_data}
    added = 0
    for entry in EJAAN_FALLBACK:
        if entry["aturan"] not in existing_aturan:
            all_data.append(entry)
            existing_aturan.add(entry["aturan"])
            added += 1
    print(f"  + {added} aturan dari dataset kaidah EYD V ditambahkan.")

    # Urutkan berdasarkan bab → seksi
    all_data.sort(key=lambda x: (x["bab"], x["seksi"]))

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(all_data, f, ensure_ascii=False, indent=2)

    print(f"\n{'=' * 60}")
    print(f"  [DONE] SELESAI: {len(all_data)} kaidah disimpan ke:")
    print(f"     {OUTPUT_FILE}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
