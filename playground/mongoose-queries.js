const {ObjectID} = require('mongodb');                          //Part of the better ID check
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var uid = '5af5d287b4de400fe8cd0fdb';
var id = '5af5c6cda68e53c04b3092a2';
var badId = '12341234';

var idUse = badId;

// if (!ObjectID.isValid(idUse)) {
//     console.log(`ID ${idUse} is not valid`);
// }
// else
// {
//     Todo.find({
//         _id: idUse                                 //Mongoose automatically converts to ID for use in the query
//     }).then((todos) => {
//         console.log(`Todo found: ${JSON.stringify(todos, undefined, 2)}`);
//     })


//     Todo.findOne({
//         _id: idUse                                 //Mongoose automatically converts to ID for use in the query
//     }).then((todo) => {
//         console.log(`Todo found: ${JSON.stringify(todo, undefined, 2)}`);
//     })

//     Todo.findById(idUse).then((todo) => {

//         if (todo)
//             console.log(`Todo by ID found: ${JSON.stringify(todo, undefined, 2)}`);
//         else
//             console.log('ID not found');
//     }).catch((e) => console.log(JSON.stringify(e,undefined,2)));
// }

//Validate ID
if (ObjectID.isValid(idUse)) {
    User.findById(idUse).then((thisUser) => {

        if (thisUser) {
            console.log(`User by ID found: ${JSON.stringify(thisUser, undefined, 2)}`);
        } else {
            console.log(`User with ID = ${idUse} was not found`);
        }
    }).catch((e) => console.log(`Unexpected error finding id: ${idUse}\nError = ${e}`));
} else {
    console.log(`ID = ${idUse} is not valid`);
}