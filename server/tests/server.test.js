const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

console.log(`App = ${app}`)

//Run this before each and every test case: Testing lifecycle method/  makes sure db is mt
// beforeEach((done) =>
// {
//     //86 all previously defined records
//     Todo.remove({}).then(() =>  done());
// });

const MyTodos = [
    {text: 'Todo #1'},
    {text: 'Todo #2'},
    {text: 'Todo #3'},
    {text: 'Todo #4'},
    {text: 'Todo #5'},
    {text: 'Todo #6'},
    {text: 'Todo #7'},
    {text: 'Todo #8'}];

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