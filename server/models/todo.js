var mongoose = require('mongoose');

//Create a mongoose model (defines what we want to store)
var Todo = mongoose.model('Todo', 
{
    text:
        {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
    location:
        {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
    completed:
        {
            type: Boolean,
            default: false
        },
    completedAt:
        {
            type: Number,
            default: null
        }
});

module.exports = {Todo};