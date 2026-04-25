
export default function Messages() {
  // Mock data to demonstrate the chat layout
  const chatHistory = [
    { id: 1, role: 'user', content: 'Can you explain quantum computing in simple terms?', sender: 'You', color: 'text-primary-active', brand: "user" },
    { id: 2, role: 'ai', content: 'information. Unlike regular computers that use bits (0s and 1s) them to solve certain complex problems much faster.', sender: 'Claude', brand: 'claude' },
    { id: 3, role: 'ai', content: 'To add to what Claude said, think of a maze. A classical ssentially tries all paths at the same time.', sender: 'GPT-4o', brand: 'gpt' },
    { id: 4, role: 'user', content: 'Wow, that sounds incredibly powerful. Are there any downsides?' , sender: 'You', brand: "user" },
    { id: 5, role: 'ai', content: 'stray electromagnetic wave can cause "decoherence," making the qubits lose their quantum state and zero temperature.', sender: 'Gemini 3.1 Pro', brand: 'gemini' },
    { id: 6, role: 'ai', content: 'To add to what Claude said, think of a maze. A classical ssentially tries all paths at the same time.', sender: 'DeepSeek', brand: 'deepseek' },
  ];

  return (
    <div className='flex-1 flex flex-col min-h-0 overflow-y-auto text-white bg-background-tertiary/10 space-y-6 p-5'>
        {
            chatHistory.map((msg, index) => {
                    console.log(msg);
                    const isUser = msg.role === 'user';
                    const position = isUser ? 'self-end items-end text-end' : 'self-start items-start';

               return(

                <div key={index} className={` w-[90%] border-model-${msg.brand} ${position} border-2 rounded-2xl  flex flex-col py-3 px-2 `}>
                    <span className={`font-bold underline text-wrap mx-4 text-model-${msg.brand}`}>{msg.sender}</span>
                    <p className={`text-lg text-wrap  text-model-${msg.brand}`}>{msg.content}</p>
                </div>
                
               )
            })
        }
    </div>
  )
}



// ${isUser ? 'self-end items-end' : 'self-start items-start'}`}>