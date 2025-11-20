import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { adminBeritaStore, adminBeritaUpdate, adminBeritaDestroy, dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: dashboard.url(),
    },
    {
        title: 'Berita',
        href: '#',
    },
];

interface NewsType {
    id: number;
    judul: string;
    tanggal_rilis: string;
    isi_singkat: string | null;
    isi: string;
    file: string;
    foto: string;
    status: boolean;
    produsen_data_table_id: number;
    produsen_data?: string; // Nama produsen
    created_at: string;
    updated_at: string;
}

interface Props {
    berita: NewsType[];
    produsenData?: Array<{id: number, value: string}>;
}

export default function BeritaPage({ berita, produsenData = [] }: Props) {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<boolean | null>(null);
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<NewsType | null>(null);

    // Filter data based on search and status
    const filteredData = berita.filter(news =>
        news.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        news.produsen_data?.toLowerCase().includes(searchText.toLowerCase()) ||
        news.foto.toLowerCase().includes(searchText.toLowerCase())
    ).filter(news =>
        selectedStatus !== null && selectedStatus !== undefined
            ? (selectedStatus ?
                (news.status === 1 || news.status === '1' || news.status === true) :
                !(news.status === 1 || news.status === '1' || news.status === true)
              )
            : true
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
            title: 'Tanggal Berita',
            dataIndex: 'tanggal_rilis',
            key: 'tanggal_rilis',
            sorter: (a, b) => a.tanggal_rilis.localeCompare(b.tanggal_rilis),
            width: 120,
        },
        {
            title: 'Owner',
            dataIndex: 'produsen_data',
            key: 'produsen_data',
            sorter: (a, b) => (a.produsen_data || '').localeCompare(b.produsen_data || ''),
            width: 150,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status ? 'green' : 'orange'}>
                    {(status === 1 || status === '1' || status === true) ? 'Publish' : 'Preview'}
                </Tag>
            ),
            sorter: (a, b) => {
                const aStatus = (a.status === 1 || a.status === '1' || a.status === true);
                const bStatus = (b.status === 1 || b.status === '1' || b.status === true);
                return (aStatus === bStatus) ? 0 : aStatus ? -1 : 1;
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

    // Function to add or update news
    const handleAddNews = (values: any) => {
        if (isEditing && currentRecord) {
            // Update existing news via API
            router.put(adminBeritaUpdate.url(currentRecord.id), {
                ...values,
                status: values.status === 'true' || values.status === true || values.status === 1 || values.status === '1'
            });
        } else {
            // Add new news via API
            router.post(adminBeritaStore.url(), {
                ...values,
                status: values.status === 'true' || values.status === true || values.status === 1 || values.status === '1'
            });
        }
    };

    // Function to handle news deletion
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (deleteRecordId) {
            router.delete(adminBeritaDestroy.url(deleteRecordId));
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
            tanggal_rilis: record.tanggal_rilis,
            isi_singkat: record.isi_singkat,
            isi: record.isi,
            file: record.file,
            foto: record.foto,
            status: record.status ? 1 : 0,
            produsen_data_table_id: record.produsen_data_table_id,
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
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Search
                            placeholder="Cari berita (judul, owner, foto)..."
                            onSearch={value => setSearchText(value)}
                            style={{ width: 300 }}
                            enterButton
                        />
                        <Select
                            placeholder="Filter Status"
                            style={{ width: 150 }}
                            allowClear
                            onChange={(value) => setSelectedStatus(value === undefined ? null : value)}
                        >
                            <Option value={true}>Publish</Option>
                            <Option value={false}>Preview</Option>
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} berita`
                        }}
                        scroll={{ x: 800 }}
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
                            tanggal_rilis: new Date().toISOString().split('T')[0],
                            isi_singkat: '',
                            isi: '',
                            file: '',
                            foto: '',
                            status: false,
                            produsen_data_table_id: undefined
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
                            label="Tanggal Rilis"
                            name="tanggal_rilis"
                            rules={[{ required: true, message: 'Tanggal rilis wajib diisi' }]}
                        >
                            <Input type="date" placeholder="Masukkan tanggal rilis (YYYY-MM-DD)" />
                        </Form.Item>
                        <Form.Item
                            label="Isi Singkat"
                            name="isi_singkat"
                        >
                            <Input.TextArea
                                rows={2}
                                placeholder="Masukkan isi singkat berita"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Isi"
                            name="isi"
                            rules={[{ required: true, message: 'Isi wajib diisi' }]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Masukkan isi berita"
                            />
                        </Form.Item>
                        <Form.Item
                            label="File"
                            name="file"
                            rules={[{ required: true, message: 'File wajib diupload' }]}
                        >
                            <Input placeholder="Masukkan nama file" />
                        </Form.Item>
                        <Form.Item
                            label="Foto"
                            name="foto"
                            rules={[{ required: true, message: 'Foto wajib diupload' }]}
                        >
                            <Input placeholder="Masukkan nama foto" />
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: "Status wajib dipilih" }]}
                        >
                            <Select placeholder="Pilih status">
                                <Option value={1}>Publish</Option>
                                <Option value={0}>Preview</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Produsen Data (Owner)"
                            name="produsen_data_table_id"
                            rules={[{ required: true, message: 'Produsen data wajib dipilih' }]}
                        >
                            <Select placeholder="Pilih produsen data">
                                {produsenData.map((produsen) => (
                                    <Option key={produsen.id} value={produsen.id}>{produsen.value}</Option>
                                ))}
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
                    <p>Apakah Anda yakin ingin menghapus berita ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
}