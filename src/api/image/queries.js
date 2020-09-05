const Image = require('./model');
const Like = require('../likes/model');

const imageInclude = {
  include: [Like],
};

const imageQuery = {
  async findAll({ sort, limit, offset }) {
    switch (sort) {
      case 'new': {
        return await Image.findAndCountAll({
          distinct: true,
          limit,
          offset,
          order: [['createdAt', 'desc']],
          ...imageInclude,
        });
      }
      case 'popular': {
        const images = await Image.findAndCountAll({
          distinct: true,
          limit,
          offset,
          ...imageInclude,
        });
        return images.sort((a, b) => b.likes.length - a.likes.length);
      }
      default: {
        return await Image.findAndCountAll({
          distinct: true,
          limit,
          offset,
          ...imageInclude,
        });
      }
    }
  },
  async findById(id) {
    return await Image.findByPk(id, imageInclude);
  },
  async insert(imageData) {
    return await Image.create(imageData);
  },
};

module.exports = imageQuery;
