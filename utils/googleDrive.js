import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KEYFILEPATH = path.join(__dirname, 'credentials.json'); // Service account key
const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];

const auth = new google.auth.GoogleAuth({
    keyFile: KEYFILEPATH,
    scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

export const listFiles = async () => {
    const res = await drive.files.list({
        pageSize: 10,
        fields: 'files(id, name, mimeType)',
    });
    return res.data.files;
};

export const downloadFile = async (fileId, dest) => {
    const destStream = fs.createWriteStream(dest);

    await drive.files.get(
        { fileId, alt: 'media' },
        { responseType: 'stream' }
    ).then(res => {
        return new Promise((resolve, reject) => {
            res.data
                .on('end', () => resolve(dest))
                .on('error', err => reject(err))
                .pipe(destStream);
        });
    });
};
