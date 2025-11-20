import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form, Result } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminDataInputIndikatorStore, adminDataInputIndikatorUpdate, adminDataInputIndikatorDestroy, dashboard } from '@/routes';
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
        title: 'Input Data Indikator',
        href: '#'
    },
];

interface DataIndikatorItem {
    id: number;
    judul: string;
    deskripsi: string;
    rumus_perhitungan: string;
    kategori: string;
    tahun_penerapan: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    dataIndikators: DataIndikatorItem[];
}

const InputDataIndikatorPage = ({ dataIndikators }: Props) => {
    const { auth, flash, ziggy } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataIndikatorItem | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedKategori, setSelectedKategori] = useState<string | null>(null);
    const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(true); // Show maintenance modal by default
    const [form] = Form.useForm();

    // Initialize data from props
    const [dataIndikatorsState, setDataIndikatorsState] = useState<DataIndikatorItem[]>(dataIndikators || []);

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
    const filteredData = dataIndikatorsState.filter(item =>
        item.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
        item.rumus_perhitungan.toLowerCase().includes(searchText.toLowerCase())
    ).filter(item =>
        selectedStatus ? item.status === selectedStatus : true
    ).filter(item =>
        selectedKategori ? item.kategori === selectedKategori : true
    );

    const columns: TableColumnsType<DataIndikatorItem> = [
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
            width: 250,
        },
        {
            title: 'Rumus Perhitungan',
            dataIndex: 'rumus_perhitungan',
            key: 'rumus_perhitungan',
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
            title: 'Tahun Penerapan',
            dataIndex: 'tahun_penerapan',
            key: 'tahun_penerapan',
            sorter: (a, b) => a.tahun_penerapan - b.tahun_penerapan,
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
            router.put(adminDataInputIndikatorUpdate.url(currentRecord.id), {
                ...values
            });
        } else {
            // Add new data via API
            router.post(adminDataInputIndikatorStore.url(), {
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
            router.delete(adminDataInputIndikatorDestroy.url(deleteRecordId));
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
    const handleEdit = (record: DataIndikatorItem) => {
        form.setFieldsValue({
            judul: record.judul,
            deskripsi: record.deskripsi,
            rumus_perhitungan: record.rumus_perhitungan,
            kategori: record.kategori,
            tahun_penerapan: record.tahun_penerapan,
            status: record.status
        });

        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Data Indikator - Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Input Data Indikator</h1>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.resetFields();
                            setIsEditing(false);
                            setCurrentRecord(null);
                            setIsModalVisible(true);
                        }}
                    >
                        Tambah Data Indikator Baru
                    </Button>
                </div>
                <p>Input indikator-indikator untuk pengukuran.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Search
                            placeholder="Cari data indikator (judul, deskripsi, kategori, rumus)..."
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
                            <Option value="Sosial">Sosial</Option>
                            <Option value="Pelayanan Publik">Pelayanan Publik</Option>
                            <Option value="Ekonomi">Ekonomi</Option>
                            <Option value="Lingkungan">Lingkungan</Option>
                            <Option value="Pangan">Pangan</Option>
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data indikator`
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Data Indikator" : "Tambah Data Indikator Baru"}
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
                            <Input placeholder="Masukkan judul data indikator" />
                        </Form.Item>
                        <Form.Item label="Deskripsi" name="deskripsi" rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}>
                            <Input.TextArea placeholder="Masukkan deskripsi data indikator" rows={3} />
                        </Form.Item>
                        <Form.Item label="Rumus Perhitungan" name="rumus_perhitungan" rules={[{ required: true, message: 'Rumus perhitungan wajib diisi' }]}>
                            <Input.TextArea placeholder="Masukkan rumus perhitungan data indikator" rows={3} />
                        </Form.Item>
                        <Form.Item label="Kategori" name="kategori" rules={[{ required: true, message: 'Kategori wajib dipilih' }]}>
                            <Input placeholder="Masukkan kategori data indikator" />
                        </Form.Item>
                        <Form.Item label="Tahun Penerapan" name="tahun_penerapan" rules={[{ required: true, message: 'Tahun penerapan wajib diisi' }]}>
                            <Input type="number" placeholder="Masukkan tahun penerapan" min={1900} max={2100} />
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
                    <p>Apakah Anda yakin ingin menghapus data indikator ini?</p>
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
                        subTitle="Halaman Input Data Indikator saat ini sedang dalam pengembangan. Mohon maaf atas ketidaknyamanannya."
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

export default InputDataIndikatorPage;