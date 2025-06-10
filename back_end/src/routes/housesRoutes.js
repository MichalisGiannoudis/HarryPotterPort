const express = require('express');
const router = express.Router();
const { getHouses } = require('../controllers/house.controller');

const sleep = (ms) => new Promise(resolve => setTimeout(() => {
    resolve(0);
}, ms))


router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        const filteredHouses = await getHouses(name);
        await sleep(2000)
        res.json(filteredHouses);

    } catch (err) {
        console.error(err);
        res.status(500).json({ err: { message: JSON.stringify(err) } });
    }
});

module.exports = router;