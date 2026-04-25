// DeepSeek API Chat Example
// This script demonstrates how to start a conversation with DeepSeek API.
// Note: DeepSeek uses an API structure identical to OpenAI, making it very easy to switch.

const DEEPSEEK_API_KEY = "YOUR_DEEPSEEK_API_KEY"; // Replace with your DeepSeek API Key

async function chatWithDeepSeek(prompt) {
  // Define the endpoint for DeepSeek chat completions
  const url = "https://api.deepseek.com/chat/completions";

  // Define the request payload
  const data = {
    model: "deepseek-chat", // Or "deepseek-coder"
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      // Response structure is identical to OpenAI
      console.log("DeepSeek says:", result.choices[0].message.content);
      return result.choices[0].message.content;
    } else {
      console.error("Error from DeepSeek:", result.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Example usage:
// chatWithDeepSeek("Hello DeepSeek, explain arrays in JS.");
