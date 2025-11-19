import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, Table, Button, Space, Input, Modal, Form } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined, FileImageOutlined } from '@ant-design/icons';
import { toast } from 'sonner';

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

interface InfografisType {
    id: number;
    judul: string;
    deskripsi: string;
    tanggal_publikasi: string;
    status: string;
    kategori: string;
    url_gambar: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    infografis: InfografisType[];
}

export default function InfografisPage({ infografis }: Props) {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<InfografisType | null>(null);

    // Use data from props instead of hardcoded values
    const [infografisData, setInfografisData] = useState<InfografisType[]>(infografis || []);

    // Filter data based on search
    const filteredData = infografisData.filter(item =>
        item.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: TableColumnsType<InfografisType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            width: 80,
        },
        {
            title: 'Judul',
            dataIndex: 'judul',
            key: 'judul',
            sorter: (a, b) => a.judul.localeCompare(b.judul),
            width: 200,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'deskripsi',
            key: 'deskripsi',
            render: (deskripsi: string) => (
                <div style={{ maxWidth: '200px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {deskripsi.length > 50 ? `${deskripsi.substring(0, 50)}...` : deskripsi}
                </div>
            ),
            width: 250,
        },
        {
            title: 'Tanggal Publikasi',
            dataIndex: 'tanggal_publikasi',
            key: 'tanggal_publikasi',
            sorter: (a, b) => a.tanggal_publikasi.localeCompare(b.tanggal_publikasi),
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            width: 100,
        },
        {
            title: 'Kategori',
            dataIndex: 'kategori',
            key: 'kategori',
            sorter: (a, b) => a.kategori.localeCompare(b.kategori),
            width: 120,
        },
        {
            title: 'URL Gambar',
            dataIndex: 'url_gambar',
            key: 'url_gambar',
            render: (url: string) => (
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>
                    Tampilkan Gambar
                </a>
            ),
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

    // Function to add or update infografis
    const handleAddInfografis = (values: any) => {
        if (isEditing && currentRecord) {
            // Update existing infografis
            setInfografisData(prevData => 
                prevData.map(item => 
                    item.id === currentRecord.id 
                        ? { ...item, ...values, updated_at: new Date().toISOString() } 
                        : item
                )
            );
            toast.success('Infografis berhasil diperbarui.');
        } else {
            // Add new infografis
            const newId = Math.max(...infografisData.map(item => item.id), 0) + 1;
            const newInfografis = {
                id: newId,
                ...values,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            setInfografisData(prevData => [...prevData, newInfografis]);
            toast.success('Infografis baru berhasil ditambahkan.');
        }
        
        setIsModalVisible(false);
        setIsEditing(false);
        setCurrentRecord(null);
        form.resetFields();
    };

    // Function to handle infografis deletion
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (deleteRecordId) {
            setInfografisData(prevData => prevData.filter(item => item.id !== deleteRecordId));
            toast.success('Infografis berhasil dihapus.');
        }
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to handle editing infografis
    const handleEdit = (record: InfografisType) => {
        form.setFieldsValue({
            judul: record.judul,
            deskripsi: record.deskripsi,
            tanggal_publikasi: record.tanggal_publikasi,
            status: record.status,
            kategori: record.kategori,
            url_gambar: record.url_gambar,
        });

        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Infografis" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Infografis</h1>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            form.resetFields();
                            setIsEditing(false);
                            setCurrentRecord(null);
                            setIsModalVisible(true);
                        }}
                    >
                        Tambah Infografis Baru
                    </Button>
                </div>
                <p>Daftar semua infografis yang dikelola dalam sistem.</p>

                <Card className="mt-4">
                    <div className="mb-4">
                        <Search
                            placeholder="Cari infografis (judul, deskripsi, kategori)..."
                            onSearch={value => setSearchText(value)}
                            style={{ width: 400 }}
                            enterButton
                        />
                    </div>

                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} infografis`
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Infografis" : "Tambah Infografis Baru"}
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
                        onFinish={handleAddInfografis}
                        initialValues={{
                            judul: '',
                            deskripsi: '',
                            tanggal_publikasi: new Date().toISOString().split('T')[0],
                            status: 'aktif',
                            kategori: '',
                            url_gambar: ''
                        }}
                    >
                        <Form.Item 
                            label="Judul" 
                            name="judul" 
                            rules={[{ required: true, message: 'Judul wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan judul infografis" />
                        </Form.Item>
                        <Form.Item 
                            label="Deskripsi" 
                            name="deskripsi" 
                            rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}
                        >
                            <Input.TextArea 
                                rows={4} 
                                placeholder="Masukkan deskripsi infografis" 
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Tanggal Publikasi" 
                            name="tanggal_publikasi"
                            rules={[{ required: true, message: 'Tanggal publikasi wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan tanggal publikasi (YYYY-MM-DD)" />
                        </Form.Item>
                        <Form.Item 
                            label="Status" 
                            name="status"
                            rules={[{ required: true, message: 'Status wajib dipilih' }]}
                        >
                            <Input placeholder="Masukkan status (aktif/inaktif)" />
                        </Form.Item>
                        <Form.Item 
                            label="Kategori" 
                            name="kategori"
                            rules={[{ required: true, message: 'Kategori wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan kategori infografis" />
                        </Form.Item>
                        <Form.Item 
                            label="URL Gambar" 
                            name="url_gambar"
                            rules={[{ required: true, message: 'URL gambar wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan URL gambar infografis" />
                        </Form.Item>
                    </Form>
                </Modal>

                {/* Modal for deletion confirmation */}
                <Modal
                    title="Konfirmasi Hapus"
                    open={deleteModalVisible}
                    onOk={confirmDelete}
                    onCancel={cancelDelete}
                    okText="Hapus"
                    cancelText="Batal"
                    okType="danger"
                >
                    <p>Apakah Anda yakin ingin menghapus infografis ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
}