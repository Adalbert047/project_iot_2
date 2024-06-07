const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Hum = sequelize.define('Hum', {
    value: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  module.exports = Hum;