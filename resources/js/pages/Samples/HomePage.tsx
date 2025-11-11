import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

interface HomePageProps extends PageProps {
  // Tidak perlu props dari backend karena ini hanya tampilan
}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <PublicLayout title="Beranda - Satudata Pertanian">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h1 style={{ color: '#2d5036', marginBottom: '10px' }}>Contoh Halaman Beranda</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
            Halaman ini menunjukkan navbar dengan animasi yang telah dibuat
          </p>
        </div>
        
        <h1 style={{ color: '#2d5036', marginBottom: '20px' }}>Selamat Datang di Satudata Pertanian</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
          Portal satu data untuk sektor pertanian yang menyediakan informasi data statistik, 
          geospasial, dan publikasi terkait pembangunan pertanian di Indonesia.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '20px', 
          marginTop: '30px' 
        }}>
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
          }}>
            <h3 style={{ color: '#2d5036' }}>Dataset Tersedia</h3>
            <p>150+</p>
          </div>
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
          }}>
            <h3 style={{ color: '#2d5036' }}>Publikasi</h3>
            <p>85+</p>
          </div>
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
          }}>
            <h3 style={{ color: '#2d5036' }}>Indikator</h3>
            <p>200+</p>
          </div>
        </div>
        
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#2d5036', marginBottom: '20px' }}>Tentang Satudata Pertanian</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
            Satudata Pertanian adalah platform yang menyediakan akses terhadap berbagai 
            data pertanian yang terpercaya dan terkini. Kami berkomitmen untuk menyediakan 
            data yang akurat demi mendukung pengambilan keputusan yang baik di sektor pertanian.
          </p>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#e9ecef',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#2d5036', marginBottom: '15px' }}>Navigasi Contoh Halaman</h3>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <Link 
              href="/"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              Beranda Asli
            </Link>
            <Link 
              href="/samples"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              Index Sample
            </Link>
            <Link 
              href="/samples/dataset"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              Dataset
            </Link>
            <Link 
              href="/samples/publication"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              Publikasi
            </Link>
            <Link 
              href="/samples/about"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block'
              }}
            >
              Tentang Kami
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default HomePage;