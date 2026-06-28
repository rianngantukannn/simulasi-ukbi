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

