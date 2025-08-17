const mongoose = require('mongoose');

const walletTxnSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    transactionType: {
        type: String,
        enum: ['credit', 'debit'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

walletTxnSchema.methods.toJSON = function() {
    const txn = this;
    const txnObject = txn.toObject();

    delete txnObject.__v;

    return txnObject;
};

const WalletTxn = mongoose.model('WalletTxn', walletTxnSchema);

module.exports = WalletTxn;