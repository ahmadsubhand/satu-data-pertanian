import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    adminData,
    adminBerita,
    adminInfografis,
    adminPublikasi,
    adminVerifikasiDataPrioritas,
    adminFotoVideo,
    adminVerifikasiAllData,
    home,
    adminUserList,
    dashboard,
    adminMenuManagement,
    adminSubmenuManagement,
    adminRoleManagement,
    adminDataInput,
    adminDataInputDaftar,
    adminDataInputVariabel,
    adminDataInputIndikator,
    adminDataInputLink,
} from '@/routes';
import { User, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Database, Newspaper, Image, FileText, Video, Eye, User as UserIcon, Users, Menu as MenuIcon, Settings, UserRoundCog } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { useEffect } from 'react';

// Admin navigation items that will be shown based on user permissions
export const getAdminNavItems = (user: User): NavItem[] => {
    const items: NavItem[] = []
    const accessibleMenus = user.user_role?.user_menus ?? []

    // Mapping ID → NavItem (dengan helper URL)
    const menuMap: Record<number, NavItem> = {
        // 1: {
        //     title: 'User Management',
        //     href: dashboard.url(),
        //     icon: UserIcon,
        //     // This should be a direct link, no submenu
        // },
        1: {
            id: 1,
            title: 'User',
            href: dashboard.url(),
            icon: UserIcon,
            submenu: [
                { title: 'Daftar User', href: adminUserList.url(), icon: Users },
                { title: 'Manajemen Menu', href: adminMenuManagement.url(), icon: MenuIcon },
                { title: 'Manajemen Submenu', href: adminSubmenuManagement.url(), icon: Settings },
                { title: 'Manajemen Role', href: adminRoleManagement.url(), icon: UserRoundCog },
            ]
        },
        2: {
            id: 2,
            title: 'Data',
            href: dashboard.url(),
            icon: Database,
            submenu: [
                { title: 'Input Data', href: adminDataInput.url(), icon: MenuIcon },
                { title: 'Input Daftar Data', href: adminDataInputDaftar.url(), icon: MenuIcon },
                { title: 'Input Data Variabel', href: adminDataInputVariabel.url(), icon: MenuIcon },
                { title: 'Input Data Indikator', href: adminDataInputIndikator.url(), icon: MenuIcon },
                { title: 'Input Link Website', href: adminDataInputLink.url(), icon: MenuIcon },
            ]
        },
        3: {
            id: 3,
            title: 'Berita',
            href: adminBerita.url(),
            icon: Newspaper,
        },
        4: {
            id: 4,
            title: 'Infografis',
            href: adminInfografis.url(),
            icon: Image,
        },
        5: {
            id: 5,
            title: 'Publikasi',
            href: adminPublikasi.url(),
            icon: FileText,
        },
        6: {
            id: 6,
            title: 'Verifikasi Data Prioritas',
            href: adminVerifikasiDataPrioritas.url(),
            icon: Eye,
        },
        7: {
            id: 7,
            title: 'Foto/Video',
            href: adminFotoVideo.url(),
            icon: Video,
        },
        8: {
            id: 8,
            title: 'Verifikasi All Data',
            href: adminVerifikasiAllData.url(),
            icon: Eye,
        },
    }

    // Hanya tampilkan menu yang user punya aksesnya
    accessibleMenus.forEach((menu) => {
        const nav = menuMap[menu.id]
        if (nav) items.push(nav)
    })

    return items
}

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const adminNavItems = getAdminNavItems(auth.user).sort((a, b) => a.id - b.id);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={home()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                {adminNavItems.length > 0 && (
                    <NavMain items={adminNavItems} />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
