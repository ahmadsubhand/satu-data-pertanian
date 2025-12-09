import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

interface SampleIndexPageProps extends PageProps {
  // Tidak perlu props dari backend karena ini hanya tampilan
}

const SampleIndexPage: React.FC<SampleIndexPageProps> = () => {
  return (
    <PublicLayout title="Contoh Halaman - Satu Data Pertanian">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ color: '#2d5036', marginBottom: '20px' }}>Contoh Halaman</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
          Berikut adalah contoh halaman-halaman yang menggunakan navbar dengan animasi yang telah dibuat.
          Silakan klik link di bawah untuk melihat tampilan masing-masing halaman.
        </p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px', 
          marginTop: '40px' 
        }}>
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d5036', marginBottom: '10px' }}>Beranda</h3>
            <p style={{ color: '#6c757d', marginBottom: '15px' }}>
              Halaman utama dengan informasi utama
            </p>
            <Link 
              href="/samples/home"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block',
                marginBottom: '10px'
              }}
            >
              Lihat Halaman
            </Link>
            <br />
            <Link 
              href="/"
              style={{
                padding: '6px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'inline-block'
              }}
            >
              Ke Beranda Asli
            </Link>
          </div>
          
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d5036', marginBottom: '10px' }}>Dataset</h3>
            <p style={{ color: '#6c757d', marginBottom: '15px' }}>
              Halaman daftar dan informasi dataset
            </p>
            <Link 
              href="/samples/dataset"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block',
                marginBottom: '10px'
              }}
            >
              Lihat Halaman
            </Link>
            <br />
            <Link 
              href="/dataset"
              style={{
                padding: '6px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'inline-block'
              }}
            >
              Ke Dataset Asli
            </Link>
          </div>
          
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d5036', marginBottom: '10px' }}>Publikasi</h3>
            <p style={{ color: '#6c757d', marginBottom: '15px' }}>
              Halaman publikasi dan laporan
            </p>
            <Link 
              href="/samples/publication"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block',
                marginBottom: '10px'
              }}
            >
              Lihat Halaman
            </Link>
            <br />
            <Link 
              href="/publikasi"
              style={{
                padding: '6px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'inline-block'
              }}
            >
              Ke Publikasi Asli
            </Link>
          </div>
          
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d5036', marginBottom: '10px' }}>Tentang Kami</h3>
            <p style={{ color: '#6c757d', marginBottom: '15px' }}>
              Informasi tentang Satu Data Pertanian
            </p>
            <Link 
              href="/samples/about"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block',
                marginBottom: '10px'
              }}
            >
              Lihat Halaman
            </Link>
            <br />
            <Link 
              href="/about"
              style={{
                padding: '6px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'inline-block'
              }}
            >
              Ke Tentang Kami Asli
            </Link>
          </div>
          
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d5036', marginBottom: '10px' }}>Data</h3>
            <p style={{ color: '#6c757d', marginBottom: '15px' }}>
              Data statistik dan geospasial
            </p>
            <Link 
              href="/samples/data"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block',
                marginBottom: '10px'
              }}
            >
              Lihat Halaman
            </Link>
            <br />
            <Link 
              href="/data/statistical"
              style={{
                padding: '6px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'inline-block'
              }}
            >
              Ke Data Asli
            </Link>
          </div>
          
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d5036', marginBottom: '10px' }}>Login</h3>
            <p style={{ color: '#6c757d', marginBottom: '15px' }}>
              Halaman otentikasi pengguna
            </p>
            <Link 
              href="/samples/auth"
              style={{
                padding: '8px 16px',
                backgroundColor: '#2d5036',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                display: 'inline-block',
                marginBottom: '10px'
              }}
            >
              Lihat Halaman
            </Link>
            <br />
            <Link 
              href="/auth/login"
              style={{
                padding: '6px 12px',
                backgroundColor: '#4CAF50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '12px',
                display: 'inline-block'
              }}
            >
              Ke Login Asli
            </Link>
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#e9ecef',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#2d5036', marginBottom: '15px' }}>Navigasi Cepat</h3>
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
              Beranda
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
              href="/dataset"
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
              Dataset Asli
            </Link>
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
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default SampleIndexPage;