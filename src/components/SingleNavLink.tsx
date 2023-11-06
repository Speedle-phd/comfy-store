import { NavLink } from 'react-router-dom'

type TSingleNavLinkProps = {
   link: string
   title: string
   end?: boolean
}

const SingleNavLink = ({link, title, end} : TSingleNavLinkProps) => {
   return (
      <li>
         <NavLink
            unstable_viewTransition
            className={({ isActive }) =>
               [
                  isActive ? 'bg-primary rounded-lg text-base-100' : '',
                  'px-4 py-2 rounded-lg hover:bg-base-100 hover:text-accent focus-visible:bg-base-100 focus-visible:text-accent',
               ].join(' ')
            }
            to={link}
            end={end ?? false}
         >
            {title}
         </NavLink>
      </li>
   )
}

export default SingleNavLink
