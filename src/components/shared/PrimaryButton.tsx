interface Props {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
}

export function PrimaryButton({ children, onClick, disabled, className = '' }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`font-semibold rounded-full px-8 py-3 text-sm tracking-[0.1px] text-white
        transition-opacity disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer ${className}`}
      style={{ background: 'linear-gradient(160deg, #F26522 14%, #FC4243 86%)' }}
    >
      {children}
    </button>
  )
}
