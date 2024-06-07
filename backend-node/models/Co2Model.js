const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const CO2 = sequelize.define('CO2', {
    value: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  module.exports = CO2;