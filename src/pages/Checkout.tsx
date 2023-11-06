import { useMutation } from "@tanstack/react-query"
import FormInput from "../components/FormInput"
import OrderCostOverview from "../components/OrderCostOverview"
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks"
import { convertMoney, getErrorMessage } from "../utility/utility"
import axios from "axios"
import '../api/axios.ts'
import { client } from "../main"
import { TCartObject, resetCart } from "../redux/cart.ts"
import { toast } from "react-toastify"
import Loading from "../components/Loading.tsx"
import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"

type TMutateBody = {
   name: string
   address: string
   numItemsInCart: number
   cartItems: TCartObject[]
   orderTotal: string
   chargeTotal: number
}

const Checkout = () => {

   const dispatch = useAppDispatch()
   const mutation = useMutation({
      mutationKey: ['order'],
      mutationFn: (body : TMutateBody) => {
         return axios.post('orders', {data: body})
      },
      onSuccess: () => {
         client.invalidateQueries({queryKey: ['orders']})
         client.removeQueries({queryKey: ['orders']})
         dispatch(resetCart())
         toast.success('Successfully placed your order')
      },
      onError: () => {
         toast.error('Something went wrong.')
      }
   })
   const cart = useAppSelector(state => state.cart)

   useEffect(() => {
      sessionStorage.setItem('comfy-cart', JSON.stringify(cart))
   }, [cart])

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      const name = formData.get('name') as string
      const address = formData.get('address') as string
      const numItemsInCart = cart.itemsAmount
      const chargeTotal = cart.cartTotal
      const cartItems = cart.items
      const orderTotal = `$${convertMoney(chargeTotal)}`
      const body = {
         name, address, numItemsInCart, cartItems, orderTotal, chargeTotal
      }
      mutation.mutate(body)
      

   }
   console.log(mutation.isPending, mutation.isError, mutation.isSuccess)

   if (mutation.isPending) return <Loading />
   if (mutation.isSuccess) return <Navigate to="/auth/orders" />
   if (mutation.isError) throw new Error(getErrorMessage(mutation.error))
   return (
      <div>
         <h2 className='text-3xl font-semibold py-8'>Place your Order</h2>
         <hr />
         <div className='grid grid-cols-1 lg:grid-cols-2'>
            <section className="mt-8">
               <h3 className="capitalize font-bold text-2xl">Shipping Information</h3>
               <form onSubmit={handleSubmit} className="grid py-8">
                  <FormInput label="First Name Name" type="text" name="name" />
                  <FormInput label="Address" type="text" name="address" />
                  <button type="submit" className="btn btn-primary mt-8">place your order</button>
               </form>
            </section>
            <OrderCostOverview
               cartTotal={cart.cartTotal}
               shipping={cart.shipping}
               tax={cart.tax}
               total={cart.total}
            />
         </div>
      </div>
   )
}

export default Checkout
