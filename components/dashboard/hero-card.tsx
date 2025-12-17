"use client"

import {
    Plus,
    Clock,
    CheckCircle2,
    Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { StatCard } from "./stat-card"

export function HeroCard() {
    return (
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
    )
}
