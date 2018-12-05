const kue = require('kue');

try {
    const queue = kue.createQueue({
        redis: process.env.REDIS_URL,
    });
    queue.process('CarRegister', (job, done) => {
        console.log('running the worker console');
        console.log(job.data.carName);
        //Logic to send Email to the user using SendGrid
        done(null, job.data.carName);
        break;
    });
} catch (error) {
    console.log(error);
}

