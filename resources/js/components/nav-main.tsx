import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight, Users, Menu as MenuIcon, Settings, UserRoundCog } from 'lucide-react';
import * as React from 'react';

// Define submenu items for User menu
const userSubmenuItems = [
    { title: 'Daftar User', href: '/admin/user/daftar-user', icon: Users },
    { title: 'Manajemen Menu', href: '/admin/user/manajemen-menu', icon: MenuIcon },
    { title: 'Manajemen Submenu', href: '/admin/user/manajemen-submenu', icon: Settings },
    { title: 'Manajemen Role', href: '/admin/user/manajemen-role', icon: UserRoundCog },
];

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    
    // Memeriksa apakah URL saat ini adalah submenu dari user
    const isUserSubmenuActive = page.url.startsWith('/admin/user/') && page.url !== '/admin/user';
    
    const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
        // Jika sedang di halaman submenu user, buka menu User otomatis
        if (isUserSubmenuActive) {
            return new Set(['0']); // '0' adalah key untuk menu User (item pertama)
        }
        return new Set();
    });

    const isActive = (href: string) => {
        return page.url.startsWith(resolveUrl(href));
    };

    const toggleItem = (key: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });
    };

    const renderNavItem = (item: NavItem, key: string | number) => {
        // Check specifically for the User menu by matching its href
        const isAdminUserMenu = item.href === '/admin/user';
        const itemKey = String(key);
        const isOpen = openItems.has(itemKey) || (isAdminUserMenu && isUserSubmenuActive);

        if (isAdminUserMenu) {
            // Render User menu as a collapsible parent with submenu
            return (
                <SidebarMenuItem key={key}>
                    <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href) || isUserSubmenuActive}
                        onClick={() => toggleItem(itemKey)}
                        tooltip={{ children: item.title }}
                    >
                        <div className="flex w-full items-center justify-between hover:bg-green-100 dark:hover:bg-green-900 transition-colors p-2 rounded-md">
                            <div className="flex items-center gap-2">
                                {item.icon && typeof item.icon === 'function' && (
                                    <item.icon className="h-4 w-4" />
                                )}
                                <span>{item.title}</span>
                            </div>
                            <ChevronRight
                                className={`ml-auto h-4 w-4 transition-transform duration-200 ${
                                    isOpen ? 'rotate-90' : ''
                                }`}
                            />
                        </div>
                    </SidebarMenuButton>
                    <SidebarMenuSub className="ml-0 border-l-0 px-0 py-0">
                        {userSubmenuItems.map((subItem, subIndex) => (
                            <SidebarMenuSubItem key={`${key}-sub-${subIndex}`}>
                                <SidebarMenuSubButton
                                    asChild
                                    isActive={page.url === resolveUrl(subItem.href)}
                                    className="hover:bg-green-100 dark:hover:bg-green-900 data-[active=true]:bg-green-100 data-[active=true]:dark:bg-green-900 transition-colors p-2 rounded-md"
                                >
                                    <Link href={subItem.href} prefetch>
                                        {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                        <span>{subItem.title}</span>
                                    </Link>
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        ))}
                    </SidebarMenuSub>
                </SidebarMenuItem>
            );
        } else {
            // Render regular menu item without submenu
            return (
                <SidebarMenuItem key={key}>
                    <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href)}
                        tooltip={{ children: item.title }}
                    >
                        <Link href={item.href} prefetch className="flex items-center gap-2 hover:bg-green-100 dark:hover:bg-green-900 transition-colors p-2 rounded-md">
                            {item.icon && typeof item.icon === 'function' && (
                                <item.icon className="h-4 w-4" />
                            )}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            );
        }
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => renderNavItem(item, index))}
            </SidebarMenu>
        </SidebarGroup>
    );
}