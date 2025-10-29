
import type { War } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, Link as LinkIcon, Tag, Star, Users, Swords } from 'lucide-react';
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
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface WarModalProps {
  war: War;
  isOpen: boolean;
  onClose: () => void;
}

export function WarModal({ war, isOpen, onClose }: WarModalProps) {
  const mainSource = war.sources.length > 0 ? war.sources[0] : null;

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

            {war.battles && war.battles.length > 0 && (
                <div>
                    <h3 className="font-headline text-lg font-semibold mb-3 flex items-center">
                        <Swords className="w-4 h-4 mr-2" />
                        Batallas y Combates
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {war.battles.map((battle, index) => (
                        <AccordionItem value={`battle-${index}`} key={index}>
                          <AccordionTrigger>{battle.title}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground space-y-4">
                            <div className="space-y-2">
                                <p><strong className="text-foreground">Lugar:</strong> {battle.lugar}</p>
                                <p><strong className="text-foreground">Resultado:</strong> {battle.resultado}</p>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h5 className="font-semibold text-foreground mb-2">Comandantes Patriotas</h5>
                                    <ul className="list-disc list-inside">
                                        {battle.comandantesPatriotas.map(c => <li key={c}>{c}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-foreground mb-2">Comandantes Realistas</h5>
                                     <ul className="list-disc list-inside">
                                        {battle.comandantesRealistas.map(c => <li key={c}>{c}</li>)}
                                    </ul>
                                </div>
                            </div>
                             <Separator />
                            <div>
                               <h5 className="font-semibold text-foreground mb-2">Desarrollo</h5>
                               <p>{battle.desarrollo}</p>
                            </div>
                            <div>
                               <h5 className="font-semibold text-foreground mb-2">Importancia Histórica</h5>
                               <p>{battle.importanciaHistorica}</p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                </div>
            )}
            
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

            {mainSource && (
              <div className="pt-4">
                <h3 className="font-headline text-lg font-semibold mb-3 flex items-center">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Fuente Principal
                </h3>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href={mainSource} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="w-4 h-4 mr-2" />
                        Leer más en Wikipedia
                    </a>
                </Button>
              </div>
            )}
            
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
