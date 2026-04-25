
export default function Models() {
  const models = [
    {
      name: "Claude",
      company: "Anthropic",
      image: "../src/assets/claude-color.png",
      brand: "claude",
    },
    {
      name: "GPT-4o",
      company: "OpenAI",
      image: "../src/assets/openai.png",
      brand: "gpt",
    },
    {
      name: "Gemini 3.1 Pro",
      company: "Google",
      image: "../src/assets/gemini-color.png",
      brand: "gemini",
    },
    {
      name: "DeepSeek",
      company: "DeepSeek",
      image: "../src/assets/deepseek-color.png",
      brand: "deepseek", 
    },
    {
      name: "Meta",
      company: "Meta",
      image: "../src/assets/meta-color.png",
      brand: "meta",
    },
    {
      name: "Grok",
      company: "X",
      image: "../src/assets/grok.png",
      brand: "grok",
    },
    {
      name: "gemma",
      company: "Google",
      image: "../src/assets/gemma-color.png", 
      brand: "gemma",
    }
  ];

const brandStyles: Record<string, { border: string; glow: string; shadow: string }> = {
    claude: {
      border: 'border-model-claude/30 hover:border-model-claude',
      glow: 'bg-model-claude/10',
      shadow: 'hover:shadow-[0_0_30px_rgba(217,119,87,0.2)]'
    },
    gpt: {
      border: 'border-model-gpt/30 hover:border-model-gpt',
      glow: 'bg-model-gpt/10',
      shadow: 'hover:shadow-[0_0_30px_rgba(16,163,127,0.2)]'
    },
    gemini: {
      border: 'border-model-gemini/30 hover:border-model-gemini',
      glow: 'bg-model-gemini/10',
      shadow: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
    },
    deepseek: {
      border: 'border-model-deepseek/30 hover:border-model-deepseek',
      glow: 'bg-model-deepseek/10',
      shadow: 'hover:shadow-[0_0_30px_rgba(77,107,254,0.2)]'
    },
    meta: {
      border: 'border-model-meta/30 hover:border-model-meta',
      glow: 'bg-model-meta/10',
      shadow: 'hover:shadow-[0_0_30px_rgba(29,101,193,0.2)]'
    },
    grok: {
      border: 'border-model-grok/30 hover:border-model-grok',
      glow: 'bg-model-grok/10',
      shadow: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]'
    },
    gemma: {
      border: 'border-model-gemma/30 hover:border-model-gemma',
      glow: 'bg-model-gemma/10',
      shadow: 'hover:shadow-[0_0_30px_rgba(46,150,255,0.2)]'
    }
  };

  return (
    <section className='flex  flex-wrap justify-center items-center py-10 w-full gap-5'>
      {
        models.map( (model, index) => {

          //Note here check how this works, deleting the Record<string, { border: string; glow: string; shadow: string }>e will cause an error
          const styles = brandStyles[model.brand];

          return (
          <div key={index} className={`group relative bg-surface-DEFAULT p-8 border-2 ${styles.border} rounded-3xl flex items-center flex-col gap-4 justify-center transition-all duration-500 ${styles.shadow} hover:-translate-y-2 overflow-hidden w-72`}>
              {/* Subtle background glow effect */}
              <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 ${styles.glow} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              
              <img className='h-30 w-30 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 z-10' src={model.image} alt={model.name}/>
              
              <div className='flex flex-col items-center z-10'>
                  <h3 className='text-2xl font-bold text-text-primary tracking-wide'>{model.name}</h3>
                  <p className='text-sm text-text-muted mt-1'>{model.company}</p>
              </div>

              <button onClick={() => console.log(index)} className='mt-2 z-10 w-full bg-surface-hover border border-border-subtle hover:border-status-error/50 hover:bg-status-error/10 hover:text-status-error text-text-secondary transition-all duration-300 rounded-xl px-6 py-2.5 font-medium flex items-center justify-center gap-2 cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                  Remove
              </button>
          </div>
        )})
      }
    </section>
  )
}


