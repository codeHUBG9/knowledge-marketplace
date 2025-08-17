const express = require('express');
const router = express.Router();
const walletService = require('../services/walletService');
const { authenticate } = require('../middleware/auth');

// Get wallet balance
router.get('/balance', authenticate, async (req, res) => {
    try {
        const balance = await walletService.getBalance(req.user.id);
        res.json({ balance });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching balance', error: error.message });
    }
});

// Top up wallet
router.post('/topup', authenticate, async (req, res) => {
    const { amount } = req.body;
    try {
        const transaction = await walletService.topUp(req.user.id, amount);
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error topping up wallet', error: error.message });
    }
});

// Get transaction history
router.get('/transactions', authenticate, async (req, res) => {
    try {
        const transactions = await walletService.getTransactionHistory(req.user.id);
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transaction history', error: error.message });
    }
});

module.exports = router;