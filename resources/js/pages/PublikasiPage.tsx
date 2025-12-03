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

// Interface untuk publikasi berdasarkan struktur dari tabel menu_publikasi_tables
interface Publication {
    id: number;
    judul: string;
    tanggal_rilis: string;
    keterangan: string | null;
    nomor_publikasi: string | null;
    nomor_issn: string | null;
    file: string;
    cover: string;
    ukuran_file: number;
    jumlah_halaman: number;
    abstraksi: string;
    created_at: string;
    updated_at: string;
}

interface PublikasiPageProps extends PageProps {
    publikasi: Publication[];
}

const PublikasiPage: React.FC<PublikasiPageProps> = ({ publikasi = [] }) => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Increased to show more items per page

    // Filter data based on search
    const allFilteredData = publikasi.filter(
        (pub) =>
            pub.judul.toLowerCase().includes(searchText.toLowerCase()) ||
            (pub.keterangan &&
                pub.keterangan
                    .toLowerCase()
                    .includes(searchText.toLowerCase())) ||
            (pub.nomor_publikasi &&
                pub.nomor_publikasi
                    .toLowerCase()
                    .includes(searchText.toLowerCase())),
    );

    // Hitung total halaman berdasarkan data yang difilter
    const totalPages = Math.ceil(allFilteredData.length / itemsPerPage);

    // Ambil data untuk halaman saat ini
    const filteredData = allFilteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    return (
        <PublicLayout title="Publikasi - Satudata Pertanian">
            <Head title="Publikasi - Satudata Pertanian" />

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
                            📘 Publikasi Satudata Pertanian
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
                            Temukan berbagai publikasi resmi dari Kementerian
                            Pertanian yang menyajikan informasi dan analisis terkini
                            tentang sektor pertanian di Indonesia.
                        </Paragraph>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
                            <Tag color="#4a7c59" style={{ fontSize: '14px', padding: '8px 16px' }}>
                                {publikasi.length} Total Publikasi
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
                                placeholder="🔍 Cari publikasi (judul, deskripsi, nomor publikasi)..."
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
                                    {filteredData.length} dari {publikasi.length} publikasi
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
                                        {publikasi.length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Total Publikasi</Text>
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
                                        {publikasi.filter(p => new Date(p.tanggal_rilis) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Publikasi Baru</Text>
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
                                        {publikasi.filter(p => p.nomor_issn).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Publikasi Terindeks ISSN</Text>
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
                                        {Math.round(publikasi.reduce((sum, p) => sum + (p.ukuran_file || 0), 0) / 1024 / 1024)} MB
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Total Ukuran File</Text>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* Publications List Section */}
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
                                Galeri Publikasi
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
                            <span style={{ color: '#2d5036' }}>{publikasi.length}</span> publikasi
                        </Text>
                    </div>

                    {/* Creative Grid Layout for publications */}
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '25px',
                        }}
                    >
                        {filteredData.map((pub, index) => (
                            <div
                                key={pub.id}
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
                                            paddingTop: '150%', // This means height is 150% of width (2:3 ratio)
                                            overflow: 'hidden',
                                            borderRadius: '16px 16px 0 0',
                                        }}
                                    >
                                        {/* Full portrait cover image */}
                                        <img
                                            src={
                                                pub.cover && pub.cover !== 'default-cover.png' && pub.cover !== 'null' && pub.cover !== null
                                                    ? `${pub.cover}`
                                                    : '/storage/publikasi/nenas2020.png'
                                            }
                                            alt={pub.judul}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'contain', // This ensures the full image is visible
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
                                                {pub.jumlah_halaman} Hal
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
                                            <span style={{ fontSize: '18px', color: 'white' }}>📚</span>
                                        </div>
                                    </div>

                                    {/* Publication Content */}
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
                                                href={`/publikasi/${pub.id}`}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'inherit',
                                                }}
                                            >
                                                <Title
                                                    level={4}
                                                    style={{
                                                        margin: 0,
                                                        fontSize: '19px',
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
                                                    {pub.judul}
                                                </Title>
                                            </a>
                                        </div>

                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                marginBottom: '15px',
                                                flexWrap: 'wrap',
                                                gap: '8px',
                                            }}
                                        >
                                            <div style={{
                                                background: '#e8f5e9',
                                                padding: '6px 12px',
                                                borderRadius: '15px',
                                                fontSize: '12px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                border: '1px solid #c8e6c9',
                                            }}>
                                                <span style={{ fontSize: '13px', color: '#2d5036' }}>📅</span>
                                                <span style={{ fontWeight: '600', color: '#2d5036' }}>{pub.tanggal_rilis}</span>
                                            </div>
                                            {pub.nomor_publikasi && (
                                                <div style={{
                                                    background: '#e8f5e9',
                                                    padding: '6px 12px',
                                                    borderRadius: '15px',
                                                    fontSize: '12px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '5px',
                                                    border: '1px solid #c8e6c9',
                                                }}>
                                                    <span style={{ fontSize: '13px', color: '#2d5036' }}>🔢</span>
                                                    <span style={{ fontWeight: '600', color: '#2d5036' }}>{pub.nomor_publikasi.substring(0, 8)}...</span>
                                                </div>
                                            )}
                                        </div>

                                        {pub.abstraksi && (
                                            <div style={{
                                                marginBottom: '15px',
                                                padding: '12px',
                                                background: '#f1f8e9',
                                                borderRadius: '10px',
                                                borderLeft: '3px solid #4CAF50',
                                            }}>
                                                <div style={{
                                                    fontSize: '13px',
                                                    color: '#2E7D32',
                                                    fontWeight: '600',
                                                    marginBottom: '5px',
                                                }}>
                                                    Ringkasan:
                                                </div>
                                                <Text
                                                    style={{
                                                        fontSize: '13px',
                                                        color: '#555',
                                                        lineHeight: '1.5',
                                                        maxHeight: '50px',
                                                        overflow: 'hidden',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                    }}
                                                >
                                                    {pub.abstraksi}
                                                </Text>
                                            </div>
                                        )}

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '10px',
                                        }}>
                                            <a
                                                href={pub.file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => incrementDownloadCount('publikasi', pub.id)}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '10px 18px',
                                                    background: '#2d5036',
                                                    color: 'white',
                                                    textDecoration: 'none',
                                                    borderRadius: '8px',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    transition: 'all 0.3s ease',
                                                    boxShadow: '0 4px 12px rgba(45, 80, 54, 0.3)',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.background = '#1e3a25';
                                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(45, 80, 54, 0.4)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.background = '#2d5036';
                                                    e.currentTarget.style.transform = 'translateY(0)';
                                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 54, 0.3)';
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
                                            <div style={{
                                                fontSize: '12px',
                                                background: '#e8f5e9',
                                                padding: '4px 10px',
                                                borderRadius: '12px',
                                                color: '#2d5036',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '3px'
                                            }}>
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
                                                {getDownloadCount('publikasi', pub.id)}x
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                    <div
                        style={{
                            marginTop: '30px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '12px',
                            flexWrap: 'wrap',
                        }}
                    >
                        <button
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#2d5036',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                opacity: currentPage === 1 ? 0.5 : 1,
                            }}
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            onMouseEnter={(e) => {
                                if (currentPage > 1) e.currentTarget.style.backgroundColor = '#1e3a25';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#2d5036';
                            }}
                        >
                            &larr; Sebelumnya
                        </button>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '0 16px',
                        }}>
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        style={{
                                            width: '36px',
                                            height: '36px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '50%',
                                            border: 'none',
                                            backgroundColor: currentPage === pageNum ? '#2d5036' : '#f0f0f0',
                                            color: currentPage === pageNum ? 'white' : '#666',
                                            fontWeight: currentPage === pageNum ? 'bold' : 'normal',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            transition: 'all 0.3s ease',
                                        }}
                                        onClick={() => setCurrentPage(pageNum)}
                                        onMouseEnter={(e) => {
                                            if (currentPage !== pageNum) e.currentTarget.style.backgroundColor = '#d0f0e0';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = currentPage === pageNum ? '#2d5036' : '#f0f0f0';
                                        }}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            style={{
                                padding: '10px 20px',
                                backgroundColor: '#2d5036',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.3s ease',
                                opacity: currentPage === totalPages ? 0.5 : 1,
                            }}
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            onMouseEnter={(e) => {
                                if (currentPage < totalPages) e.currentTarget.style.backgroundColor = '#1e3a25';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#2d5036';
                            }}
                        >
                            Berikutnya &rarr;
                        </button>
                    </div>
                    )}
                </div>

                {/* Information Section */}
                <div
                    style={{
                        textAlign: 'center',
                        padding: '30px',
                        background: 'linear-gradient(135deg, #2d5036, #4a7c59)',
                        borderRadius: '12px',
                        color: 'white',
                        marginBottom: '20px',
                    }}
                >
                    <Title
                        level={3}
                        style={{
                            color: 'white',
                            marginBottom: '16px',
                            fontSize: '22px',
                        }}
                    >
                        Manfaatkan Publikasi untuk Pengembangan Pertanian
                    </Title>
                    <Paragraph
                        style={{
                            color: '#e8f5e9',
                            maxWidth: '700px',
                            margin: '0 auto 16px',
                            fontSize: '16px',
                            lineHeight: '1.7',
                        }}
                    >
                        Publikasi ini menyediakan informasi dan analisis terkini
                        yang dikumpulkan dan dikelola oleh Kementerian Pertanian
                        untuk mendukung penelitian, inovasi, dan kebijakan
                        pertanian yang berbasis data.
                    </Paragraph>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '20px',
                        flexWrap: 'wrap',
                        marginTop: '16px',
                    }}>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            padding: '12px 20px',
                            borderRadius: '8px',
                            backdropFilter: 'blur(4px)',
                        }}>
                            <Text strong style={{ color: 'white' }}>📊 Data Valid</Text>
                        </div>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            padding: '12px 20px',
                            borderRadius: '8px',
                            backdropFilter: 'blur(4px)',
                        }}>
                            <Text strong style={{ color: 'white' }}>🔍 Terpercaya</Text>
                        </div>
                        <div style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            padding: '12px 20px',
                            borderRadius: '8px',
                            backdropFilter: 'blur(4px)',
                        }}>
                            <Text strong style={{ color: 'white' }}>📚 Terindeks</Text>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
};

export default PublikasiPage;
