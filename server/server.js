var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} =  require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');
const {ObjectID} = require('mongodb'); 

var PortNum = 8080;
var Url = '/todos';    //Standard resource creation Url

var app = express();
const port =  process.env.PORT || PortNum;


//CRUD Create, Read, Update, Delete


//Midleware configuration
app.use(bodyParser.json());

//Create first route
app.post(Url, (req, res) =>
{
    //console.log(`Req/body = ${JSON.stringify(req.body,undefined,2)}`);
    var todo = new Todo(
      {
        text: req.body.text           //Echoing it right back
      });

      todo.save().then((doc) =>
      {
        res.send(doc);
      },
      (e) =>
      {
          res.status(400).send(e);
      });
});

//GET todos route
app.get(Url, (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//A GET route using a user supplied ID that is programmable
//URL name pattern  Url/:ToDoId
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  //Is the ID valid:  
  if (!ObjectID.isValid(id)) {
      console.log(`ID ${id} is not valid`);
      return res.status(404).send();
  }

  //Try to find the record with this valid looking ID
    Todo.findById(id).then((todo) => {
      if (todo)
        res.send({todo});
      else {
          console.log(`ID = ${id} was not found`);
          return res.status(404).send();
      }
  }).catch((e) => {
    console.log(`ID not valid:\n${JSON.stringify(e,undefined,2)}`)
    return res.status(400).send();
  });
});

app.listen(port, () =>
{
  console.log(`Listening on port #${port}, APP = ${app}`);
});

module.exports = {app};
