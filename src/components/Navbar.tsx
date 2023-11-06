import { cn } from '../utility/utility'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaBarsStaggered } from 'react-icons/fa6'
import DarkmodeToggle from './DarkmodeToggle'
import { Link } from 'react-router-dom'
import NavigationLinks from './NavigationLinks'
import LoginLinks from './LoginLinks'
import Logout from './Logout'
import { user } from '../layouts/Root'
import { useAppSelector } from '../hooks/reduxHooks'
type NavbarProps = React.HTMLAttributes<HTMLElement> & {
   darkmode: string
   changeTheme: () => void
}

const Navbar = ({
   darkmode,
   changeTheme,
   className,
   ...props
}: NavbarProps) => {
   const cartAmount = useAppSelector(state => state.cart.itemsAmount)
   return (
      <nav
         {...props}
         className={cn('bg-base-300 flex items-center flex-col', className)}
      >
         <div className='nav__auth bg-base-100 w-full py-2'>
            <div className='w-root-container flex justify-end gap-4 mx-auto items-center'>
               {!user.value ? <LoginLinks /> : <Logout />}
            </div>
         </div>
         <div className='nav__content w-root-container mx-auto'>
            <div className='nav__content__navigation flex items-center justify-between py-4'>
               <Link
                  to='/'
                  className='text-base-300 font-semibold hidden lg:block'
               >
                  <div className='avatar placeholder '>
                     <div className='w-16 rounded bg-primary text-5xl'>C</div>
                  </div>
               </Link>

               <div className='dropdown lg:hidden'>
                  <label tabIndex={0} className='btn m-1'>
                     <FaBarsStaggered className="text-2xl"/>
                  </label>
                  <ul
                     // tabIndex={0}
                     className='dropdown-content z-[1] menu p-2 shadow bg-base-300 rounded-box w-52'
                  >
                     <NavigationLinks />
                  </ul>
               </div>

               <ul className='hidden lg:flex'>
                  <NavigationLinks />
               </ul>

               <div className='nav__content__icons flex items-center gap-6'>
                  <DarkmodeToggle
                     darkmode={darkmode}
                     className=''
                     changeTheme={changeTheme}
                  />
                  <Link
                     className='relative hover:text-secondary focus-visible:text-secondary'
                     to='cart'
                  >
                     <div className='badge absolute bottom-5 left-4 bg-primary'>
                        {cartAmount}
                     </div>
                     <AiOutlineShoppingCart className='text-3xl' />
                  </Link>
               </div>
            </div>
         </div>
      </nav>
   )
}

export default Navbar
