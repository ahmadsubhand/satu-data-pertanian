import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<UserRole | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
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
                <Space size="small">
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        title="Edit"
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                        title="Hapus"
                    />
                    <Button
                        type="text"
                        onClick={() => console.log(`Manage permissions for role ${record.id}`)}
                        title="Kelola Akses"
                    >
                        Kelola Akses
                    </Button>
                </Space>
            ),
        },
    ];

    const { Search } = Input;
    const { Option } = Select;

    // Fungsi untuk menambah atau mengupdate role
    const handleAddRole = async (values: any) => {
        try {
            if (isEditing && currentRecord) {
                // Update role yang sudah ada - panggil API
                const response = await fetch(`/api/user-roles/${currentRecord.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                    },
                    body: JSON.stringify(values)
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    // Tampilkan error ke pengguna
                    Object.keys(errorData.errors || {}).forEach(field => {
                        form.setFields([{ name: field, errors: [errorData.errors[field][0]] }]);
                    });
                    return; // Jangan lanjutkan jika ada error
                }
                
                const updatedRole = await response.json();
                
                // Update data di state
                setRoleData(prev => prev.map(role =>
                    role.id === currentRecord.id ? updatedRole : role
                ));

                // Reset mode edit
                setIsEditing(false);
                setCurrentRecord(null);
            } else {
                // Tambah role baru - panggil API
                const response = await fetch('/api/user-roles', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                    },
                    body: JSON.stringify(values)
                });
                
                if (!response.ok) {
                    const errorData = await response.json();
                    // Tampilkan error ke pengguna
                    Object.keys(errorData.errors || {}).forEach(field => {
                        form.setFields([{ name: field, errors: [errorData.errors[field][0]] }]);
                    });
                    return; // Jangan lanjutkan jika ada error
                }
                
                const newRole = await response.json();
                // Tambahkan role baru ke state
                setRoleData(prev => [...prev, newRole]);
            }
            
            // Reset form dan tutup modal
            form.resetFields();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Fungsi untuk menangani penghapusan role
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Fungsi untuk menangani edit role
    const handleEdit = (record: UserRole) => {
        // Isi form dengan data role
        form.setFieldsValue({
            role: record.role
        });

        // Set mode edit dan simpan record yang sedang diedit
        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    // Fungsi untuk mengkonfirmasi penghapusan
    const confirmDelete = async () => {
        if (deleteRecordId !== null) {
            try {
                const response = await fetch(`/api/user-roles/${deleteRecordId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                    }
                });
                
                if (response.ok) {
                    // Hapus dari state
                    setRoleData(prev => prev.filter(role => role.id !== deleteRecordId));
                } else {
                    console.error('Gagal menghapus role');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Fungsi untuk membatalkan penghapusan
    const cancelDelete = () => {
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
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
                            setIsEditing(false);
                            setCurrentRecord(null);
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
                    title={isEditing ? "Edit Role" : "Tambah Role Baru"}
                    open={isModalVisible}
                    onCancel={() => {
                        setIsModalVisible(false);
                        setIsEditing(false);
                        setCurrentRecord(null);
                        form.resetFields();
                    }}
                    footer={[
                        <Button key="cancel" onClick={() => {
                            setIsModalVisible(false);
                            setIsEditing(false);
                            setCurrentRecord(null);
                            form.resetFields();
                        }}>
                            Batal
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => form.submit()}>
                            {isEditing ? "Update" : "Simpan"}
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
                {/* Modal untuk konfirmasi penghapusan */}
                <Modal
                    title="Konfirmasi Hapus"
                    open={deleteModalVisible}
                    onOk={confirmDelete}
                    onCancel={cancelDelete}
                    okText="Hapus"
                    cancelText="Batal"
                    okType="danger"
                >
                    <p>Apakah Anda yakin ingin menghapus role ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default ManajemenRolePage;