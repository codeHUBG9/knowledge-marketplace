const WalletTxn = require('../models/WalletTxn');
const User = require('../models/User');

class WalletService {
    async getBalance(userId) {
        const transactions = await WalletTxn.find({ userId });
        const balance = transactions.reduce((acc, txn) => {
            return txn.transactionType === 'credit' ? acc + txn.amount : acc - txn.amount;
        }, 0);
        return balance;
    }

    async addTransaction(userId, amount, transactionType) {
        const transaction = new WalletTxn({
            userId,
            amount,
            transactionType,
        });
        await transaction.save();
        return transaction;
    }

    async getTransactionHistory(userId) {
        const transactions = await WalletTxn.find({ userId }).sort({ createdAt: -1 });
        return transactions;
    }

    async topUpWallet(userId, amount) {
        await this.addTransaction(userId, amount, 'credit');
        const user = await User.findById(userId);
        user.walletBalance += amount;
        await user.save();
        return user.walletBalance;
    }

    async withdrawFromWallet(userId, amount) {
        const balance = await this.getBalance(userId);
        if (balance < amount) {
            throw new Error('Insufficient balance');
        }
        await this.addTransaction(userId, amount, 'debit');
        const user = await User.findById(userId);
        user.walletBalance -= amount;
        await user.save();
        return user.walletBalance;
    }
}

module.exports = new WalletService();