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
      <div className="dataset-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Hero Section */}
        <div
          style={{
            background: 'linear-gradient(135deg, #2d5036 0%, #4a7c59 100%)',
            borderRadius: '16px',
            padding: '40px 30px',
            marginBottom: '30px',
            textAlign: 'center',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(45, 80, 54, 0.3)',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{
              color: 'white',
              marginBottom: '12px',
              fontSize: '32px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
            }}>
              📊 Dataset Satudata Pertanian
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#e8f5e9',
              maxWidth: '800px',
              margin: '0 auto 16px',
              lineHeight: '1.6',
            }}>
              Temukan berbagai dataset yang tersedia dari Kementerian Pertanian untuk mendukung
              penelitian, analisis, dan pengambilan keputusan di sektor pertanian.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '16px' }}>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '8px 16px',
                borderRadius: '20px',
                backdropFilter: 'blur(4px)',
                fontWeight: '600',
              }}>
                {datasets.length} Dataset Tersedia
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '8px 16px',
                borderRadius: '20px',
                backdropFilter: 'blur(4px)',
                fontWeight: '600',
              }}>
                Terbaru 2025
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{
            color: '#2d5036',
            marginBottom: '16px',
            fontSize: '28px',
          }}>
            Dataset Tersedia
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.6',
            color: '#495057',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            Temukan berbagai dataset yang tersedia dari Kementerian Pertanian untuk mendukung
            penelitian, analisis, dan pengambilan keputusan di sektor pertanian.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="search-filter-section" style={{
          marginBottom: '30px',
          padding: '25px',
          background: 'linear-gradient(to right, #f8f9fa, #e8f5e9)',
          borderRadius: '12px',
          boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
        }}>
          <form onSubmit={handleSearchSubmit}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              alignItems: 'end'
            }}>
              <div style={{
                flex: '1 1 250px',
                minWidth: '200px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <label htmlFor="search" style={{
                  display: 'block',
                  marginBottom: '0',
                  fontWeight: '600',
                  color: '#2d5036',
                  fontSize: '15px'
                }}>
                  🔍 Pencarian Dataset
                </label>
                <input
                  id="search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cari berdasarkan judul atau abstraksi..."
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #dfece0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#a8d5ba';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(45, 80, 54, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#dfece0';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  }}
                />
              </div>

              <div style={{
                flex: '1 1 250px',
                minWidth: '200px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <label htmlFor="prioritas" style={{
                  display: 'block',
                  marginBottom: '0',
                  fontWeight: '600',
                  color: '#2d5036',
                  fontSize: '15px'
                }}>
                  ⭐ Status Prioritas
                </label>
                <select
                  id="prioritas"
                  value={prioritas}
                  onChange={(e) => setPrioritas(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #dfece0',
                    borderRadius: '8px',
                    fontSize: '15px',
                    backgroundColor: 'white',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#a8d5ba';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(45, 80, 54, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#dfece0';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
                  }}
                >
                  <option value="">Semua Status</option>
                  <option value="1">Prioritas</option>
                  <option value="0">Non-Prioritas</option>
                </select>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
                flex: '0 0 auto'
              }}>
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #2d5036, #4CAF50)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(45, 80, 54, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1e3a25, #43A047)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(45, 80, 54, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #2d5036, #4CAF50)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 54, 0.3)';
                  }}
                >
                  {isLoading ? 'Mencari...' : '🔍 Cari Dataset'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isLoading}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #6c757d, #868e96)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    fontSize: '15px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(108, 117, 125, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #5a6268, #717a83)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(108, 117, 125, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #6c757d, #868e96)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(108, 117, 125, 0.3)';
                  }}
                >
                  ↺ Reset
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Dataset Listings with modern card layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(350px, 100%), 1fr))',
          gap: '25px',
          marginBottom: '30px'
        }}>
          {datasets.length > 0 ? (
            datasets.map((dataset, index) => (
              <div
                key={dataset.id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
                  border: '1px solid #e9ecef',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  position: 'relative',
                  overflow: 'hidden',
                  borderLeft: '4px solid #2d5036',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(45, 80, 54, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
                }}
              >
                {/* Dataset title */}
                <h3 style={{
                  color: '#2d5036',
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  lineHeight: '1.4',
                }}>
                  {dataset.judul}
                </h3>

                {/* Status indicator moved below the title */}
                <div style={{
                  background: dataset.is_data_prioritas ? '#fff3cd' : '#d4edda',
                  color: dataset.is_data_prioritas ? '#856404' : '#155724',
                  padding: '4px 12px',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}>
                  {dataset.is_data_prioritas ? (
                    <>
                      <span>⭐</span> Prioritas
                    </>
                  ) : (
                    <>
                      <span>📋</span> Non-Prioritas
                    </>
                  )}
                </div>

                {/* Date and metadata */}
                <div style={{
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '15px',
                  flexWrap: 'wrap',
                }}>
                  <span style={{
                    background: '#e8f5e9',
                    color: '#2d5036',
                    padding: '4px 10px',
                    borderRadius: '15px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}>
                    <span>📅</span>
                    {dataset.tanggal_rilis ? new Date(dataset.tanggal_rilis).toLocaleDateString('id-ID') : 'N/A'}
                  </span>
                </div>

                {/* Abstract/description */}
                <p style={{
                  color: '#555',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  maxHeight: '60px',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}>
                  {dataset.abstraksi || 'Deskripsi tidak tersedia'}
                </p>

                {/* Action buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '15px',
                  paddingTop: '15px',
                  borderTop: '1px dashed #dfece0',
                }}>
                  <a
                    href={dataset.file_statistik}
                    download
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '10px 18px',
                      background: 'linear-gradient(135deg, #2d5036, #4CAF50)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 12px rgba(45, 80, 54, 0.3)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #1e3a25, #43A047)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(45, 80, 54, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'linear-gradient(135deg, #2d5036, #4CAF50)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 54, 0.3)';
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: '6px' }}
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7,10 12,15 17,10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Unduh
                  </a>

                  <div style={{
                    fontSize: '13px',
                    background: '#e8f5e9',
                    color: '#2d5036',
                    padding: '5px 12px',
                    borderRadius: '15px',
                    fontWeight: '600',
                  }}>
                    #{dataset.id}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1',
              textAlign: 'center',
              padding: '40px',
              background: '#f8f9fa',
              borderRadius: '12px',
              border: '2px dashed #dfece0',
            }}>
              <h3 style={{ color: '#2d5036', marginBottom: '12px' }}>Tidak Ada Dataset Ditemukan</h3>
              <p style={{ color: '#6c757d', marginBottom: '20px' }}>
                Dataset yang Anda cari tidak ditemukan. Silakan coba kata kunci pencarian yang berbeda.
              </p>
              <button
                onClick={handleReset}
                style={{
                  padding: '10px 20px',
                  background: '#2d5036',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#1e3a25';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#2d5036';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Pagination */}
        {paginator.last_page > 1 && (
          <div className="pagination-container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
            marginTop: '30px',
            padding: '25px',
            background: 'linear-gradient(135deg, #f8f9fa, #e8f5e9)',
            borderRadius: '16px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
          }}>
            <div className="pagination-info" style={{
              fontSize: '16px',
              color: '#2d5036',
              fontWeight: '600',
            }}>
              Menampilkan {paginator.from} - {paginator.to} dari {paginator.total} dataset
            </div>

            <div className="pagination-controls" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <button
                onClick={() => changePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 20px',
                  background: currentPage === 1 ? '#e9ecef' : 'linear-gradient(135deg, #2d5036, #4CAF50)',
                  color: currentPage === 1 ? '#adb5bd' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: currentPage !== 1 ? '0 4px 12px rgba(45, 80, 54, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1e3a25, #43A047)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(45, 80, 54, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== 1) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #2d5036, #4CAF50)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 54, 0.3)';
                  }
                }}
              >
                ← Sebelumnya
              </button>

              {/* Page numbers with improved design */}
              <div style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
              }}>
                {Array.from({ length: Math.min(7, paginator.last_page) }, (_, i) => {
                  let pageNum;
                  if (paginator.last_page <= 7) {
                    pageNum = i + 1;
                  } else if (currentPage <= 4) {
                    pageNum = i + 1;
                  } else if (currentPage >= paginator.last_page - 3) {
                    pageNum = paginator.last_page - 6 + i;
                  } else {
                    pageNum = currentPage - 3 + i;
                  }

                  const isCurrent = pageNum === currentPage;

                  if (pageNum >= 1 && pageNum <= paginator.last_page) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => changePage(pageNum)}
                        style={{
                          width: '40px',
                          height: '40px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '50%',
                          backgroundColor: isCurrent
                            ? 'linear-gradient(135deg, #2d5036, #4CAF50)'
                            : 'white',
                          color: isCurrent ? 'white' : '#666',
                          fontWeight: isCurrent ? '700' : '500',
                          cursor: 'pointer',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          boxShadow: isCurrent
                            ? '0 4px 15px rgba(45, 80, 54, 0.4)'
                            : '0 2px 8px rgba(0,0,0,0.1)',
                          border: isCurrent ? '2px solid #a8d5ba' : '1px solid #e0e0e0',
                        }}
                        onMouseEnter={(e) => {
                          if (!isCurrent) {
                            e.currentTarget.style.backgroundColor = '#f0f0f0';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isCurrent) {
                            e.currentTarget.style.backgroundColor = 'white';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                          }
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  }

                  if ((pageNum === currentPage - 4 && currentPage > 4) ||
                      (pageNum === currentPage + 4 && currentPage < paginator.last_page - 3)) {
                    return <span key={`dots-${i}`} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '40px',
                      height: '40px',
                      fontSize: '16px'
                    }}>...</span>;
                  }
                  return null;
                })}
              </div>

              <button
                onClick={() => changePage(Math.min(paginator.last_page, currentPage + 1))}
                disabled={currentPage === paginator.last_page}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 20px',
                  background: currentPage === paginator.last_page ? '#e9ecef' : 'linear-gradient(135deg, #2d5036, #4CAF50)',
                  color: currentPage === paginator.last_page ? '#adb5bd' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: currentPage === paginator.last_page ? 'not-allowed' : 'pointer',
                  fontSize: '15px',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: currentPage !== paginator.last_page ? '0 4px 12px rgba(45, 80, 54, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== paginator.last_page) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #1e3a25, #43A047)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(45, 80, 54, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== paginator.last_page) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #2d5036, #4CAF50)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(45, 80, 54, 0.3)';
                  }
                }}
              >
                Berikutnya →
              </button>
            </div>
          </div>
        )}

        {/* Navigation Info Section */}
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'linear-gradient(135deg, #2d5036, #4a7c59)',
          borderRadius: '16px',
          marginTop: '40px',
          boxShadow: '0 10px 40px rgba(45, 80, 54, 0.25)',
        }}>
          <h3 style={{
            color: '#ffffff',
            marginBottom: '16px',
            fontSize: '28px',
            fontWeight: '700',
            textShadow: '1px 1px 4px rgba(0,0,0,0.4)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            letterSpacing: '-0.5px',
          }}>
            Jelajahi Lebih Lanjut
          </h3>
          <p style={{
            color: '#ffffff',
            maxWidth: '700px',
            margin: '0 auto 24px',
            fontSize: '17px',
            lineHeight: '1.8',
            fontWeight: '400',
            textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}>
            Temukan lebih banyak informasi dan data pertanian melalui halaman-halaman berikut.
            Setiap halaman menyediakan berbagai sumber daya untuk mendukung penelitian dan analisis Anda.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .dataset-container {
            padding: 15px !important;
          }

          .search-filter-section {
            padding: 20px !important;
            flex-direction: column !important;
          }

          .search-filter-section > div {
            width: 100% !important;
            flex: 0 0 auto !important;
          }
        }

        @media (max-width: 576px) {
          .pagination-container {
            flex-direction: column !important;
            align-items: center !important;
            gap: 15px !important;
          }

          .pagination-info {
            text-align: center !important;
          }

          .pagination-controls {
            justify-content: center !important;
          }
        }
      `}</style>
    </PublicLayout>
  );
};

export default DatasetPage;