// Import the mongoose library to interact with MongoDB
const mongoose = require("mongoose");

// MongoDB URI containing the connection information and credentials for the MongoDB cluster
const MONGODB_URI = 'mongodb+srv://user2000:test234@cluster0.bnjolls.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB using the connection URI provided above
const connect = mongoose.connect(MONGODB_URI);

// Handling the successful database connection
connect.then(() => {
  console.log("database success");  // Log to console if the connection is successful
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error); // Handle any errors during connection
});

// Define a new schema for the 'Login' feature, specifying the data structure for user credentials
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,     // Defines 'name' as a string
    required: true    // Makes the 'name' field mandatory
  },
  password: {
    type: String,     // Defines 'password' as a string
    required: true    // Makes the 'password' field mandatory
  }
});

// Create a model from the schema to interface with the 'users' collection in MongoDB
const collection = new mongoose.model("users", LoginSchema);

// Export the model so it can be used in other parts of the application
module.exports = collection;
