const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary
const mongoose = require('mongoose');
const WalletTxn = require('../src/models/WalletTxn');

describe('Wallet Transactions API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await WalletTxn.deleteMany({});
    });

    it('should create a new wallet transaction', async () => {
        const response = await request(app)
            .post('/api/wallet/transaction')
            .send({
                userId: '12345',
                amount: 100,
                transactionType: 'credit'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        expect(response.body.amount).toBe(100);
    });

    it('should fetch all wallet transactions', async () => {
        await WalletTxn.create({
            userId: '12345',
            amount: 100,
            transactionType: 'credit'
        });

        const response = await request(app).get('/api/wallet/transactions');

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
    });

    it('should return 404 for non-existing transaction', async () => {
        const response = await request(app).get('/api/wallet/transaction/invalidId');

        expect(response.status).toBe(404);
    });
});