import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    name: String,
    googleDriveId: String,
    mimeType: String,
    downloadLink: String, 
    uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Document', documentSchema);
