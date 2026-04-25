// OpenAI TTS API (Premium & Highly Realistic)
// ---------------------------------------------------------------------
// If you want incredibly realistic voices, you can send the AI's text 
// to OpenAI's TTS service and play the audio file it returns.

const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

export default async function SpeakWithOpenAI(text, aiName) {
  const url = "https://api.openai.com/v1/audio/speech";

  // OpenAI offers 6 voices: alloy, echo, fable, onyx, nova, and shimmer
  let selectedVoice = "alloy"; // Default
  
  // Map specific AIs to specific OpenAI voices
  if (aiName.toLowerCase() === 'gpt') selectedVoice = 'echo';
  if (aiName.toLowerCase() === 'claude') selectedVoice = 'nova';
  if (aiName.toLowerCase() === 'grok') selectedVoice = 'onyx'; // Deep voice
  if (aiName.toLowerCase() === 'gemini') selectedVoice = 'shimmer'; 

  const data = {
    model: "tts-1", // Use "tts-1-hd" for even higher quality audio
    input: text,
    voice: selectedVoice,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      // The API returns an MP3 audio blob
      const audioBlob = await response.blob();
      
      // Create a local URL for the blob
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Play the audio immediately in the browser
      const audio = new Audio(audioUrl);
      audio.play();
    } else {
      console.error("TTS Error:", await response.json());
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}

// Example usage:
// speakWithOpenAI("I sound completely like a real human.", "gpt");
