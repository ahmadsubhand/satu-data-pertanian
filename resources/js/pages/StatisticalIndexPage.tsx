import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Row, Typography, Table, Tag, Button, Statistic, Divider } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface StatisticalIndexPageProps extends PageProps {
  // Props bisa ditambahkan sesuai kebutuhan data dari backend
}

const StatisticalIndexPage: React.FC<StatisticalIndexPageProps> = () => {
  // Dummy data untuk statistik data
  const statisticalDataItems = [
    { id: 1, nama_dataset: 'Statistik Produksi Padi', tahun: 2023, objek_data: 'Produksi Padi per Provinsi', variabel: 'Jumlah Produksi, Luas Panen', status: 'Aktif', produsen_data: 'BPS' },
    { id: 2, nama_dataset: 'Statistik Ekspor-Impor Pertanian', tahun: 2023, objek_data: 'Data Ekspor-Impor Berbagai Komoditas', variabel: 'Volume, Nilai, Negara Tujuan/Asal', status: 'Aktif', produsen_data: 'Kemendag' },
    { id: 3, nama_dataset: 'Statistik Harga Komoditas Pertanian', tahun: 2023, objek_data: 'Harga Gabah, Beras, dan Komoditas Lainnya', variabel: 'Harga di Tingkat Petani dan Konsumen', status: 'Aktif', produsen_data: 'Kementan' },
    { id: 4, nama_dataset: 'Statistik Luas Panen Tanaman Pangan', tahun: 2023, objek_data: 'Luas Panen Berbagai Jenis Tanaman', variabel: 'Luas Panen, Jenis Tanaman, Lokasi', status: 'Aktif', produsen_data: 'Kementan' },
    { id: 5, nama_dataset: 'Statistik Nilai Tukar Petani', tahun: 2023, objek_data: 'NTP berdasarkan Provinsi dan Subsektor', variabel: 'IHP, IHB, dan Indeks Harga', status: 'Aktif', produsen_data: 'BPS' },
    { id: 6, nama_dataset: 'Statistik Pendapatan Petani', tahun: 2023, objek_data: 'Pendapatan Petani berdasarkan Komoditas', variabel: 'Pendapatan, Biaya Produksi, Lokasi', status: 'Aktif', produsen_data: 'Kementan' },
  ];

  const columns = [
    {
      title: 'Nama Dataset',
      dataIndex: 'nama_dataset',
      key: 'nama_dataset',
      render: (text: string, record: any) => <a href={`/statistical-data/${record.id}`}>{text}</a>,
    },
    {
      title: 'Tahun',
      dataIndex: 'tahun',
      key: 'tahun',
    },
    {
      title: 'Objek Data',
      dataIndex: 'objek_data',
      key: 'objek_data',
    },
    {
      title: 'Produsen Data',
      dataIndex: 'produsen_data',
      key: 'produsen_data',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Aktif' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
  ];

  return (
    <PublicLayout title="Data Statistik - Satu Data Pertanian">
      <Head title="Data Statistik - Satu Data Pertanian" />
      
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
            Data Statistik Pertanian
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#495057' }}>
            Koleksi lengkap data statistik sektor pertanian yang mencakup berbagai aspek produksi, distribusi, dan konsumsi hasil pertanian di seluruh wilayah Indonesia
          </Paragraph>
        </div>

        {/* Stats Overview */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}>
                <Statistic 
                  title="Dataset Tersedia" 
                  value={statisticalDataItems.length} 
                  suffix="dataset"
                  valueStyle={{ color: '#2d5036', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <Statistic 
                  title="Dataset Aktif" 
                  value={statisticalDataItems.filter(item => item.status === 'Aktif').length} 
                  suffix="dataset"
                  valueStyle={{ color: '#1976d2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <Statistic 
                  title="Tahun Data" 
                  value={2023} 
                  suffix="terbaru"
                  valueStyle={{ color: '#ef6c00', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#f3e5f5' }}>
                <Statistic 
                  title="Produsen Data" 
                  value={4} 
                  suffix="instansi"
                  valueStyle={{ color: '#7b1fa2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Main Data Table */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Dataset Statistik Tersedia</Title>
          <Table 
            columns={columns} 
            dataSource={statisticalDataItems} 
            rowKey="id"
            pagination={{ 
              pageSize: 10, 
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} dataset`
            }}
          />
        </Card>

        {/* Categories Section */}
        <div style={{ marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Kategori Data Statistik</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card 
                hoverable
                style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}
                onClick={() => window.location.href = '/statistical-data/production'}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌾</div>
                <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>Produksi</Title>
                <Paragraph type="secondary">Data produksi komoditas pertanian</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card 
                hoverable
                style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}
                onClick={() => window.location.href = '/statistical-data/trade'}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>↔️</div>
                <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>Ekspor/Impor</Title>
                <Paragraph type="secondary">Data ekspor-impor pertanian</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card 
                hoverable
                style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}
                onClick={() => window.location.href = '/statistical-data/prices'}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>💰</div>
                <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>Harga</Title>
                <Paragraph type="secondary">Data harga komoditas pertanian</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              <Card 
                hoverable
                style={{ textAlign: 'center', height: '100%', background: '#f3e5f5' }}
                onClick={() => window.location.href = '/statistical-data/ntp'}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>📊</div>
                <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>Nilai Tukar</Title>
                <Paragraph type="secondary">Data NTP dan komponennya</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Information Section */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Tentang Data Statistik</Title>
                <Paragraph>
                  Data statistik pertanian mencakup berbagai aspek produksi, perdagangan, harga, 
                  dan faktor-faktor lain yang berkaitan dengan sektor pertanian di Indonesia. 
                  Data ini dikumpulkan secara berkala oleh berbagai instansi pemerintah terkait.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Manfaat Data Statistik</Title>
                <Paragraph>
                  Data statistik pertanian sangat penting untuk mendukung perencanaan pembangunan, 
                  pengambilan keputusan, penelitian, dan analisis pasar yang berbasis data yang akurat dan terpercaya.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Popular Datasets */}
        <div>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Dataset Populer</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>🌾</div>
                <Title level={4} style={{ color: '#2d5036', fontSize: '16px' }}>Statistik Produksi Padi</Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>↔️</div>
                <Title level={4} style={{ color: '#2d5036', fontSize: '16px' }}>Statistik Ekspor-Impor</Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>💰</div>
                <Title level={4} style={{ color: '#2d5036', fontSize: '16px' }}>Statistik Harga Komoditas</Title>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </PublicLayout>
  );
};

export default StatisticalIndexPage;