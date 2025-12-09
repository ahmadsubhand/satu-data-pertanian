import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Input, Row, Typography, Tag, Space } from 'antd';
import React, { useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

// Client-side download counter functions
const getDownloadCount = (type: string, id: number): number => {
    if (typeof window === 'undefined') return 0;

    const key = `download_count_${type}_${id}`;
    const count = localStorage.getItem(key);
    return count ? parseInt(count, 10) : 0;
};

const incrementDownloadCount = (type: string, id: number): number => {
    if (typeof window === 'undefined') return 0;

    const currentCount = getDownloadCount(type, id);
    const newCount = currentCount + 1;
    const key = `download_count_${type}_${id}`;
    localStorage.setItem(key, newCount.toString());
    return newCount;
};

interface Berita {
    id: number;
    judul: string;
    tanggal_rilis: string;
    isi_singkat: string | null;
    isi: string;
    foto: string;
    file: string | null;
    status: number;
    produsen_data: string;
    created_at: string;
    updated_at: string;
}

interface BeritaPageProps extends PageProps {
    berita: Berita[];
}

const BeritaPage: React.FC<BeritaPageProps> = ({ berita = [] }) => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Filter data based on search
    const allFilteredData = berita.filter(
        (ber) =>
            ber.judul.toLowerCase().includes(searchText.toLowerCase()) ||
            (ber.isi_singkat &&
                ber.isi_singkat
                    .toLowerCase()
                    .includes(searchText.toLowerCase())) ||
            ber.produsen_data.toLowerCase().includes(searchText.toLowerCase()),
    );

    // Hitung total halaman berdasarkan data yang difilter
    const totalPages = Math.ceil(allFilteredData.length / itemsPerPage);

    // Ambil data untuk halaman saat ini
    const filteredData = allFilteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    return (
        <PublicLayout title="Berita - Satu Data Pertanian">
            <Head title="Berita - Satu Data Pertanian" />

            <div
                style={{
                    padding: '20px',
                    maxWidth: '1400px',
                    margin: '0 auto',
                }}
            >
                {/* Hero Section */}
                <div
                    style={{
                        background:
                            'linear-gradient(135deg, #2d5036 0%, #4a7c59 100%)',
                        borderRadius: '16px',
                        padding: '40px 30px',
                        marginBottom: '30px',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        opacity: 0.1,
                    }}></div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <Title
                            level={1}
                            style={{
                                color: '#ffffff',
                                marginBottom: '12px',
                                fontSize: '32px',
                                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                            }}
                        >
                            📰 Berita Satu Data Pertanian
                        </Title>
                        <Paragraph
                            style={{
                                fontSize: '18px',
                                color: '#e8f5e9',
                                maxWidth: '800px',
                                margin: '0 auto 16px',
                                lineHeight: '1.6',
                            }}
                        >
                            Temukan berbagai berita terkini dari Kementerian
                            Pertanian yang menyajikan informasi dan perkembangan terbaru
                            tentang sektor pertanian di Indonesia.
                        </Paragraph>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
                            <Tag color="#4a7c59" style={{ fontSize: '14px', padding: '8px 16px' }}>
                                {berita.length} Total Berita
                            </Tag>
                            <Tag color="#2d5036" style={{ fontSize: '14px', padding: '8px 16px' }}>
                                Terbaru 2025
                            </Tag>
                        </div>
                    </div>
                </div>

                {/* Search and Filters Section */}
                <div
                    style={{
                        marginBottom: '24px',
                        padding: '24px',
                        background: 'linear-gradient(to right, #f8f9fa, #e8f5e9)',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    }}
                >
                    <Row gutter={[24, 24]} align="middle">
                        <Col xs={24} md={18}>
                            <Search
                                placeholder="🔍 Cari berita (judul, isi singkat, produsen)..."
                                onSearch={(value) => setSearchText(value)}
                                enterButton="Cari"
                                size="large"
                                style={{ width: '100%' }}
                                allowClear
                            />
                        </Col>
                        <Col xs={24} md={6}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #a8d5ba, #8bc34a)',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                }}
                            >
                                <Text style={{
                                    color: '#2d5036',
                                    fontSize: '16px',
                                    fontWeight: '600'
                                }}>
                                    {filteredData.length} dari {berita.length} berita
                                </Text>
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* Stats Section */}
                <div style={{ marginBottom: '30px' }}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} sm={12} md={6}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                                    borderRadius: '12px',
                                    boxShadow: '0 6px 16px rgba(45, 80, 54, 0.15)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(45, 80, 54, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(45, 80, 54, 0.15)';
                                }}
                            >
                                <div style={{ padding: '16px' }}>
                                    <div style={{
                                        fontSize: '28px',
                                        fontWeight: 'bold',
                                        color: '#2d5036',
                                        marginBottom: '8px'
                                    }}>
                                        {berita.length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Total Berita</Text>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                                    borderRadius: '12px',
                                    boxShadow: '0 6px 16px rgba(76, 175, 80, 0.15)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(76, 175, 80, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.15)';
                                }}
                            >
                                <div style={{ padding: '16px' }}>
                                    <div style={{
                                        fontSize: '28px',
                                        fontWeight: 'bold',
                                        color: '#2d5036',
                                        marginBottom: '8px'
                                    }}>
                                        {berita.filter(b => new Date(b.tanggal_rilis) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Berita Baru</Text>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                                    borderRadius: '12px',
                                    boxShadow: '0 6px 16px rgba(139, 195, 74, 0.15)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 195, 74, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 195, 74, 0.15)';
                                }}
                            >
                                <div style={{ padding: '16px' }}>
                                    <div style={{
                                        fontSize: '28px',
                                        fontWeight: 'bold',
                                        color: '#2d5036',
                                        marginBottom: '8px'
                                    }}>
                                        {berita.filter(b => b.produsen_data).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Produsen Berita</Text>
                                </div>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} md={6}>
                            <Card
                                style={{
                                    textAlign: 'center',
                                    background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
                                    borderRadius: '12px',
                                    boxShadow: '0 6px 16px rgba(177, 234, 133, 0.15)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-5px)';
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(177, 234, 133, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(177, 234, 133, 0.15)';
                                }}
                            >
                                <div style={{ padding: '16px' }}>
                                    <div style={{
                                        fontSize: '28px',
                                        fontWeight: 'bold',
                                        color: '#2d5036',
                                        marginBottom: '8px'
                                    }}>
                                        {berita.filter(b => b.foto).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Berita dengan Foto</Text>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* Berita List Section */}
                <div style={{ marginBottom: '30px' }}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '25px',
                            flexWrap: 'wrap',
                            gap: '15px',
                        }}
                    >
                        <div>
                            <Title
                                level={2}
                                style={{
                                    color: '#2d5036',
                                    fontSize: '28px',
                                    display: 'inline-block',
                                    marginRight: '15px'
                                }}
                            >
                                Galeri Berita
                            </Title>
                            <Tag
                                color="#4CAF50"
                                style={{
                                    fontSize: '14px',
                                    padding: '6px 12px',
                                    height: 'fit-content',
                                }}
                            >
                                Terbaru
                            </Tag>
                        </div>

                        <Text type="secondary" style={{ fontSize: '17px', fontWeight: '500' }}>
                            <span style={{ color: '#2d5036' }}>{filteredData.length}</span> dari{' '}
                            <span style={{ color: '#2d5036' }}>{berita.length}</span> berita
                        </Text>
                    </div>

                    {/* Creative Grid Layout for berita */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '25px',
                        }}
                    >
                        {filteredData.map((ber, index) => (
                            <div
                                key={ber.id}
                                style={{
                                    perspective: '1000px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '100%',
                                }}
                            >
                                <Card
                                    hoverable
                                    style={{
                                        borderRadius: '16px',
                                        border: 'none',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                                        transition: 'all 0.4s ease',
                                        overflow: 'hidden',
                                        height: '100%',
                                        background: 'linear-gradient(135deg, #f8fff8, #e8f5e9)',
                                        position: 'relative',
                                    }}
                                    bodyStyle={{ padding: '0' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-8px)';
                                        e.currentTarget.style.boxShadow = '0 20px 40px rgba(45, 80, 54, 0.2)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                                    }}
                                >
                                    {/* Full Portrait Cover Display */}
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            // Using padding-top technique to maintain aspect ratio
                                            // Standard portrait book ratio is approximately 2:3 (width:height)
                                            paddingTop: '100%', // Adjusted for square aspect ratio for photos
                                            overflow: 'hidden',
                                            borderRadius: '16px 16px 0 0',
                                        }}
                                    >
                                        {/* Full portrait cover image */}
                                        <img
                                            src={
                                                ber.foto
                                                    ? `/storage/berita/${ber.foto}`
                                                    : 'https://via.placeholder.com/400x400/8BC34A/FFFFFF?text=Berita'
                                            }
                                            alt={ber.judul}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover', // Changed to cover for better photo display
                                                transition: 'all 0.3s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'scale(1.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                            }}
                                        />

                                        {/* Status badge */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            backdropFilter: 'blur(8px)',
                                            borderRadius: '20px',
                                            padding: '6px 14px',
                                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                        }}>
                                            <Text style={{
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: '#2d5036'
                                            }}>
                                                {new Date(ber.tanggal_rilis).toLocaleDateString('id-ID')}
                                            </Text>
                                        </div>

                                        {/* Creative corner decoration */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '15px',
                                            left: '15px',
                                            width: '40px',
                                            height: '40px',
                                            background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.4)',
                                        }}>
                                            <span style={{ fontSize: '18px', color: 'white' }}>📰</span>
                                        </div>
                                    </div>

                                    {/* Berita Content */}
                                    <div style={{
                                        padding: '25px',
                                        background: 'linear-gradient(to bottom, #ffffff, #f8fff8)',
                                        minHeight: '200px',
                                    }}>
                                        <div style={{
                                            marginBottom: '15px',
                                            minHeight: '70px',
                                        }}>
                                            <a
                                                href={`/berita/${ber.id}`}
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
                                                    {ber.judul}
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
                                                    {new Date(ber.tanggal_rilis).toLocaleDateString('id-ID')}
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
                                                    {ber.produsen_data.substring(0, 15)}...
                                                </Text>
                                            </div>
                                        </div>

                                        {ber.isi_singkat && (
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
                                                    {ber.isi_singkat}
                                                </Text>
                                            </div>
                                        )}

                                        {ber.isi && !ber.isi_singkat && (
                                            <div style={{ marginBottom: '16px' }}>
                                                <Text
                                                    style={{
                                                        fontSize: '13px',
                                                        color: '#495057',
                                                        lineHeight: '1.5',
                                                        maxHeight: '45px',
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {ber.isi.substring(0, 100)}...
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
                                            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                                <a
                                                    href={`/berita/${ber.id}`}
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
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                        <polyline points="7,10 12,15 17,10" />
                                                        <line x1="12" y1="15" x2="12" y2="3" />
                                                    </svg>
                                                    Baca Selengkapnya
                                                </a>
                                                {ber.file && ber.file !== '#' && (
                                                    <a
                                                        href={ber.file}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={() => incrementDownloadCount('berita', ber.id)}
                                                        style={{
                                                            display: 'inline-flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            padding: '10px 15px',
                                                            background: '#2d5036',
                                                            color: 'white',
                                                            textDecoration: 'none',
                                                            borderRadius: '8px',
                                                            fontSize: '14px',
                                                            fontWeight: '600',
                                                            transition: 'all 0.3s ease',
                                                            boxShadow: '0 4px 10px rgba(45, 80, 54, 0.3)',
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background = '#1e3a25';
                                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                                            e.currentTarget.style.boxShadow = '0 6px 15px rgba(45, 80, 54, 0.4)';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background = '#2d5036';
                                                            e.currentTarget.style.transform = 'translateY(0)';
                                                            e.currentTarget.style.boxShadow = '0 4px 10px rgba(45, 80, 54, 0.3)';
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
                                                            style={{ marginRight: '6px' }}
                                                        >
                                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                            <polyline points="7,10 12,15 17,10" />
                                                            <line x1="12" y1="15" x2="12" y2="3" />
                                                        </svg>
                                                        Unduh
                                                    </a>
                                                )}
                                            </div>
                                            {ber.file && ber.file !== '#' && (
                                                <div
                                                    style={{
                                                        fontSize: '12px',
                                                        background: '#e8f5e9',
                                                        padding: '4px 10px',
                                                        borderRadius: '12px',
                                                        color: '#2d5036',
                                                        fontWeight: '600',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '3px',
                                                    }}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="12"
                                                        height="12"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        style={{ marginRight: '2px' }}
                                                    >
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                        <polyline points="7,10 12,15 17,10" />
                                                        <line x1="12" y1="15" x2="12" y2="3" />
                                                    </svg>
                                                    {getDownloadCount('berita', ber.id)}x
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>

                {filteredData.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        background: 'linear-gradient(135deg, #f8fff8, #e8f5e9)',
                        borderRadius: '16px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    }}>
                        <div style={{
                            fontSize: '60px',
                            marginBottom: '20px',
                        }}>
                            📭
                        </div>
                        <Title level={3} style={{ color: '#2d5036', marginBottom: '12px' }}>
                            Berita Tidak Ditemukan
                        </Title>
                        <Text style={{ fontSize: '16px', color: '#666' }}>
                            Kami tidak menemukan berita yang cocok dengan pencarian Anda "{searchText}"
                        </Text>
                    </div>
                )}
            </div>
        </PublicLayout>
    );
};

export default BeritaPage;