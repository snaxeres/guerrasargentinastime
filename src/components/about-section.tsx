import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export function AboutSection() {
    const historicalNote = "Desde 1816 hasta la actualidad, se registran más de 30 conflictos que incluyen guerras internacionales, guerras civiles, rebeliones y campañas militares internas. La última guerra internacional en la que participó Argentina fue la Guerra de las Malvinas (1982).";

    return (
        <Card className="mb-8 bg-card/80">
            <CardHeader className="flex-row items-center gap-4 space-y-0">
                <Info className="w-6 h-6 text-primary" />
                <CardTitle className="font-headline text-xl">Acerca del proyecto</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    {historicalNote}
                </p>
            </CardContent>
        </Card>
    );
}
