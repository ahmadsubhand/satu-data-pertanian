import AdminLayout from '@/layouts/admin/layout';
import {type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Card, Table, Button, Space, Tag, Input, Select, Modal, Form, Upload } from 'antd';
const { Search } = Input;
import type { TableColumnsType, UploadFile } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { adminDataInputLinkStore, dashboard, adminDataInputLinkDownload, adminDataInputLinkDestroy, adminDataInputLinkUpdate } from '@/routes';
import type { RcFile, UploadProps } from 'antd/es/upload';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: dashboard.url(),
    },
    {
        title: 'Link Management',
        href: '#',
    },
];

interface LinkType {
    id: number;
    nama: string;
    link: string;
    status: boolean;
    foto: string;
    user_id: number;
    user_nama: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    links: LinkType[];
}

export default function LinkManagementPage({ links }: Props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [selectedStatus, setSelectedStatus] = useState<boolean | null>(null);
    const [form] = Form.useForm();
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecordId, setDeleteRecordId] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<LinkType | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });


    // Filter data based on search and status
    const filteredLinks = links.filter(item =>
        item.nama.toLowerCase().includes(searchText.toLowerCase()) ||
        item.link.toLowerCase().includes(searchText.toLowerCase())
    ).filter(item =>
        selectedStatus !== null && selectedStatus !== undefined
            ? (selectedStatus ?
                (item.status === 1 || item.status === '1' || item.status === true) :
                !(item.status === 1 || item.status === '1' || item.status === true)
              )
            : true
    );

    const columns: TableColumnsType<LinkType> = [
        {
            title: 'No',
            key: 'no',
            render: (_text, _record, index) =>
                (pagination.current - 1) * pagination.pageSize + index + 1,
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            sorter: (a, b) => a.nama.localeCompare(b.nama),
            minWidth: 200,
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (link) => (
                <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            ),
            minWidth: 200,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => (
                <Tag color={status ? 'green' : 'orange'}>
                    {(status === 1 || status === '1' || status === true) ? 'Aktif' : 'Non-Aktif'}
                </Tag>
            ),
            sorter: (a, b) => {
                const aStatus = (a.status === 1 || a.status === '1' || a.status === true);
                const bStatus = (b.status === 1 || b.status === '1' || b.status === true);
                return (aStatus === bStatus) ? 0 : aStatus ? -1 : 1;
            },
            minWidth: 100,
        },
        // {
        //     title: 'Foto',
        //     dataIndex: 'foto',
        //     key: 'foto',
        //     render: (file) => (
        //         <a
        //             href={adminDataInputLinkDownload.url({
        //                 query: { link: file }
        //             })}
        //             target="_blank"
        //             rel="noopener noreferrer"
        //             style={{ color: '#1677ff' }}
        //         >
        //             {file || 'Tidak ada file'}
        //         </a>
        //     ),
        //     minWidth: 200,
        // },
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

    const handleAddNew = () => {
        form.resetFields();
        setFileList([]);
        setIsEditing(false);
        setCurrentRecord(null);
        setIsModalVisible(true);
    };

    const handleEdit = (record: LinkType) => {
        // Set up file list for existing file
        if (record.foto) {
            setFileList([
                {
                    uid: '1',
                    name: record.foto,
                    status: 'done',
                    url: adminDataInputLinkDownload.url({
                        query: { link: record.foto }
                    }),
                }
            ]);
        }

        form.setFieldsValue({
            nama: record.nama,
            link: record.link,
            status: record.status ? 1 : 0,
            user_id: record.user_id,
            foto: record.foto,
        });

        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    const handleDelete = (id: number) => {
        setDeleteRecordId(id);
        setDeleteModalVisible(true);
    };

    // Function to confirm deletion
    const confirmDelete = () => {
        if (deleteRecordId) {
            router.delete(adminDataInputLinkDestroy.url(deleteRecordId), {
                onSuccess: () => {
                    toast.success('Link berhasil dihapus');
                    setDeleteModalVisible(false);
                    setDeleteRecordId(null);
                },
                onError: (errors) => {
                    console.error('Delete error:', errors);
                    toast.error('Gagal menghapus link');
                }
            });
        }
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setDeleteModalVisible(false);
        setDeleteRecordId(null);
    };

    const handleFileChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const beforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            toast.error('Anda hanya dapat mengunggah file gambar!');
        }
        // Don't upload directly, let the form handle it
        return false;
    };

    // Function to add or update links
    const handleAddLink = (values: any) => {
        // Process file for uploading
        const processedValues = {
            ...values,
            status: values.status === 'true' || values.status === true || values.status === 1 || values.status === '1',
            foto: values.foto.fileList ? values.foto.fileList[0].originFileObj : null
        };

        if (isEditing && currentRecord) {
            // Update existing link via API
            router.post(adminDataInputLinkUpdate.url(currentRecord.id), {
                _method: 'put',
                ...processedValues
            });
        } else {
            // Add new link via API
            router.post(adminDataInputLinkStore.url(), processedValues);
        }
    };

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Link Management - Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Manajemen Link</h1>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddNew}
                    >
                        Tambah Link Baru
                    </Button>
                </div>
                <p>Kelola daftar link website dan portal informasi.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Input.Search
                            placeholder="Cari link (nama, link)..."
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
                            <Select.Option value={true}>Aktif</Select.Option>
                            <Select.Option value={false}>Tidak Aktif</Select.Option>
                        </Select>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={filteredLinks}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} link`
                        }}
                        scroll={{ x: 800 }}
                        onChange={(paginationConfig) => {
                            setPagination({
                                current: paginationConfig.current!,
                                pageSize: paginationConfig.pageSize!
                            });
                        }}
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Link" : "Tambah Link Baru"}
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
                            {isEditing ? "Perbarui" : "Simpan"}
                        </Button>,
                    ]}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleAddLink}
                        initialValues={{
                            nama: '',
                            link: '',
                            foto: [],
                            status: true
                        }}
                    >
                        <Form.Item
                            label="Nama Link"
                            name="nama"
                            rules={[{ required: true, message: 'Silakan masukkan nama link!' }]}
                        >
                            <Input placeholder="Masukkan nama link" />
                        </Form.Item>

                        <Form.Item
                            label="URL Link"
                            name="link"
                            rules={[
                                { required: true, message: 'Silakan masukkan URL link!' },
                                { type: 'url', message: 'Format URL tidak valid!' }
                            ]}
                        >
                            <Input placeholder="https://example.com" />
                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="status"
                            rules={[{ required: true, message: "Status wajib dipilih" }]}
                        >
                            <Select placeholder="Pilih status">
                                <Select.Option value={1}>Aktif</Select.Option>
                                <Select.Option value={0}>Tidak Aktif</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Foto/Logo"
                            name="foto"
                            rules={[{ required: !isEditing, message: 'Foto wajib diupload' }]}
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
                                        form.setFieldsValue({ foto: file }); return false; // mencegah upload otomatis
                                    }
                                }
                                fileList={fileList}
                                maxCount={1} >
                                <Button icon={<UploadOutlined />}>Pilih Foto</Button>
                            </Upload>
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
                    <p>Apakah Anda yakin ingin menghapus link ini?</p>
                </Modal>
            </div>
        </AdminLayout>
    );
}