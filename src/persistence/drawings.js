'use strict';
const Sequelize = require('sequelize');
const sequelize = require('./db');

const drawing = sequelize.define('drawing', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  user: {
    type: Sequelize.STRING,
  },
  annotations: {
    type: Sequelize.JSON,
    defaultValue: [],
  },
});

// user.beforeCreate(async (user, options) => {
//   const hashedPassword = await bcrypt.hash(user.password, 10);
//   user.password = hashedPassword;
// });

module.exports = drawing;
