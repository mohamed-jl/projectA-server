import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number },
  data: { type: Buffer, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);
export default File;
