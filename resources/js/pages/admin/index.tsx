import AdminLayout from '@/layouts/admin/layout';
import { MenuItem, SharedData, User, type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { Users, Menu as MenuIcon, Settings, UserRoundCog, BarChart3, FileText, Newspaper, ImageIcon, VideoIcon } from 'lucide-react';
import { adminBerita, adminDataInput, adminFotoVideo, adminInfografis, adminPublikasi, adminUserList, dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: dashboard.url(),
    },
];

export const getAdminNavItems = (user: User): MenuItem[] => {
    const items: MenuItem[] = []
    const accessibleMenus = user.user_role?.user_menus ?? []

    // Mapping ID → NavItem (dengan helper URL)
    const menuMap: Record<number, MenuItem> = {
        1 : {
            id: 1,
            title: 'Manajemen User',
            description: 'Kelola dan lihat daftar pengguna sistem',
            icon: <Users className="h-10 w-10 text-blue-500 mb-3" />,
            link: adminUserList.url(),
        },
        2 : {
            id: 2,
            title: 'Manajemen Data',
            description: 'Kelola data statistik dan geospasial',
            icon: <BarChart3 className="h-10 w-10 text-cyan-500 mb-3" />,
            link: adminDataInput.url()
        },
        3 : {
            id: 3,
            title: 'Manajemen Berita',
            description: 'Kelola konten berita dan informasi',
            icon: <Newspaper className="h-10 w-10 text-red-500 mb-3" />,
            link: adminBerita.url()
        },
        4 : {
            id: 4,
            title: 'Manajemen Infografis',
            description: 'Kelola visualisasi data dalam bentuk infografis',
            icon: <ImageIcon className="h-10 w-10 text-indigo-500 mb-3" />,
            link: adminInfografis.url()
        },
        5 : {
            id: 5,
            title: 'Manajemen Publikasi',
            description: 'Kelola publikasi dan laporan',
            icon: <FileText className="h-10 w-10 text-amber-500 mb-3" />,
            link: adminPublikasi.url()
        },
        7 : {
            id: 7,
            title: 'Manajemen Foto & Video',
            description: 'Kelola dokumentasi foto dan video kegiatan',
            icon: <VideoIcon className="h-10 w-10 text-purple-500 mb-3" />,
            link: adminFotoVideo.url(),
        },
        
    }

    // Hanya tampilkan menu yang user punya aksesnya
    accessibleMenus.forEach((menu) => {
        const nav = menuMap[menu.id]
        if (nav) items.push(nav)
    })

    return items
}

export default function UserManagementDashboard() {
    const { auth } = usePage<SharedData>().props;
    const adminMenus = getAdminNavItems(auth.user);

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Panel Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Panel Admin</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Kelola pengguna dan data portal satu data pertanian.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Daftar User Card */}
                    {adminMenus.map(menu => (
                        <Link 
                            href={menu.link} key={menu.id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                        >
                            {menu.icon}
                            <h3 className="font-semibold text-lg mb-2">{menu.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                                {menu.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}