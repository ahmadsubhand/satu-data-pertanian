import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Button, Card, Col, Row, Space, Typography } from 'antd';
import { Instagram } from 'lucide-react';
import React from 'react';

const { Title, Text } = Typography;

interface InstagramMediaPageProps extends PageProps {
    // Tidak perlu props dari backend karena ini hanya tampilan
}

const InstagramMediaPage: React.FC<InstagramMediaPageProps> = ({}) => {
    return (
        <PublicLayout title="Instagram Media - Satudata Pertanian">
            <Head title="Instagram Media - Satudata Pertanian" />

            <div
                style={{
                    padding: '20px',
                    maxWidth: '1400px',
                    margin: '0 auto',
                    background:
                        'linear-gradient(135deg, #f8f9fa 0%, #e8f5e9 100%)',
                    minHeight: 'calc(100vh - 200px)',
                    borderRadius: '16px',
                    marginTop: '20px',
                    marginBottom: '20px',
                }}
            >
                {/* Hero Section */}
                <div
                    style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        background:
                            'linear-gradient(135deg, #2d5036 0%, #4a7c59 100%)',
                        borderRadius: '16px',
                        marginBottom: '40px',
                        position: 'relative',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                        color: 'white',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    ></div>

                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <Title
                            level={1}
                            style={{
                                color: '#ffffff',
                                marginBottom: '16px',
                                fontSize: '40px',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                            }}
                        >
                            📱 Instagram Pusdatin
                        </Title>
                        <Text
                            style={{
                                fontSize: '20px',
                                color: '#e8f5e9',
                                display: 'block',
                                maxWidth: '800px',
                                margin: '0 auto 24px',
                                lineHeight: '1.6',
                            }}
                        >
                            Ikuti kami di Instagram untuk informasi terkini
                            seputar data dan statistik pertanian Indonesia
                        </Text>
                    </div>
                </div>

                <Row
                    gutter={[40, 40]}
                    justify="center"
                    style={{ marginBottom: '40px' }}
                >
                    {/* Instagram Mockup with iPhone 17 */}
                    <Col
                        xs={24}
                        md={12}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                width: '280px',
                                height: '560px',
                                perspective: '1000px',
                                animation: 'floating 4s ease-in-out infinite',
                            }}
                        >
                            {/* Animated glow effect around the iPhone */}
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-10px',
                                    left: '-10px',
                                    right: '-10px',
                                    bottom: '-10px',
                                    borderRadius:
                                        '51px' /* Slightly more than the inner element */,
                                    background:
                                        'linear-gradient(45deg, #2d5036, #4a7c59, #8bc34a, #a8d5ba, #4a7c59, #2d5036)',
                                    backgroundSize: '400% 400%',
                                    animation: 'gradient 3s ease infinite',
                                    zIndex: 1,
                                    filter: 'blur(8px)',
                                    opacity: '0.6',
                                }}
                            ></div>

                            {/* iPhone 17 Mockup */}
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    background:
                                        'linear-gradient(145deg, #f0f0f0, #d0d0d0)',
                                    borderRadius:
                                        '46px' /* Increased for iPhone 17 style */,
                                    padding:
                                        '0px' /* No padding to avoid white borders */,
                                    boxShadow:
                                        '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.5)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transform: 'rotate(-5deg)',
                                    border: '14px solid #1a1a1a' /* More realistic black border */,
                                    overflow: 'hidden',
                                    zIndex: 2,
                                }}
                            >
                                {/* Screen with Instagram content - now directly the image */}
                                <img
                                    src="/images/logos/Instagram_Pusdatin.jpg"
                                    alt="Instagram Pusdatin Content"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                />
                            </div>
                        </div>
                    </Col>

                    {/* Content Section */}
                    <Col
                        xs={24}
                        md={12}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Card
                            style={{
                                background:
                                    'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 249, 0.9) 100%)',
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                                border: 'none',
                                backdropFilter: 'blur(10px)',
                                minHeight: '500px',
                                padding: '30px',
                            }}
                            bodyStyle={{ padding: '30px' }}
                        >
                            <Title
                                level={2}
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '24px',
                                    fontSize: '28px',
                                }}
                            >
                                Terhubung dengan Pusdatin
                            </Title>

                            <Text
                                style={{
                                    fontSize: '16px',
                                    lineHeight: '1.8',
                                    color: '#495057',
                                    marginBottom: '24px',
                                    display: 'block',
                                }}
                            >
                                Ikuti akun Instagram resmi Pusat Data dan Sistem
                                Informasi Pertanian (Pusdatin) untuk mendapatkan
                                informasi terkini tentang data dan statistik
                                pertanian Indonesia. Dapatkan visualisasi data
                                yang menarik, infografis, dan update terbaru
                                dari Kementerian Pertanian.
                            </Text>

                            <div style={{ marginBottom: '24px' }}>
                                <Title
                                    level={4}
                                    style={{
                                        color: '#2d5036',
                                        marginBottom: '12px',
                                    }}
                                >
                                    Apa yang akan Anda temukan:
                                </Title>
                                <ul
                                    style={{
                                        paddingLeft: '20px',
                                        color: '#495057',
                                        lineHeight: '1.8',
                                    }}
                                >
                                    <li>
                                        Update terbaru tentang kebijakan
                                        pertanian
                                    </li>
                                    <li>Visualisasi data yang menarik</li>
                                    <li>
                                        Infografis menarik tentang statistik
                                        pertanian
                                    </li>
                                    <li>
                                        Berita dan informasi seputar data
                                        pertanian
                                    </li>
                                    <li>
                                        Penjelasan tentang kebijakan Satu Data
                                        Indonesia
                                    </li>
                                </ul>
                            </div>

                            <Space
                                direction="vertical"
                                size="middle"
                                style={{ width: '100%' }}
                            >
                                <Button
                                    type="primary"
                                    size="large"
                                    style={{
                                        background:
                                            'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)',
                                        borderColor: 'transparent',
                                        height: '50px',
                                        fontWeight: 'bold',
                                        fontSize: '16px',
                                        borderRadius: '8px',
                                    }}
                                    onClick={() =>
                                        window.open(
                                            'https://www.instagram.com/pusdatin_kementan?igsh=bmM0cjVicG1vOHk3',
                                            '_blank',
                                        )
                                    }
                                >
                                    <Instagram
                                        size={20}
                                        style={{ marginRight: '10px' }}
                                    />
                                    Kunjungi Instagram Pusdatin
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                </Row>

                {/* Stats Section */}
                <div
                    style={{
                        textAlign: 'center',
                        marginTop: '60px',
                        marginBottom: '40px',
                    }}
                >
                    <Title
                        level={2}
                        style={{
                            color: '#2d5036',
                            marginBottom: '40px',
                            fontSize: '32px',
                        }}
                    >
                        Kenapa Mengikuti Kami di Instagram?
                    </Title>

                    <Row gutter={[30, 30]} justify="center">
                        <Col xs={24} sm={12} md={6}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    background:
                                        'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                                    borderRadius: '12px',
                                    boxShadow:
                                        '0 6px 16px rgba(45, 80, 54, 0.15)',
                                    transition:
                                        'transform 0.3s ease, box-shadow 0.3s ease',
                                    height: '100%',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(-10px)';
                                    e.currentTarget.style.boxShadow =
                                        '0 12px 24px rgba(45, 80, 54, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(0)';
                                    e.currentTarget.style.boxShadow =
                                        '0 6px 16px rgba(45, 80, 54, 0.15)';
                                }}
                            >
                                <div style={{ padding: '20px' }}>
                                    <div
                                        style={{
                                            fontSize: '32px',
                                            fontWeight: 'bold',
                                            color: '#2d5036',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        📊
                                    </div>
                                    <Text
                                        strong
                                        style={{
                                            color: '#4a7c59',
                                            fontSize: '16px',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Data Visual
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#6c757d',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Data pertanian dalam bentuk visual
                                        menarik
                                    </Text>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    background:
                                        'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                                    borderRadius: '12px',
                                    boxShadow:
                                        '0 6px 16px rgba(45, 80, 54, 0.15)',
                                    transition:
                                        'transform 0.3s ease, box-shadow 0.3s ease',
                                    height: '100%',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(-10px)';
                                    e.currentTarget.style.boxShadow =
                                        '0 12px 24px rgba(45, 80, 54, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(0)';
                                    e.currentTarget.style.boxShadow =
                                        '0 6px 16px rgba(45, 80, 54, 0.15)';
                                }}
                            >
                                <div style={{ padding: '20px' }}>
                                    <div
                                        style={{
                                            fontSize: '32px',
                                            fontWeight: 'bold',
                                            color: '#2d5036',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        📈
                                    </div>
                                    <Text
                                        strong
                                        style={{
                                            color: '#4a7c59',
                                            fontSize: '16px',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Informasi Terkini
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#6c757d',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Update terbaru seputar pertanian
                                    </Text>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    background:
                                        'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                                    borderRadius: '12px',
                                    boxShadow:
                                        '0 6px 16px rgba(45, 80, 54, 0.15)',
                                    transition:
                                        'transform 0.3s ease, box-shadow 0.3s ease',
                                    height: '100%',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(-10px)';
                                    e.currentTarget.style.boxShadow =
                                        '0 12px 24px rgba(45, 80, 54, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(0)';
                                    e.currentTarget.style.boxShadow =
                                        '0 6px 16px rgba(45, 80, 54, 0.15)';
                                }}
                            >
                                <div style={{ padding: '20px' }}>
                                    <div
                                        style={{
                                            fontSize: '32px',
                                            fontWeight: 'bold',
                                            color: '#2d5036',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        📱
                                    </div>
                                    <Text
                                        strong
                                        style={{
                                            color: '#4a7c59',
                                            fontSize: '16px',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Interaktif
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#6c757d',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Konten menarik dan interaktif
                                    </Text>
                                </div>
                            </Card>
                        </Col>

                        <Col xs={24} sm={12} md={6}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    background:
                                        'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                                    borderRadius: '12px',
                                    boxShadow:
                                        '0 6px 16px rgba(45, 80, 54, 0.15)',
                                    transition:
                                        'transform 0.3s ease, box-shadow 0.3s ease',
                                    height: '100%',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(-10px)';
                                    e.currentTarget.style.boxShadow =
                                        '0 12px 24px rgba(45, 80, 54, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform =
                                        'translateY(0)';
                                    e.currentTarget.style.boxShadow =
                                        '0 6px 16px rgba(45, 80, 54, 0.15)';
                                }}
                            >
                                <div style={{ padding: '20px' }}>
                                    <div
                                        style={{
                                            fontSize: '32px',
                                            fontWeight: 'bold',
                                            color: '#2d5036',
                                            marginBottom: '12px',
                                        }}
                                    >
                                        🌾
                                    </div>
                                    <Text
                                        strong
                                        style={{
                                            color: '#4a7c59',
                                            fontSize: '16px',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Fokus Pertanian
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#6c757d',
                                            fontSize: '14px',
                                        }}
                                    >
                                        Khusus informasi seputar pertanian
                                    </Text>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

            <style>{`
                @keyframes gradient {
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

                @keyframes floating {
                    0% {
                        transform: rotate(-5deg) translateY(0px);
                    }
                    50% {
                        transform: rotate(-5deg) translateY(-10px);
                    }
                    100% {
                        transform: rotate(-5deg) translateY(0px);
                    }
                }
            `}</style>
        </PublicLayout>
    );
};

export default InstagramMediaPage;
