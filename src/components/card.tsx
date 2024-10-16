'use client'

import { CheckFat, ShoppingCart } from '@phosphor-icons/react'
import { useEffect, useState } from 'react'

import Image from 'next/image'
import { useCart } from '@/src/hooks/useCart'
import { QuantityInput } from './quantityInput'

// eslint-disable-next-line camelcase
import { Baloo_2 } from 'next/font/google'
import { CoffeeType } from '../data/types/coffee'

const baloo2 = Baloo_2({
  weight: '800',
  subsets: ['latin'], // Adicione outros subsets se necessário
})

type Props = {
  coffee: CoffeeType // Aqui definimos que a prop 'coffee' é do tipo 'CoffeeType'
}

export function Card({ coffee }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [isItemAdded, setIsItemAdded] = useState(false)
  const { addItem } = useCart()

  function incrementQuantity() {
    setQuantity((state) => state + 1)
  }

  function decrementQuantity() {
    if (quantity > 1) {
      setQuantity((state) => state - 1)
    }
  }

  function handleAddItem() {
    addItem({ id: coffee.id, quantity })
    setIsItemAdded(true)
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (isItemAdded) {
      timeout = setTimeout(() => {
        setIsItemAdded(false)
      }, 1000)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [isItemAdded])

  return (
    <div className="bg-gray-100 p-4 mx-auto rounded-[6px_36px] w-64 flex flex-col text-center">
      <Image
        src={coffee.image}
        alt={coffee.title}
        width={110}
        height={110}
        className="-mt-10 object-contain max-w-[120px] max-h-[120px] self-center z-10"
      />

      <div className="mt-3 flex items-center self-center gap-1">
        {coffee.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 rounded-full bg-yellow-light text-yellow-dark uppercase font-roboto text-xs leading-[130%] font-bold"
          >
            {tag}
          </span>
        ))}
      </div>

      <h3
        className={` ${baloo2.className} text-gray-700 text-xl leading-[130%] font-bold mt-4`}
      >
        {coffee.title}
      </h3>

      <span className=" text-sm text-gray-500 mt-3">{coffee.description}</span>

      <div className="flex items-center max-w-[216px] max-h-[38px] justify-between mt-8">
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-gray-800">R$</span>
          <span className="text-xl font-extrabold text-gray-800">
            {coffee.price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2 justify-end">
          <QuantityInput
            quantity={quantity}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />

          <button
            disabled={isItemAdded}
            onClick={handleAddItem}
            className={`transition-colors rounded-md p-2 ${
              isItemAdded
                ? 'bg-yellow-dark hover:bg-yellow-light'
                : 'bg-purple-700 hover:bg-purple-500'
            }`}
          >
            {isItemAdded ? (
              <CheckFat size={22} className="text-white" />
            ) : (
              <ShoppingCart size={22} className="text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
