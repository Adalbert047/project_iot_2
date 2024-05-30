const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Temp = sequelize.define('Temp', {
    value: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  
  module.exports = Temp;