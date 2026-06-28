/**
 * js/data.js
 * Semua konten soal UKBI Simulasi + loader database JSON
 * Seksi I : 8 monolog × 5 soal = 40 soal
 * Seksi II : 25 soal dari database JSON
 * Seksi III: 5 bacaan × 8 soal  = 40 soal
 */

/* ═══════════════════════════════════════════════════════════════
   SEKSI I — MENDENGARKAN
   ═══════════════════════════════════════════════════════════════ */
const SECTION1_DATA = [
  {
    id: 'monolog-1',
    judul: 'Manfaat Membaca Buku',
    label: 'Monolog I',
    teks: `Selamat pagi. Pada kesempatan ini, saya akan membahas tentang manfaat membaca buku bagi kehidupan manusia. Membaca buku adalah salah satu kegiatan yang paling bermanfaat yang dapat dilakukan oleh siapa pun, tanpa memandang usia maupun latar belakang pendidikan.

Pertama, membaca buku dapat meningkatkan pengetahuan dan wawasan. Melalui buku, kita dapat mempelajari berbagai hal yang tidak kita ketahui sebelumnya. Mulai dari ilmu pengetahuan, sejarah, teknologi, hingga seni dan budaya. Setiap buku membuka jendela baru menuju dunia yang lebih luas.

Kedua, membaca buku secara rutin terbukti dapat meningkatkan kemampuan berpikir kritis dan analitis. Ketika kita membaca, otak kita dipaksa untuk memproses informasi, membuat koneksi antarkonsep, dan menyimpulkan makna dari teks yang dibaca. Proses ini melatih kemampuan berpikir logis secara berkelanjutan.

Ketiga, membaca buku dapat memperkaya kosakata dan meningkatkan kemampuan berbahasa. Semakin banyak buku yang kita baca, semakin banyak kosakata baru yang kita serap. Hal ini secara langsung meningkatkan kemampuan berkomunikasi, baik secara lisan maupun tulisan.

Keempat, membaca buku dapat mengurangi tingkat stres. Penelitian menunjukkan bahwa membaca selama enam menit saja sudah dapat mengurangi tingkat stres hingga enam puluh delapan persen.

Oleh karena itu, marilah kita membiasakan diri membaca buku setiap hari, setidaknya selama tiga puluh menit. Dengan membaca, kita berinvestasi pada diri sendiri untuk masa depan yang lebih baik.`,
    soal: [
      { id: 's1-m1-q1', pertanyaan: 'Topik yang dibahas dalam monolog tersebut adalah …',
        pilihan: { A: 'Cara memilih buku yang baik untuk dibaca.', B: 'Manfaat membaca buku bagi kehidupan manusia.', C: 'Sejarah perkembangan buku di Indonesia.', D: 'Pentingnya mendirikan perpustakaan di sekolah.' },
        jawaban: 'B' },
      { id: 's1-m1-q2', pertanyaan: 'Berdasarkan monolog, salah satu manfaat membaca buku adalah …',
        pilihan: { A: 'Meningkatkan kemampuan olahraga.', B: 'Mempercepat pertumbuhan fisik seseorang.', C: 'Memperkaya kosakata dan meningkatkan kemampuan berbahasa.', D: 'Mengembangkan bakat seni secara otomatis.' },
        jawaban: 'C' },
      { id: 's1-m1-q3', pertanyaan: 'Menurut monolog, membaca buku dapat melatih kemampuan …',
        pilihan: { A: 'Berpikir kreatif dan imajinatif.', B: 'Berpikir kritis dan analitis.', C: 'Berpikir cepat dan spontan.', D: 'Berpikir abstrak dan filosofis.' },
        jawaban: 'B' },
      { id: 's1-m1-q4', pertanyaan: 'Berapa lama membaca dapat mengurangi stres secara signifikan menurut penelitian yang disebutkan?',
        pilihan: { A: 'Dua menit.', B: 'Sepuluh menit.', C: 'Enam menit.', D: 'Tiga puluh menit.' },
        jawaban: 'C' },
      { id: 's1-m1-q5', pertanyaan: 'Anjuran pembicara di akhir monolog adalah …',
        pilihan: { A: 'Membeli buku baru setiap minggu.', B: 'Mendaftarkan diri ke perpustakaan daerah.', C: 'Membiasakan diri membaca buku setiap hari minimal tiga puluh menit.', D: 'Mengajarkan anak membaca sejak usia dini.' },
        jawaban: 'C' }
    ]
  },
  {
    id: 'monolog-2',
    judul: 'Fenomena Urban Farming',
    label: 'Monolog II',
    teks: `Selamat siang. Kita akan membahas tentang fenomena urban farming atau pertanian perkotaan yang semakin populer di berbagai kota besar di Indonesia dan dunia.

Urban farming adalah kegiatan bercocok tanam yang dilakukan di lingkungan perkotaan, baik di lahan terbatas seperti rooftop atau atap gedung, balkon, halaman sempit, maupun di dalam ruangan menggunakan teknik khusus. Fenomena ini muncul sebagai respons terhadap berbagai tantangan perkotaan seperti keterbatasan lahan, peningkatan jumlah penduduk, dan kekhawatiran akan ketahanan pangan.

Ada beberapa alasan mengapa urban farming semakin diminati masyarakat kota. Pertama, urban farming memungkinkan warga kota untuk menghasilkan bahan makanan sendiri. Kedua, kegiatan bertani di kota dapat menjadi sarana relaksasi dan terapi psikologis bagi warga yang sehari-hari dihadapkan pada tekanan pekerjaan.

Ketiga, urban farming berkontribusi pada penghijauan kota dan pengurangan emisi karbon. Tanaman yang ditanam di atap gedung atau dinding vertical garden dapat membantu mendinginkan suhu kota yang sering mengalami fenomena urban heat island.

Keempat, urban farming dapat menjadi sumber pendapatan tambahan bagi warga kota. Hasil panen yang berlebih dapat dijual kepada tetangga atau melalui pasar organik lokal.

Namun, urban farming juga memiliki tantangan tersendiri. Biaya awal yang cukup tinggi, keterbatasan waktu warga kota, serta kurangnya pengetahuan tentang teknik bercocok tanam menjadi hambatan yang perlu diatasi.`,
    soal: [
      { id: 's1-m2-q1', pertanyaan: 'Apa yang dimaksud dengan urban farming menurut monolog?',
        pilihan: { A: 'Pertanian modern yang menggunakan teknologi canggih.', B: 'Kegiatan bercocok tanam yang dilakukan di lingkungan perkotaan.', C: 'Program pemerintah untuk meningkatkan ketahanan pangan.', D: 'Pertanian organik yang bebas dari bahan kimia.' },
        jawaban: 'B' },
      { id: 's1-m2-q2', pertanyaan: 'Fenomena urban farming muncul sebagai respons terhadap tantangan berikut, KECUALI …',
        pilihan: { A: 'Keterbatasan lahan.', B: 'Peningkatan jumlah penduduk.', C: 'Kekhawatiran akan ketahanan pangan.', D: 'Penurunan kualitas air bersih.' },
        jawaban: 'D' },
      { id: 's1-m2-q3', pertanyaan: 'Manfaat urban farming bagi kesehatan mental warga kota adalah …',
        pilihan: { A: 'Meningkatkan kemampuan fisik dan daya tahan tubuh.', B: 'Menjadi sarana relaksasi dan terapi psikologis.', C: 'Mengurangi risiko penyakit menular di perkotaan.', D: 'Membantu warga kota berolahraga secara teratur.' },
        jawaban: 'B' },
      { id: 's1-m2-q4', pertanyaan: 'Fenomena urban heat island dapat diatasi dengan urban farming karena …',
        pilihan: { A: 'Tanaman menghasilkan oksigen yang menyerap polusi.', B: 'Tanaman di atap dan dinding membantu mendinginkan suhu kota.', C: 'Pertanian kota mengurangi jumlah kendaraan bermotor.', D: 'Tanaman menyerap air hujan dan mencegah banjir.' },
        jawaban: 'B' },
      { id: 's1-m2-q5', pertanyaan: 'Manakah yang disebutkan sebagai hambatan dalam menjalankan urban farming?',
        pilihan: { A: 'Kurangnya dukungan dari komunitas sekitar.', B: 'Biaya awal yang cukup tinggi dan keterbatasan waktu.', C: 'Sulitnya mendapatkan bibit tanaman di perkotaan.', D: 'Larangan dari pemerintah kota terhadap pertanian urban.' },
        jawaban: 'B' }
    ]
  },
  {
    id: 'monolog-3',
    judul: 'Sejarah Batik Indonesia',
    label: 'Monolog III',
    teks: `Selamat sore. Pada kesempatan ini, saya akan menyampaikan informasi mengenai batik, salah satu warisan budaya Indonesia yang telah diakui oleh dunia internasional.

Batik merupakan kain yang dihiasi dengan ragam hias atau motif tertentu menggunakan teknik pewarnaan dengan lilin atau malam sebagai media perintang warna. Kata batik berasal dari bahasa Jawa, yaitu gabungan dari kata "amba" yang berarti menulis atau menggambar, dan "titik" yang berarti titik.

Sejarah batik di Indonesia sangat panjang. Berdasarkan catatan sejarah, batik sudah dikenal di Jawa sejak abad ke-17. Pada masa itu, batik hanya digunakan oleh kalangan kerajaan dan bangsawan sebagai busana resmi yang melambangkan status sosial.

Seiring berjalannya waktu, batik mulai dikenal dan digunakan oleh masyarakat umum. Perkembangan ini tidak lepas dari pengaruh perdagangan yang membawa berbagai motif dari luar, seperti dari India, China, dan negara-negara Arab.

Pada tanggal dua Oktober dua ribu sembilan, UNESCO secara resmi mengakui batik Indonesia sebagai Warisan Kemanusiaan untuk Budaya Lisan dan Nonbendawi. Saat ini, batik telah hadir dalam berbagai produk modern yang diminati di pasar internasional.`,
    soal: [
      { id: 's1-m3-q1', pertanyaan: 'Kata "batik" berasal dari dua kata dalam bahasa Jawa. Apa arti kata "amba"?',
        pilihan: { A: 'Titik atau bintik.', B: 'Menulis atau menggambar.', C: 'Warna atau corak.', D: 'Kain atau lembaran.' },
        jawaban: 'B' },
      { id: 's1-m3-q2', pertanyaan: 'Teknik utama yang digunakan dalam pembuatan batik adalah …',
        pilihan: { A: 'Teknik tenun dengan alat tradisional.', B: 'Teknik sulam atau bordir tangan.', C: 'Teknik pewarnaan menggunakan lilin sebagai perintang warna.', D: 'Teknik cetak menggunakan mesin modern.' },
        jawaban: 'C' },
      { id: 's1-m3-q3', pertanyaan: 'Pada awalnya, batik hanya digunakan oleh …',
        pilihan: { A: 'Pedagang dan saudagar kaya.', B: 'Kalangan kerajaan dan bangsawan.', C: 'Para seniman dan pengrajin.', D: 'Masyarakat umum di pedesaan.' },
        jawaban: 'B' },
      { id: 's1-m3-q4', pertanyaan: 'Pengaruh luar manakah yang ikut memengaruhi perkembangan motif batik Jawa?',
        pilihan: { A: 'Eropa, Amerika, dan Australia.', B: 'India, China, dan negara-negara Arab.', C: 'Jepang, Korea, dan Thailand.', D: 'Mesir, Turki, dan Persia.' },
        jawaban: 'B' },
      { id: 's1-m3-q5', pertanyaan: 'Kapan UNESCO secara resmi mengakui batik Indonesia sebagai warisan dunia?',
        pilihan: { A: '2 Oktober 1999.', B: '2 Oktober 2007.', C: '2 Oktober 2009.', D: '2 Oktober 2011.' },
        jawaban: 'C' }
    ]
  },
  {
    id: 'monolog-4',
    judul: 'Perubahan Iklim dan Dampaknya',
    label: 'Monolog IV',
    teks: `Selamat malam. Saya akan menyampaikan informasi penting mengenai perubahan iklim dan dampaknya terhadap kehidupan manusia serta lingkungan.

Perubahan iklim adalah perubahan jangka panjang dalam pola suhu dan cuaca di Bumi. Sejak abad ke-20 aktivitas manusia menjadi penyebab utama perubahan ini, terutama melalui pembakaran bahan bakar fosil seperti batu bara, minyak bumi, dan gas alam, yang menghasilkan emisi gas rumah kaca.

Dampak perubahan iklim sangat luas. Pertama, suhu rata-rata Bumi terus meningkat. Dekade pertama abad ke-21 tercatat sebagai dekade terpanas dalam sejarah pengukuran suhu Bumi. Kenaikan suhu ini menyebabkan mencairnya es di kutub dan kenaikan permukaan air laut.

Kedua, perubahan iklim memengaruhi pola curah hujan secara drastis. Indonesia, sebagai negara kepulauan, sangat rentan terhadap dampak ini, terutama wilayah-wilayah pesisir yang terancam tenggelam akibat kenaikan air laut.

Ketiga, perubahan iklim mengancam keanekaragaman hayati. Banyak spesies tumbuhan dan hewan yang tidak mampu beradaptasi, sehingga terancam punah. Diperlukan aksi nyata seperti beralih ke energi terbarukan, menanam pohon, dan mengurangi konsumsi daging.`,
    soal: [
      { id: 's1-m4-q1', pertanyaan: 'Apa yang dimaksud dengan perubahan iklim menurut monolog?',
        pilihan: { A: 'Pergantian musim hujan dan kemarau yang terjadi setiap tahun.', B: 'Perubahan jangka panjang dalam pola suhu dan cuaca di Bumi.', C: 'Bencana alam yang disebabkan oleh aktivitas gunung berapi.', D: 'Perubahan cuaca harian yang sulit diprediksi.' },
        jawaban: 'B' },
      { id: 's1-m4-q2', pertanyaan: 'Penyebab utama perubahan iklim sejak abad ke-20 adalah …',
        pilihan: { A: 'Aktivitas gunung berapi yang semakin sering.', B: 'Rotasi Bumi yang mulai tidak stabil.', C: 'Aktivitas manusia terutama pembakaran bahan bakar fosil.', D: 'Perubahan orbit Bumi mengelilingi Matahari.' },
        jawaban: 'C' },
      { id: 's1-m4-q3', pertanyaan: 'Akibat dari meningkatnya suhu rata-rata Bumi adalah …',
        pilihan: { A: 'Meningkatnya kualitas udara di kota-kota besar.', B: 'Mencairnya es di kutub dan kenaikan permukaan air laut.', C: 'Berkurangnya intensitas badai dan angin topan.', D: 'Meningkatnya produktivitas pertanian secara global.' },
        jawaban: 'B' },
      { id: 's1-m4-q4', pertanyaan: 'Mengapa Indonesia sangat rentan terhadap dampak perubahan iklim?',
        pilihan: { A: 'Karena Indonesia memiliki banyak gunung berapi yang aktif.', B: 'Karena Indonesia adalah negara kepulauan dengan banyak wilayah pesisir.', C: 'Karena Indonesia menghasilkan emisi karbon terbesar di Asia.', D: 'Karena Indonesia memiliki hutan tropis yang luas.' },
        jawaban: 'B' },
      { id: 's1-m4-q5', pertanyaan: 'Dampak perubahan iklim terhadap keanekaragaman hayati adalah …',
        pilihan: { A: 'Munculnya spesies baru yang lebih kuat.', B: 'Banyak spesies terancam punah karena tidak mampu beradaptasi.', C: 'Perpindahan hewan ke habitat yang lebih luas.', D: 'Meningkatnya populasi hewan liar secara alami.' },
        jawaban: 'B' }
    ]
  },
  {
    id: 'monolog-5',
    judul: 'Pentingnya Menjaga Kesehatan Jantung',
    label: 'Monolog V',
    teks: `Selamat pagi. Pada kesempatan ini, saya akan berbicara mengenai pentingnya menjaga kesehatan jantung. Jantung adalah organ vital yang bekerja tanpa henti sepanjang hidup kita. Setiap detik, jantung memompa darah ke seluruh tubuh untuk memberikan oksigen dan nutrisi yang dibutuhkan oleh setiap sel.

Penyakit jantung saat ini menjadi salah satu penyebab kematian tertinggi di seluruh dunia, termasuk di Indonesia. Berdasarkan data Kementerian Kesehatan, penyakit jantung dan pembuluh darah menyumbang sekitar dua puluh persen dari total kematian di Indonesia setiap tahunnya.

Ada beberapa langkah yang dapat dilakukan untuk menjaga kesehatan jantung. Pertama, menjaga pola makan sehat dengan mengonsumsi banyak sayuran, buah-buahan, biji-bijian utuh, dan ikan. Hindari makanan tinggi lemak jenuh, gula tambahan, dan garam berlebihan.

Kedua, berolahraga secara teratur. Para ahli merekomendasikan setidaknya seratus lima puluh menit aktivitas fisik intensitas sedang per minggu. Olahraga seperti berjalan kaki, berenang, atau bersepeda sangat baik untuk memperkuat otot jantung.

Ketiga, hindari merokok dan paparan asap rokok. Zat-zat berbahaya dalam rokok dapat merusak lapisan pembuluh darah dan mempercepat penumpukan plak yang dapat menyebabkan serangan jantung. Keempat, kelola stres dengan baik melalui teknik relaksasi, meditasi, atau hobi yang menyenangkan.`,
    soal: [
      { id: 's1-m5-q1', pertanyaan: 'Menurut monolog, penyakit jantung menyumbang berapa persen kematian di Indonesia setiap tahunnya?',
        pilihan: { A: 'Sekitar sepuluh persen.', B: 'Sekitar lima belas persen.', C: 'Sekitar dua puluh persen.', D: 'Sekitar tiga puluh persen.' },
        jawaban: 'C' },
      { id: 's1-m5-q2', pertanyaan: 'Pola makan yang disarankan untuk menjaga kesehatan jantung adalah …',
        pilihan: { A: 'Banyak mengonsumsi daging merah dan produk susu berlemak.', B: 'Mengonsumsi sayuran, buah-buahan, biji-bijian utuh, dan ikan.', C: 'Menghindari semua jenis lemak termasuk lemak sehat.', D: 'Mengonsumsi suplemen vitamin tanpa perlu mengubah pola makan.' },
        jawaban: 'B' },
      { id: 's1-m5-q3', pertanyaan: 'Berapa lama aktivitas fisik yang direkomendasikan per minggu untuk kesehatan jantung?',
        pilihan: { A: 'Minimal tiga puluh menit per minggu.', B: 'Minimal enam puluh menit per minggu.', C: 'Minimal seratus menit per minggu.', D: 'Minimal seratus lima puluh menit per minggu.' },
        jawaban: 'D' },
      { id: 's1-m5-q4', pertanyaan: 'Mengapa rokok berbahaya bagi kesehatan jantung menurut monolog?',
        pilihan: { A: 'Rokok menyebabkan paru-paru tidak dapat menyerap oksigen.', B: 'Zat dalam rokok merusak lapisan pembuluh darah dan mempercepat penumpukan plak.', C: 'Rokok meningkatkan kadar gula darah secara drastis.', D: 'Asap rokok menyebabkan gangguan irama jantung secara langsung.' },
        jawaban: 'B' },
      { id: 's1-m5-q5', pertanyaan: 'Manakah yang TIDAK disebutkan sebagai langkah menjaga kesehatan jantung dalam monolog?',
        pilihan: { A: 'Menjaga pola makan sehat.', B: 'Berolahraga secara teratur.', C: 'Menjalani operasi pencegahan.', D: 'Mengelola stres dengan baik.' },
        jawaban: 'C' }
    ]
  },
  {
    id: 'monolog-6',
    judul: 'Bahaya Sampah Plastik di Lautan',
    label: 'Monolog VI',
    teks: `Selamat siang. Saya akan membahas tentang bahaya sampah plastik di lautan yang semakin mengancam ekosistem laut dan kehidupan manusia.

Setiap tahun, diperkirakan sekitar delapan juta ton plastik masuk ke lautan. Plastik yang mencemari lautan berasal dari berbagai sumber, mulai dari sampah yang dibuang sembarangan di pantai dan sungai, hingga limbah industri yang tidak dikelola dengan baik. Indonesia sendiri termasuk dalam lima besar negara penyumbang sampah plastik ke laut terbanyak di dunia.

Dampak sampah plastik terhadap ekosistem laut sangat serius. Hewan laut seperti penyu, paus, dan berbagai jenis ikan sering kali menelan plastik yang mereka kira makanan. Selain itu, plastik yang terurai menjadi partikel-partikel kecil yang disebut mikroplastik telah ditemukan di hampir semua bagian lautan, bahkan di dalam tubuh ikan yang kita konsumsi sehari-hari.

Penelitian terbaru menunjukkan bahwa manusia rata-rata mengonsumsi sekitar lima gram mikroplastik setiap minggu, setara dengan berat sebuah kartu kredit. Bahaya ini tidak hanya mengancam hewan laut, tetapi juga berpotensi membahayakan kesehatan manusia.

Untuk mengatasi masalah ini, diperlukan tindakan nyata berupa pengurangan penggunaan plastik sekali pakai, peningkatan fasilitas daur ulang, serta edukasi kepada masyarakat tentang pengelolaan sampah yang bertanggung jawab.`,
    soal: [
      { id: 's1-m6-q1', pertanyaan: 'Berapa ton plastik yang diperkirakan masuk ke lautan setiap tahunnya?',
        pilihan: { A: 'Sekitar empat juta ton.', B: 'Sekitar enam juta ton.', C: 'Sekitar delapan juta ton.', D: 'Sekitar sepuluh juta ton.' },
        jawaban: 'C' },
      { id: 's1-m6-q2', pertanyaan: 'Posisi Indonesia dalam hal penyumbang sampah plastik ke laut adalah …',
        pilihan: { A: 'Urutan pertama di dunia.', B: 'Salah satu dari lima besar di dunia.', C: 'Urutan pertama di Asia Tenggara.', D: 'Urutan ke-10 di dunia.' },
        jawaban: 'B' },
      { id: 's1-m6-q3', pertanyaan: 'Apa yang dimaksud dengan mikroplastik menurut konteks monolog?',
        pilihan: { A: 'Plastik berukuran sangat kecil yang belum terurai.', B: 'Partikel-partikel kecil hasil penguraian plastik.', C: 'Jenis plastik khusus yang ramah lingkungan.', D: 'Plastik yang digunakan dalam skala industri kecil.' },
        jawaban: 'B' },
      { id: 's1-m6-q4', pertanyaan: 'Menurut penelitian terbaru yang disebutkan, manusia rata-rata mengonsumsi mikroplastik sebanyak …',
        pilihan: { A: 'Satu gram per minggu.', B: 'Tiga gram per minggu.', C: 'Lima gram per minggu.', D: 'Sepuluh gram per minggu.' },
        jawaban: 'C' },
      { id: 's1-m6-q5', pertanyaan: 'Langkah yang disebutkan untuk mengatasi masalah sampah plastik di laut adalah …',
        pilihan: { A: 'Melarang semua aktivitas industri di wilayah pesisir.', B: 'Mengganti seluruh plastik dengan bahan logam.', C: 'Pengurangan plastik sekali pakai, peningkatan daur ulang, dan edukasi masyarakat.', D: 'Membangun bendungan raksasa untuk menahan plastik masuk ke laut.' },
        jawaban: 'C' }
    ]
  },
  {
    id: 'monolog-7',
    judul: 'Angklung: Alat Musik Warisan Budaya Jawa Barat',
    label: 'Monolog VII',
    teks: `Selamat sore. Pada kesempatan ini, saya akan berbagi informasi tentang angklung, alat musik tradisional yang menjadi kebanggaan masyarakat Jawa Barat dan Indonesia pada umumnya.

Angklung adalah alat musik multitonal yang terbuat dari bambu. Cara memainkannya cukup unik, yaitu dengan cara digoyangkan sehingga menghasilkan bunyi yang diakibatkan oleh benturan bambu dalam rangka yang terbuat dari rotan. Setiap angklung hanya menghasilkan satu nada, sehingga untuk memainkan sebuah lagu diperlukan banyak angklung yang dimainkan secara bersamaan oleh beberapa orang.

Angklung diperkirakan telah ada sejak ribuan tahun lalu dan terkait erat dengan budaya agraris masyarakat Sunda. Pada zaman dahulu, angklung dimainkan dalam upacara yang berhubungan dengan pertanian, terutama dalam ritual yang berkaitan dengan Dewi Sri, dewi padi yang dipercaya oleh masyarakat Sunda kuno.

Angklung pernah mengalami masa-masa sulit ketika pemerintah kolonial Belanda melarang pertunjukan angklung pada awal abad ke-20 karena dianggap dapat membangkitkan semangat perlawanan rakyat. Namun, berkat perjuangan Daeng Soetigna, seorang seniman dan pendidik asal Bandung, angklung berhasil dilestarikan dan dikembangkan.

Pada tahun dua ribu sepuluh, UNESCO mengakui angklung sebagai Warisan Budaya Tak Benda Kemanusiaan. Pengakuan ini mendorong semakin banyak upaya untuk memperkenalkan angklung kepada generasi muda dan dunia internasional.`,
    soal: [
      { id: 's1-m7-q1', pertanyaan: 'Angklung dimainkan dengan cara …',
        pilihan: { A: 'Dipukul dengan pemukul khusus dari kayu.', B: 'Ditiup seperti seruling bambu.', C: 'Digoyangkan sehingga bambu saling berbenturan.', D: 'Dipetik seperti gitar tradisional.' },
        jawaban: 'C' },
      { id: 's1-m7-q2', pertanyaan: 'Mengapa angklung memerlukan banyak pemain untuk memainkan satu lagu?',
        pilihan: { A: 'Karena angklung sangat berat dan harus dipegang bersama.', B: 'Karena setiap angklung hanya menghasilkan satu nada.', C: 'Karena angklung hanya bisa dimainkan dalam kelompok besar.', D: 'Karena teknik memainkan angklung sangat rumit.' },
        jawaban: 'B' },
      { id: 's1-m7-q3', pertanyaan: 'Pada masa kolonial Belanda, angklung dilarang karena …',
        pilihan: { A: 'Suaranya dianggap mengganggu ketertiban umum.', B: 'Dianggap dapat membangkitkan semangat perlawanan rakyat.', C: 'Bahan bambunya dibutuhkan untuk keperluan konstruksi.', D: 'Dianggap tidak sesuai dengan nilai-nilai kebudayaan Barat.' },
        jawaban: 'B' },
      { id: 's1-m7-q4', pertanyaan: 'Siapakah tokoh yang berjasa melestarikan dan mengembangkan angklung?',
        pilihan: { A: 'Raden Saleh.', B: 'Ki Hajar Dewantara.', C: 'Daeng Soetigna.', D: 'Ismail Marzuki.' },
        jawaban: 'C' },
      { id: 's1-m7-q5', pertanyaan: 'Kapan UNESCO mengakui angklung sebagai Warisan Budaya Tak Benda Kemanusiaan?',
        pilihan: { A: 'Tahun dua ribu tiga.', B: 'Tahun dua ribu tujuh.', C: 'Tahun dua ribu sembilan.', D: 'Tahun dua ribu sepuluh.' },
        jawaban: 'D' }
    ]
  },
  {
    id: 'monolog-8',
    judul: 'Literasi Digital di Era Informasi',
    label: 'Monolog VIII',
    teks: `Selamat pagi. Saya akan berbicara mengenai literasi digital, sebuah kemampuan yang semakin krusial di era informasi seperti sekarang ini.

Literasi digital bukan sekadar kemampuan menggunakan perangkat teknologi seperti komputer atau ponsel pintar. Lebih dari itu, literasi digital mencakup kemampuan untuk mencari, mengevaluasi, membuat, dan mengomunikasikan informasi secara kritis dan efektif melalui berbagai platform digital.

Di era penyebaran informasi yang sangat cepat, kemampuan literasi digital menjadi pelindung penting dari ancaman hoaks. Indonesia tercatat sebagai salah satu negara dengan penyebaran hoaks tertinggi di dunia. Setiap hari, jutaan konten yang tidak terverifikasi menyebar melalui media sosial dan aplikasi perpesanan.

Untuk meningkatkan literasi digital, ada beberapa langkah yang dapat dilakukan. Pertama, selalu verifikasi informasi sebelum membagikannya dengan mengecek sumber aslinya. Kedua, gunakan aplikasi pemeriksa fakta yang kini banyak tersedia secara gratis. Ketiga, tingkatkan kesadaran tentang keamanan data pribadi di internet. Keempat, ajarkan literasi digital sejak dini kepada anak-anak.

Pemerintah bersama berbagai lembaga pendidikan dan organisasi masyarakat sipil terus berupaya meningkatkan literasi digital masyarakat Indonesia melalui berbagai program pelatihan dan kampanye kesadaran.`,
    soal: [
      { id: 's1-m8-q1', pertanyaan: 'Menurut monolog, apa yang dimaksud dengan literasi digital?',
        pilihan: { A: 'Kemampuan menggunakan komputer dan ponsel pintar.', B: 'Kemampuan mencari, mengevaluasi, membuat, dan mengomunikasikan informasi secara kritis melalui platform digital.', C: 'Kemampuan membuat konten kreatif di media sosial.', D: 'Kemampuan memprogram aplikasi komputer.' },
        jawaban: 'B' },
      { id: 's1-m8-q2', pertanyaan: 'Mengapa literasi digital penting di era informasi saat ini?',
        pilihan: { A: 'Karena teknologi semakin mahal dan sulit diakses.', B: 'Karena menjadi pelindung dari ancaman hoaks dan informasi menyesatkan.', C: 'Karena pemerintah mewajibkan semua warga melek digital.', D: 'Karena media sosial sudah menggantikan semua bentuk komunikasi.' },
        jawaban: 'B' },
      { id: 's1-m8-q3', pertanyaan: 'Bagaimana posisi Indonesia dalam hal penyebaran hoaks menurut monolog?',
        pilihan: { A: 'Negara dengan penyebaran hoaks terendah di Asia.', B: 'Berada di urutan tengah secara global.', C: 'Salah satu negara dengan penyebaran hoaks tertinggi di dunia.', D: 'Negara yang sudah berhasil mengatasi masalah hoaks.' },
        jawaban: 'C' },
      { id: 's1-m8-q4', pertanyaan: 'Langkah pertama yang disarankan untuk meningkatkan literasi digital adalah …',
        pilihan: { A: 'Menghapus semua akun media sosial.', B: 'Selalu verifikasi informasi sebelum membagikannya.', C: 'Menghindari penggunaan internet sama sekali.', D: 'Membeli perangkat teknologi terbaru.' },
        jawaban: 'B' },
      { id: 's1-m8-q5', pertanyaan: 'Simpulan yang paling tepat dari monolog tersebut adalah …',
        pilihan: { A: 'Teknologi digital lebih banyak membawa dampak negatif bagi masyarakat.', B: 'Pemerintah adalah satu-satunya pihak yang bertanggung jawab atas literasi digital.', C: 'Literasi digital adalah kemampuan penting yang harus dimiliki semua orang di era informasi.', D: 'Anak-anak tidak boleh menggunakan internet karena bahayanya.' },
        jawaban: 'C' }
    ]
  }
];


