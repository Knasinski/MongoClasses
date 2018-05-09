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

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>
    // {
    //     console.log(`Delete many returned: ${JSON.stringify(result)}`);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: "Eat yellow snow"}).then((result) =>
    // {
    //     console.log(`Delete one returned: ${JSON.stringify(result)}`);
    // });

    //findOneAndDelete   Difference between this and deleteOne is that this returns the complete record being deleted
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>
    // {
    //     console.log(`Delete one returned: ${JSON.stringify(result)}`);
    // });

    db.collection('Users').deleteMany({name: 'Al Knasinski'}).then((result) =>
    {
        console.log(`Delete many Al Knasinski returned: ${JSON.stringify(result)}`);

        db.collection('Users').findOneAndDelete({_id : new ObjectID('5af2ebe1b9d9b72c94df8cc9')}).then((result) =>
        {
            console.log(`Find and Delete One ID returned: ${JSON.stringify(result, undefined,2)}`);
        });
    });

    // client.close();
});