import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

export type TCartObject = {
   cartID: string
   productID: string
   title: string
   price: number
   amount: number
   productColor: string
   company: string
   image: string
}

export type TCart = {
   items: TCartObject[]
   itemsAmount: number
   cartTotal: number
   shipping: number
   tax: number
   total: number
}

const getLocalstorageCart = (): TCart | null => {
   const stringifiedLS = sessionStorage.getItem('comfy-cart')
   if (stringifiedLS) {
      return JSON.parse(stringifiedLS)
   }
   return null
}
getLocalstorageCart()

const initialState = {
   items: [],
   itemsAmount: 0,
   cartTotal: 0,
   shipping: 500,
   tax: 0,
   total: 0,
} as TCart

export const cartSlice = createSlice({
   name: 'cart',
   initialState: getLocalstorageCart() ?? initialState,
   reducers: {
      addItem: (state, action: PayloadAction<TCartObject>) => {
         const newItem = action.payload
         const itemExists = state.items.find(
            (el) => el.cartID === newItem.cartID
         )
         if (itemExists) {
            console.log(itemExists)
            itemExists.amount += newItem.amount
            toast.success(
               `Successfully added ${newItem.amount} piece to already existing cart item`
            )
            return
         }
         state.items.push(newItem)
         toast.success(`Successfully added new Item.`)
      },
      removeItem: (state, action: PayloadAction<string>) => {
         state.items = state.items.filter((el) => el.cartID !== action.payload)
      },
      updateItem: (
         state,
         action: PayloadAction<{ id: string; amount: number }>
      ) => {
         const toUpdate = state.items.find(
            (el) => el.cartID === action.payload.id
         )
         if (!toUpdate) return
         toUpdate.amount = action.payload.amount
         console.log(state.items)
      },
      resetCart: (state) => {
         state.items = []
      },
      calculateAmount: (state) => {
         state.itemsAmount = state.items.reduce((acc, item) => {
            acc += item.amount
            return acc
         }, 0)
      },
      calculateCartTotal: (state) => {
         state.cartTotal = state.items.reduce((acc, item) => {
            acc += item.amount * item.price
            return acc
         }, 0)
      },
      calculateTaxTotal: (state) => {
         state.tax = ~~((state.cartTotal * 19) / 100)
         state.total = ~~(state.cartTotal + state.tax + state.shipping)
      },
   },
})

export const {
   addItem,
   removeItem,
   updateItem,
   calculateAmount,
   calculateTaxTotal,
   calculateCartTotal,
   resetCart,
} = cartSlice.actions

export default cartSlice.reducer
