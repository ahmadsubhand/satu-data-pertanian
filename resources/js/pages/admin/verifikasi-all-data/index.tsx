import AdminLayout from '@/layouts/admin/layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: dashboard.url(),
    },
    {
        title: 'Verifikasi All Data',
        href: '#',
    },
];

export default function VerifikasiAllDataPage() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Verifikasi All Data" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Verifikasi All Data</h1>
                    <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        Proses Semua Data
                    </button>
                </div>
                <p>Ini adalah halaman untuk verifikasi semua data.</p>
                <div className="mt-4 rounded-lg border p-4">
                    <h2 className="mb-2 text-lg font-semibold">Daftar Semua Data Menunggu Verifikasi</h2>
                    <p>Daftar semua data yang menunggu verifikasi akan ditampilkan di sini.</p>
                </div>
            </div>
        </AdminLayout>
    );
}