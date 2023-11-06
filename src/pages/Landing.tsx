import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import '../api/axios.ts'
import { getErrorMessage } from '../utility/utility.ts'
import ProductsCard from '../components/ProductsCard.tsx'
import { Link } from 'react-router-dom'
import heroImage1 from '../assets/hero1.webp'
import heroImage2 from '../assets/hero2.webp'
import heroImage3 from '../assets/hero3.webp'
import heroImage4 from '../assets/hero4.webp'

export type TLandingQuery = {
   id: number
   attributes: { title: string; price: number; image: string }
}

const Landing = () => {
   const { data, error, isLoading, isError } = useQuery({
      queryKey: ['products', { featured: true }],
      queryFn: async () => {
         const {
            data: { data },
         } = await axios('products', {
            params: {
               featured: true,
            },
         })

         return data as TLandingQuery[]
      },
   })

   if (isError) throw new Error(getErrorMessage(error))

   if (isLoading)
      return (
         <div className='flex justify-center items-center'>
            <div className='loading loading-ring loading-lg'></div>
         </div>
      )

   return (
      <div>
         <section className='mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8'>
            <div className='flex flex-col gap-8 items-start'>
               <h2 className='text-4xl md:text-6xl text-wrap font-bold tracking-wide'>
                  We are changing the way people shop
               </h2>
               <p className='w-[80%]'>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Tempore repellat explicabo enim soluta temporibus asperiores
                  aut obcaecati perferendis porro nobis.
               </p>
               <Link
                  className='btn btn-primary'
                  to='products'
                  unstable_viewTransition
               >
                  our products
               </Link>
            </div>
            <div className='hidden lg:block'>
               <div
                  style={{ scrollPaddingBlock: '1rem' }}
                  className='p-4 bg-neutral h-96 carousel carousel-vertical rounded-box gap-4'
               >
                  <div className='carousel-item h-[calc(24rem_-_2rem)] rounded-lg overflow-hidden'>
                     <img
                        className='object-cover object-center aspect-video'
                        src={heroImage1}
                     />
                  </div>
                  <div className='carousel-item h-[calc(24rem_-_2rem)] rounded-lg overflow-hidden'>
                     <img
                        className='object-cover object-center aspect-video'
                        src={heroImage2}
                     />
                  </div>
                  <div className='carousel-item h-[calc(24rem_-_2rem)] rounded-lg overflow-hidden'>
                     <img
                        className='object-cover object-center aspect-video'
                        src={heroImage3}
                     />
                  </div>
                  <div className='carousel-item h-[calc(24rem_-_2rem)] rounded-lg overflow-hidden'>
                     <img
                        className='object-cover object-center aspect-video'
                        src={heroImage4}
                     />
                  </div>
               </div>
            </div>
         </section>
         <section className='pb-8'>
            <header className='mb-12'>
               <h2 className='capitalize text-3xl font-bold mb-4'>
                  featured products
               </h2>
               <div className='bg-primary w-[calc(100%_-_2rem)] h-[1px]' />
            </header>
            <ul className='gap-8 w-full grid grid-cols-[repeat(auto-fit,_minmax(min(300px,_100%),_1fr))]'>
               {data?.map((el) => {
                  const { attributes } = el
                  return (
                     <ProductsCard
                        id={el.id}
                        key={el.id}
                        attributes={attributes}
                     />
                  )
               })}
            </ul>
         </section>
      </div>
   )
}

export default Landing
