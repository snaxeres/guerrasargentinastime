"use client";

import { useState } from 'react';
import type { War } from '@/lib/types';
import { WarCard } from './war-card';
import { WarModal } from './war-modal';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export function Timeline({ wars }: { wars: War[] }) {
  const [selectedWar, setSelectedWar] = useState<War | null>(null);

  const handleOpenModal = (war: War) => {
    setSelectedWar(war);
  };

  const handleCloseModal = () => {
    setSelectedWar(null);
  };

  return (
    <section aria-labelledby="timeline-heading" className="w-full">
      <h2 id="timeline-heading" className="sr-only">Línea de Tiempo de Conflictos</h2>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {wars.map((war, index) => (
            <CarouselItem key={war.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="h-full p-1">
                <WarCard war={war} onClick={() => handleOpenModal(war)} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12 hidden sm:flex" />
        <CarouselNext className="mr-12 hidden sm:flex" />
      </Carousel>

      {selectedWar && (
        <WarModal war={selectedWar} isOpen={!!selectedWar} onClose={handleCloseModal} />
      )}
    </section>
  );
}
