const Bid = require('../models/Bid');

// Create a new bid
exports.createBid = async (bidData, userId) => {
    const bid = new Bid({
        ...bidData,
        userId
    });
    return await bid.save();
};

// Get all bids for a question
exports.getBidsByQuestionId = async (questionId) => {
    return await Bid.find({ questionId }).populate('userId', 'username');
};

// Accept a bid
exports.acceptBid = async (bidId, userId) => {
    const bid = await Bid.findById(bidId);
    if (!bid) {
        throw new Error('Bid not found');
    }

    // Check if the user is the owner of the question
    const question = await Question.findById(bid.questionId);
    if (!question || question.userId.toString() !== userId) {
        throw new Error('Not authorized to accept this bid');
    }

    bid.status = 'accepted';
    await bid.save();
    return bid;
};

// Reject a bid
exports.rejectBid = async (bidId, userId) => {
    const bid = await Bid.findById(bidId);
    if (!bid) {
        throw new Error('Bid not found');
    }

    // Check if the user is the owner of the question
    const question = await Question.findById(bid.questionId);
    if (!question || question.userId.toString() !== userId) {
        throw new Error('Not authorized to reject this bid');
    }

    bid.status = 'rejected';
    await bid.save();
    return bid;
};
