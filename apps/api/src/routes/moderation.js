const express = require('express');
const { flagContent, getFlags, resolveFlag } = require('../services/moderationService');
const auth = require('../middleware/auth');
const { validate } = require('../middleware/validation');

const router = express.Router();

// Route to flag content
router.post('/flag', auth, validate, async (req, res) => {
    try {
        const flag = await flagContent(req.body);
        res.status(201).json(flag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get all flags
router.get('/flags', auth, async (req, res) => {
    try {
        const flags = await getFlags();
        res.status(200).json(flags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to resolve a flag
router.patch('/flags/:id/resolve', auth, async (req, res) => {
    try {
        const resolvedFlag = await resolveFlag(req.params.id);
        res.status(200).json(resolvedFlag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;