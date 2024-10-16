'use client'

import { useCart } from '@/src/hooks/useCart'
import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'

import Image from 'next/image'
import { useParams } from 'next/navigation'

const paymentMethod = {
  credit: 'Cartão de crédito',
  debit: 'Cartão de débito',
  cash: 'Dinheiro',
}

export function Success() {
  const { orders } = useCart()
  const { orderId } = useParams()
  const orderInfo = orders.find((order) => order.id === Number(orderId))

  if (!orderInfo?.id) {
    return null
  }

  return (
    <main className="flex max-w-6xl mx-auto p-20 items-end justify-between gap-10">
      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-yellow-700 text-4xl font-bold">
            Uhu! Pedido confirmado
          </h2>
          <span className="text-lg text-gray-700">
            Agora é só aguardar que logo o café chegará até você
          </span>
        </div>

        <div className="border border-transparent rounded-[6px_36px] w-full bg-gradient-to-br from-yellow-500 to-purple-500 p-10">
          <div className="bg-white p-10 rounded-[6px_36px] flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <MapPin
                className="p-2 rounded-full"
                size={32}
                style={{ backgroundColor: '#8047F8', color: '#FFF' }}
              />
              <div className="flex flex-col">
                <span>
                  Entrega em{' '}
                  <strong>
                    {orderInfo.street}, {orderInfo.number}
                  </strong>
                </span>
                <span>
                  {orderInfo.neighborhood} - {orderInfo.city}, {orderInfo.state}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Timer
                className="p-2 rounded-full"
                size={32}
                style={{ backgroundColor: '#DBAC2C', color: '#FFF' }}
              />
              <div className="flex flex-col">
                <span>Previsão de entrega</span>
                <strong>20 min - 30 min</strong>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CurrencyDollar
                className="p-2 rounded-full"
                size={32}
                style={{ backgroundColor: '#C47F17', color: '#FFF' }}
              />
              <div className="flex flex-col">
                <span>Pagamento na entrega</span>
                <strong>{paymentMethod[orderInfo.paymentMethod]}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Image
        src="/images/delivery.svg"
        alt="Pedido concluído"
        width={500}
        height={300}
        className="mb-[-13px]"
      />
    </main>
  )
}
