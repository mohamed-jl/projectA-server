import Link from '../models/Link.js';

export const createLink = async (req, res) => {
  const { title, url } = req.body;

  try {
    const newLink = new Link({
      title,
      url, // Assuming req.user is set by authentication middleware
    });

    await newLink.save();
    res.status(201).json(newLink);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

export const getAllLinks = async (req, res) => {
  try {
    const links = await Link.find();
    res.status(200).json(links);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

export const getLinkById = async (req, res) => {
  const { id } = req.params;

  try {
    const link = await Link.findById(id);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.status(200).json(link);
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

export const updateLink = async (req, res) => {
  const { id } = req.params;
  const { title, url } = req.body;

  try {
    const link = await
    Link.findById(id);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    if (title) link.title = title;
    if (url) link.url = url;
    link.updatedAt = Date.now();
    await link.save();  
    res.status(200).json({ message: 'Link updated successfully', link });
    } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
    }
}

export const deleteLink = async (req, res) => {
  const { id } = req.params;

  try {
    const link = await Link.findByIdAndDelete(id);
    if (!link) return res.status(404).json({ message: 'Link not found' });
    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message || 'Server error' });
  }
}

