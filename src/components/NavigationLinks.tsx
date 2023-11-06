
import { user } from '../layouts/Root'
import SingleNavLink from './SingleNavLink'

const NavigationLinks = () => {
   return (
      <>
            <SingleNavLink title={"Home"} link={"/"} end={true}/>
            <SingleNavLink title={"About"} link={"/about"}/>
            <SingleNavLink title={"Products"} link={"/products"}/>
            <SingleNavLink title={"Cart"} link={"/cart"}/>
            {user.value ? <><SingleNavLink title={"Checkout"} link={"auth/checkout"}/>
            <SingleNavLink title={"Orders"} link={"auth/orders"}/></> : null}
      </>
   )
}

export default NavigationLinks
