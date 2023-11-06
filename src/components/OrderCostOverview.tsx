
import { convertMoney } from '../utility/utility'

type TOrderCostProps = {
   [key: string]: number
}

const OrderCostOverview = ({cartTotal, shipping, tax, total} : TOrderCostProps) => {
  return (
     <div className='w-[clamp(20rem,calc(100%_-_2rem),_40rem)] mx-auto mt-8 p-8 bg-base-300 rounded-lg'>
        <div className='flex justify-between py-2 border-b-2 border-base-100'>
           <p>Subtotal</p>
           <p>${convertMoney(cartTotal)}</p>
        </div>
        <div className='flex justify-between py-2 border-b-2 border-base-100'>
           <p>Shipping</p>
           <p>${convertMoney(shipping)}</p>
        </div>
        <div className='flex justify-between py-2 border-b-2 border-base-100'>
           <p>Tax</p>
           <p>${convertMoney(tax)}</p>
        </div>
        <div className='flex justify-between pt-12'>
           <p>Order Total</p>
           <p>${convertMoney(total)}</p>
        </div>
     </div>
  )
}

export default OrderCostOverview
