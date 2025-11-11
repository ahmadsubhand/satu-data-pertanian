import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Row, Typography, Table, Statistic, Tag, Button, Divider } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface GdrpPageProps extends PageProps {
  // Props bisa ditambahkan sesuai kebutuhan data dari backend
}

const GdrpPage: React.FC<GdrpPageProps> = () => {
  // Dummy data untuk Produk Domestik Regional Bruto
  const regionalGdpData = [
    { id: 1, tahun: 2023, provinsi: 'Jawa Barat', pdrb: '1.162', satuan: 'triliun rupiah', kontribusi_sektor_pertanian: '18.7%', nilai_pertanian: '217.3', urutan_nasional: '1' },
    { id: 2, tahun: 2023, provinsi: 'Jawa Tengah', pdrb: '774.8', satuan: 'triliun rupiah', kontribusi_sektor_pertanian: '22.1%', nilai_pertanian: '171.2', urutan_nasional: '2' },
    { id: 3, tahun: 2023, provinsi: 'Jawa Timur', pdrb: '744.7', satuan: 'triliun rupiah', kontribusi_sektor_pertanian: '19.8%', nilai_pertanian: '147.4', urutan_nasional: '3' },
    { id: 4, tahun: 2023, provinsi: 'Sumatera Utara', pdrb: '412.8', satuan: 'triliun rupiah', kontribusi_sektor_pertanian: '25.3%', nilai_pertanian: '104.4', urutan_nasional: '4' },
    { id: 5, tahun: 2023, provinsi: 'Sulawesi Selatan', pdrb: '312.0', satuan: 'triliun rupiah', kontribusi_sektor_pertanian: '21.5%', nilai_pertanian: '67.1', urutan_nasional: '5' },
    { id: 6, tahun: 2023, provinsi: 'Banten', pdrb: '286.2', satuan: 'triliun rupiah', kontribusi_sektor_pertanian: '14.2%', nilai_pertanian: '40.6', urutan_nasional: '6' },
    { id: 7, tahun: 2023, provinsi: 'Sumatera Barat', pdrb: '142.7', satuan: 'triliun rupiah', kontribusi_sektor_pertanian: '28.7%', nilai_pertanian: '40.9', urutan_nasional: '7' },
    { id: 8, tahun: 2023, provinsi: 'Kalimantan Timur', pdrb: '309.5', satuan: 'triliun rupiah', kontribusi_sektor_pertanian: '8.9%', nilai_pertanian: '27.5', urutan_nasional: '8' },
  ];

  const sectorBreakdownData = [
    { id: 1, provinsi: 'Jawa Barat', tanaman_pangan: '42.3%', perkebunan: '28.1%', peternakan: '18.2%', perikanan: '11.4%' },
    { id: 2, provinsi: 'Jawa Tengah', tanaman_pangan: '48.7%', perkebunan: '22.5%', peternakan: '19.8%', perikanan: '9.0%' },
    { id: 3, provinsi: 'Jawa Timur', tanaman_pangan: '45.1%', perkebunan: '25.6%', peternakan: '17.2%', perikanan: '12.1%' },
    { id: 4, provinsi: 'Sumatera Utara', tanaman_pangan: '32.4%', perkebunan: '41.2%', peternakan: '16.8%', perikanan: '9.6%' },
  ];

  const columns = [
    {
      title: 'Provinsi',
      dataIndex: 'provinsi',
      key: 'provinsi',
    },
    {
      title: 'Tahun',
      dataIndex: 'tahun',
      key: 'tahun',
    },
    {
      title: 'PDRB',
      dataIndex: 'pdrb',
      key: 'pdrb',
      render: (text: string, record: any) => `${text} ${record.satuan}`,
    },
    {
      title: 'Kontribusi Sektor Pertanian',
      dataIndex: 'kontribusi_sektor_pertanian',
      key: 'kontribusi_sektor_pertanian',
    },
    {
      title: 'Nilai Kontribusi Pertanian',
      dataIndex: 'nilai_pertanian',
      key: 'nilai_pertanian',
      render: (nilai) => `${nilai} triliun`,
    },
    {
      title: 'Peringkat Nasional',
      dataIndex: 'urutan_nasional',
      key: 'urutan_nasional',
      render: (peringkat) => (
        <Tag color={peringkat <= 3 ? 'gold' : peringkat <= 5 ? 'silver' : 'bronze'}>
          #{peringkat}
        </Tag>
      ),
    },
  ];

  const breakdownColumns = [
    {
      title: 'Provinsi',
      dataIndex: 'provinsi',
      key: 'provinsi',
    },
    {
      title: 'Tanaman Pangan',
      dataIndex: 'tanaman_pangan',
      key: 'tanaman_pangan',
    },
    {
      title: 'Perkebunan',
      dataIndex: 'perkebunan',
      key: 'perkebunan',
    },
    {
      title: 'Peternakan',
      dataIndex: 'peternakan',
      key: 'peternakan',
    },
    {
      title: 'Perikanan',
      dataIndex: 'perikanan',
      key: 'perikanan',
    },
  ];

  return (
    <PublicLayout title="Produk Domestik Regional Bruto Pertanian - Satudata Pertanian">
      <Head title="Produk Domestik Regional Bruto Pertanian - Satudata Pertanian" />
      
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
            Produk Domestik Regional Bruto Sektor Pertanian
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#495057' }}>
            Informasi tentang kontribusi sektor pertanian terhadap Produk Domestik Regional Bruto (PDRB) di berbagai provinsi serta pembagian kontribusi dari berbagai subsektor pertanian
          </Paragraph>
        </div>

        {/* Stats Overview */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic 
                  title="Provinsi Tertinggi (2023)" 
                  value="Jawa Barat" 
                  valueStyle={{ color: '#2d5036', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic 
                  title="Kontribusi Tertinggi" 
                  value="28.7%" 
                  valueStyle={{ color: '#4CAF50', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic 
                  title="Jumlah Provinsi" 
                  value={34} 
                  suffix="provinsi"
                  valueStyle={{ color: '#FF9800', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic 
                  title="Tahun Data Terakhir" 
                  value={2023} 
                  valueStyle={{ color: '#2196F3', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Main Data Table */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Data PDRB Sektor Pertanian berdasarkan Provinsi (2023)</Title>
          <Table 
            columns={columns} 
            dataSource={regionalGdpData} 
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: true }}
          />
        </Card>

        {/* Sector Breakdown by Province */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Rincian Kontribusi Subsektor Pertanian berdasarkan Provinsi</Title>
          <Table 
            columns={breakdownColumns} 
            dataSource={sectorBreakdownData} 
            rowKey="id"
            pagination={false}
          />
        </Card>

        {/* Top Contributing Provinces */}
        <div style={{ marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Provinsi dengan Kontribusi Tertinggi (2023)</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🥇</div>
                <Title level={4} style={{ color: '#2d5036' }}>Jawa Barat</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#1b5e20' }}>Rp1.162 Triliun</Paragraph>
                <Paragraph type="secondary">22.1% dari PDRB</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🥈</div>
                <Title level={4} style={{ color: '#2d5036' }}>Jawa Tengah</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#0d47a1' }}>Rp774.8 Miliar</Paragraph>
                <Paragraph type="secondary">25.3% dari PDRB</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🥉</div>
                <Title level={4} style={{ color: '#2d5036' }}>Sumatera Utara</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#e65100' }}>Rp412.8 Miliar</Paragraph>
                <Paragraph type="secondary">28.7% dari PDRB</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Information Sections */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Definisi Produk Domestik Regional Bruto (PDRB)</Title>
                <Paragraph>
                  Produk Domestik Regional Bruto (PDRB) adalah ukuran nilai pasar dari semua barang dan jasa akhir 
                  yang diproduksi di sebuah provinsi dalam satu tahun. Sektor pertanian mencakup tanaman pangan, 
                  hortikultura, perkebunan, peternakan, dan perikanan.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Metodologi Penghitungan</Title>
                <Paragraph>
                  PDRB sektor pertanian dihitung berdasarkan pendekatan produksi dan menggunakan data dari Survei 
                  Sektoral yang dilakukan oleh Badan Pusat Statistik (BPS) serta data administrasi dari 
                  Dinas Pertanian Provinsi dan Kementerian Pertanian.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Comparison Section */}
        <div style={{ marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Perbandingan Kontribusi (2022 vs 2023)</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', background: '#e8f5e9' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Jawa Barat</Title>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                  <div>
                    <div>2022</div>
                    <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>18.3%</div>
                  </div>
                  <div>
                    <div>2023</div>
                    <div style={{ fontWeight: 'bold', color: '#2196F3' }}>18.7%</div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', background: '#e3f2fd' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Jawa Tengah</Title>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                  <div>
                    <div>2022</div>
                    <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>21.8%</div>
                  </div>
                  <div>
                    <div>2023</div>
                    <div style={{ fontWeight: 'bold', color: '#2196F3' }}>22.1%</div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', background: '#fff3e0' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Sumatera Utara</Title>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                  <div>
                    <div>2022</div>
                    <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>24.9%</div>
                  </div>
                  <div>
                    <div>2023</div>
                    <div style={{ fontWeight: 'bold', color: '#2196F3' }}>25.3%</div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', background: '#f3e5f5' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Sulawesi Selatan</Title>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                  <div>
                    <div>2022</div>
                    <div style={{ fontWeight: 'bold', color: '#4CAF50' }}>21.1%</div>
                  </div>
                  <div>
                    <div>2023</div>
                    <div style={{ fontWeight: 'bold', color: '#2196F3' }}>21.5%</div>
                  </div>
                </div>
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
          <Title level={3} style={{ color: '#2d5036', marginBottom: '16px' }}>Unduh Data Lengkap</Title>
          <Paragraph style={{ color: '#495057', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Akses dataset lengkap Produk Domestik Regional Bruto sektor pertanian untuk semua provinsi di Indonesia serta data historis untuk analisis mendalam.
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
            Unduh Dataset PDRB
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default GdrpPage;