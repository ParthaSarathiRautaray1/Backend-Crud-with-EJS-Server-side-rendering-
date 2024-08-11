const mongoose = require('mongoose')
const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testapp1";

mongoose.connect(mongoURI, { useNewUrlParser: true , useUnifiedTopology: true})
const userSchema = mongoose.Schema({
    image: String,
    email: String,
    name : String
})


module.exports = mongoose.model('user', userSchema)