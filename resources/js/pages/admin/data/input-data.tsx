import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form, Checkbox } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminDataInputStore, adminDataInputUpdate, adminDataInputDestroy } from '@/routes';
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
        title: 'Input Data',
        href: '#'
    },
];

interface DataItem {
    id: number;
    judul: string;
    tgl_rilis: string;
    abstraksi: string;
    produsen_data: string;
    tagging_data: string;
    data_prioritas: boolean;
    kategori_data: string;
    progres: number;
    status: string;
    catatan: string;
    file: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    dataItems: DataItem[];
}

const InputDataPage = ({ dataItems }: Props) => {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataItem | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [selectedKategori, setSelectedKategori] = useState<string | null>(null);
    const [form] = Form.useForm();

    // Initialize data from props
    const [dataItemsState, setDataItemsState] = useState<DataItem[]>(dataItems || []);

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
    const filteredData = dataItemsState.filter(item =>
        item.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        item.produsen_data.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori_data.toLowerCase().includes(searchText.toLowerCase()) ||
        item.catatan.toLowerCase().includes(searchText.toLowerCase()) ||
        item.file.toLowerCase().includes(searchText.toLowerCase())
    ).filter(item =>
        selectedStatus ? item.status === selectedStatus : true
    ).filter(item =>
        selectedKategori ? item.kategori_data === selectedKategori : true
    );

    const columns: TableColumnsType<DataItem> = [
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
            title: 'Tanggal Rilis',
            dataIndex: 'tgl_rilis',
            key: 'tgl_rilis',
            sorter: (a, b) => a.tgl_rilis.localeCompare(b.tgl_rilis),
            width: 120,
        },
        {
            title: 'Abstraksi',
            dataIndex: 'abstraksi',
            key: 'abstraksi',
            width: 250,
        },
        {
            title: 'Produsen Data',
            dataIndex: 'produsen_data',
            key: 'produsen_data',
            sorter: (a, b) => a.produsen_data.localeCompare(b.produsen_data),
            width: 150,
        },
        {
            title: 'Kategori',
            dataIndex: 'kategori_data',
            key: 'kategori_data',
            sorter: (a, b) => a.kategori_data.localeCompare(b.kategori_data),
            width: 120,
        },
        {
            title: 'Data Prioritas',
            dataIndex: 'data_prioritas',
            key: 'data_prioritas',
            render: (prioritas) => (
                <Tag color={prioritas ? 'red' : 'default'}>
                    {prioritas ? 'Prioritas' : 'Biasa'}
                </Tag>
            ),
            width: 100,
        },
        {
            title: 'Progres',
            dataIndex: 'progres',
            key: 'progres',
            sorter: (a, b) => a.progres - b.progres,
            render: (progres) => (
                <div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${progres}%` }}
                        ></div>
                    </div>
                    <span className="text-xs">{progres}%</span>
                </div>
            ),
            width: 100,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => {
                let color = 'default';
                if (record.status === 'published') color = 'green';
                if (record.status === 'review') color = 'orange';
                if (record.status === 'rejected') color = 'red';
                if (record.status === 'draft') color = 'blue';
                
                return <Tag color={color}>{record.status.charAt(0).toUpperCase() + record.status.slice(1)}</Tag>;
            },
            width: 100,
        },
        {
            title: 'File',
            dataIndex: 'file',
            key: 'file',
            render: (fileName) => <span>{fileName}</span>,
            width: 120,
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
            router.put(adminDataInputUpdate.url(currentRecord.id), {
                ...values,
                tagging_data: values.tagging_data || '' // Handle empty tagging_data
            });
        } else {
            // Add new data via API
            router.post(adminDataInputStore.url(), {
                ...values,
                tagging_data: values.tagging_data || '' // Handle empty tagging_data
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
            router.delete(adminDataInputDestroy.url(deleteRecordId));
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
    const handleEdit = (record: DataItem) => {
        form.setFieldsValue({
            judul: record.judul,
            tgl_rilis: record.tgl_rilis,
            abstraksi: record.abstraksi,
            produsen_data: record.produsen_data,
            tagging_data: record.tagging_data,
            data_prioritas: record.data_prioritas,
            kategori_data: record.kategori_data,
            progres: record.progres,
            status: record.status,
            catatan: record.catatan,
            file: record.file
        });

        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Data - Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Input Data</h1>
                    <Button
                        type="primary"
                        onClick={() => {
                            form.resetFields();
                            setIsEditing(false);
                            setCurrentRecord(null);
                            setIsModalVisible(true);
                        }}
                    >
                        Tambah Data Baru
                    </Button>
                </div>
                <p>Input dan kelola data statistik, geospasial, indikator, variabel, dan link terkait.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Search
                            placeholder="Cari data (judul, produsen, kategori, catatan, file)..."
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
                            <Option value="draft">Draft</Option>
                            <Option value="review">Review</Option>
                            <Option value="published">Published</Option>
                            <Option value="rejected">Rejected</Option>
                        </Select>
                        <Select
                            placeholder="Filter Kategori"
                            style={{ width: 150 }}
                            allowClear
                            onChange={(value) => setSelectedKategori(value || null)}
                        >
                            <Option value="Statistik">Statistik</Option>
                            <Option value="Geospasial">Geospasial</Option>
                            <Option value="Indikator">Indikator</Option>
                            <Option value="Variabel">Variabel</Option>
                            <Option value="Link">Link</Option>
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Data" : "Tambah Data Baru"}
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
                            <Input placeholder="Masukkan judul data" />
                        </Form.Item>
                        <Form.Item label="Tanggal Rilis" name="tgl_rilis" rules={[{ required: true, message: 'Tanggal rilis wajib diisi' }]}>
                            <Input placeholder="Masukkan tanggal rilis (YYYY-MM-DD)" />
                        </Form.Item>
                        <Form.Item label="Abstraksi" name="abstraksi" rules={[{ required: true, message: 'Abstraksi wajib diisi' }]}>
                            <Input.TextArea placeholder="Masukkan abstraksi data" rows={3} />
                        </Form.Item>
                        <Form.Item label="Produsen Data" name="produsen_data" rules={[{ required: true, message: 'Produsen data wajib diisi' }]}>
                            <Input placeholder="Masukkan nama produsen data" />
                        </Form.Item>
                        <Form.Item label="Tagging Data (pisahkan dengan koma)" name="tagging_data">
                            <Input placeholder="Misal: produksi, statistik, 2023" />
                        </Form.Item>
                        <Form.Item label="Data Prioritas" name="data_prioritas" valuePropName="checked">
                            <Checkbox>Data Prioritas</Checkbox>
                        </Form.Item>
                        <Form.Item label="Kategori Data" name="kategori_data" rules={[{ required: true, message: 'Kategori data wajib dipilih' }]}>
                            <Select placeholder="Pilih kategori data">
                                <Option value="Statistik">Statistik</Option>
                                <Option value="Geospasial">Geospasial</Option>
                                <Option value="Indikator">Indikator</Option>
                                <Option value="Variabel">Variabel</Option>
                                <Option value="Link">Link</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Progres (%)" name="progres" rules={[{ required: true, message: 'Progres wajib diisi' }]}>
                            <Select placeholder="Pilih progres">
                                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(num => (
                                    <Option key={num} value={num}>{num}%</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Status wajib dipilih' }]}>
                            <Select placeholder="Pilih status">
                                <Option value="draft">Draft</Option>
                                <Option value="review">Review</Option>
                                <Option value="published">Published</Option>
                                <Option value="rejected">Rejected</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Catatan" name="catatan">
                            <Input.TextArea placeholder="Masukkan catatan tambahan" />
                        </Form.Item>
                        <Form.Item label="File" name="file" rules={[{ required: true, message: 'Nama file wajib diisi' }]}>
                            <Input placeholder="Masukkan nama file" />
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
                    <p>Apakah Anda yakin ingin menghapus data ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default InputDataPage;