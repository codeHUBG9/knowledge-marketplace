const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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
questionSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Method to get a formatted question
questionSchema.methods.getFormattedQuestion = function() {
    return {
        id: this._id,
        title: this.title,
        description: this.description,
        userId: this.userId,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;