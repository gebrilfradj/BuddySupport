require('dotenv').config();
const express = require('express');
const openai = require('openai');
const cors = require('cors');
const app = express();


app.use(cors());


const corsOptions = {
  origin: 'http://localhost:5501',  
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log(`Received ${req.method} request from ${req.origin} at ${req.url}`);
  next();
});


const client = new openai.OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    completion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": "You are BuddySupport. BuddySupport strictly focuses on mental health support. It avoids discussing topics outside of mental health to maintain its purpose and ensure the conversation remains relevant and helpful for users seeking assistance."
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
