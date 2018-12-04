
const kue = require('kue');

try {
    const queue = kue.createQueue({
    redis: process.env.REDIS_URL,
});
queue.process('first', (job, done) => {
    console.log('running the worker console');

switch (job.data.letter) {
case 'a':
console.log(job.data.letter);
done(null, 'apple');
break;
default:
done(null, 'unknown'); 
}
});
} catch (error) {
console.log(error);
} 
 
