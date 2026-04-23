import User from '../models/User.js';
import generateOtp from '../utils/generateOtp.js';
import sendEmail from '../utils/sendEmail.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import { uploadImage, deleteImage } from '../utils/imageKit.js';



// Helper to hash OTP
const hashOtp = async (otp) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(otp, salt);
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { email, password, fullName, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      if (userExists.isVerified) {
        return res.status(400).json({ message: 'User already exists' });
      } else {
        // User exists but is not verified. Resend OTP and update password if needed.
        const otp = generateOtp();
        const hashedOtp = await hashOtp(otp);
        
        userExists.password = password;
        userExists.otp = hashedOtp;
        userExists.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        userExists.role = role || 'user';
        await userExists.save();

        try {
          await sendEmail({
            email: userExists.email,
            subject: 'Oasis - Verify your email',
            message: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
          });
          
          return res.status(201).json({
            message: 'Account not verified. A new OTP has been sent to your email.',
            email: userExists.email,
          });
        } catch (error) {
          console.error('Email send failed:', error);
          return res.status(500).json({ message: 'Failed to send OTP email.' });
        }
      }
    }

    const otp = generateOtp();
    const hashedOtp = await hashOtp(otp);
    
    // OTP expires in 10 minutes
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = await User.create({
      email,
      password,
      fullName,
      role: role || 'user',
      otp: hashedOtp,
      otpExpires,
      isVerified: false,
    });

    if (user) {
      try {
        await sendEmail({
          email: user.email,
          subject: 'Oasis - Verify your email',
          message: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
        });
        
        res.status(201).json({
          message: 'User registered. Please check your email for the OTP to verify your account.',
          email: user.email,
        });
      } catch (error) {
        console.error('Email send failed:', error);
        res.status(500).json({ message: 'Failed to send OTP email.' });
      }
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get OTP (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (user.isVerified) {
        // Direct login
        return res.status(200).json({
          message: 'Logged in successfully.',
          _id: user._id,
          email: user.email,
          fullName: user.fullName || '',
          username: user.username || '',
          role: user.role,
          image: user.image || '',
          isVerified: user.isVerified,

          token: generateToken(user._id),
          requiresOtp: false
        });
      }

      // Generate new OTP
      const otp = generateOtp();
      const hashedOtp = await hashOtp(otp);
      
      // Update OTP and Expiry
      user.otp = hashedOtp;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      try {
        await sendEmail({
          email: user.email,
          subject: 'Oasis - Login OTP',
          message: `Your account is not verified. Your OTP is: ${otp}. It will expire in 10 minutes.`,
        });
        
        res.status(200).json({
          message: 'Account not verified. OTP sent to your email. Please verify to complete login.',
          email: user.email,
          requiresOtp: true
        });
      } catch (error) {
        console.error('Email send failed:', error);
        res.status(500).json({ message: 'Failed to send OTP email.' });
      }
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.otp || !user.otpExpires) {
      return res.status(400).json({ message: 'No OTP generated for this user' });
    }

    // Check expiry
    if (new Date() > user.otpExpires) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Check if OTP is correct
    const isMatch = await bcrypt.compare(otp, user.otp);

    if (isMatch) {
      // Mark as verified if not already
      user.isVerified = true;
      // Clear OTP
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res.status(200).json({
        message: 'OTP verified successfully.',
        _id: user._id,
        email: user.email,
        fullName: user.fullName || '',
        username: user.username || '',
        role: user.role,
        image: user.image || '',
        isVerified: user.isVerified,

        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload profile photo
// @route   POST /api/auth/upload-photo
// @access  Private
const uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    // Get user to check for existing image
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete old image if it exists
    if (user.imageFileId) {
      await deleteImage(user.imageFileId);
    }

    // Upload to ImageKit
    const uploadResponse = await uploadImage(req.file.buffer, `profile_${req.user._id}_${Date.now()}`);

    // Update user with new image details
    user.image = uploadResponse.url;
    user.imageFileId = uploadResponse.fileId;
    await user.save();

    res.status(200).json({
      message: 'Profile photo updated successfully',
      image: user.image,
    });
  } catch (error) {
    console.error('Profile photo upload error:', error);
    res.status(500).json({ message: 'Failed to upload profile photo: ' + error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        userId: user._id,
        email: user.email,
        fullName: user.fullName || '',
        username: user.username || '',
        role: user.role,
        profileImageUrl: user.image || '',
        isEmailVerified: user.isVerified,

        userType: user.role.toUpperCase(),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      const { fullName, email, username } = req.body;

      // Check if email is already taken by another user
      if (email && email !== user.email) {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
          return res.status(400).json({ message: 'Email is already in use' });
        }
        user.email = email;
        // If email changes, you might want to set isVerified to false
        // user.isVerified = false; 
      }

      if (fullName) {
        user.fullName = fullName;
      }

      const updatedUser = await user.save();

      res.json({
        userId: updatedUser._id,
        email: updatedUser.email,
        fullName: updatedUser.fullName || '',
        username: updatedUser.username || '',
        role: updatedUser.role,
        profileImageUrl: updatedUser.image || '',
        isEmailVerified: updatedUser.isVerified,
        userType: updatedUser.role.toUpperCase(),
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: error.message });
  }
};

export {
  registerUser,
  loginUser,
  verifyOtp,
  uploadProfilePhoto,
  getUserProfile,
  updateUserProfile,
};
