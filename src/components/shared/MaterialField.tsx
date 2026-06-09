import { useState } from 'react'

interface Props {
  label: string
  value: string
  onChange?: (v: string) => void
  hint?: string
  disabled?: boolean
  type?: string
}

export function MaterialField({ label, value, onChange, hint, disabled, type = 'text' }: Props) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0

  return (
    <div className={`relative ${disabled ? 'opacity-60 pointer-events-none' : ''}`}>
      <div className={`relative bg-[#FAFAFA] border-b-2 rounded-t-sm transition-colors
        ${focused ? 'border-[#0077D8]' : 'border-[#E0E0E0]'}`}>
        <label className={`absolute left-3 transition-all duration-150 pointer-events-none text-[#545454]
          ${floated ? 'top-1 text-xs text-[#0077D8]' : 'top-3.5 text-base'}`}>
          {label}
        </label>
        <input
          type={type}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent pt-6 pb-2 px-3 text-sm text-[#0E0E0F] outline-none"
        />
      </div>
      {hint && <p className="text-xs text-[#545454] mt-1 ml-3">{hint}</p>}
    </div>
  )
}
