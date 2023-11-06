import axios from 'axios'
import { user } from '../layouts/Root'

axios.defaults.baseURL = 'https://strapi-store-server.onrender.com/api/'

axios.interceptors.request.use(
   function (config) {
      if (user.value && config.url === 'orders') {
         config.headers['Authorization'] = `Bearer ${user.value.jwt}`
      }

      return config
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error)
   }
)
