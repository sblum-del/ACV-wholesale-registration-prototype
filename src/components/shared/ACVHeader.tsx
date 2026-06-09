interface Props {
  registering?: boolean
  onLobby?: () => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function ACVHeader({ registering, onLobby, isLoggedIn, onLogout }: Props) {
  return (
    <div className="bg-white border-b border-[#E8E9EB] h-20 flex items-center justify-between px-10 shrink-0">
      <div className="flex items-center gap-8">
        <div className="flex flex-col leading-none">
          <span className="font-black text-2xl text-[#F26522]">ACV</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
        </div>
        {registering && (
          <span className="text-sm text-[#55575C]">Registering:&nbsp;&nbsp;Metro Ford of Albany</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        {onLobby && (
          <button
            onClick={onLobby}
            className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] transition-colors cursor-pointer"
          >
            ← Lobby
          </button>
        )}
        {registering && (
          <>
            <span className="text-sm text-[#004E7D] cursor-pointer hover:underline">← Back to Dealership List</span>
            <button className="border border-[#004E7D] text-[#004E7D] text-sm rounded-md px-4 py-2 hover:bg-[#F0F6FF] transition-colors">
              Save & Browse ACV
            </button>
          </>
        )}
        {/* Login / Logout toggle */}
        {isLoggedIn !== undefined && (
          isLoggedIn ? (
            <button
              onClick={onLogout}
              className="text-xs text-[#E53E3E] border border-[#E53E3E] rounded-md px-3 py-1.5 hover:bg-[#FFF0F0] transition-colors cursor-pointer"
            >
              Log Out
            </button>
          ) : (
            <button className="text-xs text-[#004E7D] border border-[#004E7D] rounded-md px-3 py-1.5 hover:bg-[#F0F6FF] transition-colors cursor-pointer">
              Log In
            </button>
          )
        )}
      </div>
    </div>
  )
}
