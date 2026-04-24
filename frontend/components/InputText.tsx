import {Send} from 'lucide-react'

export default function InputText() {
  return (
    <section id='inputtext' className="flex justify-center w-full px-4 py-8">

      <div className="flex w-full max-w-5xl gap-x-5">
        
        <div className="flex-1">
          <input
            type="text"
            placeholder="Message Vault"
            className="w-full border-2 border-text-muted/50 rounded-3xl py-4 px-6  text-text-primary placeholder-text-muted focus:outline-none focus:border-primary-active focus:ring-2 focus:ring-primary-active/10 transition-all duration-200 text-lg"
          />
        </div>

        <button className="z-10  px-6 rounded-2xl bg-primary-active hover:bg-primary-hover transition-colors flex items-center justify-center group-hover:scale-105 text-text-primary font-semibold gap-x-2">
          <Send className="text-background-primary" size={25} />
          <h2 className="text-background-primary font-bold ">Send</h2>
        </button>

      </div>

    </section>
  );
};
