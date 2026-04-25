import {Send} from 'lucide-react'
import { useState } from 'react'
import useOpenAIStore from '../store/OpenAPI'

export default function InputText() {

    // Destructure all the model functions from the store
    const { addMessage, Gemini, Grok, Claude, GPT, DeepSeek, Gemma, Meta } = useOpenAIStore();
    
    // 1. Create a state variable to hold the text
    const [text, setText] = useState("");

    // 2. A function to handle sending the message
    const handleSend = () => {
        if (!text.trim()) return; // Don't send empty messages
        
        // Add the user's message to the chat
        addMessage('user', text, 'You', 'user');

        // Trigger ALL AIs to respond to this text
        callModels(text);
        
        // Clear the input box
        setText("");  
    };

    const callModels = async (promptText: string) => {
        // List out all the AI functions and their metadata
        const activeModels = [
            { func: Gemini, name: 'Gemini 1.5', brand: 'gemini' },
            { func: Claude, name: 'Claude 3', brand: 'claude' },
            { func: GPT, name: 'GPT-4o', brand: 'gpt' },
            { func: Grok, name: 'Grok', brand: 'grok' },
            { func: DeepSeek, name: 'DeepSeek', brand: 'deepseek' },
            { func: Gemma, name: 'Gemma', brand: 'gemma' },
            { func: Meta, name: 'Meta Llama', brand: 'meta' }
        ];

        // Loop through and fire them all off at the exact same time
        activeModels.forEach(async (model) => {
            try {
                // Call the API function
                const result = await model.func(promptText);
                
                // Some APIs (like your modified Gemini) return an object, others return a pure string.
                // This checks what we got and extracts the raw text:
                const replyContent = typeof result === 'string' ? result : result?.content;
                
                if (replyContent) {
                    addMessage('ai', replyContent, model.name, model.brand);
                }
            } catch (error) {
                console.error(`Error calling ${model.name}:`, error);
                
                // I have uncommented this line! 
                // Now, if an AI fails (e.g. missing API key), it will literally tell you in the chat!
                addMessage('ai', `Connection Error: Missing API key or network failure.`, model.name, model.brand);
            }
        });
    }
  
  return (
    <section id='inputtext' className="flex justify-center w-full px-4 pb-4 ">

      <div className="flex w-full max-w-2xl gap-x-2">
        
        <div className="flex-1">
          <input
            type="text"
            value={text} // 3. Bind the input value to our state
            onChange={(e) => setText(e.target.value)} // 4. Update state when typing
            onKeyDown={(e) => e.key === 'Enter' && handleSend()} // 5. Send on Enter key
            placeholder="Message Vault"
            className="w-full border-2 border-text-muted/50 rounded-3xl py-4 px-6  text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-active focus:ring-2 focus:ring-primary-active/10 transition-all duration-200 text-lg"
          />
        </div>

        <button onClick={handleSend} className="z-10  px-6 rounded-2xl bg-primary-active hover:bg-primary-hover transition-colors flex items-center justify-center group-hover:scale-105 text-text-primary font-semibold gap-x-2">
          <Send className="text-background-primary" size={25} />
          <h2 className="text-background-primary font-bold ">Send</h2>
        </button>

      </div>

    </section>
  );
};
