
import type { War } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, Link as LinkIcon, Tag, Star, Users } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WarModalProps {
  war: War;
  isOpen: boolean;
  onClose: () => void;
}

export function WarModal({ war, isOpen, onClose }: WarModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl h-[90svh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-headline text-2xl mb-2">{war.title}</DialogTitle>
          <DialogDescription className="flex items-center text-base !mt-2">
            <Calendar className="w-4 h-4 mr-2" />
            {war.period}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <div className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {war.images.map((src, index) => (
                <div key={index} className="relative aspect-video">
                  <Image src={src} alt={`${war.title} - imagen ${index + 1}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="rounded-md object-cover" data-ai-hint="historic battle"/>
                </div>
              ))}
            </div>

            <div>
              <h3 className="font-headline text-lg font-semibold mb-2">Descripción</h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{war.description}</p>
            </div>
            
            {war.turningPoints && war.turningPoints.length > 0 && (
                <div>
                    <h3 className="font-headline text-lg font-semibold mb-3 flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Puntos de Inflexión
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {war.turningPoints.map((point, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                          <AccordionTrigger>
                            <span className="flex-grow text-left">{point.title}</span>
                             {point.link && (
                              <a href={point.link} target="_blank" rel="noopener noreferrer" className="ml-4 text-primary hover:text-primary/80" onClick={(e) => e.stopPropagation()}>
                                <LinkIcon className="w-4 h-4" />
                              </a>
                            )}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {point.description}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                </div>
            )}

            {war.importantFigures && war.importantFigures.length > 0 && (
                <div>
                    <h3 className="font-headline text-lg font-semibold mb-3 flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        Nombres Importantes
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {war.importantFigures.map(figure => (
                        <Popover key={figure.name}>
                          <PopoverTrigger asChild>
                             <Badge variant="secondary" className="cursor-pointer hover:bg-primary/20">{figure.name}</Badge>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none">{figure.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {figure.nationality}
                                </p>
                              </div>
                              <div className="grid gap-2 text-sm">
                                <div className="grid grid-cols-2 items-center">
                                  <span className="text-muted-foreground">Nacimiento:</span>
                                  <span>{figure.birthDate}</span>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                  <span className="text-muted-foreground">Muerte:</span>
                                  <span>{figure.deathDate}</span>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                  <span className="text-muted-foreground">Causa:</span>
                                  <span className="truncate">{figure.causeOfDeath}</span>
                                </div>
                                <div className="grid grid-cols-2 items-center">
                                  <span className="text-muted-foreground">País:</span>
                                  <span>{figure.countryOfDeath}</span>
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      ))}
                    </div>
                </div>
            )}

            <div>
              <h3 className="font-headline text-lg font-semibold mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Etiquetas
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{war.type}</Badge>
                {war.tags.map(tag => <Badge key={tag} variant="outline">{tag}</Badge>)}
              </div>
            </div>

            <div>
              <h3 className="font-headline text-lg font-semibold mb-3 flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Fuentes
              </h3>
              <ul className="space-y-2">
                {war.sources.map((source, index) => (
                  <li key={index} className="flex items-center">
                    <LinkIcon className="w-3 h-3 mr-2 text-muted-foreground" />
                    <a href={source} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-all">
                      {source}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
