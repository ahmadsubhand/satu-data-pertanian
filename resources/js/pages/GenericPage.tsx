import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Typography, Row, Col, Button, Divider } from 'antd';
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';

const { Title, Text, Paragraph } = Typography;

interface GenericPageProps extends PageProps {
  // Tidak perlu props dari backend karena ini hanya tampilan
  pageTitle?: string;
  description?: string;
  category?: string;
}

const GenericPage: React.FC<GenericPageProps> = ({ 
  pageTitle = "Konten", 
  description = "Deskripsi konten halaman ini",
  category = "Umum" 
}) => {
  return (
    <PublicLayout title={`${pageTitle} - Satu Data Pertanian`}>
      <Head title={`${pageTitle} - Satu Data Pertanian`} />
      
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
            {pageTitle}
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
            {description}
          </Paragraph>
        </div>

        {/* Stats Section */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>150+</Title>
                  <Text>Total Dataset</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>85+</Title>
                  <Text>Dataset Aktif</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>20+</Title>
                  <Text>Kategori</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>10+</Title>
                  <Text>Tema</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Content Section */}
        <div style={{ marginBottom: '30px' }}>
          <Card style={{ padding: '20px' }}>
            <Title level={2} style={{ color: '#2d5036', marginBottom: '16px' }}>
              Informasi {pageTitle}
            </Title>
            <Paragraph style={{ fontSize: '16px', color: '#495057' }}>
              Halaman ini merupakan bagian dari portal Satu Data Pertanian yang menyediakan akses terhadap
              berbagai informasi {category.toLowerCase()} yang berkaitan dengan sektor pertanian di Indonesia. 
              Data yang tersedia dihalaman ini dikumpulkan dan dikelola oleh Kementerian Pertanian untuk 
              mendukung pengambilan keputusan yang berbasis data.
            </Paragraph>
            
            <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
              <Col xs={24} sm={12}>
                <Card style={{ height: '100%', textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                    📊
                  </div>
                  <Title level={4} style={{ color: '#2d5036', marginBottom: '10px' }}>
                    Dataset Tersedia
                  </Title>
                  <Text>Data pada halaman ini terdiri dari berbagai dataset yang bisa diakses secara terbuka.</Text>
                </Card>
              </Col>
              <Col xs={24} sm={12}>
                <Card style={{ height: '100%', textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>
                    🔍
                  </div>
                  <Title level={4} style={{ color: '#2d5036', marginBottom: '10px' }}>
                    Fitur Pencarian
                  </Title>
                  <Text>Gunakan fitur pencarian untuk menemukan data yang Anda butuhkan dengan cepat.</Text>
                </Card>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Related Categories */}
        <div>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '16px' }}>
            Kategori Terkait
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                  📈
                </div>
                <Title level={4} style={{ color: '#2d5036' }}>
                  Statistik
                </Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                  🗺️
                </div>
                <Title level={4} style={{ color: '#2d5036' }}>
                  Geospasial
                </Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card hoverable style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '24px', marginBottom: '10px' }}>
                  🏢
                </div>
                <Title level={4} style={{ color: '#2d5036' }}>
                  Kebijakan
                </Title>
              </Card>
            </Col>
          </Row>
        </div>

        <Divider style={{ margin: '30px 0' }} />

        {/* Call to Action */}
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <Title 
            level={3} 
            style={{ 
              color: '#2d5036', 
              marginBottom: '16px',
              fontSize: '20px'
            }}
          >
            Temukan Data yang Anda Butuhkan
          </Title>
          <Paragraph 
            style={{ 
              color: '#495057', 
              maxWidth: '600px', 
              margin: '0 auto 16px',
              fontSize: '16px'
            }}
          >
            Jelajahi ribuan dataset yang tersedia di Satu Data Pertanian untuk mendukung
            penelitian, analisis, dan pengambilan keputusan Anda.
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
            Jelajahi Data
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
};

export default GenericPage;