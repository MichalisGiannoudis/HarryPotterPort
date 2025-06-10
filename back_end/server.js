require('dotenv').config();

const app = require('./src/app');
const { fetchHousesData } = require('./src/cache/house.cache');

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () =>{
  await fetchHousesData();
  console.log(`Server running on http://localhost:${PORT}`);
});