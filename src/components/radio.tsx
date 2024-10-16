import { InputHTMLAttributes, LegacyRef, forwardRef } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  isSelected: boolean
}

export const Radio = forwardRef(function Radio(
  { children, isSelected, ...rest }: Props,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <label
      className={`p-4 w-full flex items-center gap-3 rounded-lg border transition-all ${
        isSelected
          ? 'bg-purple-100 border-purple-500'
          : 'bg-gray-input border-transparent hover:bg-gray-300'
      } uppercase text-gray-700 text-sm`}
      data-state={isSelected}
    >
      <input type="radio" ref={ref} className="hidden" {...rest} />
      {children}
    </label>
  )
})
