import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Table, Tag, Typography, Row, Col, Input } from 'antd';
import React, { useState } from 'react';
import PublicLayout from '@/layouts/PublicLayout';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

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
  const itemsPerPage = 6; // Jumlah item per halaman

  // Filter data based on search
  const allFilteredData = publikasi.filter(pub =>
    pub.judul.toLowerCase().includes(searchText.toLowerCase()) ||
    (pub.keterangan && pub.keterangan.toLowerCase().includes(searchText.toLowerCase())) ||
    (pub.nomor_publikasi && pub.nomor_publikasi.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Hitung total halaman berdasarkan data yang difilter
  const totalPages = Math.ceil(allFilteredData.length / itemsPerPage);

  // Ambil data untuk halaman saat ini
  const filteredData = allFilteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );


  return (
    <PublicLayout title="Publikasi - Satudata Pertanian">
      <Head title="Publikasi - Satudata Pertanian" />

      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #a8d5ba 0%, #d0f0e0 100%)',
          borderRadius: '12px',
          padding: '30px 20px',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <Title
            level={1}
            style={{
              color: '#2d5036',
              marginBottom: '12px',
              fontSize: '28px'
            }}
          >
            Publikasi Satudata Pertanian
          </Title>
          <Paragraph
            style={{
              fontSize: '16px',
              color: '#495057',
              maxWidth: '800px',
              margin: '0 auto 16px',
              lineHeight: '1.6'
            }}
          >
            Temukan berbagai publikasi resmi dari Kementerian Pertanian yang menyajikan
            informasi dan analisis terkini tentang sektor pertanian di Indonesia.
          </Paragraph>
        </div>

        {/* Search and Filters Section */}
        <div style={{ marginBottom: '24px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} md={16}>
              <Search
                placeholder="Cari publikasi (judul, deskripsi, nomor publikasi)..."
                onSearch={value => setSearchText(value)}
                enterButton
                size="large"
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} md={8}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '40px', backgroundColor: '#f0f0f0', borderRadius: '6px' }}>
                <span style={{ color: '#6c757d' }}>Jumlah: {filteredData.length} publikasi</span>
              </div>
            </Col>
          </Row>
        </div>

        {/* Stats Section */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <Title level={3} style={{ color: '#2d5036' }}>{publikasi.length}</Title>
                  <Text>Total Publikasi</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Publications List Section */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <Title level={2} style={{ color: '#2d5036', fontSize: '24px' }}>
              Daftar Publikasi
            </Title>
            <Text type="secondary">
              Menampilkan {filteredData.length} dari {publikasi.length} publikasi
            </Text>
          </div>

          {/* Flex View for publications - 2 cards per row on desktop, 1 on mobile */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px'
            }}
          >
            {filteredData.map((pub) => (
              <Card
                key={pub.id}
                hoverable
                style={{
                  borderRadius: '8px',
                  border: '1px solid #e9ecef',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  flex: '1 1 calc(50% - 12px)', // 2 cards per row on desktop
                  maxWidth: 'calc(50% - 12px)', // 2 cards per row
                  minWidth: '300px', // Minimum width for mobile
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div style={{ display: 'flex', gap: '16px' }}>
                  {/* Cover Image - Poster Portrait */}
                  <div style={{
                    width: '115px',
                    overflow: 'hidden',
                    borderRadius: '6px',
                    flexShrink: 0
                  }}>
                    <div style={{
                      height: '180px', /* Rasio potrait 115x180 */
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#f0f0f0'
                    }}>
                      <img
                        src={pub.cover ? `/storage/${pub.cover}` : '/images/default-cover.png'}
                        alt={pub.judul}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                          width: 'auto',
                          height: 'auto',
                          display: 'block'
                        }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          fontSize: '16px',
                          color: '#2d5036',
                          lineHeight: '1.3',
                        }}
                      >
                        {pub.judul}
                      </Title>

                      <a
                        href={`/storage/${pub.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '6px',
                          backgroundColor: '#2d5036',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '14px',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7,10 12,15 17,10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                      </a>
                    </div>

                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '12px',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          <strong>Tgl:</strong> {pub.tanggal_rilis}
                        </Text>
                        {pub.nomor_publikasi && (
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            <strong>No:</strong> {pub.nomor_publikasi}
                          </Text>
                        )}
                        {pub.nomor_issn && (
                          <Text type="secondary" style={{ fontSize: '12px' }}>
                            <strong>ISSN:</strong> {pub.nomor_issn}
                          </Text>
                        )}
                      </div>
                    </div>

                    {pub.abstraksi && (
                      <Text
                        style={{
                          fontSize: '12px',
                          color: '#6c757d',
                          lineHeight: '1.4',
                          maxHeight: '2.8em',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          marginBottom: '8px',
                          fontStyle: 'italic'
                        }}
                      >
                        <strong>Abstrak:</strong> {pub.abstraksi}
                      </Text>
                    )}

                    {pub.keterangan && (
                      <Text
                        style={{
                          fontSize: '13px',
                          color: '#495057',
                          lineHeight: '1.5',
                          maxHeight: '3em',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          marginBottom: '8px'
                        }}
                      >
                        {pub.keterangan}
                      </Text>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          <div style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px'
          }}>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            >
              Sebelumnya
            </button>

            <span style={{ margin: '0 10px', fontSize: '14px' }}>
              Hal {currentPage} dari {totalPages}
            </span>

            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            >
              Berikutnya
            </button>
          </div>
        </div>

        {/* Information Section */}
        <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#e9ecef', borderRadius: '8px' }}>
          <Title
            level={3}
            style={{
              color: '#2d5036',
              marginBottom: '16px',
              fontSize: '20px'
            }}
          >
            Manfaatkan Publikasi untuk Pengembangan Pertanian
          </Title>
          <Paragraph
            style={{
              color: '#495057',
              maxWidth: '600px',
              margin: '0 auto 16px',
              fontSize: '16px'
            }}
          >
            Publikasi ini menyediakan informasi dan analisis terkini yang dikumpulkan dan dikelola
            oleh Kementerian Pertanian untuk mendukung penelitian, inovasi, dan kebijakan pertanian yang berbasis data.
          </Paragraph>
        </div>
      </div>
    </PublicLayout>
  );
};

export default PublikasiPage;