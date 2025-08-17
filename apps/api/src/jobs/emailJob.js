const emailService = require('../services/emailService');
const queue = require('../utils/queue');

const emailJob = async (emailData) => {
    try {
        // Send email using the email service
        await emailService.sendEmail(emailData);
        console.log(`Email sent to ${emailData.to}`);
    } catch (error) {
        console.error(`Failed to send email to ${emailData.to}:`, error);
        // Optionally, you can re-queue the job or handle the error as needed
    }
};

// Function to add email job to the queue
const addEmailJob = (emailData) => {
    queue.addJob(emailJob, emailData);
};

module.exports = {
    emailJob,
    addEmailJob,
};