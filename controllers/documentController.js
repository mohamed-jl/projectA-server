import Document from '../models/Document.js';
import { listFiles, downloadFile } from '../utils/googleDrive.js';

// Sync Google Drive files to MongoDB
export const syncDocuments = async (req, res) => {
    try {
        const files = await listFiles();

        const docs = await Promise.all(
            files.map(async (file) => {
                const existing = await Document.findOne({ googleDriveId: file.id });

                if (existing) return existing;

                const doc = new Document({
                    name: file.name,
                    googleDriveId: file.id,
                    mimeType: file.mimeType,
                });

                return await doc.save();
            })
        );

        res.json(docs);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Error syncing documents');
    }
};

// List documents
export const listDocuments = async (req, res) => {
    try {
        const docs = await Document.find();
        res.json(docs);
    } catch (err) {
        res.status(500).send(err.message || 'Error fetching documents');
    }
};

// Download document by ID
export const downloadDocument = async (req, res) => {
    try {
        const doc = await Document.findById(req.params.id);

        if (!doc) {
            return res.status(404).send('Document not found');
        }

        const fileBuffer = await downloadFile(doc.googleDriveId);

        res.set({
            'Content-Type': doc.mimeType,
            'Content-Disposition': `attachment; filename="${doc.name}"`,
        });

        res.send(fileBuffer);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message || 'Error downloading document');
    }
};


