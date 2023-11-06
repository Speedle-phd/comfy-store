import { ActionFunctionArgs } from "react-router-dom"
import { getErrorMessage } from "../utility/utility"
// import axios from "axios"
import './axios'

export const loginAction = async(request: ActionFunctionArgs) => {
   const formData = await request.request.formData()
   const email = formData.get('identifier')
   const password = formData.get('password')
   try {
      console.log(password, email)
      
      return {error: 'Invalid Login Credentials'}
   } catch (error) {
      return {error: getErrorMessage(error)}
   }
}
export const registerAction = async(request: ActionFunctionArgs) => {
   const formData = await request.request.formData()
   const username = formData.get('username')
   const email = formData.get('email')
   const password = formData.get('password')
   try {
      console.log(password, email, username)
      // const res = await axios('fwf')
      return { error: 'Registering not available right now. Please log in as guest' }
   } catch (error) {
      return {error: getErrorMessage(error)}
   }
}