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
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<MenuItem | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
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
                </Space>
            ),
        },
    ];

    const { Search } = Input;
    const { Option } = Select;

    // Fungsi untuk menambah atau mengupdate menu
    const handleAddMenu = async (values: any) => {
        try {
            if (isEditing && currentRecord) {
                // Update menu yang sudah ada - panggil API
                const response = await fetch(`/api/user-menus/${currentRecord.id}`, {
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
                
                const updatedMenu = await response.json();
                
                // Update data di state
                setMenuData(prev => prev.map(menu =>
                    menu.id === currentRecord.id ? updatedMenu : menu
                ));

                // Reset mode edit
                setIsEditing(false);
                setCurrentRecord(null);
            } else {
                // Tambah menu baru - panggil API
                const response = await fetch('/api/user-menus', {
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
                
                const newMenu = await response.json();
                // Tambahkan menu baru ke state
                setMenuData(prev => [...prev, newMenu]);
            }
            
            // Reset form dan tutup modal
            form.resetFields();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Fungsi untuk menangani penghapusan menu
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Fungsi untuk menangani edit menu
    const handleEdit = (record: MenuItem) => {
        // Isi form dengan data menu
        form.setFieldsValue({
            menu: record.menu,
            is_active: record.is_active
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
                const response = await fetch(`/api/user-menus/${deleteRecordId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                    }
                });
                
                if (response.ok) {
                    // Hapus dari state
                    setMenuData(prev => prev.filter(menu => menu.id !== deleteRecordId));
                } else {
                    console.error('Gagal menghapus menu');
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
            <Head title="Manajemen Menu - User Management" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Menu</h1>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.resetFields();
                            setIsEditing(false);
                            setCurrentRecord(null);
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
                    title={isEditing ? "Edit Menu" : "Tambah Menu Baru"}
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
                    <p>Apakah Anda yakin ingin menghapus menu ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default ManajemenMenuPage;