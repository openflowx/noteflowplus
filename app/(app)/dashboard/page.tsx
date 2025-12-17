"use client";

import { PageHeader } from "@/components/dashboard/page-header"
import { HeroCard } from "@/components/dashboard/hero-card"
import { RecentFlows } from "@/components/dashboard/recent-flows"
import { UpcomingEvents } from "@/components/dashboard/upcoming-events"

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <PageHeader />

            <HeroCard />

            <RecentFlows />

            <UpcomingEvents />
        </div>
    );
}
