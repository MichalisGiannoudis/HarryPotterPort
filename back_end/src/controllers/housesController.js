const { housesCache } = require('./fetchHousesController');

function getHouses(req, res)
{
  const { name } = req.query;
  let filteredHouses = housesCache;

  if (name) 
  {
    filteredHouses = housesCache.filter(h =>
      h.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  res.json(filteredHouses);
}

module.exports = { getHouses };