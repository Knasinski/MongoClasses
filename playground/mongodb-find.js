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

    //db.collection('Todos').find({completed: false}).toArray().then((docs) =>
    // db.collection('Todos').find(
    //     {       //new ObjectID converts the string form of the ID into a real object
    //     _id : new ObjectID('5af3184930eb4934e4c597c2')}).toArray().then((docs) =>
    //     {   
    //         console.log(`Todos:\n${JSON.stringify(docs,undefined,2)}`)
    //     }, (err) =>
    //     {
    //         console.log(`Unable to fetch Todos: ${err}`);
    //     });

    // db.collection('Todos').find().count().then ((count) =>
    // {
    //     console.log(`Todos count:\n${count}`);
    // }, (err) =>
    // {
    //     console.log(`Unable to count Todos: ${err}`);
    // });

    db.collection('Users').find({name: 'Al Knasinski'}).count().then ((count) => 
    {
        db.collection('Users').find({name: 'Al Knasinski'}).toArray().then((docs) =>
        {
            console.log(`MyUsers(${count}):\n${JSON.stringify(docs,undefined,2)}`);
        }, (err) =>
        {
            console.log(`Unable to fetch Users: ${err}`);
        });
    }, (err) =>
    {    
        console.log(`Unable to count Users: ${err}`);
    });


    // client.close();
});