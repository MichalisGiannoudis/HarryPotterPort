const { getHouses } = require('./house.controller');
const { housesCache } = require('../cache/house.cache');

jest.mock('../cache/house.cache', () => ({
  housesCache: [
    { name: 'Gryffindor', founder: 'Godric Gryffindor' },
    { name: 'Hufflepuff', founder: 'Helga Hufflepuff' },
    { name: 'Ravenclaw', founder: 'Rowena Ravenclaw' },
    { name: 'Slytherin', founder: 'Salazar Slytherin' }
  ]
}));

describe('House Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getHouses', () => {
    test('should return all houses when no name filter is provided', async () => {
      const result = await getHouses();
      expect(result).toHaveLength(4);
      expect(result).toEqual(housesCache);
    });

    test('should filter houses by name (case insensitive)', async () => {
      const result = await getHouses('gryff');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Gryffindor');
    });

    test('should return empty array when no houses match the filter', async () => {
      const result = await getHouses('nonexistent');
      expect(result).toHaveLength(0);
    });

    test('should handle uppercase search term', async () => {
      const result = await getHouses('RAVENCLAW');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Ravenclaw');
    });

    test('should handle partial matches', async () => {
      const result = await getHouses('uff');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Hufflepuff');
    });
  });
}); 