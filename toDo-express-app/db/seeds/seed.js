const format = require('pg-format');
const db = require('../connection');
const { convertTimestampToDate } = require('./utils');

const seed = ({ itemsData }) => {
  // Drop tables (Note: Ensure this runs successfully)
  return db
    .query('DROP TABLE IF EXISTS comments;')  // Drop comments table first (no need for promise chaining here)
    .then(() => db.query('DROP TABLE IF EXISTS toDoItems;'))  // Then drop toDoItems table
    .then(() => {
      // Create toDoItems table
      return db.query(`
        CREATE TABLE toDoItems (
          todo_id SERIAL PRIMARY KEY,
          name VARCHAR,
          description VARCHAR,
          status VARCHAR,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
    })
    .then(() => {
      // Create comments table
      return db.query(`
        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          body VARCHAR NOT NULL,
          todo_id INT REFERENCES toDoItems(todo_id) NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);
    })
    .then(() => {
      // Format and insert items into the toDoItems table
      const formattedItemsData = itemsData.map(convertTimestampToDate);  // Assuming you need this step

      const insertItemsQueryStr = format(
        'INSERT INTO toDoItems(name, description, status) VALUES %L RETURNING *;',
        formattedItemsData.map(({ name, description, status }) => [
          name, description, status
        ])
      );

      // Insert data into the table
      return db.query(insertItemsQueryStr);
    })
    .catch(err => {
      console.error('Error during seeding:', err);
      throw err;  // Optionally re-throw the error to handle it further upstream
    });
};

module.exports = seed;
