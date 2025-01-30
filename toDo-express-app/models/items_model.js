const db = require("../db/connection");

exports.fetchItems = () => {
  let selectItemsQueryString = `SELECT * FROM toDoItems`;

  return db.query(selectItemsQueryString).then((result) => {
    return result.rows;
  });
};

exports.fetchItemsById = (todo_id) => {
  const queryString = `SELECT * FROM toDoItems
    Where todo_id = $1;`;
  return db.query(queryString, [todo_id]).then((result) => {
    return result.rows[0];
  });
};

exports.insertItem = (itemBody) => {
  const { name, description, status } = itemBody;

  if (name === undefined || name.length === 0 || typeof name !== "string") {
    return Promise.reject({ status: 400, msg: "invalid input" });
  }

  const psqlQuery = `
     INSERT INTO todoItems
     (name, description, status)
     VALUES ($1, $2, $3)
     RETURNING *;`;

  return db.query(psqlQuery, [name, description, status]).then((result) => {
    console.log(result.rows[0])
    return result.rows[0];
  });
};

exports.removeTodoById = (todo_id) => {
  const psqlDeleteQuery = `DELETE FROM toDoItems WHERE todo_id = $1;`;

  const firstPsqlQuery = `SELECT * FROM toDoItems  WHERE todo_id = $1 ;`;

  return db
    .query(firstPsqlQuery, [todo_id])
    .then((results) => {
      if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else {
        return db.query(psqlDeleteQuery, [todo_id]);
      }
    })
    .then((results) => {
      return results;
    });
};
