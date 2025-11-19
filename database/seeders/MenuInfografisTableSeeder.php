<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MenuInfografisTable;
use App\Models\User;
use App\Models\ProdusenDataTable;

class MenuInfografisTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Pemetaan dari owner_info ke nama produsen (mengikuti struktur dari MenuBeritaTableSeeder)
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
        $infografisData = [
            [
                'id' => 353,
                'judul_info' => '6 Manfaat Jambu Biji Merah',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>6 Manfaat Jambu Biji Merah<br></p>',
                'file_info' => '320254208_6461654537185195_2814392642508186206_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 354,
                'judul_info' => '6 Manfaat Buah Kesemek',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>6 Manfaat Buah Kesemek<br></p>',
                'file_info' => '320443278_5973670349321922_1030482758878742240_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 355,
                'judul_info' => '7 Manfaat Teh Hijau untuk Kesehatan',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>7 Manfaat Teh Hijau untuk Kesehatan<br></p>',
                'file_info' => '320006521_848897363051301_1706670303646263564_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 356,
                'judul_info' => '#TANIPEDIA Brooder',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>#TANIPEDIA Brooder<br></p>',
                'file_info' => '320073213_547773553923823_1761255977136705160_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 357,
                'judul_info' => 'Ragam Manfaat Buah Raspberry',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>Ragam Manfaat Buah Raspberry<br></p>',
                'file_info' => '322546716_1482182948857816_6780039801059506194_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 358,
                'judul_info' => '#TANIPEDIA Combine Harvester',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>#TANIPEDIA Combine Harvester<br></p>',
                'file_info' => '170576753_2945950782355252_8303003888258854919_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 361,
                'judul_info' => '7 Manfaat Buah Srikaya Untuk Kesehatan',
                'tgl_info' => '2024-06-22',
                'ket_info' => '7 Manfaat Buah Srikaya Untuk Kesehatan',
                'file_info' => '242244754_3064547293828933_6245711536819592589_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 362,
                'judul_info' => '10 Makanan Dengan Kandungan Vitamin C Tinggi',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>10 Makanan Dengan Kandungan Vitamin C Tinggi<br></p>',
                'file_info' => '224371058_3023932294557100_3891818168537794703_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 363,
                'judul_info' => '10 Manfaat Durian Untuk Kesehatan',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>10 Manfaat Durian Untuk Kesehatan<br></p>',
                'file_info' => '234057546_3033573723592957_1454413961101838615_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 364,
                'judul_info' => 'Petai Si Bau Khas Hasilkan Beragam Manfaat',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>Petai Si Bau Khas Hasilkan Beragam Manfaat<br></p>',
                'file_info' => '236058136_3035381776745485_604168728776728590_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 365,
                'judul_info' => 'Limbah Tanaman Jagung Bisa Dimanfaatkan Sebagai Pakan Ternak',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>Limbah Tanaman Jagung Bisa Dimanfaatkan Sebagai Pakan Ternak<br></p>',
                'file_info' => '321961357_532240968659641_507964409248363896_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 366,
                'judul_info' => 'Ku Kira Lato-Lato Ternyata Terong Hijau',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>Ku Kira Lato-Lato Ternyata Terong Hijau<br></p>',
                'file_info' => '324252023_572621184709141_4198629166946923612_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 367,
                'judul_info' => 'Kenapa Yaa, Kangkung Cocok Ditanam di Musim Hujan?',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>Kenapa Yaa, Kangkung Cocok Ditanam di Musim Hujan?<br></p>',
                'file_info' => '326946804_881247123122087_205800922647877566_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 368,
                'judul_info' => 'Tanaman Hortikultura yang Bisa Ditanam di Rumah',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>Tanaman Hortikultura yang Bisa Ditanam di Rumah<br></p>',
                'file_info' => '325653701_5985342208195997_8780799252689812469_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 369,
                'judul_info' => 'Vertical Garden Solusi Lahan Minimalis',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>Vertical Garden Solusi Lahan Minimalis<br></p>',
                'file_info' => '327819092_888608182283670_6005427349396352476_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 370,
                'judul_info' => 'Sayur Organik atau Non Organik?',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>Sayur Organik atau Non Organik?<br></p>',
                'file_info' => '326143996_1383617052468686_5256292380652137375_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 371,
                'judul_info' => 'Buah Merah (Pandanus Conoideus)',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>Buah Merah (Pandanus Conoideus)<br></p>',
                'file_info' => '340955797_749460870155226_5485785935012030161_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
            [
                'id' => 372,
                'judul_info' => '9 Makanan Tinggi Protein Rendah Kalori',
                'tgl_info' => '2024-06-22',
                'ket_info' => '<p>9 Makanan Tinggi Protein Rendah Kalori<br></p>',
                'file_info' => '222598184_3021593368124326_3103024528529439624_n.jpg',
                'owner_info' => '0000000000',
                'status_info' => 1,
            ],
        ];

        foreach ($infografisData as $data) {
            // Cari user - kita akan gunakan user default karena tidak disebutkan di spec.txt
            // Misalnya user dengan id 42 (DHANANG SUSATYO) sebagai default
            $user = User::find(42) ?: User::first(); // Gunakan default user jika DHANANG SUSATYO tidak ada

            // Cari atau buat produsen data berdasarkan pemetaan
            $produsenName = $produsenMapping[$data['owner_info']] ?? 'KEMENTERIAN PERTANIAN';
            $produsenDataTable = ProdusenDataTable::firstOrCreate(
                ['value' => $produsenName],
                ['value' => $produsenName]
            );

            // Tentukan status berdasarkan status_info
            $status = ($data['status_info'] == 1) ? true : false;

            // Gunakan firstOrCreate untuk mencegah duplikasi data
            MenuInfografisTable::firstOrCreate([
                'judul' => $data['judul_info'],
                'tanggal_rilis' => $data['tgl_info'],
                'keterangan' => $data['ket_info'],
                'file' => $data['file_info'],
                'produsen_data_table_id' => $produsenDataTable->id,
            ], [
                'user_id' => $user->id,
                'status' => $status,
            ]);
        }
    }
}