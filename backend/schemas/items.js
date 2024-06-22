import mongoose from 'mongoose';


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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Item', ItemSchema);
