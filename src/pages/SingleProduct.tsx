import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useLoaderData, useSearchParams } from 'react-router-dom'
import '../api/axios.ts'
import { getErrorMessage } from '../utility/utility.ts'
import RadioColorButtons from '../components/RadioColorButtons.tsx'
import { useModalContext } from '../context/ModalProvider.tsx'
import Loading from '../components/Loading.tsx'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks.ts'
import { addItem } from '../redux/cart.ts'

type TSingleProduct =
   | {
        data: {
           id: number
           attributes: {
              title: string
              company: string
              description: string
              featured: boolean
              createdAt: string
              updatedAt: string
              publishedAt: string
              category: string
              image: string
              price: string
              shipping: boolean
              colors: string[]
           }
        }
     }
   | undefined

const SingleProduct = () => {
   const dispatch = useAppDispatch()
   const cart = useAppSelector((state) => state.cart)
   const [searchParams] = useSearchParams()
   const { showModal } = useModalContext()!
   const { id } = useLoaderData() as { id: number }
   const amountArray = Array.from({ length: 20 }, (_, index) => {
      return index + 1
   })
   const { data, error, isError, isLoading } = useQuery({
      queryKey: ['products', id],
      queryFn: async () => {
         const response = await axios(`products/${id}`)
         console.log(response.data)
         return response.data as TSingleProduct
      },
   })
   const amountRef = useRef<HTMLSelectElement>(null)
   const [colorPick, setColorPick] = useState(data?.data.attributes.colors[0])
   const handleClick = () => {
      if (!data || !colorPick || !amountRef.current) return
      const { id } = data.data
      const { price, title, company, image } = data.data.attributes
      const productColor = colorPick
      const productID = id.toString()
      const combinedColorId = id.toString() + productColor
      const amount = +amountRef.current?.value
      dispatch(
         addItem({
            cartID: combinedColorId,
            image,
            company,
            price: +price,
            title,
            amount,
            productColor,
            productID,
         })
      )
   }

   useEffect(() => {
      sessionStorage.setItem('comfy-cart', JSON.stringify(cart))
   }, [cart])

   useEffect(() => {
      setColorPick(data?.data.attributes.colors[0])
   }, [data])

   if (isError) throw new Error(getErrorMessage(error))

   if (isLoading) return <Loading />
   return (
      <div>
         <nav>
            <div className='text-sm breadcrumbs'>
               <ul>
                  <li>
                     <Link to='/'>Home</Link>
                  </li>
                  <li>
                     <Link to={`/products?${searchParams.toString()}`}>
                        Products
                     </Link>
                  </li>
               </ul>
            </div>
         </nav>

         <div
            id={String(data?.data.id)}
            className='gap-8 grid grid-cols-1 md:grid-cols-2'
         >
            <figure
               onClick={() =>
                  showModal(
                     <div className='p-12 w-[80vw] bg-base-100 rounded-lg'>
                        <figure className='rounded-lg overflow-hidden w-full aspect-video'>
                           <img
                              className='w-full h-full object-cover object-center'
                              src={data?.data.attributes.image}
                              alt={data?.data.attributes.title}
                           />
                        </figure>
                     </div>
                  )
               }
               className='w-full aspect-[16/14] rounded-lg overflow-hidden cursor-pointer'
            >
               <img
                  className='w-full h-full object-cover object-center'
                  src={data?.data.attributes.image}
                  alt={data?.data.attributes.title}
               />
            </figure>

            <div className='flex flex-col items-start gap-4'>
               <h2 className='text-4xl capitalize font-bold'>
                  {data?.data.attributes.title}
               </h2>
               <h3 className='text-3xl capitalize font-bold'>
                  {data?.data.attributes.company}
               </h3>
               <p className='text-secondary font-bold'>
                  $
                  {data?.data.attributes.price &&
                     +data.data.attributes.price / 100}
               </p>
               <p className='leading-8'>{data?.data.attributes.description}</p>
               <div>
                  <h4 style={{ color: colorPick }} className='font-bold mb-3'>
                     Colors
                  </h4>
                  {data?.data.attributes.colors.map((color, index) => {
                     const checked = index === 0
                     return (
                        <RadioColorButtons
                           onChange={() => setColorPick(color)}
                           key={index}
                           checked={checked}
                           color={color}
                           className='scale-[0.8] appearance-none text-current w-8 h-8 rounded-full  opacity-50 checked:scale-[1] checked:opacity-100 mr-2'
                        />
                     )
                  })}
               </div>
               <div>
                  <h4 className='font-bold mb-2'>Amount</h4>
                  <select
                     ref={amountRef}
                     className='select select-bordered w-[15rem] select-primary'
                  >
                     {amountArray?.map((amount, index) => {
                        return (
                           <option value={amount} key={index}>
                              {amount}
                           </option>
                        )
                     })}
                  </select>
               </div>
               <button onClick={handleClick} className='btn btn-primary my-6'>
                  Add to bag
               </button>
            </div>
         </div>
      </div>
   )
   // return <h1>Test</h1>
}

export default SingleProduct
