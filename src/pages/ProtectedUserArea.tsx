import { Navigate, Outlet } from 'react-router-dom'
import { user } from '../layouts/Root'

const ProtectedUserArea = () => {
   if (!user.value) return <Navigate to='/' />
   return <Outlet/>
}

export default ProtectedUserArea
