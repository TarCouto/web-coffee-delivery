// components/CoffeeList.tsx (Server Component)
import { api } from '../data/api'
import { CoffeeType } from '../data/types/coffee'
import { QuantityCartInput } from './quantityCartInput'

async function getCoffees(): Promise<CoffeeType[]> {
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

export default async function CoffeeList() {
  const coffees = await getCoffees()

  return (
    <div>
      {coffees.map((coffee) => (
        <QuantityCartInput key={coffee.id} coffee={coffee} />
      ))}
    </div>
  )
}
