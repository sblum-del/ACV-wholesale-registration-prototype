import { useState } from 'react'
import type { View } from '../../../types'
import { MaterialField } from '../../shared/MaterialField'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props { setView: (v: View) => void }

export function DGCreateCredentials({ setView }: Props) {
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="DG-3" name="Dealer Group — Create Credentials" />
      <div className="h-20 px-10 flex items-center justify-between border-b border-[#E8E9EB] shrink-0">
        <div className="flex flex-col leading-none">
          <span className="font-black text-2xl text-[#F26522]">ACV</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#0C2340] text-white text-[10px] font-semibold rounded px-2 py-1 uppercase tracking-wide">
            Dealer Group
          </span>
          <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">
            ← Lobby
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <div className="max-w-lg w-full">
          <h2 className="font-bold text-3xl text-[#0E0E0F]">Create your ACV login</h2>
          <p className="text-sm text-[#55575C] mt-2 mb-6">
            We found your AuctionAccess record. Set up credentials for the Group One Automotive corporate account.
          </p>

          <div className="bg-[#EFF6FF] border border-[#BFD9F7] rounded-lg p-3 flex items-center gap-2 mb-6">
            <span>💡</span>
            <span className="text-sm text-[#004E7D]">Email pre-populated from your AuctionAccess record</span>
          </div>

          <div className="space-y-6">
            <MaterialField label="Email Address" value="corporate@grouponeauto.com" onChange={() => {}} disabled />
            <MaterialField label="Password" type="password" value={password} onChange={setPassword} />
            <MaterialField label="Confirm Password" type="password" value={password} onChange={() => {}} />
          </div>

          <div className="flex justify-end gap-6 items-center mt-8">
            <button onClick={() => setView('dg-aa-validation')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton disabled={!password} onClick={() => setView('dg-check-email')}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
