import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Button, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import PublicLayout from '@/layouts/PublicLayout';

export default function VariablesPage({}: PageProps) {
    const [isModalVisible, setIsModalVisible] = useState(true);

    const handleGoHome = () => {
        setIsModalVisible(false);
        router.get('/');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        router.get('/');
    };

    return (
        <PublicLayout title="Variabel - Satu Data Pertanian">
            <Head title="Variabel - Satu Data Pertanian" />
            <div style={{ padding: '20px', textAlign: 'center', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h1 style={{ color: '#2d5036' }}>Halaman Variabel</h1>
                    <p>Halaman ini sedang dalam tahap pengembangan.</p>
                </div>
            </div>

            <Modal
                title="Pemberitahuan"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleGoHome}>
                        Kembali Ke Beranda
                    </Button>
                ]}
                centered
            >
                <p>Halaman Sedang Dalam Tahap Pengembangan</p>
            </Modal>
        </PublicLayout>
    );
}