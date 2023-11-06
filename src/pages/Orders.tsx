import { useQuery } from '@tanstack/react-query'
import '../api/axios.ts'
import axios from 'axios'
import { getErrorMessage } from '../utility/utility.ts'
import Loading from '../components/Loading.tsx'
import { Fragment, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'


type TOrders = {
   data: {
      id: number
      attributes: {
         address: string
         createdAt: string
         updatedAt: string
         publishedAt: string
         name: string
         orderTotal: string
         cartItems: {
            image: string
            price: string
            title: string
            amount: number
            cartID: string
            company: string
            productID: number
            productColor: string
         }[]
         numItemsInCart: number
      }
   }[]
   meta: {
      pagination: {
         page: number
         pageSize: number
         pageCount: number
         total: number
      }
   },
   hasLess: boolean
   hasMore: boolean
}

const Orders = () => {
   const [searchParams, setSearchParams] = useSearchParams()
   const [page, setPage] = useState(() => {
      if (searchParams.get('page')) {
         return +searchParams.get('page')!
      }
      return 1
   })
   
   const { data, isLoading, isError, error } = useQuery({
      queryKey: ['orders', page],
      queryFn: async () => {
         const res = await axios('orders', {params: {page}})
         if (res.status === 200) {
            res.data.hasLess = true;
            res.data.hasMore = true;
            if(res.data.meta.pagination.page === 1){
               res.data.hasLess = false
            }
            if(res.data.meta.pagination.page === res.data.meta.pagination.pageCount){
               res.data.hasMore = false
            }
            return res.data as TOrders
         }
         throw new Error('Error occurred while processing orders.')
      },
   })
   const paginationArray = [...new Set([1, data?.meta.pagination.page, data?.meta.pagination.pageCount ])]

   const handleChangePage = (p: number) => {
      
      setSearchParams(params => {
         params.set('page', p.toString())
         return params
      })
   }

   useEffect(() => {
      setPage(() => {
         if (searchParams.get('page')) {
            return +searchParams.get('page')!
         }
         return 1
      })
   }, [searchParams])

   console.log(data)
   if (isError) throw new Error(getErrorMessage(error))

   if (isLoading) return <Loading />

   return (
      <section className="flex flex-col">
         <h2 className='text-3xl font-semibold py-8 mb-4'>Your Orders</h2>
         <hr />
         <div>
            <h3 className='py-8 font-semibold'>
               Total Orders: {data?.meta.pagination.total}
            </h3>
         </div>
         <div className='overflow-x-auto p-8'>
            <table className='table'>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Address</th>
                     <th>Products</th>
                     <th>Cost</th>
                     <th>Date</th>
                  </tr>
               </thead>
               <tbody>
                  {data?.data.map((el, index) => {
                     const {
                        name,
                        address,
                        orderTotal,
                        createdAt,
                        numItemsInCart,
                     } = el.attributes
                     const isOdd = index % 2 === 0
                     return (
                        <tr className={isOdd ? 'bg-base-200' :'' } key={el.id}>
                           <td>{name}</td>
                           <td>{address}</td>
                           <td>{numItemsInCart}</td>
                           <td>{orderTotal}</td>
                           <td>
                              {new Date(createdAt).toLocaleDateString('de-DE', {
                                 year: 'numeric',
                                 month: '2-digit',
                                 day: '2-digit',
                                 hour: '2-digit',
                                 minute: '2-digit',
                                 second: '2-digit',
                              })}
                           </td>
                        </tr>
                     )
                  })}
               </tbody>
            </table>
         </div>
         <div className="join mx-auto mb-8">
            <button onClick={() => {
               const newPage = page - 1
               handleChangePage(newPage)
            }} className={`btn join-item ${!data?.hasLess ? "btn-disabled" : null}`}>Previous</button>
            {paginationArray?.map((el, index) => {
               let disabledButton = true
               if (index === paginationArray.length - 1) {
                  disabledButton = false
               }
               if( el === 1 && paginationArray[index + 1] === 2 || el === paginationArray[paginationArray.length - 2] && el! + 1 === paginationArray[paginationArray.length -1]) {
                  disabledButton = false
               }
               return (
                  <Fragment key={index}>
                     <button onClick={() => {
                        handleChangePage(el!)
                     }} className={`join-item btn ${el === page ? "btn-disabled": null}`}>{el}</button>
                     {disabledButton && <button className='join-item btn btn-diabled'>...</button>}
                  </Fragment>
               )
            })}
            <button onClick={() => {
               const newPage = page + 1
               handleChangePage(newPage)
            }} className={`btn join-item ${!data?.hasMore ? "btn-disabled" : null}`}>Next</button>
         </div>
      </section>
   )
}

export default Orders
