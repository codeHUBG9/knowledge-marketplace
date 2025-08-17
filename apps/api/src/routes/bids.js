const express = require('express');
const { createBid, getBidsByQuestionId } = require('../services/bidService');
const { validateBidCreation, validate } = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new bid
router.post('/', auth, [validateBidCreation, validate], async (req, res) => {
    try {
        const bid = await createBid(req.body, req.user.id);
        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get bids for a specific question
router.get('/:questionId', async (req, res) => {
    try {
        const bids = await getBidsByQuestionId(req.params.questionId);
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;