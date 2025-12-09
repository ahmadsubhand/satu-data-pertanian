import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

interface AboutPageProps extends PageProps {
  // Tidak perlu props dari backend karena ini hanya tampilan
}

const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <PublicLayout title="Tentang Kami - Satu Data Pertanian">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h1 style={{ color: '#2d5036', marginBottom: '10px' }}>Contoh Halaman Tentang Kami</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
            Halaman ini menunjukkan navbar dengan animasi yang telah dibuat
          </p>
        </div>
        
        <h1 style={{ color: '#2d5036', marginBottom: '20px' }}>Tentang Kami</h1>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #a8d5ba 0%, #d0f0e0 100%)', 
          borderRadius: '12px', 
          padding: '30px 20px', 
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#2d5036', marginBottom: '12px', fontSize: '28px' }}>
            Satu Data Pertanian
          </h2>
          <p style={{ 
            fontSize: '16px', 
            color: '#495057', 
            maxWidth: '800px', 
            margin: '0 auto 16px',
            lineHeight: '1.6'
          }}>
            Portal satu data untuk sektor pertanian yang menyediakan informasi data statistik, 
            geospasial, dan publikasi terkait pembangunan pertanian di Indonesia.
          </p>
        </div>
        
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#2d5036', marginBottom: '20px' }}>Misi Kami</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
            Misi Satu Data Pertanian adalah menyediakan akses terbuka terhadap data pertanian
            yang akurat, terpercaya, dan terkini untuk mendukung pengambilan keputusan yang 
            berbasis data di sektor pertanian.
          </p>
        </div>
        
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#2d5036', marginBottom: '20px' }}>Visi Kami</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
            Menjadi platform data pertanian terkemuka yang mendukung transformasi digital 
            sektor pertanian dan mewujudkan ketahanan pangan nasional melalui pemanfaatan data.
          </p>
        </div>
        
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
            <h3 style={{ color: '#2d5036', marginBottom: '10px' }}>Akurasi Data</h3>
            <p style={{ color: '#6c757d' }}>
              Kami berkomitmen menyediakan data yang akurat dan terverifikasi.
            </p>
          </div>
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d5036', marginBottom: '10px' }}>Akses Terbuka</h3>
            <p style={{ color: '#6c757d' }}>
              Data kami dapat diakses secara terbuka oleh masyarakat.
            </p>
          </div>
          <div style={{ 
            padding: '20px', 
            border: '1px solid #e9ecef', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            textAlign: 'center'
          }}>
            <h3 style={{ color: '#2d5036', marginBottom: '10px' }}>Transparansi</h3>
            <p style={{ color: '#6c757d' }}>
              Proses pengumpulan dan pengolahan data kami lakukan secara transparan.
            </p>
          </div>
        </div>
        
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#2d5036', marginBottom: '15px' }}>Kontak Kami</h3>
          <p style={{ color: '#6c757d', marginBottom: '10px' }}>
            <strong>Alamat:</strong> Pusat Data dan Informasi Kementerian Pertanian
          </p>
          <p style={{ color: '#6c757d', marginBottom: '10px' }}>
            <strong>Telepon:</strong> (021) 7806131
          </p>
          <p style={{ color: '#6c757d' }}>
            <strong>Email:</strong> info@pertanian.go.id
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
              href="/about"
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
              Tentang Kami Asli
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
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default AboutPage;