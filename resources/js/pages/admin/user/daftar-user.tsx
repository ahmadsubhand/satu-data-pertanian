import AdminLayout from '@/layouts/admin/layout';
import { SharedData, User as UserType, type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminUserDestroy, adminUserStore, adminUserUpdate, dashboard } from '@/routes';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: dashboard.url(),
    },
    {
        title: 'Daftar User',
        href: '#'
    },
];

interface Props {
    user: UserType[];
    roles: {
        id: number;
        role: string;
        created_at: string;
        updated_at: string;
    }[];
    eselon: {
        id: number;
        value: string;
        created_at: string;
        updated_at: string;
    }[];
}

const DaftarUserPage = ({ user, roles, eselon }: Props) => {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    

    const [selectedRole, setSelectedRole] = useState<number | null>(null);
    const [selectedEselon, setSelectedEselon] = useState<number | null>(null); // Changed to number for ID
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });

    // Use data from props instead of hardcoded values
    const [userData, setUserData] = useState<UserType[]>(user);

    // Fungsi untuk memfilter data berdasarkan pencarian dan filter yang dipilih
    const filteredData = userData.filter(user =>
        user.nama_lengkap.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.nip.toLowerCase().includes(searchText.toLowerCase()) ||
        user.unit_kerja.toLowerCase().includes(searchText.toLowerCase())
    ).filter(user =>
        selectedRole ? user.user_role_id === selectedRole : true
    ).filter(user =>
        selectedEselon ? user.eselon?.id === selectedEselon : true
    );

    const columns: TableColumnsType<UserType> = [
        {
            title: 'No',
            key: 'no',
            render: (_text, _record, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: 'NIP',
            dataIndex: 'nip',
            key: 'nip',
            sorter: (a, b) => a.nip.localeCompare(b.nip),
            minWidth: 170,
        },
        {
            title: 'Nama',
            dataIndex: 'nama_lengkap',
            key: 'nama_lengkap',
            sorter: (a, b) => a.nama_lengkap.localeCompare(b.nama_lengkap),
            minWidth: 200,
        },
        {
            title: 'Eselon',
            dataIndex: 'eselon',
            key: 'eselon',
            render: (eselon) => eselon?.value || '-',
            sorter: (a, b) => (a.eselon?.value || '').localeCompare(b.eselon?.value || ''),
            minWidth: 200,
        },
        {
            title: 'Unit Kerja',
            dataIndex: 'unit_kerja',
            key: 'unit_kerja',
            sorter: (a, b) => a.unit_kerja.localeCompare(b.unit_kerja),
            minWidth: 200
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            minWidth: 200
        },
        {
            title: 'Telepon',
            dataIndex: 'hp',
            key: 'hp',
            minWidth: 120,
        },
        {
            title: 'Role',
            dataIndex: 'user_role',
            key: 'user_role',
            render: (_, record) => {
                return record.user_role?.role || 'Tdk Diketahui';
            },
            sorter: (a, b) => a.user_role.role.localeCompare(b.user_role.role),
            minWidth: 120,
        },
        {
            title: 'Tanggal Didaftarkan',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (value) => new Date(value).toISOString().split('T')[0],
            sorter: (a, b) => a.created_at.localeCompare(b.created_at),
            minWidth: 120
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
            minWidth: 100,
        },
    ];

    const { Search } = Input;
    const { Option } = Select;

    // Fungsi untuk menambah atau mengupdate user
    const handleAddUser = (values: any) => {
        if (isEditing && currentRecord) {
            // Update user yang sudah ada via API
            router.put(adminUserUpdate.url(currentRecord.id), {
                ...values,
                username: values.nama_lengkap.toLowerCase().replace(/\s+/g, '_'),
                password: values.password || null, // Jika password tidak diisi, kirim null
            });
        } else {
            // Tambah user baru via API
            router.post(adminUserStore.url(), {
                ...values,
                username: values.nama_lengkap.toLowerCase().replace(/\s+/g, '_'),
                password: values.password || 'password123', // Default password jika tidak diisi
            });
        }
    };

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    
    // Fungsi untuk menangani penghapusan user
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };
    
    // Fungsi untuk mengkonfirmasi penghapusan
    const confirmDelete = () => {
        if (deleteRecordId) {
            router.delete(adminUserDestroy.url(deleteRecordId));
        }
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };
    
    // Fungsi untuk membatalkan penghapusan
    const cancelDelete = () => {
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // State untuk menandai apakah sedang dalam mode edit
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<UserType | null>(null);

    // Fungsi untuk menangani edit user
    const handleEdit = (record: UserType) => {
        // Isi form dengan data user, kecuali password
        form.setFieldsValue({
            nip: record.nip,
            nama_lengkap: record.nama_lengkap,
            eselon: record.eselon?.id,
            unit_kerja: record.unit_kerja,
            email: record.email,
            hp: record.hp,
            user_role_id: record.user_role_id,
            // Jangan isi password dari data lama
        });
        
        // Set mode edit dan simpan record yang sedang diedit
        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Daftar User - Manajemen User" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Daftar User</h1>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.resetFields();
                            setIsEditing(false);
                            setCurrentRecord(null);
                            setIsModalVisible(true);
                        }}
                    >
                        Tambah User Baru
                    </Button>
                </div>
                <p>Daftar semua pengguna yang terdaftar dalam sistem termasuk informasi role dan status.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Search
                            placeholder="Cari pengguna (nama, email, nip, unit kerja)..."
                            onSearch={value => setSearchText(value)}
                            style={{ width: 300 }}
                            enterButton
                        />
                        <Select
                            placeholder="Filter Role"
                            style={{ width: 150 }}
                            allowClear
                            onChange={(value) => setSelectedRole(value || null)}
                        >
                            {roles.map(role => (
                                <Option key={role.id} value={role.id}>{role.role}</Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Filter Eselon"
                            style={{ width: 250 }}
                            allowClear
                            onChange={(value) => setSelectedEselon(value || null)}
                        >
                            {eselon.map(e => (
                                <Option key={e.id} value={e.id}>{e.value}</Option>
                            ))}
                        </Select>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} pengguna`
                        }}
                        scroll={{ x: 1200 }}
                        onChange={(paginationConfig) => {
                            setPagination({
                                current: paginationConfig.current!,
                                pageSize: paginationConfig.pageSize!
                            });
                        }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit User" : "Tambah User Baru"}
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
                        onFinish={handleAddUser}
                    >
                        <Form.Item label="NIP" name="nip" rules={[{ required: true, message: 'NIP wajib diisi' }]}>
                            <Input placeholder="Masukkan NIP" />
                        </Form.Item>
                        <Form.Item label="Nama Lengkap" name="nama_lengkap" rules={[{ required: true, message: 'Nama lengkap wajib diisi' }]}>
                            <Input placeholder="Masukkan nama lengkap" />
                        </Form.Item>
                        <Form.Item label="Eselon" name="eselon" rules={[{ required: true, message: 'Eselon wajib dipilih' }]}>
                            <Select placeholder="Pilih eselon">
                                {eselon.map(e => (
                                    <Option key={e.id} value={e.id}>{e.value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Unit Kerja" name="unit_kerja" rules={[{ required: true, message: 'Unit kerja wajib diisi' }]}>
                            <Input placeholder="Masukkan unit kerja" />
                        </Form.Item>
                        <Form.Item 
                            label="Email" 
                            name="email" 
                            rules={[
                                { required: true, message: 'Email wajib diisi' },
                                { type: 'email', message: 'Format email tidak valid' }
                            ]}
                        >
                            <Input placeholder="Masukkan alamat email" />
                        </Form.Item>
                        <Form.Item label="HP" name="hp" rules={[{ required: true, message: 'Nomor HP wajib diisi' }]}>
                            <Input placeholder="Masukkan nomor HP" />
                        </Form.Item>
                        <Form.Item label="Role" name="user_role_id" rules={[{ required: true, message: 'Role wajib dipilih' }]}>
                            <Select placeholder="Pilih role">
                                {roles.map(role => (
                                    <Option key={role.id} value={role.id}>{role.role}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            label="Password" 
                            name="password"
                            rules={
                                !isEditing 
                                ? [
                                    { required: true, message: 'Password wajib diisi saat menambah user baru' },
                                    { min: 8, message: 'Password minimal 8 karakter' }
                                  ]
                                : [
                                    { min: 8, message: 'Password minimal 8 karakter jika diisi' }
                                  ]
                            }
                        >
                            <Input.Password placeholder={isEditing ? "Isi hanya jika ingin mengganti password" : "Masukkan password"} />
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
                    <p>Apakah Anda yakin ingin menghapus user ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default DaftarUserPage;