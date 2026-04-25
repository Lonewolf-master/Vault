// Gemma (via Groq) API Chat Example
// This script demonstrates how to talk to Google's Gemma model via Groq's API.
// You can also use Gemma directly via Google Generative AI (same format as gemini.js), 
// but using Groq is often faster and follows the OpenAI format.

const GROQ_API_KEY = "YOUR_GROQ_API_KEY"; // Replace with your Groq API Key

async function chatWithGemma(prompt) {
  // Groq's OpenAI-compatible endpoint
  const url = "https://api.groq.com/openai/v1/chat/completions";

  // Define the request payload
  const data = {
    model: "gemma2-9b-it", // Gemma 2 model hosted on Groq
    messages: [
      { role: "system", content: "You are Gemma, a helpful assistant." },
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
      console.log("Gemma says:", result.choices[0].message.content);
      return result.choices[0].message.content;
    } else {
      console.error("Error from Gemma/Groq:", result.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Example usage:
// chatWithGemma("Hello Gemma, summarize the history of AI.");
