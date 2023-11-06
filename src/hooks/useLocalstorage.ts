import { useEffect, useState } from "react"



export const useLocalstorage = <T>(key: string, defaultValue?: T) : [T, (d: T) => void]  => {
   const [data, setData] = useState<T>(() => {
      const localStorageData = localStorage.getItem(key)
      if (localStorageData !== "undefined" && localStorageData) {
         return JSON.parse(localStorageData)
      } else if (defaultValue) {
         return defaultValue
      } else {
         localStorage.removeItem(key)
         return null
      }
   })
   const alterData = (newData: T) => {
      setData(newData)
   }

   useEffect(() => {
      localStorage.setItem(key, JSON.stringify(data))
   }, [key, data])

   return [data, alterData]
}