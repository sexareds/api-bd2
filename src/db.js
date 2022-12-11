import { createPool } from 'mysql2/promise';

//Create a pool of connections to the database
export const pool = createPool({
  host: 'labs-dbservices01.ucab.edu.ve',
  port: '3306',
  user: 'bd2_202315_g1',
  password: 'c1TqBrI7HDbku9Lk', 
  database: 'bd2_202315_api-db'
}); 

//For local testing when UCAB server is down
// export const pool = createPool({
//   host: 'localhost',
//   port: '3306',
//   user: 'root',
//   password: 'password', 
//   database: 'bd2_202315_api-db'
// }); 