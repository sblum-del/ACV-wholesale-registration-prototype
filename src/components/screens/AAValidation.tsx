import { useState } from 'react'
import type { View, ActiveScenario } from '../../types'
import { MaterialField } from '../shared/MaterialField'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  onLobby?: () => void
  activeScenario?: ActiveScenario
}

export function AAValidation({ setView, onLobby, activeScenario }: Props) {
  const [aaid, setAaid] = useState('')
  const [last4, setLast4] = useState('')

  const existingUserResume = ['r1','r2','r3','r4','r5','r6'] // r6n is net-new
  const isExistingUser = activeScenario === 's9' || activeScenario === 's8b' || existingUserResume.includes(activeScenario ?? '')

  const handleContinue = () => {
    if (isExistingUser) {
      setView('existing-user-login')
    } else {
      setView('create-credentials')
    }
  }

  return (
    <div className="flex h-screen">
      <ScreenLabel id="AUTH-1" name="AA Validation — Enter Credentials" />
      {/* Left panel */}
      <div className="w-1/2 bg-white flex flex-col">
        <div className="h-20 px-10 flex items-center justify-between border-b border-[#E8E9EB] shrink-0">
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl text-[#F26522]">ACV</span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-[#55575C]">Already have an ACV account?</span>
            <button className="text-[#004E7D] font-medium cursor-pointer hover:underline">LOGIN</button>
            {onLobby && (
              <button onClick={onLobby} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] transition-colors cursor-pointer">
                ← Lobby
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center px-[125px]">
          <div className="bg-[#005BA8] rounded text-white font-bold text-sm px-4 py-3 w-fit mb-6">
            <div>AUCTION</div>
            <div>ACCESS</div>
          </div>
          <p className="text-sm text-[#212121] mb-8">Enter your AuctionAccess login to continue.</p>

          <div className="space-y-6">
            <MaterialField label="Auction Access ID" value={aaid} onChange={setAaid} />
            <MaterialField
              label="Last 4 Digits of Photo ID"
              value={last4}
              onChange={setLast4}
              hint="Last 4 digits of your driver's license or state ID"
            />
          </div>

          {/* Existing user hint — shows after both fields filled for S9 */}
          {isExistingUser && aaid && last4 && (
            <div className="mt-5 bg-[#EFF6FF] border border-[#BFD9F7] rounded-lg px-4 py-3 flex items-start gap-3">
              <span className="text-[#0077D8] text-base shrink-0">ℹ️</span>
              <p className="text-sm text-[#004E7D]">
                An account with this AuctionAccess ID already exists in ACV. Please sign in to continue.
              </p>
            </div>
          )}

          <div className="flex justify-end gap-6 items-center mt-8">
            <button onClick={() => setView('lobby')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton onClick={handleContinue} disabled={!aaid || !last4}>
              {isExistingUser && aaid && last4 ? 'Sign In →' : 'Continue'}
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
