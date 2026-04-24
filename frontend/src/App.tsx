// import React from 'react'
import Navbar from '../components/navbar'

export default function App() {
  return (
    <> 
        <section id='main' className="flex-1 h-screen bg-background-tertiary justify-center flex-col">
          <Navbar />
          <div className="flex justify-center flex-col items-center">
            <h3 className='text-2xl font-bold'>My Name is Wisdom</h3>
            <button className=" h-10 w-20 font-semibold text-text-secondary text-center border border-border rounded-xl shadow-soft hover:bg-surface-hover">Vault</button>
          </div>
        </section>
    </>
   
  )
}
