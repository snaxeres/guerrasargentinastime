
export interface TurningPoint {
  title: string;
  description: string;
}

export interface War {
  id: string;
  title: string;
  period: string;
  type: 'Guerra de independencia' | 'Guerra civil' | 'Guerra internacional' | 'Rebelión federal' | 'Conquista militar' | 'Campaña militar' | 'Levantamiento' | 'Golpe de estado' | 'Conflicto interno' | 'Conflicto armado';
  summary: string;
  description: string;
  turningPoints: TurningPoint[];
  importantFigures: string[];
  images: string[];
  sources: string[];
  tags: string[];
  latlng: {
    lat: number;
    lng: number;
  };
}
