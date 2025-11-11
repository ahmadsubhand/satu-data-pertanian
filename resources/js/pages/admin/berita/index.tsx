import AdminLayout from '@/layouts/admin/layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Berita',
        href: '#',
    },
];

export default function BeritaPage() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Berita" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Berita</h1>
                    <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        Tambah Berita Baru
                    </button>
                </div>
                <p>Ini adalah halaman untuk manajemen berita.</p>
                <div className="mt-4 rounded-lg border p-4">
                    <h2 className="mb-2 text-lg font-semibold">Daftar Berita</h2>
                    <p>Daftar berita akan ditampilkan di sini.</p>
                </div>
            </div>
        </AdminLayout>
    );
}