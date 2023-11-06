import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { AxiosError} from 'axios'
export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}


export const getErrorMessage = (error: unknown) : string => {
   let message: string;
   if (error instanceof Error) {
      message = error.message
   }
   else if (error instanceof AxiosError){
      message = error.message
   }
   else if (error && typeof error === 'object' && 'message' in error) {
      message = String(error.message)
   } else if (typeof error === 'string') {
      message = error
   } 
   else {
      message = 'unknown error'
   }
   return message
}

export const convertMoney = (value: number | string) => {
   if (typeof value === 'number') {
      return (value / 100).toFixed(2)
   } else {
      return (+value / 100).toFixed(2)
   }
}