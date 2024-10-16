'use client'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import {
  addItemAction,
  checkoutCartAction,
  decrementItemQuantityAction,
  incrementItemQuantityAction,
  removeItemAction,
} from '@/src/reducers/cart/actions'
import { cartReducer, Item, Order } from '@/src/reducers/cart/reducer'
import { OrderInfo } from '@/src/components/form'

interface CartContextType {
  cart: Item[]
  orders: Order[]
  addItem: (item: Item) => void
  removeItem: (itemId: Item['id']) => void
  decrementItemQuantity: (itemId: Item['id']) => void
  incrementItemQuantity: (itemId: Item['id']) => void
  checkout: (order: OrderInfo) => void
}

export const CartContext = createContext({} as CartContextType)

interface CartContextProviderProps {
  children: ReactNode
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartState, dispatch] = useReducer(
    cartReducer,
    {
      cart: [],
      orders: [],
    },
    (cartState) => {
      if (typeof window !== 'undefined') {
        const storedStateAsJSON = localStorage.getItem(
          '@coffee-delivery:cart-state-1.0.0',
        )

        if (storedStateAsJSON) {
          return JSON.parse(storedStateAsJSON)
        }
      }

      return cartState
    },
  )

  const { cart, orders } = cartState

  function addItem(item: Item) {
    dispatch(addItemAction(item))
  }

  function removeItem(itemId: Item['id']) {
    dispatch(removeItemAction(itemId))
  }

  function checkout(order: OrderInfo) {
    // Dispara a ação de checkout
    dispatch(checkoutCartAction(order))
    // Redireciona o usuário para a página de sucesso
  }

  function incrementItemQuantity(itemId: Item['id']) {
    dispatch(incrementItemQuantityAction(itemId))
  }

  function decrementItemQuantity(itemId: Item['id']) {
    dispatch(decrementItemQuantityAction(itemId))
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && cartState) {
      const stateJSON = JSON.stringify(cartState)
      localStorage.setItem('@coffee-delivery:cart-state-1.0.0', stateJSON)
    }
  }, [cartState])

  return (
    <CartContext.Provider
      value={{
        addItem,
        cart,
        orders,
        decrementItemQuantity,
        incrementItemQuantity,
        removeItem,
        checkout,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
