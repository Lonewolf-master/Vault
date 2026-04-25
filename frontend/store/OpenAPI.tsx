import {create} from "zustand";
import ChatWithGemini from "../libs/gemini";
import ChatWithGemma from "../libs/gemma";
import ChatWithClaude from "../libs/claude";
import ChatWithGrok from "../libs/grok";
import ChatWithGPT from "../libs/gpt";
import ChatWithMeta from "../libs/meta";
import ChatWithDeepSeek from "../libs/deepseek";
import SpeakWithBrowser from "../libs/tts-browser"

import SpeakWithOpenAI from "../libs/tts-openai"

// import axios from "axios";

export const useOpenAIStore = create((set) => ({

    Gemini: ChatWithGemini,

    Gemma: ChatWithGemma,

    Claude: ChatWithClaude,

    Grok: ChatWithGrok,

    GPT: ChatWithGPT,

    Meta: ChatWithMeta,

    DeepSeek: ChatWithDeepSeek,

    defaultSound: SpeakWithBrowser,

    APISound: SpeakWithOpenAI

    

}))

export default useOpenAIStore;