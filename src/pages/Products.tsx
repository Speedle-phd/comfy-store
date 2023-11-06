import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import {
   Link,
   useLoaderData,
   useLocation,
   useSearchParams,
} from 'react-router-dom'
import '../api/axios.ts'
import { BsFillGridFill, BsListUl } from 'react-icons/bs'
import { getErrorMessage } from '../utility/utility.ts'
import { useEffect, useRef, useState } from 'react'
import ProductsCard from '../components/ProductsCard.tsx'
import FormElementSelect from '../components/FormElementSelect.tsx'
import PaginationButtons from '../components/PaginationButtons.tsx'

export type TProductsCardAttributes = {
   title: string
   price: number
   image: string
}

export type TProductsReturn = {
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
   }[]
   meta: {
      pagination: {
         page: number
         pageSize: number
         pageCount: number
         total: number
      }
      categories: string[]
      companies: string[]
   }
   hasMore: boolean
   hasLess: boolean
}
export type TQueryObject = {
   search?: string
   category?: string
   company?: string
   order?: string
   price?: string
   shipping?: boolean
   page?: number
}
// eslint-disable-next-line react-refresh/only-export-components
export const getProducts = (queryObject: TQueryObject, page: number) => {
   return {
      queryKey: ['products', page, { ...queryObject, page: 'paginate' }],
      queryFn: async () => {
         const res = await axios<TProductsReturn>('/products', {
            params: queryObject,
         })
         if (res.status === 200 && res.data) {
            res.data.hasMore = true
            res.data.hasLess = true
            const { page, pageCount } = res.data.meta.pagination
            if (page === pageCount) {
               res.data.hasMore = false
            }
            if (page === 1) {
               res.data.hasLess = false
            }
            return res.data
         }
         throw new Error('Could not get products.')
      },
      placeholderData: keepPreviousData,
   }
}

