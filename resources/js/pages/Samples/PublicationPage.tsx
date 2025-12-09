import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react';

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

interface PublicationPageProps extends PageProps {
  publikasi: Publication[];
}

const PublicationPage: React.FC<PublicationPageProps> = ({ publikasi = [] }) => {
  return (
    <PublicLayout title="Publikasi - Satu Data Pertanian">
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
          {publikasi.length > 0 ? (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px'
            }}>
              {publikasi.map((pub) => (
                <div
                  key={pub.id}
                  style={{
                    padding: '16px',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    flex: '1 1 calc(50% - 12px)', // 2 cards per row on desktop
                    maxWidth: 'calc(50% - 12px)', // 2 cards per row
                    minWidth: '300px', // Minimum width for mobile
                  }}
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
                        <h3 style={{
                          margin: 0,
                          fontSize: '16px',
                          color: '#2d5036',
                          lineHeight: '1.3',
                          marginBottom: '8px'
                        }}>
                          {pub.judul}
                        </h3>

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
                          <span style={{ fontSize: '12px', color: '#6c757d' }}>
                            <strong>Tgl:</strong> {pub.tanggal_rilis}
                          </span>
                          {pub.nomor_publikasi && (
                            <span style={{ fontSize: '12px', color: '#6c757d' }}>
                              <strong>No:</strong> {pub.nomor_publikasi}
                            </span>
                          )}
                          {pub.nomor_issn && (
                            <span style={{ fontSize: '12px', color: '#6c757d' }}>
                              <strong>ISSN:</strong> {pub.nomor_issn}
                            </span>
                          )}
                        </div>
                      </div>

                      {pub.abstraksi && (
                        <p style={{
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
                        }}>
                          <strong>Abstrak:</strong> {pub.abstraksi}
                        </p>
                      )}

                      {pub.keterangan && (
                        <p style={{
                          fontSize: '13px',
                          color: '#6c757d',
                          lineHeight: '1.5',
                          maxHeight: '3em',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          marginBottom: '8px'
                        }}>
                          {pub.keterangan}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#6c757d'
            }}>
              <p>Belum ada publikasi tersedia.</p>
            </div>
          )}
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