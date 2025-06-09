const app = require('./src/app');
const { fetchHousesData } = require('./src/controllers/fetchHousesController');

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () =>{
  await fetchHousesData();
  console.log(`Server running on http://localhost:${PORT}`);
});