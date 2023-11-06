import { QueryClient } from '@tanstack/react-query'
import { LoaderFunctionArgs, Params } from 'react-router-dom'
import { getProducts } from '../pages/Products'

export const landingLoader = async () => {
   return null
}

export const singleProductLoader = async ({ params }: { params: Params }) => {
   const { id } = params
   return { id: id }
}

export const productsLoader =
   (client: QueryClient) =>
   async ({ request }: LoaderFunctionArgs) => {
      const url = new URL(request.url)
      const queries = url.searchParams
      const page = +(url.searchParams.get('page') as string) 
      const queryObject = Object.fromEntries([...queries.entries()])
      client.ensureQueryData(getProducts(queryObject, page))
      return queryObject
   }

export const orderLoader = async() => {
   return null
}