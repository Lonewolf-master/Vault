
export default function Models() {
  return (
    <section className='flex justify-center items-center py-10 w-full'>
        <div className='group relative bg-surface-DEFAULT p-8 border border-model-claude/30 hover:border-model-claude rounded-3xl flex items-center flex-col gap-4 justify-center transition-all duration-500 hover:shadow-[0_0_30px_rgba(217,119,87,0.2)] hover:-translate-y-2 overflow-hidden w-72'>
            {/* Subtle background glow effect */}
            <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-model-claude/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none' />
            
            <img className='h-30 w-30 drop-shadow-2xl transition-transform duration-500 group-hover:scale-110 z-10' src="../src/assets/claude-color.png" alt="claude"/>
            
            <div className='flex flex-col items-center z-10'>
                <h3 className='text-2xl font-bold text-text-primary tracking-wide'>Claude</h3>
                <p className='text-sm text-text-muted mt-1'>Anthropic</p>
            </div>

            <button className='mt-2 z-10 w-full bg-surface-hover border border-border-subtle hover:border-status-error/50 hover:bg-status-error/10 hover:text-status-error text-text-secondary transition-all duration-300 rounded-xl px-6 py-2.5 font-medium flex items-center justify-center gap-2 cursor-pointer'>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                Remove
            </button>
        </div>
    </section>
  )
}
