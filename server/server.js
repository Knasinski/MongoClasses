var express = require('express');
var bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//CRUD = Create, Read, Update, Delete
//Take JSON and convert into an object
var app = express();

//App.use handles the middleware 
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
      text: req.body.text
    });
  
    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });
  
  app.listen(8080, () => {
    console.log('Started on port 8080');
  });
  
  module.exports = {app};