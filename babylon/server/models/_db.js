const Sequelize = require('sequelize');

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/palace_of_music', {
    logging: false
});

module.exports = db;
