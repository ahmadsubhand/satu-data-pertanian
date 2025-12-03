import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import React from 'react';

const { Title, Text, Paragraph } = Typography;

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

interface PublikasiDetailPageProps extends PageProps {
    publikasi: Publication;
}

const PublikasiDetailPage: React.FC<PublikasiDetailPageProps> = ({
    publikasi,
}) => {
    if (!publikasi) {
        return (
            <PublicLayout title="Publikasi Tidak Ditemukan">
                <Head title="Publikasi Tidak Ditemukan" />
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <Title level={2} style={{ color: '#2d5036' }}>
                        Publikasi Tidak Ditemukan
                    </Title>
                    <Paragraph>
                        Publikasi yang Anda cari tidak ditemukan atau telah
                        dihapus.
                    </Paragraph>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout title={`${publikasi.judul} - Publikasi Detail`}>
            <Head title={`${publikasi.judul} - Publikasi Detail`} />

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
                        href="/publikasi"
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
                        Kembali ke Daftar Publikasi
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
                            {publikasi.judul}
                        </Title>
                        <Text style={{ fontSize: '18px', opacity: 0.9 }}>
                            Detail Informasi Publikasi
                        </Text>
                    </div>
                </div>

                {/* Main Content */}
                <Row gutter={[32, 32]}>
                    {/* Cover and Download Section */}
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
                                    // Standard portrait book ratio is approximately 2:3 (width:height)
                                    paddingTop: '150%', // This means height is 150% of width (2:3 ratio)
                                    overflow: 'hidden',
                                    borderRadius: '16px 16px 0 0',
                                }}
                            >
                                {/* Full portrait cover image */}
                                <img
                                    src={
                                        publikasi.cover &&
                                        publikasi.cover !==
                                            'default-cover.png' &&
                                        publikasi.cover !== 'null' &&
                                        publikasi.cover !== null
                                            ? `${publikasi.cover}`
                                            : '/storage/publikasi/nenas2020.png'
                                    }
                                    alt={publikasi.judul}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain', // This ensures the full image is visible
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
                                        target.src =
                                            '/storage/publikasi/nenas2020.png';
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
                                        {publikasi.jumlah_halaman} Hal
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
                                        📚
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
                                        href={`/publikasi/${publikasi.id}`}
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
                                            {publikasi.judul}
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
                                            {publikasi.tanggal_rilis}
                                        </Text>
                                        {publikasi.nomor_publikasi && (
                                            <Text
                                                type="secondary"
                                                style={{
                                                    fontSize: '12px',
                                                    background: '#f5f5f5',
                                                    padding: '2px 8px',
                                                    borderRadius: '12px',
                                                }}
                                            >
                                                <strong>🔢</strong>{' '}
                                                {publikasi.nomor_publikasi.substring(
                                                    0,
                                                    10,
                                                )}
                                                ...
                                            </Text>
                                        )}
                                    </div>
                                </div>

                                {publikasi.abstraksi && (
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
                                            <strong>Abstrak:</strong>{' '}
                                            {publikasi.abstraksi}
                                        </Text>
                                    </div>
                                )}

                                {publikasi.keterangan && (
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
                                            {publikasi.keterangan}
                                        </Text>
                                    </div>
                                )}

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: '20px',
                                        paddingTop: '20px',
                                        borderTop: '2px dashed #a8d5ba',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                        }}
                                    >
                                        {publikasi.file &&
                                        publikasi.file !== '#' ? (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                }}
                                            >
                                                <a
                                                    href={publikasi.file}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onClick={() =>
                                                        incrementDownloadCount(
                                                            'publikasi',
                                                            publikasi.id,
                                                        )
                                                    }
                                                    style={{
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        justifyContent:
                                                            'center',
                                                        padding: '10px 20px',
                                                        background: '#2d5036',
                                                        color: 'white',
                                                        textDecoration: 'none',
                                                        borderRadius: '8px',
                                                        fontSize: '15px',
                                                        fontWeight: '600',
                                                        transition:
                                                            'all 0.3s ease',
                                                        boxShadow:
                                                            '0 4px 15px rgba(45, 80, 54, 0.3)',
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background =
                                                            '#1e3a25';
                                                        e.currentTarget.style.transform =
                                                            'translateY(-2px)';
                                                        e.currentTarget.style.boxShadow =
                                                            '0 6px 20px rgba(45, 80, 54, 0.4)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background =
                                                            '#2d5036';
                                                        e.currentTarget.style.transform =
                                                            'translateY(0)';
                                                        e.currentTarget.style.boxShadow =
                                                            '0 4px 15px rgba(45, 80, 54, 0.3)';
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
                                                        style={{
                                                            marginRight: '8px',
                                                        }}
                                                    >
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                        <polyline points="7,10 12,15 17,10" />
                                                        <line
                                                            x1="12"
                                                            y1="15"
                                                            x2="12"
                                                            y2="3"
                                                        />
                                                    </svg>
                                                    Unduh
                                                </a>
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
                                                        style={{
                                                            marginRight: '2px',
                                                        }}
                                                    >
                                                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                        <polyline points="7,10 12,15 17,10" />
                                                        <line
                                                            x1="12"
                                                            y1="15"
                                                            x2="12"
                                                            y2="3"
                                                        />
                                                    </svg>
                                                    {getDownloadCount(
                                                        'publikasi',
                                                        publikasi.id,
                                                    )}
                                                    x
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '10px 20px',
                                                    background: '#f5f5f5',
                                                    color: '#999',
                                                    borderRadius: '8px',
                                                    fontSize: '15px',
                                                    fontWeight: '600',
                                                    cursor: 'not-allowed',
                                                    boxShadow:
                                                        '0 4px 15px rgba(150, 150, 150, 0.2)',
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
                                                    style={{
                                                        marginRight: '8px',
                                                    }}
                                                >
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="7,10 12,15 17,10" />
                                                    <line
                                                        x1="12"
                                                        y1="15"
                                                        x2="12"
                                                        y2="3"
                                                    />
                                                </svg>
                                                Tidak Tersedia
                                            </div>
                                        )}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'flex-start',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    fontSize: '13px',
                                                    background: '#e8f5e9',
                                                    padding: '6px 14px',
                                                    borderRadius: '15px',
                                                    color: '#2d5036',
                                                    fontWeight: '600',
                                                    boxShadow:
                                                        '0 2px 8px rgba(139, 195, 74, 0.2)',
                                                }}
                                            >
                                                {Math.round(
                                                    (publikasi.ukuran_file ||
                                                        0) / 1024,
                                                )}{' '}
                                                KB
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* Details Section */}
                    <Col xs={24} lg={16}>
                        <Card
                            style={{
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                overflow: 'hidden',
                            }}
                            bodyStyle={{ padding: '30px' }}
                        >
                            <Title
                                level={2}
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '24px',
                                }}
                            >
                                Informasi Publikasi
                            </Title>

                            {/* Publication Details */}
                            <div style={{ marginBottom: '25px' }}>
                                <Text
                                    strong
                                    style={{
                                        fontSize: '16px',
                                        color: '#2d5036',
                                        display: 'block',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Judul Publikasi
                                </Text>
                                <Paragraph
                                    style={{
                                        fontSize: '16px',
                                        lineHeight: '1.6',
                                    }}
                                >
                                    {publikasi.judul}
                                </Paragraph>
                            </div>

                            <Divider />

                            <Row gutter={[24, 24]}>
                                <Col xs={24} md={12}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <Text
                                            strong
                                            style={{
                                                fontSize: '15px',
                                                color: '#2d5036',
                                                display: 'block',
                                                marginBottom: '6px',
                                            }}
                                        >
                                            Tanggal Rilis
                                        </Text>
                                        <Text style={{ fontSize: '15px' }}>
                                            {publikasi.tanggal_rilis ||
                                                'Tidak tersedia'}
                                        </Text>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <Text
                                            strong
                                            style={{
                                                fontSize: '15px',
                                                color: '#2d5036',
                                                display: 'block',
                                                marginBottom: '6px',
                                            }}
                                        >
                                            Nomor Publikasi
                                        </Text>
                                        <Text style={{ fontSize: '15px' }}>
                                            {publikasi.nomor_publikasi ||
                                                'Tidak tersedia'}
                                        </Text>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <Text
                                            strong
                                            style={{
                                                fontSize: '15px',
                                                color: '#2d5036',
                                                display: 'block',
                                                marginBottom: '6px',
                                            }}
                                        >
                                            Nomor ISSN
                                        </Text>
                                        <Text style={{ fontSize: '15px' }}>
                                            {publikasi.nomor_issn ||
                                                'Tidak tersedia'}
                                        </Text>
                                    </div>
                                </Col>

                                <Col xs={24} md={12}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <Text
                                            strong
                                            style={{
                                                fontSize: '15px',
                                                color: '#2d5036',
                                                display: 'block',
                                                marginBottom: '6px',
                                            }}
                                        >
                                            Jumlah Halaman
                                        </Text>
                                        <Text style={{ fontSize: '15px' }}>
                                            {publikasi.jumlah_halaman} halaman
                                        </Text>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <Text
                                            strong
                                            style={{
                                                fontSize: '15px',
                                                color: '#2d5036',
                                                display: 'block',
                                                marginBottom: '6px',
                                            }}
                                        >
                                            Ukuran File
                                        </Text>
                                        <Text style={{ fontSize: '15px' }}>
                                            {Math.round(
                                                (publikasi.ukuran_file || 0) /
                                                    1024,
                                            )}{' '}
                                            KB
                                        </Text>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <Text
                                            strong
                                            style={{
                                                fontSize: '15px',
                                                color: '#2d5036',
                                                display: 'block',
                                                marginBottom: '6px',
                                            }}
                                        >
                                            Tanggal Dibuat
                                        </Text>
                                        <Text style={{ fontSize: '15px' }}>
                                            {publikasi.created_at}
                                        </Text>
                                    </div>
                                </Col>
                            </Row>

                            <Divider />

                            {/* Abstract */}
                            <div style={{ marginBottom: '25px' }}>
                                <Text
                                    strong
                                    style={{
                                        fontSize: '16px',
                                        color: '#2d5036',
                                        display: 'block',
                                        marginBottom: '12px',
                                    }}
                                >
                                    Abstraksi
                                </Text>
                                <Paragraph
                                    style={{
                                        fontSize: '15px',
                                        lineHeight: '1.7',
                                    }}
                                >
                                    {publikasi.abstraksi ||
                                        'Abstraksi tidak tersedia.'}
                                </Paragraph>
                            </div>

                            <Divider />

                            {/* Description */}
                            <div>
                                <Text
                                    strong
                                    style={{
                                        fontSize: '16px',
                                        color: '#2d5036',
                                        display: 'block',
                                        marginBottom: '12px',
                                    }}
                                >
                                    Keterangan
                                </Text>
                                <Paragraph
                                    style={{
                                        fontSize: '15px',
                                        lineHeight: '1.7',
                                    }}
                                >
                                    {publikasi.keterangan ||
                                        'Keterangan tidak tersedia.'}
                                </Paragraph>
                            </div>
                        </Card>

                        {/* Related Information Card */}
                        <Card
                            style={{
                                borderRadius: '16px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                                marginTop: '20px',
                                overflow: 'hidden',
                            }}
                            bodyStyle={{ padding: '25px' }}
                        >
                            <Title
                                level={3}
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '16px',
                                }}
                            >
                                Informasi Tambahan
                            </Title>
                            <Space size="middle" wrap>
                                <Tag
                                    color="#e8f5e9"
                                    style={{
                                        color: '#2d5036',
                                        border: '1px solid #c8e6c9',
                                        fontSize: '14px',
                                    }}
                                >
                                    📚 Publikasi Resmi
                                </Tag>
                                <Tag
                                    color="#e3f2fd"
                                    style={{
                                        color: '#2d5036',
                                        border: '1px solid #bbdefb',
                                        fontSize: '14px',
                                    }}
                                >
                                    📊 Data Terpercaya
                                </Tag>
                                <Tag
                                    color="#f3e5f5"
                                    style={{
                                        color: '#2d5036',
                                        border: '1px solid #ce93d8',
                                        fontSize: '14px',
                                    }}
                                >
                                    🔍 Terverifikasi
                                </Tag>
                            </Space>
                        </Card>
                    </Col>
                </Row>
            </div>
        </PublicLayout>
    );
};

export default PublikasiDetailPage;
