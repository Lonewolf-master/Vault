// import React from 'react'

export default function Navbar() {
  return (
      <nav className="flex justify-between items-center w-full px-10">
        <div>
          <h2 className='text-4xl font-bold text-primary'>Vault</h2>
        </div>
        <div className='text-xl font-bold'>Welcome, to <b className="text-primary-active">Vault</b> an AI group chart</div>
        <button className=' px-10 py-2 font-semibold text-text-secondary text-center border border-border rounded-xl shadow-soft hover:bg-surface-hover'>Add Models</button>
      </nav>

  )
}
