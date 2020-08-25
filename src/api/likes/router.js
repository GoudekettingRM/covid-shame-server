const { Router } = require('express');
const Like = require('./model');
const { auth } = require('../auth/authMiddleware');

const router = Router();

router.post('/', auth, async (req, res, next) => {
  try {
    const { imageId } = req.body;
    const imageAlreadyLiked = await Like.findOne({
      where: {
        userId: req.user.id,
        imageId,
      },
    });

    if (imageAlreadyLiked) {
      return res.status(403).json({
        message:
          "You have already liked this image, you can't like the same image more than once.",
      });
    }

    const insertedLike = await Like.create({ imageId, userId: req.user.id });

    return res.json({
      message: 'Like received!',
      likeData: insertedLike,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const likeToDelete = await Like.findByPk(id);

    if (!likeToDelete) return next();

    if (likeToDelete.userId === req.user.id) {
      await Like.destroy({ where: { id: likeToDelete.id } });
      return res.json({
        message: 'Success',
      });
    } else {
      return res
        .status(403)
        .json({ message: 'You have no permission to remove this like.' })
        .end();
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
