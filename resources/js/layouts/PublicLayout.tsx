import { Head, Link, usePage } from '@inertiajs/react';
import { Layout, Menu } from 'antd';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiMenu, FiUser, FiX } from 'react-icons/fi';

// --- DEFINISI TIPE & INTERFACE ---

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

interface CustomMenuItemType {
    key: string;
    label: React.ReactNode;
    type?: string;
    children?: CustomMenuItemType[];
}

const { Header, Content, Footer } = Layout;

// --- KOMPONEN UTAMA ---

const PublicLayout = ({
    title = 'Satu Data Pertanian',
    children,
}: {
    title?: string;
    children: React.ReactNode;
}) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const { url } = usePage().props;
    const currentUrl = (url as string) || window.location.pathname;

    // --- LOGIC MENU AKTIF ---
    const getActiveMenuKey = (currentPath: string): string => {
        const pathMap: Record<string, string> = {
            '/': 'beranda',
            '/dataset': 'm-dataset',
            '/dataset/indicators': 'm-indikator',
            '/dataset/variables': 'm-variabel',
            '/publikasi': 'm-publikasi',
            '/berita': 'm-berita',
            '/galeri': 'm-galeri',
            '/infografis': 'm-infografis',
            '/products/multimedia': 'm-multimedia',
            '/data/geospatial': 'geospasial',
            '/release-plans': 'rencana-rilis',
            '/metadata': 'm-metadata',
            '/referensi-link': 'm-link',
            '/about': 'tentang-kami',
            '/regulation': 'regulasi',
            '/data-principles': 'prinsip-satudata',
            '/priority-data': 'm-prioritas',
        };

        if (pathMap[currentPath]) return pathMap[currentPath];

        if (currentPath.startsWith('/dataset') &&
            !currentPath.startsWith('/dataset/indicators') &&
            !currentPath.startsWith('/dataset/variables')) return 'dataset';
        if (
            currentPath.startsWith('/dataset/indicators') ||
            currentPath.startsWith('/dataset/variables')
        ) return 'm-dataset'; // Redirect these to Daftar Data
        if (
            currentPath.startsWith('/publikasi') ||
            currentPath.startsWith('/berita')
        )
            return 'publikasi';
        if (
            currentPath.startsWith('/galeri') ||
            currentPath.startsWith('/infografis') ||
            currentPath.startsWith('/products/multimedia')
        )
            return 'multimedia';
        if (currentPath.startsWith('/data')) return 'data';
        if (
            currentPath.startsWith('/release-plans') ||
            currentPath.startsWith('/metadata') ||
            currentPath.startsWith('/referensi-link')
        )
            return 'manajemen';

        return 'beranda';
    };

    const [current, setCurrent] = useState<string>(
        getActiveMenuKey(currentUrl),
    );

    useEffect(() => {
        const newCurrent = getActiveMenuKey(currentUrl);
        setCurrent(newCurrent);
    }, [currentUrl]);

    // --- SCROLL EFFECT ---
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

    // --- MENU DATA ---
    const menuItems: CustomMenuItemType[] = [
        {
            key: 'beranda',
            label: (
                <Link
                    href="/"
                    style={{ fontWeight: 'bold', fontFamily: 'inherit' }}
                >
                    Beranda
                </Link>
            ),
        },
        {
            key: 'dataset',
            label: (
                <div
                    onMouseEnter={() => setOpenDropdown('dataset')}
                    onMouseLeave={() => setOpenDropdown(null)}
                >
                    <span style={{ fontWeight: 'bold', fontFamily: 'inherit' }}>
                        Katalog Data
                    </span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
                            verticalAlign: 'middle',
                            display: 'inline-block',
                        }}
                    />
                </div>
            ),
            children: [
                {
                    key: 'm-dataset',
                    label: (
                        <Link href="/dataset" style={{ fontWeight: 600 }}>
                            Daftar Data
                        </Link>
                    ),
                },
                {
                    key: 'm-prioritas',
                    label: (
                        <Link
                            href="/priority-data"
                            style={{ fontWeight: 600 }}
                        >
                            Data Prioritas
                        </Link>
                    ),
                },
                {
                    key: 'terkait-satudata',
                    label: (
                        <div
                            onMouseEnter={() => setOpenDropdown('terkait-satudata')}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <span style={{ fontWeight: '600' }}>
                                Terkait Satu Data
                            </span>
                        </div>
                    ),
                    children: [
                        {
                            key: 'tentang-kami',
                            label: (
                                <Link
                                    href="/about"
                                    style={{ fontWeight: 600 }}
                                >
                                    Tentang Kami
                                </Link>
                            ),
                        },
                        {
                            key: 'regulasi',
                            label: (
                                <Link
                                    href="/regulation"
                                    style={{ fontWeight: 600 }}
                                >
                                    Regulasi
                                </Link>
                            ),
                        },
                        {
                            key: 'prinsip-satudata',
                            label: (
                                <Link
                                    href="/data-principles"
                                    style={{ fontWeight: 600 }}
                                >
                                    Prinsip Satu Data
                                </Link>
                            ),
                        },
                    ],
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
                    <span style={{ fontWeight: 'bold', fontFamily: 'inherit' }}>
                        Publikasi
                    </span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
                            verticalAlign: 'middle',
                            display: 'inline-block',
                        }}
                    />
                </div>
            ),
            children: [
                {
                    key: 'm-publikasi',
                    label: (
                        <Link href="/publikasi" style={{ fontWeight: 600 }}>
                            Publikasi
                        </Link>
                    ),
                },
                {
                    key: 'm-berita',
                    label: (
                        <Link href="/berita" style={{ fontWeight: 600 }}>
                            Berita
                        </Link>
                    ),
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
                    <span style={{ fontWeight: 'bold', fontFamily: 'inherit' }}>
                        Multimedia
                    </span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
                            verticalAlign: 'middle',
                            display: 'inline-block',
                        }}
                    />
                </div>
            ),
            children: [
                {
                    key: 'm-galeri',
                    label: (
                        <Link href="/galeri" style={{ fontWeight: 600 }}>
                            Galeri
                        </Link>
                    ),
                },
                {
                    key: 'm-infografis',
                    label: (
                        <Link href="/infografis" style={{ fontWeight: 600 }}>
                            Infografis
                        </Link>
                    ),
                },
                {
                    key: 'm-multimedia',
                    label: (
                        <Link
                            href="/products/multimedia"
                            style={{ fontWeight: 600 }}
                        >
                            Instagram
                        </Link>
                    ),
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
                    <span style={{ fontWeight: 'bold', fontFamily: 'inherit' }}>
                        Data
                    </span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
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
                            <span
                                style={{
                                    fontWeight: 'bold',
                                    fontFamily: 'inherit',
                                }}
                            >
                                Statistik
                            </span>
                        </div>
                    ),
                    children: [
                        {
                            key: 'basis-data-statistik',
                            label: (
                                <a
                                    href="https://bdsp2.pertanian.go.id/bdsp/id/home.html"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontWeight: 600 }}
                                >
                                    Basis Data Statistik
                                </a>
                            ),
                        },
                        {
                            key: 'statistik-ekspor-impor',
                            label: (
                                <a
                                    href="https://app3.pertanian.go.id/eksim/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontWeight: 600 }}
                                >
                                    Ekspor Impor
                                </a>
                            ),
                        },
                        {
                            key: 'statistik-pdb',
                            label: (
                                <a
                                    href="https://11ap.pertanian.go.id/pdb/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontWeight: 600 }}
                                >
                                    Produk Domestik Bruto
                                </a>
                            ),
                        },
                        {
                            key: 'statistik-pdrb',
                            label: (
                                <a
                                    href="https://11ap.pertanian.go.id/pdrb/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontWeight: 600 }}
                                >
                                    Produk Domestik Regional Bruto
                                </a>
                            ),
                        },
                        {
                            key: 'statistik-ntp',
                            label: (
                                <a
                                    href="https://11ap.pertanian.go.id/ntp/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontWeight: 600 }}
                                >
                                    Nilai Tukar Petani
                                </a>
                            ),
                        },
                    ],
                },
                {
                    key: 'geospasial',
                    label: (
                        <Link
                            href="/data/geospatial"
                            style={{ fontWeight: 600 }}
                        >
                            Geospasial
                        </Link>
                    ),
                    children: [
                        {
                            key: 'simotandi',
                            label: (
                                <a
                                    href="https://simotandi.pertanian.go.id"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ fontWeight: 600 }}
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
                                    style={{ fontWeight: 600 }}
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
                    <span style={{ fontWeight: 'bold', fontFamily: 'inherit' }}>
                        Manajemen
                    </span>
                    <FiChevronDown
                        style={{
                            marginLeft: '6px',
                            verticalAlign: 'middle',
                            display: 'inline-block',
                        }}
                    />
                </div>
            ),
            children: [
                {
                    key: 'rencana-rilis',
                    label: (
                        <Link href="/release-plans" style={{ fontWeight: 600 }}>
                            Rencana Rilis
                        </Link>
                    ),
                },
                {
                    key: 'm-metadata',
                    label: (
                        <Link href="/metadata" style={{ fontWeight: 600 }}>
                            Metadata
                        </Link>
                    ),
                },
                {
                    key: 'm-link',
                    label: (
                        <Link
                            href="/referensi-link"
                            style={{ fontWeight: 600 }}
                        >
                            Referensi Link
                        </Link>
                    ),
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
                    style={{ fontWeight: 600 }}
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
                            style={{ fontWeight: 600 }}
                        >
                            Satu Data Indonesia
                        </a>
                    ),
                },
                {
                    key: 'satu-peta',
                    label: (
                        <a
                            href="https://onemap.big.go.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontWeight: 600 }}
                        >
                            Kebijakan Satu Peta
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
                            style={{ fontWeight: 600 }}
                        >
                            Kementerian Pertanian
                        </a>
                    ),
                },
            ],
        },
    ];

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

            {/* --- NAVBAR --- */}
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
                    boxShadow: 'none',
                    borderBottom: 'none',
                }}
            >
                {/* Logo Section */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flex: 1,
                    }}
                >
                    <Link
                        href="/"
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <img
                            src="/images/logos/logo-satudata.png"
                            alt="Logo Satu Data Pertanian"
                            style={{
                                height: '50px',
                                width: 'auto',
                                maxHeight: '50px',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
                                transition:
                                    'height 0.3s ease, max-height 0.3s ease',
                            }}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.style.display = 'none';
                            }}
                        />
                    </Link>
                </div>

                {/* Desktop Menu */}
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

                {/* Right Actions (Login & Mobile Toggle) */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        justifyContent: 'flex-end',
                        flex: 1,
                    }}
                >
                    <Link
                        href="/login"
                        className="login-link-container"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#2d5036',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            textDecoration: 'none',
                            fontSize: '16px',
                            fontWeight: '600',
                            position: 'relative',
                        }}
                    >
                        <FiUser
                            className="login-icon"
                            style={{
                                marginRight: '10px',
                                fontSize: '20px',
                                transition: 'all 0.3s ease',
                            }}
                        />
                        <span className="login-text">
                            Login
                        </span>
                    </Link>

                    {/* Mobile Toggle Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="mobile-menu-toggle"
                        aria-label={
                            isMobileMenuOpen ? 'Close menu' : 'Open menu'
                        }
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#2d5036',
                            fontSize: '24px',
                            cursor: 'pointer',
                            display: 'none',
                            padding: '8px',
                        }}
                    >
                        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* MOBILE MENU OVERLAY
                  Menggunakan padding kondisional agar tidak ada whitespace saat tertutup
                */}
                <div
                    className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
                    style={{
                        position: 'fixed',
                        top: '64px',
                        left: 0,
                        right: 0,
                        background: 'white',
                        zIndex: 999,
                        // Fix Whitebox: Padding jadi 0 kalau tertutup
                        padding: isMobileMenuOpen ? '16px' : '0',
                        // Fix Shadow: Hilang kalau tertutup
                        boxShadow: isMobileMenuOpen
                            ? '0 4px 12px rgba(0, 0, 0, 0.1)'
                            : 'none',
                        display: 'none',
                        flexDirection: 'column',
                        gap: '8px',
                        maxHeight: isMobileMenuOpen
                            ? 'calc(100vh - 64px)'
                            : '0',
                        overflow: 'hidden',
                        // Animasi halus untuk semua properti termasuk padding
                        transition: 'all 0.3s ease-in-out',
                        opacity: isMobileMenuOpen ? 1 : 0,
                        visibility: isMobileMenuOpen ? 'visible' : 'hidden',
                    }}
                >
                    <Menu
                        mode="inline"
                        items={renderMenuItems(menuItems)}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                            border: 'none',
                            maxHeight: 'calc(100vh - 100px)',
                            overflowY: 'auto',
                        }}
                        className="mobile-nav-menu"
                    />
                </div>
            </Header>

            {/* --- CONTENT UTAMA --- */}
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

            {/* --- FOOTER --- */}
            <Footer
                style={{
                    textAlign: 'left',
                    background: '#f8f9fa',
                    padding: '40px 48px',
                    marginTop: 'auto',
                }}
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
                                Satu Data Pertanian
                            </h4>
                            <p style={{ color: '#6c757d', lineHeight: '1.6' }}>
                                Portal Satu Data Pertanian menyediakan data
                                statistik, geospasial, dan informasi seputar
                                kebijakan pertanian di Indonesia.
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
                                {[
                                    'Tentang Kami',
                                    'Regulasi',
                                    'Prinsip Satu Data',
                                ].map((item, index) => {
                                    const links = [
                                        '/about',
                                        '/regulation',
                                        '/data-principles',
                                    ];
                                    return (
                                        <li key={index}>
                                            <Link
                                                href={links[index]}
                                                style={{
                                                    color: '#495057',
                                                    display: 'block',
                                                    marginBottom: '8px',
                                                }}
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    );
                                })}
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
                                        marginBottom: '8px',
                                        color: '#495057',
                                    }}
                                >
                                    <div
                                        style={{ display: 'flex', gap: '12px' }}
                                    >
                                        <a
                                            href="https://www.instagram.com/pusdatin_kementan"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#333' }}
                                        >
                                            <Instagram size={20} />
                                        </a>
                                        <a
                                            href="https://www.facebook.com/kementan"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#333' }}
                                        >
                                            <Facebook size={20} />
                                        </a>
                                        <a
                                            href="http://www.youtube.com/@KementanRI"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#333' }}
                                        >
                                            <Youtube size={20} />
                                        </a>
                                    </div>
                                </li>
                                <li
                                    style={{
                                        marginBottom: '8px',
                                        color: '#495057',
                                    }}
                                >
                                    Kementerian Pertanian <br /> Pusat Data dan
                                    Sistem Informasi Pertanian
                                </li>
                                <li
                                    style={{
                                        marginBottom: '8px',
                                        color: '#495057',
                                    }}
                                >
                                    Gedung D Lantai 4 Jl. Harsono RM No.3,
                                    Ragunan, Jakarta Selatan
                                </li>
                                <li
                                    style={{
                                        marginBottom: '8px',
                                        color: '#495057',
                                    }}
                                >
                                    Telp: (021) 7822638
                                </li>
                                <li
                                    style={{
                                        marginBottom: '8px',
                                        color: '#495057',
                                    }}
                                >
                                    Email: pusdatin@pertanian.go.id
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
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Satu Data Indonesia
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://onemap.big.go.id"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#495057',
                                            display: 'block',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        Kebijakan Satu Peta
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
                        Portal Satu Data Pertanian V2.0. <br /> Kementerian
                        Pertanian - Pusat Data dan Sistem Informasi Pertanian
                        &copy; {new Date().getFullYear()}
                    </div>
                </div>
            </Footer>

            {/* --- GLOBAL STYLES (RESPONSIVE & ANIMATIONS) --- */}
            <style>{`
                /* --- Navbar Styling --- */
                .refined-navbar.scrolled, .modern-navbar.scrolled {
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    background: rgba(255, 255, 255, 0.95) !important;
                    backdrop-filter: blur(10px);
                }


                /* --- Ant Menu Styling --- */
                .ant-menu-horizontal {
                    border: none;
                }
                .ant-menu-item, .ant-menu-submenu-title {
                    font-weight: 500 !important;
                    border-radius: 6px;
                    margin: 0 8px;  /* Menambah jarak sedikit */
                    font-size: 15px; /* Memperbesar font sedikit */
                    transition: all 0.3s ease !important;
                }
                
                /* SIMPLE HOVER EFFECT HIJAU PASTEL */
                .ant-menu-item:hover, .ant-menu-submenu-title:hover {
                    background: rgba(168, 213, 186, 0.2) !important;
                    color: #2d5036 !important; /* Membuat text sedikit lebih gelap & tegas saat hover */
                    transition: all 0.3s ease !important;
                }
                
                .ant-menu-item-selected {
                    font-weight: 700 !important;
                    background: transparent !important;
                }

                /* Dropdown styling */
                .ant-menu-sub {
                    border-radius: 8px !important;
                    padding: 8px !important;
                }

                /* Dropdown item hover */
                .ant-menu-sub .ant-menu-item:hover {
                     background: rgba(168, 213, 186, 0.2) !important;
                }

                /* --- MEDIA QUERIES --- */
                
                /* Desktop Only (Hide Mobile Elements) */
                @media (min-width: 769px) {
                    .mobile-menu-toggle { display: none !important; }
                    .mobile-menu { display: none !important; }
                    .desktop-menu { display: flex !important; }
                }

                /* Mobile Only (Hide Desktop Elements & Adjust Layout) */
                @media (max-width: 768px) {
                    .desktop-menu { display: none !important; }
                    .mobile-menu-toggle { display: block !important; }
                    /* Force display flex on mobile so animations work */
                    .mobile-menu { display: flex !important; }
                    
                    /* Adjust Layout Content Padding */
                    .site-layout-content {
                        padding: 70px 16px 16px !important;
                        margin-top: 64px;
                    }

                    /* Adjust Navbar Padding */
                    .modern-navbar { padding: 10px 16px !important; }
                    
                    /* Adjust Logo Size */
                    .modern-navbar img[alt="Logo Satu Data Pertanian"] {
                        height: 40px !important;
                        max-height: 40px !important;
                    }

                    /* Mobile Menu Items Styling */
                    .mobile-nav-menu .ant-menu-item,
                    .mobile-nav-menu .ant-menu-submenu-title {
                        padding: 10px 16px !important;
                        height: auto !important;
                        line-height: 1.5 !important;
                    }
                }

                /* Small Mobile Devices */
                @media (max-width: 480px) {
                    .modern-navbar img[alt="Logo Satu Data Pertanian"] {
                        height: 32px !important;
                        max-height: 32px !important;
                    }
                }
            `}</style>
        </Layout>
    );
};

export default PublicLayout;
