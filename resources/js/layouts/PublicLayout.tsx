import { Head, Link } from '@inertiajs/react';
import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiMenu, FiUser, FiX } from 'react-icons/fi';

// Define Ant Design menu item types
interface AntMenuItemType {
    key: string;
    label?: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    danger?: boolean;
    title?: string;
    children?: AntItemType[];
    [key: `data-${string}`]: any;
}

interface AntSubMenuType {
    key: string;
    label?: React.ReactNode;
    icon?: React.ReactNode;
    disabled?: boolean;
    danger?: boolean;
    title?: string;
    children: AntItemType[];
    type: 'submenu';
    [key: `data-${string}`]: any;
}

interface AntMenuItemGroupType {
    type: 'group';
    label?: React.ReactNode;
    children: AntItemType[];
    [key: `data-${string}`]: any;
}

type AntItemType = AntMenuItemType | AntSubMenuType | AntMenuItemGroupType;

const { Header, Content, Footer } = Layout;

const PublicLayout = ({
    title = 'Satudata Pertanian',
    children,
}: {
    title?: string;
    children: React.ReactNode;
}) => {
    const [current, setCurrent] = useState('beranda');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (e: { key: string }) => {
        setCurrent(e.key);
    };

    // Menu items for the navbar
    const menuItems: CustomMenuItemType[] = [
        {
            key: 'beranda',
            label: <Link href="/">Beranda</Link>,
        },
        {
            key: 'dataset',
            label: (
                <div
                    onMouseEnter={() => setOpenDropdown('dataset')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <span style={{ fontWeight: 'bold' }}>Dataset</span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
                            transition: 'transform 0.3s ease',
                            verticalAlign: 'middle',
                            display: 'inline-block',
                        }}
                    />
                </div>
            ),
            children: [
                {
                    key: 'm-dataset',
                    label: <Link href="/dataset">Dataset</Link>,
                },
                {
                    key: 'm-indikator',
                    label: <Link href="/dataset/indicators">Indikator</Link>,
                },
                {
                    key: 'm-variabel',
                    label: <Link href="/dataset/variables">Variabel</Link>,
                },
            ],
        },
        {
            key: 'publikasi',
            label: (
                <div
                    onMouseEnter={() => setOpenDropdown('publikasi')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <span style={{ fontWeight: 'bold' }}>Publikasi</span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
                            transition: 'transform 0.3s ease',
                            verticalAlign: 'middle',
                            display: 'inline-block',
                        }}
                    />
                </div>
            ),
            children: [
                {
                    key: 'm-publikasi',
                    label: <Link href="/publikasi">Publikasi</Link>,
                },
                {
                    key: 'm-berita',
                    label: <Link href="/berita">Berita</Link>,
                },
            ],
        },
        {
            key: 'multimedia',
            label: (
                <div
                    onMouseEnter={() => setOpenDropdown('multimedia')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <span style={{ fontWeight: 'bold' }}>Multimedia</span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
                            transition: 'transform 0.3s ease',
                            verticalAlign: 'middle',
                            display: 'inline-block',
                        }}
                    />
                </div>
            ),
            children: [
                {
                    key: 'm-galeri',
                    label: <Link href="/galeri">Galeri</Link>,
                },
                {
                    key: 'm-infografis',
                    label: <Link href="/infografis">Infografis</Link>,
                },
                {
                    key: 'm-multimedia',
                    label: <Link href="/products/multimedia">Media</Link>,
                },
            ],
        },
        {
            key: 'data',
            label: (
                <div
                    onMouseEnter={() => setOpenDropdown('data')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <span style={{ fontWeight: 'bold' }}>Data</span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
                            transition: 'transform 0.3s ease',
                            verticalAlign: 'middle',
                            display: 'inline-block',
                        }}
                    />
                </div>
            ),
            children: [
                {
                    key: 'statistik',
                    label: (
                        <div
                            onMouseEnter={() => setOpenDropdown('statistik')}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <span style={{ fontWeight: 'bold' }}>
                                Statistik
                            </span>
                        </div>
                    ),
                    children: [
                        {
                            key: 'statistik-main',
                            label: (
                                <Link href="/statistical-data">
                                    Data Statistik Utama
                                </Link>
                            ),
                        },
                        {
                            key: 'basis-data-statistik',
                            label: (
                                <Link href="/statistical-data/basis-data">
                                    Basis Data Statistik
                                </Link>
                            ),
                        },
                        {
                            key: 'statistik-ekspor-impor',
                            label: (
                                <Link href="/statistical-data/export-import">
                                    Ekspor Impor
                                </Link>
                            ),
                        },
                        {
                            key: 'statistik-pdb',
                            label: (
                                <Link href="/statistical-data/gdp">
                                    Produk Domestik Bruto
                                </Link>
                            ),
                        },
                        {
                            key: 'statistik-pdrb',
                            label: (
                                <Link href="/statistical-data/gdrp">
                                    Produk Domestik Regional Bruto
                                </Link>
                            ),
                        },
                        {
                            key: 'statistik-ntp',
                            label: (
                                <Link href="/statistical-data/ntp">
                                    Nilai Tukar Petani
                                </Link>
                            ),
                        },
                    ],
                },
                {
                    key: 'geospasial',
                    label: <Link href="/data/geospatial">Geospasial</Link>,
                    children: [
                        {
                            key: 'simotandi',
                            label: (
                                <a
                                    href="https://simotandi.pertanian.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    SIMOTANDI
                                </a>
                            ),
                        },
                        {
                            key: 'siperditan',
                            label: (
                                <a
                                    href="https://siperditan.pertanian.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    SIPERDITAN
                                </a>
                            ),
                        },
                    ],
                },
            ],
        },
        {
            key: 'manajemen',
            label: (
                <div
                    onMouseEnter={() => setOpenDropdown('manajemen')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <span style={{ fontWeight: 'bold' }}>Manajemen</span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
                            transition: 'transform 0.3s ease',
                            verticalAlign: 'middle',
                            display: 'inline-block',
                        }}
                    />
                </div>
            ),
            children: [
                {
                    key: 'satudata',
                    label: (
                        <div
                            onMouseEnter={() => setOpenDropdown('satudata')}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            Satudata
                        </div>
                    ),
                    children: [
                        {
                            key: 'tentang',
                            label: <Link href="/about">Tentang</Link>,
                        },
                        {
                            key: 'regulasi',
                            label: <Link href="/regulation">Regulasi</Link>,
                        },
                        {
                            key: 'prinsip',
                            label: (
                                <Link href="/data-principles">
                                    Prinsip Satu Data
                                </Link>
                            ),
                        },
                        {
                            key: 'prioritas',
                            label: (
                                <Link href="/priority-data">
                                    Data Prioritas
                                </Link>
                            ),
                        },
                    ],
                },

                {
                    key: 'rencana-rilis',
                    label: <Link href="/release-plans">Rencana Rilis</Link>,
                },
                {
                    key: 'm-metadata',
                    label: <Link href="/metadata">Metadata</Link>,
                },
                {
                    key: 'm-link',
                    label: <Link href="/satudata">Referensi Link</Link>,
                },
            ],
        },
        {
            key: 'permohonan-data',
            label: (
                <a
                    href="https://simpeldatin.setjen.pertanian.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span style={{ fontWeight: 'bold' }}>Permohonan Data</span>
                </a>
            ),
        },
        {
            key: 'link-lainnya',
            label: (
                <div
                    onMouseEnter={() => setOpenDropdown('link-lainnya')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <span style={{ fontWeight: 'bold' }}>Link Lainnya</span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
                            transition: 'transform 0.3s ease',
                            verticalAlign: 'middle',
                            display: 'inline-block',
                        }}
                    />
                </div>
            ),
            children: [
                {
                    key: 'satudata-indonesia',
                    label: (
                        <a
                            href="https://data.go.id"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Satu Data Indonesia
                        </a>
                    ),
                },
                {
                    key: 'satu-peta',
                    label: (
                        <a
                            href="https://tanahair.indonesia.go.id/portal-web/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Satu Peta
                        </a>
                    ),
                },
                {
                    key: 'kementan',
                    label: (
                        <a
                            href="https://www.pertanian.go.id"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Kementerian Pertanian
                        </a>
                    ),
                },
            ],
        },
    ];

    // Mobile menu items
    const mobileMenuItems: CustomMenuItemType[] = [
        { key: 'beranda', label: <Link href="/">Beranda</Link> },
        {
            key: 'dataset',
            label: 'Dataset',
            children: [
                {
                    key: 'm-dataset',
                    label: <Link href="/dataset">Dataset</Link>,
                },
                {
                    key: 'm-indikator',
                    label: <Link href="/dataset/indicators">Indikator</Link>,
                },
                {
                    key: 'm-variabel',
                    label: <Link href="/dataset/variables">Variabel</Link>,
                },
                {
                    key: 'm-metadata',
                    label: <Link href="/metadata">Metadata</Link>,
                },
            ],
        },
        {
            key: 'publikasi',
            label: 'Publikasi',
            children: [
                {
                    key: 'm-publikasi',
                    label: <Link href="/publikasi">Publikasi</Link>,
                },
                {
                    key: 'm-berita',
                    label: <Link href="/berita">Berita</Link>,
                },
            ],
        },
        {
            key: 'multimedia',
            label: 'Multimedia',
            children: [
                {
                    key: 'm-galeri',
                    label: <Link href="/galeri">Galeri</Link>,
                },
                {
                    key: 'm-infografis',
                    label: <Link href="/infografis">Infografis</Link>,
                },
                {
                    key: 'm-multimedia',
                    label: <Link href="/products/multimedia">Media</Link>,
                },
            ],
        },
        {
            key: 'data',
            label: 'Data',
            children: [
                {
                    key: 'statistik',
                    label: <Link href="/data/statistical">Statistik</Link>,
                },
                {
                    key: 'geospasial',
                    label: <Link href="/data/geospatial">Geospasial</Link>,
                    children: [
                        {
                            key: 'simotandi',
                            label: (
                                <a
                                    href="https://simotandi.pertanian.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    SIMOTANDI
                                </a>
                            ),
                        },
                        {
                            key: 'siperditan',
                            label: (
                                <a
                                    href="https://siperditan.pertanian.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    SIPERDITAN
                                </a>
                            ),
                        },
                    ],
                },
            ],
        },
        {
            key: 'manajemen',
            label: 'Manajemen',
            children: [
                {
                    key: 'satudata',
                    label: 'Satudata',
                    children: [
                        {
                            key: 'tentang',
                            label: <Link href="/about">Tentang</Link>,
                        },
                        {
                            key: 'regulasi',
                            label: <Link href="/regulation">Regulasi</Link>,
                        },
                        {
                            key: 'prinsip',
                            label: (
                                <Link href="/data-principles">
                                    Prinsip Satu Data
                                </Link>
                            ),
                        },
                        {
                            key: 'prioritas',
                            label: (
                                <Link href="/priority-data">
                                    Data Prioritas
                                </Link>
                            ),
                        },
                    ],
                },
                {
                    key: 'rencana-rilis',
                    label: <Link href="/release-plans">Rencana Rilis</Link>,
                },
                {
                    key: 'm-metadata',
                    label: <Link href="/metadata">Metadata</Link>,
                },
                {
                    key: 'm-link',
                    label: <Link href="/satudata">Referensi Link</Link>,
                },
            ],
        },
        {
            key: 'permohonan-data',
            label: (
                <a
                    href="https://simpeldatin.setjen.pertanian.go.id/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Permohonan Data
                </a>
            ),
        },
        {
            key: 'link-lainnya',
            label: 'Link Lainnya',
            children: [
                {
                    key: 'satudata-indonesia',
                    label: (
                        <a
                            href="https://data.go.id"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Satu Data Indonesia
                        </a>
                    ),
                },
                {
                    key: 'satu-peta',
                    label: (
                        <a
                            href="https://tanahair.indonesia.go.id/portal-web/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Satu Peta
                        </a>
                    ),
                },
                {
                    key: 'kementan',
                    label: (
                        <a
                            href="https://www.pertanian.go.id"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Kementerian Pertanian
                        </a>
                    ),
                },
            ],
        },
        {
            key: 'login',
            label: (
                <Link
                    href="/auth/login"
                    style={{ color: '#2E7D32', fontWeight: '600' }}
                >
                    Login
                </Link>
            ),
        },
    ];

    // Define types for menu items
    interface CustomMenuItemType {
        key: string;
        label: React.ReactNode;
        type?: string;
        children?: CustomMenuItemType[];
    }

    // Function to render menu items recursively
    const renderMenuItems = (items: CustomMenuItemType[]): AntItemType[] => {
        return items.map((item) => {
            if (item.children) {
                return {
                    key: item.key,
                    label: item.label,
                    type: 'submenu',
                    children: renderMenuItems(item.children),
                } as AntSubMenuType;
            }
            return {
                key: item.key,
                label: item.label,
            } as AntMenuItemType;
        });
    };

    return (
        <Layout
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Head title={title} />

            {/* Modern Navbar with side arrows and green transparent blur effect on scroll */}
            <Header
                className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}
                style={{
                    background: isScrolled
                        ? 'linear-gradient(135deg, rgba(168, 213, 186, 0.85) 0%, rgba(208, 240, 224, 0.85) 100%)'
                        : 'transparent',
                    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                    transition:
                        'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'fixed',
                    top: 0,
                    zIndex: 1000,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 24px',
                }}
            >
                {/* Left side - Logo with animated agricultural text */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flex: 1,
                    }}
                >
                    <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="/images/logos/logo-satudata.png"
                            alt="Logo Satudata Pertanian"
                            title="Satudata Pertanian"
                            style={{
                                height: '50px',
                                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
                            }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null; // prevents looping
                                target.style.display = 'none';
                            }}
                        />
                    </Link>
                </div>

                {/* Center - Desktop Menu - shifted slightly to the right */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flex: 2,
                        paddingLeft: '40px',
                    }}
                >
                    <Menu
                        mode="horizontal"
                        selectedKeys={[current]}
                        onClick={handleClick}
                        items={renderMenuItems(menuItems)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            width: '100%',
                        }}
                        className="desktop-menu"
                    />
                </div>

                {/* Right side - Login and Mobile Toggle */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        justifyContent: 'flex-end',
                        flex: 1,
                    }}
                >
                    {/* Login link with premium elegant text and icon animations only - enlarged */}
                    <Link
                        href="/login"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#2d5036',
                            transition:
                                'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            fontSize: '16px',
                            fontWeight: '600',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                        onMouseEnter={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.color = '#FF9800';
                        }}
                        onMouseLeave={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.color = '#2d5036';
                        }}
                    >
                        <FiUser
                            style={{
                                marginRight: '10px',
                                fontSize: '20px',
                                transition:
                                    'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                position: 'relative',
                            }}
                            className="login-icon"
                        />
                        <span
                            className="login-text"
                            style={{
                                transition:
                                    'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                position: 'relative',
                            }}
                        >
                            Login
                            <span
                                className="login-underline"
                                style={{
                                    position: 'absolute',
                                    bottom: '-3px',
                                    left: 0,
                                    width: '0%',
                                    height: '2px',
                                    borderRadius: '2px',
                                    background:
                                        'linear-gradient(90deg, #FF9800, #FF5722)',
                                    transition:
                                        'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                }}
                            ></span>
                        </span>
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#2d5036',
                            fontSize: '24px',
                            cursor: 'pointer',
                            display: 'none',
                            padding: '8px',
                            borderRadius: '4px',
                            transition: 'all 0.3s ease',
                        }}
                        className="mobile-menu-toggle"
                        aria-label={
                            isMobileMenuOpen ? 'Close menu' : 'Open menu'
                        }
                    >
                        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
                    style={{
                        position: 'fixed',
                        top: '64px',
                        left: 0,
                        right: 0,
                        background: 'white',
                        zIndex: 999,
                        padding: '16px',
                        display: 'none',
                        flexDirection: 'column',
                        gap: '8px',
                        maxHeight: isMobileMenuOpen
                            ? 'calc(100vh - 64px)'
                            : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.3s ease-in-out',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Menu
                        mode="inline"
                        items={renderMenuItems(mobileMenuItems)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ border: 'none' }}
                        className="mobile-nav-menu"
                    />
                </div>
            </Header>

            <Content
                className="site-layout-content"
                style={{
                    padding: '64px 48px 24px',
                    marginTop: 64,
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                }}
            >
                <div
                    style={{
                        maxWidth: '1200px',
                        margin: '0 auto',
                        width: '100%',
                    }}
                >
                    {children}
                </div>
            </Content>

            {/* Custom Footer */}
            <Footer
                style={{
                    textAlign: 'left',
                    background: '#f8f9fa',
                    padding: '40px 48px',
                    marginTop: 'auto',
                }}
                className="footer"
            >
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns:
                                'repeat(auto-fit, minmax(160px, 1fr))',
                            gap: '30px',
                        }}
                    >
                        <div>
                            <h4
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '16px',
                                    fontWeight: '600',
                                }}
                            >
                                Satudata Pertanian
                            </h4>
                            <p style={{ color: '#6c757d', lineHeight: '1.6' }}>
                                Portal satu data untuk sektor pertanian yang
                                menyediakan data statistik, geospasial, dan
                                informasi seputar kebijakan pertanian di
                                Indonesia.
                            </p>
                        </div>

                        <div>
                            <h4
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '16px',
                                    fontWeight: '600',
                                }}
                            >
                                Tautan Cepat
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li>
                                    <Link
                                        href="/about"
                                        style={{
                                            color: '#495057',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Tentang Kami
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/regulation"
                                        style={{
                                            color: '#495057',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Regulasi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/data-principles"
                                        style={{
                                            color: '#495057',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Prinsip Satu Data
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/priority-data"
                                        style={{
                                            color: '#495057',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Data Prioritas
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '16px',
                                    fontWeight: '600',
                                }}
                            >
                                Data
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li>
                                    <Link
                                        href="/data/statistical"
                                        style={{
                                            color: '#495057',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Statistik
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/data/geospatial"
                                        style={{
                                            color: '#495057',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Geospasial
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/release-plans"
                                        style={{
                                            color: '#495057',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Rencana Rilis
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '16px',
                                    fontWeight: '600',
                                }}
                            >
                                Kontak
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li
                                    style={{
                                        color: '#495057',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Pusat Data dan Informasi Kementerian
                                    Pertanian
                                </li>
                                <li
                                    style={{
                                        color: '#495057',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Gedung D Jl. Harsono Rm No.3, Ragunan, Ps.
                                    Minggu, Kota Jakarta Selatan, Daerah Khusus
                                    Ibukota Jakarta 12550
                                </li>
                                <li
                                    style={{
                                        color: '#495057',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Telp: (021) 7806131
                                </li>
                                <li
                                    style={{
                                        color: '#495057',
                                        marginBottom: '8px',
                                    }}
                                >
                                    Email: info@pertanian.go.id
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h4
                                style={{
                                    color: '#2d5036',
                                    marginBottom: '16px',
                                    fontWeight: '600',
                                }}
                            >
                                Link Terkait
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li>
                                    <a
                                        href="https://data.go.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#495057',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Satu Data Indonesia
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://tanahair.indonesia.go.id/portal-web/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#495057',
                                            textDecoration: 'none',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Satu Peta
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div
                        style={{
                            borderTop: '1px solid #dee2e6',
                            paddingTop: '24px',
                            marginTop: '32px',
                            textAlign: 'center',
                            color: '#6c757d',
                            fontSize: '14px',
                        }}
                    >
                        &copy; {new Date().getFullYear()} Satudata Pertanian.
                        Hak Cipta Dilindungi.
                    </div>
                </div>
            </Footer>

            <style>{`
        .refined-navbar.scrolled {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px);
        }
        
        .modern-navbar.scrolled {
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        /* Premium elegant login link animations */
        .login-icon {
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }
        
        .login-text {
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }
        
        .login-icon::before {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border-radius: 50%;
          background: linear-gradient(45deg, #FF9800, #FF5722, #FF9800);
          z-index: -1;
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: rotateGradient 4s linear infinite;
        }
        
        .login-icon {
          animation: floatGentle 6s ease-in-out infinite;
        }
        
        @keyframes floatGentle {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-3px) rotate(1deg);
          }
        }
        
        .login-text {
          animation: textShimmer 8s ease-in-out infinite;
        }
        
        @keyframes textShimmer {
          0%, 100% {
            background: linear-gradient(45deg, #2d5036, #4CAF50, #2d5036);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          50% {
            background-position: 100% center;
          }
        }
        
        .login-icon:hover {
          transform: translateY(-5px) scale(1.3) rotate(10deg);
          color: #FF9800;
          filter: drop-shadow(0 0 8px rgba(255, 152, 0, 0.7));
        }
        
        .login-icon:hover::before {
          opacity: 0.3;
          transform: scale(1.5);
        }
        
        .login-text:hover {
          transform: translateX(3px);
          letter-spacing: 2px;
          text-shadow: 0 0 10px rgba(255, 152, 0, 0.7);
        }
        
        .login-underline {
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        /* Premium elegant hover effects */
        .login-text::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -3px;
          left: 0;
          background: linear-gradient(90deg, transparent, #FF9800, #FF5722, transparent);
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 2px;
        }
        
        .login-text:hover::after {
          width: 100%;
          box-shadow: 0 0 10px rgba(255, 152, 0, 0.5);
        }
        
        @keyframes rotateGradient {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        /* Simplified navbar styling */
        .ant-menu-horizontal {
          border: none;
          display: flex;
          align-items: center;
        }
        
        .ant-menu-item,
        .ant-menu-submenu-title {
          font-weight: 500 !important;
          font-size: 15px;
          border-radius: 6px;
          margin: 0 4px;
          transition: all 0.3s ease !important;
          padding: 8px 12px !important;
        }
        
        .ant-menu-item,
        .ant-menu-submenu-title {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
          position: relative;
        }
        
        .ant-menu-item:hover,
        .ant-menu-submenu-title:hover {
          background: linear-gradient(45deg, rgba(168, 213, 186, 0.2) 0%, rgba(102, 187, 106, 0.3) 100%) !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          animation: subtleGradient 3s ease infinite;
        }
        
        .ant-menu-item > a,
        .ant-menu-submenu-title > div {
          font-weight: 500 !important;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          color: #2d5036 !important;
          padding: 8px 12px;
          position: relative;
        }
        
        .ant-menu-item > a:hover,
        .ant-menu-submenu-title > div:hover {
          color: #1a237e !important;
          text-decoration: none;
        }
        
        /* Elegant multi-layer hover effect with animated underlines */
        .ant-menu-item,
        .ant-menu-submenu-title {
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
          position: relative;
          overflow: visible;
        }
        
        .ant-menu-item > a,
        .ant-menu-submenu-title > div {
          position: relative;
          overflow: visible;
        }
        
        .ant-menu-item > a::after,
        .ant-menu-submenu-title > div::after {
          content: '';
          position: absolute;
          width: 0;
          height: 3px;
          bottom: -2px;
          left: 50%;
          background: linear-gradient(90deg, #4CAF50, #8BC34A, #4CAF50);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 3px;
          transform: translateX(-50%);
          z-index: 1;
        }
        
        .ant-menu-item:hover > a::after,
        .ant-menu-submenu-title:hover > div::after {
          width: 90%;
        }
        
        /* Second animated line with different gradient */
        .ant-menu-item > a::before,
        .ant-menu-submenu-title > div::before {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -5px;
          left: 50%;
          background: linear-gradient(90deg, #FF9800, #FF5722, #FF9800);
          transition: all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          border-radius: 2px;
          transform: translateX(-50%);
          z-index: 1;
          animation-delay: 0.2s;
        }
        
        .ant-menu-item:hover > a::before,
        .ant-menu-submenu-title:hover > div::before {
          width: 70%;
        }
        
        /* Dropdown styling */
        .ant-menu-sub {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid rgba(168, 213, 186, 0.4) !important;
          background: rgba(255, 255, 255, 0.95) !important;
        }
        
        .ant-menu-item-group-title {
          font-weight: 600;
          color: #2d5036;
          padding: 8px 16px !important;
        }
        
        .ant-menu-item,
        .ant-menu-submenu-title {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
        }
        
        .ant-menu-item-selected {
          font-weight: 600 !important;
          background: transparent !important;
        }
        
        .ant-menu-item-selected > a {
          color: #FF9800 !important;
          position: relative;
        }
        
        .ant-menu-item-selected > a::after {
          content: '';
          position: absolute;
          width: 80%;
          height: 2px;
          bottom: 5px;
          left: 50%;
          background: #FF9800;
          border-radius: 2px;
          transform: translateX(-50%);
        }
        
        @keyframes gradientMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes subtleGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        /* Hide default dropdown arrow and only show custom arrow on the side */
        .ant-menu-submenu-title::after {
          display: none !important;
        }
        
        /* Dropdown styling */
        .ant-menu-sub {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid rgba(168, 213, 186, 0.4) !important;
          background: rgba(255, 255, 255, 0.95) !important;
        }
        
        .ant-menu-item-group-title {
          font-weight: 600;
          color: #2d5036;
          padding: 8px 16px !important;
        }
        
        .ant-menu-item,
        .ant-menu-submenu-title {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
          position: relative;
        }
        
        .ant-menu-item:hover,
        .ant-menu-submenu-title:hover {
          background-color: rgba(168, 213, 186, 0.2) !important;
          transform: translateY(-2px);
          z-index: 2;
          box-shadow: 0 5px 15px rgba(168, 213, 186, 0.4);
        }
        
        .ant-menu-item > a,
        .ant-menu-submenu-title > div {
          font-weight: 600 !important;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
          color: #2d5036 !important;
          position: relative;
          letter-spacing: 0.2px;
          font-size: 16px;
        }
        
        .ant-menu-item > a:hover,
        .ant-menu-submenu-title > div:hover {
          color: #1a3322 !important;
          text-decoration: none;
        }
        
        /* Elegant animation for menu items */
        .ant-menu-item > a::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 50%;
          background: #4CAF50;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          border-radius: 2px;
          transform: translateX(-50%);
        }
        
        .ant-menu-item:hover > a::after {
          width: 80%;
        }
        
        /* Dropdown styling */
        .ant-menu-sub {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid rgba(168, 213, 186, 0.4) !important;
          background: rgba(255, 255, 255, 0.95) !important;
        }
        
        .ant-menu-item-group-title {
          font-weight: 600;
          color: #2d5036;
          padding-top: 8px !important;
        }
        
        .ant-menu-item, .ant-menu-submenu-title {
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1) !important;
        }
        
        .ant-menu-item-selected {
          font-weight: 700 !important;
        }
        
        .ant-menu-item-selected > a::after {
          content: '';
          position: absolute;
          width: 80%;
          height: 2px;
          bottom: 0;
          left: 50%;
          background: #4CAF50;
          border-radius: 2px;
          transform: translateX(-50%);
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          
          .mobile-menu-toggle {
            display: block !important;
          }
          
          .mobile-menu {
            display: flex !important;
          }
          
          .site-layout-content {
            padding: 70px 16px 16px;
            margin-top: 64px;
          }
          
          /* Mobile layout adjustments */
          .ant-layout-header {
            padding: 0 16px !important;
          }
          
          .refined-navbar {
            padding: 12px 16px !important;
          }
          
          /* Mobile menu styling */
          .ant-menu.ant-menu-root.ant-menu-inline {
            background: transparent;
          }
          
          .mobile-nav-menu .ant-menu-item,
          .mobile-nav-menu .ant-menu-submenu-title {
            border-radius: 8px;
            margin: 4px 0;
            padding: 10px 16px !important;
            font-size: 16px;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu-toggle {
            display: none !important;
          }
        }
        
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          
          .mobile-menu-toggle {
            display: block !important;
          }
          
          .mobile-menu {
            display: flex !important;
          }
          
          .site-layout-content {
            padding: 70px 16px 16px;
            margin-top: 64px;
          }
          
          /* Mobile layout adjustments */
          .ant-layout-header {
            padding: 0 16px !important;
          }
          
          .navbar {
            padding: 0 16px !important;
          }
          
          /* Mobile menu styling */
          .ant-menu.ant-menu-root.ant-menu-inline {
            background: transparent;
          }
          
          .ant-menu-item,
          .ant-menu-submenu-title {
            border-radius: 8px;
            margin: 4px 0;
            padding: 12px 16px !important;
          }
          
          /* Ensure mobile menu items are properly styled */
          .mobile-nav-menu .ant-menu-item {
            font-size: 16px;
            line-height: 1.5;
          }
          
          .mobile-nav-menu .ant-menu-submenu-title {
            font-size: 16px;
            line-height: 1.5;
            padding: 12px 16px !important;
          }
          
          /* Fade in and scale animation for agricultural text */
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        }
      `}</style>
        </Layout>
    );
};

export default PublicLayout;
