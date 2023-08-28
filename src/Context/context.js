import {createContext, useContext} from 'react'
export const shoppingCartContext = createContext()
export const useShopiContext = () => useContext(shoppingCartContext)
