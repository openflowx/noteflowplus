"use client"

import {
    Bell,
    Settings,
    LogOut,
    User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function PageHeader() {
    return (
        <header className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">
                Dashboard
            </h1>

            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-white shadow-sm hover:bg-gray-50"
                >
                    <Bell className="h-5 w-5 text-gray-600" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="h-10 w-10 rounded-full bg-blue-100 p-0 hover:bg-blue-200"
                        >
                            <Avatar className="h-10 w-10">
                                <AvatarImage src="" />
                                <AvatarFallback className="bg-blue-100 text-blue-600 font-semibold">
                                    JS
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" /> Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" /> Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 focus:text-red-500">
                            <LogOut className="mr-2 h-4 w-4" /> Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
