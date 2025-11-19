import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form, Checkbox } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { adminDataInputStore, adminDataInputUpdate, adminDataInputDestroy } from '@/routes';

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
    produsen_data_table_id: number;
    data_prioritas: boolean;
    is_data_prioritas: boolean;
    kategori_data: string;
    kategori_data_table_id: number;
    link_meta: string;
    file_meta1: string;
    file_meta2: string;
    file_meta3: string;
    ukuran_file: number;
    file_statistik: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    dataItems: DataItem[];
    produsenData?: Array<{id: number, value: string}>;
    kategoriData?: Array<{id: number, value: string}>;
    users?: Array<{id: number, nama_lengkap: string}>;
}

const InputDataPage = ({ dataItems, produsenData = [], kategoriData = [], users = [] }: Props) => {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataItem | null>(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [searchText, setSearchText] = useState('');
    const [selectedKategori, setSelectedKategori] = useState<string | null>(null);
    const [selectedPrioritas, setSelectedPrioritas] = useState<boolean | null>(null);
    const [form] = Form.useForm();

    // Initialize data from props
    const [dataItemsState, setDataItemsState] = useState<DataItem[]>(dataItems || []);

    // Filter data based on search and filters
    const filteredData = dataItemsState.filter(item =>
        item.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        item.produsen_data.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori_data.toLowerCase().includes(searchText.toLowerCase()) ||
        item.file_statistik.toLowerCase().includes(searchText.toLowerCase())
    ).filter(item =>
        selectedKategori ? item.kategori_data === selectedKategori : true
    ).filter(item => {
        if (selectedPrioritas === null || selectedPrioritas === undefined) {
            return true; // No filter applied
        }
        return item.data_prioritas === selectedPrioritas;
    });

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
            title: 'Kategori Data',
            dataIndex: 'kategori_data',
            key: 'kategori_data',
            sorter: (a, b) => a.kategori_data.localeCompare(b.kategori_data),
            width: 120,
        },
        {
            title: 'Tagging Data Prioritas',
            dataIndex: 'data_prioritas',
            key: 'data_prioritas',
            render: (prioritas) => (
                <Tag color={prioritas ? 'red' : 'default'}>
                    {prioritas ? 'Prioritas' : 'Non Prioritas'}
                </Tag>
            ),
            width: 100,
        },
        {
            title: 'File',
            dataIndex: 'file_statistik',
            key: 'file_statistik',
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
        // Convert produsen_data_table_id and kategori_data_table_id back to the appropriate format if necessary
        const processedValues = {
            ...values,
            // The form already uses IDs, so we just pass them through
        };

        if (isEditing && currentRecord) {
            // Update existing data via API
            router.put(adminDataInputUpdate.url(currentRecord.id), processedValues);
        } else {
            // Add new data via API
            router.post(adminDataInputStore.url(), processedValues);
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
            tanggal_rilis: record.tgl_rilis,
            abstraksi: record.abstraksi,
            produsen_data_table_id: record.produsen_data_table_id,
            is_data_prioritas: record.is_data_prioritas,
            kategori_data_table_id: record.kategori_data_table_id,
            link_meta: record.link_meta,
            file_meta1: record.file_meta1,
            file_meta2: record.file_meta2,
            file_meta3: record.file_meta3,
            ukuran_file: record.ukuran_file,
            file_statistik: record.file_statistik
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
                            placeholder="Cari data (judul, produsen, kategori, file)..."
                            onSearch={value => setSearchText(value)}
                            style={{ width: 300 }}
                            enterButton
                        />
                        <Select
                            placeholder="Filter Kategori"
                            style={{ width: 150 }}
                            allowClear
                            onChange={(value) => setSelectedKategori(value || null)}
                        >
                            {kategoriData.map((kategori) => (
                                <Option key={kategori.id} value={kategori.value}>{kategori.value}</Option>
                            ))}
                        </Select>
                        <Select
                            placeholder="Filter Prioritas"
                            style={{ width: 150 }}
                            allowClear
                            onChange={(value) => setSelectedPrioritas(value === undefined ? null : value)}
                        >
                            <Option value={true}>Prioritas</Option>
                            <Option value={false}>Non Prioritas</Option>
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
                        <Form.Item label="Tanggal Rilis" name="tanggal_rilis" rules={[{ required: true, message: 'Tanggal rilis wajib diisi' }]}>
                            <Input type="date" placeholder="Masukkan tanggal rilis (YYYY-MM-DD)" />
                        </Form.Item>
                        <Form.Item label="Abstraksi" name="abstraksi" rules={[{ required: true, message: 'Abstraksi wajib diisi' }]}>
                            <Input.TextArea placeholder="Masukkan abstraksi data" rows={3} />
                        </Form.Item>
                        <Form.Item label="Produsen Data" name="produsen_data_table_id" rules={[{ required: true, message: 'Produsen data wajib diisi' }]}>
                            <Select placeholder="Pilih produsen data">
                                {produsenData.map((produsen) => (
                                    <Option key={produsen.id} value={produsen.id}>{produsen.value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Tagging Data Prioritas" name="is_data_prioritas" valuePropName="checked">
                            <Select placeholder="Pilih status prioritas">
                                <Option value={true}>Prioritas</Option>
                                <Option value={false}>Non Prioritas</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Kategori Data" name="kategori_data_table_id" rules={[{ required: true, message: 'Kategori data wajib dipilih' }]}>
                            <Select placeholder="Pilih kategori data">
                                {kategoriData.map((kategori) => (
                                    <Option key={kategori.id} value={kategori.id}>{kategori.value}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Link Meta" name="link_meta">
                            <Input placeholder="Masukkan link metadata" />
                        </Form.Item>
                        <Form.Item label="File Meta 1" name="file_meta1">
                            <Input placeholder="Masukkan nama file meta 1" />
                        </Form.Item>
                        <Form.Item label="File Meta 2" name="file_meta2">
                            <Input placeholder="Masukkan nama file meta 2" />
                        </Form.Item>
                        <Form.Item label="File Meta 3" name="file_meta3">
                            <Input placeholder="Masukkan nama file meta 3" />
                        </Form.Item>
                        <Form.Item label="Ukuran File" name="ukuran_file" rules={[{ required: true, message: 'Ukuran file wajib diisi' }]}>
                            <Input type="number" placeholder="Masukkan ukuran file dalam bytes" />
                        </Form.Item>
                        <Form.Item label="File" name="file_statistik">
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