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
        title: 'Manajemen Menu',
        href: '#'
    },
];

interface MenuItem {
    id: number;
    menu: string; // Sesuai dengan struktur database Anda
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

const ManajemenMenuPage = () => {
    const { auth } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [menuData, setMenuData] = useState<MenuItem[]>([
        {
            id: 1,
            menu: 'Menu Admin',
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 2,
            menu: 'Data',
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 3,
            menu: 'Berita',
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 4,
            menu: 'Infografis',
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 5,
            menu: 'Publikasi',
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 6,
            menu: 'Verifikasi Data Prioritas',
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 7,
            menu: 'Foto/Video',
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 8,
            menu: 'Verifikasi All Data',
            is_active: true,
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
    ]);

    const columns: TableColumnsType<MenuItem> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nama Menu',
            dataIndex: 'menu',
            key: 'menu',
            sorter: (a, b) => a.menu.localeCompare(b.menu),
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

    // Fungsi untuk menambah menu baru
    const handleAddMenu = (values: any) => {
        // Generate ID baru berdasarkan ID terbesar + 1
        const newId = Math.max(...menuData.map(m => m.id), 0) + 1;
        
        const newMenu: MenuItem = {
            id: newId,
            menu: values.menu,
            is_active: values.is_active,
            created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
            updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };

        // Tambahkan menu baru ke state
        setMenuData(prev => [...prev, newMenu]);
        
        // Reset form dan tutup modal
        form.resetFields();
        setIsModalVisible(false);
    };

    // Fungsi untuk menangani penghapusan menu
    const handleDelete = (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus menu ini?')) {
            // Hapus dari state
            setMenuData(prev => prev.filter(menu => menu.id !== id));
        }
    };

    // Fungsi untuk menangani edit menu
    const handleEdit = (record: MenuItem) => {
        // Isi form dengan data menu
        form.setFieldsValue({
            menu: record.menu,
            is_active: record.is_active
        });
        
        // Dalam implementasi sebenarnya, Anda akan mengganti state untuk menandai bahwa ini adalah edit
        console.log('Edit menu:', record);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Menu - User Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Menu</h1>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.resetFields();
                            setIsModalVisible(true);
                        }}
                    >
                        Tambah Menu Baru
                    </Button>
                </div>
                <p>Kelola menu-menu yang tersedia dalam sistem admin beserta status aktivasi dan route-nya.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Search
                            placeholder="Cari menu..."
                            onSearch={(value) => console.log(value)}
                            style={{ width: 300 }}
                            enterButton
                        />
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
                        dataSource={menuData}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} menu`
                        }}
                    />
                </Card>

                <Modal
                    title="Tambah Menu Baru"
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
                        onFinish={handleAddMenu}
                    >
                        <Form.Item label="Nama Menu" name="menu" rules={[{ required: true, message: 'Nama menu wajib diisi' }]}>
                            <Input placeholder="Masukkan nama menu" />
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

export default ManajemenMenuPage;