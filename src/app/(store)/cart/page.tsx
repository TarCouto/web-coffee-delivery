import { Form } from '@/src/components/form'
import { api } from '@/src/data/api'
import { CoffeeType } from '@/src/data/types/coffee'
import CartClientComponent from '@/src/components/cartClientComponent'

const shippingPrice = 3.5

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

export default async function Cart() {
  const coffees = await getcoffes()

  return (
    <div className="flex max-w-6xl p-3 ml-auto mr-auto gap-8 mt-8">
      <Form />

      <div className="flex flex-col gap-4">
        <h2 className="text-1xl font-extrabold text-gray-800">
          Cafés selecionados
        </h2>

        <CartClientComponent coffees={coffees} shippingPrice={shippingPrice} />
      </div>
    </div>
  )
}
