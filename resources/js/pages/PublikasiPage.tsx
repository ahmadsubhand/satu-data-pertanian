import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Table, Tag, Typography, Row, Col, Input, Select, Button, Divider } from 'antd';
import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

// Sama seperti Index.tsx tapi tanpa data yang diperlukan
interface PublikasiPageProps extends PageProps {
  // Tidak perlu props dari backend karena ini hanya tampilan
}

const PublikasiPage: React.FC<PublikasiPageProps> = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Dummy data categories
  const categoryLabels: Record<string, string> = {
    'journal': 'Jurnal',
    'report': 'Laporan',
    'study': 'Kajian',
    'policy': 'Kebijakan',
    'research': 'Penelitian',
    'news': 'Berita',
    'article': 'Artikel',
    'bulletin': 'Buletin',
  };

  // Dummy data update frequencies
  const frequencyLabels: Record<string, string> = {
    'realtime': 'Real-time',
    'daily': 'Harian',
    'weekly': 'Mingguan',
    'monthly': 'Bulanan',
    'quarterly': 'Triwulanan',
    'yearly': 'Tahunan',
    'as_needed': 'Sesuai Kebutuhan',
    'unknown': 'Tidak Diketahui'
  };

  // Dummy publications data
  const dummyPublications = [
    {
      id: 1,
      title: 'Laporan Tahunan Pembangunan Pertanian 2023',
      description: 'Ringkasan capaian dan strategi pembangunan pertanian tahun 2023',
      source_url: '#',
      api_endpoint: '#',
      category: 'report',
      tags: ['laporan', 'tahunan', 'pembangunan'],
      update_frequency: 'yearly',
      last_synced_at: '2024-01-15',
      metadata: {},
      is_active: true
    },
    {
      id: 2,
      title: 'Kajian Dampak Iklim Terhadap Produksi Pangan',
      description: 'Analisis terhadap dampak perubahan iklim terhadap produksi pangan di Indonesia',
      source_url: '#',
      api_endpoint: '#',
      category: 'study',
      tags: ['iklim', 'pangan', 'analisis'],
      update_frequency: 'monthly',
      last_synced_at: '2024-02-20',
      metadata: {},
      is_active: true
    },
    {
      id: 3,
      title: 'Kebijakan Subsidi Pupuk Tahun 2024',
      description: 'Rincian kebijakan terbaru mengenai subsidi pupuk untuk petani',
      source_url: '#',
      api_endpoint: '#',
      category: 'policy',
      tags: ['subsidi', 'pupuk', 'kebijakan'],
      update_frequency: 'as_needed',
      last_synced_at: '2024-03-10',
      metadata: {},
      is_active: true
    }
  ];

  // Columns for the table
  const columns = [
    {
      title: 'Judul',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: any) => (
        <a href={`/publikasi/${record.id}`} style={{ fontWeight: 500 }}>
          {title}
        </a>
      ),
    },
    {
      title: 'Kategori',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => {
        return <Tag color="#a8d5ba" style={{ color: '#2d5036' }}>
          {categoryLabels[category] || category}
        </Tag>;
      },
    },
    {
      title: 'Frekuensi Pembaruan',
      dataIndex: 'update_frequency',
      key: 'update_frequency',
      render: (frequency: string) => {
        return <Tag color="#d4edda" style={{ color: '#2d5036' }}>
          {frequencyLabels[frequency] || frequency}
        </Tag>;
      },
    },
    {
      title: 'Terakhir Disinkronkan',
      dataIndex: 'last_synced_at',
      key: 'last_synced_at',
      render: (date: string) => new Date(date).toLocaleDateString('id-ID'),
    },
    {
      title: 'Status',
      key: 'is_active',
      render: (record: any) => {
        return record.is_active ? 
          <Tag color="green">Aktif</Tag> : 
          <Tag color="red">Tidak Aktif</Tag>;
      },
    },
  ];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    // Simulating an API call
    console.log('Searching for:', value);
  };

  // Handle category filter change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // Simulating an API call
    console.log('Filtering by category:', value);
  };

  // Get unique categories for filter
  const uniqueCategories = Array.from(
    new Set(dummyPublications.map(item => item.category))
  );

  return (
    <PublicLayout title="Publikasi - Satudata Pertanian">
      <Head title="Publikasi - Satudata Pertanian" />
      
      <div>
        {/* Hero Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #a8d5ba 0%, #d0f0e0 100%)', 
          borderRadius: '12px', 
          padding: '30px 20px', 
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <Title 
            level={1} 
            style={{ 
              color: '#2d5036', 
              marginBottom: '12px',
              fontSize: '28px'
            }}
          >
            Publikasi Satudata Pertanian
          </Title>
          <Paragraph 
            style={{ 
              fontSize: '16px', 
              color: '#495057', 
              maxWidth: '800px', 
              margin: '0 auto 16px',
              lineHeight: '1.6'
            }}
          >
            Temukan berbagai publikasi resmi dari Kementerian Pertanian yang menyajikan 
            informasi dan analisis terkini tentang sektor pertanian di Indonesia.
          </Paragraph>
        </div>

        {/* Search and Filters Section */}
        <div style={{ marginBottom: '24px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={14}>
              <Search 
                placeholder="Cari publikasi berdasarkan judul atau deskripsi..." 
                onSearch={handleSearch}
                enterButton
                size="large"
              />
            </Col>
            <Col xs={24} sm={6} md={5}>
              <Select
                placeholder="Semua Kategori"
                style={{ width: '100%' }}
                size="large"
                onChange={handleCategoryChange}
                allowClear
              >
                {uniqueCategories.map(category => (
                  <Select.Option key={category} value={category}>
                    {categoryLabels[category] || category}
                  </Select.Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} sm={6} md={5}>
              <Button 
                type="primary" 
                style={{ background: '#2d5036', borderColor: '#2d5036', width: '100%', height: '40px' }}
                size="large"
              >
                Terapkan Filter
              </Button>
            </Col>
          </Row>
        </div>

        {/* Stats Section */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>{dummyPublications.length}</Title>
                  <Text>Total Publikasi</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>
                    {dummyPublications.filter(item => item.is_active).length}
                  </Title>
                  <Text>Publikasi Aktif</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>
                    {uniqueCategories.length}
                  </Title>
                  <Text>Kategori</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>
                    {new Set(dummyPublications.map(item => item.update_frequency)).size}
                  </Title>
                  <Text>Frekuensi Pembaruan</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Publications List Section */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={2} style={{ color: '#2d5036', fontSize: '24px' }}>
              Publikasi Tersedia
            </Title>
            <Text type="secondary">
              Menampilkan {dummyPublications.length} dari {dummyPublications.length} publikasi
            </Text>
          </div>

          {/* Table View */}
          <Card>
            <Table 
              columns={columns} 
              dataSource={dummyPublications} 
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} publikasi`
              }}
            />
          </Card>
        </div>

        {/* Categories Overview Section */}
        <div>
          <Title level={2} style={{ color: '#2d5036', fontSize: '24px', marginBottom: '16px' }}>
            Kategori Publikasi
          </Title>
          <Row gutter={[16, 16]}>
            {uniqueCategories.map(category => {
              const categoryData = dummyPublications.filter(item => item.category === category);
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={category}>
                  <Card 
                    hoverable
                    style={{ textAlign: 'center', height: '100%' }}
                    onClick={() => handleCategoryChange(category)}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '12px' }}>
                      {category === 'journal' && '📚'}
                      {category === 'report' && '📊'}
                      {category === 'study' && '🔍'}
                      {category === 'policy' && '🏛️'}
                      {category === 'research' && '🔬'}
                      {category === 'news' && '📰'}
                      {category === 'article' && '📝'}
                      {category === 'bulletin' && '📖'}
                    </div>
                    <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>
                      {categoryLabels[category] || category}
                    </Title>
                    <Text type="secondary">{categoryData.length} publikasi</Text>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>

        <Divider style={{ margin: '30px 0' }} />

        {/* Information Section */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Title 
            level={3} 
            style={{ 
              color: '#2d5036', 
              marginBottom: '16px',
              fontSize: '20px'
            }}
          >
            Manfaatkan Publikasi untuk Pengembangan Pertanian
          </Title>
          <Paragraph 
            style={{ 
              color: '#495057', 
              maxWidth: '600px', 
              margin: '0 auto 16px',
              fontSize: '16px'
            }}
          >
            Publikasi ini menyediakan informasi dan analisis terkini yang dikumpulkan dan dikelola 
            oleh Kementerian Pertanian untuk mendukung penelitian, inovasi, dan kebijakan pertanian yang berbasis data.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            style={{ 
              background: '#2d5036', 
              borderColor: '#2d5036',
              fontSize: '16px'
            }}
          >
            Pelajari Lebih Lanjut
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PublikasiPage;