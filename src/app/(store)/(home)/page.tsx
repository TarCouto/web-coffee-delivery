import { Card } from '@/src/components/card'
import {
  Coffee,
  Package,
  ShoppingCart,
  Timer,
} from '@phosphor-icons/react/dist/ssr'

// eslint-disable-next-line camelcase
import { Baloo_2 } from 'next/font/google'
import Image from 'next/image'
import { CoffeeType } from '@/src/data/types/coffee'
import { api } from '@/src/data/api'
import { Metadata } from 'next'

const baloo2 = Baloo_2({
  weight: '800',
  subsets: ['latin'], // Adicione outros subsets se necessário
})

async function getcoffes(): Promise<CoffeeType[]> {
  const response = await api('/coffees', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })

  if (!response.ok) {
    console.error('Erro ao buscar os cafés:', response.statusText)
    return [] // Retorna uma array vazia em caso de erro
  }

  const data = await response.json()

  return Array.isArray(data.coffees) ? data.coffees : [] // Garante que sempre retorne uma array
}

export const metadata: Metadata = {
  title: 'Home',
}

export default async function Home() {
  const coffees = await getcoffes()

  return (
    <section className="relative bg-[url('/hero-bg.svg')] bg-cover bg-center h-[544px] w-screen max-w-[1600px]">
      <div className="max-w-[1160px] max-h-[1100px] items-center mx-auto  px-3  pt-[20px] flex flex-col lg:flex-row  justify-between z-10">
        <div className="flex flex-col gap-16 max-w-[1150px]">
          <div className="flex flex-col gap-4">
            <h1
              className={`${baloo2.className} max-w-[580px] text-3xl md:text-5xl/snug font-bold text-black h-full`}
            >
              Encontre o café perfeito para qualquer hora do dia
            </h1>
            <span className=" max-w-[580px] text-lg md:text-xl text-gray-700 mt-0 ">
              Com o Coffee Delivery você recebe seu café onde estiver, a
              qualquer hora
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5">
            <div className="flex items-center gap-3">
              <ShoppingCart
                size={32}
                weight="fill"
                className="p-2 rounded-full bg-yellow-dark text-yellow-light"
              />
              <span className="text-base font-normal text-gray-500">
                Compra simples e segura
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Package
                size={32}
                weight="fill"
                className="p-2 rounded-full"
                style={{ backgroundColor: '#574F4D', color: '#FFFFFF' }}
              />
              <span className=" text-base font-normal text-gray-500">
                Embalagem mantém o café intacto
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Timer
                size={32}
                weight="fill"
                className="p-2 rounded-full"
                style={{ backgroundColor: '#DBAC2C', color: '#FFFFFF' }}
              />
              <span className=" text-base font-normal text-gray-500">
                Entrega rápida e rastreada
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Coffee
                size={32}
                weight="fill"
                className="p-2 rounded-full"
                style={{ backgroundColor: '#8047F8', color: '#FFFFFF' }}
              />
              <span className="  text-base font-normal text-gray-500">
                O café chega fresquinho até você
              </span>
            </div>
          </div>
        </div>

        <Image
          src="/hero.svg"
          alt="Café do Coffee Delivery"
          width={300}
          height={300}
          className="object-contain flex lg:w-[480px] lg:h-[480px] bg-transparent"
        />
      </div>

      <div className="max-w-[1160px] w-screen py-10 px-3 pb-[150px] mt-6 mx-auto flex flex-col gap-[54px]">
        <h2
          className={`${baloo2.className} text-4xl leading-snug font-bold text-black`}
        >
          Nossos cafés
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-[40px] gap-x-8 justify-items-center">
          {coffees.map((coffee) => (
            <Card key={coffee.id} coffee={coffee} />
          ))}
        </div>
      </div>
    </section>
  )
}
