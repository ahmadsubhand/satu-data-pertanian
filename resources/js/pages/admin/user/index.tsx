import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Menu User',
        href: '#'
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    useEffect(() => {
        console.log(auth);
    }, [auth])
    
    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Menu Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>Halo ini Menu User</h1>
                <p>Ini adalah halaman utama untuk manajemen user.</p>
            </div>
        </AdminLayout>
    );
}
