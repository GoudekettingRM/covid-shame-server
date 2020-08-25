const { Router } = require('express');
const cloudinary = require('cloudinary');
const imageQuery = require('./queries');
const { auth } = require('../auth/authMiddleware');

const router = Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.get('/', async (req, res, next) => {
  try {
    const images = await imageQuery.findAll();
    return res.json({
      message: "Here's all the images",
      images,
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const image = await imageQuery.findById(id);
    if (!image) return next();
    return res.json({
      message: "Here's the image!",
      imageData: image,
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/', auth, async (req, res, next) => {
  try {
    console.log('req.body', req.body);
    const imageFile = Object.values(req.files)[0];
    const { path } = imageFile;

    const nameWithoutExt = req.body.name.split('.').slice(0, -1).join('.');

    const imageData = await cloudinary.v2.uploader.upload(path, {
      folder: '/shame/',
      use_filename: true,
      public_id: nameWithoutExt,
      unique_filename: false,
    });
    console.log('imageData', {
      authorId: parseInt(req.body.authorId),
      location: req.body.location,
      imageUrl: imageData.url,
      cloudinaryId: nameWithoutExt,
    });
    const image = await imageQuery.insert({
      authorId: parseInt(req.body.authorId),
      location: req.body.location,
      imageUrl: imageData.url,
      cloudinaryId: nameWithoutExt,
    });
    console.log('image', image);
    return res.json({ image });
  } catch (error) {
    return next(error);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const { id } = req.params;

    const image = await Images.findByPk(id);

    if (!image) return next();

    const { result } = await cloudinary.v2.uploader.destroy(
      `shame/${image[0].cloudinaryId}`,
    );

    if (result === 'not_found') {
      return res
        .status(404)
        .json({
          message:
            'Image could not be found in cloudinary, hence has not been deleted from the database',
          image,
        })
        .end();
    }

    await Image.destroy({
      where: {
        id,
      },
    });

    return res.json({ message: 'Success!' });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
