import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Card, Col, Row, Typography, Table, Statistic, Tag, Button, Divider } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;

interface ProdukDomestikBrutoPageProps extends PageProps {
  // Props bisa ditambahkan sesuai kebutuhan dari backend
}

const ProdukDomestikBrutoPage: React.FC<ProdukDomestikBrutoPageProps> = () => {
  // Dummy data untuk Produk Domestik Bruto
  const gdpData = [
    { id: 1, tahun: 2023, sektor: 'Pertanian', pdrb: '2.897', satuan: 'triliun rupiah', persentase_pdb: '15.2%', kontribusi_triliun: '398.7' },
    { id: 2, tahun: 2022, sektor: 'Pertanian', pdrb: '2.712', satuan: 'triliun rupiah', persentase_pdb: '14.7%', kontribusi_triliun: '368.9' },
    { id: 3, tahun: 2021, sektor: 'Pertanian', pdrb: '2.534', satuan: 'triliun rupiah', persentase_pdb: '14.4%', kontribusi_triliun: '344.6' },
    { id: 4, tahun: 2020, sektor: 'Pertanian', pdrb: '2.361', satuan: 'triliun rupiah', persentase_pdb: '14.2%', kontribusi_triliun: '321.5' },
    { id: 5, tahun: 2019, sektor: 'Pertanian', pdrb: '2.198', satuan: 'triliun rupiah', persentase_pdb: '14.1%', kontribusi_triliun: '298.3' },
    { id: 6, tahun: 2018, sektor: 'Pertanian', pdrb: '2.043', satuan: 'triliun rupiah', persentase_pdb: '13.9%', kontribusi_triliun: '276.8' },
    { id: 7, tahun: 2017, sektor: 'Pertanian', pdrb: '1.891', satuan: 'triliun rupiah', persentase_pdb: '13.7%', kontribusi_triliun: '259.1' },
    { id: 8, tahun: 2016, sektor: 'Pertanian', pdrb: '1.756', satuan: 'triliun rupiah', persentase_pdb: '13.5%', kontribusi_triliun: '237.1' },
  ];

  const subsectorData = [
    { id: 1, subsektor: 'Tanaman Pangan', kontribusi: '45.2%', nilai: '1.308', satuan: 'triliun' },
    { id: 2, subsektor: 'Perkebunan', kontribusi: '28.7%', nilai: '0.831', satuan: 'triliun' },
    { id: 3, subsektor: 'Peternakan', kontribusi: '18.3%', nilai: '0.529', satuan: 'triliun' },
    { id: 4, subsektor: 'Perikanan', kontribusi: '7.8%', nilai: '0.226', satuan: 'triliun' },
  ];

  const columns = [
    {
      title: 'Tahun',
      dataIndex: 'tahun',
      key: 'tahun',
    },
    {
      title: 'Sektor',
      dataIndex: 'sektor',
      key: 'sektor',
    },
    {
      title: 'PDRB',
      dataIndex: 'pdrb',
      key: 'pdrb',
      render: (text: string, record: any) => `${text} ${record.satuan}`,
    },
    {
      title: 'Kontribusi terhadap PDB',
      dataIndex: 'persentase_pdb',
      key: 'persentase_pdb',
    },
    {
      title: 'Kontribusi (Triliun Rupiah)',
      dataIndex: 'kontribusi_triliun',
      key: 'kontribusi_triliun',
    },
  ];

  const subsectorColumns = [
    {
      title: 'Subsektor',
      dataIndex: 'subsektor',
      key: 'subsektor',
    },
    {
      title: 'Kontribusi terhadap Sektor Pertanian',
      dataIndex: 'kontribusi',
      key: 'kontribusi',
    },
    {
      title: 'Nilai (Triliun Rupiah)',
      dataIndex: 'nilai',
      key: 'nilai',
      render: (nilai: string, record: any) => `${nilai} ${record.satuan}`,
    },
  ];

  return (
    <PublicLayout title="Produk Domestik Bruto Pertanian - Satudata Pertanian">
      <Head title="Produk Domestik Bruto Pertanian - Satudata Pertanian" />
      
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '20px',
          background: 'linear-gradient(135deg, #a8d5ba 0%, #e8f5e9 100%)',
          borderRadius: '12px'
        }}>
          <Title 
            level={1} 
            style={{ 
              color: '#2d5036', 
              marginBottom: '12px',
              fontSize: '28px',
              fontWeight: '700',
              animation: 'fadeInUp 1.2s ease-out'
            }}
          >
            Produk Domestik Bruto Sektor Pertanian
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#495057' }}>
            Informasi tentang kontribusi sektor pertanian terhadap Produk Domestik Bruto (PDB) nasional serta pembagian kontribusi dari berbagai subsektor pertanian
          </Paragraph>
        </div>

        {/* Stats Overview */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}>
                <Statistic 
                  title="Total Kontribusi 2023" 
                  value={2.897} 
                  precision={3}
                  prefix="Rp "
                  suffix="T"
                  valueStyle={{ color: '#2d5036', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <Statistic 
                  title="Persentase terhadap PDB" 
                  value={15.2} 
                  precision={1}
                  suffix="%"
                  valueStyle={{ color: '#1976d2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <Statistic 
                  title="Tahun Data Terbaru" 
                  value={2023} 
                  valueStyle={{ color: '#ef6c00', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#f3e5f5' }}>
                <Statistic 
                  title="Jumlah Dataset" 
                  value={8} 
                  suffix="tahun"
                  valueStyle={{ color: '#7b1fa2', fontWeight: 'bold' }}
                />
              </Card>
            </Col>
          </Row>
        </div>

        {/* Main Data Table */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Data Historis PDRB Sektor Pertanian</Title>
          <Table 
            columns={columns} 
            dataSource={gdpData} 
            rowKey="id"
            pagination={{ 
              pageSize: 10, 
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} entri`
            }}
          />
        </Card>

        {/* Sector Breakdown */}
        <Card style={{ marginBottom: '30px' }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '20px' }}>Rincian Kontribusi Subsektor Pertanian (2023)</Title>
          <Table 
            columns={subsectorColumns} 
            dataSource={subsectorData} 
            rowKey="id"
            pagination={false}
          />
        </Card>

        {/* Information Section */}
        <div style={{ marginBottom: '30px' }}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Definisi Produk Domestik Bruto (PDB)</Title>
                <Paragraph>
                  Produk Domestik Bruto (PDB) adalah ukuran nilai pasar dari semua barang dan jasa akhir 
                  yang diproduksi dalam suatu wilayah dalam periode tertentu. Sektor pertanian mencakup 
                  tanaman pangan, hortikultura, perkebunan, peternakan, dan perikanan.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card>
                <Title level={4} style={{ color: '#2d5036' }}>Metodologi Penghitungan</Title>
                <Paragraph>
                  PDB sektor pertanian dihitung berdasarkan pendekatan produksi dan menggunakan data 
                  dari Survei Sektoral yang dilakukan oleh Badan Pusat Statistik (BPS) serta data 
                  administrasi dari Kementerian Pertanian.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Trend Analysis */}
        <div style={{ marginBottom: '30px' }}>
          <Title level={2} style={{ color: '#2d5036', marginBottom: '20px' }}>Analisis Tren (2016-2023)</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e8f5e9' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Pertumbuhan Rata-rata</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#1b5e20' }}>3.2%/tahun</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#e3f2fd' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Tahun Tertinggi</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#0d47a1' }}>2023</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#fff3e0' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Subsektor Terbesar</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#e65100' }}>Tanaman Pangan</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card hoverable style={{ textAlign: 'center', height: '100%', background: '#f3e5f5' }}>
                <Title level={4} style={{ color: '#2d5036' }}>Tren Umum</Title>
                <Paragraph style={{ fontSize: '20px', fontWeight: 'bold', color: '#4a148c' }}>Naik</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* CTA Section */}
        <div style={{ 
          textAlign: 'center', 
          padding: '30px', 
          background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)', 
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <Title level={3} style={{ color: '#2d5036', marginBottom: '16px' }}>Analisis Lebih Lanjut</Title>
          <Paragraph style={{ color: '#495057', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Dapatkan akses ke dataset lengkap Produk Domestik Bruto sektor pertanian untuk menganalisis tren dan pola perkembangan sektor pertanian Indonesia.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            style={{ 
              background: '#2d5036', 
              borderColor: '#2d5036',
              fontSize: '16px',
              padding: '0 30px'
            }}
          >
            Unduh Dataset PDB
          </Button>
        </div>
        
        <style>{`
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </PublicLayout>
  );
};

export default ProdukDomestikBrutoPage;