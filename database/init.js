const mongoose = require('mongoose');

module.exports = async function init()
{
	await mongoose.connect('mongodb+srv://rajuRaj1:PowerofoneHow123@cluster0.d7fy0.mongodb.net/todo?retryWrites=true&w=majority');
	console.log("connected to db")
}