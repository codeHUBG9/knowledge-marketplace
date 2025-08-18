const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const Bid = require('../models/Bid');
const Review = require('../models/Review');
require('dotenv').config();

// Sample data
const users = [
    {
        username: 'john_expert',
        email: 'john@example.com',
        password: 'password123',
        role: 'expert',
        expertise: ['JavaScript', 'React', 'Node.js'],
        reputation: 4.8,
        balance: 1000
    },
    {
        username: 'mary_asker',
        email: 'mary@example.com',
        password: 'password123',
        role: 'user',
        balance: 500
    },
    {
        username: 'tech_guru',
        email: 'guru@example.com',
        password: 'password123',
        role: 'expert',
        expertise: ['Python', 'Machine Learning', 'Data Science'],
        reputation: 4.9,
        balance: 2000
    },
    {
        username: 'moderator_jane',
        email: 'jane@example.com',
        password: 'password123',
        role: 'moderator',
        balance: 0
    }
];

const questionTemplates = [
    {
        title: 'How to implement authentication in React?',
        description: 'I need help implementing JWT authentication in my React application. Please provide detailed steps and code examples.',
        tags: ['React', 'Authentication', 'JWT'],
        budget: 100
    },
    {
        title: 'Best practices for Node.js error handling',
        description: 'What are the best practices for handling errors in a Node.js application? Looking for production-level examples.',
        tags: ['Node.js', 'Error Handling', 'Backend'],
        budget: 150
    },
    {
        title: 'Machine Learning model deployment',
        description: 'How do I deploy a trained machine learning model to production? Need guidance on best practices and tools.',
        tags: ['Python', 'Machine Learning', 'DevOps'],
        budget: 200
    }
];

const answerTemplate = [
    'Here\'s a detailed solution to your problem...',
    'Based on my experience, I recommend the following approach...',
    'Let me break this down into steps...',
    'The best practice for this scenario is...'
];

async function seedData() {
    let connection;
    try {
        // Connect to MongoDB
        connection = await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Question.deleteMany({}),
            Answer.deleteMany({}),
            Bid.deleteMany({}),
            Review.deleteMany({})
        ]);
        console.log('Cleared existing data');

        // Create users
        const createdUsers = await Promise.all(
            users.map(async user => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return User.create({ ...user, password: hashedPassword });
            })
        );
        console.log('Created users');

        // Create questions
        const questions = [];
        for (let i = 0; i < 20; i++) {
            const template = questionTemplates[i % questionTemplates.length];
            const asker = createdUsers.find(u => u.role === 'user') || createdUsers[0];
            
            const question = await Question.create({
                title: `${template.title} - Case ${i + 1}`,
                description: `${template.description}\n\nSpecific details for case ${i + 1}...`,
                tags: template.tags,
                userId: asker._id,
                budget: template.budget + (Math.random() * 100),
                status: ['open', 'in_progress', 'resolved'][Math.floor(Math.random() * 3)]
            });
            questions.push(question);
        }
        console.log('Created questions');

        // Create bids
        const expertUsers = createdUsers.filter(u => u.role === 'expert');
        const bids = [];
        for (const question of questions) {
            const numBids = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < numBids; i++) {
                const expert = expertUsers[Math.floor(Math.random() * expertUsers.length)];
                if (expert) {
                    const bid = await Bid.create({
                        questionId: question._id,
                        userId: expert._id,
                        amount: question.budget * (0.8 + Math.random() * 0.4),
                        status: ['pending', 'accepted', 'rejected'][Math.floor(Math.random() * 3)]
                    });
                    bids.push(bid);
                }
            }
        }
        console.log('Created bids');

        // Create answers and reviews
        for (const question of questions) {
            if (question.status !== 'open') {
                const expert = expertUsers[Math.floor(Math.random() * expertUsers.length)];
                if (expert) {
                    const answer = await Answer.create({
                        questionId: question._id,
                        userId: expert._id,
                        content: answerTemplate[Math.floor(Math.random() * answerTemplate.length)] +
                                '\n\nDetailed explanation and code examples...',
                        isAccepted: question.status === 'resolved'
                    });

                    // Create review if question is resolved
                    if (question.status === 'resolved') {
                        await Review.create({
                            fromUserId: question.userId,
                            toUserId: expert._id,
                            questionId: question._id,
                            answerId: answer._id,
                            rating: 4 + Math.random(),
                            comment: 'Great answer! Very helpful and detailed explanation.'
                        });
                    }
                }
            }
        }
        console.log('Created answers and reviews');

        console.log('Seeding completed successfully');
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    } finally {
        if (connection) {
            await connection.disconnect();
        }
        process.exit(0);
    }
}

// Run the seed function
seedData();
