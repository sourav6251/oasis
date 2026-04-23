import mongoose from 'mongoose';

const servicePackageSchema = new mongoose.Schema(
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
    originalPrice: {
      type: String,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    features: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const ServicePackage = mongoose.model('ServicePackage', servicePackageSchema);
export default ServicePackage;
