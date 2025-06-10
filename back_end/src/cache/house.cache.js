const CACHE_URL = process.env.CACHE_URL;

let housesCache = [];

async function fetchHousesData() {
  try {
    const response = await fetch(CACHE_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    housesCache.push(...data);

  } catch (error) {
    console.error('Error fetching houses data:', error);
    housesCache = [];
  }
}

module.exports = { housesCache, fetchHousesData };