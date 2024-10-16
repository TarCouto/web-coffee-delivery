// components/QuantityCartInput.tsx (Client Component)

'use client'

import { CoffeeType } from '../data/types/coffee'
import { useCart } from '../hooks/useCart'
import { QuantityInput } from './quantityInput'
import { Trash } from '@phosphor-icons/react/dist/ssr'

interface QuantityCartInputProps {
  coffee: CoffeeType
}

export function ContainerCartMap({ coffee }: QuantityCartInputProps) {
  const { cart, incrementItemQuantity, decrementItemQuantity, removeItem } =
    useCart()

  const cartItem = cart.find((item) => item.id === coffee.id)

  if (!cartItem) {
    return null // Retorna null se o café não estiver no carrinho
  }

  function handleItemIncrement() {
    incrementItemQuantity(coffee.id)
  }

  function handleItemDecrement() {
    decrementItemQuantity(coffee.id)
  }

  function handleItemRemove() {
    removeItem(coffee.id)
  }

  return (
    <div className="flex gap-2">
      <QuantityInput
        quantity={cartItem.quantity}
        incrementQuantity={handleItemIncrement}
        decrementQuantity={handleItemDecrement}
      />

      <button
        className="p-1 bg-gray-200 rounded-md flex items-center gap-2 hover:bg-gray-300 transition-colors"
        onClick={handleItemRemove}
      >
        <Trash color="#8047F8" />
        <span className="text-gray-800">Remover</span>
      </button>
    </div>
  )
}
