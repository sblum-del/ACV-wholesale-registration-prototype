import type { View, Dealership5M } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  selectedDealerships: string[]
  setSelectedDealerships: (ids: string[]) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export const ALL_5MS: Dealership5M[] = [
  {
    id: '5M-001',
    name: 'Metro Ford of Albany',
    location: 'Albany, NY',
    address: '1450 Central Ave, Albany, NY 12205',
    phone: '(518) 555-0192',
    email: 'albany@metroford.com',
    contactName: 'James Harlow',
  },
  {
    id: '5M-002',
    name: 'Metro Ford of Troy',
    location: 'Troy, NY',
    address: '890 Hoosick Rd, Troy, NY 12180',
    phone: '(518) 555-0841',
    email: 'troy@metroford.com',
    contactName: 'James Harlow',
  },
  {
    id: '5M-003',
    name: 'Metro Ford of Schenectady',
    location: 'Schenectady, NY',
    address: '2244 State St, Schenectady, NY 12304',
    phone: '(518) 555-0317',
    email: 'schenectady@metroford.com',
    contactName: 'James Harlow',
  },
  {
    id: '5M-004',
    name: 'Metro Ford of Saratoga',
    location: 'Saratoga Springs, NY',
    address: '3100 Route 50, Saratoga Springs, NY 12866',
    phone: '(518) 555-0523',
    email: 'saratoga@metroford.com',
    contactName: 'James Harlow',
  },
]

export function MultiSelectDealerships({ setView, selectedDealerships, setSelectedDealerships, isLoggedIn, onLogout }: Props) {
  const toggle = (id: string) => {
    if (selectedDealerships.includes(id)) {
      setSelectedDealerships(selectedDealerships.filter(d => d !== id))
    } else {
      setSelectedDealerships([...selectedDealerships, id])
    }
  }

  const allSelected = selectedDealerships.length === ALL_5MS.length
  const toggleAll = () => {
    if (allSelected) setSelectedDealerships([])
    else setSelectedDealerships(ALL_5MS.map(d => d.id))
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="MULTI-2" name="Select Multiple Dealerships" />
      <ACVHeader onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="max-w-3xl mx-auto w-full px-6 py-10">
        <div className="mb-6">
          <h2 className="font-bold text-3xl text-[#0E0E0F]">Select dealerships to register</h2>
          <p className="text-[#55575C] text-sm mt-2">
            Choose which locations you'd like to register. All selected dealerships will be processed simultaneously with dedicated white glove support.
          </p>
        </div>

        {/* Select all */}
        <div className="bg-white border border-[#E8E9EB] rounded-xl px-5 py-3 mb-4 flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              className="w-4 h-4 accent-[#F26522] cursor-pointer"
            />
            <span className="text-sm font-semibold text-[#0E0E0F]">Select all dealerships</span>
          </label>
          <span className="text-xs text-[#55575C]">{selectedDealerships.length} of {ALL_5MS.length} selected</span>
        </div>

        {/* Dealership cards */}
        <div className="space-y-3 mb-8">
          {ALL_5MS.map(d => {
            const selected = selectedDealerships.includes(d.id)
            return (
              <label
                key={d.id}
                className={`block bg-white rounded-xl border-2 px-5 py-4 cursor-pointer transition-all
                  ${selected ? 'border-[#F26522] bg-[#FFF9F6]' : 'border-[#E8E9EB] hover:border-[#D1D3D6]'}`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggle(d.id)}
                    className="mt-0.5 w-4 h-4 accent-[#F26522] cursor-pointer shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-semibold text-base text-[#0E0E0F]">{d.name}</span>
                      <span className="bg-[#EBF5FF] text-[#0061A5] text-xs rounded px-2 py-0.5">Not started</span>
                    </div>
                    <div className="grid grid-cols-3 gap-x-6 gap-y-1 text-xs text-[#55575C]">
                      <span>📍 {d.location}</span>
                      <span>📞 {d.phone}</span>
                      <span>👤 {d.contactName}</span>
                      <span className="col-span-2">{d.address}</span>
                      <span>{d.email}</span>
                    </div>
                  </div>
                  {selected && (
                    <div className="shrink-0 w-6 h-6 rounded-full bg-[#F26522] flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                  )}
                </div>
              </label>
            )
          })}
        </div>

        {/* Notice */}
        {selectedDealerships.length > 1 && (
          <div className="bg-[#EFF6FF] border border-[#BFD9F7] rounded-xl p-4 mb-6 text-sm text-[#004E7D]">
            <p className="font-semibold mb-1">ℹ️ What happens next</p>
            <p>We'll create all Salesforce records for <strong>{selectedDealerships.length} dealerships</strong> simultaneously — Contact, Account, Affiliation, and Application records for each, with <strong>Multi-Dealer = ✓</strong> flagged on every Application. Our team will reach out to coordinate white glove support for your group.</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            onClick={() => setView('multi-or-single')}
            className="text-sm text-[#004E7D] font-medium cursor-pointer hover:underline"
          >
            ← Back
          </button>
          <PrimaryButton
            disabled={selectedDealerships.length < 2}
            onClick={() => setView('sf-interstitial-multi')}
          >
            Register {selectedDealerships.length > 1 ? `${selectedDealerships.length} Dealerships` : 'Selected'} →
          </PrimaryButton>
        </div>
        {selectedDealerships.length < 2 && (
          <p className="text-xs text-center text-[#8D9199] mt-3">Select at least 2 dealerships for multi-dealer registration</p>
        )}
      </div>
    </div>
  )
}
