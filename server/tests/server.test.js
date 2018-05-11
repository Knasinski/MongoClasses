const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

var badID = '5af5d1b2b4de400fe8cd0fd9';

//Run this before each and every test case: Testing lifecycle method/  makes sure db is mt
// beforeEach((done) =>
// {
//     //86 all previously defined records
//     Todo.remove({}).then(() =>  done());
// });

const MyTodos = [
    {_id:  new ObjectID(), text: 'Todo #1'},
    {_id:  new ObjectID(), text: 'Todo #2'},
    {_id:  new ObjectID(), text: 'Todo #3'},
    {_id:  new ObjectID(), text: 'Todo #4'},
    {_id:  new ObjectID(), text: 'Todo #5'},
    {_id:  new ObjectID(), text: 'Todo #6'}];

beforeEach((done) =>
{
    //86 all previously defined records
    Todo.remove({}).then(() =>  {
        Todo.insertMany(MyTodos);
    }).then(() => done());
});

describe('POST /todos', () =>
{
    it('Should create a new Todo', (done) =>
    {
        var text = 'Test todo text';

        //Make requests via supertest
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) =>
            {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => 
            {
                if (err)
                {
                    return done(err);
                }

                //With the {text} inserted below, this only counts text not matching our list
                Todo.find({text}).then((todos) =>
                {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });
    it ('Should NOT create a new Todo because the data is NOT good', (done) =>
    {
        //Make requests via supertest
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => 
            {
                if (err)
                {
                    return done(err);
                }

                Todo.find().then((todos) =>
                {
                    expect(todos.length).toBe(MyTodos.length);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () =>
{
    it('Should get all todos', (done) =>
    {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(MyTodos.length);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('Should return the todo for the valid ID', (done) => {
        //Supertest request
        request(app)
            .get(`/todos/${MyTodos[4]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(MyTodos[4].text);
            })
            .end(done);
        });

        it('Should return 404 when todo is not found', (done) => {
            var hid = new ObjectID('5af5d1b2b4de400fe8cd0fd9');
            //Supertest request
            request(app)
                .get(`/todos/${hid}`)
                .expect(404)
                .end(done);
            });

            it('Should return 404 when non-object ID used', (done) => {
                //Supertest request
                request(app)
                    .get('/todos/123')
                    .expect(404)
                    .end(done);
                });
    });