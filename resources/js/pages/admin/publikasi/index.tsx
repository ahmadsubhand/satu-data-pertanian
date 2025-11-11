import AdminLayout from '@/layouts/admin/layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Publikasi',
        href: '#',
    },
];

export default function PublikasiPage() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Publikasi" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Publikasi</h1>
                    <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        Tambah Publikasi Baru
                    </button>
                </div>
                <p>Ini adalah halaman untuk manajemen publikasi.</p>
                <div className="mt-4 rounded-lg border p-4">
                    <h2 className="mb-2 text-lg font-semibold">Daftar Publikasi</h2>
                    <p>Daftar publikasi akan ditampilkan di sini.</p>
                </div>
            </div>
        </AdminLayout>
    );
}