import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Row, Typography, Table, Tag, Button, Divider } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface ExportImportPageProps extends PageProps {
  // Props bisa ditambahkan sesuai kebutuhan data dari backend
}

const ExportImportPage: React.FC<ExportImportPageProps> = () => {
  // Dummy data untuk ekspor-impor
  const exportImportData = [
    { id: 1, tahun: 2023, komoditas: 'Buah-buahan', jenis_transaksi: 'Ekspor', volume: '120.50', satuan: 'ribu ton', negara_tujuan: 'China', nilai: '1.25' },
    { id: 2, tahun: 2023, komoditas: 'Hasil Hutan', jenis_transaksi: 'Ekspor', volume: '87.20', satuan: 'ribu ton', negara_tujuan: 'India', nilai: '0.85' },
    { id: 3, tahun: 2023, komoditas: 'Minyak Sawit', jenis_transaksi: 'Ekspor', volume: '21.30', satuan: 'jt ton', negara_tujuan: 'India', nilai: '2.45' },
    { id: 4, tahun: 2023, komoditas: 'Minyak Goreng', jenis_transaksi: 'Impor', volume: '45.60', satuan: 'ribu ton', negara_asal: 'Malaysia', nilai: '0.67' },
    { id: 5, tahun: 2023, komoditas: 'Gandum', jenis_transaksi: 'Impor', volume: '120.00', satuan: 'ribu ton', negara_asal: 'Australia', nilai: '1.35' },
    { id: 6, tahun: 2023, komoditas: 'Daging Sapi', jenis_transaksi: 'Impor', volume: '130.00', satuan: 'ribu ton', negara_asal: 'Brazil', nilai: '1.85' },
    { id: 7, tahun: 2023, komoditas: 'Kedelai Impor', jenis_transaksi: 'Impor', volume: '2.40', satuan: 'jt ton', negara_asal: 'Argentina', nilai: '2.15' },
    { id: 8, tahun: 2023, komoditas: 'CPO', jenis_transaksi: 'Ekspor', volume: '4.50', satuan: 'jt ton', negara_tujuan: 'India', nilai: '5.45' },
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
        <Tag color={jenis === 'Ekspor' ? 'green' : 'blue'}>
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
      render: (nilai: string) => `$${nilai}`,
    },
    {
      title: 'Negara Tujuan/Asal',
      dataIndex: 'negara_tujuan',
      key: 'negara_info',
      render: (_: any, record: any) => record.negara_tujuan || record.negara_asal,
    },
  ];

  return (
    <PublicLayout title="Data Ekspor-Impor Pertanian - Satu Data Pertanian">
      <Head title="Data Ekspor-Impor Pertanian - Satu Data Pertanian" />
      
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '20px',
          background: 'linear-gradient(135deg, #a8d5ba 0%, #d0f0e0 100%)',
          borderRadius: '12px'
        }}>
          <Title 
            level={1} 
            style={{ 
              color: '#2d5036', 
              marginBottom: '12px',
              fontSize: '28px'
            }}
          >
            Data Ekspor dan Impor Pertanian
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#495057' }}>
            Informasi komprehensif tentang volume dan nilai ekspor-impor komoditas pertanian Indonesia ke berbagai negara mitra dagang
          </Paragraph>
        </div>

        {/* Stats Overview */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', background: '#e8f5e9' }}>
                <Title level={3} style={{ color: '#2d5036' }}>Total Ekspor</Title>
                <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', color: '#1b5e20' }}>$15.7M</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', background: '#e3f2fd' }}>
                <Title level={3} style={{ color: '#2d5036' }}>Total Impor</Title>
                <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', color: '#0d47a1' }}>$12.4M</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', background: '#fff3e0' }}>
                <Title level={3} style={{ color: '#2d5036' }}>Komoditas Utama</Title>
                <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', color: '#e65100' }}>32 Jenis</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', background: '#f3e5f5' }}>
                <Title level={3} style={{ color: '#2d5036' }}>Negara Mitra</Title>
                <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', color: '#4a148c' }}>24 Negara</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Table Section */}
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

        {/* Description Section */}
        <div style={{ marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Deskripsi Data</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Metodologi Pengumpulan Data</Title>
                <Paragraph>
                  Data ekspor-impor komoditas pertanian dikumpulkan dari berbagai instansi terkait seperti 
                  Direktorat Jenderal Perdagangan Luar Negeri Kementerian Perdagangan, 
                  Badan Pusat Statistik (BPS), dan Bea Cukai.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Frekuensi Pembaruan</Title>
                <Paragraph>
                  Data ekspor-impor disediakan secara bulanan berdasarkan laporan perdagangan resmi 
                  pemerintah. Data tahunan juga tersedia sebagai ringkasan tahunan untuk masing-masing komoditas.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Countries Overview Section */}
        <div style={{ marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Negara Tujuan & Asal Utama</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Top Ekspor: China</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#1b5e20' }}>$3.2M</Paragraph>
                <Paragraph type="secondary">Buah-buahan, Sayuran</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Top Ekspor: India</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#0d47a1' }}>$2.8M</Paragraph>
                <Paragraph type="secondary">CPO, Hasil Hutan</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Top Impor: Australia</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#e65100' }}>$1.85M</Paragraph>
                <Paragraph type="secondary">Gandum, Daging</Paragraph>
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
          <Title level={3} style={{ color: '#2d5036', marginBottom: '16px' }}>Butuh Data Lainnya?</Title>
          <Paragraph style={{ color: '#495057', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Jelajahi lebih banyak dataset ekspor-impor pertanian yang tersedia di portal Satu Data Pertanian untuk mendukung analisis perdagangan Anda.
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
      </div>
    </PublicLayout>
  );
};

export default ExportImportPage;