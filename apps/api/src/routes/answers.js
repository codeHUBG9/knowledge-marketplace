const express = require('express');
const { createAnswer, getAnswersByQuestionId } = require('../services/answerService');
const { validateAnswer } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Route to create a new answer
router.post('/:questionId', authenticate, validateAnswer, async (req, res) => {
    try {
        const answer = await createAnswer(req.params.questionId, req.user.id, req.body);
        res.status(201).json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get answers for a specific question
router.get('/:questionId', async (req, res) => {
    try {
        const answers = await getAnswersByQuestionId(req.params.questionId);
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;