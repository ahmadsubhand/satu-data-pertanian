import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    id: number;
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
    submenu?: {
        title: string;
        href: NonNullable<InertiaLinkProps['href']>;
        icon?: LucideIcon | null;
    }[];
}

export interface MenuItem {
    id: number;
    title: string;
    description: string;
    icon: ReactNode;
    link: string;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: unknown;
}

export interface UserMenu {
    id: number;
    menu: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface User {
    id: number;
    nama_lengkap: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    hp: string;
    nip: string;
    unit_kerja: string;
    username: string;
    created_at: string;
    updated_at: string;
    user_role_id?: number;
    user_role: {
        id: number;
        role: string;
        created_at: string;
        updated_at: string;
        user_menus: UserMenu[];
    };
    eselon: {
        id: number;
        created_at: string;
        updated_at: string;
        value: string;
    }
    [key: string]: unknown; // This allows for additional properties...
}

export type UserType = User;

export interface PageProps {
    auth?: {
        user: UserType;
    };
    errors?: Record<string, string>;
    [key: string]: unknown;
}
