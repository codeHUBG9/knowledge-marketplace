const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Create a new answer
exports.createAnswer = async (questionId, userId, answerData) => {
    // Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
        throw new Error('Question not found');
    }

    // Create and save the answer
    const answer = new Answer({
        questionId,
        userId,
        content: answerData.content,
        attachments: answerData.attachments
    });

    return await answer.save();
};

// Get answers for a specific question
exports.getAnswersByQuestionId = async (questionId) => {
    return await Answer.find({ questionId })
        .populate('userId', 'username reputation')
        .sort({ createdAt: -1 });
};

// Accept an answer
exports.acceptAnswer = async (answerId, userId) => {
    const answer = await Answer.findById(answerId);
    if (!answer) {
        throw new Error('Answer not found');
    }

    // Check if user owns the question
    const question = await Question.findById(answer.questionId);
    if (!question || question.userId.toString() !== userId) {
        throw new Error('Not authorized to accept this answer');
    }

    answer.isAccepted = true;
    question.status = 'resolved';

    await Promise.all([answer.save(), question.save()]);
    return answer;
};

// Rate an answer
exports.rateAnswer = async (answerId, userId, rating) => {
    const answer = await Answer.findById(answerId);
    if (!answer) {
        throw new Error('Answer not found');
    }

    // Prevent self-rating
    if (answer.userId.toString() === userId) {
        throw new Error('Cannot rate your own answer');
    }

    // Update or create rating
    const ratingIndex = answer.ratings.findIndex(r => r.userId.toString() === userId);
    if (ratingIndex > -1) {
        answer.ratings[ratingIndex].value = rating;
    } else {
        answer.ratings.push({ userId, value: rating });
    }

    return await answer.save();
};
