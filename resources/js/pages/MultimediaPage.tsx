import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, Col, Input, Row, Typography, Tag, Space, Select } from 'antd';
import React, { useState } from 'react';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

// Interface untuk multimedia berdasarkan struktur dari tabel menu_multimedia_tables
interface Multimedia {
    id: number;
    judul: string;
    keterangan: string | null;
    link_video: string | null;
    tanggal_rilis: string;
    file: string;
    status: boolean;
    user_id: number;
    created_at: string;
    updated_at: string;
}

interface MultimediaPageProps extends PageProps {
    multimedia: Multimedia[];
}

const MultimediaPage: React.FC<MultimediaPageProps> = ({ multimedia = [] }) => {
    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'foto' | 'video'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Increased to show more items per page

    // Determine if an item is a video based on file extension or presence of link_video
    const isVideo = (item: Multimedia) => {
        if (item.link_video || item.file.match(/\.(mp4|mov|avi|wmv|flv|webm|mkv)$/i)) {
            return true;
        }
        return false;
    };

    // Filter data based on search and type
    const allFilteredData = multimedia.filter(
        (multi) => {
            const matchesSearch = multi.judul.toLowerCase().includes(searchText.toLowerCase()) ||
                (multi.keterangan &&
                    multi.keterangan
                        .toLowerCase()
                        .includes(searchText.toLowerCase()));
            
            let matchesType = true;
            if (filterType === 'foto') {
                matchesType = !isVideo(multi);
            } else if (filterType === 'video') {
                matchesType = isVideo(multi);
            }
            
            return matchesSearch && matchesType && multi.status; // Only show published items
        }
    );

    // Hitung total halaman berdasarkan data yang difilter
    const totalPages = Math.ceil(allFilteredData.length / itemsPerPage);

    // Ambil data untuk halaman saat ini
    const filteredData = allFilteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    return (
        <PublicLayout title="Multimedia - Satudata Pertanian">
            <Head title="Multimedia - Satudata Pertanian" />

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
                            📸 Multimedia Satudata Pertanian
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
                            Temukan berbagai konten multimedia menarik dari Kementerian
                            Pertanian yang menyajikan informasi dan data sektor pertanian di Indonesia dalam bentuk foto dan video.
                        </Paragraph>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
                            <Tag color="#4a7c59" style={{ fontSize: '14px', padding: '8px 16px' }}>
                                {multimedia.filter(m => m.status).length} Total Multimedia
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
                        <Col xs={24} md={8}>
                            <Select
                                defaultValue="all"
                                style={{ width: '100%' }}
                                size="large"
                                onChange={(value) => setFilterType(value)}
                                options={[
                                    { value: 'all', label: 'Semua Konten' },
                                    { value: 'foto', label: 'Foto' },
                                    { value: 'video', label: 'Video' },
                                ]}
                            />
                        </Col>
                        <Col xs={24} md={12}>
                            <Search
                                placeholder="🔍 Cari multimedia (judul)..."
                                onSearch={(value) => setSearchText(value)}
                                enterButton="Cari"
                                size="large"
                                style={{ width: '100%' }}
                                allowClear
                            />
                        </Col>
                        <Col xs={24} md={4}>
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
                                    {filteredData.length} dari {multimedia.filter(m => m.status).length}
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
                                        {multimedia.filter(m => m.status).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Total Multimedia</Text>
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
                                        {multimedia.filter(m => m.status && !isVideo(m)).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Foto</Text>
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
                                        {multimedia.filter(m => m.status && isVideo(m)).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Video</Text>
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
                                        {multimedia.filter(m => new Date(m.tanggal_rilis) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) && m.status).length}
                                    </div>
                                    <Text strong style={{ color: '#4a7c59' }}>Konten Baru</Text>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>

                {/* Multimedia List Section */}
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
                                Galeri Multimedia
                            </Title>
                            <Tag
                                color="#4CAF50"
                                style={{
                                    fontSize: '14px',
                                    padding: '6px 12px',
                                    height: 'fit-content',
                                }}
                            >
                                {filteredData.length} Multimedia Tersedia
                            </Tag>
                        </div>
                    </div>

                    {/* Grid of Multimedia */}
                    <Row gutter={[24, 24]}>
                        {filteredData.length > 0 ? (
                            filteredData.map((multimediaItem, index) => (
                                <Col 
                                    xs={24} 
                                    sm={12} 
                                    md={8} 
                                    lg={6} 
                                    key={multimediaItem.id}
                                    style={{ display: 'flex' }}
                                >
                                    <Link
                                        href={`/galeri/${multimediaItem.id}`}
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
                                                    height: '160px',
                                                    borderRadius: '8px',
                                                    marginBottom: '12px',
                                                    overflow: 'hidden',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    background: `linear-gradient(135deg, #${Math.floor(Math.random()*16777215).toString(16)}, #${Math.floor(Math.random()*16777215).toString(16)})`,
                                                }}
                                            >
                                                {isVideo(multimediaItem) ? (
                                                    <span style={{ fontSize: '40px' }}>🎬</span>
                                                ) : (
                                                    <span style={{ fontSize: '40px' }}>📸</span>
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
                                                        {multimediaItem.judul}
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
                                                            color={isVideo(multimediaItem) ? 'orange' : 'blue'}
                                                            style={{ marginBottom: 0 }}
                                                        >
                                                            {isVideo(multimediaItem) ? 'Video' : 'Foto'}
                                                        </Tag>
                                                        <Text type="secondary" style={{ fontSize: '12px' }}>
                                                            {new Date(multimediaItem.tanggal_rilis).toLocaleDateString('id-ID')}
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
                                        Multimedia Tidak Ditemukan
                                    </Title>
                                    <Paragraph style={{ color: '#6c757d' }}>
                                        {searchText || filterType !== 'all'
                                            ? 'Tidak ada multimedia yang cocok dengan filter Anda'
                                            : 'Belum ada multimedia yang tersedia saat ini'
                                        }
                                    </Paragraph>
                                </div>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
        </PublicLayout>
    );
};

export default MultimediaPage;