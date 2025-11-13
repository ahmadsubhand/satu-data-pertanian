import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { BarChart3, FileText, Database, Link as LinkIcon, Calendar, FolderOpen, FileSearch } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Data Management',
        href: '#'
    },
];

export default function DataManagementDashboard() {
    const { auth } = usePage<SharedData>().props;
    useEffect(() => {
        console.log(auth);
    }, [auth])

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Management - Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">Manajemen Data</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Kelola data statistik, geospasial, indikator, variabel, dan link terkait.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Input Data Card */}
                    <Link 
                        href="/admin/data/input-data" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <FileText className="h-10 w-10 text-blue-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Input Data</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Input dan kelola data statistik, geospasial, indikator, variabel, dan link
                        </p>
                    </Link>
                    
                    {/* Input Daftar Data Card */}
                    <Link 
                        href="/admin/data/input-daftar-data" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <FolderOpen className="h-10 w-10 text-green-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Input Daftar Data</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Input daftar data yang tersedia dalam sistem
                        </p>
                    </Link>
                    
                    {/* Input Data Variabel Card */}
                    <Link 
                        href="/admin/data/input-data-variabel" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <Database className="h-10 w-10 text-purple-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Input Data Variabel</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Input variabel-variabel yang digunakan dalam data
                        </p>
                    </Link>
                    
                    {/* Input Data Indikator Card */}
                    <Link 
                        href="/admin/data/input-data-indikator" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <FileSearch className="h-10 w-10 text-orange-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Input Data Indikator</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Input indikator-indikator untuk pengukuran
                        </p>
                    </Link>
                    
                    {/* Input Link Website Card */}
                    <Link 
                        href="/admin/data/input-link-website" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <LinkIcon className="h-10 w-10 text-teal-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Input Link Website</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Input link-link website terkait data
                        </p>
                    </Link>
                    
                    {/* Kalender Data Card */}
                    <Link 
                        href="/admin/data/kalender" 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow hover:bg-green-50 dark:hover:bg-green-900/20"
                    >
                        <Calendar className="h-10 w-10 text-amber-500 mb-3" />
                        <h3 className="font-semibold text-lg mb-2">Kalender Data</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                            Jadwal rilis dan pembaruan data
                        </p>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}