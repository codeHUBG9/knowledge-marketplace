const Queue = require('bull');
const redisConfig = require('../config/redis');

// Create a new queue for background jobs
const jobQueue = new Queue('jobQueue', {
  redis: redisConfig,
});

// Function to add a job to the queue
const addJob = (jobData) => {
  return jobQueue.add(jobData);
};

// Function to process jobs from the queue
const processJobs = (processFunction) => {
  jobQueue.process(processFunction);
};

// Function to get the current job count in the queue
const getJobCount = async () => {
  return await jobQueue.getJobCount();
};

// Function to clean completed jobs
const cleanCompletedJobs = async (gracePeriod) => {
  await jobQueue.clean(gracePeriod);
};

// Export the queue functions
module.exports = {
  addJob,
  processJobs,
  getJobCount,
  cleanCompletedJobs,
};