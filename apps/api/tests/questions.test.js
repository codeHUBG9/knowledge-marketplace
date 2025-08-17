const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary
const mongoose = require('mongoose');
const Question = require('../src/models/Question');

describe('Question API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Question.deleteMany({});
    });

    it('should create a new question', async () => {
        const questionData = {
            title: 'What is the capital of France?',
            description: 'I would like to know the capital city of France.',
            userId: '60d5ec49f1b2c8b1f8c8e4f1'
        };

        const response = await request(app)
            .post('/api/questions')
            .send(questionData)
            .expect(201);

        expect(response.body).toHaveProperty('_id');
        expect(response.body.title).toBe(questionData.title);
    });

    it('should fetch all questions', async () => {
        const questionData = [
            {
                title: 'What is the capital of France?',
                description: 'I would like to know the capital city of France.',
                userId: '60d5ec49f1b2c8b1f8c8e4f1'
            },
            {
                title: 'What is the capital of Germany?',
                description: 'I would like to know the capital city of Germany.',
                userId: '60d5ec49f1b2c8b1f8c8e4f2'
            }
        ];

        await Question.insertMany(questionData);

        const response = await request(app)
            .get('/api/questions')
            .expect(200);

        expect(response.body.length).toBe(2);
    });

    it('should fetch a question by ID', async () => {
        const question = new Question({
            title: 'What is the capital of France?',
            description: 'I would like to know the capital city of France.',
            userId: '60d5ec49f1b2c8b1f8c8e4f1'
        });
        await question.save();

        const response = await request(app)
            .get(`/api/questions/${question._id}`)
            .expect(200);

        expect(response.body.title).toBe(question.title);
    });

    it('should delete a question by ID', async () => {
        const question = new Question({
            title: 'What is the capital of France?',
            description: 'I would like to know the capital city of France.',
            userId: '60d5ec49f1b2c8b1f8c8e4f1'
        });
        await question.save();

        await request(app)
            .delete(`/api/questions/${question._id}`)
            .expect(204);

        const deletedQuestion = await Question.findById(question._id);
        expect(deletedQuestion).toBeNull();
    });
});