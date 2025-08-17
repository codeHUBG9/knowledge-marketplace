const axios = require('axios');

class AIService {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
    }

    async generateDraft(question) {
        try {
            const response = await axios.post(`${this.apiEndpoint}/generate-draft`, { question });
            return response.data;
        } catch (error) {
            throw new Error('Error generating draft: ' + error.message);
        }
    }

    async analyzeContent(content) {
        try {
            const response = await axios.post(`${this.apiEndpoint}/analyze-content`, { content });
            return response.data;
        } catch (error) {
            throw new Error('Error analyzing content: ' + error.message);
        }
    }

    async getSuggestions(topic) {
        try {
            const response = await axios.get(`${this.apiEndpoint}/suggestions`, { params: { topic } });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching suggestions: ' + error.message);
        }
    }
}

module.exports = new AIService(process.env.AI_API_ENDPOINT);