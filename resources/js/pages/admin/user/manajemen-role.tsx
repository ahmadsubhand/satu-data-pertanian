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
        title: 'Manajemen Role',
        href: '#'
    },
];

interface UserRole {
    id: number;
    role: string; // Sesuai dengan struktur database Anda
    created_at: string;
    updated_at: string;
}

const ManajemenRolePage = () => {
    const { auth } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [roleData, setRoleData] = useState<UserRole[]>([
        {
            id: 1,
            role: 'Superadmin',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 2,
            role: 'Walidata',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 3,
            role: 'Admin Pusdatin',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 4,
            role: 'Pembina Data',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
        {
            id: 5,
            role: 'Produsen Data',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02',
        },
    ]);

    const columns: TableColumnsType<UserRole> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nama Role',
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => a.role.localeCompare(b.role),
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
                    <Button
                        type="link"
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record.id)}
                    >
                        Hapus
                    </Button>
                    <Button
                        type="link"
                        onClick={() => console.log(`Manage permissions for role ${record.id}`)}
                    >
                        Kelola Akses
                    </Button>
                </Space>
            ),
        },
    ];

    const { Search } = Input;
    const { Option } = Select;

    // Fungsi untuk menambah role baru
    const handleAddRole = (values: any) => {
        // Generate ID baru berdasarkan ID terbesar + 1
        const newId = Math.max(...roleData.map(r => r.id), 0) + 1;
        
        const newRole: UserRole = {
            id: newId,
            role: values.role,
            created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
            updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };

        // Tambahkan role baru ke state
        setRoleData(prev => [...prev, newRole]);
        
        // Reset form dan tutup modal
        form.resetFields();
        setIsModalVisible(false);
    };

    // Fungsi untuk menangani penghapusan role
    const handleDelete = (id: number) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus role ini?')) {
            // Hapus dari state
            setRoleData(prev => prev.filter(role => role.id !== id));
        }
    };

    // Fungsi untuk menangani edit role
    const handleEdit = (record: UserRole) => {
        // Isi form dengan data role
        form.setFieldsValue({
            role: record.role
        });
        
        // Dalam implementasi sebenarnya, Anda akan mengganti state untuk menandai bahwa ini adalah edit
        console.log('Edit role:', record);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Manajemen Role - User Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Role</h1>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.resetFields();
                            setIsModalVisible(true);
                        }}
                    >
                        Tambah Role Baru
                    </Button>
                </div>
                <p>Kelola role pengguna beserta hak akses dan jumlah pengguna yang terdaftar dalam setiap role di sistem admin.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Search
                            placeholder="Cari role..."
                            onSearch={(value) => console.log(value)}
                            style={{ width: 300 }}
                            enterButton
                        />
                    </div>

                    <Table
                        columns={columns}
                        dataSource={roleData}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} role`
                        }}
                        scroll={{ x: 800 }}
                    />
                </Card>

                <Modal
                    title="Tambah Role Baru"
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
                        onFinish={handleAddRole}
                    >
                        <Form.Item label="Nama Role" name="role" rules={[{ required: true, message: 'Nama role wajib diisi' }]}>
                            <Input placeholder="Masukkan nama role" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default ManajemenRolePage;