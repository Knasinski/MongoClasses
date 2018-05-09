// const MongoClient = require('mongodb').MongoClient;
//Object destructuring below retrieves two elements from mongodb structure
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

//An Example of Object Destructuring
// var user = {name: 'ObiWan', age: 534};
// var {name} = user;          //Destructuring statement
// console.log(name);

//Mongo execute mongod -dbpath C:\Users\aknasinski\mongo-data
//Mongo folder C:\Program Files\MongoDB\Server\3.6\bin

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>
{
    if (err)
    {
        return console.log(`Failed to connect to the database: ${err}`);
    }

    console.log('Connected to MongoDb server');
    const db = client.db('TodoApp');                        //A bit more work for Mongo 3.0

    // db.collection('Todos').insertOne(
    //     {
    //         text: 'Something to do',
    //         completed: false
    //     }, 
    //     (err, result) =>
    //     {
    //         if (err)
    //         {
    //             return console.log(`Failed to add to the database: ${err}`);
    //         }

    //         //Success code
    //         console.log(JSON.stringify(result.ops, undefined, 2));
    //     });


    //Insert new doc into Users (name, age location)
   
    

    client.close();
});