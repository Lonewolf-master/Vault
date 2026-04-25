# Vault Backend

Backend API for the Vault AI chat application built with Node.js, Express, and MongoDB.

## Features

- Multi-AI conversation management
- Real-time chat with Socket.io
- AI agent configuration and management
- Conversation history storage
- RESTful API endpoints

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env` file and add your API keys
   - Set up MongoDB connection

3. Start the server:
   ```bash
   npm run dev  # For development with nodemon
   npm start    # For production
   ```

## API Endpoints

### Conversations

- `GET /api/conversations` - Get all conversations
- `POST /api/conversations` - Create new conversation
- `GET /api/conversations/:id` - Get conversation by ID
- `PUT /api/conversations/:id` - Update conversation
- `DELETE /api/conversations/:id` - Delete conversation

### Messages

- `GET /api/conversations/:id/messages` - Get messages for conversation
- `POST /api/conversations/:id/messages` - Send message to conversation

## Project Structure

```
backend/
├── models/          # MongoDB schemas
├── routes/          # API routes
├── utils/           # Utility functions (AI service)
├── middleware/      # Express middleware
├── config/          # Configuration files
├── server.js        # Main server file
├── package.json
├── .env             # Environment variables
└── README.md
```

## AI Integration

The backend integrates with Groq API to handle multiple AI models. Configure your API key in the `.env` file.

Supported models: Claude, GPT-4o, Gemini, DeepSeek, Grok, Gemma
