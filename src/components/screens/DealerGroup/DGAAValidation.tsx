import { useState } from 'react'
import type { View } from '../../../types'
import { MaterialField } from '../../shared/MaterialField'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props { setView: (v: View) => void }

export function DGAAValidation({ setView }: Props) {
  const [aaid, setAaid] = useState('')
  const [last4, setLast4] = useState('')

  return (
    <div className="flex h-screen">
      <ScreenLabel id="DG-2" name="Dealer Group — AA Validation" />
      {/* Left */}
      <div className="w-1/2 bg-white flex flex-col">
        <div className="h-20 px-10 flex items-center justify-between border-b border-[#E8E9EB] shrink-0">
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl text-[#F26522]">ACV</span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-[#0C2340] text-white text-[10px] font-semibold rounded px-2 py-1 uppercase tracking-wide">
              Dealer Group
            </span>
            <button
              onClick={() => setView('lobby')}
              className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer"
            >
              ← Lobby
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-[125px]">
          <div className="bg-[#0C2340] rounded text-white font-bold text-sm px-4 py-3 w-fit mb-6">
            <div>AUCTION</div>
            <div>ACCESS</div>
          </div>
          <p className="text-sm text-[#212121] mb-1">Enter your AuctionAccess login to continue.</p>
          <p className="text-xs text-[#55575C] mb-8">
            You are registering on behalf of <strong>Group One Automotive</strong> via the centralized dealer group process.
          </p>

          <div className="space-y-6">
            <MaterialField label="Auction Access ID (AAID)" value={aaid} onChange={setAaid} />
            <MaterialField
              label="Last 4 Digits of Photo ID"
              value={last4}
              onChange={setLast4}
              hint="Last 4 digits of your driver's license or state ID"
            />
          </div>

          <div className="flex justify-end gap-6 items-center mt-8">
            <button onClick={() => setView('lobby')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton onClick={() => setView('dg-create-credentials')} disabled={!aaid || !last4}>
              Continue
            </PrimaryButton>
          </div>
        </div>

        <div className="px-10 py-5 flex justify-between text-xs text-[#8D9199] shrink-0">
          <span>© 2026 ACV Auctions, Inc. All rights reserved.</span>
          <span>Need Assistance? <span className="text-[#004E7D]">1-800-553-4070</span></span>
        </div>
      </div>

      {/* Right */}
      <div className="w-1/2 bg-[#0C2340] flex flex-col justify-center px-16">
        <p className="text-xs font-semibold text-[#F59600] uppercase tracking-widest mb-3">Group One Automotive</p>
        <h1 className="font-black text-5xl text-white tracking-tight leading-tight mb-4">
          CENTRALIZED<br />GROUP<br />REGISTRATION
        </h1>
        <p className="text-base text-[#8BAFD4] leading-relaxed max-w-sm">
          Register all Group One Automotive rooftops in a single coordinated process with dedicated ACV support.
        </p>
      </div>
    </div>
  )
}
