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
import { api } from '../data/api'
import { useRouter } from 'next/navigation'

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

// Extender o tipo OrderInfo para incluir o campo opcional `id`
export type OrderWithId = OrderInfo & { id?: string }

export function CartContextProvider({ children }: CartContextProviderProps) {
  const router = useRouter()
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
    // Primeiro verifica se o carrinho tem itens
    if (cart.length === 0) {
      return alert('É preciso ter pelo menos um item no carrinho')
    }

    // Faz o POST na API
    api('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...order,
        items: cart, // Inclui os itens do carrinho
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Erro ao enviar o pedido')
        }

        const result = await response.json()

        // Após o sucesso do POST, despacha a ação para o reducer
        dispatch(
          checkoutCartAction({
            id: result.orderId, // ID retornado pela API
            items: cart, // Itens do carrinho
            ...order, // Outras informações do pedido (número, endereço, pagamento, etc.)
          } as OrderWithId),
        )

        // Redireciona o usuário para a página de sucesso
        router.push(`/order/${result.orderId}/success`)
      })
      .catch((error) => {
        console.error('Erro ao processar a ordem:', error)
      })
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
