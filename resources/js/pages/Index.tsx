import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Table, Tag, Typography, Row, Col, Input, Select, Button, Divider, Space } from 'antd';
import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

interface DataCatalogItem {
  id: number;
  title: string;
  description: string;
  source_url: string;
  api_endpoint: string;
  category: string;
  tags: string[];
  update_frequency: string;
  last_synced_at: string;
  metadata: any;
  is_active: boolean;
}

interface SatudataIndexPageProps extends PageProps {
  dataCatalogs: {
    data: DataCatalogItem[];
    links: any;
    meta: {
      current_page: number;
      from: number;
      last_page: number;
      path: string;
      per_page: number;
      to: number;
      total: number;
    };
  };
  filters: {
    limit: number;
    page: number;
  };
}

const SatudataIndexPage: React.FC<SatudataIndexPageProps> = ({ dataCatalogs, filters }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Categories mapping
  const categoryLabels: Record<string, string> = {
    'statistical': 'Statistik',
    'geospatial': 'Geospasial',
    'publication': 'Publikasi',
    'report': 'Laporan',
    'agriculture': 'Data Pertanian',
    'livestock': 'Data Peternakan',
    'fisheries': 'Data Perikanan',
    'commodity': 'Harga Komoditas',
    'general': 'Data Umum',
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

  // Columns for the table
  const columns = [
    {
      title: 'Judul',
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: DataCatalogItem) => (
        <a href={`/satudata/${record.id}`} style={{ fontWeight: 500 }}>
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
      render: (record: DataCatalogItem) => {
        return record.is_active ? 
          <Tag color="green">Aktif</Tag> : 
          <Tag color="red">Tidak Aktif</Tag>;
      },
    },
  ];

  // Handle search
  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    // In a real implementation, you would make an API call here
    console.log('Searching for:', value);
  };

  // Handle category filter change
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    // In a real implementation, you would make an API call here
    console.log('Filtering by category:', value);
  };

  // Get unique categories for filter
  const uniqueCategories = Array.from(
    new Set(dataCatalogs.data.map(item => item.category))
  );

  return (
    <PublicLayout title="Katalog Data - Satu Data Pertanian">
      <Head title="Katalog Data - Satu Data Pertanian" />
      
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
            Katalog Data Satu Data Pertanian
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
            Temukan berbagai dataset yang tersedia dari Kementerian Pertanian untuk mendukung 
            penelitian, analisis, dan pengambilan keputusan di sektor pertanian.
          </Paragraph>
        </div>

        {/* Search and Filters Section */}
        <div style={{ marginBottom: '24px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={14}>
              <Search 
                placeholder="Cari dataset berdasarkan judul atau deskripsi..." 
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
                  <Title level={3} style={{ color: '#2d5036' }}>{dataCatalogs.meta.total}</Title>
                  <Text>Total Dataset</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>
                    {dataCatalogs.data.filter(item => item.is_active).length}
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
                    {new Set(dataCatalogs.data.map(item => item.update_frequency)).size}
                  </Title>
                  <Text>Frekuensi Pembaruan</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Dataset List Section */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={2} style={{ color: '#2d5036', fontSize: '24px' }}>
              Dataset Tersedia
            </Title>
            <Text type="secondary">
              Menampilkan {dataCatalogs.data.length} dari {dataCatalogs.meta.total} dataset
            </Text>
          </div>

          {/* Table View */}
          <Card>
            <Table 
              columns={columns} 
              dataSource={dataCatalogs.data} 
              rowKey="id"
              pagination={{
                current: dataCatalogs.meta.current_page,
                pageSize: dataCatalogs.meta.per_page,
                total: dataCatalogs.meta.total,
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
            Kategori Dataset
          </Title>
          <Row gutter={[16, 16]}>
            {uniqueCategories.map(category => {
              const categoryData = dataCatalogs.data.filter(item => item.category === category);
              return (
                <Col xs={24} sm={12} md={8} lg={6} key={category}>
                  <Card 
                    hoverable
                    style={{ textAlign: 'center', height: '100%' }}
                    onClick={() => handleCategoryChange(category)}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '12px' }}>
                      {category === 'statistical' && '📊'}
                      {category === 'geospatial' && '🗺️'}
                      {category === 'publication' && '📚'}
                      {category === 'agriculture' && '🌾'}
                      {category === 'livestock' && '🐄'}
                      {category === 'fisheries' && '🐟'}
                      {category === 'commodity' && '💰'}
                      {category === 'report' && '📄'}
                      {category === 'general' && '📁'}
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
            Manfaatkan Data untuk Pengembangan Pertanian
          </Title>
          <Paragraph 
            style={{ 
              color: '#495057', 
              maxWidth: '600px', 
              margin: '0 auto 16px',
              fontSize: '16px'
            }}
          >
            Katalog data ini menyediakan akses ke berbagai dataset yang dikumpulkan dan dikelola 
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

export default SatudataIndexPage;