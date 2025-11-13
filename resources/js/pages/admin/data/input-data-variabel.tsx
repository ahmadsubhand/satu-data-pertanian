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
        title: 'Input Data Variabel',
        href: '#'
    },
];

interface DataVariabelItem {
    id: number;
    nama_variabel: string;
    kode_variabel: string;
    deskripsi: string;
    kategori: string;
    satuan: string;
    tipe_data: string;
    sumber_data: string;
    frekuensi_pembaruan: string;
    status: 'draft' | 'review' | 'published' | 'rejected';
    catatan: string;
    file: string;
}

const InputDataVariabelPage = () => {
    const { auth } = usePage<SharedData>().props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    // Data contoh untuk tabel
    const [dataItems, setDataItems] = useState<DataVariabelItem[]>([
        {
            id: 1,
            nama_variabel: 'Produksi Padi',
            kode_variabel: 'PROD_PADI',
            deskripsi: 'Jumlah produksi padi dalam ton',
            kategori: 'Pertanian',
            satuan: 'Ton',
            tipe_data: 'Angka',
            sumber_data: 'BPS',
            frekuensi_pembaruan: 'Bulanan',
            status: 'published',
            catatan: 'Data valid',
            file: 'prod_padi.csv'
        },
        {
            id: 2,
            nama_variabel: 'Curah Hujan',
            kode_variabel: 'HJN_CURAH',
            deskripsi: 'Jumlah curah hujan dalam mm',
            kategori: 'Cuaca',
            satuan: 'mm',
            tipe_data: 'Angka',
            sumber_data: 'BMKG',
            frekuensi_pembaruan: 'Harian',
            status: 'review',
            catatan: 'Perlu validasi',
            file: 'hujan.json'
        },
        {
            id: 3,
            nama_variabel: 'Luas Panen',
            kode_variabel: 'LPN_LUAS',
            deskripsi: 'Luas lahan yang dipanen dalam hektar',
            kategori: 'Pertanian',
            satuan: 'Ha',
            tipe_data: 'Angka',
            sumber_data: 'Pusdatin',
            frekuensi_pembaruan: 'Musiman',
            status: 'published',
            catatan: 'Sudah diverifikasi',
            file: 'luas_panen.xlsx'
        },
        {
            id: 4,
            nama_variabel: 'Harga Gabah',
            kode_variabel: 'HGA_GABAH',
            deskripsi: 'Harga gabah per kg',
            kategori: 'Ekonomi',
            satuan: 'Rp/Kg',
            tipe_data: 'Angka',
            sumber_data: 'Kementan',
            frekuensi_pembaruan: 'Mingguan',
            status: 'draft',
            catatan: 'Dalam pengumpulan',
            file: 'harga_gabah.txt'
        },
        {
            id: 5,
            nama_variabel: 'Jumlah Ternak',
            kode_variabel: 'TRN_JMLH',
            deskripsi: 'Jumlah ternak dalam ribuan ekor',
            kategori: 'Peternakan',
            satuan: 'Ribu Ekor',
            tipe_data: 'Angka',
            sumber_data: 'Pusdatin',
            frekuensi_pembaruan: 'Tahunan',
            status: 'published',
            catatan: 'Selesai',
            file: 'jumlah_ternak.xml'
        }
    ].map(item => { // Validasi dan normalisasi data saat inisialisasi
        return {
            ...item,
            nama_variabel: item.nama_variabel || '',
            kode_variabel: item.kode_variabel || '',
            deskripsi: item.deskripsi || '',
            kategori: item.kategori || '',
            satuan: item.satuan || '',
            tipe_data: item.tipe_data || '',
            sumber_data: item.sumber_data || '',
            frekuensi_pembaruan: item.frekuensi_pembaruan || '',
            status: item.status || 'draft',
            catatan: item.catatan || '',
            file: item.file || ''
        };
    }));

    const [searchText, setSearchText] = useState('');

    // State untuk menandai mode edit
    const [isEditing, setIsEditing] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<DataVariabelItem | null>(null);

    // Fungsi untuk menghapus item
    const handleDelete = (id: number) => {
        if (!id) {
            console.error('Invalid ID for deletion');
            return;
        }
        
        Modal.confirm({
            title: 'Konfirmasi Hapus',
            content: 'Apakah Anda yakin ingin menghapus variabel ini?',
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
    const handleEdit = (record: DataVariabelItem) => {
        form.setFieldsValue({
            nama_variabel: record.nama_variabel,
            kode_variabel: record.kode_variabel,
            deskripsi: record.deskripsi,
            kategori: record.kategori,
            satuan: record.satuan,
            tipe_data: record.tipe_data,
            sumber_data: record.sumber_data,
            frekuensi_pembaruan: record.frekuensi_pembaruan,
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
                                nama_variabel: values.nama_variabel,
                                kode_variabel: values.kode_variabel,
                                deskripsi: values.deskripsi,
                                kategori: values.kategori,
                                satuan: values.satuan,
                                tipe_data: values.tipe_data,
                                sumber_data: values.sumber_data,
                                frekuensi_pembaruan: values.frekuensi_pembaruan,
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

                const newData: DataVariabelItem = {
                    id: newId,
                    nama_variabel: values.nama_variabel,
                    kode_variabel: values.kode_variabel,
                    deskripsi: values.deskripsi,
                    kategori: values.kategori,
                    satuan: values.satuan,
                    tipe_data: values.tipe_data,
                    sumber_data: values.sumber_data,
                    frekuensi_pembaruan: values.frekuensi_pembaruan,
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
    const columns: TableColumnsType<DataVariabelItem> = [
        {
            title: 'No',
            key: 'no',
            render: (text, record, index) => index + 1,
            width: 50,
        },
        {
            title: 'Nama Variabel',
            dataIndex: 'nama_variabel',
            key: 'nama_variabel',
            sorter: (a, b) => a.nama_variabel.localeCompare(b.nama_variabel),
            width: 120,
        },
        {
            title: 'Kode Variabel',
            dataIndex: 'kode_variabel',
            key: 'kode_variabel',
            sorter: (a, b) => a.kode_variabel.localeCompare(b.kode_variabel),
            width: 100,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'deskripsi',
            key: 'deskripsi',
            width: 150,
        },
        {
            title: 'Kategori',
            dataIndex: 'kategori',
            key: 'kategori',
            sorter: (a, b) => a.kategori.localeCompare(b.kategori),
            filters: [
                { text: 'Pertanian', value: 'Pertanian' },
                { text: 'Cuaca', value: 'Cuaca' },
                { text: 'Ekonomi', value: 'Ekonomi' },
                { text: 'Peternakan', value: 'Peternakan' },
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
            title: 'Tipe Data',
            dataIndex: 'tipe_data',
            key: 'tipe_data',
            sorter: (a, b) => a.tipe_data.localeCompare(b.tipe_data),
            filters: [
                { text: 'Angka', value: 'Angka' },
                { text: 'Teks', value: 'Teks' },
                { text: 'Boolean', value: 'Boolean' },
            ],
            onFilter: (value, record) => record.tipe_data === value,
            width: 80,
        },
        {
            title: 'Sumber Data',
            dataIndex: 'sumber_data',
            key: 'sumber_data',
            sorter: (a, b) => a.sumber_data.localeCompare(b.sumber_data),
            width: 100,
        },
        {
            title: 'Frek. Pembaruan',
            dataIndex: 'frekuensi_pembaruan',
            key: 'frekuensi_pembaruan',
            sorter: (a, b) => a.frekuensi_pembaruan.localeCompare(b.frekuensi_pembaruan),
            filters: [
                { text: 'Harian', value: 'Harian' },
                { text: 'Mingguan', value: 'Mingguan' },
                { text: 'Bulanan', value: 'Bulanan' },
                { text: 'Musiman', value: 'Musiman' },
                { text: 'Tahunan', value: 'Tahunan' },
            ],
            onFilter: (value, record) => record.frekuensi_pembaruan === value,
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
        item.nama_variabel.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kode_variabel.toLowerCase().includes(searchText.toLowerCase()) ||
        item.kategori.toLowerCase().includes(searchText.toLowerCase()) ||
        item.sumber_data.toLowerCase().includes(searchText.toLowerCase()) ||
        item.catatan.toLowerCase().includes(searchText.toLowerCase()) ||
        item.file.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <AdminLayout breadcrumbs={breadcrumbs}>
            <Head title="Input Data Variabel - Admin" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Input Data Variabel</h1>
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
                        Tambah Variabel Baru
                    </Button>
                </div>
                <p>Input dan kelola variabel-variabel yang digunakan dalam data.</p>

                <Card className="mt-4">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <Input
                            placeholder="Cari variabel (nama, kode, kategori, sumber, catatan, file)"
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
                            showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} variabel`
                        }}
                        scroll={{ x: 'max-content' }}
                        size="small"
                    />
                </Card>

                <Modal
                    title={isEditing ? "Edit Variabel" : "Tambah Variabel Baru"}
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
                        <Form.Item label="Nama Variabel" name="nama_variabel" rules={[{ required: true, message: 'Nama variabel wajib diisi' }]}>
                            <Input placeholder="Masukkan nama variabel" />
                        </Form.Item>
                        <Form.Item label="Kode Variabel" name="kode_variabel" rules={[{ required: true, message: 'Kode variabel wajib diisi' }]}>
                            <Input placeholder="Masukkan kode variabel" />
                        </Form.Item>
                        <Form.Item label="Deskripsi" name="deskripsi" rules={[{ required: true, message: 'Deskripsi wajib diisi' }]}>
                            <Input.TextArea placeholder="Masukkan deskripsi variabel" rows={3} />
                        </Form.Item>
                        <Form.Item label="Kategori" name="kategori" rules={[{ required: true, message: 'Kategori wajib dipilih' }]}>
                            <Select placeholder="Pilih kategori">
                                <Select.Option value="Pertanian">Pertanian</Select.Option>
                                <Select.Option value="Cuaca">Cuaca</Select.Option>
                                <Select.Option value="Ekonomi">Ekonomi</Select.Option>
                                <Select.Option value="Peternakan">Peternakan</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Satuan" name="satuan" rules={[{ required: true, message: 'Satuan wajib diisi' }]}>
                            <Input placeholder="Misal: Ton, Ha, mm, Rp/Kg" />
                        </Form.Item>
                        <Form.Item label="Tipe Data" name="tipe_data" rules={[{ required: true, message: 'Tipe data wajib dipilih' }]}>
                            <Select placeholder="Pilih tipe data">
                                <Select.Option value="Angka">Angka</Select.Option>
                                <Select.Option value="Teks">Teks</Select.Option>
                                <Select.Option value="Boolean">Boolean</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="Sumber Data" name="sumber_data" rules={[{ required: true, message: 'Sumber data wajib diisi' }]}>
                            <Input placeholder="Misal: BPS, BMKG, Kementan" />
                        </Form.Item>
                        <Form.Item label="Frekuensi Pembaruan" name="frekuensi_pembaruan" rules={[{ required: true, message: 'Frekuensi pembaruan wajib dipilih' }]}>
                            <Select placeholder="Pilih frekuensi pembaruan">
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

export default InputDataVariabelPage;