import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form, Result } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminDataInputLinkStore, adminDataInputLinkUpdate, adminDataInputLinkDestroy, dashboard } from '@/routes';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Data',
        href: '/admin/data',
    },
    {
        title: 'Input Link Website',
        href: '#'
    },
];

interface LinkWebsiteItem {
    id: number;
    judul: string;
    url: string;
    deskripsi: string;
    kategori: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    linkWebsites: LinkWebsiteItem[];
}

const InputLinkWebsitePage = ({ linkWebsites }: Props) => {
    const { auth, flash, ziggy } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<LinkWebsiteItem | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedKategori, setSelectedKategori] = useState<string | null>(null);
    const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(true); // Show maintenance modal by default
    const [form] = Form.useForm();

    // Initialize data from props
    const [linkWebsitesState, setLinkWebsitesState] = useState<LinkWebsiteItem[]>(linkWebsites || []);

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Filter data based on search and filters
    const filteredData = linkWebsitesState.filter(item =>
        item.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        item.url.toLowerCase().includes(searchText.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchText.toLowerCase())
    ).filter(item =>
        selectedStatus ? item.status === selectedStatus : true
    ).filter(item =>
        selectedKategori ? item.kategori === selectedKategori : true
    );

    const columns: TableColumnsType<LinkWebsiteItem> = [
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
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            render: (url) => (
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>
                    {url}
                </a>
            ),
            width: 250,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'deskripsi',
            key: 'deskripsi',
            width: 200,
        },
        {
            title: 'Kategori',
            dataIndex: 'kategori',
            key: 'kategori',
            sorter: (a, b) => a.kategori.localeCompare(b.kategori),
            width: 120,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                let color = 'default';
                if (record.status === 'aktif') color = 'green';
                if (record.status === 'non-aktif') color = 'red';
                
                return <Tag color={color}>{record.status === 'aktif' ? 'Aktif' : 'Non-Aktif'}</Tag>;
            },
            width: 100,
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

    // Function to handle adding or updating data
    const handleAddData = (values: any) => {
        if (isEditing && currentRecord) {
            // Update existing data via API
            router.put(adminDataInputLinkUpdate.url(currentRecord.id), {
                ...values
            });
        } else {
            // Add new data via API
            router.post(adminDataInputLinkStore.url(), {
                ...values
            });
        }
    };

    // Function to handle data deletion
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (deleteRecordId) {
            router.delete(adminDataInputLinkDestroy.url(deleteRecordId));
        }
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to handle editing data
    const handleEdit = (record: LinkWebsiteItem) => {
        form.setFieldsValue({
            judul: record.judul,
            url: record.url,
            deskripsi: record.deskripsi,
            kategori: record.kategori,
            status: record.status
        });

        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Link Website - Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Input Link Website</h1>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.resetFields();
                            setIsEditing(false);
                            setCurrentRecord(null);
                            setIsModalVisible(true);
                        }}
                    >
                        Tambah Link Website Baru
                    </Button>
                </div>
                <p>Input link-link website terkait data.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Search
                            placeholder="Cari link website (judul, url, deskripsi, kategori)..."
                            onSearch={value => setSearchText(value)}
                            style={{ width: 300 }}
                            enterButton
                        />
                        <Select
                            placeholder="Filter Status"
                            style={{ width: 150 }}
                            allowClear
                            onChange={(value) => setSelectedStatus(value || null)}
                        >
                            <Option value="aktif">Aktif</Option>
                            <Option value="non-aktif">Non-Aktif</Option>
                        </Select>
                        <Select
                            placeholder="Filter Kategori"
                            style={{ width: 150 }}
                            allowClear
                            onChange={(value) => setSelectedKategori(value || null)}
                        >
                            <Option value="Statistik">Statistik</Option>
                            <Option value="Geospasial">Geospasial</Option>
                            <Option value="Monitoring">Monitoring</Option>
                            <Option value="Data">Data</Option>
                            <Option value="Berita">Berita</Option>
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} link website`
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Link Website" : "Tambah Link Website Baru"}
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
                        onFinish={handleAddData}
                    >
                        <Form.Item label="Judul" name="judul" rules={[{ required: true, message: 'Judul wajib diisi' }]}>
                            <Input placeholder="Masukkan judul link website" />
                        </Form.Item>
                        <Form.Item 
                            label="URL" 
                            name="url" 
                            rules={[
                                { required: true, message: 'URL wajib diisi' },
                                { type: 'url', message: 'Format URL tidak valid' }
                            ]}
                        >
                            <Input placeholder="Masukkan URL lengkap (contoh: https://example.com)" />
                        </Form.Item>
                        <Form.Item label="Deskripsi" name="deskripsi" rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}>
                            <Input.TextArea placeholder="Masukkan deskripsi link website" rows={3} />
                        </Form.Item>
                        <Form.Item label="Kategori" name="kategori" rules={[{ required: true, message: 'Kategori wajib dipilih' }]}>
                            <Input placeholder="Masukkan kategori link website" />
                        </Form.Item>
                        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Status wajib dipilih' }]}>
                            <Select placeholder="Pilih status">
                                <Option value="aktif">Aktif</Option>
                                <Option value="non-aktif">Non-Aktif</Option>
                            </Select>
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
                    <p>Apakah Anda yakin ingin menghapus link website ini?</p>
                </Modal>

                {/* Maintenance Overlay Modal */}
                <Modal
                    open={maintenanceModalVisible}
                    footer={null}
                    closable={false}
                    centered
                    width={600}
                >
                    <Result
                        status="warning"
                        title="Fitur Sedang Dalam Pengembangan"
                        subTitle="Halaman Input Link Website saat ini sedang dalam pengembangan. Mohon maaf atas ketidaknyamanannya."
                        extra={[
                            <Link as={'button'} href={dashboard.url()}>
                                <Button
                                    type="primary"
                                    key="dashboard"
                                >
                                    Kembali ke Dashboard
                                </Button>
                            </Link>
                        ]}
                    />
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default InputLinkWebsitePage;