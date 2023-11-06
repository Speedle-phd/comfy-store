import { useEffect } from 'react'
import { Form, Link, Navigate, useActionData } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormInput from '../components/FormInput'
import SubmitBtn from '../components/SubmitBtn'
import { user } from '../layouts/Root'

const Register = () => {
   const actionData = useActionData() as { error: string }

   useEffect(() => {
      if (actionData?.error) {
         toast.error(actionData.error, { toastId: 'error-message' })
      }
   }, [actionData])

   if (user.value) return <Navigate to='/' />

   return (
      <section className='grid place-items-center'>
         <Form
            method='post'
            className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'
         >
            <h4 className='text-center text-3xl font-bold'>Register</h4>
            <FormInput label={'username'} name={'username'} type={'text'} />
            <FormInput label={'email'} name={'email'} type={'text'} />
            <FormInput label={'password'} name={'password'} type={'password'} />
            <SubmitBtn label={'Register'} />
            <p className='text-center'>
               Already a member?
               <Link
                  to='/login'
                  className='ml-2 link link-hover link-primary capitalize'
               >
                  login
               </Link>
            </p>
         </Form>
      </section>
   )
}

export default Register
