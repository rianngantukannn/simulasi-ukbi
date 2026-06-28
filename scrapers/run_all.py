# -*- coding: utf-8 -*-
"""
run_all.py
==========
Orchestrator: Menjalankan semua scraper/builder secara berurutan
dan menampilkan ringkasan hasil akhir.

Urutan eksekusi:
  1. scrape_ejaan.py → database/ejaan_db.json
  2. scrape_kbbi.py  → database/kbbi_db.json
  3. scrape_tbbbi.py → database/tbbbi_db.json
"""

import subprocess
import sys
import os
import json
import time

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DB_DIR     = os.path.join(SCRIPT_DIR, "..", "database")

SCRAPERS = [
    ("Ejaan (EYD V)",  "scrape_ejaan.py",  "ejaan_db.json"),
    ("KBBI",           "scrape_kbbi.py",   "kbbi_db.json"),
    ("TBBBI",          "scrape_tbbbi.py",  "tbbbi_db.json"),
]


def run_script(name: str, filename: str) -> bool:
    """Jalankan satu script dan tampilkan hasilnya."""
    script_path = os.path.join(SCRIPT_DIR, filename)
    print(f"\n{'─' * 60}")
    print(f"  ▶  Menjalankan: {name} ({filename})")
    print(f"{'─' * 60}")

    start = time.time()
    result = subprocess.run(
        [sys.executable, script_path],
        capture_output=False,
        text=True,
    )
    elapsed = time.time() - start

    if result.returncode == 0:
        print(f"\n  [OK] {name} selesai dalam {elapsed:.1f} detik.")
        return True
    else:
        print(f"\n  [FAIL] {name} GAGAL (exit code {result.returncode})")
        return False


def summarize() -> None:
    """Tampilkan ringkasan ukuran setiap file database."""
    print(f"\n{'=' * 60}")
    print("  [SUMMARY] RINGKASAN DATABASE")
    print(f"{'=' * 60}")
    print(f"  {'File':<25} {'Ukuran':>10}  {'Entri Utama':>15}")
    print(f"  {'─'*25} {'─'*10}  {'─'*15}")

    for _, _, db_file in SCRAPERS:
        path = os.path.join(DB_DIR, db_file)
        if not os.path.exists(path):
            print(f"  {db_file:<25} {'TIDAK ADA':>10}")
            continue

        size_kb = os.path.getsize(path) / 1024
        try:
            with open(path, encoding="utf-8") as f:
                data = json.load(f)

            if isinstance(data, list):
                entri = f"{len(data)} kaidah"
            elif isinstance(data, dict):
                if "kata_baku_tidak_baku" in data:
                    nb = len(data["kata_baku_tidak_baku"])
                    nd = len(data.get("daftar_kata_baku", []))
                    entri = f"{nb} pasang + {nd} kata"
                elif "bab" in data:
                    total = sum(
                        len(sb["kaidah"])
                        for bab in data["bab"]
                        for sb in bab["sub_bab"]
                    )
                    entri = f"{total} kaidah"
                else:
                    entri = "-"
            else:
                entri = "-"

            print(f"  {db_file:<25} {size_kb:>9.1f}KB  {entri:>15}")
        except Exception as exc:
            print(f"  {db_file:<25} {size_kb:>9.1f}KB  {'(error)':>15}")

    print(f"{'=' * 60}")
    print(f"  [DIR] Lokasi: {os.path.abspath(DB_DIR)}")
    print(f"{'=' * 60}\n")


def main() -> None:
    print("=" * 60)
    print("  [START] UKBI DATABASE BUILDER - RUN ALL")
    print("=" * 60)

    results: list[tuple[str, bool]] = []
    for name, filename, _ in SCRAPERS:
        ok = run_script(name, filename)
        results.append((name, ok))

    print(f"\n{'=' * 60}")
    print("  STATUS AKHIR")
    print(f"{'=' * 60}")
    for name, ok in results:
        status = "[OK]" if ok else "[FAIL]"
        print(f"  {status}  {name}")

    summarize()

    all_ok = all(ok for _, ok in results)
    sys.exit(0 if all_ok else 1)


if __name__ == "__main__":
    main()
