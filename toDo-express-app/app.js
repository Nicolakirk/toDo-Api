const createError = require('http-errors');
const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { getItems, getItemsByID, postItem, deleteTodo } = require('./controllers/items_controller');
const { endpoints } = require('./controllers/api_controller');
const { badRoute, handleCustomErrors, handlePSQL400s, handle500Statuses } = require('./controllers/errror-contoller');

const app = express();

// view engine setup
app.use(cors());

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api', endpoints);
app.get('/api/items', getItems);
app.get('/api/items/:todo_id',  getItemsByID);
app.post('/api/item_add', postItem)
app.delete('/api/todo/:todo_id', deleteTodo);

// catch 404 and forward to error handler


// error handler
app.use(badRoute);
app.use(handleCustomErrors);
app.use(handlePSQL400s);
app.use(handle500Statuses);

module.exports = app;
