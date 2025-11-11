import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Row, Typography, Table, Statistic, Tag, Button, Divider, Progress } from 'antd';
import React, { useState } from 'react';

const { Title, Paragraph } = Typography;

interface NilaiTukarPetaniPageProps extends PageProps {
  // Props bisa ditambahkan sesuai kebutuhan data dari backend
}

const NilaiTukarPetaniPage: React.FC<NilaiTukarPetaniPageProps> = () => {
  const [activeTab, setActiveTab] = useState('monthly');
  
  // Dummy data untuk Nilai Tukar Petani
  const ntpData = [
    { id: 1, tahun: 2023, bulan: 'Januari', ntp: '128.74', ipt_produksi: '130.45', ipt_konsumsi: '135.12', wilayah: 'Nasional', status: 'Stabil' },
    { id: 2, tahun: 2023, bulan: 'Februari', ntp: '129.45', ipt_produksi: '131.23', ipt_konsumsi: '134.98', wilayah: 'Nasional', status: 'Meningkat' },
    { id: 3, tahun: 2023, bulan: 'Maret', ntp: '127.89', ipt_produksi: '128.76', ipt_konsumsi: '136.45', wilayah: 'Nasional', status: 'Turun' },
    { id: 4, tahun: 2023, bulan: 'April', ntp: '130.23', ipt_produksi: '127.89', ipt_konsumsi: '133.78', wilayah: 'Nasional', status: 'Meningkat' },
    { id: 5, tahun: 2023, bulan: 'Mei', ntp: '131.67', ipt_produksi: '128.91', ipt_konsumsi: '132.98', wilayah: 'Nasional', status: 'Meningkat' },
    { id: 6, tahun: 2023, bulan: 'Juni', ntp: '132.12', ipt_produksi: '129.43', ipt_konsumsi: '132.34', wilayah: 'Nasional', status: 'Stabil' },
    { id: 7, tahun: 2023, bulan: 'Juli', ntp: '133.45', ipt_produksi: '130.78', ipt_konsumsi: '131.67', wilayah: 'Nasional', status: 'Meningkat' },
    { id: 8, tahun: 2023, bulan: 'Agustus', ntp: '134.08', ipt_produksi: '131.98', ipt_konsumsi: '131.23', wilayah: 'Nasional', status: 'Meningkat' },
    { id: 9, tahun: 2023, bulan: 'September', ntp: '135.21', ipt_produksi: '132.45', ipt_konsumsi: '130.89', wilayah: 'Nasional', status: 'Signifikan' },
    { id: 10, tahun: 2023, bulan: 'Oktober', ntp: '134.67', ipt_produksi: '131.89', ipt_konsumsi: '131.34', wilayah: 'Nasional', status: 'Stabil' },
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
      title: 'NTP',
      dataIndex: 'ntp',
      key: 'ntp',
      render: (text: string) => (
        <span style={{ fontWeight: 'bold', color: '#2d5036' }}>{text}</span>
      ),
    },
    {
      title: 'IHP Produksi',
      dataIndex: 'ipt_produksi',
      key: 'ipt_produksi',
    },
    {
      title: 'IHB Konsumsi',
      dataIndex: 'ipt_konsumsi',
      key: 'ipt_konsumsi',
    },
    {
      title: 'Wilayah',
      dataIndex: 'wilayah',
      key: 'wilayah',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag 
          color={
            status === 'Meningkat' ? 'green' : 
            status === 'Turun' ? 'red' : 
            status === 'Stabil' ? 'blue' : 'orange'
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
      title: 'NTP',
      dataIndex: 'ntp',
      key: 'ntp',
      render: (ntp: string) => (
        <span style={{ fontWeight: 'bold', color: '#2d5036' }}>{ntp}</span>
      ),
    },
    {
      title: 'Perubahan Bulanan',
      dataIndex: 'perubahan',
      key: 'perubahan',
      render: (perubahan: string, record: any) => (
        <span 
          style={{ 
            color: record.trend === 'naik' ? '#4CAF50' : 
                   record.trend === 'turun' ? '#F44336' : '#2196F3',
            fontWeight: 'bold'
          }}
        >
          {perubahan}
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
    <PublicLayout title="Nilai Tukar Petani - Satudata Pertanian">
      <Head title="Nilai Tukar Petani - Satudata Pertanian" />
      
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
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}>
                <Statistic 
                  title="Nilai Terbaru (NTP)" 
                  value={134.67} 
                  precision={2}
                  valueStyle={{ color: '#2d5036', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <Statistic 
                  title="Bulan Terakhir" 
                  value="Oktober 2023" 
                  valueStyle={{ color: '#1976d2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <Statistic 
                  title="Trend NTP" 
                  value="+0.34%" 
                  precision={2}
                  valueStyle={{ color: '#ef6c00', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#f3e5f5' }}>
                <Statistic 
                  title="Wilayah Termonitor" 
                  value={34} 
                  suffix="Provinsi"
                  valueStyle={{ color: '#7b1fa2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Tabs Section */}
        <Card style={{ marginBottom: '30px' }}>
          <div style={{ 
            borderBottom: '1px solid #e8e8e8', 
            marginBottom: '20px',
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {[
              { key: 'monthly', label: 'Bulanan' },
              { key: 'regional', label: 'Regional' },
              { key: 'analysis', label: 'Analisis' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '10px 20px',
                  background: activeTab === tab.key ? '#2d5036' : 'transparent',
                  color: activeTab === tab.key ? 'white' : '#2d5036',
                  border: '1px solid #2d5036',
                  borderRadius: '24px',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                  transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
                  minWidth: '100px'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'monthly' && (
            <div>
              <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Data Nilai Tukar Petani (NTP) Nasional</Title>
              <Table 
                columns={columns} 
                dataSource={ntpData} 
                rowKey="id"
                pagination={{ 
                  pageSize: 10, 
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`
                }}
              />
            </div>
          )}

          {activeTab === 'regional' && (
            <div>
              <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Nilai Tukar Petani Berdasarkan Wilayah</Title>
              <Table 
                columns={regionalColumns} 
                dataSource={regionalData} 
                rowKey="id"
                pagination={{ 
                  pageSize: 8,
                  showSizeChanger: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`
                }}
              />
            </div>
          )}

          {activeTab === 'analysis' && (
            <div>
              <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Analisis NTP</Title>
              <Paragraph style={{ color: '#495057', marginBottom: '20px' }}>
                Analisis mendalam tentang tren Nilai Tukar Petani berdasarkan data historis dan faktor-faktor 
                yang mempengaruhi perkembangan NTP di berbagai wilayah di Indonesia.
              </Paragraph>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                  <Card style={{ textAlign: 'center', background: '#e8f5e9' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>↗️</div>
                    <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>Faktor Pendorong</Title>
                    <Paragraph>Harga komoditas pertanian meningkat</Paragraph>
                    <Progress percent={75} strokeColor="#4CAF50" />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>↘️</div>
                    <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>Tantangan Utama</Title>
                    <Paragraph>Biaya produksi yang tinggi</Paragraph>
                    <Progress percent={65} strokeColor="#2196F3" />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={8}>
                  <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>📈</div>
                    <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>Prospek 2024</Title>
                    <Paragraph>Pertumbuhan positif diproyeksikan</Paragraph>
                    <Progress percent={80} strokeColor="#FF9800" />
                  </Card>
                </Col>
              </Row>
            </div>
          )}
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
                  dibutuhkan petani baik untuk konsumsi rumah tangga maupun untuk biaya produksi.
                </Paragraph>
                <Paragraph>
                  {`Jika NTP > 100 artinya petani mendapatkan keuntungan, sedangkan jika NTP < 100 artinya petani mengalami kerugian.`}
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
            {['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt'].map((bulan, idx) => (
              <Col xs={24} sm={12} md={4} key={idx}>
                <Card 
                  hoverable
                  style={{ 
                    textAlign: 'center', 
                    height: '100%', 
                    background: `linear-gradient(135deg, #e8f5e9 ${idx * 5}%, #f1f8e9 ${100 - idx * 5}%)` 
                  }}
                >
                  <div style={{ fontSize: '14px', marginBottom: '8px', fontWeight: 'bold' }}>{bulan}</div>
                  <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d5036', marginBottom: '8px' }}>
                    {128 + Math.floor(idx * 0.8)}.{idx % 10}{idx % 7}
                  </div>
                  <Progress percent={60 + Math.floor(idx * 4)} strokeColor="#4CAF50" trailColor="#e8f5e9" />
                </Card>
              </Col>
            ))}
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

export default NilaiTukarPetaniPage;