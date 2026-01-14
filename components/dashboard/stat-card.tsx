import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    bg: string;
    iconColor: string;
}

export function StatCard({ icon: Icon, label, value, bg, iconColor }: Readonly<StatCardProps>) {
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
    )
}
