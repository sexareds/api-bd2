import { createPool } from 'mysql2/promise';
import config from './../config.js';

//Create a pool of connections to the database
export const pool = createPool({
  host: config.host,
  port: config.port,
  user: config.user,
  password: config.password,
  database: config.database
}); 

//For local testing when UCAB server is down
// export const pool = createPool({
//   host: 'localhost',
//   port: '3306',
//   user: 'root',
//   password: 'password', 
//   database: 'bd2_202315_api-db'
// }); 