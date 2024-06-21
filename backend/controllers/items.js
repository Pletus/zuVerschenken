import Item from '../schemas/items.js';


export const createItem = async (req, res) => {
  const { title, description, location } = req.body;

  try {
    const newItem = new Item({
      title,
      description,
      location,
    });

    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    console.error('Error creating item', err);
    res.status(500).send({message:'Server Error', error: err.message});
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
