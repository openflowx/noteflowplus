"use client"

import {
    Bell,
    User,
    LogIn,
    UserPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

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

                <div className="flex items-center">
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    userButtonAvatarBox: "h-10 w-10",
                                    userButtonTrigger: "rounded-full focus:shadow-none"
                                }
                            }}
                        />
                    </SignedIn>

                    <SignedOut>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="h-10 w-10 rounded-full bg-gray-100 p-0 hover:bg-gray-200 outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-gray-100 text-gray-400">
                                            <User className="h-5 w-5" />
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                    <SignInButton mode="modal">
                                        <button className="flex w-full items-center p-1 cursor-pointer">
                                            <LogIn className="mr-2 h-4 w-4" />
                                            <span>Sign In</span>
                                        </button>
                                    </SignInButton>
                                </DropdownMenuItem>

                                <DropdownMenuItem asChild>
                                    <SignUpButton mode="modal">
                                        <button className="flex w-full items-center p-1 cursor-pointer">
                                            <UserPlus className="mr-2 h-4 w-4" />
                                            <span>Sign Up</span>
                                        </button>
                                    </SignUpButton>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}
