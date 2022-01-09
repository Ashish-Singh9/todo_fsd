const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userDb = new Schema({
  name:{
    type: String,
    required:[true,"Its seems something is missing!!"]
  },
  email:{
    type: String,
    required:[true,"Its seems something is missing!!"],
    unique:[true,"user name has been taken!!"]
  },
  password:{
      type:String,
      required:[true,"Its seems something is missing!!"]
  },
  active:{
    type: Boolean,
    required:[true,"Its seems something is missing!!"]
  },
  todos:[{task:String,isComplete:Boolean,time:String,date:String}],
  secKey:String,
  isWc:Boolean
});


const userModel = mongoose.model('users', userDb);

module.exports = userModel;