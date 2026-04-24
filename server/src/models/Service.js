import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    imgFileId: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    category: {
      name: {
        type: String,
        required: true,
      },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceCategory'
      }
    },
  },
  { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
