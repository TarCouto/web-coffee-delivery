'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPin,
  Money,
} from '@phosphor-icons/react/dist/ssr'

import { TextInput } from '@/src/components/textInput'

import { useCart } from '../hooks/useCart'
import { Radio } from '@/src/components/radio'

type FormInputs = {
  cep: number
  street: string
  number: string
  fullAddress: string
  neighborhood: string
  city: string
  state: string
  paymentMethod: 'credit' | 'debit' | 'cash'
}

const newOrder = z.object({
  cep: z.number({ invalid_type_error: 'Informe o CEP' }),
  street: z.string().min(1, 'Informe a rua'),
  number: z.string().min(1, 'Informe o número'),
  fullAddress: z.string(),
  neighborhood: z.string().min(1, 'Informe o bairro'),
  city: z.string().min(1, 'Informe a cidade'),
  state: z.string().min(1, 'Informe a UF'),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    invalid_type_error: 'Informe um método de pagamento',
  }),
})

export type OrderInfo = z.infer<typeof newOrder>

export function Form() {
  const { cart, checkout } = useCart()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(newOrder),
  })

  const selectedPaymentMethod = watch('paymentMethod')

  const handleOrderCheckout: SubmitHandler<FormInputs> = async (data) => {
    if (cart.length === 0) {
      return alert('É preciso ter pelo menos um item no carrinho')
    }
    checkout(data)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-1xl font-extrabold text-gray-800">
          Complete seu pedido
        </h2>
      </div>
      <form id="order" onSubmit={handleSubmit(handleOrderCheckout)}>
        <div className="p-10 rounded-lg bg-gray-100 flex flex-col gap-8 w-full min-w-[640px]">
          <div className="flex gap-2">
            <MapPin size={22} color="#8047F8" />

            <div>
              <span className="text-gray-800">Endereço de Entrega</span>

              <p className="text-sm text-gray-800">
                Informe o endereço onde deseja receber o seu pedido
              </p>
            </div>
          </div>

          <div className="grid grid-cols-[200px_1fr_60px] gap-x-3 gap-y-4">
            <div className="col-span-full max-w-56">
              <TextInput
                placeholder="CEP"
                type="number"
                error={errors.cep}
                {...register('cep', { valueAsNumber: true })}
              />
            </div>
            <div className="col-span-full">
              <TextInput
                placeholder="Rua"
                error={errors.street}
                {...register('street')}
              />
            </div>

            <div className="col-span-full flex gap-3">
              <div className="w-2/5">
                <TextInput
                  placeholder="Número"
                  error={errors.number}
                  {...register('number')}
                />
              </div>
              <div className="w-3/5">
                <TextInput
                  placeholder="Complemento"
                  optional
                  error={errors.fullAddress}
                  {...register('fullAddress')}
                />
              </div>
            </div>

            <TextInput
              placeholder="Bairro"
              error={errors.neighborhood}
              {...register('neighborhood')}
            />

            <TextInput
              placeholder="Cidade"
              error={errors.city}
              {...register('city')}
            />

            <TextInput
              placeholder="UF"
              maxLength={2}
              error={errors.state}
              {...register('state')}
            />
          </div>
        </div>
      </form>

      <div className="p-10 rounded-lg bg-gray-100 flex flex-col gap-8 mt-3">
        <div className="flex gap-2 ">
          <CurrencyDollar size={22} color="#8047F8" />

          <div>
            <span className="text-gray-800">Pagamento</span>

            <p className="text-sm text-gray-800">
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between gap-3 bg-gray-100">
            <Radio
              isSelected={selectedPaymentMethod === 'credit'}
              {...register('paymentMethod')}
              value="credit"
            >
              <CreditCard size={16} />
              <span className="text-xs whitespace-nowrap">
                Cartão de crédito
              </span>
            </Radio>

            <Radio
              isSelected={selectedPaymentMethod === 'debit'}
              {...register('paymentMethod')}
              value="debit"
            >
              <Bank size={16} />
              <span className="text-xs whitespace-nowrap">
                Cartão de débito
              </span>
            </Radio>

            <Radio
              isSelected={selectedPaymentMethod === 'cash'}
              {...register('paymentMethod')}
              value="cash"
            >
              <Money size={16} />
              <span>Dinheiro</span>
            </Radio>
          </div>

          {errors.paymentMethod && (
            <p className="text-xs text-red-500" role="alert">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
