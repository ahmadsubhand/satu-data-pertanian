import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

interface DataPageProps extends PageProps {
  // Tidak perlu props dari backend karena ini hanya tampilan
}

const DataPage: React.FC<DataPageProps> = () => {
  return (
    <PublicLayout title="Data - Satudata Pertanian">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h1 style={{ color: '#2d5036', marginBottom: '10px' }}>Contoh Halaman Data</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
            Halaman ini menunjukkan navbar dengan animasi yang telah dibuat
          </p>
        </div>
        
        <h1 style={{ color: '#2d5036', marginBottom: '20px' }}>Data</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
          Jelajahi berbagai jenis data yang tersedia di Satudata Pertanian, termasuk data 
          statistik dan data geospasial yang relevan dengan sektor pertanian di Indonesia.
        </p>
        
        <div style={{ marginTop: '30px' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px' 
          }}>
            <div style={{ 
              padding: '25px', 
              border: '1px solid #e9ecef', 
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2d5036', marginBottom: '15px' }}>Statistik</h3>
              <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                Data statistik sektor pertanian mencakup produksi, luas lahan, 
                produktivitas, dan indikator pertanian lainnya.
              </p>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#2d5036',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Jelajahi Data
              </button>
            </div>
            
            <div style={{ 
              padding: '25px', 
              border: '1px solid #e9ecef', 
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#2d5036', marginBottom: '15px' }}>Geospasial</h3>
              <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                Data geospasial pertanian mencakup peta lahan, zona agroekologi, 
                dan informasi spasial lainnya.
              </p>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#2d5036',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Jelajahi Peta
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#2d5036', marginBottom: '20px' }}>Statistik Terkini</h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '15px' 
          }}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} style={{ 
                padding: '15px', 
                border: '1px solid #e9ecef', 
                borderRadius: '6px',
                backgroundColor: '#f8f9fa',
                textAlign: 'center'
              }}>
                <h4 style={{ color: '#2d5036', marginBottom: '5px' }}>
                  Indikator {item}
                </h4>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#2d5036', margin: '10px 0' }}>
                  {item * 1234}
                </p>
                <p style={{ fontSize: '12px', color: '#6c757d' }}>
                  Unit: ton/ha
                </p>
              </div>
            ))}
          </div>
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
              href="/data/statistical"
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
              Data Asli
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

export default DataPage;