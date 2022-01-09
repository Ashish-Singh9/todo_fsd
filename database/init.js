require('dotenv').config()

const mongoose = require('mongoose');

module.exports = async function init()
{
	await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}`);
	console.log("connected to db")
}