"use client";

import {
    Bell,
    Plus,
    Clock,
    CheckCircle2,
    Calendar,
    Settings,
    LogOut,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


function PageHeader() {
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
    );
}

function StatCard({ icon: Icon, label, value, bg, iconColor }: { icon: any, label: string, value: string, bg: string, iconColor: string }) {
    return (
        <Card className={`flex flex-col justify-between border-none p-6 ${bg}`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {label}
                </p>
                <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </Card>
    );
}

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <PageHeader />

            {/* Hero */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card className="flex flex-col justify-between border-none bg-white p-6 lg:col-span-1">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Jump back in</h2>
                        <p className="text-sm text-gray-500">
                            Ready to continue where you left off?
                        </p>
                    </div>

                    <div className="mt-6 flex flex-col gap-3">
                        <Button className="h-11 justify-between text-sm">
                            New Flow <Plus className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="h-11 justify-between text-sm">
                            New Note <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </Card>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-2">
                    <StatCard
                        icon={Clock}
                        label="Time Studied"
                        value="24h 30m"
                        bg="bg-indigo-50"
                        iconColor="text-indigo-500"
                    />
                    <StatCard
                        icon={CheckCircle2}
                        label="Current Streak"
                        value="3 days"
                        bg="bg-yellow-50"
                        iconColor="text-yellow-600"
                    />
                    <StatCard
                        icon={Calendar}
                        label="Events"
                        value="2 upcoming"
                        bg="bg-white"
                        iconColor="text-gray-500"
                    />
                </div>
            </div>

            {/* Recent Flows */}
            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Recent Flows</h2>
                    <Button variant="link" className="text-sm">View all</Button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Card
                            key={i}
                            className="cursor-pointer border-none transition hover:shadow-md"
                        >
                            <div className="aspect-4/3 rounded-xl bg-gray-200 p-4 flex items-end">
                                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">
                                    Biology
                                </span>
                            </div>
                            <div className="p-3">
                                <h3 className="text-sm font-semibold">Flow {i}</h3>
                                <p className="mt-1 text-xs text-gray-500">10 notes • 2h ago</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="space-y-4">
                <h2 className="text-lg font-semibold">Upcoming Events</h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {["Calculus Exam", "Study Group", "Project Due", "Physics Quiz"].map(
                        (title, i) => (
                            <Card
                                key={i}
                                className="flex items-center gap-4 border-none p-4"
                            >
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{title}</p>
                                    <p className="text-xs text-gray-500">Soon™</p>
                                </div>
                            </Card>
                        )
                    )}
                </div>
            </section>
        </div>
    );
}
