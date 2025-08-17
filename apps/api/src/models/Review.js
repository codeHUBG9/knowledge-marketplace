const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Method to get a summary of the review
reviewSchema.methods.getSummary = function() {
    return {
        userId: this.userId,
        rating: this.rating,
        comment: this.comment,
        createdAt: this.createdAt
    };
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;