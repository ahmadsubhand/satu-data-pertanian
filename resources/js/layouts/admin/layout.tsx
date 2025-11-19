import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode, useEffect, useRef } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { usePage } from '@inertiajs/react';

interface AdminLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs }: AdminLayoutProps) => {
    const { flash } = usePage().props as {
        flash?: {
            success?: string;
            error?: string;
        };
    };
    
    const displayedFlashRef = useRef({ success: '', error: '' });

    useEffect(() => {
        // Cek apakah flash message berbeda dari yang sebelumnya ditampilkan
        if (flash?.success && flash.success !== displayedFlashRef.current.success) {
            toast.success(flash.success);
            displayedFlashRef.current.success = flash.success;
        }
        
        if (flash?.error && flash.error !== displayedFlashRef.current.error) {
            toast.error(flash.error);
            displayedFlashRef.current.error = flash.error;
        }
    }, [flash?.success, flash?.error]);

    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs}>
            {children}
            <Toaster position="top-right" />
        </AppLayoutTemplate>
    );
};