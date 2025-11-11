import AnimatedCard from '@/components/AnimatedCard';
import AnimatedSection from '@/components/AnimatedSection';
import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Button,
    Card,
    Carousel,
    Col,
    Divider,
    Row,
    Statistic,
    Tag,
    Typography,
} from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface DataItem {
    id?: string;
    title: string;
    description: string;
    content?: string;
    category?: string;
    type?: string;
    image_path?: string;
    year?: number;
    status?: string;
    scheduled_date?: string;
    path?: string;
}

interface DatasetItem {
    id: number;
    nama_dataset: string;
    objek_data?: string;
    variabel?: string;
    status: string;
    produsen_data?: string;
    tahun?: number;
    created_at: string;
    updated_at?: string;
}

interface PublicationItem {
    id: number;
    judul_pub: string;
    kategori?: string;
    tgl_pub?: string;
    ket_pub?: string;
    status_pub: string;
}

interface IndicatorItem {
    id: number;
    nama_ind: string;
    definisi_ind?: string;
    klasifikasi_ind?: string;
}

interface CommodityItem {
    id: number;
    name: string;
    category?: string;
    description?: string;
}

interface HomePageProps extends PageProps {
    datasets?: DatasetItem[];
    satudataPublications?: PublicationItem[];
    indicators?: IndicatorItem[];
    commodities?: CommodityItem[];
    statisticalData?: DataItem[];
    geospatialData?: DataItem[];
    publications?: DataItem[];
    gallery?: DataItem[];
    releasePlans?: DataItem[];
    dataPrinciples?: DataItem[];
    priorityData?: DataItem[];
}

