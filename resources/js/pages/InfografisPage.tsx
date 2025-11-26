import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, Col, Input, Row, Typography, Tag, Space } from 'antd';
import React, { useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

// Interface untuk infografis berdasarkan struktur dari tabel menu_infografis_tables
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

interface InfografisPageProps extends PageProps {
    infografis: Infografis[];
}

const InfografisPage: React.FC<InfografisPageProps> = ({ infografis = [] }) => {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Increased to show more items per page

    // Filter data based on search
    const allFilteredData = infografis.filter(
        (info) =>
            info.judul.toLowerCase().includes(searchText.toLowerCase()) ||
            (info.keterangan &&
                info.keterangan
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
        <PublicLayout title="Infografis - Satudata Pertanian">
            <Head title="Infografis - Satudata Pertanian" />

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
                            📊 Infografis Satudata Pertanian
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
                            Temukan berbagai infografis menarik dari Kementerian
                            Pertanian yang menyajikan informasi dan data statistik sektor pertanian di Indonesia dalam bentuk visual yang mudah dipahami.
                        </Paragraph>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
                            <Tag color="#4a7c59" style={{ fontSize: '14px', padding: '8px 16px' }}>
                                {infografis.length} Total Infografis
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
                                placeholder="🔍 Cari infografis (judul, deskripsi)..."
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
                                    {filteredData.length} dari {infografis.length} infografis
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
                                        {infografis.length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Total Infografis</Text>
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
                                        {infografis.filter(i => new Date(i.tanggal_rilis) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Infografis Baru</Text>
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
                                        {infografis.filter(i => i.status).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Terpublikasi</Text>
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
                                        {Math.round(infografis.filter(i => i.file).length)} File
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Tersedia</Text>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* Infografis List Section */}
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
                                Galeri Infografis
                            </Title>
                            <Tag
                                color="#4CAF50"
                                style={{
                                    fontSize: '14px',
                                    padding: '6px 12px',
                                    height: 'fit-content',
                                }}
                            >
                                {filteredData.length} Infografis Tersedia
                            </Tag>
                        </div>
                    </div>

                    {/* Grid of Infographics */}
                    <Row gutter={[24, 24]}>
                        {filteredData.length > 0 ? (
                            filteredData.map((infografisItem, index) => (
                                <Col 
                                    xs={24} 
                                    sm={12} 
                                    md={8} 
                                    lg={6} 
                                    key={infografisItem.id}
                                    style={{ display: 'flex' }}
                                >
                                    <Link
                                        href={`/infografis/${infografisItem.id}`}
                                        style={{ width: '100%' }}
                                    >
                                        <Card
                                            hoverable
                                            style={{
                                                borderRadius: '12px',
                                                border: '1px solid #e8f5e9',
                                                overflow: 'hidden',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: 'all 0.3s ease',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.transform = 'translateY(-5px)';
                                                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'translateY(0)';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                                            }}
                                            bodyStyle={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}
                                        >
                                            <div
                                                style={{
                                                    width: '100%',
                                                    // Using padding-top technique for portrait aspect ratio (2:3)
                                                    paddingTop: '150%',
                                                    borderRadius: '8px',
                                                    marginBottom: '12px',
                                                    overflow: 'hidden',
                                                    position: 'relative',
                                                }}
                                            >
                                                {infografisItem.file ? (
                                                    <img
                                                        src={`/storage/${infografisItem.file}`}
                                                        alt={infografisItem.judul}
                                                        style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'contain',
                                                            transition: 'all 0.3s ease',
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
                                                            background: `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}, #${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')})`,
                                                        }}
                                                    >
                                                        <span style={{ fontSize: '40px' }}>📊</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <div style={{ 
                                                flex: 1, 
                                                display: 'flex', 
                                                flexDirection: 'column',
                                                justifyContent: 'space-between'
                                            }}>
                                                <div>
                                                    <Title 
                                                        level={5} 
                                                        style={{
                                                            color: '#2d5036',
                                                            fontSize: '16px',
                                                            marginBottom: '8px',
                                                            height: 'auto',
                                                            overflow: 'hidden',
                                                            WebkitLineClamp: 2,
                                                            WebkitBoxOrient: 'vertical',
                                                            display: '-webkit-box',
                                                            lineHeight: '1.4',
                                                        }}
                                                    >
                                                        {infografisItem.judul}
                                                    </Title>
                                                </div>
                                                
                                                <div>
                                                    <Space 
                                                        size="small" 
                                                        style={{ 
                                                            display: 'flex', 
                                                            justifyContent: 'space-between', 
                                                            alignItems: 'center' 
                                                        }}
                                                    >
                                                        <Tag 
                                                            color={infografisItem.status ? '#4CAF50' : '#F44336'}
                                                            style={{ marginBottom: 0 }}
                                                        >
                                                            {infografisItem.status ? 'Aktif' : 'Tidak Aktif'}
                                                        </Tag>
                                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                                            {new Date(infografisItem.tanggal_rilis).toLocaleDateString('id-ID')}
                                                        </Text>
                                                    </Space>
                                                </div>
                                            </div>
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        ) : (
                            <Col xs={24}>
                                <div 
                                    style={{ 
                                        textAlign: 'center', 
                                        padding: '60px 20px',
                                        background: '#f8f9fa',
                                        borderRadius: '12px',
                                        border: '2px dashed #dfece0'
                                    }}
                                >
                                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
                                    <Title level={3} style={{ color: '#2d5036' }}>
                                        Infografis Tidak Ditemukan
                                    </Title>
                                    <Paragraph style={{ color: '#6c757d' }}>
                                        {searchText 
                                            ? `Tidak ada infografis yang cocok dengan pencarian "${searchText}"`
                                            : 'Belum ada infografis yang tersedia saat ini'
                                        }
                                    </Paragraph>
                                </div>
                            </Col>
                        )}
                    </Row>
                </div>

                {/* Pagination Section - if needed in the future */}
                {/* For now, we'll just show all filtered results */}
            </div>
        </PublicLayout>
    );
};

export default InfografisPage;