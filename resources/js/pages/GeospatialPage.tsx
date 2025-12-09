import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Table, Tag, Typography, Row, Col, Input, Select, Button, Divider } from 'antd';
import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

interface GeospatialPageProps extends PageProps {
  // Tidak perlu props dari backend karena ini hanya tampilan
}

const GeospatialPage: React.FC<GeospatialPageProps> = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Categories mapping
  const categoryLabels: Record<string, string> = {
    'landuse': 'Penggunaan Lahan',
    'soil': 'Jenis Tanah',
    'climate': 'Iklim',
    'water': 'Sumber Air',
    'infrastructure': 'Infrastruktur',
    'agroecology': 'Zona Agroekologi',
    'disaster': 'Rawan Bencana',
    'productivity': 'Potensi Produktivitas',
    'topography': 'Topografi',
    'vegetation': 'Vegetasi'
  };

  // Update frequency mapping
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

  // Dummy geospatial data
  const dummyGeospatial = [
    {
      id: 1,
      title: 'Peta Zona Agroekologi Nasional',
      description: 'Representasi digital zona agroekologi berdasarkan potensi dan kendala lahan',
      source_url: '#',
      api_endpoint: '#',
      category: 'agroecology',
      tags: ['zona', 'agroekologi', 'nasional'],
      update_frequency: 'yearly',
      last_synced_at: '2024-01-15',
      metadata: {},
      is_active: true
    },
    {
      id: 2,
      title: 'Peta Potensi Produksi Tanaman Pangan',
      description: 'Peta digital yang menunjukkan potensi produksi berbagai komoditas tanaman pangan',
      source_url: '#',
      api_endpoint: '#',
      category: 'productivity',
      tags: ['potensi', 'produksi', 'tanaman'],
      update_frequency: 'quarterly',
      last_synced_at: '2024-02-20',
      metadata: {},
      is_active: true
    },
    {
      id: 3,
      title: 'Peta Risiko Kekeringan Wilayah Irigasi',
      description: 'Peta risiko kekeringan berdasarkan data historis dan prediksi cuaca',
      source_url: '#',
      api_endpoint: '#',
      category: 'disaster',
      tags: ['kekeringan', 'risiko', 'irigasi'],
      update_frequency: 'daily',
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
        <a href={`/geospatial/${record.id}`} style={{ fontWeight: 500 }}>
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
    new Set(dummyGeospatial.map(item => item.category))
  );

  return (
    <PublicLayout title="Data Geospasial - Satu Data Pertanian">
      <Head title="Data Geospasial - Satu Data Pertanian" />
      
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
            Data Geospasial Satu Data Pertanian
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
            Jelajahi berbagai informasi geospasial sektor pertanian yang mencakup peta lahan, 
            zona agroekologi, dan informasi spasial lainnya di seluruh wilayah Indonesia.
          </Paragraph>
        </div>

        {/* Search and Filters Section */}
        <div style={{ marginBottom: '24px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={14}>
              <Search 
                placeholder="Cari data geospasial berdasarkan judul atau deskripsi..." 
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
                  <Title level={3} style={{ color: '#2d5036' }}>{dummyGeospatial.length}</Title>
                  <Text>Total Dataset</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>
                    {dummyGeospatial.filter(item => item.is_active).length}
                  </Title>
                  <Text>Dataset Aktif</Text>
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
                    {new Set(dummyGeospatial.map(item => item.update_frequency)).size}
                  </Title>
                  <Text>Frekuensi Pembaruan</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Data List Section */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={2} style={{ color: '#2d5036', fontSize: '24px' }}>
              Dataset Geospasial Tersedia
            </Title>
            <Text type="secondary">
              Menampilkan {dummyGeospatial.length} dari {dummyGeospatial.length} dataset
            </Text>
          </div>

          {/* Table View */}
          <Card>
            <Table 
              columns={columns} 
              dataSource={dummyGeospatial} 
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} dataset`
              }}
            />
          </Card>
        </div>

        {/* Categories Overview Section */}
        <div>
          <Title level={2} style={{ color: '#2d5036', fontSize: '24px', marginBottom: '16px' }}>
            Kategori Data Geospasial
          </Title>
          <Row gutter={[16, 16]}>
            {uniqueCategories.map(category => {
              const categoryData = dummyGeospatial.filter(item => item.category === category);
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={category}>
                  <Card 
                    hoverable
                    style={{ textAlign: 'center', height: '100%' }}
                    onClick={() => handleCategoryChange(category)}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '12px' }}>
                      {category === 'landuse' && '🌾'}
                      {category === 'soil' && '🌍'}
                      {category === 'climate' && '🌤️'}
                      {category === 'water' && '💧'}
                      {category === 'infrastructure' && '🏗️'}
                      {category === 'agroecology' && '🗺️'}
                      {category === 'disaster' && '⚠️'}
                      {category === 'productivity' && '📈'}
                      {category === 'topography' && '⛰️'}
                      {category === 'vegetation' && '🌿'}
                    </div>
                    <Title level={4} style={{ color: '#2d5036', marginBottom: '8px' }}>
                      {categoryLabels[category] || category}
                    </Title>
                    <Text type="secondary">{categoryData.length} dataset</Text>
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
            Manfaatkan Data Geospasial untuk Pengembangan Pertanian
          </Title>
          <Paragraph 
            style={{ 
              color: '#495057', 
              maxWidth: '600px', 
              margin: '0 auto 16px',
              fontSize: '16px'
            }}
          >
            Data geospasial ini menyediakan informasi spasial dan peta terkini yang dikumpulkan dan dikelola 
            oleh Kementerian Pertanian untuk mendukung perencanaan, penelitian, dan kebijakan pertanian yang berbasis lokasi.
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

export default GeospatialPage;