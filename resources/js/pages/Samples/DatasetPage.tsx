import PublicLayout from '@/layouts/PublicLayout';
import { PageProps } from '@/types';
import { Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface Dataset {
  id: number;
  judul: string;
  tanggal_rilis: string;
  abstraksi: string;
  is_data_prioritas: boolean;
  link_meta: string | null;
  file_meta1: string | null;
  file_meta2: string | null;
  file_meta3: string | null;
  ukuran_file: number | null;
  file_statistik: string;
  created_at: string;
}

interface Paginator {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  links: Record<string, string>;
}

interface DatasetPageProps extends PageProps {
  datasets: Dataset[];
  paginator: Paginator;
  filters: {
    search: string;
    prioritas: string;
  };
}

const DatasetPage: React.FC<DatasetPageProps> = ({ datasets = [], paginator, filters = { search: '', prioritas: '' } }) => {
  const [search, setSearch] = useState(filters.search);
  const [prioritas, setPrioritas] = useState(filters.prioritas);
  const [currentPage, setCurrentPage] = useState(paginator.current_page);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi untuk menangani submit form pencarian
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.get('/dataset', {
      search,
      prioritas,
      page: 1 // Reset ke halaman pertama saat pencarian
    }, {
      preserveScroll: true,
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false)
    });
  };

  // Fungsi untuk reset filter
  const handleReset = () => {
    setSearch('');
    setPrioritas('');
    setIsLoading(true);
    router.get('/dataset', {}, {
      preserveScroll: true,
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false)
    });
  };

  // Fungsi untuk mengganti halaman
  const changePage = (page: number) => {
    if (page >= 1 && page <= paginator.last_page && page !== currentPage) {
      setIsLoading(true);
      router.get('/dataset', {
        search,
        prioritas,
        page
      }, {
        preserveScroll: true,
        onSuccess: () => setIsLoading(false),
        onError: () => setIsLoading(false)
      });
    }
  };

  return (
    <PublicLayout title="Dataset - Satudata Pertanian">
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <h1 style={{ color: '#2d5036', marginBottom: '10px' }}>Dataset - Satudata Pertanian</h1>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
            Temukan berbagai dataset yang tersedia dari Kementerian Pertanian untuk mendukung
            penelitian, analisis, dan pengambilan keputusan di sektor pertanian.
          </p>
        </div>

        <h1 style={{ color: '#2d5036', marginBottom: '20px' }}>Dataset Tersedia</h1>
        <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#495057' }}>
          Temukan berbagai dataset yang tersedia dari Kementerian Pertanian untuk mendukung
          penelitian, analisis, dan pengambilan keputusan di sektor pertanian.
        </p>

        {/* Form pencarian dan filter */}
        <div style={{
          marginBottom: '30px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <form onSubmit={handleSearchSubmit}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '15px',
              alignItems: 'end'
            }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label htmlFor="search" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Pencarian
                </label>
                <input
                  id="search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari berdasarkan judul atau abstraksi..."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                />
              </div>

              <div style={{ flex: 1, minWidth: '200px' }}>
                <label htmlFor="prioritas" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Status Prioritas
                </label>
                <select
                  id="prioritas"
                  value={prioritas}
                  onChange={(e) => setPrioritas(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #ced4da',
                    borderRadius: '4px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Semua Status</option>
                  <option value="1">Prioritas</option>
                  <option value="0">Non-Prioritas</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#2d5036',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {isLoading ? 'Mencari...' : 'Cari'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Tabel dataset */}
        <div style={{ marginBottom: '20px' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{
                  padding: '12px',
                  border: '1px solid #dee2e6',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: '#2d5036'
                }}>No</th>
                <th style={{
                  padding: '12px',
                  border: '1px solid #dee2e6',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: '#2d5036'
                }}>Judul</th>
                <th style={{
                  padding: '12px',
                  border: '1px solid #dee2e6',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: '#2d5036'
                }}>Tanggal Rilis</th>
                <th style={{
                  padding: '12px',
                  border: '1px solid #dee2e6',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: '#2d5036'
                }}>Prioritas</th>
                <th style={{
                  padding: '12px',
                  border: '1px solid #dee2e6',
                  textAlign: 'left',
                  fontWeight: 'bold',
                  color: '#2d5036'
                }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {datasets.length > 0 ? (
                datasets.map((dataset, index) => (
                  <tr key={dataset.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      {(paginator.current_page - 1) * paginator.per_page + index + 1}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      <div style={{ fontWeight: 'bold', color: '#2d5036', marginBottom: '4px' }}>
                        {dataset.judul}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6c757d', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {dataset.abstraksi}
                      </div>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                      {dataset.tanggal_rilis ? new Date(dataset.tanggal_rilis).toLocaleDateString('id-ID') : 'N/A'}
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: dataset.is_data_prioritas ? '#ffc107' : '#d4edda',
                        color: dataset.is_data_prioritas ? '#856404' : '#155724',
                        borderRadius: '4px',
                        fontSize: '12px'
                      }}>
                        {dataset.is_data_prioritas ? 'Prioritas' : 'Non-Prioritas'}
                      </span>
                    </td>
                    <td style={{ padding: '12px', border: '1px solid #dee2e6', textAlign: 'center' }}>
                      <a
                        href={dataset.link_meta || `#${dataset.file_statistik}`}
                        download
                        style={{
                          padding: '6px 12px',
                          backgroundColor: '#2d5036',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          textDecoration: 'none',
                          display: 'inline-block'
                        }}
                      >
                        Unduh
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ padding: '20px', textAlign: 'center', border: '1px solid #dee2e6' }}>
                    Tidak ada dataset yang ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {paginator.last_page > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px',
            marginTop: '20px',
            padding: '15px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
          }}>
            <div style={{ fontSize: '14px', color: '#495057' }}>
              Menampilkan {paginator.from}-{paginator.to} dari {paginator.total} dataset
            </div>

            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {/* Tombol Previous */}
              <button
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 12px',
                  backgroundColor: currentPage === 1 ? '#e9ecef' : '#2d5036',
                  color: currentPage === 1 ? '#adb5bd' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                Sebelumnya
              </button>

              {/* Nomor halaman */}
              {Array.from({ length: paginator.last_page }, (_, i) => i + 1).map(page => {
                const isCurrent = page === currentPage;
                const isNearby = Math.abs(page - currentPage) <= 2;

                if (page === 1 || page === paginator.last_page || isNearby) {
                  return (
                    <button
                      key={page}
                      onClick={() => changePage(page)}
                      style={{
                        padding: '8px 12px',
                        backgroundColor: isCurrent ? '#2d5036' : '#e9ecef',
                        color: isCurrent ? 'white' : '#495057',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        minWidth: '40px'
                      }}
                    >
                      {page}
                    </button>
                  );
                } else if (Math.abs(page - currentPage) === 3) {
                  return <span key={page} style={{ padding: '8px 4px', fontSize: '14px' }}>...</span>;
                }
                return null;
              })}

              {/* Tombol Next */}
              <button
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === paginator.last_page}
                style={{
                  padding: '8px 12px',
                  backgroundColor: currentPage === paginator.last_page ? '#e9ecef' : '#2d5036',
                  color: currentPage === paginator.last_page ? '#adb5bd' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: currentPage === paginator.last_page ? 'not-allowed' : 'pointer',
                  fontSize: '14px'
                }}
              >
                Berikutnya
              </button>
            </div>
          </div>
        )}

        <div style={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#e9ecef',
          borderRadius: '8px'
        }}>
          <h3 style={{ color: '#2d5036', marginBottom: '15px' }}>Navigasi Halaman</h3>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
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

export default DatasetPage;