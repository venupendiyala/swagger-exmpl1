const Queue = require('kue');

const queue = Queue.createQueue({
    redis: process.env.REDIS_URL,
});

const createJob = async (jobType) => {
    const job = queue.create(jobType, {
        letter: 'a',
        title: 'mytitle',
    }).removeOnComplete(true).save((error) => {
        if (error) {
            console.log(error);
            return;
        }
        job.on('complete', (result) => {
            console.log(`On Complete Hello Intense ${result}`);
            return result;
        });
        job.on('failed', () => {
            const failedError = new Error('failed');
            console.log(failedError);
        });
    });
};

module.exports = { createJob }; 