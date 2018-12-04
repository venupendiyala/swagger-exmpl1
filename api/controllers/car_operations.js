const { Client } = require('pg');
const queHelper = require('../helpers/publishJob');

const client = new Client({ connectionString: process.env.DATABASE_URL });
/*
Adding the new car to the Database
*/
const registerCar = (req, res) => {
//return new Promise(function(resolve, reject) {
var name = req.body.name;
var make = req.body.make;
let values = [name,make];
client.connect().then(async() => {
   const vv = await client.query('INSERT INTO cars (name,make) VALUES ($1,$2) returning * ',values);
   console.log(vv.rows[0])
   await queHelper.createJob('first');

        res.json({
            data:{
                status:'success',
                code:200,
                details:"car Succesfully created",
            }
    
          })
    

});
}; 
 
module.exports = {  registerCar }; 
