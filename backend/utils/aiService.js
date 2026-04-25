const axios = require('axios');

class AIService {
  constructor() {
    this.groqApiKey = process.env.GROQ_API_KEY;
    this.baseURL = 'https://api.groq.com/openai/v1';
  }

  // Map model names to Groq model IDs
  getModelId(model) {
    const modelMap = {
      'claude': 'claude-3-5-sonnet-20241022', // Note: Groq may not have Claude, adjust as needed
      'gpt-4o': 'gpt-4o',
      'gemini': 'gemini-1.5-pro',
      'deepseek': 'deepseek-chat',
      'grok': 'grok-1',
      'gemma': 'gemma-7b-it'
    };
    return modelMap[model] || 'llama-3.1-8b-instant'; // fallback
  }

  async generateResponse(agent, message, conversationHistory = []) {
    try {
      const modelId = this.getModelId(agent.model);
      
      const messages = [
        { role: 'system', content: `You are ${agent.name}, an AI assistant. Respond naturally in conversations.` },
        ...conversationHistory.map(msg => ({
          role: msg.sender.type === 'user' ? 'user' : 'assistant',
          content: msg.content
        })),
        { role: 'user', content: message }
      ];

      const response = await axios.post(`${this.baseURL}/chat/completions`, {
        model: modelId,
        messages,
        temperature: agent.settings?.temperature || 0.7,
        max_tokens: agent.settings?.maxTokens || 1000
      }, {
        headers: {
          'Authorization': `Bearer ${this.groqApiKey}`,
          'Content-Type': 'application/json'
        }
      });

      const startTime = Date.now();
      const content = response.data.choices[0].message.content;
      const responseTime = Date.now() - startTime;

      return {
        agent,
        content,
        metadata: {
          model: modelId,
          tokens: response.data.usage?.total_tokens,
          responseTime
        }
      };
    } catch (error) {
      console.error(`Error generating response for ${agent.name}:`, error);
      return {
        agent,
        content: `Sorry, I'm having trouble responding right now.`,
        metadata: {
          error: error.message
        }
      };
    }
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