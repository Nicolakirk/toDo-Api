const createError = require('http-errors');
const express = require('express');

const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const { getItems, getItemsByID, postItem } = require('./controllers/items_controller');
const { endpoints } = require('./controllers/api_controller');

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
// catch 404 and forward to error handler


// error handler


module.exports = app;
