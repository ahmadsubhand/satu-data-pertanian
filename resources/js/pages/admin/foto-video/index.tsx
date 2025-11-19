import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Input, Modal, Form, Select, Upload } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined, FileImageOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import FileUpload from '@/components/file-upload';
import { adminMediaStore, adminMediaUpdate, adminMediaDestroy } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '#',
    },
    {
        title: 'Foto/Video',
        href: '#',
    },
];

interface FotoVideoType {
    id: number;
    judul: string;
    deskripsi: string;
    tanggal_upload: string;
    status: string;
    kategori: string;
    jenis_media: string; // 'foto' or 'video'
    url_media: string;
    file_name?: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    fotovideo: FotoVideoType[];
}

export default function FotoVideoPage({ fotovideo }: Props) {
    const { auth, flash } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<FotoVideoType | null>(null);

    // Use data from props instead of hardcoded values
    const [fotovideoData, setFotovideoData] = useState<FotoVideoType[]>(fotovideo || []);

    // Handle flash messages
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    // Filter data based on search
    const filteredData = fotovideoData.filter(item =>
        item.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        item.deskripsi.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
        item.status.toLowerCase().includes(searchText.toLowerCase()) ||
        item.jenis_media.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns: TableColumnsType<FotoVideoType> = [
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
            title: 'Tanggal Upload',
            dataIndex: 'tanggal_upload',
            key: 'tanggal_upload',
            sorter: (a, b) => a.tanggal_upload.localeCompare(b.tanggal_upload),
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
            title: 'Jenis Media',
            dataIndex: 'jenis_media',
            key: 'jenis_media',
            sorter: (a, b) => a.jenis_media.localeCompare(b.jenis_media),
            width: 100,
        },
        {
            title: 'File Media',
            dataIndex: 'file_name',
            key: 'file_name',
            render: (fileName: string, record: FotoVideoType) => (
                fileName ? (
                    <a href={record.url_media} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>
                        {fileName}
                    </a>
                ) : (
                    <a href={record.url_media} target="_blank" rel="noopener noreferrer" style={{ color: '#1890ff' }}>
                        {record.url_media.includes('.mp4') || record.url_media.includes('.avi') || record.url_media.includes('.mov') ?
                            'Tonton Video' : 'Lihat Gambar'}
                    </a>
                )
            ),
            width: 200,
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

    // Normalize file upload for Ant Design Form
    const normFile = (e: any) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    // Function to add or update foto/video
    const handleAddFotoVideo = (values: any) => {
        // Handle file upload - in a real implementation this would upload to the server
        // For now, we'll simulate storing the file info
        let updatedValues = { ...values };

        // Process file media if it exists
        if (values.file_media && values.file_media.fileList && values.file_media.fileList.length > 0) {
            // Get the first file from the list
            const file = values.file_media.fileList[0];

            // In a real implementation, you would upload the file to your server
            // and get back a URL to store. For now we'll just create a placeholder.
            updatedValues.url_media = file.originFileObj ? URL.createObjectURL(file.originFileObj) : '';
            updatedValues.file_name = file.name || 'unnamed_file';
        } else {
            // If no file was uploaded, maintain the old URL if we're editing
            if (isEditing && currentRecord) {
                updatedValues.url_media = currentRecord.url_media;
                updatedValues.file_name = currentRecord.judul;
            }
        }

        // Remove the file_media field from the values as it's not part of the model
        delete updatedValues.file_media;

        if (isEditing && currentRecord) {
            // Update existing foto/video
            router.put(adminMediaUpdate.url(currentRecord.id), updatedValues);
        } else {
            // Add new foto/video
            router.post(adminMediaStore.url(), updatedValues);
        }

        setIsModalVisible(false);
        setIsEditing(false);
        setCurrentRecord(null);
        form.resetFields();
    };

    // Function to handle foto/video deletion
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (deleteRecordId) {
            router.delete(adminMediaDestroy.url(deleteRecordId));
        }
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to handle editing foto/video
    const handleEdit = (record: FotoVideoType) => {
        form.setFieldsValue({
            judul: record.judul,
            deskripsi: record.deskripsi,
            tanggal_upload: record.tanggal_upload,
            status: record.status,
            kategori: record.kategori,
            jenis_media: record.jenis_media,
            // Don't set url_media directly since we're using file upload instead
            // If we have file information, we might want to set up a placeholder
        });

        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Foto/Video" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Foto/Video</h1>
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
                        Upload Baru
                    </Button>
                </div>
                <p>Daftar semua foto dan video yang dikelola dalam sistem.</p>

                <Card className="mt-4">
                    <div className="mb-4">
                        <Search
                            placeholder="Cari media (judul, deskripsi, kategori, jenis media)..."
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} media`
                        }}
                        scroll={{ x: 1200 }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Media" : "Upload Media Baru"}
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
                        onFinish={handleAddFotoVideo}
                        initialValues={{
                            judul: '',
                            deskripsi: '',
                            tanggal_upload: new Date().toISOString().split('T')[0],
                            status: 'aktif',
                            kategori: '',
                            jenis_media: 'foto',
                        }}
                    >
                        <Form.Item 
                            label="Judul" 
                            name="judul" 
                            rules={[{ required: true, message: 'Judul wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan judul media" />
                        </Form.Item>
                        <Form.Item 
                            label="Deskripsi" 
                            name="deskripsi" 
                            rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}
                        >
                            <Input.TextArea 
                                rows={4} 
                                placeholder="Masukkan deskripsi media" 
                            />
                        </Form.Item>
                        <Form.Item 
                            label="Tanggal Upload" 
                            name="tanggal_upload"
                            rules={[{ required: true, message: 'Tanggal upload wajib diisi' }]}
                        >
                            <Input placeholder="Masukkan tanggal upload (YYYY-MM-DD)" />
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
                            <Input placeholder="Masukkan kategori media" />
                        </Form.Item>
                        <Form.Item 
                            label="Jenis Media" 
                            name="jenis_media"
                            rules={[{ required: true, message: 'Jenis media wajib dipilih' }]}
                        >
                            <Select placeholder="Pilih jenis media">
                                <Option value="foto">Foto</Option>
                                <Option value="video">Video</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="File Media"
                            name="file_media"
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                            rules={[{ required: true, message: 'File media wajib diunggah' }]}
                        >
                            <FileUpload
                                label="Upload Foto/Video"
                                maxFileSize={10}
                                allowedFileTypes={['image/*', 'video/*']}
                                accept="image/*,video/*"
                                required
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
                    <p>Apakah Anda yakin ingin menghapus media ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
}