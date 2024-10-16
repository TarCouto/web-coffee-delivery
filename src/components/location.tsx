'use client'
import { useState, useEffect } from 'react'
import { MapPin } from '@phosphor-icons/react/dist/ssr'

export function Location() {
  const [location, setLocation] = useState('Carregando...')

  useEffect(() => {
    fetch('https://ipinfo.io/json?token=b2a5cc13a8c57c') // Aqui estamos usando seu token
      .then((response) => response.json())
      .then((data) => {
        if (data.city && data.region) {
          setLocation(`${data.city}, ${data.region}`)
        } else {
          setLocation('Localização não encontrada')
        }
      })
      .catch(() => {
        setLocation('Erro ao obter localização')
      })
  }, [])

  return (
    <div className="flex items-center gap-1 bg-purple-100 p-2.5 rounded-md">
      <MapPin size={22} weight="fill" color="#8047F8" />
      <span className="text-purple-700">{location}</span>
    </div>
  )
}
