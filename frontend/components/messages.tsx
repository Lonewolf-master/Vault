import useOpenAIStore from '../store/OpenAPI'
import { useEffect, useRef } from 'react'

export default function Messages() {
  const { chatHistory } = useOpenAIStore();
  
  // 1. Create a reference to the bottom of the chat
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 2. Automatically scroll to that reference whenever chatHistory changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    // Added classes to hide the scrollbar but keep scrolling functionality!
    <div className='flex-1 flex flex-col min-h-0 overflow-y-auto text-white bg-background-tertiary/10 space-y-6 p-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
      {
        chatHistory.map((msg: any, index: number) => {
          const isUser = msg.role === 'user';
          const position = isUser ? 'self-end items-end text-end' : 'self-start items-start';

          return (

            <div key={index} className={` w-[90%]  ${position}  flex flex-col py-3 px-2 `}>
              <span className={`font-bold text-xl text-wrap mx-5 text-model-${msg.brand}`}>{msg.sender}</span>
              <p className={`text-lg text-wrap  text-white/80`}>{msg.content}</p>
              <p className={`text-sm font-semibold text-wrap text-model-${msg.brand} italic ${position} mt-3`}>{msg.id}</p>
            </div>

          )
        })
      }
      
      {/* 3. This is the invisible marker at the very bottom of the chat */}
      <div ref={messagesEndRef} />
    </div>
  )
}



// ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>