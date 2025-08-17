const mongoose = require('mongoose');

const flagSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Question' // or 'Answer', depending on what is being flagged
    },
    reason: {
        type: String,
        required: true,
        enum: ['Inappropriate', 'Spam', 'Harassment', 'Other']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

flagSchema.methods.toJSON = function() {
    const flag = this;
    const flagObject = flag.toObject();

    delete flagObject.__v; // Exclude version key

    return flagObject;
};

const Flag = mongoose.model('Flag', flagSchema);

module.exports = Flag;