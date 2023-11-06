import { Link, useRouteError } from 'react-router-dom'
import notFound from '../assets/undraw_void_-3-ggu.svg'
import { darkmodeSignal } from '../layouts/Root'

const darkmode = localStorage.getItem('comfy-store-darkmode')

const PageError = () => {
   const error = useRouteError() as { statusText: string, status: number }
   return (
      <div data-theme={darkmode ? JSON.parse(darkmode) : darkmodeSignal} className="min-h-[100dvh] flex justify-center items-center flex-col gap-8">
         <img className="w-[70vw] md:w-[50vw] lg:w-[30vw]" src={notFound} alt="" />
         <h2 className="font-mono text-4xl">{error.status} - {error.statusText}</h2>
         <Link to="/">
            <button className="btn btn-accent btn-outline">Back to home</button>
         </Link>
      </div>
   )
}

export default PageError
