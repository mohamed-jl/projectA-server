import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import linkRoutes from './routes/linkRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import flightRoutes from './routes/flightRoutes.js';


dotenv.config();

const app = express();

// === Parse allowed origins from .env ===
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(origin => origin.trim()) || [];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (e.g., mobile apps, curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  // Log the request method and URL
  console.log(`${req.method} ${req.url}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/flights', flightRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the flight reporter API ✈️🧑‍✈️');
})



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT} (accessible from emulator via http://10.0.2.2:${PORT})`);
});
