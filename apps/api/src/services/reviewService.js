const Review = require('../models/Review');
const User = require('../models/User');

// Create a new review
exports.createReview = async (reviewData, userId) => {
    const review = new Review({
        ...reviewData,
        fromUserId: userId
    });

    const savedReview = await review.save();

    // Update user's reputation
    const targetUser = await User.findById(reviewData.toUserId);
    if (targetUser) {
        // Calculate new reputation based on review rating
        const reputationChange = (reviewData.rating - 3) * 2; // -4 for 1 star, +4 for 5 stars
        targetUser.reputation += reputationChange;
        await targetUser.save();
    }

    return savedReview;
};

// Get reviews for a user
exports.getUserReviews = async (userId) => {
    return await Review.find({ toUserId: userId })
        .populate('fromUserId', 'username')
        .sort({ createdAt: -1 });
};

// Get all reviews
exports.getReviews = async () => {
    return await Review.find()
        .populate('fromUserId', 'username')
        .populate('toUserId', 'username')
        .sort({ createdAt: -1 });
};

// Update a review
exports.updateReview = async (reviewId, userId, updateData) => {
    const review = await Review.findOne({ _id: reviewId, fromUserId: userId });
    if (!review) {
        throw new Error('Review not found or not authorized');
    }

    // Calculate reputation change delta
    const oldRating = review.rating;
    const newRating = updateData.rating;
    const reputationDelta = ((newRating - oldRating) * 2);

    // Update review
    Object.assign(review, updateData);
    await review.save();

    // Update user reputation
    if (reputationDelta !== 0) {
        const targetUser = await User.findById(review.toUserId);
        if (targetUser) {
            targetUser.reputation += reputationDelta;
            await targetUser.save();
        }
    }

    return review;
};

// Delete a review
exports.deleteReview = async (reviewId, userId) => {
    const review = await Review.findOne({ _id: reviewId, fromUserId: userId });
    if (!review) {
        throw new Error('Review not found or not authorized');
    }

    // Revert reputation change
    const reputationChange = -(review.rating - 3) * 2;
    const targetUser = await User.findById(review.toUserId);
    if (targetUser) {
        targetUser.reputation += reputationChange;
        await targetUser.save();
    }

    await review.remove();
    return { message: 'Review deleted successfully' };
};
