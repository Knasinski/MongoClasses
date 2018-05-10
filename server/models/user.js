var mongoose = require('mongoose');

//Required model
var User = mongoose.model('User', 
{
    name:
        {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
    email:
        {
            type: String,
            required: true,
            minlength: 1,
            trim: true
        },
    password:
        {
            type: String
        }
});

module.exports = {User};