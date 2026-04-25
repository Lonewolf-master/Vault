// Web Speech API (Browser Built-in) Text-to-Speech
// ---------------------------------------------------------------------
// This is 100% Free and built into all modern browsers. It uses the user's 
// operating system voices, making it perfect for your React frontend.

function speakWithBrowser(text, aiName) {
  // Check if browser supports speech synthesis
  if (!('speechSynthesis' in window)) {
    console.error("Your browser does not support speech synthesis.");
    return;
  }

  // Create a new utterance (the thing to be spoken)
  const utterance = new SpeechSynthesisUtterance(text);

  // Get all available voices on the computer
  const voices = window.speechSynthesis.getVoices();

  // We can assign different voices to different AIs based on their name.
  // Note: The exact voices available depend on the user's OS (Windows/Mac/Linux).
  switch(aiName.toLowerCase()) {
    case 'gpt':
      // Find a male English voice
      utterance.voice = voices.find(v => v.name.includes('Male')) || voices[0];
      utterance.pitch = 1.0;
      utterance.rate = 1.0; // Normal speed
      break;
    
    case 'claude':
      // Find a female voice
      utterance.voice = voices.find(v => v.name.includes('Female')) || voices[0];
      utterance.pitch = 1.2; // Slightly higher pitch
      utterance.rate = 0.9; // Slightly slower, thoughtful pace
      break;

    case 'grok':
      // Let's make Grok sound deeper and faster
      utterance.voice = voices[0]; // Fallback to default
      utterance.pitch = 0.5; // Deep voice
      utterance.rate = 1.2; // Fast talker
      break;
      
    // Add other cases for Gemini, DeepSeek, Meta, Gemma...
    default:
      utterance.voice = voices[0];
      break;
  }

  // Tell the browser to speak!
  window.speechSynthesis.speak(utterance);
}

// Example usage:
// speakWithBrowser("Hello human, I am GPT-4o.", "gpt");
