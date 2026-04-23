import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const adminEmail = 'admin@oasis.com';
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      adminExists.role = 'admin';
      adminExists.isVerified = true;
      await adminExists.save();
      console.log('Admin user updated');
    } else {
      await User.create({
        email: adminEmail,
        password: 'adminpassword123',
        fullName: 'Admin User',
        role: 'admin',
        isVerified: true,
      });
      console.log('Admin user created');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
