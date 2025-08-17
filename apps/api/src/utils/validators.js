const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Email is not valid'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validateQuestion = [
    body('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long'),
    body('description')
        .notEmpty().withMessage('Description is required')
        .isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
];

const validateBid = [
    body('amount')
        .notEmpty().withMessage('Amount is required')
        .isNumeric().withMessage('Amount must be a number'),
];

const validateAnswer = [
    body('content')
        .notEmpty().withMessage('Content is required')
        .isLength({ min: 1 }).withMessage('Content must not be empty'),
];

const validateReview = [
    body('rating')
        .notEmpty().withMessage('Rating is required')
        .isNumeric().withMessage('Rating must be a number')
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment')
        .optional()
        .isLength({ max: 500 }).withMessage('Comment must not exceed 500 characters'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateQuestion,
    validateBid,
    validateAnswer,
    validateReview,
    validateRequest,
};