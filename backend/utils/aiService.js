const axios = require('axios');

class AIService {
  constructor() {
    this.apiKeys = {
      groq: process.env.GROQ_API_KEY,
      openai: process.env.OPENAI_API_KEY,
      anthropic: process.env.ANTHROPIC_API_KEY,
      gemini: process.env.GEMINI_API_KEY,
      deepseek: process.env.DEEPSEEK_API_KEY,
      xai: process.env.XAI_API_KEY
    };
  }

  // Map models to their API provider and model ID
  getModelConfig(model) {
    const modelMap = {
      'gpt-4o': { provider: 'openai', id: 'gpt-4o', apiKey: this.apiKeys.openai },
      'claude': { provider: 'anthropic', id: 'claude-3-5-sonnet-20240620', apiKey: this.apiKeys.anthropic },
      'gemini': { provider: 'gemini', id: 'gemini-1.5-pro', apiKey: this.apiKeys.gemini },
      'deepseek': { provider: 'deepseek', id: 'deepseek-chat', apiKey: this.apiKeys.deepseek },
      'grok': { provider: 'xai', id: 'grok-beta', apiKey: this.apiKeys.xai },
      'gemma': { provider: 'groq', id: 'gemma2-9b-it', apiKey: this.apiKeys.groq },
      'meta': { provider: 'groq', id: 'llama-3.3-70b-versatile', apiKey: this.apiKeys.groq }
    };
    return modelMap[model] || { provider: 'groq', id: 'llama-3.1-8b-instant', apiKey: this.apiKeys.groq };
  }

  async generateResponse(agent, message, conversationHistory = []) {
    try {
      const config = this.getModelConfig(agent.model);
      
      if (!config.apiKey) {
        throw new Error(`API key missing for ${agent.model}`);
      }

      const content = await this.callModel(config, agent.name, message, conversationHistory, agent.settings);
      
      return {
        agent,
        content,
        metadata: {
          model: config.id,
          provider: config.provider
        }
      };
    } catch (error) {
      console.error(`Error generating response for ${agent.name}:`, error.message);
      return {
        agent,
        content: `Sorry, I'm having trouble responding right now. (${error.message})`,
        metadata: {
          error: error.message
        }
      };
    }
  }

  async callModel(config, agentName, message, conversationHistory, settings) {
    switch (config.provider) {
      case 'openai':
        return await this.callOpenAI(config, agentName, message, conversationHistory, settings);
      case 'anthropic':
        return await this.callClaude(config, agentName, message, conversationHistory, settings);
      case 'gemini':
        return await this.callGemini(config, agentName, message, conversationHistory, settings);
      case 'deepseek':
        return await this.callDeepSeek(config, agentName, message, conversationHistory, settings);
      case 'xai':
        return await this.callGrok(config, agentName, message, conversationHistory, settings);
      case 'groq':
        return await this.callGroq(config, agentName, message, conversationHistory, settings);
      default:
        throw new Error(`Unknown provider: ${config.provider}`);
    }
  }

  async callOpenAI(config, agentName, message, conversationHistory, settings) {
    const messages = [
      { role: 'system', content: `You are ${agentName}, an AI assistant. Respond naturally in conversations.` },
      ...conversationHistory.map(msg => ({
        role: msg.sender.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: config.id,
      messages,
      temperature: settings?.temperature || 0.7,
      max_tokens: settings?.maxTokens || 1000
    }, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  }

  async callClaude(config, agentName, message, conversationHistory, settings) {
    const messages = [
      ...conversationHistory.map(msg => ({
        role: msg.sender.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await axios.post('https://api.anthropic.com/v1/messages', {
      model: config.id,
      max_tokens: settings?.maxTokens || 1000,
      system: `You are ${agentName}, an AI assistant. Respond naturally in conversations.`,
      messages
    }, {
      headers: {
        'x-api-key': config.apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      }
    });

    return response.data.content[0].text;
  }

  async callGemini(config, agentName, message, conversationHistory, settings) {
    const parts = [];
    
    conversationHistory.forEach(msg => {
      if (msg.sender.type === 'user') {
        parts.push({ text: `User: ${msg.content}` });
      } else {
        parts.push({ text: `Assistant: ${msg.content}` });
      }
    });
    parts.push({ text: `You are ${agentName}. User: ${message}` });

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${config.apiKey}`,
      {
        contents: [
          {
            parts
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  }

  async callDeepSeek(config, agentName, message, conversationHistory, settings) {
    const messages = [
      { role: 'system', content: `You are ${agentName}, an AI assistant. Respond naturally in conversations.` },
      ...conversationHistory.map(msg => ({
        role: msg.sender.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await axios.post('https://api.deepseek.com/chat/completions', {
      model: config.id,
      messages,
      temperature: settings?.temperature || 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  }

  async callGrok(config, agentName, message, conversationHistory, settings) {
    const messages = [
      { role: 'system', content: `You are ${agentName}, a witty and rebellious assistant. Respond naturally in conversations.` },
      ...conversationHistory.map(msg => ({
        role: msg.sender.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await axios.post('https://api.x.ai/v1/chat/completions', {
      model: config.id,
      messages,
      temperature: settings?.temperature || 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  }

  async callGroq(config, agentName, message, conversationHistory, settings) {
    const messages = [
      { role: 'system', content: `You are ${agentName}, an AI assistant. Respond naturally in conversations.` },
      ...conversationHistory.map(msg => ({
        role: msg.sender.type === 'user' ? 'user' : 'assistant',
        content: msg.content
      })),
      { role: 'user', content: message }
    ];

    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: config.id,
      messages,
      temperature: settings?.temperature || 0.7,
      max_tokens: settings?.maxTokens || 1000
    }, {
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  }

  async generateResponses(aiAgents, message, conversationHistory = []) {
    // Generate responses from all AI agents
    const responses = await Promise.all(
      aiAgents.map(agent => this.generateResponse(agent, message, conversationHistory))
    );
    return responses;
  }

  // Method to handle multi-turn conversations where AIs respond to each other
  async generateConversationRound(aiAgents, currentMessage, conversationHistory = []) {
    const responses = [];
    
    for (const agent of aiAgents) {
      const response = await this.generateResponse(agent, currentMessage, conversationHistory);
      responses.push(response);
      
      // Add this response to history for next agent
      conversationHistory.push({
        sender: { type: 'ai', aiAgent: agent },
        content: response.content
      });
    }
    
    return responses;
  }
}

module.exports = new AIService();