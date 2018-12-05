const kue = require('kue');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
var request = sg.emptyRequest({
  method: 'POST',
  path: '/v3/mail/send',
  body: {
    personalizations: [
      {
        to: [
          {
            email: 'vpendiyala@dminc.com'
          }
        ],
        subject: 'Sending with SendGrid is Fun'
      }
    ],
    from: {
      email: 'test@example.com'
    },
    content: [
      {
        type: 'text/plain',
        value: 'and easy to do anywhere, even with Node.js'
      }
    ]
  }
});
 
// With promise
sg.API(request)
  .then(function (response) {
    console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
  })
  .catch(function (error) {
    // error is an instance of SendGridError
    // The full response is attached to error.response
    console.log(error.response.statusCode);
  });
 
try {
    const queue = kue.createQueue({
        redis: process.env.REDIS_URL,
    });
    queue.process('CarRegister', (job, done) => {
        console.log('running the worker console');
        console.log(job.data.carName);
        //Logic to send Email to the user using SendGrid
        done(null, job.data.carName);
    });
} catch (error) {
    console.log(error);
}

