import type { War } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Calendar } from 'lucide-react';

interface WarCardProps {
  war: War;
  onClick: () => void;
}

export function WarCard({ war, onClick }: WarCardProps) {
  return (
    <Card 
      className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer border-2 bg-card/80 border-transparent hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      tabIndex={0}
      role="button"
      aria-label={`Ver detalles de ${war.title}`}
    >
      <CardHeader className="p-4">
        <div className="relative aspect-video w-full mb-4">
          <Image
            src={war.images[0] || 'https://picsum.photos/seed/1/400/225'}
            alt={`Ilustración de ${war.title}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-md object-cover"
            data-ai-hint="historic battle"
          />
        </div>
        <CardTitle className="font-headline text-lg leading-tight">{war.title}</CardTitle>
        <CardDescription className="flex items-center text-sm pt-1">
          <Calendar className="w-4 h-4 mr-2" />
          {war.period}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">{war.summary}</p>
      </CardContent>
    </Card>
  );
}