/* ═══════════════════════════════════════════════════════════════
   SEKSI II — MERESPONS KAIDAH
   Format: kalimat dengan bagian bermasalah → pilih pengganti tepat
   ═══════════════════════════════════════════════════════════════ */
const SECTION2_DATA = [
  // ── EJAAN (8 soal) ──────────────────────────────────────────
  {
    id: 's2-q1', tipe: 'ejaan',
    instruksi: 'Penulisan judul yang tepat adalah …',
    kalimat: null,
    pilihan: {
      A: 'Pengaruh Media Sosial Terhadap Perilaku Remaja',
      B: 'Pengaruh media sosial terhadap perilaku remaja',
      C: 'Pengaruh Media Sosial terhadap Perilaku Remaja',
      D: 'pengaruh Media Sosial Terhadap Perilaku Remaja'
    },
    jawaban: 'C',
    penjelasan: 'Dalam penulisan judul, setiap kata diawali huruf kapital kecuali preposisi dan konjungsi (terhadap, dan, di, ke, dari, yang, untuk).'
  },
  {
    id: 's2-q2', tipe: 'ejaan',
    instruksi: 'Penggunaan tanda baca yang tepat terdapat dalam kalimat …',
    kalimat: null,
    pilihan: {
      A: '"Ayo belajar bersama," ajak Budi kepada temannya.',
      B: '"Ayo belajar bersama" ajak Budi kepada temannya.',
      C: '"Ayo belajar bersama", ajak Budi kepada temannya.',
      D: '"Ayo belajar bersama." ajak Budi kepada temannya.'
    },
    jawaban: 'A',
    penjelasan: 'Kalimat langsung yang diikuti keterangan pembicara menggunakan koma sebelum tanda petik penutup, bukan setelah.'
  },
  {
    id: 's2-q3', tipe: 'ejaan',
    instruksi: 'Penulisan kata sapaan yang tepat terdapat dalam kalimat …',
    kalimat: null,
    pilihan: {
      A: 'Apakah ibu sudah membaca laporan tersebut?',
      B: 'Apakah Ibu sudah membaca laporan tersebut?',
      C: 'apakah Ibu sudah membaca laporan tersebut?',
      D: 'Apakah IBU sudah membaca laporan tersebut?'
    },
    jawaban: 'B',
    penjelasan: 'Kata sapaan seperti Ibu, Bapak, Saudara, Anda ditulis dengan huruf kapital jika digunakan sebagai kata sapaan langsung.'
  },
  {
    id: 's2-q4', tipe: 'ejaan',
    instruksi: 'Manakah penulisan kata berimbuhan yang tepat?',
    kalimat: null,
    pilihan: {
      A: 'Pemerintah harus meng-implementasikan kebijakan itu.',
      B: 'Pemerintah harus mengimplementasikan kebijakan itu.',
      C: 'Pemerintah harus mengimplimentasikan kebijakan itu.',
      D: 'Pemerintah harus meng implementasikan kebijakan itu.'
    },
    jawaban: 'B',
    penjelasan: 'Imbuhan me(N)- ditulis serangkai dengan kata dasarnya tanpa tanda hubung, kecuali kata dasar berupa singkatan atau angka.'
  },
  {
    id: 's2-q5', tipe: 'ejaan',
    instruksi: 'Manakah penulisan kata depan yang tepat?',
    kalimat: null,
    pilihan: {
      A: 'Buku itu diletakkan dirumah.',
      B: 'Buku itu di letakkan di rumah.',
      C: 'Buku itu diletakkan di rumah.',
      D: 'Buku itu di-letakkan di rumah.'
    },
    jawaban: 'C',
    penjelasan: 'Preposisi "di" sebagai kata depan ditulis terpisah dari kata yang mengikutinya, sedangkan "di-" sebagai awalan ditulis serangkai.'
  },
  {
    id: 's2-q6', tipe: 'ejaan',
    instruksi: 'Tanda baca yang tepat digunakan pada kalimat …',
    kalimat: null,
    pilihan: {
      A: 'Dia lahir pada tanggal 17, Agustus, 1980.',
      B: 'Dia lahir pada tanggal 17 Agustus 1980.',
      C: 'Dia lahir pada tanggal 17-08-1980.',
      D: 'Dia lahir pada tanggal; 17 Agustus 1980.'
    },
    jawaban: 'B',
    penjelasan: 'Penulisan tanggal dalam kalimat tidak menggunakan tanda koma di antara tanggal, bulan, dan tahun.'
  },
  {
    id: 's2-q7', tipe: 'ejaan',
    instruksi: 'Penulisan nama gelar yang tepat adalah …',
    kalimat: null,
    pilihan: {
      A: 'Prof Dr Hendra Kusuma M.Si.',
      B: 'Prof. Dr. Hendra Kusuma, M.Si.',
      C: 'Prof.Dr.Hendra Kusuma,M.Si.',
      D: 'prof. dr. Hendra Kusuma, m.si.'
    },
    jawaban: 'B',
    penjelasan: 'Gelar akademik diikuti tanda titik, dipisahkan tanda koma dari nama, dan diakhiri tanda titik.'
  },
  {
    id: 's2-q8', tipe: 'ejaan',
    instruksi: 'Penggunaan huruf kapital yang tepat terdapat dalam kalimat …',
    kalimat: null,
    pilihan: {
      A: 'Pelajaran bahasa indonesia diajarkan sejak sekolah dasar.',
      B: 'Pelajaran Bahasa Indonesia diajarkan sejak Sekolah Dasar.',
      C: 'Pelajaran Bahasa Indonesia diajarkan sejak sekolah dasar.',
      D: 'pelajaran bahasa Indonesia diajarkan sejak sekolah Dasar.'
    },
    jawaban: 'C',
    penjelasan: 'Nama bahasa ditulis dengan huruf kapital (Bahasa Indonesia), sedangkan nama jenjang pendidikan tidak dikapitalkan jika bukan nama diri resmi.'
  },

  // ── KBBI / KATA BAKU (9 soal) ────────────────────────────────
  {
    id: 's2-q9', tipe: 'kbbi',
    instruksi: 'Pengganti yang tepat untuk kata bercetak tebal berikut adalah …',
    kalimat: 'Dia pergi ke <u>apotik</u> untuk membeli obat flu.',
    pilihan: { A: 'apotex', B: 'apotek', C: 'apothek', D: 'aptik' },
    jawaban: 'B',
    penjelasan: 'Kata baku dalam KBBI adalah "apotek", bukan "apotik".'
  },
  {
    id: 's2-q10', tipe: 'kbbi',
    instruksi: 'Pengganti yang tepat untuk kata bercetak tebal berikut adalah …',
    kalimat: 'Mereka harus <u>antre</u> panjang untuk mendapatkan tiket konser.',
    pilihan: { A: 'antri', B: 'antree', C: 'antre', D: 'antrey' },
    jawaban: 'C',
    penjelasan: '"Antre" adalah bentuk baku; "antri" adalah bentuk tidak baku.'
  },
  {
    id: 's2-q11', tipe: 'kbbi',
    instruksi: 'Pengganti yang tepat untuk kata bercetak tebal berikut adalah …',
    kalimat: 'Hasil <u>analisa</u> data menunjukkan tren positif.',
    pilihan: { A: 'analisasi', B: 'analis', C: 'analisis', D: 'analisat' },
    jawaban: 'C',
    penjelasan: 'Kata baku dalam KBBI adalah "analisis", bukan "analisa".'
  },
  {
    id: 's2-q12', tipe: 'kbbi',
    instruksi: 'Pengganti yang tepat untuk kata bercetak tebal berikut adalah …',
    kalimat: 'Atlet itu mengalami <u>cedera</u> lutut saat bertanding.',
    pilihan: { A: 'cider', B: 'cidera', C: 'cedera', D: 'cadera' },
    jawaban: 'C',
    penjelasan: '"Cedera" adalah bentuk baku; "cidera" adalah bentuk tidak baku.'
  },
  {
    id: 's2-q13', tipe: 'kbbi',
    instruksi: 'Pengganti yang tepat untuk kata bercetak tebal berikut adalah …',
    kalimat: 'Perusahaan itu sudah mendaftarkan <u>merek</u> dagangnya.',
    pilihan: { A: 'merk', B: 'merek', C: 'merck', D: 'mrek' },
    jawaban: 'B',
    penjelasan: '"Merek" adalah bentuk baku dalam KBBI; "merk" adalah bentuk tidak baku (serapan dari bahasa Belanda).'
  },
  {
    id: 's2-q14', tipe: 'kbbi',
    instruksi: 'Pengganti yang tepat untuk kata bercetak tebal berikut adalah …',
    kalimat: 'Dokter menyarankan pasien itu untuk menjalani <u>diet</u> ketat.',
    pilihan: { A: 'diit', B: 'dyet', C: 'dyeet', D: 'diet' },
    jawaban: 'D',
    penjelasan: '"Diet" adalah bentuk baku; "diit" adalah bentuk tidak baku.'
  },
  {
    id: 's2-q15', tipe: 'kbbi',
    instruksi: 'Pengganti yang tepat untuk kata bercetak tebal berikut adalah …',
    kalimat: 'Pemerintah berupaya membangun <u>infrastruktur</u> yang merata.',
    pilihan: { A: 'inprastruktur', B: 'infrastruktur', C: 'inftrastruktur', D: 'imfrastruktur' },
    jawaban: 'B',
    penjelasan: '"Infrastruktur" adalah serapan dari bahasa Inggris yang sudah disesuaikan ejaannya dalam KBBI.'
  },
  {
    id: 's2-q16', tipe: 'kbbi',
    instruksi: 'Manakah kalimat yang menggunakan kata baku dengan tepat?',
    kalimat: null,
    pilihan: {
      A: 'Dia meminta ijin untuk meninggalkan kelas lebih awal.',
      B: 'Dia meminta izin untuk meninggalkan kelas lebih awal.',
      C: 'Dia meminta idzin untuk meninggalkan kelas lebih awal.',
      D: 'Dia meminta ijen untuk meninggalkan kelas lebih awal.'
    },
    jawaban: 'B',
    penjelasan: '"Izin" adalah bentuk baku; "ijin" adalah bentuk tidak baku yang masih sering digunakan namun salah menurut KBBI.'
  },
  {
    id: 's2-q17', tipe: 'kbbi',
    instruksi: 'Pengganti yang tepat untuk kata bercetak tebal berikut adalah …',
    kalimat: 'Ia mengembangkan <u>karir</u>nya dengan giat bekerja.',
    pilihan: { A: 'karier', B: 'karir', C: 'carrier', D: 'kareer' },
    jawaban: 'A',
    penjelasan: '"Karier" adalah bentuk baku dalam KBBI; "karir" adalah bentuk tidak baku.'
  },

  // ── TBBBI / KALIMAT EFEKTIF (8 soal) ────────────────────────
  {
    id: 's2-q18', tipe: 'tbbbi',
    instruksi: 'Pengganti yang tepat untuk kalimat bercetak tebal berikut adalah …',
    kalimat: '<u>Saya mundur ke belakang</u> ketika melihat ular itu.',
    pilihan: {
      A: 'Saya mundur ke belakang sekali',
      B: 'Saya mundur',
      C: 'Saya bergerak ke belakang',
      D: 'Saya mundur jauh ke belakang'
    },
    jawaban: 'B',
    penjelasan: '"Mundur" sudah berarti "bergerak ke belakang", sehingga "ke belakang" menjadi pleonasme.'
  },
  {
    id: 's2-q19', tipe: 'tbbbi',
    instruksi: 'Pengganti yang tepat untuk bagian kalimat bercetak tebal berikut adalah …',
    kalimat: '<u>Para mahasiswa-mahasiswa</u> itu mengikuti seminar nasional.',
    pilihan: {
      A: 'Para semua mahasiswa',
      B: 'Mahasiswa-mahasiswa semua',
      C: 'Para mahasiswa',
      D: 'Semua para mahasiswa'
    },
    jawaban: 'C',
    penjelasan: '"Para" sudah menyatakan jamak, sehingga tidak perlu ditambah bentuk ulang "-mahasiswa". Pilih "para mahasiswa" atau "mahasiswa-mahasiswa".'
  },
  {
    id: 's2-q20', tipe: 'tbbbi',
    instruksi: 'Pengganti yang tepat untuk kalimat bercetak tebal berikut adalah …',
    kalimat: '<u>Di dalam ruangan itu menyediakan berbagai fasilitas</u> bagi peserta.',
    pilihan: {
      A: 'Di dalam ruangan itu disediakan berbagai fasilitas',
      B: 'Ruangan itu menyediakan berbagai fasilitas',
      C: 'Dalam ruangan itu menyediakan berbagai fasilitas',
      D: 'Di ruangan itu disediakannya berbagai fasilitas'
    },
    jawaban: 'B',
    penjelasan: 'Kalimat yang diawali frasa preposisional "di dalam" kehilangan subjek. Perbaiki dengan menghilangkan preposisi agar "ruangan itu" menjadi subjek yang jelas.'
  },
  {
    id: 's2-q21', tipe: 'tbbbi',
    instruksi: 'Pengganti yang tepat untuk bagian kalimat bercetak tebal berikut adalah …',
    kalimat: 'Tugas mahasiswa adalah belajar, <u>berorganisasi, dan inovasi</u>.',
    pilihan: {
      A: 'berorganisasi, dan melakukan inovasi',
      B: 'berorganisasi, dan berinovasi',
      C: 'organisasi, dan berinovasi',
      D: 'mengorganisasi, dan berinovatif'
    },
    jawaban: 'B',
    penjelasan: 'Keparalelan mensyaratkan semua unsur setara berupa verba: belajar, berorganisasi, berinovasi.'
  },
  {
    id: 's2-q22', tipe: 'tbbbi',
    instruksi: 'Pengganti yang tepat untuk kalimat bercetak tebal berikut adalah …',
    kalimat: '<u>Kepada peserta diharapkan mengisi formulir</u> yang tersedia.',
    pilihan: {
      A: 'Peserta diharapkan mengisi formulir',
      B: 'Kepada peserta agar mengisi formulir',
      C: 'Diharapkan kepada peserta mengisi formulir',
      D: 'Untuk peserta diharapkan isi formulir'
    },
    jawaban: 'A',
    penjelasan: 'Kalimat yang diawali "kepada" kehilangan subjek. Hapus "kepada" agar "peserta" menjadi subjek yang jelas.'
  },
  {
    id: 's2-q23', tipe: 'tbbbi',
    instruksi: 'Pengganti yang tepat untuk bagian kalimat bercetak tebal berikut adalah …',
    kalimat: 'Acara itu <u>sangat unik sekali</u> dan berkesan bagi semua peserta.',
    pilihan: {
      A: 'sangat unik dan berkesan',
      B: 'sangat unik sekali dan berkesan',
      C: 'amat sangat unik',
      D: 'unik sekali'
    },
    jawaban: 'D',
    penjelasan: '"Sangat" dan "sekali" sama-sama berfungsi sebagai penguat (intensifier). Gunakan salah satu saja: "sangat unik" atau "unik sekali".'
  },
  {
    id: 's2-q24', tipe: 'tbbbi',
    instruksi: 'Pengganti yang tepat untuk bagian kalimat bercetak tebal berikut adalah …',
    kalimat: 'Buku itu <u>saya dibaca</u> semalam hingga larut malam.',
    pilihan: {
      A: 'saya membaca',
      B: 'saya baca',
      C: 'dibaca oleh saya',
      D: 'saya telah membaca'
    },
    jawaban: 'B',
    penjelasan: 'Dalam kalimat pasif dengan pelaku orang pertama (saya), verba tidak menggunakan di-, melainkan langsung berupa bentuk dasar setelah pronomina: "saya baca".'
  },
  {
    id: 's2-q25', tipe: 'tbbbi',
    instruksi: 'Pengganti yang tepat untuk kalimat bercetak tebal berikut adalah …',
    kalimat: '<u>Merokok mengganggu kesehatan dan kerusakan paru-paru juga disebabkan oleh rokok.</u>',
    pilihan: {
      A: 'Rokok mengganggu kesehatan dan kerusakan paru-paru juga disebabkan rokok.',
      B: 'Merokok mengganggu kesehatan dan merusak paru-paru.',
      C: 'Merokok mengganggu kesehatan, dan kerusakan paru-paru.',
      D: 'Merokok dan kerusakan paru-paru mengganggu kesehatan.'
    },
    jawaban: 'B',
    penjelasan: 'Kalimat harus paralel: "merokok mengganggu kesehatan" (aktif) dan "merokok merusak paru-paru" (aktif), bukan bercampur dengan kalimat pasif.'
  }
];

