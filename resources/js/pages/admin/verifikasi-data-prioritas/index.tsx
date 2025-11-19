import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, Table, Button, Space, Input, Modal, Form, Select, Tag } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Verifikasi Data Prioritas',
        href: '#',
    },
];

interface VerifikasiDataPrioritasType {
    id: number;
    nama_dataset: string;
    deskripsi: string;
    tanggal_pengajuan: string;
    status_verifikasi: string; // 'menunggu', 'diterima', 'ditolak'
    prioritas: string; // 'tinggi', 'sedang', 'rendah'
    kategori: string;
    pihak_pengaju: string;
    catatan: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    verifikasidataprioritas: VerifikasiDataPrioritasType[];
}

export default function VerifikasiDataPrioritasPage({ verifikasidataprioritas }: Props) {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<VerifikasiDataPrioritasType | null>(null);

    // Use data from props instead of hardcoded values
    const [verifikasiData, setVerifikasiData] = useState<VerifikasiDataPrioritasType[]>(verifikasidataprioritas || []);

    // Filter data based on search
    const filteredData = verifikasiData.filter(item =>
        item.nama_dataset.toLowerCase().includes(searchText.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
        item.pihak_pengaju.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status_verifikasi.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: TableColumnsType<VerifikasiDataPrioritasType> = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            width: 80,
        },
        {
            title: 'Nama Dataset',
            dataIndex: 'nama_dataset',
            key: 'nama_dataset',
            sorter: (a, b) => a.nama_dataset.localeCompare(b.nama_dataset),
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
            title: 'Tanggal Pengajuan',
            dataIndex: 'tanggal_pengajuan',
            key: 'tanggal_pengajuan',
            sorter: (a, b) => a.tanggal_pengajuan.localeCompare(b.tanggal_pengajuan),
            width: 150,
        },
        {
            title: 'Status Verifikasi',
            dataIndex: 'status_verifikasi',
            key: 'status_verifikasi',
            render: (status: string) => (
                <Tag 
                    color={
                        status === 'diterima' ? 'green' : 
                        status === 'ditolak' ? 'red' : 'orange'
                    }
                >
                    {status === 'diterima' ? 'Diterima' : 
                     status === 'ditolak' ? 'Ditolak' : 
                     'Menunggu'}
                </Tag>
            ),
            sorter: (a, b) => a.status_verifikasi.localeCompare(b.status_verifikasi),
            width: 120,
        },
        {
            title: 'Prioritas',
            dataIndex: 'prioritas',
            key: 'prioritas',
            render: (prioritas: string) => (
                <Tag 
                    color={
                        prioritas === 'tinggi' ? 'red' : 
                        prioritas === 'sedang' ? 'orange' : 'blue'
                    }
                >
                    {prioritas === 'tinggi' ? 'Tinggi' : 
                     prioritas === 'sedang' ? 'Sedang' : 
                     'Rendah'}
                </Tag>
            ),
            sorter: (a, b) => a.prioritas.localeCompare(b.prioritas),
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
            title: 'Pihak Pengaju',
            dataIndex: 'pihak_pengaju',
            key: 'pihak_pengaju',
            sorter: (a, b) => a.pihak_pengaju.localeCompare(b.pihak_pengaju),
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
    const { Option } = Select;

    // Function to add or update verifikasi data
    const handleAddVerifikasiData = (values: any) => {
        if (isEditing && currentRecord) {
            // Update existing verifikasi data
            setVerifikasiData(prevData => 
                prevData.map(item => 
                    item.id === currentRecord.id 
                        ? { ...item, ...values, updated_at: new Date().toISOString() } 
                        : item
                )
            );
            toast.success('Data verifikasi berhasil diperbarui.');
        } else {
            // Add new verifikasi data
            const newId = Math.max(...verifikasiData.map(item => item.id), 0) + 1;
            const newVerifikasiData = {
                id: newId,
                ...values,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };
            setVerifikasiData(prevData => [...prevData, newVerifikasiData]);
            toast.success('Data verifikasi baru berhasil ditambahkan.');
        }
        
        setIsModalVisible(false);
        setIsEditing(false);
        setCurrentRecord(null);
        form.resetFields();
    };

    // Function to handle verifikasi data deletion
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (deleteRecordId) {
            setVerifikasiData(prevData => prevData.filter(item => item.id !== deleteRecordId));
            toast.success('Data verifikasi berhasil dihapus.');
        }
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to handle editing verifikasi data
    const handleEdit = (record: VerifikasiDataPrioritasType) => {
        form.setFieldsValue({
            nama_dataset: record.nama_dataset,
            deskripsi: record.deskripsi,
            tanggal_pengajuan: record.tanggal_pengajuan,
            status_verifikasi: record.status_verifikasi,
            prioritas: record.prioritas,
            kategori: record.kategori,
            pihak_pengaju: record.pihak_pengaju,
            catatan: record.catatan,
        });

        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Verifikasi Data Prioritas" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Verifikasi Data Prioritas</h1>
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
                        Tambah Verifikasi Data
                    </Button>
                </div>
                <p>Daftar semua data prioritas yang menunggu verifikasi.</p>

                <Card className="mt-4">
                    <div className="mb-4">
                        <Search
                            placeholder="Cari data (nama dataset, deskripsi, kategori, pihak pengaju)..."
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data menunggu verifikasi`
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Verifikasi Data" : "Tambah Verifikasi Data Baru"}
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
                        onFinish={handleAddVerifikasiData}
                        initialValues={{
                            nama_dataset: '',
                            deskripsi: '',
                            tanggal_pengajuan: new Date().toISOString().split('T')[0],
                            status_verifikasi: 'menunggu',
                            prioritas: 'tinggi',
                            kategori: '',
                            pihak_pengaju: '',
                            catatan: ''
                        }}
                    >
                        <Form.Item 
                            label="Nama Dataset" 
                            name="nama_dataset" 
                            rules={[{ required: true, message: 'Nama dataset wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan nama dataset" />
                        </Form.Item>
                        <Form.Item 
                            label="Deskripsi" 
                            name="deskripsi" 
                            rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}
                        >
                            <Input.TextArea 
                                rows={4} 
                                placeholder="Masukkan deskripsi dataset" 
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Tanggal Pengajuan" 
                            name="tanggal_pengajuan"
                            rules={[{ required: true, message: 'Tanggal pengajuan wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan tanggal pengajuan (YYYY-MM-DD)" />
                        </Form.Item>
                        <Form.Item 
                            label="Status Verifikasi" 
                            name="status_verifikasi"
                            rules={[{ required: true, message: 'Status verifikasi wajib dipilih' }]}
                        >
                            <Select placeholder="Pilih status verifikasi">
                                <Option value="menunggu">Menunggu</Option>
                                <Option value="diterima">Diterima</Option>
                                <Option value="ditolak">Ditolak</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            label="Prioritas" 
                            name="prioritas"
                            rules={[{ required: true, message: 'Prioritas wajib dipilih' }]}
                        >
                            <Select placeholder="Pilih prioritas">
                                <Option value="tinggi">Tinggi</Option>
                                <Option value="sedang">Sedang</Option>
                                <Option value="rendah">Rendah</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            label="Kategori" 
                            name="kategori"
                            rules={[{ required: true, message: 'Kategori wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan kategori dataset" />
                        </Form.Item>
                        <Form.Item 
                            label="Pihak Pengaju" 
                            name="pihak_pengaju"
                            rules={[{ required: true, message: 'Pihak pengaju wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan nama pihak pengaju" />
                        </Form.Item>
                        <Form.Item 
                            label="Catatan" 
                            name="catatan"
                        >
                            <Input.TextArea 
                                rows={3} 
                                placeholder="Masukkan catatan tambahan" 
                            />
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
                    <p>Apakah Anda yakin ingin menghapus data verifikasi ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
}