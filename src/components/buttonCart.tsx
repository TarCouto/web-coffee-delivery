'use client'

import { ShoppingCart } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'
import { useCart } from '../hooks/useCart'

export function ButtonCart() {
  const { cart } = useCart()
  return (
    <Link
      href="/cart"
      className={`relative flex items-center bg-yellow-light text-yellow-dark p-2 rounded-md ${cart.length === 0 ? 'pointer-events-none' : ''}`}
      aria-disabled={cart.length === 0}
    >
      <ShoppingCart size={22} weight="fill" />
      {cart.length > 0 ? (
        <span className="font-bold text-white bg-yellow-dark rounded-full w-5 h-5 flex items-center justify-center absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
          {cart.length}
        </span>
      ) : null}
    </Link>
  )
}
