const express = require('express');
const multer = require('multer');
const Image = require('../models/qr');

const router = express.Router();

// Define the upload middleware using Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the route for posting an image
router.post('/image', upload.single('image'), async (req, res) => {
  try {
    const newImage = new Image();
    newImage.name = req.body.name;
    newImage.text = req.body.text;
    newImage.image.data = req.file.buffer;
    newImage.image.contentType = req.file.mimetype;
    const savedImage = await newImage.save();
    res.status(201).send(savedImage);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving image to database.');
  }
});

router.get('/image', async (req, res) => {
    try {
      const images = await Image.find();
      
      if (!images) {
        res.status(404).send('No images found.');
      } else {
        const imageData = images.map(image => {
          return {
            id: image._id,
            text: image.text,
            contentType: image.image.contentType,
            data: image.image.data.toString('base64')
          };
        });
        res.json(imageData);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error getting images from database.');
    }
  });
module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Image=require('../models/qr');

// router.post('/image', upload.single('image'), async (req, res) => {
//     try {
//       const newImage = new Image();
//       newImage.name = req.body.name;
//       newImage.text = req.body.text;
//       newImage.image.data = req.file.buffer;
//       newImage.image.contentType = req.file.mimetype;
//       const savedImage = await newImage.save();
//       res.status(201).send(savedImage);
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error saving image to database.');
//     }
//   });
  

// router.get('/image', async (req, res) => {
//     try {
//       const images = await Image.find();
      
//       if (!images) {
//         res.status(404).send('No images found.');
//       } else {
//         const imageData = images.map(image => {
//           return {
//             id: image._id,
//             text: image.text,
//             contentType: image.image.contentType,
//             data: image.image.data.toString('base64')
//           };
//         });
//         res.json(imageData);
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Error getting images from database.');
//     }
//   });
//   module.exports=router;