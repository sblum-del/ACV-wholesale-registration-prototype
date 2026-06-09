interface Props {
  label: string
  selected: boolean
  onToggle: () => void
}

export function ChipToggle({ label, selected, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`px-10 py-3 rounded-lg text-sm cursor-pointer transition-all
        ${selected
          ? 'border-2 border-[#F26522] bg-[#FFF3ED] text-[#F26522] font-medium'
          : 'border border-[#D1D3D6] bg-white text-[#0E0E0F] hover:border-[#F26522]/50'
        }`}
    >
      {label}
    </button>
  )
}
