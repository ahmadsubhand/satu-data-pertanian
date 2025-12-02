import { PageProps } from '@/types';
import { Head, Link as InertiaLink } from '@inertiajs/react';
import { Button, Card, Col, Row, Table, Tag, Typography } from 'antd';
import PublicLayout from '@/layouts/PublicLayout';
import React from 'react';
import styles from './Link.module.css';

const { Title } = Typography;

interface LinkItem {
    id: number;
    nama: string;
    link: string;
}

interface LinkPageProps extends PageProps {
    links: LinkItem[];
}

const LinkPage: React.FC<LinkPageProps> = ({ links = [] }) => {
    const columns = [
        {
            title: 'No',
            key: 'index',
            render: (text: any, record: LinkItem, index: number) => (
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 font-bold shadow-sm">
                    {index + 1}
                </div>
            ),
            width: 70,
        },
        {
            title: 'Nama',
            dataIndex: 'nama',
            key: 'nama',
            render: (nama: string) => (
                <span className="font-medium text-gray-800">{nama}</span>
            ),
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: (link: string) => (
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 hover:underline break-all flex items-center"
                >
                    {link}
                </a>
            ),
        }
    ];

    return (
        <PublicLayout title="Referensi Link - Satudata Pertanian">
            <Head title="Referensi Link - Satudata Pertanian" />

            <div className="space-y-6">
                <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 rounded-lg shadow-xl text-white"
                    style={{
                        background: 'linear-gradient(135deg, #2d5036 0%, #4CAF50 100%)',
                    }}
                >
                    <Title level={2} className="text-2xl font-bold mb-2 !text-white">
                        Referensi Link
                    </Title>
                    <p className="text-green-100">
                        Kumpulan tautan penting terkait Satudata Pertanian dan program lainnya
                    </p>
                </div>

                <Card className="shadow-lg rounded-lg overflow-hidden border-0">
                    <Table
                        dataSource={links}
                        columns={columns}
                        rowKey="id"
                        pagination={{
                            pageSize: 10,
                            showSizeChanger: true,
                            pageSizeOptions: ['10', '20', '50'],
                            className: "px-4 py-3"
                        }}
                        tableLayout="fixed"
                        rowClassName="hover:bg-green-50 transition-colors duration-200"
                        className={styles.linksTable}
                        locale={{
                            emptyText: (
                                <div className="py-8 text-center">
                                    <div className="text-gray-400 text-5xl mb-2">🔗</div>
                                    <p className="text-gray-500">Tidak ada referensi link yang tersedia</p>
                                </div>
                            )
                        }}
                    />
                </Card>
            </div>
        </PublicLayout>
    );
};

export default LinkPage;