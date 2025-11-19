<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuBeritaTable;
use App\Models\User;
use App\Models\ProdusenDataTable;

class MenuBeritaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pemetaan dari owner_berita ke nama produsen
        $produsenMapping = [
            '0000000000' => 'KEMENTERIAN PERTANIAN',
            '0100000000' => 'SEKRETARIAT JENDERAL',
            '0200000000' => 'DIREKTORAT JENDERAL PRASARANA DAN SARANA PERTANIAN',
            '0300000000' => 'DIREKTORAT JENDERAL TANAMAN PANGAN',
            '0400000000' => 'DIREKTORAT JENDERAL HORTIKULTURA',
            '0500000000' => 'DIREKTORAT JENDERAL PERKEBUNAN',
            '0600000000' => 'DIREKTORAT JENDERAL PETERNAKAN DAN KESEHATAN HEWAN',
            '0700000000' => 'INSPEKTORAT JENDERAL',
            '0800000000' => 'BADAN PENELITIAN DAN PENGEMBANGAN',
            '0900000000' => 'BADAN PENYULUHAN DAN PENGEMBANGAN SDM PERTANIAN',
            '1000000000' => 'BADAN KETAHANAN PANGAN',
            '1100000000' => 'BADAN KARANTINA PERTANIAN',
            '1200000000' => 'DIREKTORAT JENDERAL LAHAN DAN IRIGASI PERTANIAN',
            '1300000000' => 'BADAN PERAKITAN DAN MODERNISASI PERTANIAN'
        ];

        // Data dari spec.txt
        $beritaData = [
            [
                'id' => 10,
                'judul_berita' => 'Bertolak Ke Solo, Mentan Serahkan Bantuan ATM Beras Untuk Masyarakat',
                'tgl_berita' => '2021-08-20',
                'isi_singkat_berita' => NULL,
                'isi_berita' => '<div><span xss="removed">Madiun,- Menteri Pertanian (Mentan)
Syahrul Yasin Limpo  menyerahkan bantuan beras kepada masyarakat yang
mengalami kesulitan ekonomi akibat pandemi Covid-19. Dalam kesempatan
tersebut, turut hadir mendampingi Walikota Solo, Gibran Rakabuming Raka.</span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">"Hari ini kita luncurkan ATM beras
bersama dengan Pak Walikota Solo tiada lain diharapkan bersama TNI
melakukan aktivitas bakti sosial kita untuk menyangga atau memberikan
bantuan kepada masyarakat yang terdampak Covid. Kami berupaya supaya
seluruh masyarakat yang terkena dampak dari pandemi  bisa memenuhi
kebutuhan pangan,"ucap Mentan Syahrul saat diwawancarai usai menyerahkam
 bantuan di Koramil 05 Pasar Kliwon,Surakarta, Kamis (19/8/21).</span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">Mentan menambahkan penyaluran beras
dilakukan dengan pemanfaatan teknologi melalui penggunaan mesin penyedia
 beras otomatis yaitu anjungan tunai mandiri (ATM) yang ditempatkan di
beberapa Kodim dan Koramil. Bantuan ATM beras ini diharapkan bisa
menjadi solusi bagi masyarakat yang penghasilan hariannya terpengaruh
akibat pengurangan aktivitas sosial.</span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">"Dengan adanya ATM beras ini, kami berharap bisa menjadi solusi pengentasan krisis pangan bagi masyarakat Indonesia,"</span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">"Kementan bersama Walikota Solo
bersama TNI  menyiapkan bantuan ini standby di sini. ATM ini dalam
sekali tekan akan mengeluarkan 1 setengah kilo beras atau setara 3 liter
 beras. Jadi intinya 1 hari,1 orang warga datang ke Kodim mengambil
beras lewat ATM, sekali pencet lalu beras yang keluar dibawa pulang,
nanti Pak Walikota yang atur," kata Syahrul.</span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">Selanjutnya, Mentan mengatakan
ditengah pandemi,  sektor pertanian menjadi salah satu sektor yang
bertumbuh positif dan berkontribusi dalam perekonomian nasional. Sesuai
data BPS, pada triwulan pertama 2021 pertanian tumbuh positif 2,95
persen. </span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">Bahkan sepanjang tahun 2020, nilai
ekspor pertanian sebesar Rp451,77 triliun atau naik 15,79 persen
dibandingkan tahun sebelumnya. Sementara pada triwulan I 2021 ekspor
pertanian sebesar Rp277,95 triliun atau naik 40,29 persen dibandingkan
periode yang sama tahun sebelumnya.</span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">"Oleh karena itu kita syukurin ini.
Tentu saja bantahan sosial lainnya sudah dilakukan tetapi kita menyangga
kemungkinan yang ada. Ini juga uji coba pak Aster, Pak Walikota. Kenapa
kita pilih Solo karena pada uji coba ini Pak Walikota minta tidak hanya
beras tetapi urban farming atau pertanian dalam kota yang akan coba kita
 sikapi,"ujar Syahrul.</span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">Dikesempatan yang sama, Direktur
Jenderal Tanaman Pangan Kementerian Pertanian (Kementan), Suwandi
mengatakan sebagai salah satu Kementerian yang bertanggungjawab terhadap
 produksi pangan, sekaligus sebagai wujud kepedulian terhadap kesulitan
yang tengah dihadapi masyarakat, Kementan dibawah arahan Mentan Syahrul
menerbitkan kebijakan penyediaan beras secara terbatas kepada masyarakat
 khususnya yang terdampak pandemi Covid-19.</span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">"Sektor pertanian Indonesia harus
tangguh sehingga dalam menghadapi berbagai macam goncangan, tetap eksis
menyediakan makan rakyat dan meningkatkan pertumbuhan ekonomi secara
mikro dan makro,"ucap Suwandi.</span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">Kegiatan ini adalah bentuk kerjasama
 sinergis antara Kementan dan TNI AD sebagai lanjutan dari kegiatan
tahun 2020 lalu. Dan pada tahun 2021, kegiatan ini akan dilaksanakan di
514 Kabupaten/Kota seluruh Indonesia. </span></div>
<div><span xss="removed"><br>
</span></div>
<div><span xss="removed">"Terima kasih kami ucapkan kepada
jajaran TNI-AD atas kerjasamanya dalam penyaluran beras bagi warga
terdampak covid di wilayah Jakarta dan sekitarnya pada 2020 yang lalu.
Bersama mitra kami juga akan bergandengan tangan menyediakan beras bagi
masyarakat," tutup Suwandi*)</span></div>',
                'file_berita' => 'ATM_Beras_Solo.jpg',
                'file_foto' => 'ATM_Beras_Solo.jpg',
                'status_berita' => 1, // publish
                'owner_berita' => '0000000000',
            ],
            [
                'id' => 11,
                'judul_berita' => 'Petani: Meski Dinamika Harga, Porang Saat Ini Menguntungkan',
                'tgl_berita' => '2021-08-24',
                'isi_singkat_berita' => '<span>Kementerian Pertanian saat ini terus mendorong pengembangan porang
sebagai salah satu komoditas unggulan Indonesia karena memiliki potensi
dan nilai yang sangat besar serta tingginya permintaan porang dipasar
ekspor.</span>',
                'isi_berita' => '<p><span xss="removed">Kementerian Pertanian saat ini terus mendorong pengembangan porang
sebagai salah satu komoditas unggulan Indonesia karena memiliki potensi
dan nilai yang sangat besar serta tingginya permintaan porang dipasar
ekspor.</span></p><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">Meningkatnya penanaman porang saat
ini diberbagai daerah dipicu oleh meningkatnya minat petani bercocok
tanam porang karena adanya tingkat keuntungan yang memadai,
berkembangnya industri olahan berbahan baku, serta didukung oleh
kesesuaian lahan. </span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">Terkait harga, komoditas porang
terbilang dinamis dalam range wajar dan tergantung dengan mekanisme
pasar (supply and demand). Harga porang saat ini yang mengalami
penurunan justru mulai mengalami kenaikan. Tahun 2020 lalu pernah
sesekali harga tinggi justru lagi gejolak harga.</span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">"Memang kondisi harga porang di
lapangan saat ini Rp 6.000 tapi sudah mulai naik lagi di angka Rp 6.500
perkilogram. Beberapa tahun lalu pernah harga mencapai Rp 4.000, juga
pernah Rp 2.500 bahkan pernah rendah hingga Rp 600 perkilogram, " ujar
Yoyok Triono, Petani Porang asal Kabupaten Madiun, Jawa Timur di Desa
Klangon, Kecamatan Saradan, Senin (23/8/2021).</span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">Sudah menjadi petani porang sejak
tahun 2010, Yoyok mengungkapkan bahwa saat ini banyak petani baru
khususnya petani porang yang berharap keuntungan yang besar sehingga
harapannya terhadap komoditas porang juga tinggi. </span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">"Meskipun ada dinamika harga,
tanaman porang dibandingkan dengan tanaman pangan lain maupun palawija
memang masih lebih menguntungkan," terangnya.</span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">Yoyok berharap harga porang ke depan
 stabil. Menurutnya, salah satu cara yang dapat dilakukan dalam menjaga
harga porang agar tetap stabil adalah menunda masa panen ke masa panen
berikutnya sehingga keuntungan dan hasilnya akan menjadi lebih besar. </span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">"Untuk menjaga harga kita tidak
terburu-buru menjual bila harga belum cocok. Ini berbeda dengan tanaman
lain, porang bisa ditunda panennya dan aman tidak rusak, malah nanti
dipanen pada musim berikutnya umbinya semakin besar," jelasnya.</span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">Selain itu menurut Yoyok, keuntungan
 dalam menanam porang adalah perawatannya yang terbilang cukup mudah
serta minimnya serangan hama penyakit yang dapat merugikan petani.</span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">Lebih lanjut Yoyok mengungkapkan
harga porang yang cukup dinamis saat ini masih memberi keuntungan pada
petani, karena porang hasil produksi petani khususnya di Kabupaten
Madiun tetap laku dan dibeli oleh pengepul. Selain kegiatan budidaya, di
 wilayah Madiun juga mulai tumbuh usaha pengolahan porang skala kecil
dan UKM untuk menambah penghasilan.</span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">"Saat ini porang masih memberikan
keuntungan besar pada petani dikarenakan produktivitas porang tahun ini
lebih besar dibanding tahun kemarin," ungkapnya.</span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">Sebelumnya, Menteri Pertanian
Syahrul Yasin Limpo (Mentan SYL) mengungkapkan bahwa penurunan harga
porang hanya karena faktor supply dan demand saja. Yang terpenting
adalah pemerintah mendorong budidaya tanaman porang karena hasilnya
sangat menjanjikan untuk diekspor</span></div><span xss="removed">
</span><div><span xss="removed"><br><span xss="removed">
</span></span></div><span xss="removed">
</span><div><span xss="removed">"Satu hektarenya menjanjikan hasil
yang sangat besar. Dan kita berharap harga porang bagus banget. Tetapi
kami juga tidak boleh bergantung pada ekspor. Oleh karena itu, perlu
melakukan end product atau produksi akhir harus dilakukan di Indonesia, "
 jelas SYL.</span></div>',
                'file_berita' => '',
                'file_foto' => 'ttd.png',
                'status_berita' => 1, // publish
                'owner_berita' => '0000000000',
            ],
            [
                'id' => 13,
                'judul_berita' => ' MoU Lintas Stakeholders, Kementan Optimalkan Hulu-hilir Agroindustri Hortikultura',
                'tgl_berita' => '2021-08-26',
                'isi_singkat_berita' => NULL,
                'isi_berita' => '<div align="justify">Jakarta-Kementerian Pertanian melakukan penandatanganan kerjasama
lintas stakeholders guna mendukung hulu-hilir agroindustri hortikultura
yang berdaya saing dan berkelanjutan. Penandatanganan tersebut dilakukan
 oleh Direktur Jenderal Hortikultura, Prihasto Setyanto beserta
perwakilan dari PT Calbee Wings, PT Ewindo/East West Rajawali Nusantara
Indonesia (RNI),  Asosiasi Bawang Merah Indonesia (ABMI), serta Bank
Jabar- Banten (BJB) di Agriculture War Room (AWR) Kementan, Kamis, 26
Agustus 2021, disaksikan langsung oleh Menteri Pertanian Syahrul Yasin
Limpo.</div>
<div align="justify"> </div>
<div align="justify">Dirjen Hortikultura,  Prihasto Setyanto dalam laporannya menyampaikan bahwa ada tiga kerja sama yang akan ditandatangani.</div>
<div align="justify"> </div>
<div align="justify">Pertama, kerjasama yang dilakukan bersama RNI. Ini dilakukan untuk
menyerap produk hortikultura segar maupun olahan. Menurut Prihasto,
pihaknya memiliki bina-an UMKM hortikultura di seluruh Indonesia. Sampai
 dengan tahun 2022, ditargetkan ada sekitar 600 UMKM yang tentunya perlu
 dukungan pada aspek pemasaran. Dan ini yang kami rintis dengan RNI.</div>
<div align="justify"> </div>
<div align="justify">"MoU yang kedua yaitu dengan Wings Food dan Ewindo. Ini terkait
arahan Pak Menteri untuk pengembangan food estate di 4 kabupaten,
Bantul, Wonosobo, Temanggung dan Garut. Wings Food sudah siap menjadi
offtaker untuk kentang industri, dengan Ewindo nanti akan bekerjasama
dalam hal benih. Pertani nanti akan memproduksinya, Ewindo yang kemudian
 menyerap benih tersebut," katanya.</div>
<div align="justify"> </div>
<div align="justify">Sementara untuk pembiayaan, Prihasto lebih lanjut menjelaskan bahwa
 Bank BJB akan mem fasilitasi pembiayaan untuk mendukung UMKM
hortikuktura. Walaupun sebelumnya sudah banyak kerjasama yang terjalin
antara Kementan dengan BJB namun MoU kali ini menurutnya perlu dilakukan
 untuk memperjelas dan lebih terarah.</div>
<div align="justify"> </div>
<div align="justify">Mentan SYL mengapresiasi kerjasama yang dilakukan dan ia berharap
semua pihak yang terlibat  menjadi semakin tangguh dan kreatif dalam
membangun pertanian di tengah situasi pandemi. </div>
<div align="justify"> </div>
<div align="justify">"Saya yakin apa yang kita lakukan hari ini ini adalah konttibusi
kita semua bagi bangsa. Untuk menghadirkan kehidupan negara yang lebih
baik, dan kehidupan rakyat yang semakin sejahtera dengan menyediakan
nutrisi dari sumber pangan hortikultura yang sehat," ungkap Mentan.</div>
<div align="justify"> </div>
<div align="justify">Mentan mengakui bahwa Pandemi  Covid-19 telah merubah tatanan
sosial kehidupan. Ia kemudian mengingatkan agar pertanian Indonesia
harus tetap berjalan dengan manajemen modern.</div>
<div align="justify"> </div>
<div align="justify">"Pertanian tidak bisa dilakukan seperti cara-cara yang lama. Pertanian harus dihandle lebih kuat," tegas Syahrul.</div>
<div align="justify"> </div>
<div align="justify">Oleh karena itu, membangun pertanian yang dibutuhkan menurutnya
adalah komitmen dan integritas. Petani, pemerintah daerah dan pelaku
usaha harus bertanggung jawab sesuai dengan tugas dan fungsinya
masing-masing.</div>
<div align="justify"> </div>
<div align="justify">"Penandantangan ini harus ada hasilnya. Saya tidak mau kalau cuma
buat nyengengin doang. Harus maju. Kalau kau mau gapai pulau harapan
dibalik fatamorgana, maka kau lepas tambat perahu dari dermaga. Kau mau
menikmati pemandangan indah yang nyaman di mata, kau arungi samudera.
Kau berhadapan dengan badai dan gelombang tapi jangan kau bawa
menyamping itu perahu apalagi balik badan," pungkasnya.</div>',
                'file_berita' => 'Mentan_MOU_Hortikultura.jpg',
                'file_foto' => 'Mentan_MOU_Hortikultura.jpg',
                'status_berita' => 1, // publish
                'owner_berita' => '0000000000',
            ],
            [
                'id' => 14,
                'judul_berita' => 'Kementan Komitmen Perbaiki Tata Kelola Pupuk Subsidi',
                'tgl_berita' => '2021-08-27',
                'isi_singkat_berita' => NULL,
                'isi_berita' => '<p align="justify">KARAWANG - Kementerian Pertanian (Kementan) berkomitmen untuk terus
memperbaiki tata kelola pupuk subsidi. Hal itu terungkap saat jajaran
Direktorat Jenderal Prasarana dan Sarana Pertaniam (PSP) Kementan
mendampingi kunjungan kerja Panja Komisi IV DPR RI ke pabrik Pupuk
Kujang dan Kabupaten Karawang, Jumat (27/8/2021).</p>
<div align="justify"> </div>
<div align="justify">Direktur Jenderal Prasarana dan Sarana Pertanian (PSP) Kementan,
Ali Jamil berharap pupuk subsidi dapat dimanfaatkan sebaik-baiknya oleh
para petani untuk mengembangkan budidaya pertanian mereka. </div>
<div align="justify"> </div>
<div align="justify">"Tentu harapan kami, harapan semuanya, bagaimana pupuk bersubsidi
ini bisa dimanfaatkan dengan sebaik-baiknya oleh para petani kita di
lapangan," kata Ali dalam sambutannya.</div>
<div align="justify"> </div>
<div align="justify">Sejauh ini, Kementan terus melakukan pembenahan dalam kerangka
perbaikan tata kelola pupuk subsidi. Sedapat mungkin kendala yang
terjadi di lapangan agar tak terulang kembali di kemudian hari. Solusi
pun tengah disiapkan. </div>
<div align="justify"> </div>
<div align="justify">"Di sana-sini kami melakukan perbaikan-perbaikan terhadap hal ini.
Kami berdiskusi dengan rekan-rekan dari PIHC terkait dengan
kendala-kendala yang kita hadapi di lapangan dan rencana perbaikan tata
kelola pupuk bersubsidi ini ke depan yang akan kita lakukan," ujar Ali. </div>
<div align="justify"> </div>
<div align="justify">Tak hanya dari internal, Ali mengaku perbaikan tata kelola pupuk
subsidi pun terus dilakukan dengan melibatkan pihak-pihak terkait
lainnya, yang berkaitan dengan pengawasan. </div>
<div align="justify"> </div>
<div align="justify">"Kami bersama PIHC diundang BPK RI terkait dengan mekanisme
perbaikan pupuk bersubsidi. Mudah-mudahan ke depan, terkait dengan
perbaikan tata kelola pupuk bersubsidi bisa kita lakukan sebaik-baiknya
untuk mencapai efektivitas pemanfaatan pupuk bersubsidi ini dalam rangka
 peningkatan produksi pertanian," harap Ali.</div>
<div align="justify"> </div>
<div align="justify">Direktur Pupuk dan Pestisida Ditjen PSP Kementan, Muhammad Hatta
menambahkan sedapat mungkin Kementan berupaya membantu petani agar
kebutuhan pupuk bisa tepat jumlah, mutu, waktu, harga dan sasaran.</div>
<div align="justify"> </div>
<div align="justify">"Pemberian pupuk bersubsidi ini haruslah memenuhi enam prinsip
utama yang sudah dicanangkan atau disebut 6T, yakni tepat jenis, tepat
jumlah, tepat harga, tepat tempat, tepat waktu, dan tepat mutu," kata
Hatta.</div>
<div align="justify"> </div>
<div align="justify">Ketua Komisi IV DPR RI, Sudin menerangkan ada tiga hal yang ingin
dicapai dari kunjungan kerjanya kali ini. Yang pertama tentu saja
silaturahmi. Selanjutnya, kunjungan kerja ini dilakukan sebagai tindak
lanjut dari serangkaian rapat Panja Pupuk Bersubsidi dan Kartu Tani
Komisi IV dengan pemerintah dan BUMN terkait dengan permasalahan pupuk
bersubsidi serta implementasi program dan masih adanya kendala yang
merugikan pertanian.</div>
<div align="justify"> </div>
<div align="justify">"Permasalahan pupuk bersubsidi dan Kartu Tani adalah pengawasan
jaringan. Komisi Pengawas Pupuk dan Pestisida di setiap daerah tidak
berfungsi.</div>
<div align="justify">Kedua distribusi tidak tepat waktu,</div>
<div align="justify">Ketiga, pengunaan pupuknya di kalangan petani berlebihan dari
rekomendasi yang diusulkan, sehingga menimbulkan sejumlah dampak negatif
 budidaya pertanian," papar dia. </div>
<div align="justify"> </div>
<div align="justify">Tak hanya itu, akurasi data juga masih menjadi problematika.
"Permasalahan pupuk bersubsidi dan Kartu Tani sebagaimana rapat-rapat
Panja sebelumnya ada tiga persoalan yakni</div>
<div align="justify">Ketidakpastian data, penyaluran pupuk yang masih rendah terbalik
dengan alokasi pupuk bersubsidi yang di ajukan dan terakhir mengenai
realisasi Kartu Tani," tutur dia. </div>
<div align="justify"> </div>
<div align="justify">Direktur Utama pupuk Indonesia, Achmad Bakir Pasaman menjelaskan,
dalam memperbaiki tata kelola pupuk subsidi, maka diperlukan beberapa
langkah strategis. Pertama, penyesuaian atau update data eRDKK dalam
bulan berjalan guna mengakomodir perubahan data petani maupun data
kebutuhan pupuk yang menyesuaikan kondisi musim ataubrencana tanam
petani.</div>
<div align="justify"> </div>
<div align="justify">"Kedua, dapat dilakukan realokasi kebutuhan pupuk antarprovinsi dan
 realokasi antarjenis (jika dimungkinkan) guna mengoptimalkan serapan
sesuai dengan kebutuhan riil di lapangan," tutur dia. </div>
<div align="justify"> </div>
<div align="justify">Terakhir, Bakir menerangkan, jika dimungkinkan dapat dilakukan
penyesuaian mekanisme penebusan pupuk bersubsidi oleh petani menjadi
lebih mudah, namun tetap memperhatikan ketepatan sasaran petani yang
berhak menerima pupuk bersubsidi.</div>
<div align="justify"> </div>
<div align="justify">Perlu diketahui, Menteri Pertanian Syahrul Yasin Limpo (SYL)
meminta petani bijak menggunakan pupuk subsidi. Apabila petani bijak
menggunakan pupuk secara berimbang, produktivitas pertanian dipastikan
tetap bisa dipertahankan. </div>
<div align="justify"> </div>
<div align="justify">Mentan menganjurkan petani mengoptimalkan pupuk yang ada. "Jika
pupuk digunakan dengan baik, otomatis produktivitas meningkat, kendati
alokasi pupuk bersubsidi pada 2021 tidak sebanyak permintaan dari
petani," imbuhnya.</div>',
                'file_berita' => 'Pupuk_Kementan.jpg',
                'file_foto' => 'Pupuk_Kementan.jpg',
                'status_berita' => 0, // publish
                'owner_berita' => '0000000000',
            ],
            [
                'id' => 15,
                'judul_berita' => 'Tumbuh dan Tangguh, Presiden Jokowi Puji Sektor Pertanian Pada Merdeka Ekspor',
                'tgl_berita' => '2021-08-15',
                'isi_singkat_berita' => NULL,
                'isi_berita' => '<p align="justify">Jakarta - Presiden RI, Joko Widodo (Jokowi) mengapresiasi kegiatan
Merdeka Ekspor yang diinisiasi Kementerian Pertanian (Kementan) pada 17
pintu utama yang tersebar di 17 Provinsi Indonesia. Menurut Presiden,
kegiatan ini penting dilakukan, terlebih sektor pertanian adalah sektor
yang tangguh dan memiliki potensi besar dalam mendukung pertumbuhan
ekonomi nasional.</p>
<div align="justify"> </div>
<div align="justify">"Sektor pertanian merupakan salah satu sektor yang mampu bertahan
dari hantaman pandemi Covid 19, dimana ekspor pada tahun 2020 mencapai
451,8 triliun atau naik 15,79 persen jika dibandingkan tahun 2019 yang
hanya 390,6 triliun," ujar Presiden saat membuka Merdeka Ekspor 2021,
Sabtu (14/8/2021).</div>
<div align="justify"> </div>
<div align="justify">Presiden mengatakan, ekspor pertanian pada semester pertama tahun
2021, yakni dari Januari sampai Juli juga cukup membanggakan, yaitu
mencapai 282,86 triliun atau naik 14,05 persen jika dibandingkan periode
 yang sama tahun 2020 yang hanya 202,05 triliun.</div>
<div align="justify"> </div>
<div align="justify">Peningkatan ekspor pertanian, kata Presiden juga dinilai cukup
memuaskan karena sejauh ini mampu berdampak besar terhadap peningkatan
kesejahteraan. Hal ini bisa dilihat dari angka Nilai Tukar Petani (NTP)
nasional yang mencapai 99,60 pada Juni 2020 dan secara konsisten
meningkat hingga Desember 2020 sebesar 103,25 serta Juni 2021 mencapai
103,59.</div>
<div align="justify"> </div>
<div align="justify">"Ini sebuah kabar yang baik yang bisa memacu semangat petani-petani
 kita untuk tetap produktif di masa pandemi. Tadi juga disampaikan oleh
Pak Menteri (Syahrul Yasin Limpo) bahwa kegiatan ekspor beras sudah
dimulai ke Arab Saudi," katanya.</div>
<div align="justify"> </div>
<div align="justify">Menteri Pertanian, Syahrul Yasin Limpo (Mentan SYL) menyampaikan
terimakasih atas perhatian Kepala Negera terhadap sektor pertanian
Indonesia, terutama dalam mendukung kegiatan Merdeka Ekspor di 17 Pintu
ekspor yang memiliki nilai devisa 7,2 triliun.</div>
<div align="justify"> </div>
<div align="justify">"Sesuai arahan bapak Presiden bahwa investasi dan ekspor merupakan
faktor kunci dalam mempercepat pertumbuhan ekonomi nasional. Sehubungan
dengan hal tersebut, kami terus berupaya mendorong ekspor produk
pertanian ke berbagai negara," katanya.</div>
<div align="justify"> </div>
<div align="justify">Mentan menjelaskan, kegitan merdeka ekspor merupakan implementasi
dari berbagai program yang ada, termasuk program Gerakan Tiga Kali
Ekspor (Gratieks) untuk mempercepat ekspor produk pertanian, serta
menggerakan provinsi, kabupaten dan kota untuk mengakselerasi ekspor.</div>
<div align="justify"> </div>
<div align="justify">Adapun Ekspor yang akan dilepas pada kesempatan ini sebesar 627.399
 ton senilai Rp. 7,29 triliun meliputi komoditas perkebunan 564.550 ton,
 tanaman pangan 4.277 ton, hortikultura 7.230 ton, peternakan 4.013 ton,
 dan beberapa komoditas lainnya.</div>
<div align="justify"> </div>
<div align="justify">"Kami juga memulai dan mendorong lebih cepat ekspor produk
pertanian seperti komoditas porang, sarang burung walet, lipan, maggot
serta komoditas potensial ekspor lainnya," kata Mentan.</div>
<div align="justify"> </div>
<div align="justify">Perlu diketahui, pelepasan ekspor dilakukan antara lain di
Pelabuhan Tanjung perak yang memiliki nilai devisa sebesar 1,3 triliun,
Pelabuhan Laut Dwikora Pontianak 194,31 miliar, Pelabuhan Dumaj 1
triliun, Pelabuhan Belawan 431,6 miliar, Pelabuhan Tanjung Priok 435,1
miliar dan Tanjung Emas Semarang sebesar Rp 400 miliar lebih.</div>
<p align="justify"> </p>',
                'file_berita' => 'merdeka_ekspor.jpg',
                'file_foto' => 'merdeka_ekspor.jpg',
                'status_berita' => 0, // publish
                'owner_berita' => '0000000000',
            ],
            [
                'id' => 16,
                'judul_berita' => 'Mentan Syahrul: Petani Adalah Pahlawan Bangsa',
                'tgl_berita' => '2021-08-17',
                'isi_singkat_berita' => NULL,
                'isi_berita' => '<p align="justify">Jakarta – Menteri Pertanian Syahrul Yasin Limpo kembali menegaskan
peran penting petani dalam pembangunan nasional. Untuk itu, Syahrul
meminta jajarannya untuk terus berupaya meningkatkan kesejahteraan
petani. </p>
<div align="justify"><span xss="removed"><br>
</span></div>
<div align="justify"><span xss="removed">"Petani adalah pahlawan bagi pangan
bangsa, Tidak boleh sedikit pun pemerintah mengecewakan mereka," ungkap
Syahrul, pada keterangan pers kegiatan Tasyakuran Kementerian Pertanian
(Kementan) Dalam Rangka HUT Ke-76 Kemerdekaan Republik Indonesia, Selasa
 (17/08/2021). </span></div>
<div align="justify"><span xss="removed"><br>
</span></div>
<div align="justify"><span xss="removed">Syahrul menyebutkan Nilai Tukar
Petani (NTP) dan Nilai Tukar Usaha Pertanian (NTUP) sebagai  indikator
kesejahteraan petani  saat ini terus meningkat. Pada bulan Juni 2021 NTP
mencapai 103,59 dan NTUP mencapai 106,95. Dikatakan Syahrul, ini menandakan
bahwa kebijakan pemerintah dalam rangka mensejahterakan petani telah
berhasil dan menunjukkan arah yang benar.</span></div>
<div align="justify"><span xss="removed"><br>
</span></div>
<div align="justify"><span xss="removed">"Nilai tukar petani semakin
tinggi, artinya semakin besar pendapatan petani. Kita juga ingin NTUP
naik, karena ini terkait usaha petani. Dua indikator ini, menunjukkan
bahwa kebijakan kita dalam mensejahterakan petani berjalan dengan baik,"
ujar Syahrul.</span></div>
<div align="justify"><span xss="removed"><br>
</span></div>
<div align="justify"><span xss="removed">Pada kesempatan itu, Syahrul juga
menyampaikan apresiasi dan penghargaan setinggi-tingginya kepada seluruh
petani, nelayan, dan pelaku usaha pertanian yang terus bekerja keras
memberikan yang terbaik bagi bangsa dan negara. Ia menilai, di tengah
pandemi Covid-19 saat ini petani tetap bekerja keras memberikan
kontribusi besar bagi perekonomian bangsa.</span></div>
<div align="justify"><span xss="removed"><br>
</span></div>
<div align="justify"><span xss="removed">"Saya mengucapkan terima kasih
kepada seluruh petani dan pelaku usaha pertanian yang terus berupaya
membangun Indonesia. Dengan kerja keras dan kegigihan, kita yakin
pembangunan pertanian akan semakin tangguh dan sejahtera," katanya.</span></div>
<div align="justify"><span xss="removed"><br>
</span></div>
<div align="justify"><span xss="removed">Lebih lanjut, Syahrul berharap
petani dan pelaku usaha pertanian akan terus semangat bekerja keras,
berinovasi, dan meningkatkan produktivitasnya. Ia pun mengajak seluruh
elemen bangsa untuk terus bersatu padu dan bekerja sama dalam memajukan
pembangunan pertanian.</span></div>
<div align="justify"><span xss="removed"><br>
</span></div>
<div align="justify"><span xss="removed">"Mari kita perkuat semangat
persatuan dan kesatuan, semangat gotong royong, serta semangat kerja
keras bersama dalam membangun pertanian Indonesia yang maju dan
sejahtera," pungkasnya.</span></div>',
                'file_berita' => '',
                'file_foto' => 'mentan_pahlawan.jpg',
                'status_berita' => 0, // publish
                'owner_berita' => '0000000000',
            ],
        ];

        foreach ($beritaData as $data) {
            // Cari user - kita akan gunakan user default karena tidak disebutkan di spec.txt
            // Misalnya user dengan id 42 (DHANANG SUSATYO) sebagai default
            $user = User::find(42) ?: User::first(); // Gunakan default user jika DHANANG SUSATYO tidak ada

            // Cari atau buat produsen data berdasarkan pemetaan
            $produsenName = $produsenMapping[$data['owner_berita']] ?? 'KEMENTERIAN PERTANIAN';
            $produsenDataTable = ProdusenDataTable::firstOrCreate(
                ['value' => $produsenName],
                ['value' => $produsenName]
            );

            // Tentukan status berdasarkan status_berita
            $status = ($data['status_berita'] == 1) ? true : false;

            MenuBeritaTable::create([
                'user_id' => $user->id,
                'judul' => $data['judul_berita'],
                'tanggal_rilis' => $data['tgl_berita'],
                'isi_singkat' => $data['isi_singkat_berita'],
                'isi' => $data['isi_berita'],
                'file' => $data['file_berita'],
                'foto' => $data['file_foto'],
                'status' => $status,
                'produsen_data_table_id' => $produsenDataTable->id,
            ]);
        }
    }
}