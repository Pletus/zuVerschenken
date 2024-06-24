import Item from '../schemas/items.js';
import user from '../schemas/users.js'
import { v2 as cloudinary } from 'cloudinary';


export const createItem = async (req, res) => {
  const { title, description, location, postedBy, createdAt } = req.body;
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
      images,
      postedBy
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error('Error creating item', err);
    res.status(500).send({ message: 'Server Error', error: err.message });
  }
};

/* export const getItems = async (req, res) => {
  try {
    const items = await Item.find().populate('postedBy', 'username');
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}; */

export const getItems = async (req, res) => {
  try {
    const items = await Item.find().select('title description location images').lean();
    const image = items.map(item => ({
      ...item,
      images: item.images.length > 0 ? [item.images[0]] : []
    }));
    res.json(image);
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

    res.json({
      ...item.toObject(),
      createdAt: item.createdAt, // Ensure createdAt is included in the response
    });
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
