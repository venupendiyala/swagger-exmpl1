const Queue = require('kue');

const queue = Queue.createQueue({
    redis: process.env.REDIS_URL,
});

const createJob = async (name,make) => {
    const job = queue.create('carRegister', {
        carName: name,
        carMake: make,
    }).removeOnComplete(true).save((error) => {
        if (error) {
            console.log(error);
            return;
        }
        job.on('complete', (result) => {
            console.log(`On Complete --> Email Sent to user`);
            return result;
        });
        job.on('failed', () => {
            const failedError = new Error('failed');
            console.log(failedError);
        });
    });
};

module.exports = { createJob }; 