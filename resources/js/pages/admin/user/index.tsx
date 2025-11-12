import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { Users, Menu as MenuIcon, Settings, UserRoundCog, BarChart3, FileText, Newspaper, ImageIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'User Management',
        href: '#'
    },
];

export default function UserManagementDashboard() {
    const { auth } = usePage<SharedData>().props;
    useEffect(() => {
        console.log(auth);
    }, [auth])

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="User Management - Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Manajemen User</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Kelola pengguna, menu, submenu, dan peran dalam sistem.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Daftar User Card */}
                    <Link 
                        href="/admin/user/daftar-user" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <Users className="h-10 w-10 text-blue-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Daftar User</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Kelola dan lihat daftar pengguna sistem
                        </p>
                    </Link>
                    
                    {/* Manajemen Menu Card */}
                    <Link 
                        href="/admin/user/manajemen-menu" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <MenuIcon className="h-10 w-10 text-green-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Manajemen Menu</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Kelola menu yang tersedia di sistem
                        </p>
                    </Link>
                    
                    {/* Manajemen Submenu Card */}
                    <Link 
                        href="/admin/user/manajemen-submenu" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <Settings className="h-10 w-10 text-purple-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Manajemen Submenu</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Kelola submenu untuk setiap menu
                        </p>
                    </Link>
                    
                    {/* Manajemen Role Card */}
                    <Link 
                        href="/admin/user/manajemen-role" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <UserRoundCog className="h-10 w-10 text-orange-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Manajemen Role</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Kelola peran dan hak akses pengguna
                        </p>
                    </Link>
                    
                    {/* Manajemen Data Card */}
                    <Link 
                        href="/admin/data" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <BarChart3 className="h-10 w-10 text-cyan-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Manajemen Data</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Kelola data statistik dan geospasial
                        </p>
                    </Link>
                    
                    {/* Manajemen Berita Card */}
                    <Link 
                        href="/admin/berita" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <Newspaper className="h-10 w-10 text-red-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Manajemen Berita</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Kelola konten berita dan informasi
                        </p>
                    </Link>
                    
                    {/* Manajemen Infografis Card */}
                    <Link 
                        href="/admin/infografis" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <ImageIcon className="h-10 w-10 text-indigo-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Manajemen Infografis</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Kelola visualisasi data dalam bentuk infografis
                        </p>
                    </Link>
                    
                    {/* Manajemen Publikasi Card */}
                    <Link 
                        href="/admin/publikasi" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <FileText className="h-10 w-10 text-amber-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Manajemen Publikasi</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Kelola publikasi dan laporan
                        </p>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}