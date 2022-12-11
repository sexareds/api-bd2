import { pool } from '../db.js';

//a method that gets all elements from a specific table in the database
export async function getAll(req, res, table) {
  try {
    const response = await pool.query(`SELECT * FROM ${table}`);
    if (!response[0].length) {
      return res.status(404).json({success: false, message: `No ${table} found`});
    }
    res.status(200).json(response[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
};

//a method that gets an element by id from a specific table in the database
export async function getById(req, res, table, table_id) {
  try {
    const response = await pool.query(`SELECT * FROM ${table} WHERE ${table_id} = ?`, [req.params.id]);
    if (!response[0].length) {
      return res.status(404).json({success: false, message: `${table} not found`});
    }
    res.status(200).json(response[0]);
  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
};

//a method that creates a new element in a specific table in the database
export async function create(req, res, table, columns, body) {
  try {
    const response = await pool.query(`INSERT INTO ${table} (${columns}) VALUES (?)`, [body]);
    res.status(201).json({
      success: true,
      message: `${table} created successfully`,
      body: {
        [table]: body
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
};

//a method that updates an element by id in a specific table in the database
// export async function update(req, res, table, table_id, body, ...columns) {
//   try {
//     const response = await pool.query(`UPDATE ${table} SET ${columns} = ? WHERE ${table_id} = ?`, [body, req.params.id]);
//     if (!response[0].affectedRows) {
//       return res.status(404).json({success: false, message: 'User not found'});
//     }
//     res.status(200).json({
//       success: true,
//       message: `${table} updated successfully`,
//       body: {
//         [table]: body
//       }
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json('Internal Server Error');
//   }
// };

//a method that deletes an element by id from a specific table in the database
export async function remove(req, res, table, table_id) {
  try {
    const response = await pool.query(`DELETE FROM ${table} WHERE ${table_id} = ?`, [req.params.id]);
    if (!response[0].affectedRows) {
      return res.status(404).json({success: false, message: `${table} not found`});
    }
    res.status(200).json({success: true, message: `${table} deleted successfully`});
  } catch (e) {
    console.log(e);
    res.status(500).json('Internal Server Error');
  }
}