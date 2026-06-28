import pdfplumber

path = r'd:\porto projek\belajarukbi\scrapers\Latihan_Soal_Kemahiran_Berbahasa_Indonesia.pdf'
with pdfplumber.open(path) as pdf:
    total = len(pdf.pages)
    print(f"Total halaman: {total}\n")
    for i, page in enumerate(pdf.pages[18:65]):
        t = page.extract_text()
        if t:
            print(f"=== HALAMAN {i+19} ===")
            print(t)
            print()
