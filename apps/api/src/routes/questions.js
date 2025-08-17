const express = require('express');
const router = express.Router();
const Question = require('../models/Question');
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validation');

// Create a new question
router.post('/', authMiddleware, [validationMiddleware.validateQuestionCreation, validationMiddleware.validate], async (req, res) => {
    try {
        const question = new Question({
            title: req.body.title,
            description: req.body.description,
            userId: req.user.id
        });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Error creating question', error });
    }
});

// Get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find().populate('userId', 'username');
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching questions', error });
    }
});

// Get a specific question by ID
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id).populate('userId', 'username');
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching question', error });
    }
});

// Delete a question
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        if (question.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Not authorized to delete this question' });
        }
        await question.remove();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting question', error });
    }
});

module.exports = router;