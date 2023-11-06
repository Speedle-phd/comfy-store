import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useEffect, useRef } from 'react'
import { useLocalstorage } from '../hooks/useLocalstorage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomModal from '../components/CustomModal'
import { useModalContext } from '../context/ModalProvider'
import { signal } from '@preact/signals-react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { calculateAmount, calculateTaxTotal, calculateCartTotal } from '../redux/cart'

export type TUser = {
   jwt: string;
   user: {
      id: number
      username: string
      email: string
      provider: string
      confirmed: boolean
      blocked: boolean
      createdAt: string
      updatedAt: string

   }
}

// eslint-disable-next-line react-refresh/only-export-components
export const lightmodeSignal = 'winter'
// eslint-disable-next-line react-refresh/only-export-components
export const darkmodeSignal = 'halloween'

// eslint-disable-next-line react-refresh/only-export-components
export const user = signal(
   localStorage.getItem('comfy-user')
      ? JSON.parse(localStorage.getItem('comfy-user')!)
      : null
)

const Root = () => {
   const { isModalOpen, modalContent } = useModalContext()!
   const rootRef = useRef<HTMLDivElement>(null)
   const [darkmode, alterDarkmode] = useLocalstorage<string>(
      'comfy-store-darkmode'
   )
   const dispatch = useAppDispatch()
   const cart = useAppSelector(state => state.cart)
   const changeTheme = () => {
      rootRef.current!.dataset.theme =
         rootRef.current!.dataset.theme === lightmodeSignal
            ? darkmodeSignal
            : lightmodeSignal
      alterDarkmode(rootRef.current!.dataset.theme.toString())
   }

   useEffect(() => {
      dispatch(calculateAmount())
      dispatch(calculateTaxTotal())
      dispatch(calculateCartTotal())
   }, [cart, dispatch])

   return (
      <div
         ref={rootRef}
         data-theme={darkmode ?? darkmodeSignal}
         className=' relative min-h-[100dvh]'
      >
         {isModalOpen ? (
            <CustomModal className='fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>
               {modalContent}
            </CustomModal>
         ) : null}
         <ToastContainer
            theme={darkmode === lightmodeSignal ? 'light' : 'dark'}
            position={'top-center'}
            autoClose={3000}
         />
         <Navbar changeTheme={changeTheme} darkmode={darkmode} />
         <main className='w-root-container mx-auto mt-20'>
            <Outlet />
         </main>
      </div>
   )
}

export default Root
