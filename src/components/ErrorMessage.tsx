import { useRouteError } from "react-router-dom"
import bugfix from '../assets/bugfix.svg'
const ErrorMessage = () => {
   const error = useRouteError() as {message: string}
   console.log(error)
   return (
      <div className='flex items-center justify-center flex-col gap-8'>
         <img className='w-[30vw]' src={bugfix} alt='' />
         <h2 className='text-2xl text-center'>{error.message}</h2>

         <button onClick={() => location.reload()} className='btn btn-accent btn-outline'>Try again</button>

      </div>
   )
}

export default ErrorMessage
