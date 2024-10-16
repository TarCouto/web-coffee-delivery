import { Header } from '@/src/components/header'
import { ReactNode } from 'react'
import { CartContextProvider } from '../../contexts/CartProvider'

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartContextProvider>
      <div className="min-h-screen mx-auto max-w-[1600px]">
        <Header />
        {children}
      </div>
    </CartContextProvider>
  )
}
