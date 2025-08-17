const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Method to find bids by question
bidSchema.statics.findByQuestion = function(questionId) {
    return this.find({ questionId });
};

// Method to find bids by user
bidSchema.statics.findByUser = function(userId) {
    return this.find({ userId });
};

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;