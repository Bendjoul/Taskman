import { Outlet } from 'react-router-dom'
import taskMan  from '../assets/images/taskMan.jpeg'

function Layout() {

  return (
    <div className="flex h-screen w-screen bg-slate-200">
    <div className="hidden flex-1 items-center justify-center bg-gray-600 bg-cover lg:flex">
      <div className="max-w-2xl space-y-4 p-8 text-center text-white">
        <img src={taskMan} alt="dashboard widget" />
        <h1 className="text-4xl font-bold">Gestion des taches</h1>
        <p className="text-xs font-light">
          Espace de securité
        </p>
      </div>
    </div>

    <div className="flex flex-1 items-center justify-center bg-background ">
      <div className="max-w-md overflow-y-auto px-2 sm:w-[500px] ">
        <Outlet/>
      </div>
    </div>
  </div>
  )
}

export default Layout
    
   