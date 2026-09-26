import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Credentials must come from the environment — never hardcode them (SEC-05)
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;

    if (!adminEmail || !adminPassword || adminPassword.length < 12) {
      throw new Error(
        'Refusing to run: set ADMIN_EMAIL and ADMIN_BOOTSTRAP_PASSWORD (min 12 chars) in the environment.'
      );
    }
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      adminExists.role = 'admin';
      adminExists.isVerified = true;
      await adminExists.save();
      console.log('Admin user updated');
    } else {
      await User.create({
        email: adminEmail,
        password: adminPassword,
        fullName: process.env.ADMIN_FULL_NAME || 'Admin User',
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
