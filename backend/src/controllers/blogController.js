const prisma = require('../utils/prisma');

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { id }
    });

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { slug }
    });

    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.createBlog = async (req, res) => {
  try {
    const { title, slug, content, excerpt, author, published } = req.body;
    const coverImage = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        author,
        published: published === 'true' || published === true,
        coverImage
      }
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, excerpt, author, published } = req.body;

    const updateData = {
      title,
      slug,
      content,
      excerpt,
      author,
      published: published === 'true' || published === true
    };

    if (req.file) {
      updateData.coverImage = `/uploads/${req.file.filename}`;
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: updateData
    });

    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.blog.delete({
      where: { id }
    });

    res.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
