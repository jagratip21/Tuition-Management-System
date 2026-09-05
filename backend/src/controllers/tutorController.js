const prisma = require('../utils/prisma');

exports.getAllTutors = async (req, res) => {
  try {
    const tutors = await prisma.tutor.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: tutors });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getTutorById = async (req, res) => {
  try {
    const { id } = req.params;

    const tutor = await prisma.tutor.findUnique({
      where: { id }
    });

    if (!tutor) {
      return res.status(404).json({ success: false, error: 'Tutor not found' });
    }

    res.json({ success: true, data: tutor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createTutor = async (req, res) => {
  try {
    const { fullName, email, phone, location, expertise, experience, bio } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const tutor = await prisma.tutor.create({
      data: {
        fullName,
        email,
        phone,
        location,
        expertise,
        experience,
        bio,
        imageUrl
      }
    });

    res.status(201).json({ success: true, data: tutor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateTutor = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, location, expertise, experience, bio, active } = req.body;

    const updateData = {
      fullName,
      email,
      phone,
      location,
      expertise,
      experience,
      bio,
      active
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const tutor = await prisma.tutor.update({
      where: { id },
      data: updateData
    });

    res.json({ success: true, data: tutor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteTutor = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.tutor.delete({
      where: { id }
    });

    res.json({ success: true, message: 'Tutor deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
