import type { View } from '../../types'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function ExistingSelectDealership({ setView, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="S9-1" name="Existing User — Register Dealership" />
      {/* Header — matches Figma: Logout + Save & Browse ACV */}
      <div className="border-b border-[#E8E9EB] h-16 flex items-center justify-between px-10 shrink-0">
        <div className="flex flex-col leading-none">
          <span className="font-black text-2xl text-[#F26522]">ACV</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onLogout}
            className="text-sm text-[#55575C] cursor-pointer hover:underline"
          >
            Logout
          </button>
          <button className="border border-[#004E7D] text-[#004E7D] text-sm rounded-md px-4 py-2 hover:bg-[#F0F6FF] transition-colors cursor-pointer">
            Save & Browse ACV
          </button>
          <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">
            ← Lobby
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 pt-10 pb-16">
        <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Register Dealership</h2>
        <p className="text-sm text-[#55575C] mb-6">
          Your AuctionAccess account is linked to 2 dealerships.
        </p>

        <p className="text-sm text-[#55575C] mb-3">Please choose a dealership to continue</p>

        {/* Section 1: Can register */}
        <div className="space-y-3 mb-8">

          {/* Net-new — Start Registration */}
          <div className="border border-[#E8E9EB] rounded-xl px-5 py-4 flex items-center justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-[15px] text-[#0E0E0F]">Metro Ford of Albany</span>
                <span className="bg-[#EBF5FF] text-[#0061A5] text-xs font-medium rounded px-2 py-0.5">Not started</span>
              </div>
              <span className="text-sm text-[#55575C]">Albany, New York</span>
            </div>
            <button
              onClick={() => setView('sf-interstitial-1')}
              className="text-sm font-semibold text-[#004E7D] cursor-pointer hover:underline flex items-center gap-1"
            >
              Start Registration <span className="text-base">›</span>
            </button>
          </div>
        </div>

        {/* Section 2: Already on ACV */}
        <p className="text-sm text-[#55575C] mb-3">
          These dealerships are already on ACV. Join to get access, or look for the Joined status to see where you're already active.
        </p>

        <div className="space-y-3">

          {/* Registered + Joined — greyed, no action */}
          <div className="border border-[#E8E9EB] rounded-xl px-5 py-4 flex items-center justify-between bg-[#F9FAFB] opacity-60">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-[15px] text-[#55575C]">Speed Auto Group</span>
                <span className="bg-[#ECFDF5] text-[#00A576] text-xs font-medium rounded px-2 py-0.5">Registered</span>
                <span className="bg-[#EFF6FF] text-[#0077D8] text-xs font-medium rounded px-2 py-0.5">Joined</span>
              </div>
              <span className="text-sm text-[#8D9199]">Albany, New York</span>
            </div>
            {/* No action available */}
          </div>
        </div>
      </div>

      {/* Footer */}
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
