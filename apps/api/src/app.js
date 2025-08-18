const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const questionRoutes = require('./routes/questions');
const bidRoutes = require('./routes/bids');
const answerRoutes = require('./routes/answers');
const walletRoutes = require('./routes/wallet');
const reviewRoutes = require('./routes/reviews');
const moderationRoutes = require('./routes/moderation');
require('dotenv').config({ debug: false });

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/answers', answerRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/moderation', moderationRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Database Connection
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/knowledge_marketplace';
        console.log('Attempting to connect to MongoDB at:', mongoURI);
        
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        // Don't exit the process, let the API run even if DB is not available initially
        // It will keep trying to reconnect
    }
};

connectDB();

module.exports = app;