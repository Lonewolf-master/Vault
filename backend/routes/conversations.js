const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const aiService = require('../utils/aiService');

// Get all conversations
router.get('/', async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new conversation
router.post('/', async (req, res) => {
  try {
    const { title, aiAgents, participants } = req.body;
    const conversation = new Conversation({
      title,
      aiAgents,
      participants
    });
    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get conversation by ID
router.get('/:id', async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get messages for a conversation
router.get('/:id/messages', async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id })
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/:id/messages', async (req, res) => {
  try {
    const { content, sender } = req.body;
    
   
    const userMessage = new Message({
      conversationId: req.params.id,
      sender,
      content
    });
    await userMessage.save();

    // Get conversation to know which AI agents to respond
    const conversation = await Conversation.findById(req.params.id);
    
    // Generate AI responses
    const aiResponses = await aiService.generateResponses(conversation.aiAgents, content);
    
    // Save AI messages
    const savedAiMessages = [];
    for (const response of aiResponses) {
      const aiMessage = new Message({
        conversationId: req.params.id,
        sender: {
          type: 'ai',
          aiAgent: response.agent
        },
        content: response.content,
        metadata: response.metadata
      });
      await aiMessage.save();
      savedAiMessages.push(aiMessage);
    }

    res.status(201).json({
      userMessage,
      aiMessages: savedAiMessages
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update conversation
router.put('/:id', async (req, res) => {
  try {
    const conversation = await Conversation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete conversation
router.delete('/:id', async (req, res) => {
  try {
    await Conversation.findByIdAndDelete(req.params.id);
    await Message.deleteMany({ conversationId: req.params.id });
    res.json({ message: 'Conversation deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;