import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, Table, Button, Space, Input, Modal, Form } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined, FileTextOutlined } from '@ant-design/icons';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Publikasi',
        href: '#',
    },
];

interface PublikasiType {
    id: number;
    judul: string;
    deskripsi: string;
    tanggal_publikasi: string;
    status: string;
    kategori: string;
    url_file: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    publikasi: PublikasiType[];
}

export default function PublikasiPage({ publikasi }: Props) {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<PublikasiType | null>(null);

    // Use data from props instead of hardcoded values
    const [publikasiData, setPublikasiData] = useState<PublikasiType[]>(publikasi || []);

    // Filter data based on search
    const filteredData = publikasiData.filter(item =>
        item.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: TableColumnsType<PublikasiType> = [
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
            title: 'URL File',
            dataIndex: 'url_file',
            key: 'url_file',
            render: (url: string) => (
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>
                    Download File
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

    // Function to add or update publikasi
    const handleAddPublikasi = (values: any) => {
        if (isEditing && currentRecord) {
            // Update existing publikasi
            setPublikasiData(prevData => 
                prevData.map(item => 
                    item.id === currentRecord.id 
                        ? { ...item, ...values, updated_at: new Date().toISOString() } 
                        : item
                )
            );
            toast.success('Publikasi berhasil diperbarui.');
        } else {
            // Add new publikasi
            const newId = Math.max(...publikasiData.map(item => item.id), 0) + 1;
            const newPublikasi = {
                id: newId,
                ...values,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            setPublikasiData(prevData => [...prevData, newPublikasi]);
            toast.success('Publikasi baru berhasil ditambahkan.');
        }
        
        setIsModalVisible(false);
        setIsEditing(false);
        setCurrentRecord(null);
        form.resetFields();
    };

    // Function to handle publikasi deletion
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (deleteRecordId) {
            setPublikasiData(prevData => prevData.filter(item => item.id !== deleteRecordId));
            toast.success('Publikasi berhasil dihapus.');
        }
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to handle editing publikasi
    const handleEdit = (record: PublikasiType) => {
        form.setFieldsValue({
            judul: record.judul,
            deskripsi: record.deskripsi,
            tanggal_publikasi: record.tanggal_publikasi,
            status: record.status,
            kategori: record.kategori,
            url_file: record.url_file,
        });

        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Publikasi" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Publikasi</h1>
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
                        Tambah Publikasi Baru
                    </Button>
                </div>
                <p>Daftar semua publikasi yang dikelola dalam sistem.</p>

                <Card className="mt-4">
                    <div className="mb-4">
                        <Search
                            placeholder="Cari publikasi (judul, deskripsi, kategori)..."
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} publikasi`
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Publikasi" : "Tambah Publikasi Baru"}
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
                        onFinish={handleAddPublikasi}
                        initialValues={{
                            judul: '',
                            deskripsi: '',
                            tanggal_publikasi: new Date().toISOString().split('T')[0],
                            status: 'aktif',
                            kategori: '',
                            url_file: ''
                        }}
                    >
                        <Form.Item 
                            label="Judul" 
                            name="judul" 
                            rules={[{ required: true, message: 'Judul wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan judul publikasi" />
                        </Form.Item>
                        <Form.Item 
                            label="Deskripsi" 
                            name="deskripsi" 
                            rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}
                        >
                            <Input.TextArea 
                                rows={4} 
                                placeholder="Masukkan deskripsi publikasi" 
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
                            <Input placeholder="Masukkan kategori publikasi" />
                        </Form.Item>
                        <Form.Item 
                            label="URL File" 
                            name="url_file"
                            rules={[{ required: true, message: 'URL file wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan URL file publikasi" />
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
                    <p>Apakah Anda yakin ingin menghapus publikasi ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
}