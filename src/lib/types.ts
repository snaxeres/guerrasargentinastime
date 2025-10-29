
export interface TurningPoint {
  title: string;
  description: string;
  link?: string;
}

export interface ImportantFigure {
  name: string;
  birthDate: string;
  deathDate: string;
  nationality: string;
  causeOfDeath: string;
  countryOfDeath: string;
}

export interface Battle {
  title: string;
  lugar: string;
  comandantesPatriotas: string[];
  comandantesRealistas: string[];
  desarrollo: string;
  resultado: string;
  importanciaHistorica: string;
}

export interface War {
  id: string;
  title: string;
  period: string;
  type: 'Guerra de independencia' | 'Guerra civil' | 'Guerra internacional' | 'Rebelión federal' | 'Conquista militar' | 'Campaña militar' | 'Levantamiento' | 'Golpe de estado' | 'Conflicto interno' | 'Conflicto armado';
  summary: string;
  description: string;
  turningPoints: TurningPoint[];
  importantFigures: ImportantFigure[];
  battles: Battle[];
  images: string[];
  sources: string[];
  tags: string[];
  latlng: {
    lat: number;
    lng: number;
  };
}
