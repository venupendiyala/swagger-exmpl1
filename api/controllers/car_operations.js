const { Client } = require('pg');
const queHelper = require('../helpers/publishMessageToQueue');

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
let values = [name,make];
checkConnection().then(async() => {
   const vv = await client.query('INSERT INTO cars (name,make) VALUES ($1,$2) returning * ',values);
   console.log(vv.rows[0])
   await queHelper.createJob(name,make);
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
