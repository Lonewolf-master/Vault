import { Send } from 'lucide-react'

type InputTextProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
}

export default function InputText({ value, onChange, onSubmit, disabled }: InputTextProps) {
  return (
    <section id='inputtext' className='flex justify-center w-full px-4 py-4'>
      <div className='flex w-full max-w-5xl gap-x-4'>
        <div className='flex-1'>
          <input
            type='text'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onSubmit()
              }
            }}
            placeholder='Message Vault'
            className='w-full border-2 border-text-muted/50 rounded-3xl py-4 px-6 text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-active focus:ring-2 focus:ring-primary-active/10 transition-all duration-200 text-lg bg-surface-DEFAULT'
            disabled={disabled}
          />
        </div>

        <button
          type='button'
          onClick={onSubmit}
          disabled={disabled}
          className='z-10 px-6 rounded-2xl bg-primary-active hover:bg-primary-hover transition-colors flex items-center justify-center text-text-primary font-semibold gap-x-2 disabled:cursor-not-allowed disabled:opacity-50'
        >
          <Send className='text-background-primary' size={25} />
          <span className='text-background-primary font-bold'>Send</span>
        </button>
      </div>
    </section>
  )
}
