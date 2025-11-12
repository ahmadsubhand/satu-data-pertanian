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
        title: 'Daftar User',
        href: '#'
    },
];

interface UserData {
    id: number;
    nip: string;
    nama_lengkap: string;
    eselon: string;
    unit_kerja: string;
    email: string;
    hp: string;
    user_role_id: number;
    username: string;
    created_at: string;
    updated_at: string;
}

const DaftarUserPage = () => {
    const { auth } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRole, setSelectedRole] = useState<number | null>(null);
    const [selectedEselon, setSelectedEselon] = useState<string | null>(null);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();

    // Data role untuk referensi
    const roles = [
        { id: 1, role: 'Superadmin' },
        { id: 2, role: 'Walidata' },
        { id: 3, role: 'Admin Pusdatin' },
        { id: 4, role: 'Pembina Data' },
        { id: 5, role: 'Produsen Data' },
    ];

    // Data contoh pengguna sesuai dengan struktur UserSeeder
    const [userData, setUserData] = useState<UserData[]>([
        {
            id: 10,
            nip: '198701042011011010',
            nama_lengkap: 'ASYHADI LAKSONO HAKIM',
            eselon: 'SEKRETARIAT JENDERAL',
            unit_kerja: 'PUSAT DATA DAN SISTEM INFORMASI PERTANIAN',
            email: 'asyhadi@pertanian.go.id',
            hp: '081286184174',
            user_role_id: 5,
            username: 'asyhadi_laksono_hakim',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02'
        },
        {
            id: 11,
            nip: '198111062009101004',
            nama_lengkap: 'ANDRY POLOS',
            eselon: '',
            unit_kerja: 'PUSAT DATA DAN SISTEM INFORMASI PERTANIAN',
            email: 'andry_p@pertanian.go.id',
            hp: '08561116187',
            user_role_id: 3,
            username: 'andry_polos',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02'
        },
        {
            id: 22,
            nip: '198702272009122006',
            nama_lengkap: 'ROYDATUL ZIKRIA',
            eselon: 'SEKRETARIAT JENDERAL',
            unit_kerja: 'PUSAT DATA DAN SISTEM INFORMASI PERTANIAN',
            email: 'roydatul_z@pertanian.go.id',
            hp: '085645866356',
            user_role_id: 1,
            username: 'roydatul_zikria',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02'
        },
        {
            id: 23,
            nip: '198605302009011001',
            nama_lengkap: 'RHENDY KENCANAPUTRA WIDIYANTO',
            eselon: 'SEKRETARIAT JENDERAL',
            unit_kerja: 'PUSAT DATA DAN SISTEM INFORMASI PERTANIAN',
            email: 'rhendy@pertanian.go.id',
            hp: '082111132121',
            user_role_id: 3,
            username: 'rhendy_kencanaputra_widiyanto',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02'
        },
        {
            id: 25,
            nip: '199102012019021001',
            nama_lengkap: 'RIZKY PURNAMA RIHALDIYAN',
            eselon: 'SEKRETARIAT JENDERAL',
            unit_kerja: 'PUSAT DATA DAN SISTEM INFORMASI PERTANIAN',
            email: 'rizkypurnama@pertanian.go.id',
            hp: '085794806545',
            user_role_id: 1,
            username: 'rizky_purnama_rihaldian',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02'
        },
        {
            id: 26,
            nip: '198406112002121001',
            nama_lengkap: 'AMIRZA NATA KUSUMA',
            eselon: 'SEKRETARIAT JENDERAL',
            unit_kerja: 'PUSAT DATA DAN SISTEM INFORMASI PERTANIAN',
            email: 'amirzanata@pertanian.go.id',
            hp: '081210111484',
            user_role_id: 3,
            username: 'amirza_nata_kusuma',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02'
        },
        {
            id: 27,
            nip: '198311142011011007',
            nama_lengkap: 'SUSILO NOVIANTO DAMARJATI',
            eselon: 'DIREKTORAT JENDERAL PERKEBUNAN',
            unit_kerja: 'SEKRETARIAT DIREKTORAT JENDERAL PERKEBUNAN',
            email: 'susilonovianto@pertanian.go.id',
            hp: '082221941945',
            user_role_id: 5,
            username: 'susilo_novianto_damarjati',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02'
        },
        {
            id: 28,
            nip: '199312312022032001',
            nama_lengkap: 'DEVI PUTRI DEWANTI',
            eselon: 'DIREKTORAT JENDERAL PERKEBUNAN',
            unit_kerja: 'SEKRETARIAT DIREKTORAT JENDERAL PERKEBUNAN',
            email: 'devi.putri@pertanian.go.id',
            hp: '082216633989',
            user_role_id: 5,
            username: 'devi_putri_dewanti',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02'
        },
        {
            id: 29,
            nip: '198007282007012002',
            nama_lengkap: 'NURLIANIE',
            eselon: 'BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA PERTANIAN',
            unit_kerja: 'SEKRETARIAT BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA PERTANIAN',
            email: 'nurlianie@pertanian.go.id',
            hp: '085283834455',
            user_role_id: 5,
            username: 'nurlianie',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02'
        },
        {
            id: 30,
            nip: '198902222022032001',
            nama_lengkap: 'RETNO FEPRININGRUM',
            eselon: 'BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA PERTANIAN',
            unit_kerja: 'SEKRETARIAT BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA PERTANIAN',
            email: 'retno.fepriningrum@pertanian.go.id',
            hp: '085713020104',
            user_role_id: 5,
            username: 'retno_fepriningrum',
            created_at: '2025-11-11 06:40:02',
            updated_at: '2025-11-11 06:40:02'
        },
    ]);

    // Fungsi untuk memfilter data berdasarkan pencarian
    const filteredData = userData.filter(user => 
        user.nama_lengkap.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase()) ||
        user.nip.toLowerCase().includes(searchText.toLowerCase()) ||
        user.unit_kerja.toLowerCase().includes(searchText.toLowerCase())
    ).filter(user => 
        selectedRole ? user.user_role_id === selectedRole : true
    ).filter(user =>
        selectedEselon ? user.eselon === selectedEselon : true
    );

    const columns: TableColumnsType<UserData> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            width: 80,
        },
        {
            title: 'NIP',
            dataIndex: 'nip',
            key: 'nip',
            sorter: (a, b) => a.nip.localeCompare(b.nip),
            width: 120,
        },
        {
            title: 'Nama',
            dataIndex: 'nama_lengkap',
            key: 'nama_lengkap',
            sorter: (a, b) => a.nama_lengkap.localeCompare(b.nama_lengkap),
            width: 200,
        },
        {
            title: 'Eselon',
            dataIndex: 'eselon',
            key: 'eselon',
            render: (eselon) => eselon || '-',
            sorter: (a, b) => a.eselon.localeCompare(b.eselon),
            width: 200,
        },
        {
            title: 'Unit',
            dataIndex: 'unit_kerja',
            key: 'unit_kerja',
            sorter: (a, b) => a.unit_kerja.localeCompare(b.unit_kerja),
            width: 250,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
            width: 200,
        },
        {
            title: 'HP',
            dataIndex: 'hp',
            key: 'hp',
            width: 120,
        },
        {
            title: 'Role',
            dataIndex: 'user_role_id',
            key: 'user_role_id',
            render: (roleId) => {
                const role = roles.find(r => r.id === roleId);
                return role ? role.role : 'Tdk Diketahui';
            },
            filters: roles.map(role => ({ text: role.role, value: role.id })),
            onFilter: (value, record) => record.user_role_id === value,
            width: 150,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            sorter: (a, b) => a.username.localeCompare(b.username),
            width: 150,
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
            width: 100,
        },
    ];

    const { Search } = Input;
    const { Option } = Select;

    // Fungsi untuk menambah atau mengupdate user
    const handleAddUser = (values: any) => {
        if (isEditing && currentRecord) {
            // Update user yang sudah ada
            setUserData(prev => prev.map(user => 
                user.id === currentRecord.id 
                    ? { 
                        ...user,
                        nip: values.nip,
                        nama_lengkap: values.nama_lengkap,
                        eselon: values.eselon,
                        unit_kerja: values.unit_kerja,
                        email: values.email,
                        hp: values.hp,
                        user_role_id: values.user_role_id,
                        username: values.nama_lengkap.toLowerCase().replace(/\s+/g, '_'),
                        updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
                      }
                    : user
            ));
            
            // Reset mode edit
            setIsEditing(false);
            setCurrentRecord(null);
        } else {
            // Generate ID baru berdasarkan ID terbesar + 1
            const newId = Math.max(...userData.map(u => u.id), 0) + 1;
            
            // Generate username dari nama lengkap
            const username = values.nama_lengkap.toLowerCase().replace(/\s+/g, '_');
            
            const newUser: UserData = {
                id: newId,
                nip: values.nip,
                nama_lengkap: values.nama_lengkap,
                eselon: values.eselon,
                unit_kerja: values.unit_kerja,
                email: values.email,
                hp: values.hp,
                user_role_id: values.user_role_id,
                username: username,
                created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
                updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
            };

            // Tambahkan user baru ke state
            setUserData(prev => [...prev, newUser]);
        }

        // Reset form dan tutup modal
        form.resetFields();
        setIsModalVisible(false);
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
        if (deleteRecordId !== null) {
            setUserData(prev => prev.filter(user => user.id !== deleteRecordId));
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
    const [currentRecord, setCurrentRecord] = useState<UserData | null>(null);

    // Fungsi untuk menangani edit user
    const handleEdit = (record: UserData) => {
        // Isi form dengan data user
        form.setFieldsValue({
            nip: record.nip,
            nama_lengkap: record.nama_lengkap,
            eselon: record.eselon,
            unit_kerja: record.unit_kerja,
            email: record.email,
            hp: record.hp,
            user_role_id: record.user_role_id,
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
                            <Option value="SEKRETARIAT JENDERAL">SEKRETARIAT JENDERAL</Option>
                            <Option value="DIREKTORAT JENDERAL PERKEBUNAN">DIREKTORAT JENDERAL PERKEBUNAN</Option>
                            <Option value="BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA PERTANIAN">BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA PERTANIAN</Option>
                            <Option value="DIREKTORAT JENDERAL PRASARANA DAN SARANA PERTANIAN">DIREKTORAT JENDERAL PRASARANA DAN SARANA PERTANIAN</Option>
                            <Option value="DIREKTORAT JENDERAL PETERNAKAN DAN KESEHATAN HEWAN">DIREKTORAT JENDERAL PETERNAKAN DAN KESEHATAN HEWAN</Option>
                            <Option value="BADAN PENELITIAN DAN PENGEMBANGAN PERTANIAN">BADAN PENELITIAN DAN PENGEMBANGAN PERTANIAN</Option>
                            <Option value="DIREKTORAT JENDERAL HORTIKULTURA">DIREKTORAT JENDERAL HORTIKULTURA</Option>
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
                                <Option value="SEKRETARIAT JENDERAL">SEKRETARIAT JENDERAL</Option>
                                <Option value="DIREKTORAT JENDERAL PERKEBUNAN">DIREKTORAT JENDERAL PERKEBUNAN</Option>
                                <Option value="BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA PERTANIAN">BADAN PENYULUHAN DAN PENGEMBANGAN SUMBER DAYA MANUSIA PERTANIAN</Option>
                                <Option value="DIREKTORAT JENDERAL PRASARANA DAN SARANA PERTANIAN">DIREKTORAT JENDERAL PRASARANA DAN SARANA PERTANIAN</Option>
                                <Option value="DIREKTORAT JENDERAL PETERNAKAN DAN KESEHATAN HEWAN">DIREKTORAT JENDERAL PETERNAKAN DAN KESEHATAN HEWAN</Option>
                                <Option value="BADAN PENELITIAN DAN PENGEMBANGAN PERTANIAN">BADAN PENELITIAN DAN PENGEMBANGAN PERTANIAN</Option>
                                <Option value="DIREKTORAT JENDERAL HORTIKULTURA">DIREKTORAT JENDERAL HORTIKULTURA</Option>
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