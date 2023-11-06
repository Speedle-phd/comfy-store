import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks'
import { user } from '../layouts/Root'
import { convertMoney } from '../utility/utility'
import { removeItem, updateItem } from '../redux/cart'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import OrderCostOverview from '../components/OrderCostOverview'

const Cart = () => {
   const cartItems = useAppSelector((store) => store.cart.items)
   const cart = useAppSelector((state) => state.cart)
   const dispatch = useAppDispatch()

   useEffect(() => {
      sessionStorage.setItem('comfy-cart', JSON.stringify(cart))
   }, [cart])

   if (cartItems.length === 0) {
      return (
         <>
            <h2 className='text-3xl  py-8'>
               There isn't anything in your cart yet...
            </h2>
            <hr />
         </>
      )
   }

   return (
      <div className='pb-8'>
         <h2 className='text-3xl font-semibold py-8'>Shopping Cart</h2>
         <hr />
         <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8'>
            <section>
               <div className='mt-8'>
                  {(cartItems ?? [])?.map((el) => {
                     const {
                        amount,
                        productColor,
                        cartID: id,
                        price,
                        title,
                        company,
                        image,
                     } = el
                     const amountArray = Array.from(
                        { length: amount + 10 },
                        (_, index) => {
                           return index + 1
                        }
                     )
                     return (
                        <div
                           id={id}
                           key={id}
                           className='pl-8 md:pl-0 flex flex-col md:flex-row py-12 border-b-2 border-b-primary gap-4 justify-around'
                        >
                           <img
                              src={image}
                              alt={title}
                              className='w-40 aspect-square object-cover object-center rounded-lg'
                           />
                           <header className='flex flex-col gap-3'>
                              <h3 className='capitalize font-bold text-xl'>
                                 {title}
                              </h3>
                              <p>{company}</p>
                              <p>
                                 Color:{' '}
                                 <div
                                    style={{ backgroundColor: productColor }}
                                    className='w-3 h-3 rounded-full inline-block ml-2'
                                 ></div>
                              </p>
                           </header>
                           <div className='body'>
                              <div className='flex flex-col gap-3'>
                                 <label htmlFor='amount'>Amount:</label>
                                 <select
                                    className='max-w-[10vw]'
                                    name='amount'
                                    id='amount'
                                    defaultValue={amount}
                                    onChange={(e: React.ChangeEvent) => {
                                       const newValue = +(
                                          e.target as HTMLSelectElement
                                       ).value
                                       dispatch(
                                          updateItem({ id, amount: newValue })
                                       )
                                       toast.success(
                                          'Successfully changed amount of cart item'
                                       )
                                    }}
                                 >
                                    {amountArray.map((el, index) => {
                                       return <option key={index}>{el}</option>
                                    })}
                                 </select>
                                 <button
                                    onClick={() => {
                                       dispatch(removeItem(id))
                                       toast.success(
                                          'Successfully removed cart item'
                                       )
                                    }}
                                    className='w-fit text-accent font-bold hover:underline focus-visible:underline'
                                 >
                                    remove
                                 </button>
                              </div>
                           </div>
                           <p className='font-bold text-xl'>
                              ${convertMoney(price * amount)}
                           </p>
                        </div>
                     )
                  })}
               </div>
            </section>
            <section className='flex flex-col gap-8'>
               <OrderCostOverview
                  cartTotal={cart.cartTotal}
                  shipping={cart.shipping}
                  tax={cart.tax}
                  total={cart.total}
               />
               {!user.value ? (
                  <Link className='mx-auto' to='/login'>
                     <button className='btn btn-primary'>Please login</button>
                  </Link>
               ) : (
                  <Link className='mx-auto' to='/auth/checkout'>
                     <button className='btn btn-primary'>
                        Continue checkout
                     </button>
                  </Link>
               )}
            </section>
         </div>
      </div>
   )
}

export default Cart