const HomePage: React.FC<HomePageProps> = ({
    datasets = [],
    satudataPublications = [],
    indicators = [],
    commodities = [],
    statisticalData = [],
    geospatialData = [],
    publications = [],
    gallery = [],
    releasePlans = [],
    dataPrinciples = [],
    priorityData = [],
}) => {
    return (
        <PublicLayout title="Beranda - Satudata Pertanian">
            <Head title="Beranda - Satudata Pertanian" />

            {/* Hero Section */}
            <AnimatedSection delay={0.1}>
                <div
                    style={{
                        background:
                            'linear-gradient(135deg, #a8d5ba 0%, #d0f0e0 100%)',
                        borderRadius: '12px',
                        padding: '30px 20px', // More responsive padding
                        marginBottom: '30px',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            src="/images/logos/logo-satudata.png"
                            alt="Logo Satudata Pertanian"
                            style={{
                                height: '80px',
                                marginBottom: '12px',
                                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
                                opacity: 0,
                                animation: 'zoomIn 1.5s forwards 0.3s',
                            }}
                            onError={(e) => {
                                const target =
                                    e.target as HTMLElement as HTMLImageElement;
                                target.onerror = null; // prevents looping
                                target.style.display = 'none';
                            }}
                        />
                        <div style={{ 
                            opacity: 0, 
                            animation: 'floatUp 1.8s 1.2s both',
                        }}>
                            <Title
                                level={1}
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '12px',
                                    fontSize: '28px',
                                    fontFamily: 'inherit',
                                    fontWeight: '700',
                                    textShadow: '2px 2px 8px rgba(45,80,54,0.3)',
                                    animation: 'pulse 2s infinite alternate'
                                }}
                            >
                                Selamat Datang di Satudata Pertanian
                            </Title>
                        </div>
                    </div>
                    <Paragraph
                        style={{
                            fontSize: '16px',
                            color: '#495057',
                            maxWidth: '800px',
                            margin: '0 auto 16px',
                            lineHeight: '1.6',
                        }}
                    >
                        <div style={{
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-5px',
                                left: '-5px',
                                right: '-5px',
                                bottom: '-5px',
                                background: 'linear-gradient(45deg, #2d5036, #4CAF50, #8BC34A, #FFC107, #FF9800, #2d5036)',
                                backgroundSize: '300% 300%',
                                borderRadius: '8px',
                                zIndex: -1,
                                animation: 'gradientBorder 3s ease infinite'
                            }}></div>
                            <div style={{
                                position: 'absolute',
                                top: '-3px',
                                left: '-3px',
                                right: '-3px',
                                bottom: '-3px',
                                borderRadius: '6px',
                                background: 'white',
                                zIndex: -1
                            }}></div>
                            <div style={{
                                opacity: 0,
                                animation: 'floatIn 2s 1.8s both',
                            }}>
                                Portal satu data untuk sektor pertanian yang menyediakan informasi data statistik, geospasial, dan publikasi terkait pembangunan pertanian di Indonesia.
                            </div>
                        </div>
                    </Paragraph>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => {
                            // Scroll ke bagian bawah halaman
                            window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: 'smooth'
                            });
                        }}
                        style={{
                            background: '#2d5036',
                            borderColor: '#2d5036',
                            fontSize: '16px', // Better for touch targets on mobile
                        }}
                    >
                        Jelajahi Data
                    </Button>
                </div>
            </AnimatedSection>

            {/* Satudata Data Section - New Section for displaying data from the existing satudata database */}
            <AnimatedSection delay={0.2}>
                <div style={{ marginBottom: '30px' }}>
                    <Title
                        level={2}
                        style={{
                            color: '#2d5036',
                            marginBottom: '20px',
                            fontSize: '24px',
                        }}
                    >
                        Data Satudata Terbaru
                    </Title>
                    <Row gutter={[12, 12]}>
                        {' '}
                        {/* Reduced gutter for mobile */}
                        <Col xs={24} sm={12} md={12}>
                            <AnimatedCard delay={0.1} index={0}>
                                <Card>
                                    <Statistic
                                        title="Dataset Tersedia"
                                        value={datasets.length}
                                        suffix="dataset"
                                    />
                                </Card>
                            </AnimatedCard>
                        </Col>
                        <Col xs={24} sm={12} md={12}>
                            <AnimatedCard delay={0.2} index={1}>
                                <Card>
                                    <Statistic
                                        title="Publikasi"
                                        value={satudataPublications.length}
                                        suffix="publikasi"
                                    />
                                </Card>
                            </AnimatedCard>
                        </Col>
                    </Row>
                </div>
            </AnimatedSection>

            {/* Dataset Section */}
            <AnimatedSection delay={0.4}>
                <div style={{ marginBottom: '30px' }}>
                    <Title
                        level={2}
                        style={{
                            color: '#2d5036',
                            marginBottom: '20px',
                            fontSize: '24px',
                        }}
                    >
                        Dataset Terbaru
                    </Title>
                    <Row gutter={[12, 12]}>
                        {datasets.slice(0, 3).map((dataset, index) => (
                            <Col
                                xs={24}
                                sm={12}
                                md={8}
                                key={`dataset-${index}`}
                            >
                                {' '}
                                {/* Added sm={12} for tablet */}
                                <AnimatedCard delay={0.1} index={index}>
                                    <Card
                                        title={dataset.nama_dataset}
                                        style={{ height: '100%' }}
                                    >
                                        <Paragraph ellipsis={{ rows: 2 }}>
                                            {dataset.objek_data ||
                                                'Objek data tidak tersedia'}
                                        </Paragraph>
                                        <div
                                            style={{
                                                marginTop: '12px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                gap: '8px',
                                            }}
                                        >
                                            <Tag
                                                color="#a8d5ba"
                                                style={{ color: '#2d5036' }}
                                            >
                                                {dataset.status ||
                                                    'Status Tidak Diketahui'}
                                            </Tag>
                                            <span
                                                style={{
                                                    fontSize: '12px',
                                                    color: '#666',
                                                }}
                                            >
                                                Tahun: {dataset.tahun || 'N/A'}
                                            </span>
                                        </div>
                                    </Card>
                                </AnimatedCard>
                            </Col>
                        ))}
                    </Row>
                </div>
            </AnimatedSection>

            {/* Publications Section from Satudata */}
            <AnimatedSection delay={0.5}>
                <div style={{ marginBottom: '30px' }}>
                    <Title
                        level={2}
                        style={{
                            color: '#2d5036',
                            marginBottom: '20px',
                            fontSize: '24px',
                        }}
                    >
                        Publikasi dari Satudata
                    </Title>
                    <Row gutter={[12, 12]}>
                        {satudataPublications.slice(0, 3).map((pub, index) => (
                            <Col xs={24} sm={12} md={8} key={`pub-${index}`}>
                                {' '}
                                {/* Added sm={12} for tablet */}
                                <AnimatedCard delay={0.1} index={index}>
                                    <Card
                                        title={pub.judul_pub}
                                        style={{ height: '100%' }}
                                    >
                                        <Paragraph ellipsis={{ rows: 2 }}>
                                            {pub.ket_pub ||
                                                'Deskripsi publikasi tidak tersedia'}
                                        </Paragraph>
                                        <div
                                            style={{
                                                marginTop: '12px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                flexWrap: 'wrap',
                                                gap: '8px',
                                            }}
                                        >
                                            <Tag
                                                color="#1890ff"
                                                style={{ color: 'white' }}
                                            >
                                                {pub.kategori ||
                                                    'Kategori Tidak Diketahui'}
                                            </Tag>
                                            <span
                                                style={{
                                                    fontSize: '12px',
                                                    color: '#666',
                                                }}
                                            >
                                                {pub.tgl_pub
                                                    ? new Date(
                                                          pub.tgl_pub,
                                                      ).toLocaleDateString(
                                                          'id-ID',
                                                      )
                                                    : 'Tanggal Tidak Tersedia'}
                                            </span>
                                        </div>
                                    </Card>
                                </AnimatedCard>
                            </Col>
                        ))}
                    </Row>
                </div>
            </AnimatedSection>

            {/* Partner Logos Section */}
            <AnimatedSection delay={0.6}>
                <div
                    style={{
                        marginBottom: '30px',
                        textAlign: 'center',
                        padding: '20px',
                    }}
                >
                    <Title
                        level={2}
                        style={{
                            color: '#2d5036',
                            marginBottom: '20px',
                            fontSize: '24px',
                        }}
                    ></Title>

                    <Row
                        justify="center"
                        gutter={[20, 20]}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* SATUDATA INDONESIA */}
                        <Col xs={20} sm={10} md={6} lg={6}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    animation: 'fadeIn 1s ease-in-out',
                                }}
                            >
                                <a
                                    href="https://data.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        transition: 'all 0.4s ease',
                                        padding: '10px',
                                        borderRadius: '16px',
                                        background: '#ffffff',
                                        boxShadow:
                                            '0 6px 16px rgba(0,0,0,0.15)',
                                        width: '180px',
                                        height: '140px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                    }}
                                    onMouseEnter={(e) => {
                                        const target =
                                            e.currentTarget as HTMLElement;
                                        target.style.background =
                                            'linear-gradient(45deg, #2d5036, #a8d5ba, #2d5036)';
                                        target.style.transform = 'scale(1.15)';
                                        target.style.boxShadow =
                                            '0 10px 25px rgba(45,80,54,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const target =
                                            e.currentTarget as HTMLElement;
                                        target.style.background = '#ffffff';
                                        target.style.transform = 'scale(1)';
                                        target.style.boxShadow =
                                            '0 6px 16px rgba(0,0,0,0.15)';
                                    }}
                                >
                                    <img
                                        src="/images/logos/logo-satudata-indonesia-3.png"
                                        alt="Logo Satudata Indonesia"
                                        style={{
                                            maxHeight: '160px',
                                            maxWidth: '200px',
                                            transition: 'transform 0.4s ease',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </a>
                                <a
                                    href="https://data.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        color: '#2d5036',
                                        textDecoration: 'none',
                                        transition:
                                            'color 0.3s ease, transform 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        const target = e.currentTarget;
                                        target.style.color = '#1b3323';
                                        target.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const target = e.currentTarget;
                                        target.style.color = '#2d5036';
                                        target.style.transform = 'scale(1)';
                                    }}
                                >
                                    Satu Data Indonesia
                                </a>
                            </div>
                        </Col>

                        {/* KEMENTAN */}
                        <Col xs={20} sm={10} md={6} lg={6}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    animation: 'fadeIn 1.2s ease-in-out',
                                }}
                            >
                                <a
                                    href="https://www.pertanian.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        transition: 'all 0.4s ease',
                                        padding: '10px',
                                        borderRadius: '16px',
                                        background: '#ffffff',
                                        boxShadow:
                                            '0 6px 16px rgba(0,0,0,0.15)',
                                        width: '180px',
                                        height: '140px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                    }}
                                    onMouseEnter={(e) => {
                                        const target =
                                            e.currentTarget as HTMLElement;
                                        target.style.background =
                                            'linear-gradient(45deg, #2d5036, #a8d5ba, #2d5036)';
                                        target.style.transform = 'scale(1.15)';
                                        target.style.boxShadow =
                                            '0 10px 25px rgba(45,80,54,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const target =
                                            e.currentTarget as HTMLElement;
                                        target.style.background = '#ffffff';
                                        target.style.transform = 'scale(1)';
                                        target.style.boxShadow =
                                            '0 6px 16px rgba(0,0,0,0.15)';
                                    }}
                                >
                                    <img
                                        src="/images/logos/logo-kementerian-pertanian-2.png"
                                        alt="Logo Kementerian Pertanian"
                                        style={{
                                            maxHeight: '160px',
                                            maxWidth: '200px',
                                            transition: 'transform 0.4s ease',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </a>
                                <a
                                    href="https://www.pertanian.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        color: '#2d5036',
                                        textDecoration: 'none',
                                        transition:
                                            'color 0.3s ease, transform 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        const target = e.currentTarget;
                                        target.style.color = '#1b3323';
                                        target.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const target = e.currentTarget;
                                        target.style.color = '#2d5036';
                                        target.style.transform = 'scale(1)';
                                    }}
                                >
                                    Kementerian Pertanian
                                </a>
                            </div>
                        </Col>

                        {/* GEOSPASIAL */}
                        <Col xs={20} sm={10} md={6} lg={6}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    animation: 'fadeIn 1.4s ease-in-out',
                                }}
                            >
                                <a
                                    href="https://tanahair.indonesia.go.id/portal-web/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        transition: 'all 0.4s ease',
                                        padding: '10px',
                                        borderRadius: '16px',
                                        background: '#ffffff',
                                        boxShadow:
                                            '0 6px 16px rgba(0,0,0,0.15)',
                                        width: '180px',
                                        height: '140px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative',
                                    }}
                                    onMouseEnter={(e) => {
                                        const target =
                                            e.currentTarget as HTMLElement;
                                        target.style.background =
                                            'linear-gradient(45deg, #2d5036, #a8d5ba, #2d5036)';
                                        target.style.transform = 'scale(1.15)';
                                        target.style.boxShadow =
                                            '0 10px 25px rgba(45,80,54,0.3)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const target =
                                            e.currentTarget as HTMLElement;
                                        target.style.background = '#ffffff';
                                        target.style.transform = 'scale(1)';
                                        target.style.boxShadow =
                                            '0 6px 16px rgba(0,0,0,0.15)';
                                    }}
                                >
                                    <img
                                        src="/images/logos/logo-geospasial.png"
                                        alt="Logo Geospasial"
                                        style={{
                                            maxHeight: '120px',
                                            maxWidth: '140px',
                                            transition: 'transform 0.4s ease',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </a>
                                <a
                                    href="https://tanahair.indonesia.go.id/portal-web/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        color: '#2d5036',
                                        textDecoration: 'none',
                                        transition:
                                            'color 0.3s ease, transform 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        const target = e.currentTarget;
                                        target.style.color = '#1b3323';
                                        target.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        const target = e.currentTarget;
                                        target.style.color = '#2d5036';
                                        target.style.transform = 'scale(1)';
                                    }}
                                >
                                    Satu Peta Indonesia
                                </a>
                            </div>
                        </Col>
                    </Row>
                </div>
            </AnimatedSection>

            <style>
                {`
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(15px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  70% {
    transform: translateY(-5px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes pulseText {
  0% {
    transform: scale(1);
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  50% {
    transform: scale(1.02);
    text-shadow: 2px 2px 8px rgba(45,80,54,0.4), 0 0 15px rgba(76, 175, 80, 0.3);
  }
  100% {
    transform: scale(1);
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
}

@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes slideInFromRight {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes floatIn {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  70% {
    transform: translateY(-5px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes textGlow {
  0% {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  100% {
    text-shadow: 3px 3px 6px rgba(45, 80, 54, 0.4), 0 0 10px rgba(76, 175, 80, 0.3);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
    text-shadow: 2px 2px 4px rgba(45,80,54,0.3);
  }
  50% {
    transform: scale(1.03);
    text-shadow: 3px 3px 8px rgba(45, 80, 54, 0.5), 0 0 15px rgba(76, 175, 80, 0.4);
  }
  100% {
    transform: scale(1);
    text-shadow: 2px 2px 4px rgba(45,80,54,0.3);
  }
}

@keyframes slideInFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-30px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
`}
            </style>

            {/* Rest of the original sections */}
            {/* Photo Slider */}
            <AnimatedSection delay={0.6}>
                <div style={{ marginBottom: '30px' }}>
                    <Title
                        level={2}
                        style={{
                            color: '#2d5036',
                            marginBottom: '20px',
                            fontSize: '24px',
                        }}
                    >
                        Galeri Data Pertanian
                    </Title>
                    <Carousel
                        autoplay
                        dotPosition="bottom"
                        style={{ borderRadius: '8px', overflow: 'hidden' }}
                    >
                        {gallery.length > 0
                            ? gallery.map((item, index) => (
                                  <div key={index}>
                                      <div
                                          style={{
                                              height: '300px' /* Reduced height for mobile */,
                                              background: `url(${item.image_path}) center/cover`,
                                              display: 'flex',
                                              alignItems: 'flex-end',
                                              justifyContent: 'center',
                                              position: 'relative',
                                          }}
                                      >
                                          <div
                                              style={{
                                                  position: 'absolute',
                                                  top: 0,
                                                  left: 0,
                                                  right: 0,
                                                  bottom: 0,
                                                  background:
                                                      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                                              }}
                                          ></div>
                                          <div
                                              style={{
                                                  padding: '16px',
                                                  textAlign: 'center',
                                                  color: 'white',
                                                  width: '100%',
                                                  position: 'relative',
                                                  zIndex: 1,
                                              }}
                                          >
                                              <Title
                                                  level={3}
                                                  style={{
                                                      color: 'white',
                                                      marginBottom: '8px',
                                                      fontSize: '20px',
                                                  }}
                                              >
                                                  {item.title}
                                              </Title>
                                              <Paragraph
                                                  style={{
                                                      color: 'white',
                                                      marginBottom: 0,
                                                      fontSize: '14px',
                                                  }}
                                              >
                                                  {item.description}
                                              </Paragraph>
                                          </div>
                                      </div>
                                  </div>
                              ))
                            : // Placeholder carousel items if no gallery data
                              [1, 2, 3].map((item) => (
                                  <div key={`placeholder-${item}`}>
                                      <div
                                          style={{
                                              height: '300px' /* Reduced height for mobile */,
                                              background: '#d0f0e0',
                                              display: 'flex',
                                              alignItems: 'center',
                                              justifyContent: 'center',
                                              flexDirection: 'column',
                                          }}
                                      >
                                          <div
                                              style={{
                                                  fontSize: '48px',
                                                  marginBottom: '16px',
                                              }}
                                          >
                                              🌾
                                          </div>
                                          <Title
                                              level={3}
                                              style={{
                                                  color: '#2d5036',
                                                  marginBottom: '8px',
                                              }}
                                          >
                                              Gambar {item}
                                          </Title>
                                          <Paragraph
                                              style={{ color: '#495057' }}
                                          >
                                              Deskripsi gambar terkait data
                                              pertanian
                                          </Paragraph>
                                      </div>
                                  </div>
                              ))}
                    </Carousel>
                </div>
            </AnimatedSection>

            <Divider style={{ margin: '30px 0' }} />

            <AnimatedSection delay={1.4}>
                <div 
                  style={{ 
                    textAlign: 'center', 
                    padding: '40px 20px',
                    background: "url('https://source.unsplash.com/1600x900/?farming,crops,rice-fields')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    borderRadius: "12px",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 100%)",
                    borderRadius: "12px",
                    zIndex: 1,
                  }}></div>
                  
                  <div style={{ position: "relative", zIndex: 2 }}>
                    <div style={{ 
                      opacity: 0, 
                      animation: 'gentlyFadeIn 1.8s 2.5s both',
                    }}>
                      <Title
                        level={3}
                        style={{
                          color: "#2d5036",
                          marginBottom: "16px",
                          fontSize: "24px",
                          fontWeight: "700",
                          textShadow: "1px 1px 2px rgba(45,80,54,0.3)",
                          animation: 'softGlow 4s infinite alternate'
                        }}
                      >
                        Kembangkan Potensi Pertanian Indonesia Bersama Kami
                      </Title>
                    </div>
                    
                    <div style={{ 
                      opacity: 0, 
                      animation: 'gentlyFadeIn 1.8s 2.8s both', 
                    }}>
                      <Paragraph
                        style={{
                          color: "#495057",
                          maxWidth: "700px",
                          margin: "0 auto 24px",
                          fontSize: "17px",
                          lineHeight: "1.7",
                          fontWeight: "500",
                          textShadow: "1px 1px 2px rgba(73,80,87,0.2)",
                          animation: 'gentleTextFloat 6s infinite ease-in-out'
                        }}
                      >
                        Dapatkan akses ke berbagai data pertanian yang akurat dan terpercaya untuk mendukung pengambilan keputusan dan penelitian Anda.
                      </Paragraph>
                    </div>
                  </div>
                </div>
                
                <style>{`
                  @keyframes gradientBorder {
                    0% {
                      background-position: 0% 50%;
                    }
                    50% {
                      background-position: 100% 50%;
                    }
                    100% {
                      background-position: 0% 50%;
                    }
                  }
                  
                  @keyframes fadeInUp {
                    from {
                      opacity: 0;
                      transform: translateY(30px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  
                  @keyframes typewriter {
                    to {
                      width: 100%;
                    }
                  }
                  
                  @keyframes fadeIn {
                    from {
                      opacity: 0;
                    }
                    to {
                      opacity: 1;
                    }
                  }
                  
                  @keyframes blink {
                    0%, 50% { border-color: #2d5036; }
                    51%, 100% { border-color: transparent; }
                  }
                  
                  @keyframes typewriterDesc {
                    to {
                      width: 100%;
                    }
                  }
                  
                  @keyframes zoomIn {
                    from {
                      opacity: 0;
                      transform: scale(0.8) translateY(20px);
                    }
                    to {
                      opacity: 1;
                      transform: scale(1) translateY(0);
                    }
                  }
                  
                  @keyframes slideInFromLeft {
                    from {
                      opacity: 0;
                      transform: translateX(-50px);
                    }
                    to {
                      opacity: 1;
                      transform: translateX(0);
                    }
                  }
                  
                  @keyframes textGlow {
                    from {
                      text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
                    }
                    to {
                      text-shadow: 3px 3px 6px rgba(45, 80, 54, 0.4), 0 0 10px rgba(76, 175, 80, 0.3);
                    }
                  }
                  
                  @keyframes slideInFromRight {
                    from {
                      opacity: 0;
                      transform: translateX(50px);
                    }
                    to {
                      opacity: 1;
                      transform: translateX(0);
                    }
                  }
                  
                  @keyframes floatIn {
                    0% {
                      opacity: 0;
                      transform: translateY(20px) scale(0.95);
                    }
                    70% {
                      transform: translateY(-5px) scale(1.02);
                    }
                    100% {
                      opacity: 1;
                      transform: translateY(0) scale(1);
                    }
                  }
                  
                  @keyframes gentlyFadeIn {
                    0% {
                      opacity: 0;
                      transform: translateY(15px);
                    }
                    100% {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                  
                  @keyframes softGlow {
                    0% {
                      text-shadow: 1px 1px 3px rgba(45,80,54,0.3);
                    }
                    100% {
                      text-shadow: 2px 2px 6px rgba(45, 80, 54, 0.4), 0 0 8px rgba(76, 175, 80, 0.2);
                    }
                  }
                  
                  @keyframes gentleTextFloat {
                    0%, 100% {
                      transform: translateY(0);
                      text-shadow: 1px 1px 2px rgba(73,80,87, 0.2);
                    }
                    50% {
                      transform: translateY(-2px);
                      text-shadow: 1px 2px 4px rgba(73, 80, 87, 0.3);
                    }
                  }
                `}</style>
            </AnimatedSection>
        </PublicLayout>
    );
};

export default HomePage;
