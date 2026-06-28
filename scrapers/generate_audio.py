import os
import re
import time
from gtts import gTTS

def main():
    data_path = r"d:\porto projek\belajarukbi\js\data.js"
    audio_dir = r"d:\porto projek\belajarukbi\audio"
    
    if not os.path.exists(audio_dir):
        os.makedirs(audio_dir)
        
    print("Membaca file data.js...")
    with open(data_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Ambil teks monolog menggunakan regex
    # Menemukan blok teks dalam monolog
    monolog_blocks = re.findall(r"teks:\s*`([\s\S]*?)`", content)
    
    print(f"Ditemukan {len(monolog_blocks)} teks monolog di data.js.")
    
    # Kita hanya butuh 8 monolog pertama (Seksi I)
    for idx, teks in enumerate(monolog_blocks[:8]):
        monolog_num = idx + 1
        output_file = os.path.join(audio_dir, f"monolog-{monolog_num}.mp3")
        
        # Bersihkan teks dari newline ganda agar jeda TTS natural
        clean_text = teks.replace("\n\n", " ").replace("\n", " ").strip()
        
        print(f"\n[Monolog {monolog_num}/8] Sedang mengunduh...")
        print(f"Teks: {clean_text[:60]}...")
        
        try:
            # Gunakan gTTS dengan bahasa Indonesia
            tts = gTTS(text=clean_text, lang='id', slow=False)
            tts.save(output_file)
            print(f"-> Berhasil disimpan di: {output_file}")
            
            # Berikan jeda 1 detik agar tidak terkena limit rate Google API
            time.sleep(1)
        except Exception as e:
            print(f"-> Gagal mengunduh Monolog {monolog_num}: {e}")

    print("\nProses selesai!")

if __name__ == "__main__":
    main()
