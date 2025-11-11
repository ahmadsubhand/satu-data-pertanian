import AdminLayout from '@/layouts/admin/layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Verifikasi Data Prioritas',
        href: '#',
    },
];

export default function VerifikasiDataPrioritasPage() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Verifikasi Data Prioritas" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Verifikasi Data Prioritas</h1>
                    <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        Proses Data
                    </button>
                </div>
                <p>Ini adalah halaman untuk verifikasi data prioritas.</p>
                <div className="mt-4 rounded-lg border p-4">
                    <h2 className="mb-2 text-lg font-semibold">Daftar Data Prioritas Menunggu Verifikasi</h2>
                    <p>Daftar data prioritas yang menunggu verifikasi akan ditampilkan di sini.</p>
                </div>
            </div>
        </AdminLayout>
    );
}