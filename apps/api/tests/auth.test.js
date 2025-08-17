const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary
const mongoose = require('mongoose');
const User = require('../src/models/User');

describe('Authentication Routes', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe('POST /auth/register', () => {
        it('should register a new user', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('user');
            expect(res.body.user.username).toBe('testuser');
        });

        it('should return 400 for duplicate email', async () => {
            await request(app)
                .post('/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                });

            const res = await request(app)
                .post('/auth/register')
                .send({
                    username: 'testuser2',
                    email: 'test@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(400);
            expect(res.body.message).toBe('Email already exists');
        });
    });

    describe('POST /auth/login', () => {
        it('should log in an existing user', async () => {
            await request(app)
                .post('/auth/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password123'
                });

            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'test@example.com',
                    password: 'password123'
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should return 401 for invalid credentials', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'nonexistent@example.com',
                    password: 'wrongpassword'
                });
            expect(res.statusCode).toEqual(401);
            expect(res.body.message).toBe('Invalid credentials');
        });
    });
});