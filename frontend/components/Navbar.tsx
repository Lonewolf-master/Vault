// import React from 'react'
import { CircleFadingPlus, MessageCircleMore } from 'lucide-react'
export default function Navbar() {
  return (
      <nav className="flex justify-between items-center w-full px-10 border-b-3 border-white/20 py-5">

        <div>
          <h2 className='text-4xl font-bold text-primary-active'>Vault</h2>
        </div>

        <div className='text-xl font-bold text-text-primary flex items-center gap-2'>
          Welcome, to
          <b className="text-primary-active">Vault</b>
          an AI group chart
          <MessageCircleMore className='w-8 h-8 text-primary-active' />
        </div>

        <button className=' px-10 py-2 hover:bg-primary-active hover:text-white font-semibold text-primary-active border-primary-active border-3 cursor-pointer text-center  rounded-xl shadow-soft flex items-center gap-2 transition-all ease-in-out duration-300'>
          Add Models
          {/* add circular fading plus icon */}
          <CircleFadingPlus />
        </button>

      </nav>

  )
}
