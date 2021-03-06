const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL);

sequelize.sync({
  force: false,
});

module.exports = sequelize;
