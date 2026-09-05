const prisma = require('../utils/prisma');

exports.getAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: { active: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await prisma.subject.findUnique({
      where: { id }
    });

    if (!subject) {
      return res.status(404).json({ success: false, error: 'Subject not found' });
    }

    res.json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const subject = await prisma.subject.create({
      data: {
        name,
        description,
        imageUrl
      }
    });

    res.status(201).json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, active } = req.body;

    const updateData = {
      name,
      description,
      active
    };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const subject = await prisma.subject.update({
      where: { id },
      data: updateData
    });

    res.json({ success: true, data: subject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.subject.delete({
      where: { id }
    });

    res.json({ success: true, message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
