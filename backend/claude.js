// Claude API Chat Example
// This script demonstrates how to start a conversation with Anthropic's Claude model using the REST API.

const ANTHROPIC_API_KEY = "YOUR_ANTHROPIC_API_KEY"; // Replace with your Anthropic API Key

async function chatWithClaude(prompt) {
  // Define the endpoint. Claude uses the 'messages' endpoint.
  const url = "https://api.anthropic.com/v1/messages";

  // Define the request payload.
  const data = {
    model: "claude-3-opus-20240229", // Or "claude-3-5-sonnet-20240620"
    max_tokens: 1024,
    messages: [
      { role: "user", content: prompt }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01", // Required by Anthropic API
        "content-type": "application/json",
        "anthropic-dangerously-allow-browser": "true" // Only if running directly in frontend/browser
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    
    if (response.ok) {
      // Claude's response text is inside content[0].text
      console.log("Claude says:", result.content[0].text);
      return result.content[0].text;
    } else {
      console.error("Error from Claude:", result.error);
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Example usage:
// chatWithClaude("Hello Claude, how are you today?");
