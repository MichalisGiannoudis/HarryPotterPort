let housesCache = [];

async function fetchHousesData() {
  try {
    const response = await fetch('https://wizard-world-api.herokuapp.com/houses');

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