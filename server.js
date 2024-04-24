// Load environment variables from a .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const openai = require('openai');
const cors = require('cors');

// Create an Express app
const app = express();

// Enable CORS with default settings for all routes
app.use(cors());

// Define and apply CORS options for more fine-grained control
const corsOptions = {
  origin: 'http://localhost:5501',
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

// Log HTTP requests for debugging
app.use((req, res, next) => {
  console.log(`Received ${req.method} request from ${req.origin} at ${req.url}`);
  next();
});

// Initialize the OpenAI client with an API key
const client = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Define a POST route to handle chat interactions using OpenAI's API
app.post('/api/chat', async (req, res) => {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You are BuddySupport. BuddySupport focuses on mental health support."
        },
        req.body.messages[0]
      ]
    });
    res.json(completion);
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    res.status(500).send('Error processing your request');
  }
});

// Set the server to listen on a port and log the status
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
