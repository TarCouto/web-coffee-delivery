import {
  FocusEvent,
  HTMLAttributes,
  InputHTMLAttributes,
  LegacyRef,
  forwardRef,
  useState,
} from 'react'

import { FieldError } from 'react-hook-form'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  optional?: boolean
  containerProps?: HTMLAttributes<HTMLDivElement>
  error?: FieldError
}

export const TextInput = forwardRef(function TextInput(
  { optional, error, containerProps, onFocus, onBlur, ...rest }: Props,
  ref: LegacyRef<HTMLInputElement>,
) {
  const [isFocused, setIsFocused] = useState(false)

  function handleFocus(event: FocusEvent<HTMLInputElement, Element>) {
    setIsFocused(true)
    onFocus?.(event)
  }

  function handleBlur(event: FocusEvent<HTMLInputElement, Element>) {
    setIsFocused(false)
    onBlur?.(event)
  }

  return (
    <div {...containerProps} className="flex flex-col gap-2">
      <label
        className={`flex text-gray-500  bg-gray-input items-center justify-between rounded-md border transition-all ${
          isFocused ? 'border-yellow-dark' : 'border-gray-200 bg-gray-input'
        } bg-gray-100`}
      >
        <input
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={ref}
          className="w-full bg-transparent p-3 text-gray-500 outline-none bg-gray-input border-none"
          {...rest}
        />

        {optional && (
          <span className="pr-3 text-gray-500 bg-gray-input italic text-sm">
            Opcional
          </span>
        )}
      </label>

      {error?.message && (
        <p role="alert" className="text-xs font-normal  text-red-500">
          {error.message}
        </p>
      )}
    </div>
  )
})
