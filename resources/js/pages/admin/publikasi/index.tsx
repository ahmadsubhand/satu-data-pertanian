import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form } from 'antd';
import type { TableColumnsType } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { adminPublikasiStore, adminPublikasiUpdate, adminPublikasiDestroy, dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: dashboard.url(),
    },
    {
        title: 'Publikasi',
        href: '#',
    },
];

interface PublikasiType {
    id: number;
    judul: string;
    tanggal_rilis: string;
    keterangan: string | null;
    nomor_publikasi: string | null;
    nomor_issn: string | null;
    file: string;
    cover: string;
    status: boolean;
    produsen_data_table_id: number;
    produsen_data?: string; // Nama produsen
    ukuran_file: number;
    jumlah_halaman: number;
    abstraksi: string;
    created_at: string;
    updated_at: string;
}

interface ProdusenDataType {
    id: number;
    value: string;
}

interface Props {
    publikasi: PublikasiType[];
    produsenData?: ProdusenDataType[];
}

export default function PublikasiPage({ publikasi, produsenData = [] }: Props) {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<boolean | null>(null);
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<PublikasiType | null>(null);

    // Filter data based on search and status
    const filteredData = publikasi.filter(pub =>
        pub.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        pub.produsen_data?.toLowerCase().includes(searchText.toLowerCase()) ||
        pub.file.toLowerCase().includes(searchText.toLowerCase())
    ).filter(pub =>
        selectedStatus !== null && selectedStatus !== undefined
            ? (selectedStatus ?
                (pub.status === 1 || pub.status === '1' || pub.status === true) :
                !(pub.status === 1 || pub.status === '1' || pub.status === true)
              )
            : true
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
            title: 'Tanggal Rilis',
            dataIndex: 'tanggal_rilis',
            key: 'tanggal_rilis',
            sorter: (a, b) => a.tanggal_rilis.localeCompare(b.tanggal_rilis),
            width: 120,
        },
        {
            title: 'Nomor Publikasi',
            dataIndex: 'nomor_publikasi',
            key: 'nomor_publikasi',
            sorter: (a, b) => (a.nomor_publikasi || '').localeCompare(b.nomor_publikasi || ''),
            width: 150,
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

    // Function to add or update publikasi
    const handleAddPublikasi = (values: any) => {
        if (isEditing && currentRecord) {
            // Update existing publikasi via API
            router.put(adminPublikasiUpdate.url(currentRecord.id), {
                ...values,
                status: values.status === 'true' || values.status === true || values.status === 1 || values.status === '1'
            });
        } else {
            // Add new publikasi via API
            router.post(adminPublikasiStore.url(), {
                ...values,
                status: values.status === 'true' || values.status === true || values.status === 1 || values.status === '1'
            });
        }
    };

    // Function to handle publikasi deletion
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (deleteRecordId) {
            router.delete(adminPublikasiDestroy.url(deleteRecordId));
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
            tanggal_rilis: record.tanggal_rilis,
            keterangan: record.keterangan,
            nomor_publikasi: record.nomor_publikasi,
            nomor_issn: record.nomor_issn,
            file: record.file,
            cover: record.cover,
            status: record.status ? 1 : 0,
            produsen_data_table_id: record.produsen_data_table_id,
            ukuran_file: record.ukuran_file,
            jumlah_halaman: record.jumlah_halaman,
            abstraksi: record.abstraksi,
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
                    <div className="mb-4 flex items-center space-x-4">
                        <Search
                            placeholder="Cari publikasi (judul, owner, file)..."
                            onSearch={value => setSearchText(value)}
                            style={{ width: 400 }}
                            enterButton
                        />
                        <Select
                            placeholder="Filter Status"
                            style={{ width: 150 }}
                            allowClear
                            onChange={value => setSelectedStatus(value === undefined ? null : value)}
                        >
                            <Option value={1}>Publish</Option>
                            <Option value={0}>Preview</Option>
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
                            tanggal_rilis: new Date().toISOString().split('T')[0],
                            keterangan: '',
                            nomor_publikasi: '',
                            nomor_issn: '',
                            file: '',
                            cover: '',
                            status: 0,
                            produsen_data_table_id: undefined,
                            ukuran_file: 1,
                            jumlah_halaman: 1,
                            abstraksi: ''
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
                            label="Tanggal Rilis"
                            name="tanggal_rilis"
                            rules={[{ required: true, message: 'Tanggal rilis wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan tanggal rilis (YYYY-MM-DD)" />
                        </Form.Item>
                        <Form.Item
                            label="Keterangan"
                            name="keterangan"
                            rules={[{ required: true, message: 'Keterangan wajib diisi' }]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Masukkan keterangan publikasi"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Nomor Publikasi"
                            name="nomor_publikasi"
                        >
                            <Input placeholder="Masukkan nomor publikasi" />
                        </Form.Item>
                        <Form.Item
                            label="Nomor ISSN"
                            name="nomor_issn"
                        >
                            <Input placeholder="Masukkan nomor ISSN" />
                        </Form.Item>
                        <Form.Item
                            label="File"
                            name="file"
                            rules={[{ required: true, message: 'File wajib diisi' }]}
                        >
                            <Input placeholder="Nama file publikasi" />
                        </Form.Item>
                        <Form.Item
                            label="Cover"
                            name="cover"
                            rules={[{ required: true, message: 'Cover wajib diisi' }]}
                        >
                            <Input placeholder="Nama file cover" />
                        </Form.Item>
                        <Form.Item
                            label="Ukuran File (KB)"
                            name="ukuran_file"
                            rules={[{ required: true, message: 'Ukuran file wajib diisi' }]}
                        >
                            <Input type="number" placeholder="Ukuran file dalam KB" />
                        </Form.Item>
                        <Form.Item
                            label="Jumlah Halaman"
                            name="jumlah_halaman"
                            rules={[{ required: true, message: 'Jumlah halaman wajib diisi' }]}
                        >
                            <Input type="number" placeholder="Jumlah halaman" />
                        </Form.Item>
                        <Form.Item
                            label="Abstraksi"
                            name="abstraksi"
                            rules={[{ required: true, message: 'Abstraksi wajib diisi' }]}
                        >
                            <Input.TextArea
                                rows={6}
                                placeholder="Abstraksi publikasi"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: 'Status wajib dipilih' }]}
                        >
                            <Select placeholder="Pilih status">
                                <Select.Option value={1}>Publish</Select.Option>
                                <Select.Option value={0}>Preview</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Produsen Data"
                            name="produsen_data_table_id"
                            rules={[{ required: true, message: 'Produsen data wajib dipilih' }]}
                        >
                            <Select placeholder="Pilih produsen data">
                                {produsenData.map((produsen) => (
                                    <Option key={produsen.id} value={produsen.id}>
                                        {produsen.value}
                                    </Option>
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
                    <p>Apakah Anda yakin ingin menghapus publikasi ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
}