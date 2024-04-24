const  mongoose = require("mongoose");


const MONGODB_URI = 'mongodb+srv://user2000:test234@cluster0.bnjolls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const connect = mongoose.connect(MONGODB_URI);


connect.then(()=>{
  console.log("database success");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

const LoginSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required: true
  }
});

const collection = new mongoose.model("users", LoginSchema);
module.exports = collection;