import AnimatedCard from '@/components/AnimatedCard';
import AnimatedSection from '@/components/AnimatedSection';
import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
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
import React, { useEffect, useRef } from 'react';

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
    datasetsCount?: number;
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
    datasetsCount = 0,
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
    const datasetCountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const animateCounter = (element: HTMLElement, start: number, end: number, duration: number) => {
            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const currentValue = Math.floor(progress * (end - start) + start);
                element.textContent = currentValue.toString();

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    element.textContent = end.toString();
                }
            };
            window.requestAnimationFrame(step);
        };

        // Animate the dataset counter when component mounts
        if (datasetCountRef.current && datasetsCount > 0) {
            const element = datasetCountRef.current;
            animateCounter(element, 0, datasetsCount, 2000); // Animate from 0 to the count over 2 seconds
        }
    }, [datasetsCount]);
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
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
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
                        <div
                            style={{
                                opacity: 0,
                                animation: 'floatUp 1.8s 1.2s both',
                            }}
                        >
                            <Title
                                level={1}
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '12px',
                                    fontSize: '28px',
                                    fontFamily: 'inherit',
                                    fontWeight: '700',
                                    textShadow:
                                        '2px 2px 8px rgba(45,80,54,0.3)',
                                }}
                            >
                                Selamat Datang di Satu Data Pertanian
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
                        <div
                            style={{
                                position: 'relative',
                                display: 'inline-block',
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    left: '-5px',
                                    right: '-5px',
                                    bottom: '-5px',
                                    background:
                                        'linear-gradient(45deg, #2d5036, #4CAF50, #8BC34A, #FFC107, #FF9800, #2d5036)',
                                    backgroundSize: '300% 300%',
                                    borderRadius: '8px',
                                    zIndex: -1,
                                    animation:
                                        'gradientBorder 3s ease infinite',
                                }}
                            ></div>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-3px',
                                    left: '-3px',
                                    right: '-3px',
                                    bottom: '-3px',
                                    borderRadius: '6px',
                                    background: 'white',
                                    zIndex: -1,
                                }}
                            ></div>
                            <div
                                style={{
                                    opacity: 0,
                                    animation: 'floatIn 2s 1.8s both',
                                }}
                            >
                                Portal satu data untuk sektor pertanian yang
                                menyediakan informasi data statistik,
                                geospasial, dan publikasi terkait pembangunan
                                pertanian di Indonesia.
                            </div>
                        </div>
                    </Paragraph>
                </div>
            </AnimatedSection>



            {/* Dataset and Publications Section from Satudata */}
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
                        Dataset dan Publikasi dari Satu Data
                    </Title>
                    <Row gutter={[24, 24]}>
                        {/* Dataset Section - Left Side with Smooth Animation */}
                        <Col xs={24} sm={24} md={12}>
                            <div
                                style={{
                                    padding: '24px',
                                    border: '1px solid #e9ecef',
                                    borderRadius: '12px',
                                    backgroundColor: 'white',
                                    height: '100%',
                                    transition:
                                        'transform 0.3s ease, box-shadow 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(-5px)';
                                    e.currentTarget.style.boxShadow =
                                        '0 8px 24px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(0)';
                                    e.currentTarget.style.boxShadow =
                                        '0 4px 12px rgba(0,0,0,0.05)';
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <h3
                                        style={{
                                            color: '#2d5036',
                                            fontSize: '20px',
                                            marginBottom: '10px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Dataset Tersedia
                                    </h3>
                                    <div
                                        ref={datasetCountRef}
                                        style={{
                                            fontSize: '36px',
                                            color: '#2d5036',
                                            fontWeight: 'bold',
                                            marginTop: '10px',
                                            marginBottom: '8px',
                                            transition: 'color 0.3s ease',
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.color =
                                                '#1e3a25')
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.color =
                                                '#2d5036')
                                        }
                                    >
                                        {datasetsCount || 0}
                                    </div>
                                    <p
                                        style={{
                                            fontSize: '14px',
                                            color: '#6c757d',
                                            lineHeight: '1.5',
                                        }}
                                    >
                                        Dataset yang tersedia dari Kementerian
                                        Pertanian
                                    </p>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: '20px',
                                        minHeight: '80px',
                                        maxHeight: '100px',
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            background:
                                                'linear-gradient(135deg, #2d5036 0%, #a8d5ba 100%)',
                                            borderRadius: '16px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            color: 'white',
                                            fontSize: '32px',
                                            transition: 'all 0.6s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'rotateY(10deg) scale(1.1)';
                                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        📊
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                                    <Link
                                        href="/dataset"
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: '#2d5036',
                                            color: 'white',
                                            textDecoration: 'none',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            display: 'inline-block',
                                            transition:
                                                'background-color 0.3s ease, transform 0.2s ease',
                                            border: 'none',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                '#1e3a25';
                                            e.currentTarget.style.transform =
                                                'scale(1.02)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                '#2d5036';
                                            e.currentTarget.style.transform =
                                                'scale(1)';
                                        }}
                                    >
                                        Lihat Semua Dataset
                                    </Link>
                                </div>
                            </div>
                        </Col>

                        {/* Publication Section - Right Side with Smooth Auto Scrolling Animation */}
                        <Col xs={24} sm={24} md={12}>
                            <div
                                style={{
                                    padding: '24px',
                                    border: '1px solid #e9ecef',
                                    borderRadius: '12px',
                                    backgroundColor: 'white',
                                    height: '100%',
                                    transition:
                                        'transform 0.3s ease, box-shadow 0.3s ease',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(-5px)';
                                    e.currentTarget.style.boxShadow =
                                        '0 8px 24px rgba(0,0,0,0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(0)';
                                    e.currentTarget.style.boxShadow =
                                        '0 4px 12px rgba(0,0,0,0.05)';
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: 'center',
                                        marginBottom: '16px',
                                    }}
                                >
                                    <h3
                                        style={{
                                            color: '#2d5036',
                                            fontSize: '20px',
                                            marginBottom: '10px',
                                            fontWeight: '600',
                                        }}
                                    >
                                        Publikasi Terbaru
                                    </h3>
                                </div>

                                {/* Publications Container with different animation */}
                                <div
                                    style={{
                                        minHeight: '120px',
                                        maxHeight: '140px',
                                        overflow: 'hidden',
                                        position: 'relative',
                                        marginBottom: '20px',
                                        flex: 1,
                                    }}
                                >
                                    <div
                                        style={{
                                            height: '100%',
                                            overflowY: 'auto',
                                            scrollbarWidth: 'none',
                                            msOverflowStyle: 'none',
                                            position: 'relative',
                                        }}
                                        className="publication-scroller"
                                    >
                                        <style>{`
                                            .publication-scroller::-webkit-scrollbar {
                                                display: none;
                                            }

                                            @keyframes smoothScroll {
                                                0% {
                                                    transform: translateY(0);
                                                }
                                                100% {
                                                    transform: translateY(-100%);
                                                }
                                            }

                                            .publication-container {
                                                animation: smoothScroll 15s linear infinite;
                                            }
                                        `}</style>
                                        <div className="publication-container">
                                            {[
                                                ...satudataPublications,
                                                ...satudataPublications,
                                            ]
                                                .slice(0, 12)
                                                .map((pub, index) => (
                                                    <div
                                                        key={`pub-${index}`}
                                                        style={{
                                                            padding: '8px 0',
                                                            borderBottom:
                                                                index < 11
                                                                    ? '1px solid #f0f0f0'
                                                                    : 'none',
                                                            fontSize: '14px',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontWeight:
                                                                    '500',
                                                                color: '#2d5036',
                                                                whiteSpace:
                                                                    'nowrap',
                                                                overflow:
                                                                    'hidden',
                                                                textOverflow:
                                                                    'ellipsis',
                                                            }}
                                                            title={
                                                                pub.judul_pub
                                                            }
                                                        >
                                                            {pub.judul_pub}
                                                        </div>
                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    '12px',
                                                                color: '#6c757d',
                                                                marginTop:
                                                                    '4px',
                                                            }}
                                                        >
                                                            {pub.ket_pub
                                                                ? pub.ket_pub.substring(
                                                                      0,
                                                                      50,
                                                                  ) + '...'
                                                                : 'Deskripsi tidak tersedia'}
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'center', marginTop: 'auto' }}>
                                    <Link
                                        href="/publikasi"
                                        style={{
                                            padding: '10px 20px',
                                            backgroundColor: '#2d5036',
                                            color: 'white',
                                            textDecoration: 'none',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            display: 'inline-block',
                                            transition:
                                                'background-color 0.3s ease, transform 0.2s ease',
                                            border: 'none',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                '#1e3a25';
                                            e.currentTarget.style.transform =
                                                'scale(1.02)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                                '#2d5036';
                                            e.currentTarget.style.transform =
                                                'scale(1)';
                                        }}
                                    >
                                        Lihat Semua Publikasi
                                    </Link>
                                </div>
                            </div>
                        </Col>
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
                                    href="https://onemap.big.go.id"
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
                                        src="/images/logos/logo-onemap.png"
                                        alt="Logo OneMap"
                                        style={{
                                            maxHeight: '120px',
                                            maxWidth: '140px',
                                            transition: 'transform 0.4s ease',
                                            objectFit: 'contain',
                                        }}
                                    />
                                </a>
                                <a
                                    href="https://onemap.big.go.id"
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
                                    Kebijakan Satu Peta
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

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
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
                        {/* SDI Image 1 */}
                        <div>
                            <div
                                style={{
                                    height: '300px',
                                    background: `url('/storage/publikasi/SDI1-Landscape.webp') center/cover`,
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                                onError={(e) => {
                                    const target = e.target as HTMLElement;
                                    target.style.background = '#d0f0e0';
                                    target.innerHTML = '<img src="https://placehold.co/800x300/e8f5e9/2d5036?text=Gambar+Tidak+Tersedia" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" />';
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
                                        Pemenuhan Prinsip SDI untuk Data Prioritas 2023 dan Kode Refrensi Komoditas Pertanian, 5 Mei 2023
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: 'white',
                                            marginBottom: 0,
                                            fontSize: '14px',
                                        }}
                                    >
                                        Prinsip SDI pada Data Prioritas
                                    </Paragraph>
                                </div>
                            </div>
                        </div>

                        {/* SDI Image 2 */}
                        <div>
                            <div
                                style={{
                                    height: '300px',
                                    background: `url('/storage/publikasi/SDI3-Landscape.webp') center/cover`,
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                                onError={(e) => {
                                    const target = e.target as HTMLElement;
                                    target.style.background = '#d0f0e0';
                                    target.innerHTML = '<img src="https://placehold.co/800x300/e8f5e9/2d5036?text=Gambar+Tidak+Tersedia" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" />';
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
                                        Interoperabilitas Data Melalui Aplikasi Sistem Penghubung Layanan Pemerintah (SPLP) Kominfo, 4 Agustus 2023
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: 'white',
                                            marginBottom: 0,
                                            fontSize: '14px',
                                        }}
                                    >
                                        Interoperabilitas Data melalui SPLP
                                    </Paragraph>
                                </div>
                            </div>
                        </div>

                        {/* SDI Image 3 */}
                        <div>
                            <div
                                style={{
                                    height: '300px',
                                    background: `url('/storage/publikasi/SDI4-Landscape.webp') center/cover`,
                                    display: 'flex',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                                onError={(e) => {
                                    const target = e.target as HTMLElement;
                                    target.style.background = '#d0f0e0';
                                    target.innerHTML = '<img src="https://placehold.co/800x300/e8f5e9/2d5036?text=Gambar+Tidak+Tersedia" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;" />';
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
                                        Pemenuhan Prinsip SDI Data Spasial serta Data Statistik dan Penyepakatan Berbagi Data Kementan dengan Pemerintah Provinsi Jawa Barat, 27 Juni 2023
                                    </Title>
                                    <Paragraph
                                        style={{
                                            color: 'white',
                                            marginBottom: 0,
                                            fontSize: '14px',
                                        }}
                                    >
                                        Implementasi SDI Data Spasial dan Statistik
                                    </Paragraph>
                                </div>
                            </div>
                        </div>
                    </Carousel>
                </div>
            </AnimatedSection>

            <Divider style={{ margin: '30px 0' }} />

            <AnimatedSection delay={1.4}>
                <div
                    style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        background:
                            "url('https://source.unsplash.com/1600x900/?farming,crops,rice-fields')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '12px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                        position: 'relative',
                        overflow: 'hidden',
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
                                'linear-gradient(to bottom, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.7) 100%)',
                            borderRadius: '12px',
                            zIndex: 1,
                        }}
                    ></div>

                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <div
                            style={{
                                opacity: 0,
                                animation: 'gentlyFadeIn 1.8s 2.5s both',
                            }}
                        >
                            <Title
                                level={3}
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '16px',
                                    fontSize: '24px',
                                    fontWeight: '700',
                                    textShadow:
                                        '1px 1px 2px rgba(45,80,54,0.3)',
                                    animation:
                                        'fadeInScale 1.5s ease-out forwards',
                                }}
                            >
                                Kembangkan Potensi Pertanian Indonesia Bersama
                                Kami
                            </Title>
                        </div>

                        <div
                            style={{
                                opacity: 0,
                                animation: 'gentlyFadeIn 1.8s 2.8s both',
                            }}
                        >
                            <Paragraph
                                style={{
                                    color: '#495057',
                                    maxWidth: '700px',
                                    margin: '0 auto 24px',
                                    fontSize: '17px',
                                    lineHeight: '1.7',
                                    fontWeight: '500',
                                    textShadow:
                                        '1px 1px 2px rgba(73,80,87,0.2)',
                                    animation:
                                        'gentleTextFloat 6s infinite ease-in-out',
                                }}
                            >
                                Dapatkan akses ke berbagai data pertanian yang
                                akurat dan terpercaya untuk mendukung
                                pengambilan keputusan dan penelitian Anda.
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
                  
                  @keyframes typewriter {
                    0% {
                      opacity: 0;
                      width: 0;
                      overflow: hidden;
                    }
                    100% {
                      opacity: 1;
                      width: 100%;
                      overflow: visible;
                    }
                  }
                  
                  @keyframes blink {
                    0%, 50% { 
                      border-right: 2px solid #2d5036; 
                    }
                    51%, 100% { 
                      border-right: 2px solid transparent; 
                    }
                  }
                `}</style>

                <style>{`
                  /* Override the welcome text animation to use typewriter effect */
                  div[style*="floatUp 1.8s 1.2s both"] {
                    opacity: 0 !important;
                    animation: typewriter 4s steps(31) 1s both !important;
                    overflow: hidden !important;
                    white-space: nowrap !important;
                    border-right: 2px solid #2d5036 !important;
                    width: 0 !important;
                  }
                  
                  div[style*="floatUp 1.8s 1.2s both"] h1 {
                    animation: none !important;
                    display: inline-block !important;
                    margin: 0 !important;
                    padding: 0 !important;
                  }
                  
                  @keyframes fadeInScale {
                    0% {
                      opacity: 0;
                      transform: scale(0.8);
                    }
                    100% {
                      opacity: 1;
                      transform: scale(1);
                    }
                  }
                `}</style>
            </AnimatedSection>
        </PublicLayout>
    );
};

export default HomePage;
