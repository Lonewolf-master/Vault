import {create} from "zustand";
// @ts-ignore
import ChatWithGemini from "../libs/gemini";
// @ts-ignore
import ChatWithGemma from "../libs/gemma";
// @ts-ignore
import ChatWithClaude from "../libs/claude";
// @ts-ignore
import ChatWithGrok from "../libs/grok";
// @ts-ignore
import ChatWithGPT from "../libs/gpt";
// @ts-ignore
import ChatWithMeta from "../libs/meta";
// @ts-ignore
import ChatWithDeepSeek from "../libs/deepseek";
// @ts-ignore
import SpeakWithBrowser from "../libs/tts-browser"
// @ts-ignore
import SpeakWithOpenAI from "../libs/tts-openai"

// import axios from "axios";

export const useOpenAIStore = create<any>((set) => ({

    Gemini: ChatWithGemini,

    Gemma: ChatWithGemma,

    Claude: ChatWithClaude,

    Grok: ChatWithGrok,

    GPT: ChatWithGPT,

    Meta: ChatWithMeta,

    DeepSeek: ChatWithDeepSeek,

    defaultSound: SpeakWithBrowser,

    APISound: SpeakWithOpenAI,

    chatHistory: [
        { id: new Date().toLocaleString(), role: 'user', content: 'Can you explain quantum computing in simple terms?', sender: 'You', brand: "user" },
        { id: new Date().toLocaleString(), role: 'ai', content: 'information. Unlike regular computers that use bits (0s and 1s) them to solve certain complex problems much faster.', sender: 'Claude', brand: 'claude' },
        { id: new Date().toLocaleString(), role: 'ai', content: 'To add to what Claude said, think of a maze. A classical ssentially tries all paths at the same time.', sender: 'GPT-4o', brand: 'gpt' },
        { id: new Date().toLocaleString(), role: 'user', content: 'Wow, that sounds incredibly powerful. Are there any downsides?' , sender: 'You', brand: "user" },
        { id: new Date().toLocaleString(), role: 'ai', content: 'stray electromagnetic wave can cause "decoherence," making the qubits lose their quantum state and zero temperature.', sender: 'Gemini 3.1 Pro', brand: 'gemini' },
        { id: new Date().toLocaleString(), role: 'ai', content: 'To add to what Claude said, think of a maze. A classical ssentially tries all paths at the same time.', sender: 'DeepSeek', brand: 'deepseek' },
    ],

    addMessage: (role: string, content: string, sender: string, brand: string) => {
        const newMessage = {
            id: new Date().toLocaleString(),
            role,
            content,
            sender,
            brand
        };
        
        set((state: any) => ({
            chatHistory: [...state.chatHistory, newMessage]
        }));
    }


}))

export default useOpenAIStore;