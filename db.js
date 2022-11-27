import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'labs-dbservices01.ucab.edu.ve',
  user: 'bd2_202315_g1',
  password: 'c1TqBrI7HDbku9Lk',
  post: 3306,
  database: 'bd2_202315_api-db'
});