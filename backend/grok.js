// Grok (xAI) API Chat Example
// This script demonstrates how to start a conversation with Grok via the xAI API.
// xAI also follows the OpenAI-compatible API format.

const XAI_API_KEY = "YOUR_XAI_API_KEY"; // Replace with your xAI API Key

async function chatWithGrok(prompt) {
  // Define the endpoint for xAI
  const url = "https://api.x.ai/v1/chat/completions";

  // Define the request payload
  const data = {
    model: "grok-beta", // Use the appropriate Grok model identifier
    messages: [
      { role: "system", content: "You are Grok, a witty and rebellious assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${XAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      // Response structure is identical to OpenAI
      console.log("Grok says:", result.choices[0].message.content);
      return result.choices[0].message.content;
    } else {
      console.error("Error from Grok:", result.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Example usage:
// chatWithGrok("Hello Grok, tell me a joke.");
