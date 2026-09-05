const prisma = require('../utils/prisma');

exports.submitHireTutorEnquiry = async (req, res) => {
  try {
    const { fullName, phone, email, location, subject, message } = req.body;

    const enquiry = await prisma.hireTutorEnquiry.create({
      data: {
        fullName,
        phone,
        email,
        location,
        subject,
        message
      }
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getHireTutorEnquiries = async (req, res) => {
  try {
    const enquiries = await prisma.hireTutorEnquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.submitJoinAsTutorEnquiry = async (req, res) => {
  try {
    const { fullName, phone, email, location, expertise, message } = req.body;

    const enquiry = await prisma.joinAsTutorEnquiry.create({
      data: {
        fullName,
        phone,
        email,
        location,
        expertise,
        message
      }
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getJoinAsTutorEnquiries = async (req, res) => {
  try {
    const enquiries = await prisma.joinAsTutorEnquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: enquiries });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { type, id } = req.params;
    const { status } = req.body;

    let enquiry;
    if (type === 'hire') {
      enquiry = await prisma.hireTutorEnquiry.update({
        where: { id },
        data: { status }
      });
    } else {
      enquiry = await prisma.joinAsTutorEnquiry.update({
        where: { id },
        data: { status }
      });
    }

    res.json({ success: true, data: enquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.deleteEnquiry = async (req, res) => {
  try {
    const { type, id } = req.params;

    let deletedEnquiry;
    if (type === 'hire') {
      deletedEnquiry = await prisma.hireTutorEnquiry.delete({
        where: { id },
      });
    } else if (type === 'join') {
      deletedEnquiry = await prisma.joinAsTutorEnquiry.delete({
        where: { id },
      });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid enquiry type' });
    }

    res.json({ success: true, message: 'Enquiry deleted successfully', data: deletedEnquiry });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

