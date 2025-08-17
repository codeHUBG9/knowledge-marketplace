const Flag = require('../models/Flag');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const User = require('../models/User');

// Flag content (question or answer)
exports.flagContent = async (flagData) => {
    const flag = new Flag({
        ...flagData,
        status: 'pending'
    });

    // Validate that the flagged content exists
    if (flagData.contentType === 'question') {
        const question = await Question.findById(flagData.contentId);
        if (!question) {
            throw new Error('Question not found');
        }
    } else if (flagData.contentType === 'answer') {
        const answer = await Answer.findById(flagData.contentId);
        if (!answer) {
            throw new Error('Answer not found');
        }
    }

    return await flag.save();
};

// Get all flags
exports.getFlags = async (status = 'pending') => {
    const query = status ? { status } : {};
    return await Flag.find(query)
        .populate('reportedBy', 'username')
        .populate('contentId')
        .sort({ createdAt: -1 });
};

// Resolve a flag
exports.resolveFlag = async (flagId, moderatorId, action) => {
    const flag = await Flag.findById(flagId);
    if (!flag) {
        throw new Error('Flag not found');
    }

    // Update flag status
    flag.status = 'resolved';
    flag.resolvedBy = moderatorId;
    flag.resolution = action;
    flag.resolvedAt = new Date();

    // Take action based on moderator decision
    if (action === 'remove') {
        if (flag.contentType === 'question') {
            await Question.findByIdAndUpdate(flag.contentId, { status: 'removed' });
        } else if (flag.contentType === 'answer') {
            await Answer.findByIdAndUpdate(flag.contentId, { status: 'removed' });
        }
    }

    return await flag.save();
};

// Get content flags
exports.getContentFlags = async (contentType, contentId) => {
    return await Flag.find({ contentType, contentId })
        .populate('reportedBy', 'username')
        .populate('resolvedBy', 'username')
        .sort({ createdAt: -1 });
};

// Get moderation stats
exports.getModerationStats = async () => {
    const stats = await Flag.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 }
            }
        }
    ]);

    return stats.reduce((acc, curr) => {
        acc[curr._id] = curr.count;
        return acc;
    }, {});
};
