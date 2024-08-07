import Item from '../schemas/items.js';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const createItem = async (req, res) => {
  const { title, description, location, postedBy } = req.body;
  const images = [];

  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: 'No files uploaded' });
    }

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path);
      images.push({ url: result.secure_url, filename: result.original_filename, size: result.bytes });

      fs.unlinkSync(file.path);
    }

    
    const parsedLocation = JSON.parse(location);

    const newItem = new Item({
      title,
      description,
      location: parsedLocation,
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


export const getItems = async (req, res) => {
  try {
    const items = await Item.find().select('title description location images createdAt').populate('postedBy').lean();
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

export const getTopItems = async (req, res) => {
  try {
    const items = await Item.find().select('title description location images createdAt').populate('postedBy').lean();
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
    const item = await Item.findById(req.params.id).populate('postedBy').lean();

    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    res.json({
      _id: item._id,
      title: item.title,
      description: item.description,
      location: item.location,
      images: item.images,
      postedBy: {
        username: item.postedBy.username,
        _id: item.postedBy._id,
      },
      createdAt: item.createdAt,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

export const updateItem = async (req, res) => {
  const { title, description, city, street, houseNumber } = req.body;

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
      { $set: { title, description, location: { city, street, houseNumber } } },
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
