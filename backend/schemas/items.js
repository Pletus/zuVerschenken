import mongoose from 'mongoose';

const { Schema } = mongoose;

const locationSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String, 
  }
});

const itemSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: locationSchema,
    required: true,
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      filename: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
    },
  ],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/* itemSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 }); */

const Item = mongoose.model('Item', itemSchema);

export default Item;
