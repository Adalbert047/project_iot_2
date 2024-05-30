const Temp = require('../models/TempModel')


const postTemp = async (req, res) => {
    try {
        const { value , date } = req.body;
        const temp = await Temp.create({ value, date});
        res.status(201).json(temp);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getTemps = async (req, res) => {
    try {
      const temps = await Temp.findAll();
      res.status(200).json(temps);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = { postTemp, getTemps };
