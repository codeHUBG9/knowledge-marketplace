const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
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
    content: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the updatedAt field before saving
answerSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Static method to find answers by questionId
answerSchema.statics.findByQuestionId = function(questionId) {
    return this.find({ questionId });
};

// Instance method to get a formatted answer
answerSchema.methods.getFormattedAnswer = function() {
    return {
        id: this._id,
        content: this.content,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        userId: this.userId
    };
};

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;