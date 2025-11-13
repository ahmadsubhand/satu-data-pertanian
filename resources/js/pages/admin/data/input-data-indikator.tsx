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
        title: 'Input Data Indikator',
        href: '#'
    },
];

interface DataIndikatorItem {
    id: number;
    nama_indikator: string;
    kode_indikator: string;
    deskripsi: string;
    kategori: string;
    satuan: string;
    rumus_perhitungan: string;
    sumber_data: string;
    frekuensi_update: string;
    status: 'draft' | 'review' | 'published' | 'rejected';
    catatan: string;
    file: string;
}

const InputDataIndikatorPage = () => {
    const { auth } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Data contoh untuk tabel
    const [dataItems, setDataItems] = useState<DataIndikatorItem[]>([
        {
            id: 1,
            nama_indikator: 'Indeks Pembangunan Manusia',
            kode_indikator: 'IPM_2023',
            deskripsi: 'Indeks yang mengukur pencapaian pembangunan manusia',
            kategori: 'SDM',
            satuan: 'Angka',
            rumus_perhitungan: '(Kesehatan + Pendidikan + Penghidupan) / 3',
            sumber_data: 'BPS',
            frekuensi_update: 'Tahunan',
            status: 'published',
            catatan: 'Data valid',
            file: 'ipm_2023.xlsx'
        },
        {
            id: 2,
            nama_indikator: 'Luas Tambak',
            kode_indikator: 'LTB_TAMBAK',
            deskripsi: 'Luas tambak dalam hektar',
            kategori: 'Perikanan',
            satuan: 'Ha',
            rumus_perhitungan: 'Jumlah luas semua tambak',
            sumber_data: 'KKP',
            frekuensi_update: 'Bulanan',
            status: 'review',
            catatan: 'Butuh validasi',
            file: 'luas_tambak.json'
        },
        {
            id: 3,
            nama_indikator: 'Produktivitas Jagung',
            kode_indikator: 'PRD_JAGUNG',
            deskripsi: 'Hasil produksi per luas lahan jagung',
            kategori: 'Pertanian',
            satuan: 'Quintal/Ha',
            rumus_perhitungan: 'Produksi Jagung / Luas Tanam Jagung',
            sumber_data: 'Kementan',
            frekuensi_update: 'Musiman',
            status: 'published',
            catatan: 'Sudah diverifikasi',
            file: 'prod_jagung.csv'
        },
        {
            id: 4,
            nama_indikator: 'Konsumsi Daging',
            kode_indikator: 'KSM_DAGING',
            deskripsi: 'Rata-rata konsumsi daging per kapita',
            kategori: 'Gizi',
            satuan: 'Kg/Tahun',
            rumus_perhitungan: 'Total Konsumsi / Populasi',
            sumber_data: 'Kementan',
            frekuensi_update: 'Tahunan',
            status: 'draft',
            catatan: 'Dalam pengumpulan',
            file: 'konsumsi_daging.txt'
        },
        {
            id: 5,
            nama_indikator: 'Luas Lahan Kritis',
            kode_indikator: 'LLK_KRITS',
            deskripsi: 'Luas lahan yang mengalami degradasi',
            kategori: 'Lingkungan',
            satuan: 'Ha',
            rumus_perhitungan: 'Lahan kritis / Total lahan',
            sumber_data: 'KLHK',
            frekuensi_update: 'Tahunan',
            status: 'published',
            catatan: 'Selesai',
            file: 'lahan_kritis.xml'
        }
    ].map(item => { // Validasi dan normalisasi data saat inisialisasi
        return {
            ...item,
            nama_indikator: item.nama_indikator || '',
            kode_indikator: item.kode_indikator || '',
            deskripsi: item.deskripsi || '',
            kategori: item.kategori || '',
            satuan: item.satuan || '',
            rumus_perhitungan: item.rumus_perhitungan || '',
            sumber_data: item.sumber_data || '',
            frekuensi_update: item.frekuensi_update || '',
            status: item.status || 'draft',
            catatan: item.catatan || '',
            file: item.file || ''
        };
    }));

    const [searchText, setSearchText] = useState('');

    // State untuk menandai mode edit
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataIndikatorItem | null>(null);

    // Fungsi untuk menghapus item
    const handleDelete = (id: number) => {
        if (!id) {
            console.error('Invalid ID for deletion');
            return;
        }
        
        Modal.confirm({
            title: 'Konfirmasi Hapus',
            content: 'Apakah Anda yakin ingin menghapus indikator ini?',
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
    const handleEdit = (record: DataIndikatorItem) => {
        form.setFieldsValue({
            nama_indikator: record.nama_indikator,
            kode_indikator: record.kode_indikator,
            deskripsi: record.deskripsi,
            kategori: record.kategori,
            satuan: record.satuan,
            rumus_perhitungan: record.rumus_perhitungan,
            sumber_data: record.sumber_data,
            frekuensi_update: record.frekuensi_update,
            status: record.status,
            catatan: record.catatan,
            file: record.file
        });
        setCurrentRecord(record);
        setIsEditing(true);
        setIsModalVisible(true);
    };

    // Fungsi untuk menambah atau mengupdate data
    const handleAddData = (values: any) => {
        try {
            if (isEditing && currentRecord) {
                // Update data yang sudah ada
                setDataItems(prev =>
                    prev.map(item =>
                        item.id === currentRecord.id
                            ? {
                                ...item,
                                nama_indikator: values.nama_indikator,
                                kode_indikator: values.kode_indikator,
                                deskripsi: values.deskripsi,
                                kategori: values.kategori,
                                satuan: values.satuan,
                                rumus_perhitungan: values.rumus_perhitungan,
                                sumber_data: values.sumber_data,
                                frekuensi_update: values.frekuensi_update,
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

                const newData: DataIndikatorItem = {
                    id: newId,
                    nama_indikator: values.nama_indikator,
                    kode_indikator: values.kode_indikator,
                    deskripsi: values.deskripsi,
                    kategori: values.kategori,
                    satuan: values.satuan,
                    rumus_perhitungan: values.rumus_perhitungan,
                    sumber_data: values.sumber_data,
                    frekuensi_update: values.frekuensi_update,
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
    const columns: TableColumnsType<DataIndikatorItem> = [
        {
            title: 'No',
            key: 'no',
            render: (text, record, index) => index + 1,
            width: 50,
        },
        {
            title: 'Nama Indikator',
            dataIndex: 'nama_indikator',
            key: 'nama_indikator',
            sorter: (a, b) => a.nama_indikator.localeCompare(b.nama_indikator),
            width: 150,
        },
        {
            title: 'Kode Indikator',
            dataIndex: 'kode_indikator',
            key: 'kode_indikator',
            sorter: (a, b) => a.kode_indikator.localeCompare(b.kode_indikator),
            width: 120,
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
                { text: 'SDM', value: 'SDM' },
                { text: 'Perikanan', value: 'Perikanan' },
                { text: 'Pertanian', value: 'Pertanian' },
                { text: 'Gizi', value: 'Gizi' },
                { text: 'Lingkungan', value: 'Lingkungan' },
            ],
            onFilter: (value, record) => record.kategori === value,
            width: 100,
        },
        {
            title: 'Satuan',
            dataIndex: 'satuan',
            key: 'satuan',
            sorter: (a, b) => a.satuan.localeCompare(b.satuan),
            width: 80,
        },
        {
            title: 'Rumus Perhitungan',
            dataIndex: 'rumus_perhitungan',
            key: 'rumus_perhitungan',
            width: 150,
        },
        {
            title: 'Sumber Data',
            dataIndex: 'sumber_data',
            key: 'sumber_data',
            sorter: (a, b) => a.sumber_data.localeCompare(b.sumber_data),
            width: 100,
        },
        {
            title: 'Frek. Update',
            dataIndex: 'frekuensi_update',
            key: 'frekuensi_update',
            sorter: (a, b) => a.frekuensi_update.localeCompare(b.frekuensi_update),
            filters: [
                { text: 'Harian', value: 'Harian' },
                { text: 'Mingguan', value: 'Mingguan' },
                { text: 'Bulanan', value: 'Bulanan' },
                { text: 'Musiman', value: 'Musiman' },
                { text: 'Tahunan', value: 'Tahunan' },
            ],
            onFilter: (value, record) => record.frekuensi_update === value,
            width: 100,
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
            width: 100,
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
        item.nama_indikator.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kode_indikator.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
        item.sumber_data.toLowerCase().includes(searchText.toLowerCase()) ||
        item.catatan.toLowerCase().includes(searchText.toLowerCase()) ||
        item.file.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Data Indikator - Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Input Data Indikator</h1>
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
                        Tambah Indikator Baru
                    </Button>
                </div>
                <p>Input dan kelola indikator-indikator untuk pengukuran.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Input
                            placeholder="Cari indikator (nama, kode, kategori, sumber, catatan, file)"
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} indikator`
                        }}
                        scroll={{ x: 'max-content' }}
                        size="small"
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Indikator" : "Tambah Indikator Baru"}
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
                        <Form.Item label="Nama Indikator" name="nama_indikator" rules={[{ required: true, message: 'Nama indikator wajib diisi' }]}>
                            <Input placeholder="Masukkan nama indikator" />
                        </Form.Item>
                        <Form.Item label="Kode Indikator" name="kode_indikator" rules={[{ required: true, message: 'Kode indikator wajib diisi' }]}>
                            <Input placeholder="Masukkan kode indikator" />
                        </Form.Item>
                        <Form.Item label="Deskripsi" name="deskripsi" rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}>
                            <Input.TextArea placeholder="Masukkan deskripsi indikator" rows={3} />
                        </Form.Item>
                        <Form.Item label="Kategori" name="kategori" rules={[{ required: true, message: 'Kategori wajib dipilih' }]}>
                            <Select placeholder="Pilih kategori">
                                <Select.Option value="SDM">SDM</Select.Option>
                                <Select.Option value="Perikanan">Perikanan</Select.Option>
                                <Select.Option value="Pertanian">Pertanian</Select.Option>
                                <Select.Option value="Gizi">Gizi</Select.Option>
                                <Select.Option value="Lingkungan">Lingkungan</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Satuan" name="satuan" rules={[{ required: true, message: 'Satuan wajib diisi' }]}>
                            <Input placeholder="Misal: Angka, Ha, Kg/Tahun" />
                        </Form.Item>
                        <Form.Item label="Rumus Perhitungan" name="rumus_perhitungan" rules={[{ required: true, message: 'Rumus perhitungan wajib diisi' }]}>
                            <Input.TextArea placeholder="Masukkan rumus perhitungan" rows={2} />
                        </Form.Item>
                        <Form.Item label="Sumber Data" name="sumber_data" rules={[{ required: true, message: 'Sumber data wajib diisi' }]}>
                            <Input placeholder="Misal: BPS, KKP, Kementan" />
                        </Form.Item>
                        <Form.Item label="Frekuensi Update" name="frekuensi_update" rules={[{ required: true, message: 'Frekuensi update wajib dipilih' }]}>
                            <Select placeholder="Pilih frekuensi update">
                                <Select.Option value="Harian">Harian</Select.Option>
                                <Select.Option value="Mingguan">Mingguan</Select.Option>
                                <Select.Option value="Bulanan">Bulanan</Select.Option>
                                <Select.Option value="Musiman">Musiman</Select.Option>
                                <Select.Option value="Tahunan">Tahunan</Select.Option>
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

export default InputDataIndikatorPage;