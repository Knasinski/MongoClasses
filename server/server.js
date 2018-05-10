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

//Create the Route
//Teacher recomended using /todos for resource creation
app.post('/todos', (req, res) =>
{
    // console.log(`Req body = ${JSON.stringify(req.body,undefined,2)}`);
    var todo = new Todo(
        {
            text: req.body.text,
            location: req.body.location 
        }
    );

    todo.save().then((doc) =>
    {
        res.send(doc);
    }, (e) =>
    {
        res.status(400).send(e);
        // console.log(`Post error = ${e}`);
    })
});

app.listen(8080, () =>
{
    console.log('Started on port 8080');
});




//Create one (instance of) Todo  ==> USES CONSTRUCTOR FUNCTION
// var newTodo = new Todo(
//     {
//         text: 'Cook dinner'
//     });
    
// //Save this to the database (This adds a promise.  The 'then' waits for the promise to be fulfilled)
// newTodo.save().then((doc) =>
// {
//     console.log(`Saved Todo:\n${JSON.stringify(doc, undefined,2)}`);
// }, (e) =>
// {
//     console.log(`Unable to save Todo: ${e}`);
// });

//Challenge 1: Make a new todo with all 3 values
// 

/* Challenge 2:
New mongoose model; User model email, password,
User: email (password later) = required, trimmed type string min length 1
Create new user
*/

// var newUser = new User(
//     {
//         name: 'Han Solo',
//         email: 'Han.Solo@MileniumFalcon.com'
//     });
    
// //Save this to the database (This adds a promise.  The 'then' waits for the promise to be fulfilled)
// newUser.save().then((doc) =>
// {
//     console.log(`Saved User:\n${JSON.stringify(doc, undefined,2)}`);
// }, (e) =>
// {
//     console.log(`Unable to save User: ${e}`);
// });