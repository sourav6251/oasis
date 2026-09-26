import Contact from '../models/Contact.js';

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Inquiry',
      message,
    });

    const savedContact = await contact.save();
    res.status(201).json({
      success: true,
      message: 'Message saved successfully.',
      data: savedContact,
    });
  } catch (error) {
    console.error('Contact message error:', error);
    res.status(500).json({ message: error.message || 'Server error saving contact message.' });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private/Admin
export const getContactMessages = async (req, res) => {
  try {
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
