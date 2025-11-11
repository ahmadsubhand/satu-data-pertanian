import AdminLayout from '@/layouts/admin/layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Foto/Video',
        href: '#',
    },
];

export default function FotoVideoPage() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Foto/Video" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Foto/Video</h1>
                    <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        Upload Baru
                    </button>
                </div>
                <p>Ini adalah halaman untuk manajemen foto dan video.</p>
                <div className="mt-4 rounded-lg border p-4">
                    <h2 className="mb-2 text-lg font-semibold">Daftar Foto/Video</h2>
                    <p>Daftar foto dan video akan ditampilkan di sini.</p>
                </div>
            </div>
        </AdminLayout>
    );
}