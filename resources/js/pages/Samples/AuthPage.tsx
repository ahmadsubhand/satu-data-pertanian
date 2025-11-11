import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

interface AuthPageProps extends PageProps {
  // Tidak perlu props dari backend karena ini hanya tampilan
}

const AuthPage: React.FC<AuthPageProps> = () => {
  return (
    <PublicLayout title="Login - Satudata Pertanian">
      <div style={{ 
        padding: '20px', 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h1 style={{ color: '#2d5036', marginBottom: '10px' }}>Contoh Halaman Login</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
            Halaman ini menunjukkan navbar dengan animasi yang telah dibuat
          </p>
        </div>
        
        <div style={{ 
          padding: '20px', 
          maxWidth: '1200px', 
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}>
          <div style={{ 
            width: '100%',
            maxWidth: '400px',
            padding: '30px',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: '#2d5036', textAlign: 'center', marginBottom: '30px' }}>Masuk ke Akun</h2>
            
            <form>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#495057' }}>
                  Email
                </label>
                <input
                  type="email"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  placeholder="masukkan email Anda"
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#495057' }}>
                  Kata Sandi
                </label>
                <input
                  type="password"
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '16px'
                  }}
                  placeholder="masukkan kata sandi Anda"
                />
              </div>
              
              <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="remember"
                  style={{ marginRight: '8px' }}
                />
                <label htmlFor="remember" style={{ color: '#495057' }}>
                  Ingat saya
                </label>
              </div>
              
              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#2d5036',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  marginBottom: '15px'
                }}
              >
                Masuk
              </button>
              
              <div style={{ textAlign: 'center' }}>
                <a 
                  href="#" 
                  style={{ 
                    color: '#2d5036', 
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  Lupa kata sandi?
                </a>
              </div>
            </form>
            
            <div style={{ 
              textAlign: 'center', 
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '1px solid #e9ecef'
            }}>
              <p style={{ color: '#6c757d', marginBottom: '10px' }}>
                Belum punya akun?
              </p>
              <a 
                href="#" 
                style={{ 
                  color: '#2d5036', 
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Daftar Sekarang
              </a>
            </div>
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
              href="/auth/login"
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
              Login Asli
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

export default AuthPage;