// GPT (OpenAI) API Chat Example
// This script demonstrates how to start a conversation with OpenAI's GPT models.

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // Replace with your OpenAI API Key

export default async function ChatWithGPT(prompt) {
  // Define the endpoint for OpenAI chat completions
  const url = "https://api.openai.com/v1/chat/completions";

  // Define the request payload
  const data = {
    model: "gpt-4o", // You can also use "gpt-4-turbo" or "gpt-3.5-turbo"
    messages: [
      { role: "system", content: "You are a helpful assistant." }, // System instructions
      { role: "user", content: prompt } // The user's message
    ],
    temperature: 0.7 // Controls randomness (0.0 = strict, 1.0 = creative)
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`, // Standard Bearer token authentication
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      // OpenAI's response text is inside choices[0].message.content
      console.log("GPT says:", result.choices[0].message.content);
      return result.choices[0].message.content;
    } else {
      console.error("Error from OpenAI:", result.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Example usage:
// chatWithGPT("Hello GPT, how are you today?");
