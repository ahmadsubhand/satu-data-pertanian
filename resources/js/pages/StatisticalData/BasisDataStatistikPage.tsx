import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Row, Typography, Table, Statistic, Tag, Button, Divider } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface BasisDataStatistikPageProps extends PageProps {
  // Props bisa ditambahkan sesuai kebutuhan data dari backend
}

const BasisDataStatistikPage: React.FC<BasisDataStatistikPageProps> = () => {
  // Dummy data untuk Basis Data Statistik
  const statisticalData = [
    { id: 1, tahun: 2023, komoditas: 'Padi', produksi: '55.20', satuan: 'jt ton', wilayah: 'Nasional', status: 'Aktif', frekuensi: 'Tahunan' },
    { id: 2, tahun: 2023, komoditas: 'Jagung', produksi: '22.80', satuan: 'jt ton', wilayah: 'Nasional', status: 'Aktif', frekuensi: 'Tahunan' },
    { id: 3, tahun: 2023, komoditas: 'Kedelai', produksi: '3.40', satuan: 'jt ton', wilayah: 'Nasional', status: 'Aktif', frekuensi: 'Tahunan' },
    { id: 4, tahun: 2023, komoditas: 'Cabai', produksi: '2.90', satuan: 'jt ton', wilayah: 'Nasional', status: 'Aktif', frekuensi: 'Tahunan' },
    { id: 5, tahun: 2023, komoditas: 'Beras', produksi: '32.20', satuan: 'jt ton', wilayah: 'Nasional', status: 'Aktif', frekuensi: 'Tahunan' },
    { id: 6, tahun: 2023, komoditas: 'Ubi Kayu', produksi: '22.30', satuan: 'jt ton', wilayah: 'Nasional', status: 'Aktif', frekuensi: 'Tahunan' },
    { id: 7, tahun: 2023, komoditas: 'Ubi Jalar', produksi: '1.60', satuan: 'jt ton', wilayah: 'Nasional', status: 'Aktif', frekuensi: 'Tahunan' },
    { id: 8, tahun: 2023, komoditas: 'Sagu', produksi: '0.50', satuan: 'jt ton', wilayah: 'Nasional', status: 'Aktif', frekuensi: 'Tahunan' },
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
    {
      title: 'Frekuensi Pembaruan',
      dataIndex: 'frekuensi',
      key: 'frekuensi',
    },
    {
      title: 'Status',
      key: 'status',
      render: (record: any) => (
        <Tag color={record.status === 'Aktif' ? 'green' : 'red'}>
          {record.status}
        </Tag>
      ),
    },
  ];

  return (
    <PublicLayout title="Basis Data Statistik Pertanian - Satu Data Pertanian">
      <Head title="Basis Data Statistik Pertanian - Satu Data Pertanian" />
      
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
              fontSize: '28px',
              fontWeight: '700',
              animation: 'fadeInUp 1.2s ease-out'
            }}
          >
            Basis Data Statistik Pertanian
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#495057' }}>
            Kumpulan data statistik sektor pertanian yang mencakup berbagai aspek produksi, distribusi, 
            dan pengolahan hasil pertanian di seluruh wilayah Indonesia
          </Paragraph>
        </div>

        {/* Stats Overview */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}>
                <Statistic 
                  title="Dataset Tersedia" 
                  value={statisticalData.length} 
                  suffix="dataset"
                  valueStyle={{ color: '#2d5036', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <Statistic 
                  title="Dataset Aktif" 
                  value={statisticalData.filter(item => item.status === 'Aktif').length} 
                  suffix="dataset"
                  valueStyle={{ color: '#1976d2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <Statistic 
                  title="Tahun Data Terbaru" 
                  value={2023} 
                  valueStyle={{ color: '#ef6c00', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#f3e5f5' }}>
                <Statistic 
                  title="Area Cakupan" 
                  value={1} 
                  suffix="nasional"
                  valueStyle={{ color: '#7b1fa2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Main Data Table */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Data Produksi Tanaman Pangan Utama</Title>
          <Table 
            columns={columns} 
            dataSource={statisticalData} 
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
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Kategori Data Statistik Lainnya</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🥬</div>
                <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>Hortikultura</Title>
                <Paragraph type="secondary">Data sayuran, buah-buahan, dan tanaman hias</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🌴</div>
                <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>Perkebunan</Title>
                <Paragraph type="secondary">Data tanaman perkebunan seperti kelapa sawit, kopi, teh</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🐮</div>
                <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>Peternakan</Title>
                <Paragraph type="secondary">Data populasi ternak dan produksi hasil ternak</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Information Section */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Deskripsi Basis Data Statistik</Title>
                <Paragraph>
                  Basis data statistik pertanian menyediakan informasi komprehensif tentang berbagai 
                  aspek produksi, distribusi, dan pengolahan hasil pertanian di seluruh Indonesia. 
                  Data ini dikumpulkan secara berkala dan diverifikasi untuk memastikan akurasi dan keandalan.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Manfaat Data Statistik</Title>
                <Paragraph>
                  Data statistik ini sangat penting untuk mendukung perencanaan pembangunan pertanian, 
                  pengambilan keputusan kebijakan, penelitian ilmiah, dan analisis pasar yang berbasis 
                  data yang akurat dan terpercaya.
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
          <Title level={3} style={{ color: '#2d5036', marginBottom: '16px' }}>Jelajahi Lebih Lanjut</Title>
          <Paragraph style={{ color: '#495057', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Temukan lebih banyak dataset statistik pertanian yang tersedia di portal Satu Data Pertanian
            untuk mendukung penelitian, analisis, dan pengambilan keputusan Anda.
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
            Lihat Semua Data Statistik
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
        `}</style>
      </div>
    </PublicLayout>
  );
};

export default BasisDataStatistikPage;