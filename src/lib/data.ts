import type { War } from './types';
import warsData from '@/data/wars.sample.json';

// This function simulates fetching data from a database.
// For the MVP, it synchronously reads from a local JSON file.
// In a real application, this would be an async function that queries Firestore.
export function getWars(): War[] {
  // The assertion `as War[]` tells TypeScript to trust that the data
  // from the JSON file matches the War interface.
  return warsData.wars as War[];
}
