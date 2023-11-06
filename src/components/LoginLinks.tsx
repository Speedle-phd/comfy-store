
import { Link } from 'react-router-dom'

const LoginLinks = () => {
   return (
      <>
         <Link
            className='hover:underline hover:opacity-70 hover:underline-offset-2 focus-visible:underline focus-visible:opacity-90 focus-visible:underline-offset-2'
            to='login'
         >
            Sign in / Guest
         </Link>
         <Link
            className='hover:underline hover:opacity-70 hover:underline-offset-2 focus-visible:underline focus-visible:opacity-90 focus-visible:underline-offset-2'
            to='register'
         >
            Create Account
         </Link>
      </>
   )
}

export default LoginLinks
