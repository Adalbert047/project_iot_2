const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('iot', 'root', '@Ak47gamer', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;