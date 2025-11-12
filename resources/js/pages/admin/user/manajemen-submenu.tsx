import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'User Management',
        href: '/admin/user',
    },
    {
        title: 'Manajemen Submenu',
        href: '#'
    },
];

interface SubMenuItem {
    id: number;
    submenu: string; // Sesuai dengan struktur data
    menu_parent: number; // ID dari menu parent
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface MenuParent {
    id: number;
    menu: string;
}

const ManajemenSubmenuPage = () => {
    const { auth } = usePage<SharedData>().props;
    const [selectedMenuParent, setSelectedMenuParent] = useState<number | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    
    // Data untuk menu parent
    const menuParentOptions: MenuParent[] = [
        { id: 1, menu: 'Menu Admin' },
        { id: 2, menu: 'Data' },
        { id: 3, menu: 'Berita' },
        { id: 4, menu: 'Infografis' },
        { id: 5, menu: 'Publikasi' },
        { id: 6, menu: 'Verifikasi Data Prioritas' },
        { id: 7, menu: 'Foto/Video' },
        { id: 8, menu: 'Verifikasi All Data' },
    ];

    // Data sesuai dengan struktur database
    const [submenuData, setSubmenuData] = useState<SubMenuItem[]>([
        // Submenu untuk Menu Admin (ID 1)
        {
            id: 1,
            submenu: 'Daftar User',
            menu_parent: 1, // Menu Admin
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 2,
            submenu: 'Manajemen Menu',
            menu_parent: 1, // Menu Admin
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 3,
            submenu: 'Manajemen Submenu',
            menu_parent: 1, // Menu Admin
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 4,
            submenu: 'Manajemen Role',
            menu_parent: 1, // Menu Admin
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        // Submenu untuk Data (ID 2)
        {
            id: 5,
            submenu: 'Statistik',
            menu_parent: 2, // Data
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 6,
            submenu: 'Geospatial',
            menu_parent: 2, // Data
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        // Submenu untuk Berita (ID 3)
        {
            id: 7,
            submenu: 'Berita Terbaru',
            menu_parent: 3, // Berita
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 8,
            submenu: 'Arsip Berita',
            menu_parent: 3, // Berita
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        // Submenu untuk Infografis (ID 4)
        {
            id: 9,
            submenu: 'Infografis Terbaru',
            menu_parent: 4, // Infografis
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 10,
            submenu: 'Kategori Infografis',
            menu_parent: 4, // Infografis
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        // Submenu untuk Publikasi (ID 5)
        {
            id: 11,
            submenu: 'Publikasi Terbaru',
            menu_parent: 5, // Publikasi
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 12,
            submenu: 'Laporan Tahunan',
            menu_parent: 5, // Publikasi
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        // Submenu untuk Verifikasi Data Prioritas (ID 6)
        {
            id: 13,
            submenu: 'Verifikasi Data',
            menu_parent: 6, // Verifikasi Data Prioritas
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        // Submenu untuk Foto/Video (ID 7)
        {
            id: 14,
            submenu: 'Galeri Foto',
            menu_parent: 7, // Foto/Video
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 15,
            submenu: 'Video Edukasi',
            menu_parent: 7, // Foto/Video
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        // Submenu untuk Verifikasi All Data (ID 8)
        {
            id: 16,
            submenu: 'Verifikasi Semua Data',
            menu_parent: 8, // Verifikasi All Data
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
    ]);

    const columns: TableColumnsType<SubMenuItem> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nama Submenu',
            dataIndex: 'submenu',
            key: 'submenu',
            sorter: (a, b) => a.submenu.localeCompare(b.submenu),
        },
        {
            title: 'Menu Induk',
            dataIndex: 'menu_parent',
            key: 'menu_parent',
            render: (menuParentId) => {
                const menu = menuParentOptions.find(m => m.id === menuParentId);
                return menu ? menu.menu : 'Tidak Diketahui';
            },
            filters: menuParentOptions.map(menu => ({ text: menu.menu, value: menu.id })),
            onFilter: (value, record) => record.menu_parent === value,
        },
        {
            title: 'Status',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (isActive) => (
                <Tag color={isActive ? 'green' : 'red'}>
                    {isActive ? 'Aktif' : 'Non-Aktif'}
                </Tag>
            ),
        },
        {
            title: 'Tanggal Dibuat',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (date) => new Date(date).toLocaleDateString('id-ID'),
        },
        {
            title: 'Tanggal Diperbarui',
            dataIndex: 'updated_at',
            key: 'updated_at',
            render: (date) => new Date(date).toLocaleDateString('id-ID'),
        },
        {
            title: 'Aksi',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button type="link" danger onClick={() => handleDelete(record.id)}>Hapus</Button>
                </Space>
            ),
        },
    ];

    const { Search } = Input;
    const { Option } = Select;

    // Fungsi untuk menambah submenu baru
    const handleAddSubmenu = (values: any) => {
        // Generate ID baru berdasarkan ID terbesar + 1
        const newId = Math.max(...submenuData.map(s => s.id), 0) + 1;
        
        const newSubmenu: SubMenuItem = {
            id: newId,
            submenu: values.submenu,
            menu_parent: values.menu_parent,
            is_active: values.is_active,
            created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
            updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };

        // Tambahkan submenu baru ke state
        setSubmenuData(prev => [...prev, newSubmenu]);
        
        // Reset form dan tutup modal
        form.resetFields();
        setIsModalVisible(false);
    };

    // Fungsi untuk menangani penghapusan submenu
    const handleDelete = (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus submenu ini?')) {
            // Hapus dari state
            setSubmenuData(prev => prev.filter(submenu => submenu.id !== id));
        }
    };

    // Fungsi untuk menangani edit submenu
    const handleEdit = (record: SubMenuItem) => {
        // Isi form dengan data submenu
        form.setFieldsValue({
            submenu: record.submenu,
            menu_parent: record.menu_parent,
            is_active: record.is_active
        });
        
        // Dalam implementasi sebenarnya, Anda akan mengganti state untuk menandai bahwa ini adalah edit
        console.log('Edit submenu:', record);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Submenu - User Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Submenu</h1>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.resetFields();
                            setIsModalVisible(true);
                        }}
                    >
                        Tambah Submenu Baru
                    </Button>
                </div>
                <p>Kelola submenu dari menu-menu yang tersedia dalam sistem admin beserta hubungannya dengan menu induk dan status aktivasi.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Search
                            placeholder="Cari submenu..."
                            onSearch={(value) => console.log(value)}
                            style={{ width: 300 }}
                            enterButton
                        />
                        <Select
                            placeholder="Filter Menu Induk"
                            style={{ width: 200 }}
                            allowClear
                            onChange={(value) => setSelectedMenuParent(value || null)}
                        >
                            {menuParentOptions.map(menu => (
                                <Option key={menu.id} value={menu.id}>{menu.menu}</Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Filter Status"
                            style={{ width: 150 }}
                            allowClear
                        >
                            <Option value={true}>Aktif</Option>
                            <Option value={false}>Non-Aktif</Option>
                        </Select>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={selectedMenuParent ? submenuData.filter(item => item.menu_parent === selectedMenuParent) : submenuData}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} submenu`
                        }}
                    />
                </Card>

                <Modal
                    title="Tambah Submenu Baru"
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                            Batal
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => form.submit()}>
                            Simpan
                        </Button>,
                    ]}
                >
                    <Form 
                        form={form}
                        layout="vertical"
                        onFinish={handleAddSubmenu}
                    >
                        <Form.Item label="Nama Submenu" name="submenu" rules={[{ required: true, message: 'Nama submenu wajib diisi' }]}>
                            <Input placeholder="Masukkan nama submenu" />
                        </Form.Item>
                        <Form.Item label="Menu Induk" name="menu_parent" rules={[{ required: true, message: 'Menu induk wajib dipilih' }]}>
                            <Select placeholder="Pilih menu induk">
                                {menuParentOptions.map(menu => (
                                    <Option key={menu.id} value={menu.id}>{menu.menu}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Status" name="is_active" initialValue={true}>
                            <Select>
                                <Option value={true}>Aktif</Option>
                                <Option value={false}>Non-Aktif</Option>
                            </Select>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default ManajemenSubmenuPage;