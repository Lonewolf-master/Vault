// Meta (Llama 3 via Groq) API Chat Example
// This script demonstrates how to talk to Meta's Llama models using Groq's high-speed API.
// Groq provides an OpenAI-compatible endpoint.

const GROQ_API_KEY = "YOUR_GROQ_API_KEY"; // Replace with your Groq API Key

export default async function ChatWithMeta(prompt) {
  // Groq's OpenAI-compatible endpoint
  const url = "https://api.groq.com/openai/v1/chat/completions";

  // Define the request payload
  const data = {
    model: "llama-3.3-70b-versatile", // Or "llama-3.1-8b-instant"
    messages: [
      { role: "system", content: "You are a helpful Meta Llama assistant." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      // Response structure is identical to OpenAI
      console.log("Meta (Llama) says:", result.choices[0].message.content);
      return result.choices[0].message.content;
    } else {
      console.error("Error from Meta/Groq:", result.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Example usage:
// chatWithMeta("Hello Meta, write a poem about speed.");
