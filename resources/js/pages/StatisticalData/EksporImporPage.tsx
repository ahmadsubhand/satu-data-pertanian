import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Row, Typography, Table, Statistic, Tag, Button, Divider } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface EksporImporPageProps extends PageProps {
  // Props bisa ditambahkan sesuai kebutuhan data dari backend
}

const EksporImporPage: React.FC<EksporImporPageProps> = () => {
  // Dummy data untuk Ekspor-Impor
  const exportImportData = [
    { id: 1, tahun: 2023, komoditas: 'Buah-buahan', jenis_transaksi: 'Ekspor', volume: '120.50', satuan: 'ribu ton', negara_tujuan: 'China', nilai: 1.25 },
    { id: 2, tahun: 2023, komoditas: 'Hasil Hutan', jenis_transaksi: 'Ekspor', volume: '87.20', satuan: 'ribu ton', negara_tujuan: 'India', nilai: 0.85 },
    { id: 3, tahun: 2023, komoditas: 'Minyak Sawit', jenis_transaksi: 'Ekspor', volume: '21.30', satuan: 'jt ton', negara_tujuan: 'India', nilai: 2.45 },
    { id: 4, tahun: 2023, komoditas: 'Minyak Goreng', jenis_transaksi: 'Impor', volume: '45.60', satuan: 'ribu ton', negara_asal: 'Malaysia', nilai: 0.67 },
    { id: 5, tahun: 2023, komoditas: 'Gandum', jenis_transaksi: 'Impor', volume: '120.00', satuan: 'ribu ton', negara_asal: 'Australia', nilai: 1.35 },
    { id: 6, tahun: 2023, komoditas: 'Daging Sapi', jenis_transaksi: 'Impor', volume: '130.00', satuan: 'ribu ton', negara_asal: 'Brazil', nilai: 1.85 },
    { id: 7, tahun: 2023, komoditas: 'Kedelai Impor', jenis_transaksi: 'Impor', volume: '2.40', satuan: 'jt ton', negara_asal: 'Argentina', nilai: 2.15 },
    { id: 8, tahun: 2023, komoditas: 'CPO', jenis_transaksi: 'Ekspor', volume: '4.50', satuan: 'jt ton', negara_tujuan: 'India', nilai: 5.45 },
  ];

  const countriesData = [
    { id: 1, negara: 'China', nilai_ekspor: '2.8', nilai_impor: '1.2', kategori: 'Top Ekspor' },
    { id: 2, negara: 'India', nilai_ekspor: '2.1', nilai_impor: '0.8', kategori: 'Top Ekspor' },
    { id: 3, negara: 'Japan', nilai_ekspor: '1.5', nilai_impor: '0.5', kategori: 'Ekspor' },
    { id: 4, negara: 'Australia', nilai_ekspor: '0.8', nilai_impor: '1.6', kategori: 'Top Impor' },
    { id: 5, negara: 'Malaysia', nilai_ekspor: '0.5', nilai_impor: '1.3', kategori: 'Impor' },
    { id: 6, negara: 'Thailand', nilai_ekspor: '0.9', nilai_impor: '0.3', kategori: 'Ekspor' },
    { id: 7, negara: 'Brazil', nilai_ekspor: '0.7', nilai_impor: '2.1', kategori: 'Top Impor' },
    { id: 8, negara: 'USA', nilai_ekspor: '1.1', nilai_impor: '0.9', kategori: 'Ekspor' },
  ];

  const columns = [
    {
      title: 'Tahun',
      dataIndex: 'tahun',
      key: 'tahun',
    },
    {
      title: 'Komoditas',
      dataIndex: 'komoditas',
      key: 'komoditas',
    },
    {
      title: 'Jenis Transaksi',
      dataIndex: 'jenis_transaksi',
      key: 'jenis_transaksi',
      render: (jenis: string) => (
        <Tag 
          color={
            jenis.includes('Ekspor') ? 'green' : 
            jenis.includes('Impor') ? 'blue' : 
            'default'
          }
        >
          {jenis}
        </Tag>
      ),
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      render: (text: string, record: any) => `${text} ${record.satuan}`,
    },
    {
      title: 'Nilai (Miliar USD)',
      dataIndex: 'nilai',
      key: 'nilai',
      render: (nilai: number) => `$${nilai.toFixed(2)}`,
    },
    {
      title: 'Negara Tujuan/Asal',
      dataIndex: 'negara_tujuan',
      key: 'negara_info',
      render: (_, record: any) => record.negara_tujuan || record.negara_asal,
    },
  ];

  const countriesColumns = [
    {
      title: 'Negara',
      dataIndex: 'negara',
      key: 'negara',
    },
    {
      title: 'Nilai Ekspor (Miliar USD)',
      dataIndex: 'nilai_ekspor',
      key: 'nilai_ekspor',
      render: (nilai: string) => `$${nilai}`,
    },
    {
      title: 'Nilai Impor (Miliar USD)',
      dataIndex: 'nilai_impor',
      key: 'nilai_impor',
      render: (nilai: string) => `$${nilai}`,
    },
    {
      title: 'Kategori',
      dataIndex: 'kategori',
      key: 'kategori',
      render: (kategori: string) => (
        <Tag 
          color={
            kategori.includes('Top') ? 'gold' : 
            kategori.includes('Ekspor') ? 'green' : 
            'blue'
          }
        >
          {kategori}
        </Tag>
      ),
    },
  ];

  return (
    <PublicLayout title="Data Ekspor-Impor Pertanian - Satudata Pertanian">
      <Head title="Data Ekspor-Impor Pertanian - Satudata Pertanian" />
      
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '20px',
          background: 'linear-gradient(135deg, #a8d5ba 0%, #d0f0e0 100%)',
          borderRadius: '12px',
          animation: 'fadeInUp 1.2s ease-out'
        }}>
          <Title 
            level={1} 
            style={{ 
              color: '#2d5036', 
              marginBottom: '12px',
              fontSize: '28px',
              fontWeight: '700'
            }}
          >
            Data Ekspor-Impor Pertanian
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#495057' }}>
            Informasi komprehensif tentang volume dan nilai ekspor-impor komoditas pertanian Indonesia ke berbagai negara mitra dagang
          </Paragraph>
        </div>

        {/* Stats Overview */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}>
                <Statistic 
                  title="Total Ekspor" 
                  value={15.7} 
                  precision={1}
                  prefix="$"
                  suffix="M"
                  valueStyle={{ color: '#2d5036', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <Statistic 
                  title="Total Impor" 
                  value={12.4} 
                  precision={1}
                  prefix="$"
                  suffix="M"
                  valueStyle={{ color: '#1976d2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <Statistic 
                  title="Komoditas Utama" 
                  value={32} 
                  suffix="jenis"
                  valueStyle={{ color: '#ef6c00', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#f3e5f5' }}>
                <Statistic 
                  title="Negara Mitra" 
                  value={24} 
                  suffix="negara"
                  valueStyle={{ color: '#7b1fa2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Main Data Table */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Data Detil Ekspor-Impor</Title>
          <Table 
            columns={columns} 
            dataSource={exportImportData} 
            rowKey="id"
            pagination={{ 
              pageSize: 10, 
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} entri`
            }}
          />
        </Card>

        {/* Countries Overview Section */}
        <div style={{ marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Negara Tujuan & Asal Utama</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🇨🇳</div>
                <Title level={4} style={{ color: '#2d5036' }}>Top Ekspor: China</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#1b5e20' }}>$3.2M</Paragraph>
                <Paragraph type="secondary">Buah-buahan, Sayuran</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🇮🇳</div>
                <Title level={4} style={{ color: '#2d5036' }}>Top Ekspor: India</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#0d47a1' }}>$2.8M</Paragraph>
                <Paragraph type="secondary">CPO, Hasil Hutan</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🇦🇺</div>
                <Title level={4} style={{ color: '#2d5036' }}>Top Impor: Australia</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#e65100' }}>$1.85M</Paragraph>
                <Paragraph type="secondary">Gandum, Daging</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Countries Data Table */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Data Berdasarkan Negara Mitra</Title>
          <Table 
            columns={countriesColumns} 
            dataSource={countriesData} 
            rowKey="id"
            pagination={{ 
              pageSize: 8,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} negara`
            }}
          />
        </Card>

        {/* Information Section */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Definisi Ekspor-Impor</Title>
                <Paragraph>
                  Data ekspor-impor komoditas pertanian mencakup volume dan nilai barang-barang 
                  pertanian yang dikirim keluar negeri (ekspor) dan barang-barang pertanian 
                  yang diimpor dari luar negeri (impor) ke Indonesia.
                </Paragraph>
                <Paragraph>
                  Data ini dikumpulkan secara berkala dan divalidasi untuk memastikan keakuratan dan keandalan informasi.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Manfaat Data</Title>
                <Paragraph>
                  Data ini sangat berguna untuk:
                </Paragraph>
                <ul>
                  <li>Menganalisis posisi Indonesia dalam perdagangan internasional sektor pertanian</li>
                  <li>Mengevaluasi kebijakan perdagangan pertanian</li>
                  <li>Merancang strategi pengembangan ekspor produk pertanian Indonesia</li>
                  <li>Memahami pola perdagangan pertanian dengan negara-negara mitra</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </div>

        {/* CTA Section */}
        <div style={{ 
          textAlign: 'center', 
          padding: '30px', 
          background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)', 
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '16px' }}>Akses Data Lengkap</Title>
          <Paragraph style={{ color: '#495057', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Dapatkan dataset lengkap ekspor-impor komoditas pertanian beserta data historis untuk analisis mendalam tentang perdagangan pertanian Indonesia.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            style={{ 
              background: '#2d5036', 
              borderColor: '#2d5036',
              fontSize: '16px',
              padding: '0 30px'
            }}
          >
            Unduh Semua Data Ekspor-Impor
          </Button>
        </div>
        
        <style>{`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .ant-card-hoverable:hover {
            transform: translateY(-5px);
            transition: all 0.3s ease;
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          }
        `}</style>
      </div>
    </PublicLayout>
  );
};

export default EksporImporPage;