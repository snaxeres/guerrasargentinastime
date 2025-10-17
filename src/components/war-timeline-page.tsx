"use client";

import { useState, useMemo } from 'react';
import type { War } from '@/lib/types';
import { Header } from '@/components/header';
import { Timeline } from '@/components/timeline';
import { AboutSection } from '@/components/about-section';

export function WarTimelinePage({ wars }: { wars: War[] }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWars = useMemo(() => {
    if (!searchQuery) {
      return wars;
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return wars.filter(war =>
      war.title.toLowerCase().includes(lowercasedQuery) ||
      war.period.includes(searchQuery) ||
      war.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
    );
  }, [wars, searchQuery]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header totalConflicts={wars.length} onSearchChange={setSearchQuery} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AboutSection />
        {filteredWars.length > 0 ? (
          <Timeline wars={filteredWars} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-headline">No se encontraron resultados</h2>
            <p className="text-muted-foreground">Intenta con otro término de búsqueda.</p>
          </div>
        )}
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} Guerras Argentinas. Un proyecto de visualización histórica.</p>
      </footer>
    </div>
  );
}
