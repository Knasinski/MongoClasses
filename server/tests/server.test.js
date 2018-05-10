const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

//Run this before each and every test case: Testing lifecycle method/  makes sure db is mt
beforeEach((done) =>
{
    //86 all previously defined records
    Todo.remove({}).then(() =>  done());
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

                Todo.find().then((todos) =>
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
                    expect(todos.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });
});
