const mongoose = require('mongoose');

const db = async () => {
    await mongoose.connect("mongodb+srv://kushangtanawala:1234@cluster0.i10uonz.mongodb.net/BlogData")
    console.log("database connected");
}

module.exports = db
