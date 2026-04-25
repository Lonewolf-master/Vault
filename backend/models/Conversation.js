const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'New Conversation'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  aiAgents: [{
    model: {
      type: String,
      required: true,
      enum: ['claude', 'gpt-4o', 'gemini', 'deepseek', 'grok', 'gemma']
    },
    name: {
      type: String,
      required: true
    },
    apiKey: String, // For different API keys if needed
    settings: {
      temperature: { type: Number, default: 0.7 },
      maxTokens: { type: Number, default: 1000 }
    }
  }],
  status: {
    type: String,
    enum: ['active', 'paused', 'completed'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

conversationSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Conversation', conversationSchema);