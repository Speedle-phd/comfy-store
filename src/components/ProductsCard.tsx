import { Link, useSearchParams } from 'react-router-dom'
import { TLandingQuery } from '../pages/Landing'

const ProductsCard = ({ id, attributes }: TLandingQuery) => {
   const [searchParams] = useSearchParams()
   console.log(searchParams.toString())
   const { title, image, price } = attributes
   return (
      <Link to={`/products/${id}?${searchParams.toString()}`}>
         <div className='card bg-base-100 shadow-xl min-w-[300px]'>
            <figure className='px-10 pt-10'>
               <img
                  src={image}
                  alt={title}
                  className='rounded-xl object-cover object-center aspect-video'
               />
            </figure>
            <div className='card-body items-center text-center'>
               <h2 className='card-title capitalize font-semibold'>{title}</h2>
               <p className='text-accent'>${(price / 100).toFixed(2)}</p>
            </div>
         </div>
      </Link>
   )
}

export default ProductsCard
