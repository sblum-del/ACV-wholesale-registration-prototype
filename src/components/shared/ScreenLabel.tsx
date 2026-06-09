interface Props {
  id: string  // e.g. "S1-3" or "DG-2"
  name: string // e.g. "Banking Screen"
}

export function ScreenLabel({ id, name }: Props) {
  return (
    <div
      className="fixed bottom-3 left-3 z-50 flex items-center gap-1.5 bg-[#0E0E0F]/75 text-white text-[10px] font-mono rounded-full px-3 py-1.5 select-none pointer-events-none backdrop-blur-sm"
      title={`Screen ${id}: ${name} — reference this number when leaving Confluence comments`}
    >
      <span className="text-[#F59600] font-bold">{id}</span>
      <span className="text-white/60">·</span>
      <span>{name}</span>
    </div>
  )
}
