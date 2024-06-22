import Item from '../schemas/items.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 1024 * 1024 * 5 } });

export { upload };


export const createItem = async (req, res) => {
  const { title, description, location } = req.body;
  const images = [];

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: 'No files uploaded' });
    }

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path); 
      images.push({ url: result.secure_url, filename: result.original_filename, size: result.bytes });
    }

    const newItem = new Item({
      title,
      description,
      location,
      images
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Error creating item', err);
    res.status(500).send({ message: 'Server Error', error: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('postedBy', 'username');
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('postedBy', 'username');

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateItem = async (req, res) => {
  const { title, description, location } = req.body;

  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, location } },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    if (item.postedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await item.remove();

    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
