'use client'
import { Minus, Plus } from '@phosphor-icons/react/dist/ssr'

type Props = {
  quantity: number
  incrementQuantity: () => void
  decrementQuantity: () => void
}

export function QuantityInput({
  quantity,
  incrementQuantity,
  decrementQuantity,
}: Props) {
  return (
    <div className="flex gap-1 p-2 bg-gray-200 rounded-lg">
      <button onClick={decrementQuantity} className="flex items-center">
        <Minus
          size={14}
          className="text-purple-500 hover:text-purple-700 transition-colors"
        />
      </button>
      <span className=" text-gray-800">{quantity}</span>
      <button onClick={incrementQuantity} className="flex items-center">
        <Plus
          size={14}
          className="text-purple-500 hover:text-purple-700 transition-colors"
        />
      </button>
    </div>
  )
}
