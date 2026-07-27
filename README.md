# Buddy Support

A mental-health support chatbot web app. Users sign up, log in, and chat with an OpenAI-backed assistant tuned to offer supportive, non-judgmental conversation and point toward mental health resources.

> **Disclaimer:** Buddy Support is a student project, not a medical or crisis service. It does not provide professional advice. If you are in crisis, contact your local emergency number or a crisis line such as **988** (Suicide & Crisis Lifeline, US).

## Demo

[Watch the demo on YouTube](https://youtu.be/u9zidY8NaXQ)

## Features

- **Chatbot interaction** — chat with an assistant prompted to focus on mental health support (`gpt-3.5-turbo`).
- **User accounts** — sign up and log in, with passwords hashed using bcrypt.
- **Resource pages** — static pages linking to mental health information and contact details.

## Technology stack

| Layer     | Technology                        |
| --------- | --------------------------------- |
| Frontend  | HTML, CSS, vanilla JS, EJS views  |
| Backend   | Node.js, Express                  |
| Database  | MongoDB (via Mongoose)            |
| AI        | OpenAI API                        |
| Libraries | bcrypt, cors, dotenv, ejs         |

## Architecture

The app currently runs as **two separate Express processes** plus a static frontend:

| Process       | Port                  | Responsibility                                        |
| ------------- | --------------------- | ----------------------------------------------------- |
| `src/index.js`| `5000`                | Signup/login, EJS views, MongoDB user storage          |
| `server.js`   | `3000` (or `$PORT`)   | `POST /api/chat` proxy to the OpenAI API               |
| Static HTML   | `5501`                | `index.html`, `chatbot.html`, `about.html`, etc.       |

`server.js` is configured to accept CORS requests from `http://localhost:5501`, which is the default port used by the VS Code Live Server extension.

## Getting started

### Prerequisites

- Node.js 18+
- A MongoDB database (local or Atlas)
- An OpenAI API key

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/gebrilfradj/BuddySupport.git
   cd BuddySupport
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   > `server.js` also requires `openai`, `cors`, and `dotenv`, which are not yet listed in `package.json`. Until they are added, install them explicitly:
   >
   > ```bash
   > npm install openai cors dotenv
   > ```

3. **Add your OpenAI key**

   Create a `.env` file in the project root (it is already git-ignored):

   ```
   OPENAI_API_KEY=sk-your-key-here
   PORT=3000
   ```

4. **Set your MongoDB connection**

   Update `MONGODB_URI` in `src/config.js` with your own connection string.

5. **Start both servers**

   ```bash
   node src/index.js   # auth server on http://localhost:5000
   node server.js      # chat API on http://localhost:3000
   ```

6. **Serve the frontend**

   Open the project in VS Code and start Live Server on port `5501`, then browse to
   `http://localhost:5501/index.html`.

## Usage

- Sign up or log in from the landing page.
- Open the chatbot page and type a message to talk with Buddy Support.
- Use the linked resources for further information and support.

## Known limitations

- The auth server and chat server are not yet unified; a single entry point with an `npm start` script would simplify setup.
- Sessions are not persisted after login, so the chatbot page is not gated behind authentication.
- Conversation history is not stored — each message is sent to OpenAI independently.
- Messages are sent to the OpenAI API and are subject to OpenAI's data policies.

## License

No license has been specified yet. Consider adding one if you want others to be able to reuse this code.
