<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\MenuMultimediaTable;

class MenuMultimediaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seedData = [
            [
                'user_id' => 42,
                'judul' => 'Swasembada Beras Kado Indah Kemerdekaan RI ke-77, Jakarta, 14 Agustus 2022',
                'keterangan' => '<span dir="auto" style="" class="style-scope yt-formatted-string">HUT RI tahun ini sangat istimewa karena IRRI atau International Rice Research Institute, sebuah Lembaga penelitian padi terpercaya di tingkat internasional menyerahkan secara langsung Certificate of Aknowledgement kepada Presiden RI Joko Widodo di Istana Merdeka.

Sertifikat itu diberikan atas keberhasilan Indonesia dalam swasembada beras pada tahun 2019-2021. IRRI menyebutkan keberhasilan Indonesia mencapai swasembada beras karena sukses membangun sistem pertanian dan pangan, serta mengimplementasikan teknologi dan inovasi beras.&nbsp;Ini adalah kado indah HUT RI ke-77. Selamat.</span>',
                'link_video' => 'https://www.youtube.com/watch?v=X-X_fhKFvbA',
                'tanggal_rilis' => '2022-08-17',
                'file' => 'swasembada_beras_kado_77.jpg',
                'status' => true
            ],
            [
                'user_id' => 42,
                'judul' => 'Presiden : Terima Kasih Petani dan Pak Menteri, Pertanian Terus Berproduksi, Medan, 7 Juli 2022',
                'keterangan' => '<p><span dir="auto" style="" class="style-scope yt-formatted-string">Presiden Joko Widodo menyampaikan apresiasi kepada para petani Indonesia atas kontribusinya dalam menjaga ketersediaan pangan nasional. Hal itu disampaikan Presiden Ketika menyampaikan arahan pada Puncak Peringatan Hari Keluarga Nasional Ke-29 Tahun 2022, di Medan, 7 Juli 2022.</span></p>',
                'link_video' => 'https://www.youtube.com/watch?v=MweLaHBYrgw',
                'tanggal_rilis' => '2022-07-07',
                'file' => 'Screenshot_106.png',
                'status' => true
            ],
            [
                'user_id' => 42,
                'judul' => 'Presiden Jokowi Dan Mentan Tanam Kelapa Genjah di Boyolali Dan Sukoharjo - Jawa Tengah,  19 Agustus 2022',
                'keterangan' => '<p>Presiden Jokowi Dan Mentan Tanam Kelapa Genjah di Boyolali Dan Sukoharjo<br></p>',
                'link_video' => 'https://www.youtube.com/watch?v=P2T-p-Lse04',
                'tanggal_rilis' => '2022-08-18',
                'file' => 'Kelapa_Genjah_1.jpg',
                'status' => true
            ],
            [
                'user_id' => 42,
                'judul' => 'Peternak Muda Lulusan S2 dan Pernah Sekolah Di Australia Sukses Ternak Domba Kualitas Industri',
                'keterangan' => '<p><span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap" role="text"><span class="yt-core-attributed-string--link-inherit-color" style="color: rgb(19, 19, 19);">Siapa bilang menjadi peternak domba tidak menghasilkan dan menjanjikan? Peternak milenial Suseno Bayu Wibowo asal Pemalang, Jawa Tengah ini berhasil membuktikannya.

Berbekal ilmu pengetahuan yang ia dapatkan dari pendidikan S2 di Universitas Diponegoro Semarang dan Pendidikan di Australia, Suseno berhasil di usaha budidaya penggemukan kambing domba yang berkualitas dan bernilai ekonomi tinggi.

Memulai usaha pada tahun 2014 dengan hanya berbekal 4 ekor kambing, kini melalui brand Jambul Domba, Suseno yang juga Young Ambassador Agriculture 2023 ini berhasil budidaya penggemukan domba mencapai 1000 ekor dengan pakan sentrat organik.</span></span></p>',
                'link_video' => 'https://www.youtube.com/watch?v=oqpDKXO47ic',
                'tanggal_rilis' => '2023-09-20',
                'file' => 'Cuplikan_layar_2023-09-20_142454.png',
                'status' => true
            ],
            [
                'user_id' => 42,
                'judul' => 'Bunex 2023 Dorong Hilirisasi Perkebunan Sebagai Kekuatan Ekonomi',
                'keterangan' => '<p><span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap"><span class="yt-core-attributed-string--link-inherit-color" style="color: rgb(19, 19, 19);">Menteri Pertanian Syahrul Yasin Limpo (Mentan SYL) mendorong para pelaku usaha untuk memperkuat hilirisasi perkebunan sebagai kekuatan ekonomi masa depan bangsa. Menurut SYL, hilirisasi adalah icon baru dalam meningkatkan pendapatan masyarakat Indonesia.</span></span></p>',
                'link_video' => 'https://www.youtube.com/watch?v=n1UY15SJ-rc',
                'tanggal_rilis' => '2023-09-19',
                'file' => 'Cuplikan_layar_2023-09-20_142847.png',
                'status' => true
            ],
            [
                'user_id' => 42,
                'judul' => 'Pertanian Terus Melaju Untuk Indonesia Maju',
                'keterangan' => '<p>Pertanian Terus Melaju Untuk Indonesia Maju<br></p>',
                'link_video' => 'https://www.youtube.com/watch?v=Ttug-Y_v3vo',
                'tanggal_rilis' => '2023-09-18',
                'file' => 'Cuplikan_layar_2023-09-20_143320.png',
                'status' => true
            ],
            [
                'user_id' => 42,
                'judul' => 'Lereng Gunung Rinjani, Penyangga Bawang Putih Nasional',
                'keterangan' => '<p>Lereng Gunung Rinjani, Penyangga Bawang Putih Nasional<br></p>',
                'link_video' => 'https://www.youtube.com/watch?v=L-FEgfggAos',
                'tanggal_rilis' => '2023-08-17',
                'file' => 'bawang_putih_rinjani.png',
                'status' => true
            ],
            [
                'user_id' => 42,
                'judul' => 'Peternakan Kambing Domba Berkonsep One Stop Shopping One Stop Learning',
                'keterangan' => '<p align="justify"><span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap"><span class="yt-core-attributed-string--link-inherit-color" style="color: rgb(19, 19, 19);">KISAH SUKSES PETERNAK SLEMAN BANGUN KONSEP ONE STOP SHOPPING, ONE STOP LEARNING DI PETERNAKAN DOMBA KAMBING

Usaha peternakan dan penggemukan domba kambing yang semula hanya dipasarkan untuk memenuhi permintaan kurban kini sudah memiliki pasar yang lebih luas. Inilah yang ditangkap oleh Taufik Mawaddani, peternak asal Desa Umbulharjo, Kecamatan Cangkringan, Kabupaten Sleman untuk membuat usaha peternakan domba dan kambing.</span></span></p>',
                'link_video' => 'https://www.youtube.com/watch?v=w_u4MwCm-X4',
                'tanggal_rilis' => '2023-11-06',
                'file' => 'Peternakan_Kambing_Domba.png',
                'status' => false
            ],
            [
                'user_id' => 42,
                'judul' => 'Olah Daun Pegagan Menjadi Produk Cokelat Bernilai Ekonomi',
                'keterangan' => '<p>KISAH TANI SUKSES OLAH DAUN PEGAGAN MENJADI PRODUK COKELAT BERNILAI EKONOMI<br>Ketekunan Dwi Martuti Rahayu, petani asal Kabupaten Kulon Progo, DI Yogyakarta berinovasi dalam mengolah daun pegagan membuahkan hasil. <br>Bersama KWT Pawon Gendis di Dusun Salakmalang, Dwi berhasil mengolah daun pegagan dengan biji kakao menjadi produk coklat bernama Won.dis Coklat yang bernilai ekonomi.<br>Kerja keras Dwi berhasil membawa dampak positif melalui pemberdayaan para petani wanita yang tergabung dalam KWT Pawon Gendis di Kulon Progo.<br><br></p>',
                'link_video' => 'https://www.youtube.com/watch?v=Bla0te5adGI',
                'tanggal_rilis' => '2023-11-13',
                'file' => 'Olah_Daun_Pegagan.png',
                'status' => false
            ],
            [
                'user_id' => 42,
                'judul' => 'Ubah Hobi Budidaya Kaktus Menjadi Cuan',
                'keterangan' => '<p align="justify"><span class="yt-core-attributed-string yt-core-attributed-string--white-space-pre-wrap" role="text"><span class="yt-core-attributed-string--link-inherit-color" style="color: rgb(19, 19, 19);">Siapa bilang hobi di bidang pertanian tidak bisa diubah menjadi pekerjaan yang menghasilkan cuan. Ini berhasil dibuktikan Isnaini Baroroh, warga Kebonan, Sumberadi, Mlati yang mengubah hobi budidaya kaktus menjadi usaha yang bernilai ekonomi tinggi.

Isnaini memulai hobi budidaya kaktus tersebut usai memutuskan resign sebagai karyawan bank konvensional tahun 2018 silam. Hingga hobinya berlanjut ke arah serius dengan membuat sebuah usaha bernama Ardana Garden.

Melalui hobi budidaya kaktusnya tersebut, Isnaini kini berhasil meraih omzet puluhan juta rupiah dalam waktu satu bulan.</span></span></p>',
                'link_video' => 'https://www.youtube.com/watch?v=VdLEMLp1IKo',
                'tanggal_rilis' => '2023-11-17',
                'file' => 'Ubah_Hobi_Budidaya.png',
                'status' => false
            ],
            [
                'user_id' => 42,
                'judul' => ' Profile Kementerian Pertanian dalam implementasi ASN BerAKHLAK #banggamelayanibangsa',
                'keterangan' => '<p>Profile Kementerian Pertanian dalam implementasi ASN BerAKHLAK<br></p>',
                'link_video' => 'https://www.youtube.com/watch?v=j3bsZGQm-HU',
                'tanggal_rilis' => '2023-11-17',
                'file' => 'ASN_Berkahlak.png',
                'status' => false
            ],
            [
                'user_id' => 42,
                'judul' => 'Pulang Dari Ibukota Ke Desa, Bangun Integrated Farming System',
                'keterangan' => '<p align="justify">Memutuskan resign dari pekerjaannya di Ibu Kota, Mohammad Rosul, petani asal Sleman, Yogyakarta ini langsung menangkap peluang usaha di bidang peternakan ketika pulang ke kampung halaman.<br>Melalui usaha di dunia pertanian dengan brand Amar Farm, Rosul memulai karier sebagai peternak bebek petelur untuk memenuhi kebutuhan telur bebek di DIY Yogyakarta di tahun 2019.<br>Ketekunan Rosul membangun Amar Farm menjadi pertanian yang terintegrasi membuahkan hasil. Tak hanya bebek petelur, Rosul membawa Amar Farm menjadi usaha perkebunan melon kimoji dan domba breeding yang bernilai ekonomi tinggi.<br></p>',
                'link_video' => 'https://www.youtube.com/watch?v=unuoAH2VNig',
                'tanggal_rilis' => '2023-11-20',
                'file' => 'Integrated_Farming.png',
                'status' => false
            ],
            [
                'user_id' => 42,
                'judul' => 'Pemenuhan Prinsip SDI untuk Data Prioritas 2023 dan Kode Refrensi Komoditas Pertanian, 5 Mei 2023',
                'keterangan' => '<p>Pemenuhan Prinsip SDI untuk Data Prioritas 2023 dan Kode Refrensi Komoditas Pertanian, 5 Mei 2023<br></p>',
                'link_video' => null,
                'tanggal_rilis' => '2023-05-05',
                'file' => 'SDI1.png',
                'status' => false
            ],
            [
                'user_id' => 42,
                'judul' => 'Pembahasan Data Prioritas 2023 dan Pembahasan Kode Referensi Komoditas Binaan Pertanian, 14 Maret 2023',
                'keterangan' => '<p>Pembahasan Data Prioritas 2023 dan Pembahasan Kode Referensi Komoditas Binaan Pertanian, 14 Maret 2023<br></p>',
                'link_video' => null,
                'tanggal_rilis' => '2023-03-14',
                'file' => 'SDI2.png',
                'status' => true
            ],
            [
                'user_id' => 42,
                'judul' => 'Interoperabilitas Data Melalui Aplikasi Sistem Penghubung Layanan Pemerintah (SPLP) Kominfo, 4 Agustus 2023',
                'keterangan' => '<p>Interoperabilitas Data Melalui Aplikasi Sistem Penghubung Layanan Pemerintah (SPLP) Kominfo<br></p>',
                'link_video' => null,
                'tanggal_rilis' => '2023-08-04',
                'file' => 'SDI3.png',
                'status' => true
            ],
            [
                'user_id' => 42,
                'judul' => 'Pemenuhan Prinsip SDI Data Spasial serta Data Statistik dan Penyepakatan Berbagi Data Kementan dengan Pemerintah Provinsi Jawa Barat, 27 Juni 2023',
                'keterangan' => '<p>Pemenuhan Prinsip SDI Data Spasial serta Data Statistik dan Penyepakatan Berbagi Data Kementan dengan Pemerintah Provinsi Jawa Barat, 27 Juni 2023<br></p>',
                'link_video' => null,
                'tanggal_rilis' => '2023-06-27',
                'file' => 'SDI4.png',
                'status' => true
            ],
            [
                'user_id' => 42,
                'judul' => 'Kegiatan Drone Filming & Ground Survey Lahan Tebu',
                'keterangan' => '<p>Kegiatan Drone Filming &amp; Ground Survey Lahan Tebu<br></p>',
                'link_video' => 'https://www.youtube.com/watch?v=f1HNeoCOt5s',
                'tanggal_rilis' => '2024-06-22',
                'file' => 'Foto_Kegiatan_Drone_Filming.png',
                'status' => true
            ]
        ];

        foreach ($seedData as $data) {
            MenuMultimediaTable::create($data);
        }
    }
}