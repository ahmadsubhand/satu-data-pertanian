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
} from '@/routes';
import { User, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Database, Newspaper, Image, FileText, Video, Eye, User as UserIcon, Users, Menu as MenuIcon, Settings, UserRoundCog, Calendar as CalendarOutlined } from 'lucide-react';
import AppLogo from './app-logo';
import { usePage } from '@inertiajs/react';
import { type SharedData } from '@/types';

// Admin navigation items that will be shown based on user permissions
export const getAdminNavItems = (user: User): NavItem[] => {
    const items: NavItem[] = []
    const accessibleMenus = user.user_role?.user_menus ?? []

    // Mapping ID → NavItem (dengan helper URL)
    const menuMap: Record<number, NavItem> = {
        1: {
            title: 'User Management',
            href: '/admin/manajemen-user',
            icon: UserIcon,
            // This should be a direct link, no submenu
        },
        2: {
            title: 'User',
            href: '/admin/user',
            icon: UserIcon,
            submenu: [
                { title: 'Daftar User', href: '/admin/user/daftar-user', icon: Users },
                { title: 'Manajemen Menu', href: '/admin/user/manajemen-menu', icon: MenuIcon },
                { title: 'Manajemen Submenu', href: '/admin/user/manajemen-submenu', icon: Settings },
                { title: 'Manajemen Role', href: '/admin/user/manajemen-role', icon: UserRoundCog },
            ]
        },
        3: {
            title: 'Data',
            href: adminData.url(),
            icon: Database,
            submenu: [
                { title: 'Input Data', href: '/admin/data/input-data', icon: MenuIcon },
                { title: 'Input Daftar Data', href: '/admin/data/input-daftar-data', icon: MenuIcon },
                { title: 'Input Data Variabel', href: '/admin/data/input-data-variabel', icon: MenuIcon },
                { title: 'Input Data Indikator', href: '/admin/data/input-data-indikator', icon: MenuIcon },
                { title: 'Input Link Website', href: '/admin/data/input-link-website', icon: MenuIcon },
            ]
        },
        4: {
            title: 'Berita',
            href: adminBerita.url(),
            icon: Newspaper,
        },
        5: {
            title: 'Infografis',
            href: adminInfografis.url(),
            icon: Image,
        },
        6: {
            title: 'Publikasi',
            href: adminPublikasi.url(),
            icon: FileText,
        },
        7: {
            title: 'Verifikasi Data Prioritas',
            href: adminVerifikasiDataPrioritas.url(),
            icon: Eye,
        },
        8: {
            title: 'Media',
            href: adminFotoVideo.url(),
            icon: Video,
        },
        9: {
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
    const adminNavItems = getAdminNavItems(auth.user);

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
