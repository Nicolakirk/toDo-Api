const { fetchItems, fetchItemsById, insertItem, removeTodoById, editTodoItem } = require("../models/items_model");

exports.getItems = (req, res) => {
  fetchItems()
    .then((items) => {
      res.status(200).send(items);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getItemsByID = (req, res, next) => {
  const { todo_id } = req.params;

  fetchItemsById(todo_id)
    .then((item) => {
      res.status(200).send(item);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postItem = (req, res, next) => {
  const itemBody = req.body;
  insertItem(itemBody)
    .then((item) => {
      res.status(201).send({ item });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteTodo = (req, res, next) => {
  const { todo_id } = req.params;
  removeTodoById(todo_id)
    .then(() => {
      res.status(204).send();  // Send No Content response
    })
    .catch((err) => {
      return res.status(404).send('Todo not found');
      next(err);  // Forward error to Express error handler
    });
};

exports.patchTodoItem= (req, res, next) =>{
          
          const  { todo_id }= req.params;
          const itemBody = req.body
          console.log(todo_id, itemBody)
       editTodoItem (todo_id, itemBody)
    .then((item)=>{
      
  res.status(201).send({ item })
})
.catch((err)=>{
  next( err);
}); 
}

        