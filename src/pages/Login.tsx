import { useEffect } from "react"
import { Form, Link, Navigate, useActionData } from "react-router-dom"
import { toast } from "react-toastify"
import FormInput from "../components/FormInput"
import SubmitBtn from "../components/SubmitBtn"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import '../api/axios.ts'
import { getErrorMessage } from "../utility/utility"
import { user } from "../layouts/Root.tsx"
import { effect } from "@preact/signals-react"


effect(() => {
   if (user) {
      console.log(user.value)
      localStorage.setItem('comfy-user', JSON.stringify(user.value))
   }
})

const Login = () => {

   const actionData = useActionData() as {error: string}
   const mutation = useMutation({
      mutationFn: async() => {
         try {
            const data = {
               identifier: 'test@test.com',
               password: 'secret',
            }
            const config = {
               method: 'post',
               maxBodyLength: Infinity,
               url: 'https://strapi-store-server.onrender.com/api/auth/local',
               headers: {},
               data: data,
            }
            const res = await axios(config)
            if (res.status === 200) {
               console.log(res.data)
               user.value = res.data
            }
            return toast.success('Successfully logged in')
         } catch (error) {
            throw new Error(getErrorMessage(error))
         }
      }
   })
   


   useEffect(() => {
      if (actionData?.error) {
         toast.error(actionData.error, {toastId: 'error-message'})
      }
   },[actionData])

   

   if (user?.value) return <Navigate to="/"/>

   return (
      <section className='grid place-items-center'>
         <Form
            method='post'
            className='card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
         >
            <h4 className='text-center text-3xl font-bold'>Login</h4>

            <FormInput label={'email'} name={'identifier'} type={'text'} />
            <FormInput label={'password'} name={'password'} type={'password'} />
            <SubmitBtn label={'Login'} />
            <button type='button' onClick={() => mutation.mutate()} className='btn btn-secondary btn-block'>
               {mutation.isPending ? <div className="loading loading-ring loading-md"></div> : "Guest User"}
            </button>
            <p className='text-center'>
               Not a member yet?{' '}
               <Link
                  to='/register'
                  className='ml-2 link link-hover link-primary capitalize'
               >
                  register
               </Link>
            </p>
         </Form>
      </section>
   )
}

export default Login
