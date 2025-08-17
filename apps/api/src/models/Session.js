const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    sessionToken: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h' // Session expires after 1 hour
    }
});

// Method to invalidate the session
sessionSchema.methods.invalidate = function() {
    return this.remove();
};

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;