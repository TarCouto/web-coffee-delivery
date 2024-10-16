// CartClientComponent.tsx - Client Component

'use client' // Indica que esse componente é um Client Component

import { Fragment } from 'react'
import { Trash } from '@phosphor-icons/react'
import { useCart } from '@/src/hooks/useCart'
import { QuantityInput } from '@/src/components/quantityInput'
import Image from 'next/image'
import { CoffeeType } from '@/src/data/types/coffee'

interface CartClientComponentProps {
  coffees: CoffeeType[]
  shippingPrice: number
}

export default function CartClientComponent({
  coffees,
  shippingPrice,
}: CartClientComponentProps) {
  const { cart, incrementItemQuantity, decrementItemQuantity, removeItem } =
    useCart()

  const coffeesInCart = cart.map((item) => {
    const coffeeInfo = coffees.find((coffee) => coffee.id === item.id)

    if (!coffeeInfo) {
      throw new Error('Invalid coffee.')
    }

    return {
      ...coffeeInfo,
      quantity: item.quantity,
    }
  })

  const totalItemsPrice = coffeesInCart.reduce((previousValue, currentItem) => {
    return (previousValue += currentItem.price * currentItem.quantity)
  }, 0)

  function handleItemIncrement(itemId: string) {
    incrementItemQuantity(itemId)
  }

  function handleItemDecrement(itemId: string) {
    decrementItemQuantity(itemId)
  }

  function handleItemRemove(itemId: string) {
    removeItem(itemId)
  }

  return (
    <div className="p-10 rounded-t-lg rounded-b-[57px] bg-gray-100 flex flex-col gap-4 w-full min-w-[448px]">
      {coffeesInCart.map((coffee) => (
        <Fragment key={coffee.id}>
          <div className="flex justify-between">
            <div className="flex items-stretch gap-5">
              <Image
                className="w-16 h-16"
                src={coffee.image}
                alt={coffee.title}
                width={24}
                height={24}
              />

              <div className="flex flex-col justify-between">
                <span className="text-gray-800">{coffee.title}</span>

                <div className="flex gap-2">
                  <QuantityInput
                    quantity={coffee.quantity}
                    incrementQuantity={() => handleItemIncrement(coffee.id)}
                    decrementQuantity={() => handleItemDecrement(coffee.id)}
                  />

                  <button
                    className="p-1 bg-gray-200 rounded-md flex items-center gap-2 hover:bg-gray-300 transition-colors"
                    onClick={() => handleItemRemove(coffee.id)}
                  >
                    <Trash color="#8047F8" />
                    <span className="text-gray-800">Remover</span>
                  </button>
                </div>
              </div>
            </div>

            <aside className="font-bold text-gray-800">
              R$ {coffee.price?.toFixed(2)}
            </aside>
          </div>

          <span className="block h-px bg-gray-300 my-2 text-gray-800"></span>
        </Fragment>
      ))}

      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-800">Total de itens</span>
          <span className="text-sm text-gray-800">
            {new Intl.NumberFormat('pt-br', {
              currency: 'BRL',
              style: 'currency',
            }).format(totalItemsPrice)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-800">Entrega</span>
          <span className="text-sm text-gray-800">
            {new Intl.NumberFormat('pt-br', {
              currency: 'BRL',
              style: 'currency',
            }).format(shippingPrice)}
          </span>
        </div>

        <div className="flex justify-between items-center font-bold text-lg">
          <span className="text-xl text-gray-800">Total</span>
          <span className="text-xl text-gray-800">
            {new Intl.NumberFormat('pt-br', {
              currency: 'BRL',
              style: 'currency',
            }).format(totalItemsPrice + shippingPrice)}
          </span>
        </div>
      </div>

      <button
        type="submit"
        form="order"
        className="mt-2 w-full py-3 text-white text-xs bg-yellow uppercase font-semibold hover:bg-yellow-dark rounded-lg transition-colors"
      >
        Confirmar pedido
      </button>
    </div>
  )
}
