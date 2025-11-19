import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, Table, Button, Space, Input, Modal, Form } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Berita',
        href: '#',
    },
];

interface NewsType {
    id: number;
    judul: string;
    konten: string;
    tanggal_publikasi: string;
    status: string;
    kategori: string;
    penulis: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    berita: NewsType[];
}

export default function BeritaPage({ berita }: Props) {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<NewsType | null>(null);

    // Use data from props instead of hardcoded values
    const [newsData, setNewsData] = useState<NewsType[]>(berita || []);

    // Filter data based on search
    const filteredData = newsData.filter(news =>
        news.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        news.konten.toLowerCase().includes(searchText.toLowerCase()) ||
        news.penulis.toLowerCase().includes(searchText.toLowerCase()) ||
        news.status.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: TableColumnsType<NewsType> = [
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
            title: 'Konten',
            dataIndex: 'konten',
            key: 'konten',
            render: (konten: string) => (
                <div style={{ maxWidth: '200px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                    {konten.length > 50 ? `${konten.substring(0, 50)}...` : konten}
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
            title: 'Penulis',
            dataIndex: 'penulis',
            key: 'penulis',
            sorter: (a, b) => a.penulis.localeCompare(b.penulis),
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

    // Function to add or update news
    const handleAddNews = (values: any) => {
        if (isEditing && currentRecord) {
            // Update existing news
            setNewsData(prevData => 
                prevData.map(item => 
                    item.id === currentRecord.id 
                        ? { ...item, ...values, updated_at: new Date().toISOString() } 
                        : item
                )
            );
            toast.success('Berita berhasil diperbarui.');
        } else {
            // Add new news
            const newId = Math.max(...newsData.map(item => item.id), 0) + 1;
            const newNews = {
                id: newId,
                ...values,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            setNewsData(prevData => [...prevData, newNews]);
            toast.success('Berita baru berhasil ditambahkan.');
        }
        
        setIsModalVisible(false);
        setIsEditing(false);
        setCurrentRecord(null);
        form.resetFields();
    };

    // Function to handle news deletion
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (deleteRecordId) {
            setNewsData(prevData => prevData.filter(item => item.id !== deleteRecordId));
            toast.success('Berita berhasil dihapus.');
        }
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to handle editing news
    const handleEdit = (record: NewsType) => {
        form.setFieldsValue({
            judul: record.judul,
            konten: record.konten,
            tanggal_publikasi: record.tanggal_publikasi,
            status: record.status,
            kategori: record.kategori,
            penulis: record.penulis,
        });

        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Berita" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Berita</h1>
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
                        Tambah Berita Baru
                    </Button>
                </div>
                <p>Daftar semua berita yang dikelola dalam sistem.</p>

                <Card className="mt-4">
                    <div className="mb-4">
                        <Search
                            placeholder="Cari berita (judul, konten, penulis, kategori)..."
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} berita`
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Berita" : "Tambah Berita Baru"}
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
                        onFinish={handleAddNews}
                        initialValues={{
                            judul: '',
                            konten: '',
                            tanggal_publikasi: new Date().toISOString().split('T')[0],
                            status: 'aktif',
                            kategori: '',
                            penulis: ''
                        }}
                    >
                        <Form.Item 
                            label="Judul" 
                            name="judul" 
                            rules={[{ required: true, message: 'Judul wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan judul berita" />
                        </Form.Item>
                        <Form.Item 
                            label="Konten" 
                            name="konten" 
                            rules={[{ required: true, message: 'Konten wajib diisi' }]}
                        >
                            <Input.TextArea 
                                rows={4} 
                                placeholder="Masukkan konten berita" 
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
                            <Input placeholder="Masukkan kategori berita" />
                        </Form.Item>
                        <Form.Item 
                            label="Penulis" 
                            name="penulis"
                            rules={[{ required: true, message: 'Penulis wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan nama penulis" />
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
                    <p>Apakah Anda yakin ingin menghapus berita ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
}