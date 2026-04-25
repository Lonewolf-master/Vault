const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
  },
  sender: {
    type: {
      type: String,
      enum: ['user', 'ai'],
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    aiAgent: {
      model: String,
      name: String
    }
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  metadata: {
    tokens: Number,
    model: String,
    responseTime: Number
  }
});

module.exports = mongoose.model('Message', messageSchema);