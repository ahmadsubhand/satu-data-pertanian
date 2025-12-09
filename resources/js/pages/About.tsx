import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, Typography } from 'antd';
import React from 'react';
import PublicLayout from '@/layouts/PublicLayout';

const { Title, Paragraph } = Typography;



const AboutPage: React.FC = ({}) => {
  return (
    <PublicLayout title="Tentang - Satu Data Pertanian">
      <Head title="Tentang - Satu Data Pertanian" />
      
      <div>
        <Title level={1} style={{ color: '#2d5036', textAlign: 'center', marginBottom: '32px' }}>Tentang Satu Data Pertanian</Title>
        
        <Card style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ color: '#2d5036' }}>Apa itu Satu Data Pertanian?</Title>
          <Paragraph>
            Satu Data Pertanian adalah portal data tunggal untuk sektor pertanian di Indonesia.
            Platform ini dirancang untuk menyatukan berbagai sumber data pertanian dari berbagai 
            unit dan instansi terkait, sehingga memudahkan aksesibilitas dan ketersediaan data 
            yang akurat dan terpercaya bagi seluruh stakeholder.
          </Paragraph>
        </Card>
        
        <Card style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ color: '#2d5036' }}>Tujuan dan Manfaat</Title>
          <Paragraph>
            Tujuan utama dari Satu Data Pertanian adalah:
          </Paragraph>
          <ul>
            <li>Menyediakan satu sumber data pertanian yang terpadu dan terpercaya</li>
            <li>Meningkatkan transparansi dan akuntabilitas dalam pengelolaan data pertanian</li>
            <li>Mendukung kebijakan dan keputusan berbasis data di sektor pertanian</li>
            <li>Meningkatkan efisiensi dan efektivitas dalam pemanfaatan data</li>
            <li>Memudahkan akses dan penggunaan data bagi berbagai pihak</li>
            <li>Meningkatkan kualitas dan kuantitas pengambilan keputusan di bidang pertanian</li>
          </ul>
        </Card>
        
        <Card style={{ marginBottom: '24px' }}>
          <Title level={2} style={{ color: '#2d5036' }}>Cakupan Data</Title>
          <Paragraph>
            Portal ini menyediakan berbagai jenis data pertanian, antara lain:
          </Paragraph>
          <ul>
            <li>Data statistik pertanian (produksi, luas panen, produktivitas, dll)</li>
            <li>Data geospasial (peta potensi pertanian, zona agroekosistem, dll)</li>
            <li>Data pasar dan harga hasil pertanian</li>
            <li>Data laporan dan publikasi kebijakan pertanian</li>
            <li>Data iklim dan cuaca yang berpengaruh terhadap pertanian</li>
            <li>Indikator ekonomi pertanian</li>
          </ul>
        </Card>
        
        <Card>
          <Title level={2} style={{ color: '#2d5036' }}>Struktur Organisasi</Title>
          <Paragraph>
            Portal Satu Data Pertanian dikelola oleh Kementerian Pertanian melalui unit-unit
            teknis yang berkompeten di bidang data dan informasi pertanian. Struktur ini
            didukung oleh sistem tata kelola data yang jelas, termasuk kebijakan dan
            prosedur standar untuk pengelolaan data.
          </Paragraph>
        </Card>
      </div>
    </PublicLayout>
  );
};

export default AboutPage;