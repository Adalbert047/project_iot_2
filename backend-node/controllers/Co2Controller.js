const CO2 = require('../models/Co2Model')


const postCo2 = async (req, res) => {
    try {
        const { value , date } = req.body;
        const Co2 = await CO2.create({ value, date});
        res.status(201).json(Co2);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCo2s = async (req, res) => {
    try {
      const Co2s = await CO2.findAll();
      res.status(200).json(Co2s);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


module.exports = { postCo2, getCo2s };
