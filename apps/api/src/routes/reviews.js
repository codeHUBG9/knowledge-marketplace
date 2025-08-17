const express = require('express');
const { createReview, getReviews } = require('../services/reviewService');
const { validateReviewCreation, validate } = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new review
router.post('/', auth, [validateReviewCreation, validate], async (req, res) => {
    try {
        const review = await createReview(req.body, req.user.id);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await getReviews();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;