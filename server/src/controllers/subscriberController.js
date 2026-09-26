import Subscriber from '../models/Subscriber.js';
import sendEmail from '../utils/sendEmail.js';

// @desc    Subscribe to beauty tips newsletter
// @route   POST /api/subscribers
// @access  Public
export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ message: 'A valid email address is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let subscriber = await Subscriber.findOne({ email: cleanEmail });

    if (subscriber) {
      if (subscriber.isActive) {
        return res.status(200).json({
          message: 'You are already subscribed to our Beauty Community!',
        });
      }
      subscriber.isActive = true;
      await subscriber.save();
    } else {
      subscriber = await Subscriber.create({ email: cleanEmail });
    }

    // Send confirmation welcome email asynchronously
    try {
      await sendEmail({
        email: cleanEmail,
        subject: 'Welcome to Oasis Beauty Community! ✨',
        message: 'Thank you for subscribing to Oasis Beauty Salon & Academy. You will receive notifications whenever our specialists post new beauty tips, tutorials, and exclusive salon updates!',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #f0e6d6; border-radius: 12px; background: #fffdf9;">
            <h2 style="color: #eaa636; text-align: center;">Welcome to Oasis Beauty! ✨</h2>
            <p style="color: #444; line-height: 1.6;">Thank you for subscribing to our beauty newsletter.</p>
            <p style="color: #444; line-height: 1.6;">You're now on our VIP list to receive our latest expert beauty tips, skincare advice, and bridal makeover secrets as soon as they are published.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.FRONTEND_URL || 'http://localhost:5001'}/beauty-tips" style="background: #eaa636; color: #1e1916; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 25px; display: inline-block;">Explore Beauty Tips</a>
            </div>
            <p style="color: #888; font-size: 12px; text-align: center; border-top: 1px solid #eee; padding-top: 15px;">Oasis Beauty Salon & Academy • Tamluk</p>
          </div>
        `,
      });
    } catch (mailErr) {
      console.error('Welcome email sending error:', mailErr);
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing! Check your inbox for confirmation.',
      data: subscriber,
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ message: error.message || 'Server error subscribing to newsletter.' });
  }
};

// @desc    Get all active subscribers
// @route   GET /api/subscribers
// @access  Private/Admin
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
