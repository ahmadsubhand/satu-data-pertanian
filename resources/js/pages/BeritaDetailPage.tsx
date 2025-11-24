import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import React from 'react';

const { Title, Text, Paragraph } = Typography;

interface Berita {
    id: number;
    judul: string;
    tanggal_rilis: string;
    isi_singkat: string | null;
    isi: string;
    foto: string;
    status: number;
    produsen_data: string;
    created_at: string;
    updated_at: string;
}

interface BeritaDetailPageProps extends PageProps {
    berita: Berita;
}

const BeritaDetailPage: React.FC<BeritaDetailPageProps> = ({
    berita,
}) => {
    if (!berita) {
        return (
            <PublicLayout title="Berita Tidak Ditemukan">
                <Head title="Berita Tidak Ditemukan" />
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <Title level={2} style={{ color: '#2d5036' }}>
                        Berita Tidak Ditemukan
                    </Title>
                    <Paragraph>
                        Berita yang Anda cari tidak ditemukan atau telah
                        dihapus.
                    </Paragraph>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout title={`${berita.judul} - Berita Detail`}>
            <Head title={`${berita.judul} - Berita Detail`} />

            <div
                style={{
                    padding: '20px',
                    maxWidth: '1200px',
                    margin: '0 auto',
                }}
            >
                {/* Back Button */}
                <div style={{ marginBottom: '20px' }}>
                    <a
                        href="/berita"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '10px 20px',
                            background: '#f0f0f0',
                            color: '#2d5036',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '14px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#e0e0e0';
                            e.currentTarget.style.transform =
                                'translateY(-2px)';
                            e.currentTarget.style.boxShadow =
                                '0 4px 12px rgba(0,0,0,0.15)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#f0f0f0';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow =
                                '0 2px 8px rgba(0,0,0,0.1)';
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginRight: '8px' }}
                        >
                            <path d="M19 12H5" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Kembali ke Daftar Berita
                    </a>
                </div>

                {/* Hero Section */}
                <div
                    style={{
                        background:
                            'linear-gradient(135deg, #2d5036 0%, #4a7c59 100%)',
                        borderRadius: '16px',
                        padding: '30px',
                        marginBottom: '30px',
                        textAlign: 'center',
                        color: 'white',
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
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}
                    ></div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Title
                            level={1}
                            style={{ color: 'white', marginBottom: '10px' }}
                        >
                            {berita.judul}
                        </Title>
                        <Text style={{ fontSize: '18px', opacity: 0.9 }}>
                            Detail Informasi Berita
                        </Text>
                    </div>
                </div>

                {/* Main Content */}
                <Row gutter={[32, 32]}>
                    {/* Cover and Info Section */}
                    <Col xs={24} lg={8}>
                        <Card
                            style={{
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                                textAlign: 'center',
                            }}
                            bodyStyle={{ padding: '30px' }}
                        >
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    // Using padding-top technique to maintain aspect ratio
                                    // For photos, using 1:1 ratio
                                    paddingTop: '100%', // This means height is 100% of width (square ratio)
                                    overflow: 'hidden',
                                    borderRadius: '16px 16px 0 0',
                                }}
                            >
                                {/* Full portrait cover image */}
                                <img
                                    src={
                                        berita.foto
                                            ? `/storage/berita/${berita.foto}`
                                            : 'https://via.placeholder.com/400x400/8BC34A/FFFFFF?text=Berita'
                                    }
                                    alt={berita.judul}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover', // This ensures the full image is visible
                                        transition: 'all 0.3s ease',
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform =
                                            'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform =
                                            'scale(1)';
                                    }}
                                    onError={(e) => {
                                        const target =
                                            e.target as HTMLImageElement;
                                        target.onerror = null; // Prevents infinite loop
                                        target.src = 'https://via.placeholder.com/400x400/8BC34A/FFFFFF?text=Berita';
                                    }}
                                />

                                {/* Status badge */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '15px',
                                        right: '15px',
                                        background: 'rgba(255, 255, 255, 0.95)',
                                        backdropFilter: 'blur(8px)',
                                        borderRadius: '20px',
                                        padding: '6px 14px',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            color: '#2d5036',
                                        }}
                                    >
                                        {new Date(berita.tanggal_rilis).toLocaleDateString('id-ID')}
                                    </Text>
                                </div>

                                {/* Creative corner decoration */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: '15px',
                                        left: '15px',
                                        width: '40px',
                                        height: '40px',
                                        background:
                                            'linear-gradient(135deg, #4CAF50, #2E7D32)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow:
                                            '0 4px 15px rgba(76, 175, 80, 0.4)',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '18px',
                                            color: 'white',
                                        }}
                                    >
                                        📰
                                    </span>
                                </div>
                            </div>

                            <div
                                style={{
                                    padding: '25px',
                                    background:
                                        'linear-gradient(to bottom, #ffffff, #f8fff8)',
                                    minHeight: '200px',
                                }}
                            >
                                <div style={{ marginBottom: '15px' }}>
                                    <a
                                        href={`/berita/${berita.id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'inherit',
                                        }}
                                    >
                                        <Title
                                            level={4}
                                            style={{
                                                margin: 0,
                                                fontSize: '20px',
                                                color: '#2d5036',
                                                lineHeight: '1.4',
                                                height: 'auto',
                                                overflow: 'hidden',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                display: '-webkit-box',
                                                fontWeight: '600',
                                            }}
                                        >
                                            {berita.judul}
                                        </Title>
                                    </a>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '12px',
                                        flexWrap: 'wrap',
                                        gap: '8px',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '8px',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: '12px',
                                                background: '#f5f5f5',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                            }}
                                        >
                                            <strong>📅</strong>{' '}
                                            {new Date(berita.tanggal_rilis).toLocaleDateString('id-ID')}
                                        </Text>
                                        <Text
                                            type="secondary"
                                            style={{
                                                fontSize: '12px',
                                                background: '#f5f5f5',
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                            }}
                                        >
                                            <strong>👤</strong>{' '}
                                            {berita.produsen_data.substring(0, 15)}
                                            ...
                                        </Text>
                                    </div>
                                </div>

                                {berita.isi_singkat && (
                                    <div style={{ marginBottom: '12px' }}>
                                        <Text
                                            style={{
                                                fontSize: '13px',
                                                color: '#666',
                                                lineHeight: '1.5',
                                                maxHeight: '60px',
                                                overflow: 'hidden',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                fontStyle: 'italic',
                                                borderLeft: '3px solid #4CAF50',
                                                paddingLeft: '10px',
                                            }}
                                        >
                                            <strong>Ringkasan:</strong>{' '}
                                            {berita.isi_singkat}
                                        </Text>
                                    </div>
                                )}

                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginTop: '20px',
                                    paddingTop: '20px',
                                    borderTop: '2px dashed #a8d5ba',
                                }}>
                                    <a
                                        href="/berita"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: '10px 20px',
                                            background: '#2d5036',
                                            color: 'white',
                                            textDecoration: 'none',
                                            borderRadius: '8px',
                                            fontSize: '15px',
                                            fontWeight: '600',
                                            transition: 'all 0.3s ease',
                                            boxShadow: '0 4px 15px rgba(45, 80, 54, 0.3)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#1e3a25';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 80, 54, 0.4)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = '#2d5036';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(45, 80, 54, 0.3)';
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{ marginRight: '8px' }}
                                        >
                                            <path d="M19 12H5m14 0l-5 5m5-5l-5-5" />
                                        </svg>
                                        Lihat Semua Berita
                                    </a>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* Content Section */}
                    <Col xs={24} lg={16}>
                        <Card
                            style={{
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                overflow: 'hidden',
                                border: 'none',
                            }}
                            bodyStyle={{
                                padding: '40px',
                                background: 'linear-gradient(to bottom, #ffffff, #f8fff8)',
                            }}
                        >
                            <div style={{ marginBottom: '24px' }}>
                                <Space size="middle" style={{ marginBottom: '16px' }}>
                                    <Tag color="#4CAF50" style={{ fontSize: '14px', padding: '8px 16px' }}>
                                        Berita
                                    </Tag>
                                    <Tag color="#2196F3" style={{ fontSize: '14px', padding: '8px 16px' }}>
                                        {new Date(berita.tanggal_rilis).toLocaleDateString('id-ID')}
                                    </Tag>
                                    <Tag color="#FF9800" style={{ fontSize: '14px', padding: '8px 16px' }}>
                                        {berita.produsen_data}
                                    </Tag>
                                </Space>
                            </div>

                            <div
                                style={{
                                    fontSize: '18px',
                                    lineHeight: '1.8',
                                    color: '#333',
                                    marginBottom: '32px',
                                }}
                                dangerouslySetInnerHTML={{ __html: berita.isi }}
                            />

                            <Divider style={{ borderColor: '#a8d5ba', margin: '40px 0' }} />

                            <div style={{ marginTop: '30px' }}>
                                <Title level={4} style={{ color: '#2d5036', marginBottom: '16px' }}>
                                    Metadata Berita
                                </Title>
                                <Row gutter={[16, 16]}>
                                    <Col xs={24} sm={12}>
                                        <div style={{ marginBottom: '12px' }}>
                                            <Text strong style={{ color: '#4a7c59' }}>
                                                ID Berita:
                                            </Text>
                                            <br />
                                            <Text>{berita.id}</Text>
                                        </div>
                                        <div style={{ marginBottom: '12px' }}>
                                            <Text strong style={{ color: '#4a7c59' }}>
                                                Tanggal Rilis:
                                            </Text>
                                            <br />
                                            <Text>{new Date(berita.tanggal_rilis).toLocaleDateString('id-ID')}</Text>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={12}>
                                        <div style={{ marginBottom: '12px' }}>
                                            <Text strong style={{ color: '#4a7c59' }}>
                                                Produsen Data:
                                            </Text>
                                            <br />
                                            <Text>{berita.produsen_data}</Text>
                                        </div>
                                        <div style={{ marginBottom: '12px' }}>
                                            <Text strong style={{ color: '#4a7c59' }}>
                                                Status:
                                            </Text>
                                            <br />
                                            <Text>{berita.status === 1 ? 'Aktif' : 'Tidak Aktif'}</Text>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </PublicLayout>
    );
};

export default BeritaDetailPage;