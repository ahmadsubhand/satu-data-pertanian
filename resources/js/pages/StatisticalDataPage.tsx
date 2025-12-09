import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Row, Typography, Table, Statistic, Tag, Button, Divider } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface StatisticalDataPageProps extends PageProps {
  // Props bisa ditambahkan sesuai kebutuhan data dari backend
}

const StatisticalDataPage: React.FC<StatisticalDataPageProps> = () => {
  // Dummy data untuk berbagai jenis data statistik
  const statisticalData = [
    { id: 1, tahun: 2023, komoditas: 'Padi', produksi: '55.20', satuan: 'jt ton', wilayah: 'Nasional' },
    { id: 2, tahun: 2023, komoditas: 'Jagung', produksi: '22.80', satuan: 'jt ton', wilayah: 'Nasional' },
    { id: 3, tahun: 2023, komoditas: 'Kedelai', produksi: '3.40', satuan: 'jt ton', wilayah: 'Nasional' },
    { id: 4, tahun: 2023, komoditas: 'Cabai', produksi: '2.90', satuan: 'jt ton', wilayah: 'Nasional' },
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
      title: 'Produksi',
      dataIndex: 'produksi',
      key: 'produksi',
      render: (text: string, record: any) => `${text} ${record.satuan}`,
    },
    {
      title: 'Wilayah',
      dataIndex: 'wilayah',
      key: 'wilayah',
    },
  ];

  return (
    <PublicLayout title="Data Statistik Pertanian - Satu Data Pertanian">
      <Head title="Data Statistik Pertanian - Satu Data Pertanian" />
      
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '20px',
          background: 'linear-gradient(135deg, #a8d5ba 0%, #e8f5e9 100%)',
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
            Data Statistik Pertanian
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#495057' }}>
            Kumpulan data statistik sektor pertanian yang mencakup berbagai indikator penting untuk mendukung 
            analisis dan pengambilan keputusan di bidang pertanian
          </Paragraph>
        </div>

        {/* Stats Overview */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}>
                <Statistic 
                  title="Dataset Tersedia" 
                  value={120}
                  suffix="dataset"
                  valueStyle={{ color: '#2d5036', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <Statistic 
                  title="Provinsi Terdata" 
                  value={34}
                  suffix="provinsi"
                  valueStyle={{ color: '#1976d2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <Statistic 
                  title="Tahun Data" 
                  value={15}
                  suffix="tahun"
                  valueStyle={{ color: '#ef6c00', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#f3e5f5' }}>
                <Statistic 
                  title="Kategori Data" 
                  value={8}
                  suffix="kategori"
                  valueStyle={{ color: '#7b1fa2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Data Table */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Data Produksi Tanaman Pangan Utama</Title>
          <Table 
            columns={columns} 
            dataSource={statisticalData} 
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: true }}
          />
        </Card>

        {/* Information Section */}
        <div style={{ marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Tentang Data Statistik Pertanian</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Metodologi Pengumpulan Data</Title>
                <Paragraph>
                  Data statistik pertanian dikumpulkan melalui berbagai metode survei dan sensus yang dilakukan oleh Badan Pusat Statistik (BPS) 
                  dan Kementerian Pertanian. Metodologi yang digunakan mengacu pada standar internasional untuk memastikan konsistensi dan komparabilitas data.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Frekuensi Pembaruan</Title>
                <Paragraph>
                  Data statistik pertanian diperbarui secara berkala sesuai dengan siklus pelaporan yang ditentukan. Sebagian besar data tersedia bulanan, 
                  triwulanan, atau tahunan tergantung pada jenis dan sifat data yang bersangkutan.
                </Paragraph>
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
          <Title level={3} style={{ color: '#2d5036', marginBottom: '16px' }}>Temukan Data yang Anda Butuhkan</Title>
          <Paragraph style={{ color: '#495057', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Jelajahi lebih banyak dataset statistik pertanian yang tersedia di portal Satu Data Pertanian untuk mendukung penelitian, analisis, dan pengambilan keputusan Anda.
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
            Jelajahi Semua Data Statistik
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default StatisticalDataPage;