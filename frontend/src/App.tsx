import Navbar from '../components/Navbar'
import Module from '../components/Models'
import InputText from '../components/InputText'
import Messages from '../components/messages'

export default function App() {
  return (
 
        <section id='main' className="flex h-screen flex-col bg-background-primary justify-center overflow-hidden">
          <Navbar />
            <section id='interaction' className='flex flex-1 flex-row w-full min-h-0'>

              <div className='flex-1 overflow-y-auto min-h-0'>
                <Module />
              </div>

              <div className='flex flex-col w-[40rem] shrink-0 justify-between border-l-3 border-white/20 min-h-0'>
                <Messages />
                <InputText />
              </div>

            </section>  
        </section>
   
  )
}
