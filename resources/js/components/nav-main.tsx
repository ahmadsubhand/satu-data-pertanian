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
import { ChevronRight } from 'lucide-react';
import * as React from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    const [openItems, setOpenItems] = React.useState<Set<string>>(() => {
        const activeSet = new Set<string>();

        // Check each item to see if we should open its submenu based on current URL
        items.forEach((item, index) => {
            if (item.submenu && item.submenu.some(subItem =>
                page.url.startsWith(resolveUrl(subItem.href)) && page.url !== resolveUrl(item.href)
            )) {
                activeSet.add(String(index));
            }
        });

        return activeSet;
    });

    // Update openItems when page URL changes
    React.useEffect(() => {
        const newActiveSet = new Set<string>();

        items.forEach((item, index) => {
            if (item.submenu && item.submenu.some(subItem =>
                page.url.startsWith(resolveUrl(subItem.href)) && page.url !== resolveUrl(item.href)
            )) {
                newActiveSet.add(String(index));
            }
        });

        // Only update if the set has changed to prevent unnecessary re-renders
        if (newActiveSet.size !== openItems.size ||
            ![...newActiveSet].every(item => openItems.has(item)) ||
            ![...openItems].every(item => newActiveSet.has(item))) {
            setOpenItems(newActiveSet);
        }
    }, [page.url, items]);

    const isActive = (href: string | any) => {
        return page.url.startsWith(resolveUrl(href));
    };

    const toggleItem = (key: string) => {
        setOpenItems(prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key); // Close submenu
            } else {
                newSet.add(key); // Open submenu
            }
            return newSet;
        });
    };

    const renderNavItem = (item: NavItem, key: string | number) => {
        const hasSubmenu = item.submenu && item.submenu.length > 0;

        const itemKey = String(key);
        const isOpen = openItems.has(itemKey);

        if (hasSubmenu) {
            // Check if any submenu item is active
            const isSubmenuActive = item.submenu?.some(subItem =>
                page.url.startsWith(resolveUrl(subItem.href)) && page.url !== resolveUrl(item.href)
            ) || false;

            // Render menu as a collapsible parent with submenu
            return (
                <SidebarMenuItem key={key}>
                    <SidebarMenuButton
                        asChild
                        isActive={isActive(item.href) || isSubmenuActive}
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
                    {isOpen && (
                        <SidebarMenuSub className="ml-0 border-l-0 px-0 py-0">
                            {item.submenu?.map((subItem, subIndex) => (
                                <SidebarMenuSubItem key={`${key}-sub-${subIndex}`}>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={page.url === resolveUrl(subItem.href)}
                                        className="hover:bg-green-100 dark:hover:bg-green-900 data-[active=true]:bg-green-100 data-[active=true]:dark:bg-green-900 transition-colors p-2 rounded-md"
                                    >
                                        <Link href={subItem.href} prefetch>
                                            {subItem.icon && typeof subItem.icon === 'function' && <subItem.icon className="h-4 w-4" />}
                                            <span>{subItem.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    )}
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