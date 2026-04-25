// Gemini API Chat Example
// This script demonstrates how to start a conversation with Google's Gemini API.

const GEMINI_API_KEY = "AIzaSyB8Q0EFA92L94udz1wfFJJ0A3gu5RDmWAk"; // Replace with your Google Gemini API Key

export default async function ChatWithGemini(prompt) {
  // Define the endpoint. Notice the API key is passed as a URL query parameter for Gemini.
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

  // Define the request payload using Gemini's specific structure
  const data = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      // Gemini's response text is inside candidates[0].content.parts[0].text
      const reply = result.candidates[0].content.parts[0].text;
      console.log("Gemini says:", reply);
      
      return { role: 'ai', content: reply, sender: 'Gemini', brand: 'gemini' };
      
    } else {
      console.error("Error from Gemini:", result.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Example usage:
// chatWithGemini("Hello Gemini, how are you today?");
