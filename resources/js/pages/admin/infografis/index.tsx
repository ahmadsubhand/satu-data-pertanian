import AdminLayout from '@/layouts/admin/layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Infografis',
        href: '#',
    },
];

export default function InfografisPage() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Infografis" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Infografis</h1>
                    <button className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                        Tambah Infografis Baru
                    </button>
                </div>
                <p>Ini adalah halaman untuk manajemen infografis.</p>
                <div className="mt-4 rounded-lg border p-4">
                    <h2 className="mb-2 text-lg font-semibold">Daftar Infografis</h2>
                    <p>Daftar infografis akan ditampilkan di sini.</p>
                </div>
            </div>
        </AdminLayout>
    );
}