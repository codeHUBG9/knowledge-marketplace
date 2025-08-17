const queue = require('../utils/queue');
const aiService = require('../services/aiService');

const aiDraftJob = async (questionId) => {
    try {
        const draft = await aiService.generateDraft(questionId);
        // Logic to save the draft or notify the user can be added here
        console.log(`AI draft generated for question ID: ${questionId}`);
    } catch (error) {
        console.error(`Error generating AI draft for question ID: ${questionId}`, error);
    }
};

// Export the job function for use in the queue
module.exports = aiDraftJob;