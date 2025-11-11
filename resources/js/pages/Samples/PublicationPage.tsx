import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

interface PublicationPageProps extends PageProps {
  // Tidak perlu props dari backend karena ini hanya tampilan
}

const PublicationPage: React.FC<PublicationPageProps> = () => {
  return (
    <PublicLayout title="Publikasi - Satudata Pertanian">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h1 style={{ color: '#2d5036', marginBottom: '10px' }}>Contoh Halaman Publikasi</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
            Halaman ini menunjukkan navbar dengan animasi yang telah dibuat
          </p>
        </div>
        
        <h1 style={{ color: '#2d5036', marginBottom: '20px' }}>Publikasi</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
          Temukan berbagai publikasi resmi dari Kementerian Pertanian yang menyajikan 
          informasi dan analisis terkini tentang sektor pertanian di Indonesia.
        </p>
        
        <div style={{ marginTop: '30px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} style={{ 
                padding: '20px', 
                border: '1px solid #e9ecef', 
                borderRadius: '8px',
                backgroundColor: '#fff',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ color: '#2d5036', marginBottom: '10px' }}>
                  Publikasi Contoh {item}
                </h3>
                <p style={{ color: '#6c757d', marginBottom: '15px', fontSize: '14px' }}>
                  Penjelasan singkat tentang isi publikasi dan temuan utamanya dalam 
                  penelitian atau analisis sektor pertanian.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ 
                    fontSize: '12px',
                    color: '#2d5036'
                  }}>
                    15 Maret 2024
                  </span>
                  <button style={{
                    padding: '6px 12px',
                    backgroundColor: '#2d5036',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px'
                  }}>
                    Baca
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#2d5036',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Lihat Semua Publikasi
          </button>
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
              href="/publikasi"
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
              Publikasi Asli
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
              href="/samples/home"
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
              Beranda
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

export default PublicationPage;