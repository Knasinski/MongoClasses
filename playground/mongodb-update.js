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

    // db.collection('Todos').findOneAndUpdate({_id: new ObjectID('5af3378630eb4934e4c597e7')},
    // {
    //     $set: 
    //     {
    //         completed: true
    //     }
    // },
    // {
    //     returnOriginal: false                       //Otherwise it word return the object in it's before state.  We want to see the after state
    // }).then ((result) =>
    // {
    //     console.log(`findOneAndUptate modified result: ${JSON.stringify(result,undefined,2)}`)
    // })

    db.collection('Users').findOneAndUpdate(({name: 'd'}),
    {
    $set: 
        {
            name: 'Al Knasinski'        //STUCK HERE
        },
    $inc:
        {            
            age:  1
        }
    },
    {
        returnOriginal: false                       //Otherwise it word return the object in it's before state.  We want to see the after state
    }).then ((result) =>
    {
        console.log(`findOneAndUptate modified result: ${JSON.stringify(result,undefined,2)}`)
    })

    // client.close();
});