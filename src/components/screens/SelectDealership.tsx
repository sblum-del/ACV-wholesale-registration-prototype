import { useState } from 'react'
import type { View, ActiveScenario } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  activeScenario: ActiveScenario
  isLoggedIn?: boolean
  onLogout?: () => void
}

const S1_DEALERS = [
  {
    id: 'd-s1-1',
    name: 'Metro Ford of Albany',
    address: '1450 Central Ave, Albany, ID 83705',
    location: 'Albany, ID',
    contactName: 'James Harlow',
    email: 'jharlow@metrofordalbany.com',
    phone: '(518) 555-0192',
  },
]

const S4_DEALERS = [
  {
    id: 'd-s4-1',
    name: 'Metro Ford of Birmingham',
    address: '3201 Lorna Rd, Birmingham, AL 35216',
    location: 'Birmingham, AL',
    contactName: 'James Harlow',
    email: 'jharlow@metrofordbirmingham.com',
    phone: '(205) 555-0184',
  },
]

const S5_DEALERS = [
  {
    id: 'd-s5-1',
    name: 'Metro Ford of Portland',
    address: '1215 SE 82nd Ave, Portland, OR 97216',
    location: 'Portland, OR',
    contactName: 'James Harlow',
    email: 'jharlow@metrofordportland.com',
    phone: '(503) 555-0261',
  },
]

const S2_DEALERS = [
  {
    id: 'd-s2-1',
    name: 'Metro Ford of Albany',
    address: '1450 Central Ave, Albany, ID 83705',
    location: 'Albany, ID',
    contactName: 'James Harlow',
    email: 'jharlow@metrofordalbany.com',
    phone: '(518) 555-0192',
  },
  {
    id: 'd-s2-2',
    name: 'Metro Ford of Boise',
    address: '4820 Fairview Ave, Boise, ID 83706',
    location: 'Boise, ID',
    contactName: 'James Harlow',
    email: 'jharlow@metrofordboise.com',
    phone: '(208) 555-0341',
  },
  {
    id: 'd-s2-3',
    name: 'Metro Ford of Nampa',
    address: '223 Industrial Blvd, Nampa, ID 83651',
    location: 'Nampa, ID',
    contactName: 'James Harlow',
    email: 'jharlow@metrofordnampa.com',
    phone: '(208) 555-0558',
  },
  {
    id: 'd-s2-4',
    name: 'Metro Ford of Twin Falls',
    address: '890 Blue Lakes Blvd N, Twin Falls, ID 83301',
    location: 'Twin Falls, ID',
    contactName: 'James Harlow',
    email: 'jharlow@metrofordtwinfalls.com',
    phone: '(208) 555-0714',
  },
]

export function SelectDealership({ setView, activeScenario, isLoggedIn, onLogout }: Props) {
  const isS2 = activeScenario === 's2'
  const dealers =
    activeScenario === 's2' ? S2_DEALERS
    : activeScenario === 's4' ? S4_DEALERS
    : activeScenario === 's5' ? S5_DEALERS
    : S1_DEALERS // s1, s3

  const [selectedId, setSelectedId] = useState<string | null>(isS2 ? null : dealers[0].id)

  const selectedDealer = dealers.find(d => d.id === selectedId)

  const handleStart = () => {
    // Both paths converge on the same downstream flow
    setView('sf-interstitial-1')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="S1-1" name="Select Dealership" />
      <ACVHeader onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="max-w-4xl mx-auto w-full px-6 pt-12">
        <h2 className="font-bold text-3xl text-[#0E0E0F]">
          {isS2 ? 'Select a dealership to register' : 'Your affiliated dealership'}
        </h2>
        <p className="text-sm text-[#55575C] mt-2 mb-8">
          We found the following dealership account{isS2 ? 's' : ''} associated with your AuctionAccess ID.
          {isS2 ? ' All are not yet registered with ACV. Select one to begin registration.' : ' Select it to begin registration.'}
        </p>

        {/* S1 — single dealer, direct action */}
        {!isS2 && (
          <div className="bg-white rounded-xl border border-[#E8E9EB] p-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-base text-[#0E0E0F]">{dealers[0].name}</span>
                <span className="bg-[#EBF5FF] text-[#0061A5] text-xs rounded px-2 py-0.5">Not started</span>
              </div>
              <span className="text-sm text-[#55575C]">{dealers[0].location}</span>
            </div>
            <button
              onClick={handleStart}
              className="text-sm font-semibold text-[#004E7D] cursor-pointer hover:underline"
            >
              Start Registration →
            </button>
          </div>
        )}

        {/* S2 — four dealers, radio select */}
        {isS2 && (
          <>
            <div className="space-y-3 mb-8">
              {dealers.map(d => {
                const selected = selectedId === d.id
                return (
                  <label
                    key={d.id}
                    className={`flex items-center gap-5 border-2 rounded-xl p-5 cursor-pointer transition-all
                      ${selected ? 'border-[#0077D8] bg-[#F0F8FF]' : 'border-[#E8E9EB] bg-white hover:border-[#D1D3D6]'}`}
                  >
                    <input
                      type="radio"
                      name="dealership"
                      value={d.id}
                      checked={selected}
                      onChange={() => setSelectedId(d.id)}
                      className="w-4 h-4 accent-[#0077D8] cursor-pointer shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-semibold text-base text-[#0E0E0F]">{d.name}</span>
                        <span className="bg-[#EBF5FF] text-[#0061A5] text-xs rounded px-2 py-0.5">Not started</span>
                      </div>
                      <div className="flex gap-6 text-xs text-[#55575C]">
                        <span>📍 {d.location}</span>
                        <span>📞 {d.phone}</span>
                      </div>
                    </div>
                    {selected && (
                      <span className="text-xs font-semibold text-[#0077D8] shrink-0">✓ Selected</span>
                    )}
                  </label>
                )
              })}
            </div>

            {selectedDealer && (
              <div className="bg-[#F0F8FF] border border-[#BFD9F7] rounded-xl p-4 mb-6 text-sm text-[#004E7D]">
                Registering: <strong>{selectedDealer.name}</strong> — {selectedDealer.address}
              </div>
            )}

            <div className="flex justify-end">
              <PrimaryButton disabled={!selectedId} onClick={handleStart}>
                Start Registration →
              </PrimaryButton>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