/* ═══════════════════════════════════════════════════════════════
   SEKSI III — MEMBACA
   ═══════════════════════════════════════════════════════════════ */
const SECTION3_DATA = [
  {
    id: 'bacaan-1',
    judul: 'Danau Toba: Keajaiban Alam Sumatera Utara',
    sumber: 'Diadaptasi dari berbagai sumber wisata dan geologi Indonesia',
    teks: `Danau Toba merupakan danau vulkanik terbesar di dunia yang terletak di Provinsi Sumatera Utara, Indonesia. Danau ini terbentuk akibat letusan supervulkan yang terjadi sekitar 74.000 tahun yang lalu. Letusan tersebut diperkirakan merupakan letusan gunung berapi terbesar dalam dua juta tahun terakhir dan menyebabkan terjadinya musim dingin vulkanik secara global selama beberapa tahun.

Danau Toba memiliki panjang sekitar 100 kilometer, lebar 30 kilometer, dan kedalaman maksimum mencapai 505 meter. Di tengah danau terdapat sebuah pulau yang disebut Pulau Samosir. Pulau ini muncul akibat aktivitas vulkanik yang terjadi setelah letusan besar tersebut dan kini menjadi tempat tinggal masyarakat Batak Toba.

Masyarakat Batak yang mendiami kawasan Danau Toba memiliki budaya yang sangat kaya. Salah satu budaya yang paling terkenal adalah musik tradisional gondang dan tarian tortor yang sering ditampilkan dalam berbagai upacara adat. Ulos, kain tenun tradisional Batak, juga menjadi simbol penting dalam setiap ritual dan perayaan kehidupan masyarakat setempat.

Kawasan Danau Toba telah ditetapkan oleh pemerintah Indonesia sebagai salah satu dari sepuluh destinasi wisata super prioritas. Berbagai infrastruktur pariwisata terus dikembangkan, mulai dari bandar udara, jalan raya, hingga akomodasi dan fasilitas wisata. Pemerintah berharap kawasan ini dapat menarik lebih banyak wisatawan domestik maupun mancanegara.

Namun, pengembangan pariwisata juga harus diimbangi dengan upaya pelestarian lingkungan. Danau Toba menghadapi berbagai tantangan lingkungan, termasuk pencemaran air akibat keramba ikan, limbah domestik, dan aktivitas pertanian di sekitarnya. Berbagai pihak, termasuk pemerintah, masyarakat lokal, dan organisasi lingkungan hidup, bekerja sama untuk menjaga kelestarian ekosistem danau yang unik ini.`,
    soal: [
      {
        id: 's3-b1-q1',
        pertanyaan: 'Danau Toba terbentuk akibat …',
        pilihan: {
          A: 'Gempa bumi besar yang terjadi 74.000 tahun lalu.',
          B: 'Letusan supervulkan yang terjadi sekitar 74.000 tahun lalu.',
          C: 'Erosi dan pergeseran lempeng bumi selama ribuan tahun.',
          D: 'Banjir besar yang mengikis dataran tinggi Sumatera.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b1-q2',
        pertanyaan: 'Berapa kedalaman maksimum Danau Toba?',
        pilihan: { A: '100 meter.', B: '300 meter.', C: '505 meter.', D: '74 meter.' },
        jawaban: 'C'
      },
      {
        id: 's3-b1-q3',
        pertanyaan: 'Pulau Samosir yang ada di tengah Danau Toba terbentuk akibat …',
        pilihan: {
          A: 'Penumpukan sedimen sungai selama ribuan tahun.',
          B: 'Aktivitas vulkanik setelah letusan besar.',
          C: 'Reklamasi yang dilakukan masyarakat Batak.',
          D: 'Penurunan permukaan air danau secara bertahap.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b1-q4',
        pertanyaan: 'Kain tenun tradisional masyarakat Batak yang disebutkan dalam bacaan adalah …',
        pilihan: { A: 'Songket.', B: 'Batik.', C: 'Ulos.', D: 'Tenun ikat.' },
        jawaban: 'C'
      },
      {
        id: 's3-b1-q5',
        pertanyaan: 'Manakah pernyataan yang TIDAK sesuai dengan isi bacaan?',
        pilihan: {
          A: 'Danau Toba adalah danau vulkanik terbesar di dunia.',
          B: 'Letusan yang membentuk Danau Toba menyebabkan musim dingin vulkanik global.',
          C: 'Danau Toba terletak di Provinsi Sumatera Barat.',
          D: 'Kawasan Danau Toba ditetapkan sebagai destinasi wisata super prioritas.'
        },
        jawaban: 'C'
      },
      {
        id: 's3-b1-q6',
        pertanyaan: 'Tantangan lingkungan yang dihadapi Danau Toba antara lain …',
        pilihan: {
          A: 'Kebakaran hutan dan lahan di sekitar danau.',
          B: 'Pencemaran air akibat keramba ikan dan limbah domestik.',
          C: 'Kekeringan akibat perubahan iklim yang ekstrem.',
          D: 'Penebangan hutan untuk pembangunan resort mewah.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b1-q7',
        pertanyaan: 'Pikiran utama paragraf keempat adalah …',
        pilihan: {
          A: 'Keindahan alam Danau Toba yang memukau wisatawan.',
          B: 'Pengembangan kawasan Danau Toba sebagai destinasi wisata super prioritas.',
          C: 'Budaya masyarakat Batak yang kaya dan beragam.',
          D: 'Tantangan lingkungan yang dihadapi Danau Toba.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b1-q8',
        pertanyaan: 'Kesimpulan yang paling tepat dari bacaan tersebut adalah …',
        pilihan: {
          A: 'Danau Toba harus segera ditutup dari kunjungan wisatawan untuk pelestarian.',
          B: 'Danau Toba adalah keajaiban alam yang kaya budaya namun menghadapi tantangan lingkungan.',
          C: 'Pembangunan infrastruktur pariwisata lebih penting dari pelestarian lingkungan.',
          D: 'Masyarakat Batak adalah satu-satunya pihak yang bertanggung jawab atas kelestarian Danau Toba.'
        },
        jawaban: 'B'
      }
    ]
  },
  {
    id: 'bacaan-2',
    judul: 'Kecerdasan Buatan dalam Kehidupan Sehari-hari',
    sumber: 'Diadaptasi dari jurnal teknologi informasi Indonesia',
    teks: `Kecerdasan buatan atau artificial intelligence (AI) adalah simulasi kecerdasan manusia yang diprogram pada mesin, khususnya sistem komputer. Proses ini mencakup pembelajaran (memperoleh informasi dan aturan penggunaannya), penalaran (menggunakan aturan untuk mencapai kesimpulan), dan koreksi diri. Dalam beberapa tahun terakhir, AI telah mengalami perkembangan yang sangat pesat dan mulai memengaruhi hampir setiap aspek kehidupan manusia.

Dalam bidang kesehatan, AI digunakan untuk mendiagnosis penyakit dengan tingkat akurasi yang tinggi. Algoritma AI mampu menganalisis ribuan gambar medis dalam hitungan detik dan mendeteksi kelainan seperti kanker pada stadium awal, yang sering kali sulit dideteksi oleh mata manusia. Penelitian menunjukkan bahwa AI dapat mendeteksi kanker paru-paru dengan akurasi hingga 97 persen, melampaui kemampuan rata-rata dokter spesialis.

Dalam bidang pendidikan, AI memungkinkan pembelajaran yang dipersonalisasi. Sistem AI dapat menganalisis kemampuan, gaya belajar, dan kecepatan pemahaman setiap siswa untuk kemudian menyajikan materi yang disesuaikan dengan kebutuhan individu. Platform pembelajaran berbasis AI juga dapat memberikan umpan balik instan kepada siswa tanpa harus menunggu koreksi dari guru.

Dalam kehidupan sehari-hari, AI hadir dalam berbagai wujud yang mungkin tidak kita sadari. Asisten virtual seperti Siri, Google Assistant, dan Alexa menggunakan AI untuk memahami dan merespons perintah suara. Sistem rekomendasi pada platform streaming seperti Netflix dan Spotify menggunakan AI untuk menyarankan konten yang sesuai dengan preferensi pengguna.

Meskipun AI membawa banyak manfaat, ia juga menimbulkan berbagai kekhawatiran. Salah satunya adalah ancaman terhadap lapangan pekerjaan, karena otomatisasi berbasis AI dapat menggantikan pekerjaan yang bersifat rutin dan berulang. Kekhawatiran lain adalah terkait privasi data, karena sistem AI memerlukan data dalam jumlah besar untuk berfungsi secara optimal.`,
    soal: [
      {
        id: 's3-b2-q1',
        pertanyaan: 'Apa yang dimaksud dengan kecerdasan buatan menurut bacaan?',
        pilihan: {
          A: 'Robot yang dapat bergerak dan bekerja seperti manusia.',
          B: 'Simulasi kecerdasan manusia yang diprogram pada mesin komputer.',
          C: 'Program komputer yang dapat terhubung ke internet.',
          D: 'Teknologi yang menggantikan seluruh pekerjaan manusia.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b2-q2',
        pertanyaan: 'Berapa akurasi AI dalam mendeteksi kanker paru-paru menurut bacaan?',
        pilihan: { A: '75 persen.', B: '85 persen.', C: '90 persen.', D: '97 persen.' },
        jawaban: 'D'
      },
      {
        id: 's3-b2-q3',
        pertanyaan: 'Manfaat AI dalam bidang pendidikan yang disebutkan adalah …',
        pilihan: {
          A: 'Menggantikan guru secara sepenuhnya di kelas.',
          B: 'Memungkinkan pembelajaran yang dipersonalisasi sesuai kebutuhan siswa.',
          C: 'Membuat semua siswa mendapat nilai yang sama.',
          D: 'Mengurangi jumlah materi yang harus dipelajari siswa.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b2-q4',
        pertanyaan: 'Contoh penerapan AI dalam kehidupan sehari-hari yang disebutkan dalam bacaan adalah …',
        pilihan: {
          A: 'Mesin cuci otomatis dan kulkas pintar.',
          B: 'Kendaraan terbang tanpa awak.',
          C: 'Asisten virtual seperti Siri dan Google Assistant.',
          D: 'Panel surya untuk menghasilkan listrik.'
        },
        jawaban: 'C'
      },
      {
        id: 's3-b2-q5',
        pertanyaan: 'Kekhawatiran yang muncul akibat berkembangnya AI adalah …',
        pilihan: {
          A: 'AI dapat mengontrol pikiran manusia secara langsung.',
          B: 'Ancaman terhadap lapangan pekerjaan dan privasi data.',
          C: 'AI dapat menyebabkan bencana alam yang lebih sering.',
          D: 'AI akan membuat manusia menjadi tidak kreatif.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b2-q6',
        pertanyaan: 'Pikiran utama paragraf ketiga adalah …',
        pilihan: {
          A: 'Keunggulan AI dalam mendiagnosis penyakit.',
          B: 'Ancaman AI terhadap lapangan kerja.',
          C: 'Penerapan AI dalam bidang pendidikan untuk pembelajaran personal.',
          D: 'Cara kerja algoritma AI dalam sistem rekomendasi.'
        },
        jawaban: 'C'
      },
      {
        id: 's3-b2-q7',
        pertanyaan: 'Makna kata "dipersonalisasi" dalam bacaan adalah …',
        pilihan: {
          A: 'Dilakukan oleh orang yang berpengalaman.',
          B: 'Disesuaikan dengan kebutuhan dan karakteristik individu.',
          C: 'Dikerjakan secara pribadi tanpa bantuan orang lain.',
          D: 'Dirahasiakan dari orang lain untuk menjaga privasi.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b2-q8',
        pertanyaan: 'Pernyataan yang sesuai dengan isi bacaan adalah …',
        pilihan: {
          A: 'AI hanya digunakan dalam industri militer dan pertahanan.',
          B: 'AI sudah sepenuhnya menggantikan semua pekerjaan manusia.',
          C: 'AI dapat memberikan umpan balik instan kepada siswa dalam konteks pendidikan.',
          D: 'AI tidak memerlukan data untuk berfungsi secara optimal.'
        },
        jawaban: 'C'
      }
    ]
  },
  {
    id: 'bacaan-3',
    judul: 'Sistem Pendidikan Finlandia: Model Terbaik Dunia',
    sumber: 'Diadaptasi dari laporan PISA OECD dan kajian pendidikan komparatif',
    teks: `Finlandia dikenal luas sebagai negara dengan sistem pendidikan terbaik di dunia. Negara ini secara konsisten meraih peringkat teratas dalam penilaian internasional Programme for International Student Assessment (PISA) yang diselenggarakan oleh Organisation for Economic Co-operation and Development (OECD). Keberhasilan Finlandia bukan dicapai melalui tekanan dan kompetisi ketat, melainkan melalui pendekatan yang memanusiakan siswa.

Salah satu ciri khas sistem pendidikan Finlandia adalah anak-anak baru memulai sekolah formal pada usia tujuh tahun, lebih lambat dibandingkan kebanyakan negara lain. Sebelum itu, pendidikan lebih ditekankan pada bermain dan bereksplorasi. Para ahli pendidikan Finlandia percaya bahwa masa kanak-kanak seharusnya diisi dengan kegiatan yang menyenangkan dan bebas, bukan dengan hafalan dan ujian.

Di Finlandia, guru adalah profesi yang sangat dihormati dan sangat selektif. Untuk menjadi guru di sekolah dasar, seseorang harus menyelesaikan program magister dan bersaing dengan banyak kandidat lainnya. Hanya sekitar sepuluh persen pelamar yang diterima. Guru di Finlandia mendapatkan otonomi yang besar dalam menentukan metode dan materi pengajaran.

Sistem evaluasi di Finlandia juga sangat berbeda. Tidak ada ujian nasional yang bersifat wajib dan menentukan hingga siswa berusia enam belas tahun. Penilaian dilakukan secara formatif oleh guru di kelas, dengan tujuan membantu siswa berkembang, bukan untuk memeringkat atau mengeliminasi mereka. Hasilnya, siswa Finlandia lebih menikmati proses belajar dan memiliki motivasi intrinsik yang tinggi.

Selain itu, durasi belajar di Finlandia relatif lebih pendek. Siswa rata-rata belajar selama 5 jam per hari, dengan waktu istirahat yang cukup banyak. Pekerjaan rumah pun diberikan dalam jumlah minimal. Ini bertolak belakang dengan pendekatan intensif yang diterapkan di banyak negara Asia, namun hasilnya terbukti lebih efektif dalam jangka panjang.`,
    soal: [
      {
        id: 's3-b3-q1',
        pertanyaan: 'Finlandia secara konsisten meraih peringkat teratas dalam penilaian …',
        pilihan: {
          A: 'Indeks Pembangunan Manusia (IPM) PBB.',
          B: 'Programme for International Student Assessment (PISA).',
          C: 'World Education Rankings UNESCO.',
          D: 'Global Innovation Index.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b3-q2',
        pertanyaan: 'Pada usia berapa anak-anak Finlandia mulai bersekolah formal?',
        pilihan: { A: 'Lima tahun.', B: 'Enam tahun.', C: 'Tujuh tahun.', D: 'Delapan tahun.' },
        jawaban: 'C'
      },
      {
        id: 's3-b3-q3',
        pertanyaan: 'Untuk menjadi guru sekolah dasar di Finlandia, seseorang harus …',
        pilihan: {
          A: 'Menyelesaikan program sarjana dan lulus tes kompetensi.',
          B: 'Menyelesaikan program magister dan bersaing dengan banyak kandidat.',
          C: 'Memiliki pengalaman mengajar minimal 5 tahun.',
          D: 'Lulus ujian negara yang sangat ketat setiap tahun.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b3-q4',
        pertanyaan: 'Berapa persen pelamar yang diterima untuk menjadi guru di Finlandia?',
        pilihan: { A: '5 persen.', B: '10 persen.', C: '15 persen.', D: '25 persen.' },
        jawaban: 'B'
      },
      {
        id: 's3-b3-q5',
        pertanyaan: 'Tujuan sistem evaluasi di Finlandia adalah …',
        pilihan: {
          A: 'Untuk memilah siswa berprestasi dan siswa yang tidak berprestasi.',
          B: 'Untuk memberikan peringkat nasional kepada setiap siswa.',
          C: 'Untuk membantu siswa berkembang, bukan untuk memeringkat atau mengeliminasi.',
          D: 'Untuk mempersiapkan siswa menghadapi ujian internasional.'
        },
        jawaban: 'C'
      },
      {
        id: 's3-b3-q6',
        pertanyaan: 'Berapa jam rata-rata siswa Finlandia belajar per hari?',
        pilihan: { A: '3 jam.', B: '5 jam.', C: '7 jam.', D: '9 jam.' },
        jawaban: 'B'
      },
      {
        id: 's3-b3-q7',
        pertanyaan: 'Makna kata "otonomi" dalam konteks bacaan adalah …',
        pilihan: {
          A: 'Kewajiban untuk mengikuti aturan yang ketat.',
          B: 'Hak untuk mengatur dan memutuskan secara mandiri.',
          C: 'Kemampuan untuk beradaptasi dengan situasi baru.',
          D: 'Wewenang untuk menilai siswa secara objektif.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b3-q8',
        pertanyaan: 'Pernyataan yang sesuai dengan isi bacaan adalah …',
        pilihan: {
          A: 'Sistem pendidikan Finlandia menerapkan kompetisi ketat antar siswa.',
          B: 'Ujian nasional wajib diadakan setiap tahun di Finlandia.',
          C: 'Siswa Finlandia mendapatkan pekerjaan rumah dalam jumlah yang sedikit.',
          D: 'Guru di Finlandia hanya perlu menyelesaikan pendidikan sarjana.'
        },
        jawaban: 'C'
      }
    ]
  },
  {
    id: 'bacaan-4',
    judul: 'Konservasi Terumbu Karang: Menjaga Harta Karun Lautan',
    sumber: 'Diadaptasi dari laporan Coral Triangle Initiative dan LIPI',
    teks: `Terumbu karang sering disebut sebagai "hutan hujan laut" karena keanekaragaman hayati yang dikandungnya. Meskipun terumbu karang hanya mencakup kurang dari satu persen permukaan dasar laut, ekosistem ini mendukung kehidupan lebih dari dua puluh lima persen seluruh spesies laut yang dikenal. Indonesia, sebagai bagian dari Segitiga Karang atau Coral Triangle, memiliki keanekaragaman terumbu karang tertinggi di dunia.

Terumbu karang memiliki peran ekologis yang sangat penting. Selain menjadi habitat bagi ribuan spesies ikan dan organisme laut, terumbu karang juga berfungsi sebagai pelindung alami garis pantai dari erosi dan abrasi. Secara ekonomi, terumbu karang mendukung industri perikanan dan pariwisata yang bernilai miliaran dolar setiap tahunnya.

Namun, terumbu karang di seluruh dunia, termasuk di Indonesia, menghadapi ancaman serius. Pemanasan global menyebabkan pemutihan karang atau coral bleaching, yaitu kondisi di mana karang mengeluarkan alga simbiotik yang hidup di dalamnya akibat suhu air yang terlalu tinggi. Tanpa alga tersebut, karang akan mati jika kondisi tidak pulih dalam waktu yang cukup.

Selain pemanasan global, ancaman lain berasal dari aktivitas manusia seperti penangkapan ikan dengan cara yang merusak (menggunakan bom atau racun), pembuangan limbah ke laut, dan sedimentasi akibat penggundulan hutan di daratan. Di Indonesia, diperkirakan sekitar tiga puluh persen terumbu karang telah rusak parah.

Berbagai upaya konservasi telah dilakukan untuk melindungi terumbu karang. Pemerintah dan lembaga swadaya masyarakat aktif melakukan transplantasi karang, pembersihan laut dari sampah, dan edukasi kepada masyarakat nelayan tentang pentingnya menjaga ekosistem laut. Program ekowisata bahari juga dikembangkan sebagai alternatif ekonomi yang berkelanjutan bagi masyarakat pesisir.`,
    soal: [
      {
        id: 's3-b4-q1',
        pertanyaan: 'Mengapa terumbu karang disebut sebagai "hutan hujan laut"?',
        pilihan: {
          A: 'Karena terumbu karang hidup di daerah yang banyak hujan.',
          B: 'Karena terumbu karang berwarna hijau seperti hutan.',
          C: 'Karena keanekaragaman hayati yang tinggi yang dikandungnya.',
          D: 'Karena terumbu karang menghasilkan oksigen seperti hutan.'
        },
        jawaban: 'C'
      },
      {
        id: 's3-b4-q2',
        pertanyaan: 'Berapa persen permukaan dasar laut yang dicakup terumbu karang?',
        pilihan: { A: 'Kurang dari 1 persen.', B: 'Sekitar 5 persen.', C: 'Sekitar 10 persen.', D: 'Lebih dari 25 persen.' },
        jawaban: 'A'
      },
      {
        id: 's3-b4-q3',
        pertanyaan: 'Apa yang dimaksud dengan coral bleaching atau pemutihan karang?',
        pilihan: {
          A: 'Karang berubah warna menjadi putih akibat terkena sinar matahari langsung.',
          B: 'Kondisi karang mengeluarkan alga simbiotik akibat suhu air yang terlalu tinggi.',
          C: 'Proses pembersihan karang dari lumut dan kotoran oleh nelayan.',
          D: 'Karang yang mati dan berubah menjadi batu kapur putih.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b4-q4',
        pertanyaan: 'Berapa persen terumbu karang di Indonesia yang diperkirakan telah rusak parah?',
        pilihan: { A: '10 persen.', B: '20 persen.', C: '30 persen.', D: '50 persen.' },
        jawaban: 'C'
      },
      {
        id: 's3-b4-q5',
        pertanyaan: 'Manakah yang BUKAN merupakan ancaman bagi terumbu karang menurut bacaan?',
        pilihan: {
          A: 'Penangkapan ikan dengan bom atau racun.',
          B: 'Pembuangan limbah ke laut.',
          C: 'Kegiatan menyelam wisata yang berlebihan.',
          D: 'Sedimentasi akibat penggundulan hutan.'
        },
        jawaban: 'C'
      },
      {
        id: 's3-b4-q6',
        pertanyaan: 'Apa fungsi ekologis terumbu karang selain sebagai habitat spesies laut?',
        pilihan: {
          A: 'Mengatur iklim global dan curah hujan.',
          B: 'Melindungi garis pantai dari erosi dan abrasi.',
          C: 'Menghasilkan oksigen untuk kehidupan manusia di daratan.',
          D: 'Menyaring air laut menjadi air tawar.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b4-q7',
        pertanyaan: 'Upaya konservasi terumbu karang yang disebutkan dalam bacaan adalah …',
        pilihan: {
          A: 'Melarang seluruh aktivitas nelayan di kawasan terumbu karang.',
          B: 'Mengimpor spesies karang dari luar negeri untuk menggantikan yang rusak.',
          C: 'Transplantasi karang, pembersihan laut, dan edukasi masyarakat nelayan.',
          D: 'Menutup kawasan terumbu karang dari kunjungan umum.'
        },
        jawaban: 'C'
      },
      {
        id: 's3-b4-q8',
        pertanyaan: 'Pikiran utama paragraf kelima adalah …',
        pilihan: {
          A: 'Ancaman pemanasan global terhadap terumbu karang.',
          B: 'Manfaat ekonomi terumbu karang bagi Indonesia.',
          C: 'Berbagai upaya konservasi yang dilakukan untuk melindungi terumbu karang.',
          D: 'Penyebab utama kerusakan terumbu karang di Indonesia.'
        },
        jawaban: 'C'
      }
    ]
  },
  {
    id: 'bacaan-5',
    judul: 'Wayang Kulit: Seni Pertunjukan Warisan Dunia',
    sumber: 'Diadaptasi dari Ensiklopedia Kebudayaan Indonesia dan data Kemendikbud',
    teks: `Wayang kulit adalah seni pertunjukan tradisional yang menggunakan boneka berbahan kulit yang disinari oleh lampu sehingga menghasilkan bayangan pada layar putih. Pertunjukan ini dipimpin oleh dalang yang tidak hanya menggerakkan boneka, tetapi juga bertugas sebagai narator, sutradara, dan penyuara semua karakter secara bersamaan. Pertunjukan wayang kulit biasanya berlangsung semalam suntuk dari sore hingga fajar.

Wayang kulit berasal dari Jawa dan diperkirakan telah ada sejak lebih dari seribu tahun yang lalu. Cerita yang dibawakan umumnya bersumber dari epik Hindu seperti Mahabharata dan Ramayana, yang kemudian diadaptasi dengan nilai-nilai budaya Jawa dan pengaruh Islam seiring berkembangnya agama tersebut di Nusantara. Tokoh-tokoh seperti Semar, Gareng, Petruk, dan Bagong—yang dikenal sebagai Punakawan—merupakan kreasi asli budaya Jawa yang tidak terdapat dalam naskah asli India.

Proses pembuatan wayang kulit memerlukan keahlian tinggi dan waktu yang lama. Kulit sapi atau kerbau yang sudah dikeringkan dipotong sesuai bentuk tokoh, kemudian diukir dengan motif yang sangat detail. Pewarnaan dilakukan secara manual menggunakan cat, dan wayang diberi rangka dari tanduk kerbau. Sebuah wayang kulit berkualitas tinggi dapat memakan waktu pembuatan hingga berminggu-minggu.

Pada tahun 2003, UNESCO menetapkan wayang kulit Indonesia sebagai Masterpiece of Oral and Intangible Heritage of Humanity atau Warisan Agung Lisan dan Nonbendawi Kemanusiaan. Pengakuan ini mendorong pemerintah Indonesia untuk lebih serius dalam melestarikan dan mempromosikan seni pertunjukan yang kaya filosofi ini.

Saat ini, wayang kulit menghadapi tantangan dalam era digital. Generasi muda cenderung lebih tertarik pada hiburan digital daripada pertunjukan tradisional yang berlangsung lama. Berbagai upaya inovasi dilakukan untuk menarik minat generasi muda, antara lain dengan mempersingkat durasi pertunjukan, memperkenalkan wayang dalam platform digital, dan mengintegrasikan pertunjukan wayang ke dalam kurikulum sekolah.`,
    soal: [
      {
        id: 's3-b5-q1',
        pertanyaan: 'Siapa yang memimpin pertunjukan wayang kulit?',
        pilihan: {
          A: 'Pemain gamelan.',
          B: 'Dalang.',
          C: 'Sutradara.',
          D: 'Penyanyi sinden.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b5-q2',
        pertanyaan: 'Cerita yang dibawakan dalam wayang kulit umumnya bersumber dari …',
        pilihan: {
          A: 'Kitab suci agama Islam.',
          B: 'Legenda rakyat Jawa asli.',
          C: 'Epik Hindu Mahabharata dan Ramayana.',
          D: 'Kronik kerajaan Majapahit.'
        },
        jawaban: 'C'
      },
      {
        id: 's3-b5-q3',
        pertanyaan: 'Tokoh Punakawan dalam wayang kulit merupakan …',
        pilihan: {
          A: 'Tokoh dari naskah epik India yang diterjemahkan.',
          B: 'Kreasi asli budaya Jawa yang tidak ada di naskah India.',
          C: 'Tokoh dari ajaran agama Islam yang masuk ke Jawa.',
          D: 'Tokoh mitologi Yunani yang diadaptasi.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b5-q4',
        pertanyaan: 'Bahan utama untuk membuat wayang kulit adalah …',
        pilihan: {
          A: 'Kayu jati yang diukir dengan pahat.',
          B: 'Kulit sapi atau kerbau yang sudah dikeringkan.',
          C: 'Bambu yang dianyam dengan rotan.',
          D: 'Kertas tebal yang dilaminasi dan dicat.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b5-q5',
        pertanyaan: 'Kapan UNESCO menetapkan wayang kulit sebagai warisan dunia?',
        pilihan: { A: 'Tahun 1999.', B: 'Tahun 2001.', C: 'Tahun 2003.', D: 'Tahun 2009.' },
        jawaban: 'C'
      },
      {
        id: 's3-b5-q6',
        pertanyaan: 'Tantangan yang dihadapi wayang kulit di era digital adalah …',
        pilihan: {
          A: 'Sulitnya mendapatkan bahan kulit yang berkualitas.',
          B: 'Berkurangnya jumlah pengrajin wayang yang terampil.',
          C: 'Generasi muda lebih tertarik pada hiburan digital.',
          D: 'Larangan pertunjukan wayang di beberapa daerah.'
        },
        jawaban: 'C'
      },
      {
        id: 's3-b5-q7',
        pertanyaan: 'Manakah upaya inovasi yang disebutkan untuk menarik minat generasi muda?',
        pilihan: {
          A: 'Mengganti cerita wayang dengan tema modern.',
          B: 'Memperkenalkan wayang dalam platform digital.',
          C: 'Mengubah bahan wayang dari kulit menjadi plastik.',
          D: 'Menyelenggarakan kompetisi dalang tingkat nasional.'
        },
        jawaban: 'B'
      },
      {
        id: 's3-b5-q8',
        pertanyaan: 'Pernyataan yang sesuai dengan isi bacaan adalah …',
        pilihan: {
          A: 'Wayang kulit berasal dari India dan dibawa ke Jawa oleh pedagang.',
          B: 'Pertunjukan wayang kulit biasanya berlangsung dari pagi hingga siang hari.',
          C: 'UNESCO mengakui wayang kulit sebagai warisan budaya dunia pada 2003.',
          D: 'Tokoh Punakawan merupakan tokoh dari epik Ramayana yang terkenal.'
        },
        jawaban: 'C'
      }
    ]
  }
];

/* ═══════════════════════════════════════════════════════════════
   DATABASE LOADER
   ═══════════════════════════════════════════════════════════════ */
const DataLoader = {
  _db: { ejaan: null, kbbi: null, tbbbi: null },
  _loaded: false,

  async loadDatabases() {
    if (this._loaded) return this._db;
    // Use inline constants from database_inline.js (avoids CORS on file://)
    try {
      this._db = {
        ejaan: (typeof EJAAN_DB !== 'undefined') ? EJAAN_DB : null,
        kbbi:  (typeof KBBI_DB  !== 'undefined') ? KBBI_DB  : null,
        tbbbi: (typeof TBBBI_DB !== 'undefined') ? TBBBI_DB : null
      };
      this._loaded = true;
    } catch (e) {
      console.warn('Database load warning:', e);
    }
    return this._db;
  },

  getSection1() { return SECTION1_DATA; },
  getSection2() { return SECTION2_DATA; },
  getSection3() { return SECTION3_DATA; },

  getSection2Flat() {
    return SECTION2_DATA;
  }
};
