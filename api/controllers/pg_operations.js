const { Client } = require('pg');

//const client = new Client({ connectionString: process.env.DATABASE_URL,ssl: 'require' });

const client = new Client({ connectionString: process.env.DATABASE_URL});

const table = process.env.DBTABLE;
const skipDb = process.env.SKIPDB === 'true';

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

const createTable = (req,res) => {
  checkConnection().then(async() => {
    try {
        await client.query(`CREATE TABLE IF NOT EXISTS cars (id SERIAL PRIMARY KEY, name varchar(30),make varchar(30),owner varchar(40));`);
          console.log('Successfully created table.');
          res.json({
            data:{
                status:'success',
                code:200,
                details:"Table Succesfully created",
            }

          })
    } catch (error) {
      console.log(`Failed creating table: ${error}`);
    }
  });
 
};

// const insert = async (event, text, json) => {
//   const debugLog = logging.debugLogger('insertToTable');
//   await checkConnection();

//   debugLog(`Checking if ${table} exists.`);
//   const exists = await checkTable(table);

//   if (!exists) {
//     debugLog(`${table} does not exist, creating table.`);
//     await createTable(table);
//   }
//   const entry = (`[DB] --> EVENT field: ${event}\n--> TEXT field next line(s)\n${text}\n` +
//     `--> JSON field next line(s)\n${JSON.stringify(json)}`).replace(/\n/g, '\n[DB] ');

//   try {
//     if (skipDb) {
//       console.log('[insert] SKIPDB is true - skipping client.query');
//     } else {
//       await client.query(
//         `INSERT INTO ${table}(date, event, text, json) VALUES($1, $2, $3, $4)`,
//         [new Date(), event, text, JSON.stringify(json)],
//       );
//     }
//     debugLog(`Successfully inserted data into table ${table}.`);
//     console.log(`[DB] >>>>>>>>>>>> Successfully wrote database entry\n${entry}\n[DB] <<<<<<<<<<<<`);
//   } catch (error) {
//     debugLog(`Failed inserting into table ${table}.`);
//     console.log(`[DB] >>>>>>>>>>>> FAILED to write database entry\n${entry}\n[DB] <<<<<<<<<<<<`);
//   }
// };

module.exports = {  createTable }; 
 
