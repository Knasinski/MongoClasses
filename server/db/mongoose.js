var mongoose = require('mongoose');

//The following uses promises from mongoose (which promise library - built in)
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

//Exporting mongoose variable so that when  someone requires this file, they get this variable

module.exports = {mongoose};