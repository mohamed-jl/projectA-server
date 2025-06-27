import File from '../models/File.js';
// Upload
export const uploadFile = async (req, res) => {
  try {
    const file = new File({
      name: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      data: req.file.buffer,
    });

    await file.save();
    res.json({ message: 'File uploaded', file });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading file');
  }
};

// List files
export const listFiles = async (req, res) => {
  const files = await File.find().select('-data');
  res.json(files);
};

// Download


export const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    const isPDF = file.mimetype === 'application/pdf';

    // Set correct Content-Type header
    res.setHeader('Content-Type', file.mimetype);

    // For PDF preview inline, others as attachment to force download
    if (isPDF) {
      res.setHeader('Content-Disposition', `inline; filename="${file.name}"`);
    } else {
      res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
    }

    // Send the binary data stored in MongoDB
    res.send(file.data);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error downloading file' });
  }
};


// Delete
export const deleteFile = async (req, res) => {
  await File.findByIdAndDelete(req.params.id);
  res.json({ message: 'File deleted' });
};
