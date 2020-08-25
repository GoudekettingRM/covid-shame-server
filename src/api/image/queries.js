const Image = require('./model');
const Like = require('../likes/model');

const imageInclude = {
  include: [Like],
};

const imageQuery = {
  async findAll() {
    return await Image.findAll(imageInclude);
  },
  async findById(id) {
    return await Image.findByPk(id, imageInclude);
  },
  async insert(imageData) {
    return await Image.create(imageData);
  },
};

module.exports = imageQuery;
