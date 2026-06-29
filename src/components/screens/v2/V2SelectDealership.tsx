import { useState } from 'react'
import type { View } from '../../../types'
import { ACVHeader } from '../../shared/ACVHeader'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

const DEALER = {
  id: 'd-v2-1',
  name: 'Metro Ford of Albany',
  address: '1450 Central Ave, Albany, ID 83705',
  location: 'Albany, ID',
  fiveMId: '583921',
  contactName: 'James Harlow',
  email: 'jharlow@metrofordalbany.com',
  phone: '(518) 555-0192',
}

export function V2SelectDealership({ setView, isLoggedIn, onLogout }: Props) {
  const [, setSelectedId] = useState<string>(DEALER.id)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-1" name="Select Dealership" />
      <ACVHeader onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="max-w-4xl mx-auto w-full px-6 pt-12">
        <h2 className="font-bold text-3xl text-[#0E0E0F]">Your affiliated dealership</h2>
        <p className="text-sm text-[#55575C] mt-2 mb-8">
          We found the following dealership account associated with your AuctionAccess ID. Select it to begin registration.
        </p>

        <div className="bg-white rounded-xl border border-[#E8E9EB] p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-semibold text-base text-[#0E0E0F]">{DEALER.name}</span>
              <span className="bg-[#EBF5FF] text-[#0061A5] text-xs rounded px-2 py-0.5">Not started</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#55575C]">
              <span>{DEALER.location}</span>
              <span className="text-[#D1D3D6]">·</span>
              <span className="font-mono text-xs bg-[#F7F7F8] border border-[#E8E9EB] rounded px-2 py-0.5 text-[#55575C]">
                5M: {DEALER.fiveMId}
              </span>
            </div>
          </div>
          <button
            onClick={() => { setSelectedId(DEALER.id); setView('v2-sf-interstitial-1') }}
            className="text-sm font-semibold text-[#004E7D] cursor-pointer hover:underline"
          >
            Start Registration →
          </button>
        </div>
      </div>
    </div>
  )
}
