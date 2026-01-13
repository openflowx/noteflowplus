"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Files,
    StickyNote,
    MessageCircleQuestion,
    FileQuestion,
    CalendarDays,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from "clsx"
import { FlowSwitcher } from "@/components/flow/flow-switcher"


const NAV_ITEMS = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Flows", url: "/flows", icon: Files },
    { title: "Notes", url: "/notes", icon: StickyNote },
    { title: "AI Q&A", url: "/questions", icon: MessageCircleQuestion },
    { title: "Quizzes", url: "/quizzes", icon: FileQuestion }
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar collapsible="icon" {...props}>
            {/* Logo */}
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <Link href="/dashboard" className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-xl bg-black text-white text-lg font-bold">
                                    N
                                </div>
                                <span className="text-lg font-semibold tracking-tight">NoteFlow+</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main navigation */}
            <SidebarContent className="px-2">
                <FlowSwitcher />
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {NAV_ITEMS.map(({ title, url, icon: Icon }) => {
                                const isActive = pathname === url

                                return (
                                    <SidebarMenuItem key={title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            tooltip={title}
                                            className={clsx(
                                                "flex items-center gap-3 rounded-xl px-4 py-3 transition-all",
                                                isActive && "font-semibold"
                                            )}
                                        >
                                            <Link href={url} className="flex items-center gap-3">
                                                <Icon className="size-5" />
                                                <span className="truncate">{title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="pt-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname === "/calendar"}
                            tooltip="Calendar"
                            className="flex items-center gap-3 rounded-xl px-4 py-3"
                        >
                            <Link href="/calendar" className="flex items-center gap-3">
                                <CalendarDays className="size-5" />
                                <span>Calendar</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    )
}
