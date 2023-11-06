import { toast } from 'react-toastify'
import { TUser, user } from '../layouts/Root'
import { client } from '../main'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
   const navigate = useNavigate()
   return (
      <>
         <h4>Hello, {(user.value as TUser)?.user.username}</h4>
         <button
            onClick={() => {
               user.value = null
               localStorage.removeItem('comfy-user')
               sessionStorage.removeItem('comfy-cart')
               client.removeQueries()
               toast.error('Successfully logged out')
               navigate('/')
            }}
            className='btn btn-outline btn-primary btn-sm'
         >
            LOGOUT
         </button>
      </>
   )
}

export default Logout
