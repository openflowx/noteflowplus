import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <Card className="bg-muted/40 hover:bg-muted transition cursor-default">
            <CardContent className="p-5 space-y-3">
                <div className="text-primary [&>svg]:w-6 [&>svg]:h-6">{icon}</div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );
}
