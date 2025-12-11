import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import React from 'react';

const { Title, Text, Paragraph } = Typography;

interface Infografis {
    id: number;
    judul: string;
    tanggal_rilis: string;
    keterangan: string | null;
    file: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    user_id: number;
    produsen_data_table_id: number;
}

interface InfografisDetailPageProps extends PageProps {
    infografis: Infografis;
}

const InfografisDetailPage: React.FC<InfografisDetailPageProps> = ({
    infografis,
}) => {
    if (!infografis) {
        return (
            <PublicLayout title="Infografis Tidak Ditemukan">
                <Head title="Infografis Tidak Ditemukan" />
                <div style={{ padding: '40px', textAlign: 'center' }}>
                    <Title level={2} style={{ color: '#2d5036' }}>
                        Infografis Tidak Ditemukan
                    </Title>
                    <Paragraph>
                        Infografis yang Anda cari tidak ditemukan atau telah
                        dihapus.
                    </Paragraph>
                </div>
            </PublicLayout>
        );
    }

    return (
        <PublicLayout title={`${infografis.judul} - Infografis Detail`}>
            <Head title={`${infografis.judul} - Infografis Detail`} />

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
                        href="/infografis"
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
                        Kembali ke Daftar Infografis
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
                            {infografis.judul}
                        </Title>
                        <Text style={{ fontSize: '18px', opacity: 0.9 }}>
                            Detail Informasi Infografis
                        </Text>
                    </div>
                </div>

                {/* Main Content */}
                <Row gutter={[32, 32]}>
                    {/* Infografis Preview Section */}
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
                                    paddingTop: '150%', // This means height is 150% of width (2:3 ratio)
                                    overflow: 'hidden',
                                    borderRadius: '16px 16px 0 0',
                                }}
                            >
                                {/* Infografis preview */}
                                {infografis.file ? (
                                    <img
                                        src={`/storage/infografis/${infografis.file}`}
                                        alt={infografis.judul}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain',
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
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null; // prevents looping
                                            target.style.display = 'none';
                                        }}
                                    />
                                ) : (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            background: `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})`,
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
                                    >
                                        <span style={{ fontSize: '60px' }}>📊</span>
                                    </div>
                                )}

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
                                        {infografis.status ? 'Aktif' : 'Tidak Aktif'}
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
                                        📊
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
                                        href={`/infografis/${infografis.id}`}
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
                                            {infografis.judul}
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
                                            {new Date(infografis.tanggal_rilis).toLocaleDateString('id-ID')}
                                        </Text>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        marginTop: '20px',
                                    }}
                                >
                                    <a
                                        href={`/storage/infografis/${infografis.file}`}
                                        download
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            padding: '10px 20px',
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
                                            style={{ marginRight: '8px' }}
                                        >
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="7,10 12,15 17,10" />
                                            <line x1="12" y1="15" x2="12" y2="3" />
                                        </svg>
                                        Unduh Infografis
                                    </a>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* Infografis Details Section */}
                    <Col xs={24} lg={16}>
                        <Card
                            style={{
                                borderRadius: '16px',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                                border: 'none',
                            }}
                            bodyStyle={{ padding: '30px' }}
                        >
                            <Title level={3} style={{ color: '#2d5036', marginBottom: '24px' }}>
                                Informasi Infografis
                            </Title>

                            <div style={{ marginBottom: '24px' }}>
                                <Text strong style={{ color: '#2d5036', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                                    Judul
                                </Text>
                                <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
                                    {infografis.judul}
                                </Paragraph>
                            </div>


                            <Row gutter={[24, 24]}>
                                <Col xs={24} sm={12}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <Text strong style={{ color: '#2d5036', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                                            Tanggal Rilis
                                        </Text>
                                        <Text style={{ fontSize: '16px' }}>
                                            {new Date(infografis.tanggal_rilis).toLocaleDateString('id-ID')}
                                        </Text>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <Text strong style={{ color: '#2d5036', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                                            Status
                                        </Text>
                                        <Tag
                                            color={infografis.status ? 'green' : 'red'}
                                            style={{ fontSize: '16px', padding: '4px 12px' }}
                                        >
                                            {infografis.status ? 'Aktif' : 'Tidak Aktif'}
                                        </Tag>
                                    </div>
                                </Col>
                            </Row>

                            <Row gutter={[24, 24]}>
                                <Col xs={24} sm={12}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <Text strong style={{ color: '#2d5036', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                                            ID Infografis
                                        </Text>
                                        <Text style={{ fontSize: '16px' }}>
                                            #{infografis.id}
                                        </Text>
                                    </div>
                                </Col>
                                <Col xs={24} sm={12}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <Text strong style={{ color: '#2d5036', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                                            ID Pengguna
                                        </Text>
                                        <Text style={{ fontSize: '16px' }}>
                                            #{infografis.user_id}
                                        </Text>
                                    </div>
                                </Col>
                            </Row>
                        </Card>

                        {/* Additional Info Section */}
                        <Card
                            style={{
                                borderRadius: '16px',
                                boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
                                border: 'none',
                                marginTop: '24px',
                            }}
                            bodyStyle={{ padding: '30px' }}
                        >
                            <Title level={3} style={{ color: '#2d5036', marginBottom: '24px' }}>
                                Detail Tambahan
                            </Title>

                            <div style={{ marginBottom: '20px' }}>
                                <Text strong style={{ color: '#2d5036', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                                    Tanggal Pembuatan
                                </Text>
                                <Text style={{ fontSize: '16px' }}>
                                    {new Date(infografis.created_at).toLocaleDateString('id-ID')} | {new Date(infografis.created_at).toLocaleTimeString('id-ID')}
                                </Text>
                            </div>

                            <div style={{ marginBottom: '20px' }}>
                                <Text strong style={{ color: '#2d5036', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                                    Tanggal Terakhir Diperbarui
                                </Text>
                                <Text style={{ fontSize: '16px' }}>
                                    {new Date(infografis.updated_at).toLocaleDateString('id-ID')} | {new Date(infografis.updated_at).toLocaleTimeString('id-ID')}
                                </Text>
                            </div>

                            <div>
                                <Text strong style={{ color: '#2d5036', fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                                    ID Tabel Produsen Data
                                </Text>
                                <Text style={{ fontSize: '16px' }}>
                                    #{infografis.produsen_data_table_id}
                                </Text>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Related Infographics Section - could be implemented in the future */}
                <Divider style={{ margin: '40px 0' }} />

                <div style={{ textAlign: 'center' }}>
                    <a
                        href={`/storage/infografis/${infografis.file}`}
                        download
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '15px 30px',
                            background: 'linear-gradient(135deg, #2d5036, #4CAF50)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '50px',
                            fontSize: '16px',
                            fontWeight: '600',
                            transition: 'all 0.3s ease',
                            boxShadow: '0 6px 20px rgba(45, 80, 54, 0.4)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-3px)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(45, 80, 54, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(45, 80, 54, 0.4)';
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ marginRight: '10px' }}
                        >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7,10 12,15 17,10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                        Unduh Infografis Lengkap
                    </a>
                </div>
            </div>
        </PublicLayout>
    );
};

export default InfografisDetailPage;