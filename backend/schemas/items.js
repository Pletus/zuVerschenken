/* import mongoose from 'mongoose';


const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  filename: String,
  size: Number
});

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  images: [ImageSchema],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Item', ItemSchema); */

import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
   
  },
  filename: String,
  size: Number
});

const ItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true 
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  images: [ImageSchema],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ItemSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 });

export default mongoose.model('Item', ItemSchema);
