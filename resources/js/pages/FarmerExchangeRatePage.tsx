import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Row, Typography, Table, Statistic, Tag, Button, Divider, Progress } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface FarmerExchangeRatePageProps extends PageProps {
  // Props bisa ditambahkan sesuai kebutuhan data dari backend
}

const FarmerExchangeRatePage: React.FC<FarmerExchangeRatePageProps> = () => {
  // Dummy data untuk Nilai Tukar Petani
  const farmerExchangeRateData = [
    { id: 1, tahun: 2023, bulan: 'Januari', ntp: '128.74', ipt: '130.45', ipt_produksi: '125.89', ipt_konsumsi: '135.12', wilayah: 'Nasional', keterangan: 'Stabil' },
    { id: 2, tahun: 2023, bulan: 'Februari', ntp: '129.45', ipt: '131.23', ipt_produksi: '126.54', ipt_konsumsi: '134.98', wilayah: 'Nasional', keterangan: 'Meningkat' },
    { id: 3, tahun: 2023, bulan: 'Maret', ntp: '127.89', ipt: '128.76', ipt_produksi: '124.32', ipt_konsumsi: '136.45', wilayah: 'Nasional', keterangan: 'Turun' },
    { id: 4, tahun: 2023, bulan: 'April', ntp: '130.23', ipt: '132.05', ipt_produksi: '127.89', ipt_konsumsi: '133.78', wilayah: 'Nasional', keterangan: 'Meningkat' },
    { id: 5, tahun: 2023, bulan: 'Mei', ntp: '131.67', ipt: '133.42', ipt_produksi: '128.91', ipt_konsumsi: '132.98', wilayah: 'Nasional', keterangan: 'Meningkat' },
    { id: 6, tahun: 2023, bulan: 'Juni', ntp: '132.12', ipt: '134.87', ipt_produksi: '129.43', ipt_konsumsi: '132.34', wilayah: 'Nasional', keterangan: 'Stabil' },
    { id: 7, tahun: 2023, bulan: 'Juli', ntp: '133.45', ipt: '135.23', ipt_produksi: '130.78', ipt_konsumsi: '131.67', wilayah: 'Nasional', keterangan: 'Meningkat' },
    { id: 8, tahun: 2023, bulan: 'Agustus', ntp: '134.08', ipt: '136.78', ipt_produksi: '131.98', ipt_konsumsi: '131.23', wilayah: 'Nasional', keterangan: 'Meningkat' },
    { id: 9, tahun: 2023, bulan: 'September', ntp: '135.21', ipt: '137.12', ipt_produksi: '132.45', ipt_konsumsi: '130.89', wilayah: 'Nasional', keterangan: 'Signifikan' },
    { id: 10, tahun: 2023, bulan: 'Oktober', ntp: '134.67', ipt: '136.54', ipt_produksi: '131.89', ipt_konsumsi: '131.34', wilayah: 'Nasional', keterangan: 'Stabil' },
  ];

  const regionalData = [
    { id: 1, wilayah: 'Jawa Barat', ntp: '132.45', trend: 'naik', perubahan: '+1.2%' },
    { id: 2, wilayah: 'Jawa Tengah', ntp: '129.87', trend: 'turun', perubahan: '-0.8%' },
    { id: 3, wilayah: 'Jawa Timur', ntp: '131.67', trend: 'naik', perubahan: '+2.1%' },
    { id: 4, wilayah: 'Sumatera Utara', ntp: '127.34', trend: 'naik', perubahan: '+1.5%' },
    { id: 5, wilayah: 'Sulawesi Selatan', ntp: '130.12', trend: 'stabil', perubahan: '+0.3%' },
    { id: 6, wilayah: 'Kalimantan Timur', ntp: '128.67', trend: 'turun', perubahan: '-0.5%' },
    { id: 7, wilayah: 'Banten', ntp: '131.89', trend: 'naik', perubahan: '+1.7%' },
    { id: 8, wilayah: 'Bali', ntp: '129.23', trend: 'naik', perubahan: '+0.9%' },
  ];

  const columns = [
    {
      title: 'Tahun',
      dataIndex: 'tahun',
      key: 'tahun',
    },
    {
      title: 'Bulan',
      dataIndex: 'bulan',
      key: 'bulan',
    },
    {
      title: 'NTI',
      dataIndex: 'nti',
      key: 'nti',
      render: (nti: number) => (
        <span style={{ fontWeight: 'bold', color: '#2d5036' }}>{nti}</span>
      ),
    },
    {
      title: 'IHK Produksi',
      dataIndex: 'ihk_produksi',
      key: 'ihk_produksi',
    },
    {
      title: 'IHK Konsumsi',
      dataIndex: 'ihk_konsumsi',
      key: 'ihk_konsumsi',
    },
    {
      title: 'Wilayah',
      dataIndex: 'wilayah',
      key: 'wilayah',
    },
    {
      title: 'Status',
      dataIndex: 'keterangan',
      key: 'keterangan',
      render: (status: string) => (
        <Tag 
          color={
            status === 'Meningkat' ? 'green' : 
            status === 'Turun' ? 'red' : 
            'blue'
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  const regionalColumns = [
    {
      title: 'Wilayah',
      dataIndex: 'wilayah',
      key: 'wilayah',
    },
    {
      title: 'NTI',
      dataIndex: 'nti',
      key: 'nti',
      render: (nti: number) => (
        <span style={{ fontWeight: 'bold', color: '#2d5036' }}>{nti}</span>
      ),
    },
    {
      title: 'Perubahan Bulanan',
      key: 'perubahan',
      render: (_, record) => (
        <span 
          style={{ 
            color: record.trend === 'naik' ? '#4CAF50' : 
                   record.trend === 'turun' ? '#F44336' : '#2196F3',
            fontWeight: 'bold'
          }}
        >
          {record.perubahan}
        </span>
      ),
    },
    {
      title: 'Trend',
      dataIndex: 'trend',
      key: 'trend',
      render: (trend: string) => (
        <Tag 
          color={
            trend === 'naik' ? 'green' : 
            trend === 'turun' ? 'red' : 
            'blue'
          }
        >
          {trend.charAt(0).toUpperCase() + trend.slice(1)}
        </Tag>
      ),
    },
  ];

  return (
    <PublicLayout title="Nilai Tukar Petani - Satu Data Pertanian">
      <Head title="Nilai Tukar Petani - Satu Data Pertanian" />
      
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
            Nilai Tukar Petani (NTP)
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#495057' }}>
            Indikator yang menggambarkan kemampuan tukar barang hasil pertanian terhadap barang yang dikonsumsi petani serta biaya produksi yang dikeluarkan
          </Paragraph>
        </div>

        {/* Stats Overview */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic 
                  title="Nilai Terbaru (NTP)" 
                  value={134.67} 
                  precision={2}
                  valueStyle={{ color: '#2d5036', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic 
                  title="Bulan Terakhir" 
                  value="Oktober 2023" 
                  valueStyle={{ color: '#4CAF50', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic 
                  title="Trend NTP" 
                  value="+0.34%" 
                  precision={2}
                  valueStyle={{ color: '#2196F3', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic 
                  title="Wilayah Termonitor" 
                  value={34} 
                  suffix="Provinsi"
                  valueStyle={{ color: '#FF9800', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Main Data Table */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Data Nilai Tukar Petani (NTP) Nasional</Title>
          <Table 
            columns={columns} 
            dataSource={farmerExchangeRateData} 
            rowKey="id"
            pagination={{ 
              pageSize: 10, 
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} entri`
            }}
          />
        </Card>

        {/* Regional Data */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Nilai Tukar Petani Berdasarkan Wilayah</Title>
          <Table 
            columns={regionalColumns} 
            dataSource={regionalData} 
            rowKey="id"
            pagination={{ 
              pageSize: 8,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} entri`
            }}
          />
        </Card>

        {/* Information Section */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Definisi Nilai Tukar Petani (NTP)</Title>
                <Paragraph>
                  Nilai Tukar Petani (NTP) adalah rasio antara indeks harga yang diterima petani (IHP) terhadap indeks harga 
                  yang dibayar petani (IHB). NTP menggambarkan daya tukar hasil pertanian terhadap barang-barang yang 
                  dibutuhkan petani baik untuk konsumsi maupun untuk biaya produksi.
                </Paragraph>
                <Paragraph>
                  Jika NTP &gt; 100 artinya petani mendapatkan keuntungan, sedangkan jika NTP &lt; 100 artinya petani mengalami kerugian.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Komponen Penyusun NTP</Title>
                <Paragraph>
                  NTP disusun oleh dua komponen utama yaitu:
                </Paragraph>
                <ul>
                  <li><strong>Indeks Harga yang Diterima Petani (IHP):</strong> mencakup harga hasil pertanian yang dijual petani</li>
                  <li><strong>Indeks Harga yang Dibayar Petani (IHB):</strong> mencakup harga barang untuk konsumsi rumah tangga dan biaya produksi</li>
                </ul>
                <Paragraph>
                  Rumus: NTP = (IHP/IHB) x 100
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Trend Visualization */}
        <div style={{ marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Tren Nilai Tukar Petani Tahun 2023</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card style={{ textAlign: 'center', background: '#e8f5e9' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Januari</Title>
                <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', color: '#1b5e20' }}>128.74</Paragraph>
                <Progress percent={64} strokeColor="#1b5e20" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Februari</Title>
                <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', color: '#0d47a1' }}>129.45</Paragraph>
                <Progress percent={65} strokeColor="#0d47a1" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Juni</Title>
                <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', color: '#e65100' }}>132.12</Paragraph>
                <Progress percent={66} strokeColor="#e65100" />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#f3e5f5' }}>
                <Title level={4} style={{ color: '#2d5036' }}>September</Title>
                <Paragraph style={{ fontSize: '24px', fontWeight: 'bold', color: '#4a148c' }}>135.21</Paragraph>
                <Progress percent={68} strokeColor="#4a148c" />
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
            Dapatkan dataset lengkap Nilai Tukar Petani beserta data historis dan analisis terperinci untuk mendukung kebijakan dan penelitian di sektor pertanian.
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
            Unduh Dataset NTP
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default FarmerExchangeRatePage;