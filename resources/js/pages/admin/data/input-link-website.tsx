import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, Table, Button, Input, Space, Tag, Select, Modal, Form, DatePicker } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, LinkOutlined, PlusOutlined } from '@ant-design/icons';

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
        title: 'Input Link Website',
        href: '#'
    },
];

interface LinkWebsiteItem {
    id: number;
    judul_link: string;
    url: string;
    deskripsi: string;
    kategori: string;
    sumber: string;
    status: 'aktif' | 'tidak-aktif';
    tanggal_input: string;
    catatan: string;
}

const InputLinkWebsitePage = () => {
    const { auth } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Data contoh untuk tabel
    const [dataItems, setDataItems] = useState<LinkWebsiteItem[]>([
        {
            id: 1,
            judul_link: 'Data Statistik BPS',
            url: 'https://bps.gov.id',
            deskripsi: 'Website resmi Badan Pusat Statistik',
            kategori: 'Statistik',
            sumber: 'BPS',
            status: 'aktif',
            tanggal_input: '2023-12-15',
            catatan: 'Link valid dan aktif'
        },
        {
            id: 2,
            judul_link: 'Pusat Informasi IKBN',
            url: 'https://ikbn.pertanian.go.id',
            deskripsi: 'Info tentang Investasi Kawasan Budidaya Nabati',
            kategori: 'Investasi',
            sumber: 'Kementan',
            status: 'aktif',
            tanggal_input: '2023-11-20',
            catatan: 'Perlu monitoring berkala'
        },
        {
            id: 3,
            judul_link: 'Weather API BMKG',
            url: 'https://api.bmkg.go.id',
            deskripsi: 'API data cuaca dari Badan Meteorologi Klimatologi dan Geofisika',
            kategori: 'API',
            sumber: 'BMKG',
            status: 'tidak-aktif',
            tanggal_input: '2023-10-05',
            catatan: 'API sedang maintenance'
        },
        {
            id: 4,
            judul_link: 'GIS Pusdatin',
            url: 'https://gis.pusdatin.pertanian.go.id',
            deskripsi: 'Sistem Informasi Geografis Pusat Data dan Informasi',
            kategori: 'GIS',
            sumber: 'Pusdatin',
            status: 'aktif',
            tanggal_input: '2023-09-12',
            catatan: 'Sering digunakan'
        },
        {
            id: 5,
            judul_link: 'E-Learning Puslitbang SDM',
            url: 'https://elearning.puslitbang.sdmpertanian.go.id',
            deskripsi: 'Platform e-learning untuk pengembangan SDM Pertanian',
            kategori: 'Edukasi',
            sumber: 'Puslitbang',
            status: 'aktif',
            tanggal_input: '2023-08-30',
            catatan: 'Update konten rutin'
        }
    ].map(item => { // Validasi dan normalisasi data saat inisialisasi
        return {
            ...item,
            judul_link: item.judul_link || '',
            url: item.url || '',
            deskripsi: item.deskripsi || '',
            kategori: item.kategori || '',
            sumber: item.sumber || '',
            status: item.status || 'aktif',
            tanggal_input: item.tanggal_input || '',
            catatan: item.catatan || ''
        };
    }));

    const [searchText, setSearchText] = useState('');

    // State untuk menandai mode edit
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<LinkWebsiteItem | null>(null);

    // Fungsi untuk menghapus item
    const handleDelete = (id: number) => {
        if (!id) {
            console.error('Invalid ID for deletion');
            return;
        }
        
        Modal.confirm({
            title: 'Konfirmasi Hapus',
            content: 'Apakah Anda yakin ingin menghapus link ini?',
            okText: 'Hapus',
            okType: 'danger',
            cancelText: 'Batal',
            onOk: async () => {
                try {
                    // Hapus dari state
                    setDataItems(prev => prev.filter(item => item.id === id ? false : true));
                } catch (error) {
                    console.error('Error deleting item:', error);
                }
            },
            onCancel: () => {
                console.log('Penghapusan dibatalkan');
            },
        });
    };

    // Fungsi untuk menangani edit item
    const handleEdit = (record: LinkWebsiteItem) => {
        form.setFieldsValue({
            judul_link: record.judul_link,
            url: record.url,
            deskripsi: record.deskripsi,
            kategori: record.kategori,
            sumber: record.sumber,
            status: record.status,
            tanggal_input: record.tanggal_input ? new Date(record.tanggal_input) : null,
            catatan: record.catatan
        });
        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    // Fungsi untuk menambah atau mengupdate data
    const handleAddData = (values: any) => {
        try {
            // Format tanggal ke string ISO sebelum disimpan
            const formattedTanggalInput = values.tanggal_input instanceof Date 
                ? values.tanggal_input.toISOString().split('T')[0] 
                : values.tanggal_input;

            if (isEditing && currentRecord) {
                // Update data yang sudah ada
                setDataItems(prev =>
                    prev.map(item =>
                        item.id === currentRecord.id
                            ? {
                                ...item,
                                judul_link: values.judul_link,
                                url: values.url,
                                deskripsi: values.deskripsi,
                                kategori: values.kategori,
                                sumber: values.sumber,
                                status: values.status,
                                tanggal_input: formattedTanggalInput,
                                catatan: values.catatan
                              }
                            : item
                    )
                );

                // Reset mode edit
                setIsEditing(false);
                setCurrentRecord(null);
            } else {
                // Tambah data baru
                const newId = Math.max(...dataItems.map(u => u.id), 0) + 1;

                const newData: LinkWebsiteItem = {
                    id: newId,
                    judul_link: values.judul_link,
                    url: values.url,
                    deskripsi: values.deskripsi,
                    kategori: values.kategori,
                    sumber: values.sumber,
                    status: values.status,
                    tanggal_input: formattedTanggalInput,
                    catatan: values.catatan
                };

                setDataItems(prev => [...prev, newData]);
            }

            form.resetFields();
            setIsModalVisible(false);
        } catch (error) {
            console.error('Error processing data:', error);
        }
    };

    // Kolom tabel
    const columns: TableColumnsType<LinkWebsiteItem> = [
        {
            title: 'No',
            key: 'no',
            render: (text, record, index) => index + 1,
            width: 50,
        },
        {
            title: 'Judul Link',
            dataIndex: 'judul_link',
            key: 'judul_link',
            sorter: (a, b) => a.judul_link.localeCompare(b.judul_link),
            width: 150,
        },
        {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            render: (url) => (
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {url}
                </a>
            ),
            width: 200,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'deskripsi',
            key: 'deskripsi',
            width: 200,
        },
        {
            title: 'Kategori',
            dataIndex: 'kategori',
            key: 'kategori',
            sorter: (a, b) => a.kategori.localeCompare(b.kategori),
            filters: [
                { text: 'Statistik', value: 'Statistik' },
                { text: 'Investasi', value: 'Investasi' },
                { text: 'API', value: 'API' },
                { text: 'GIS', value: 'GIS' },
                { text: 'Edukasi', value: 'Edukasi' },
            ],
            onFilter: (value, record) => record.kategori === value,
            width: 100,
        },
        {
            title: 'Sumber',
            dataIndex: 'sumber',
            key: 'sumber',
            sorter: (a, b) => a.sumber.localeCompare(b.sumber),
            width: 100,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                if (!status) return <Tag color="default">N/A</Tag>;
                return status === 'aktif' ? (
                    <Tag color="green">Aktif</Tag>
                ) : (
                    <Tag color="red">Tidak Aktif</Tag>
                );
            },
            filters: [
                { text: 'Aktif', value: 'aktif' },
                { text: 'Tidak Aktif', value: 'tidak-aktif' },
            ],
            onFilter: (value, record) => record.status === value,
            width: 100,
        },
        {
            title: 'Tanggal Input',
            dataIndex: 'tanggal_input',
            key: 'tanggal_input',
            render: (date) => {
                const d = new Date(date);
                return isNaN(d.getTime()) ? 'Invalid Date' : d.toLocaleDateString('id-ID');
            },
            sorter: (a, b) => {
                const dateA = new Date(a.tanggal_input);
                const dateB = new Date(b.tanggal_input);
                return (isNaN(dateA.getTime()) ? 0 : dateA.getTime()) - (isNaN(dateB.getTime()) ? 0 : dateB.getTime());
            },
            width: 100,
        },
        {
            title: 'Catatan',
            dataIndex: 'catatan',
            key: 'catatan',
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

    // Filter data berdasarkan pencarian
    const filteredData = dataItems.filter(item => 
        item.judul_link.toLowerCase().includes(searchText.toLowerCase()) ||
        item.url.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
        item.sumber.toLowerCase().includes(searchText.toLowerCase()) ||
        item.catatan.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Link Website - Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Input Link Website</h1>
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
                        Tambah Link Baru
                    </Button>
                </div>
                <p>Input dan kelola link-link website terkait data.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Input
                            placeholder="Cari link (judul, url, kategori, sumber, catatan)"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            style={{ width: 300 }}
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} link`
                        }}
                        scroll={{ x: 'max-content' }}
                        size="small"
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
                            {isEditing ? "Update" : "Simpan"}
                        </Button>,
                    ]}
                >
                    <Form 
                        form={form}
                        layout="vertical" 
                        onFinish={handleAddData}
                    >
                        <Form.Item label="Judul Link" name="judul_link" rules={[{ required: true, message: 'Judul link wajib diisi' }]}>
                            <Input placeholder="Masukkan judul link" />
                        </Form.Item>
                        <Form.Item 
                            label="URL" 
                            name="url" 
                            rules={[
                                { required: true, message: 'URL wajib diisi' },
                                { 
                                    pattern: /^https?:\/\/.+/, 
                                    message: 'URL harus valid dan diawali dengan http:// atau https://' 
                                }
                            ]}
                        >
                            <Input placeholder="Contoh: https://example.com" />
                        </Form.Item>
                        <Form.Item label="Deskripsi" name="deskripsi" rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}>
                            <Input.TextArea placeholder="Masukkan deskripsi link" rows={3} />
                        </Form.Item>
                        <Form.Item label="Kategori" name="kategori" rules={[{ required: true, message: 'Kategori wajib dipilih' }]}>
                            <Select placeholder="Pilih kategori">
                                <Select.Option value="Statistik">Statistik</Select.Option>
                                <Select.Option value="Investasi">Investasi</Select.Option>
                                <Select.Option value="API">API</Select.Option>
                                <Select.Option value="GIS">GIS</Select.Option>
                                <Select.Option value="Edukasi">Edukasi</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Sumber" name="sumber" rules={[{ required: true, message: 'Sumber wajib diisi' }]}>
                            <Input placeholder="Misal: BPS, Kementan, BMKG" />
                        </Form.Item>
                        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Status wajib dipilih' }]}>
                            <Select placeholder="Pilih status">
                                <Select.Option value="aktif">Aktif</Select.Option>
                                <Select.Option value="tidak-aktif">Tidak Aktif</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Tanggal Input" name="tanggal_input" rules={[{ required: true, message: 'Tanggal input wajib diisi' }]}>
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item label="Catatan" name="catatan">
                            <Input.TextArea placeholder="Masukkan catatan tambahan" />
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </AdminLayout>
    );
};

export default InputLinkWebsitePage;