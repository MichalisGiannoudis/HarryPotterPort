const { housesCache } = require('../cache/house.cache');

async function getHouses(name) {
  let filteredHouses = housesCache;

  if (name) {
    filteredHouses = housesCache.filter(h =>
      h.name.toLowerCase().includes(name.toLowerCase())
    );
  }
  return filteredHouses
}

module.exports = { getHouses };