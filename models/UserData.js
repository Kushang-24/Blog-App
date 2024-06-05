const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
    Image: String, 
    Name: String,
    Description: String
});

const BlogsDB = mongoose.model('BlogList', BlogsSchema);

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
  });
  
  const DataAuth = mongoose.model("userData",userSchema);


module.exports ={ BlogsDB , DataAuth};
