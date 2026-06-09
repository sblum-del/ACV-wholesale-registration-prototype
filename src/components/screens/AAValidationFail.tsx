import { useState } from 'react'
import type { View } from '../../types'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  onLobby?: () => void
}

export function AAValidationFail({ setView, onLobby }: Props) {
  const [aaid, setAaid] = useState('23452334')
  const [last4, setLast4] = useState('1234')
  const [aaFocused, setAaFocused] = useState(false)

  return (
    <div className="flex h-screen">
      <ScreenLabel id="AUTH-2" name="AA Validation — Identity Not Found" />
      {/* Left panel */}
      <div className="w-1/2 bg-white flex flex-col">
        <div className="h-20 px-10 flex items-center justify-between border-b border-[#E8E9EB] shrink-0">
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl text-[#F26522]">ACV</span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#55575C]">Already have an ACV account?</span>
            <button className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">LOGIN</button>
            {onLobby && (
              <button onClick={onLobby} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">
                ← Lobby
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-[125px]">
          {/* AA Logo */}
          <div className="bg-[#005BA8] rounded text-white font-bold text-sm px-4 py-3 w-fit mb-4">
            <div>AUCTION</div>
            <div>ACCESS</div>
          </div>

          <p className="text-sm text-[#212121] mb-5">Enter your AuctionAccess login to continue.</p>

          {/* Error banner — matches screenshot */}
          <div className="bg-[#FFF4F4] border border-[#FCA5A5] rounded-xl px-4 py-3 flex items-start gap-3 mb-6">
            <div className="w-6 h-6 rounded-full border-2 border-[#E53E3E] flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[#E53E3E] text-xs font-bold">i</span>
            </div>
            <p className="text-sm text-[#0E0E0F] leading-relaxed">
              We couldn't verify your identity. Please check your AuctionAccess ID and Photo ID and try again.
            </p>
          </div>

          {/* Fields — shown with error state (red underline) */}
          <div className="space-y-6">
            {/* Auction Access ID — error state */}
            <div className="relative">
              <div className={`bg-[#FAFAFA] border-b-2 rounded-t-sm transition-colors ${aaFocused ? 'border-[#E53E3E]' : 'border-[#E53E3E]'}`}>
                <label className="absolute left-3 top-1 text-xs text-[#E53E3E] pointer-events-none">
                  Auction Access ID
                </label>
                <input
                  type="text"
                  value={aaid}
                  onChange={e => setAaid(e.target.value)}
                  onFocus={() => setAaFocused(true)}
                  onBlur={() => setAaFocused(false)}
                  className="w-full bg-transparent pt-6 pb-2 px-3 text-sm text-[#0E0E0F] outline-none"
                />
              </div>
            </div>

            {/* Last 4 — error state */}
            <div className="relative">
              <div className="bg-[#FAFAFA] border-b-2 border-[#E53E3E] rounded-t-sm">
                <label className="absolute left-3 top-1 text-xs text-[#E53E3E] pointer-events-none">
                  Last 4 Digits of Photo ID
                </label>
                <input
                  type="text"
                  value={last4}
                  onChange={e => setLast4(e.target.value)}
                  className="w-full bg-transparent pt-6 pb-2 px-3 text-sm text-[#0E0E0F] outline-none"
                />
              </div>
              <p className="text-xs text-[#55575C] mt-1 ml-3">Last 4 digits of your driver's license or state ID</p>
            </div>
          </div>

          {/* No CRM records callout */}
          <div className="mt-5 bg-[#F7F7F8] border border-[#E8E9EB] rounded-lg px-4 py-3">
            <p className="text-xs text-[#55575C] leading-relaxed">
              <span className="font-semibold text-[#0E0E0F]">No records created.</span>{' '}
              Because we couldn't verify your AuctionAccess identity, no Salesforce records have been created and no ACV account has been initiated. Your information has not been stored.
            </p>
          </div>

          <div className="flex justify-end gap-6 items-center mt-8">
            <button onClick={() => setView('lobby')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton onClick={() => setView('aa-validation')} disabled={!aaid || !last4}>
              Try Again
            </PrimaryButton>
          </div>
        </div>

        <div className="px-10 py-5 flex justify-between text-xs text-[#8D9199] shrink-0">
          <span>© 2026 ACV Auctions, Inc. All rights reserved.</span>
          <span>Need Assistance? <span className="text-[#004E7D]">1-800-553-4070</span></span>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/2 bg-[#121212] flex flex-col justify-center px-16">
        <h1 className="font-black text-6xl text-white tracking-tight leading-none">SIGN UP<br />TODAY</h1>
        <p className="text-xl text-[#999] mt-6 max-w-sm leading-relaxed">
          Register today to start bidding and winning used car auctions
        </p>
      </div>
    </div>
  )
}
