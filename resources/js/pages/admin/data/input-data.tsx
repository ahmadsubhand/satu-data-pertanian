import AdminLayout from '@/layouts/admin/layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, Table, Button, Input, Space, Tag, Select, Modal, Form, DatePicker } from 'antd';
import type { TableColumnsType } from 'antd';
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons';

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
    tagging_data: string[];
    data_prioritas: boolean;
    kategori_data: string;
    progres: number;
    status: 'draft' | 'review' | 'published' | 'rejected';
    catatan: string;
    file: string;
}

const InputDataPage = () => {
    const { auth } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Data contoh untuk tabel
    const [dataItems, setDataItems] = useState<DataItem[]>([
        {
            id: 1,
            judul: 'Statistik Produksi Pertanian 2023',
            tgl_rilis: '2023-12-15',
            abstraksi: 'Data statistik produksi pertanian tahun 2023',
            produsen_data: 'Pusdatin',
            tagging_data: ['produksi', 'statistik', '2023'],
            data_prioritas: true,
            kategori_data: 'Statistik',
            progres: 90,
            status: 'published',
            catatan: 'Sudah diverifikasi',
            file: 'produksi_2023.pdf'
        },
        {
            id: 2,
            judul: 'Data Geospasial Irigasi',
            tgl_rilis: '2023-11-20',
            abstraksi: 'Peta geospasial sistem irigasi di Indonesia',
            produsen_data: 'Badan Geospasial',
            tagging_data: ['geospasial', 'irigasi', 'peta'],
            data_prioritas: false,
            kategori_data: 'Geospasial',
            progres: 75,
            status: 'review',
            catatan: 'Butuh revisi',
            file: 'irigasi.geojson'
        },
        {
            id: 3,
            judul: 'Indikator Harga Komoditas',
            tgl_rilis: '2023-10-05',
            abstraksi: 'Data indikator harga komoditas pertanian',
            produsen_data: 'Pusdatin',
            tagging_data: ['harga', 'komoditas', 'indikator'],
            data_prioritas: true,
            kategori_data: 'Indikator',
            progres: 100,
            status: 'published',
            catatan: 'Selesai',
            file: 'harga_komoditas.xlsx'
        },
        {
            id: 4,
            judul: 'Data Variabel Cuaca',
            tgl_rilis: '2023-09-12',
            abstraksi: 'Data variabel cuaca dan iklim',
            produsen_data: 'BMKG',
            tagging_data: ['cuaca', 'iklim', 'variabel'],
            data_prioritas: false,
            kategori_data: 'Variabel',
            progres: 60,
            status: 'draft',
            catatan: 'Dalam pengumpulan',
            file: 'cuaca.csv'
        },
        {
            id: 5,
            judul: 'Dataset Link Terkait',
            tgl_rilis: '2023-08-30',
            abstraksi: 'Kumpulan link website terkait data pertanian',
            produsen_data: 'Pusdatin',
            tagging_data: ['link', 'website', 'referensi'],
            data_prioritas: false,
            kategori_data: 'Link',
            progres: 45,
            status: 'draft',
            catatan: 'Perlu dilengkapi',
            file: 'links.json'
        }
    ].map(item => { // Validasi dan normalisasi data saat inisialisasi
        return {
            ...item,
            judul: item.judul || '',
            tgl_rilis: item.tgl_rilis || '',
            abstraksi: item.abstraksi || '',
            produsen_data: item.produsen_data || '',
            tagging_data: Array.isArray(item.tagging_data) ? item.tagging_data : [],
            data_prioritas: typeof item.data_prioritas === 'boolean' ? item.data_prioritas : false,
            kategori_data: item.kategori_data || '',
            progres: typeof item.progres === 'number' ? item.progres : 0,
            status: item.status || 'draft',
            catatan: item.catatan || '',
            file: item.file || ''
        };
    }));

    const [searchText, setSearchText] = useState('');

    // State untuk menandai mode edit
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataItem | null>(null);

    // Fungsi untuk menghapus item
    const handleDelete = (id: number) => {
        if (!id) {
            console.error('Invalid ID for deletion');
            return;
        }
        
        Modal.confirm({
            title: 'Konfirmasi Hapus',
            content: 'Apakah Anda yakin ingin menghapus data ini?',
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
    const handleEdit = (record: DataItem) => {
        try {
            form.setFieldsValue({
                judul: record.judul || '',
                tgl_rilis: record.tgl_rilis ? new Date(record.tgl_rilis) : null,
                abstraksi: record.abstraksi || '',
                produsen_data: record.produsen_data || '',
                tagging_data: Array.isArray(record.tagging_data) ? record.tagging_data.join(', ') : '',
                data_prioritas: record.data_prioritas,
                kategori_data: record.kategori_data || '',
                progres: record.progres || 0,
                status: record.status || 'draft',
                catatan: record.catatan || '',
                file: record.file || ''
            });
            setCurrentRecord(record);
            setIsEditing(true);
            setIsModalVisible(true);
        } catch (error) {
            console.error('Error in handleEdit:', error);
        }
    };

    // Fungsi untuk menambah atau mengupdate data
    const handleAddData = (values: any) => {
        try {
            // Format tanggal ke string ISO sebelum disimpan
            const formattedTglRilis = values.tgl_rilis instanceof Date 
                ? values.tgl_rilis.toISOString().split('T')[0] 
                : values.tgl_rilis;

            if (isEditing && currentRecord) {
                // Update data yang sudah ada
                setDataItems(prev =>
                    prev.map(item =>
                        item.id === currentRecord.id
                            ? {
                                ...item,
                                judul: values.judul,
                                tgl_rilis: formattedTglRilis,
                                abstraksi: values.abstraksi,
                                produsen_data: values.produsen_data,
                                tagging_data: typeof values.tagging_data === 'string' 
                                    ? values.tagging_data.split(',').map((tag: string) => tag.trim())
                                    : [],
                                data_prioritas: values.data_prioritas,
                                kategori_data: values.kategori_data,
                                progres: values.progres,
                                status: values.status,
                                catatan: values.catatan,
                                file: values.file
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

                const newData: DataItem = {
                    id: newId,
                    judul: values.judul,
                    tgl_rilis: formattedTglRilis,
                    abstraksi: values.abstraksi,
                    produsen_data: values.produsen_data,
                    tagging_data: typeof values.tagging_data === 'string' 
                        ? values.tagging_data.split(',').map((tag: string) => tag.trim())
                        : [],
                    data_prioritas: values.data_prioritas,
                    kategori_data: values.kategori_data,
                    progres: values.progres,
                    status: values.status,
                    catatan: values.catatan,
                    file: values.file
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
    const columns: TableColumnsType<DataItem> = [
        {
            title: 'No',
            key: 'no',
            render: (text, record, index) => index + 1,
            width: 50,
        },
        {
            title: 'Judul',
            dataIndex: 'judul',
            key: 'judul',
            sorter: (a, b) => a.judul.localeCompare(b.judul),
            width: 150,
        },
        {
            title: 'Tgl Rilis',
            dataIndex: 'tgl_rilis',
            key: 'tgl_rilis',
            render: (tgl) => {
                const date = new Date(tgl);
                return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('id-ID');
            },
            sorter: (a, b) => {
                const dateA = new Date(a.tgl_rilis);
                const dateB = new Date(b.tgl_rilis);
                return (isNaN(dateA.getTime()) ? 0 : dateA.getTime()) - (isNaN(dateB.getTime()) ? 0 : dateB.getTime());
            },
            width: 100,
        },
        {
            title: 'Abstraksi',
            dataIndex: 'abstraksi',
            key: 'abstraksi',
            width: 200,
        },
        {
            title: 'Produsen Data',
            dataIndex: 'produsen_data',
            key: 'produsen_data',
            sorter: (a, b) => a.produsen_data.localeCompare(b.produsen_data),
            width: 120,
        },
        {
            title: 'Tagging Data',
            dataIndex: 'tagging_data',
            key: 'tagging_data',
            render: (tags) => (
                <Space wrap>
                    {Array.isArray(tags) 
                        ? tags.map((tag: string, index: number) => (
                            <Tag key={index} color="blue">{tag}</Tag>
                          ))
                        : null}
                </Space>
            ),
            width: 150,
        },
        {
            title: 'Data Prioritas',
            dataIndex: 'data_prioritas',
            key: 'data_prioritas',
            render: (isPrioritas) => {
                if (isPrioritas === undefined || isPrioritas === null) return <Tag color="default">N/A</Tag>;
                return isPrioritas ? (
                    <Tag color="red">Prioritas</Tag>
                ) : (
                    <Tag color="default">Biasa</Tag>
                );
            },
            filters: [
                { text: 'Prioritas', value: true },
                { text: 'Biasa', value: false },
            ],
            onFilter: (value, record) => record.data_prioritas === value,
            width: 100,
        },
        {
            title: 'Kategori Data',
            dataIndex: 'kategori_data',
            key: 'kategori_data',
            sorter: (a, b) => a.kategori_data.localeCompare(b.kategori_data),
            filters: [
                { text: 'Statistik', value: 'Statistik' },
                { text: 'Geospasial', value: 'Geospasial' },
                { text: 'Indikator', value: 'Indikator' },
                { text: 'Variabel', value: 'Variabel' },
                { text: 'Link', value: 'Link' },
            ],
            onFilter: (value, record) => record.kategori_data === value,
            width: 100,
        },
        {
            title: 'Progres',
            dataIndex: 'progres',
            key: 'progres',
            render: (progress) => (
                <div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="text-xs">{progress}%</span>
                </div>
            ),
            sorter: (a, b) => a.progres - b.progres,
            width: 80,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                if (!status) return <Tag color="default">N/A</Tag>;
                
                let color = 'default';
                if (status === 'published') color = 'green';
                if (status === 'review') color = 'orange';
                if (status === 'rejected') color = 'red';
                
                return <Tag color={color}>{status.charAt(0).toUpperCase() + status.slice(1)}</Tag>;
            },
            filters: [
                { text: 'Draft', value: 'draft' },
                { text: 'Review', value: 'review' },
                { text: 'Published', value: 'published' },
                { text: 'Rejected', value: 'rejected' },
            ],
            onFilter: (value, record) => record.status === value,
            width: 100,
        },
        {
            title: 'Catatan',
            dataIndex: 'catatan',
            key: 'catatan',
            width: 120,
        },
        {
            title: 'File',
            dataIndex: 'file',
            key: 'file',
            render: (fileName) => (
                <Space>
                    <FileTextOutlined />
                    <span>{fileName}</span>
                </Space>
            ),
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

    // Filter data berdasarkan pencarian
    const filteredData = dataItems.filter(item => 
        item.judul.toLowerCase().includes(searchText.toLowerCase()) ||
        item.produsen_data.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori_data.toLowerCase().includes(searchText.toLowerCase()) ||
        item.catatan.toLowerCase().includes(searchText.toLowerCase()) ||
        item.file.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Data - Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Input Data</h1>
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
                        Tambah Data Baru
                    </Button>
                </div>
                <p>Input dan kelola data statistik, geospasial, indikator, variabel, dan link terkait.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Input
                            placeholder="Cari data (judul, produsen, kategori, catatan, file)"
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} data`
                        }}
                        scroll={{ x: 'max-content' }}
                        size="small"
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
                            <DatePicker style={{ width: '100%' }} />
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
                            <Select placeholder="Pilih status prioritas">
                                <Select.Option value={true}>Prioritas</Select.Option>
                                <Select.Option value={false}>Biasa</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Kategori Data" name="kategori_data" rules={[{ required: true, message: 'Kategori data wajib dipilih' }]}>
                            <Select placeholder="Pilih kategori data">
                                <Select.Option value="Statistik">Statistik</Select.Option>
                                <Select.Option value="Geospasial">Geospasial</Select.Option>
                                <Select.Option value="Indikator">Indikator</Select.Option>
                                <Select.Option value="Variabel">Variabel</Select.Option>
                                <Select.Option value="Link">Link</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Progres (%)" name="progres" rules={[{ required: true, message: 'Progres wajib diisi' }]}>
                            <Select placeholder="Pilih progres">
                                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(num => (
                                    <Select.Option key={num} value={num}>{num}%</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Status" name="status" rules={[{ required: true, message: 'Status wajib dipilih' }]}>
                            <Select placeholder="Pilih status">
                                <Select.Option value="draft">Draft</Select.Option>
                                <Select.Option value="review">Review</Select.Option>
                                <Select.Option value="published">Published</Select.Option>
                                <Select.Option value="rejected">Rejected</Select.Option>
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
            </div>
        </AdminLayout>
    );
};

export default InputDataPage;