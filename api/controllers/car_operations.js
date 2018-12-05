const { Client } = require('pg');
const queHelper = require('../helpers/publishMessageToQueue');
var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const client = new Client({ connectionString: process.env.DATABASE_URL });
let connected = false;

const checkConnection = async() =>{
    try {
      if (!connected) {
          await client.connect();
        connected = true;
      }
    } catch (error) {
      console.log(error);
      connected = false;
  }
  };

/*
Adding the new car to the Database
*/
const registerCar = (req, res) => {
var name = req.body.name;
var make = req.body.make;
var owner = req.body.owner;

let values = [name,make,owner];
checkConnection().then(async() => {
   const vv = await client.query('INSERT INTO cars (name,make,owner) VALUES ($1,$2,$3) returning * ',values);
   console.log(vv.rows[0])
   await queHelper.createJob(name,make,owner);
        res.json({
            data:{
                status:'success',
                code:200,
                details:`Car Succesfully registered with Id DMI_INDY_${vv.rows[0].id}`,
            }
          })
});
}; 
 
const fetchAllCars = (req, res) => {


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
      email: 'venu14u@gmail.com'
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
  checkConnection().then(async() => {
     const vv = await client.query('select * from cars ');
     console.log(vv.rows)
          res.json({
              data:{
                  status:'List of all Cars',
                  code:200,
                  details:vv.rows,
              }
      
            })
  });
  }; 
module.exports = {  registerCar,fetchAllCars }; 
