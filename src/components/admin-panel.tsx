"use client";

import { Button } from '@/components/ui/button';
import { Plus, Database } from 'lucide-react';
import { seedDatabase } from '@/lib/actions';
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect, useTransition } from 'react';

export function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // This check runs only on the client-side to avoid hydration mismatches
    setIsAdmin(process.env.NEXT_PUBLIC_ADMIN_MODE === 'true');
  }, []);

  const handleSeed = () => {
    startTransition(async () => {
      const result = await seedDatabase();
      if (result.success) {
        toast({
          title: "Éxito",
          description: result.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.message,
        });
      }
    });
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
        <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Agregar
        </Button>
        <Button variant="secondary" onClick={handleSeed} disabled={isPending}>
            <Database className="mr-2 h-4 w-4" />
            {isPending ? 'Poblando...' : 'Poblar BD'}
        </Button>
    </div>
  );
}
