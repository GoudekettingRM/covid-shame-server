const Sequelize = require('sequelize');
const db = require('../../db');

const Image = db.define('image', {
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    isUrl: true,
  },
  authorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  cloudinaryId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Image;
