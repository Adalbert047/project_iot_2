const Hum = require('../models/HumModel')


const postHum = async (req, res) => {
    try {
        const { value , date } = req.body;
        const hum = await Hum.create({ value, date});
        res.status(201).json(hum);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getHums = async (req, res) => {
    try {
      const hums = await Hum.findAll();
      res.status(200).json(hums);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = { postHum, getHums };
