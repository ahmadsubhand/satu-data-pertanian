import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminDataInputVariabelStore, adminDataInputVariabelUpdate, adminDataInputVariabelDestroy } from '@/routes';
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
        title: 'Input Data Variabel',
        href: '#'
    },
];

interface DataVariabelItem {
    id: number;
    judul: string;
    deskripsi: string;
    satuan: string;
    tipe_data: string;
    kategori: string;
    tahun_data: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    dataVariabels: DataVariabelItem[];
}

const InputDataVariabelPage = ({ dataVariabels }: Props) => {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataVariabelItem | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedKategori, setSelectedKategori] = useState<string | null>(null);
    const [form] = Form.useForm();

    // Initialize data from props
    const [dataVariabelsState, setDataVariabelsState] = useState<DataVariabelItem[]>(dataVariabels || []);

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
    const filteredData = dataVariabelsState.filter(item =>
        item.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
        item.satuan.toLowerCase().includes(searchText.toLowerCase())
    ).filter(item =>
        selectedStatus ? item.status === selectedStatus : true
    ).filter(item =>
        selectedKategori ? item.kategori === selectedKategori : true
    );

    const columns: TableColumnsType<DataVariabelItem> = [
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
            title: 'Satuan',
            dataIndex: 'satuan',
            key: 'satuan',
            sorter: (a, b) => a.satuan.localeCompare(b.satuan),
            width: 120,
        },
        {
            title: 'Tipe Data',
            dataIndex: 'tipe_data',
            key: 'tipe_data',
            sorter: (a, b) => a.tipe_data.localeCompare(b.tipe_data),
            render: (tipe) => {
                let color = 'default';
                if (tipe === 'numeric') color = 'green';
                if (tipe === 'text') color = 'orange';
                if (tipe === 'boolean') color = 'purple';
                if (tipe === 'date') color = 'cyan';
                
                return <Tag color={color}>{tipe}</Tag>;
            },
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
            title: 'Tahun Data',
            dataIndex: 'tahun_data',
            key: 'tahun_data',
            sorter: (a, b) => a.tahun_data - b.tahun_data,
            width: 100,
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
            router.put(adminDataInputVariabelUpdate.url(currentRecord.id), {
                ...values
            });
        } else {
            // Add new data via API
            router.post(adminDataInputVariabelStore.url(), {
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
            router.delete(adminDataInputVariabelDestroy.url(deleteRecordId));
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
    const handleEdit = (record: DataVariabelItem) => {
        form.setFieldsValue({
            judul: record.judul,
            deskripsi: record.deskripsi,
            satuan: record.satuan,
            tipe_data: record.tipe_data,
            kategori: record.kategori,
            tahun_data: record.tahun_data,
            status: record.status
        });

        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Data Variabel - Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Input Data Variabel</h1>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.resetFields();
                            setIsEditing(false);
                            setCurrentRecord(null);
                            setIsModalVisible(true);
                        }}
                    >
                        Tambah Data Variabel Baru
                    </Button>
                </div>
                <p>Input variabel-variabel yang digunakan dalam data.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Search
                            placeholder="Cari data variabel (judul, deskripsi, kategori, satuan)..."
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
                            <Option value="Cuaca">Cuaca</Option>
                            <Option value="Pertanian">Pertanian</Option>
                            <Option value="Sosial">Sosial</Option>
                            <Option value="Lingkungan">Lingkungan</Option>
                            <Option value="Demografi">Demografi</Option>
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data variabel`
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Data Variabel" : "Tambah Data Variabel Baru"}
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
                            <Input placeholder="Masukkan judul data variabel" />
                        </Form.Item>
                        <Form.Item label="Deskripsi" name="deskripsi" rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}>
                            <Input.TextArea placeholder="Masukkan deskripsi data variabel" rows={3} />
                        </Form.Item>
                        <Form.Item label="Satuan" name="satuan" rules={[{ required: true, message: 'Satuan wajib diisi' }]}>
                            <Input placeholder="Masukkan satuan data variabel" />
                        </Form.Item>
                        <Form.Item label="Tipe Data" name="tipe_data" rules={[{ required: true, message: 'Tipe data wajib dipilih' }]}>
                            <Select placeholder="Pilih tipe data">
                                <Option value="numeric">Numeric</Option>
                                <Option value="text">Text</Option>
                                <Option value="boolean">Boolean</Option>
                                <Option value="date">Date</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Kategori" name="kategori" rules={[{ required: true, message: 'Kategori wajib dipilih' }]}>
                            <Input placeholder="Masukkan kategori data variabel" />
                        </Form.Item>
                        <Form.Item label="Tahun Data" name="tahun_data" rules={[{ required: true, message: 'Tahun data wajib diisi' }]}>
                            <Input type="number" placeholder="Masukkan tahun data" min={1900} max={2100} />
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
                    <p>Apakah Anda yakin ingin menghapus data variabel ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default InputDataVariabelPage;