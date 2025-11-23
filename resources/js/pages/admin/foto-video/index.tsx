import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Modal, Form, Select, Result, Upload } from 'antd';
import type { TableColumnsType, UploadFile } from 'antd';
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { toast } from 'sonner';
import FileUpload from '@/components/file-upload';
import { adminFotoVideoDestroy, adminFotoVideoDownload, adminFotoVideoStore, adminFotoVideoUpdate, dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: dashboard.url(),
    },
    {
        title: 'Foto/Video',
        href: '#',
    },
];

interface FotoVideoType {
    id: number;
    created_at: string;
    updated_at: string;
    judul: string;
    keterangan: string;
    link_video: string;
    tanggal_rilis: string;
    file: string;
    status: string;
}

interface Props {
    fotovideo: FotoVideoType[];
    users?: Array<{id: number, nama_lengkap: string}>;
}

export default function FotoVideoPage({ fotovideo, users = [] }: Props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [isVideo, setIsVideo] = useState<boolean | null>(null);
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<FotoVideoType | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });

    // Filter data based on search and status
    const filteredData = fotovideo.filter(item =>
        item.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        item.keterangan.toLowerCase().includes(searchText.toLowerCase()) ||
        item.file?.toLowerCase().includes(searchText.toLowerCase())
    ).filter(item =>
        selectedStatus !== null && selectedStatus !== undefined
            ? (selectedStatus ?
                (item.status === 1 || item.status === '1' || item.status === true) :
                !(item.status === 1 || item.status === '1' || item.status === true)
              )
            : true
    ).filter(item => 
        isVideo !== null && isVideo !== undefined
            ? isVideo ?
                item.link_video : 
                !item.link_video
            : true
    );

    const columns: TableColumnsType<FotoVideoType> = [
        {
            title: 'No',
            key: 'no',
            render: (_text, _record, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: 'Judul',
            dataIndex: 'judul',
            key: 'judul',
            sorter: (a, b) => a.judul.localeCompare(b.judul),
            minWidth: 200,
        },
        {
            title: 'Tanggal Rilis',
            dataIndex: 'tanggal_rilis',
            key: 'tanggal_rilis',
            sorter: (a, b) => a.tanggal_rilis.localeCompare(b.tanggal_rilis),
            minWidth: 120,
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
            minWidth: 100,
        },
        {
            title: 'File',
            dataIndex: 'file',
            key: 'file',
            minWidth: 200,
            render: (file) => (
                <a
                    href={adminFotoVideoDownload.url({
                        query: { link: file }
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1677ff' }}
                >
                    {file || 'Tidak ada file'}
                </a>
            ),
        },
        {
            title: 'Link Video',
            dataIndex: 'link_video',
            key: 'link_video',
            minWidth: 140,
            render: (link_video) => 
                link_video ? (
                    <Button href={link_video} target={'_blank'}>
                        Lihat Video
                    </Button>
                ) :
                (
                    'Tidak ada Video'
                ),  
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
            minWidth: 100,
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
        const processedValues = {
            ...values,
            status: values.status === 'true' || values.status === true || values.status === 1 || values.status === '1',
            file: values.file.fileList ? values.file.fileList[0].originFileObj : null,
        };

        if (isEditing && currentRecord) {
            // Update existing foto/video
            router.post(adminFotoVideoUpdate.url(currentRecord.id), {
                _method: 'put',
                ...processedValues
            });
        } else {
            // Add new foto/video
            router.post(adminFotoVideoStore.url(), processedValues);
        }
    };

    // Function to handle foto/video deletion
    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (deleteRecordId) {
            router.delete(adminFotoVideoDestroy.url(deleteRecordId));
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
        if (record.file) {
            setFileList([
                {
                    uid: '1',
                    name: record.file,
                    status: 'done',
                    url: adminFotoVideoDownload.url({
                        query: { link: record.file }
                    }),
                }
            ]);
        }
        form.setFieldsValue({
            judul: record.judul,
            keterangan: record.keterangan,
            link_video: record.link_video,
            tanggal_rilis: record.tanggal_rilis,
            status: record.status ? 1 : 0,
            file: record.file
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
                            setFileList([]);
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
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Search
                            placeholder="Cari media (judul, file)..."
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
                        <Select
                            placeholder="Filter Media"
                            style={{ width: 150 }}
                            allowClear
                            onChange={(value) => setIsVideo(value === undefined ? null : value)}
                        >
                            <Option value={true}>Video</Option>
                            <Option value={false}>Foto</Option>
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} media`
                        }}
                        scroll={{ x: 1200 }}
                        onChange={(paginationConfig) => {
                            setPagination({
                                current: paginationConfig.current!,
                                pageSize: paginationConfig.pageSize!
                            });
                        }}
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
                            keterangan: '',
                            link_video: '',
                            tanggal_rilis: new Date().toISOString().split('T')[0],
                            status: 0,
                            file: []
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
                            label="Keterangan"
                            name="keterangan"
                            rules={[{ required: true, message: 'Keterangan wajib diisi' }]}
                        >
                            <Input.TextArea
                                rows={4}
                                placeholder="Masukkan keterangan foto/video"
                            />
                        </Form.Item>
                        <Form.Item
                            label="Tanggal Rilis"
                            name="tanggal_rilis"
                            rules={[{ required: true, message: 'Tanggal rilis wajib diisi' }]}
                        >
                            <Input type="date" placeholder="Masukkan tanggal rilis (YYYY-MM-DD)" />
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
                            label="File"
                            name="file"
                            rules={[{ required: true, message: 'File wajib diisi' }]}
                        >
                            <Upload
                                beforeUpload={
                                    (file) => {
                                        setFileList(
                                            [
                                                {
                                                    uid: '1',
                                                    name: file.name,
                                                    status: 'done',
                                                }
                                            ]
                                        );
                                        form.setFieldsValue({ file: file }); return false; // mencegah upload otomatis
                                    }
                                }
                                fileList={fileList}
                                maxCount={1} >
                                <Button icon={<UploadOutlined />}>Pilih File</Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            label="Link Video"
                            name="link_video"
                        >
                            <Input placeholder="Masukkan link video" />
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