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
    adminUser,
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
import { Database, Newspaper, Image, FileText, Video, Eye, User as UserIcon } from 'lucide-react';
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
            title: 'User',
            href: adminUser.url(),
            icon: UserIcon,
        },
        2: {
            title: 'Data',
            href: adminData.url(),
            icon: Database,
        },
        3: {
            title: 'Berita',
            href: adminBerita.url(),
            icon: Newspaper,
        },
        4: {
            title: 'Infografis',
            href: adminInfografis.url(),
            icon: Image,
        },
        5: {
            title: 'Publikasi',
            href: adminPublikasi.url(),
            icon: FileText,
        },
        6: {
            title: 'Verifikasi Data Prioritas',
            href: adminVerifikasiDataPrioritas.url(),
            icon: Eye,
        },
        7: {
            title: 'Foto/Video',
            href: adminFotoVideo.url(),
            icon: Video,
        },
        8: {
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
