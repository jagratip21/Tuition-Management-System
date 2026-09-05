const prisma = require('../utils/prisma');

exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const contact = await prisma.contactUs.create({
      data: {
        name,
        email,
        phone,
        message
      }
    });

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: contact
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAllContactSubmissions = async (req, res) => {
  try {
    const contacts = await prisma.contactUs.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await prisma.contactUs.update({
      where: { id },
      data: { status }
    });

    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
