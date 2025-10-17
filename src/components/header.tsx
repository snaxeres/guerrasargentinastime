"use client";

import { Input } from '@/components/ui/input';
import { BookMarked, Search } from 'lucide-react';
import { AdminPanel } from './admin-panel';

interface HeaderProps {
  totalConflicts: number;
  onSearchChange: (query: string) => void;
}

export function Header({ totalConflicts, onSearchChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <BookMarked className="h-6 w-6 mr-2 text-primary" />
          <h1 className="text-xl font-bold font-headline text-foreground">
            Guerras Argentinas
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex flex-1 items-center justify-end space-x-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                aria-label="Buscar por nombre o año"
                placeholder="Buscar por nombre o año..."
                className="pl-10"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-foreground">{totalConflicts}</span>
              <span className="text-sm text-muted-foreground">Conflictos</span>
            </div>
          </div>
          <AdminPanel />
        </div>
      </div>
      <div className="md:hidden p-4 border-t">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            aria-label="Buscar por nombre o año"
            placeholder="Buscar..."
            className="pl-10"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}
