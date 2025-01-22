const { fetchItems, fetchItemsById, insertItem } = require("../models/items_model");

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
  console.log("req",req.body)
  const itemBody = req.body;
  console.log('controller',itemBody)
  insertItem(itemBody)
    .then((item) => {
      console.log(item)
      res.status(201).send({ item });
    })
    .catch((err) => {
      next(err);
    });
};
