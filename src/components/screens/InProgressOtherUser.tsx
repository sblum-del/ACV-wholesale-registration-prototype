import type { View } from '../../types'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function InProgressOtherUser({ setView }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="RESUME-1" name="In Progress — Started by Another User" />
      {/* Header — matches register dealership screens */}
      <div className="border-b border-[#E8E9EB] h-16 flex items-center justify-between px-10 shrink-0">
        <div className="flex flex-col leading-none">
          <span className="font-black text-2xl text-[#F26522]">ACV</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="border border-[#004E7D] text-[#004E7D] text-sm rounded-md px-4 py-2 hover:bg-[#F0F6FF] cursor-pointer">
            Save & Browse ACV
          </button>
          <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">
            ← Lobby
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 pt-10 pb-16">
        <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Register Dealership</h2>
        <p className="text-sm text-[#55575C] mb-1">
          Your AuctionAccess account is linked to 1 dealership.
        </p>
        <p className="text-sm text-[#55575C] mb-6">Please choose a dealership to continue</p>

        {/* 5M card — matches existing style, "In progress" badge, Cancel button */}
        <div className="border border-[#E8E9EB] rounded-xl px-5 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="font-semibold text-[15px] text-[#0E0E0F]">Metro Ford of Albany</span>
              <span className="bg-[#FFF7ED] text-[#C2410C] text-xs font-medium rounded px-2 py-0.5">In progress</span>
            </div>
            <span className="text-sm text-[#55575C]">Albany, Idaho</span>
          </div>
          <button
            onClick={() => setView('cancel-in-progress')}
            className="text-sm font-semibold text-[#DC2626] cursor-pointer hover:underline flex items-center gap-1 shrink-0 ml-4"
          >
            Cancel <span className="text-base">›</span>
          </button>
        </div>
      </div>

      <div className="mt-auto px-10 py-5 flex justify-between text-xs text-[#8D9199] border-t border-[#E8E9EB]">
        <span>© 2021 ACV Auctions, Inc. All rights reserved.</span>
        <div className="flex gap-6">
          <span className="text-[#004E7D] cursor-pointer hover:underline">Terms of Service</span>
          <span className="text-[#004E7D] cursor-pointer hover:underline">Privacy Policy</span>
        </div>
      </div>
    </div>
  )
}
