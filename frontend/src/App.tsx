// import React from 'react'
import Navbar from '../components/Navbar'
import Module from '../components/Models'
import InputText from '../components/InputText'
export default function App() {
  return (
    <> 
        <section id='main' className="flex-1 h-screen bg-background-tertiary justify-center flex-col">
          <Navbar />
          <Module />
          <InputText />
        </section>
    </>
   
  )
}
