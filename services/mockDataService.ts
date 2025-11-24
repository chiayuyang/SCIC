import { TravelAdvisory } from '../modules/types';

const SIMULATED_DELAY = 1200; // in milliseconds

export const fetchTravelAdvisories = async (): Promise<TravelAdvisory[]> => {
  console.log('Fetching travel advisory data from file...');
  try {
    // Ensure path is relative to the root public directory
    const response = await fetch('./data/TravelAdvisory.json');
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Travel advisory data fetched.');
    return data;
  } catch(e) {
      console.error("Failed to fetch travel advisories", e);
      // Return an empty array in case of error to avoid crashing the UI
      return [];
  }
};
