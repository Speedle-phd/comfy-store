import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './layouts/Root.tsx'
import Landing from './pages/Landing.tsx'
import About from './pages/About.tsx'
import Products from './pages/Products.tsx'
import Cart from './pages/Cart.tsx'
import ModalProvider from './context/ModalProvider.tsx'
import PageError from './components/PageError.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { landingLoader, orderLoader, productsLoader, singleProductLoader } from './api/loader.ts'
import ErrorMessage from './components/ErrorMessage.tsx'
import SingleProduct from './pages/SingleProduct.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { loginAction, registerAction } from './api/action.ts'
import Checkout from './pages/Checkout.tsx'
import Orders from './pages/Orders.tsx'
import ProtectedUserArea from './pages/ProtectedUserArea.tsx'
import { Provider } from 'react-redux'
import { store } from './store.ts'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const client = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 1000 * 60 * 5,
      },
   },
})

const router = createBrowserRouter([
   {
      path: '/',
      element: <Root />,
      errorElement: <PageError />,
      children: [
         {
            index: true,
            element: <Landing />,
            errorElement: <ErrorMessage />,
            loader: landingLoader,
         },
         {
            path: 'about',
            element: <About />,
         },
         {
            path: 'products',
            element: <Products />,
            errorElement: <ErrorMessage />,
            loader: productsLoader(client),
         },
         {
            path: 'products/:id',
            element: <SingleProduct />,
            errorElement: <ErrorMessage />,
            loader: singleProductLoader,
         },
         {
            path: 'cart',
            element: <Cart />,
            errorElement: <ErrorMessage />,
         },
         {
            path: 'auth',
            element: <ProtectedUserArea />,
            children: [
               {
                  path: 'checkout',
                  element: <Checkout />,
                  errorElement: <ErrorMessage />,
               },
               {
                  path: 'orders',
                  element: <Orders />,
                  errorElement: <ErrorMessage />,
                  loader: orderLoader,
               },
            ],
         },
         {
            path: '/login',
            element: <Login />,
            action: loginAction,
            errorElement: <ErrorMessage />,
         },
         {
            path: '/register',
            element: <Register />,
            action: registerAction,
         },
      ],
   },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
   <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false}/>
      <Provider store={store}>
         <ModalProvider>
            <RouterProvider router={router} />
         </ModalProvider>
      </Provider>
   </QueryClientProvider>
)