const Products = () => {
   const { search } = useLocation()
   const priceRef = useRef<HTMLInputElement>(null)
   const priceLabelRef = useRef<HTMLLabelElement>(null)
   const [searchParams, setSearchParams] = useSearchParams()
   const [pageState, setPageState] = useState<number>(
      +(searchParams.get('page') as string) ?? 1
   )
   const queryObject = useLoaderData() as TQueryObject
   const { data, isLoading, isError, error } = useQuery(
      getProducts(queryObject, pageState!)
   )
   const [view, setView] = useState(() => {
      if(localStorage.getItem('comfy-view-preference') === "undefined") {
         return 'grid'
      }
      return JSON.parse(localStorage.getItem('comfy-view-preference')!)

   })

   const handleChange = () => {
      if (!priceLabelRef?.current || !priceRef?.current) return
      priceLabelRef.current.textContent = `$${(
         parseFloat(priceRef.current.value) / 100
      ).toFixed(2)}`
   }

   const handleViewChange = (v: string) => {
      setView(v)
   }
   useEffect(() => {
      localStorage.setItem('comfy-view-preference', JSON.stringify(view))
   }, [view])

   const handlePageChange = (pageNumber: number) => {
      const searchParams = new URLSearchParams(search)
      searchParams.set('page', pageNumber.toString())
      setSearchParams(searchParams.toString())
      // navigate(`${pathname}?${searchParams.toString()}`)
   }
   useEffect(() => {
      setPageState(+(searchParams.get('page') as string) ?? 1)
   }, [searchParams])

   if (isError) throw new Error(getErrorMessage(error))

   if (isLoading)
      return (
         <div className='flex items-center justify-center'>
            <div className='loading loading-ring loading-lg'></div>
         </div>
      )

   return (
      <>
         {/* FORM */}
         <section>
            <form
               method='GET'
               className='my-8 grid gap-4 bg-base-300 px-8 py-4 grid-cols-[repeat(auto-fit,minmax(min(225px,_100%),_1fr))] rounded-box content-center items-center'
            >
               <div className='form-control'>
                  <label htmlFor='search' className='label font-semibold'>
                     Search Product
                  </label>
                  <input
                     className='input input-bordered border-secondary-focus'
                     type='text'
                     name='search'
                     defaultValue={searchParams.get('search') ?? ""}
                  />
               </div>
               <FormElementSelect
                  optionArray={data?.meta.categories}
                  name={'category'}
                  title={'search category'}
               />
               <FormElementSelect
                  optionArray={data?.meta.companies}
                  name={'company'}
                  title={'search company'}
               />
               <FormElementSelect
                  optionArray={['a-z', 'z-a', 'high', 'low']}
                  name={'order'}
                  title={'Sort by'}
               />
               <div className='form-control'>
                  <label className='label' htmlFor='price'>
                     <span className='label-text font-semibold'>
                        Select Price
                     </span>
                     <span
                        ref={priceLabelRef}
                        className='label-text-alt font-semibold'
                     >
                        {searchParams.get('price') ? `$${(+searchParams.get('price')!/100).toFixed(2)}` : `$${(100000 / 100).toFixed(2)}`}
                     </span>
                  </label>
                  <input
                     type='range'
                     name='price'
                     min={0}
                     max='100000'
                     step={1000}
                     defaultValue={searchParams.get('price') ?? 100000}
                     className='range'
                     ref={priceRef}
                     onChange={handleChange}
                  />
                  <label className='label' htmlFor='price'>
                     <span className='label-text-alt font-semibold'>
                        Min: $0.00
                     </span>
                     <span className='label-text-alt font-semibold'>
                        Max: $1000.00
                     </span>
                  </label>
               </div>
               <div className='form-control'>
                  <label
                     htmlFor='shipping'
                     className='label font-semibold mx-auto'
                  >
                     Free shipping
                  </label>
                  <input
                     className='checkbox checkbox-accent mx-auto'
                     type='checkbox'
                     name='shipping'
                     id='shipping'
                     defaultChecked={searchParams.get('shipping') === 'on' ? true : false}
                  />
               </div>
               <button className='btn btn-primary' type='submit'>
                  search
               </button>
               <Link to='/products'>
                  <button className='btn btn-secondary w-full'>Reset</button>
               </Link>
            </form>
         </section>

         {/* DATADISPLAY */}
         <section>
            <header className='border-b-2 py-4 mb-8 border-b-primary flex justify-between'>
               <div className='font-semibold text-xl'>
                  {data?.meta.pagination.total} Products
               </div>
               <div className='flex gap-4'>
                  <button
                     onClick={() => handleViewChange('grid')}
                     className={`btn transition-colors btn-circle ${
                        view === 'grid' ? 'bg-secondary' : null
                     }`}
                  >
                     <BsFillGridFill className='text-xl' />
                  </button>
                  <button
                     onClick={() => handleViewChange('list')}
                     className={`btn transition-colors btn-circle ${
                        view === 'list' ? 'bg-secondary' : null
                     }`}
                  >
                     <BsListUl className='text-xl' />
                  </button>
               </div>
            </header>
            {view === 'grid' ? (
               <div className='gap-8 w-full grid grid-cols-[repeat(auto-fit,_minmax(min(300px,_100%),_1fr))]'>
                  {data?.data?.map((el) => {
                     const { id } = el
                     const attributes = {
                        title: el.attributes.title,
                        price: +el.attributes.price,
                        image: el.attributes.image,
                     } as TProductsCardAttributes
                     return (
                        <ProductsCard
                           key={id}
                           id={id}
                           attributes={attributes}
                        />
                     )
                  })}
               </div>
            ) : (
               <div className='gap-8 w-full flex flex-col max-w-[66%] mx-auto'>
                  {data?.data?.map((el) => {
                     const { id } = el
                     const { title, price, image } = el.attributes
                     return (
                        <Link
                           to={`/products/${id}?${searchParams.toString()}`}
                           key={id}
                           className='card lg:flex-row bg-base-100 shadow-xl p-8'
                        >
                           <figure className='min-w-[10rem] md:min-w-[15rem] w-[33%] aspect-square rounded-box overflow-hidden mx-auto lg:mx-0'>
                              <img
                                 className='w-full h-full object-cover object-center'
                                 src={image}
                                 alt={title}
                              />
                           </figure>
                           <div className='card-body flex justify-center items-center'>
                              <h2 className='card-title capitalize text-4xl'>
                                 {title}
                              </h2>
                              <p className='text-xl text-accent'>
                                 ${(+price / 100).toFixed(2)}
                              </p>
                           </div>
                        </Link>
                     )
                  })}
               </div>
            )}

            {/* PAGINATION */}
            
            <PaginationButtons
               pagination={data?.meta.pagination}
               hasMore={data?.hasMore}
               hasLess={data?.hasLess}
               handlePageChange={handlePageChange}
               pageState={pageState}
            />
         </section>
      </>
   )
}

export default Products
