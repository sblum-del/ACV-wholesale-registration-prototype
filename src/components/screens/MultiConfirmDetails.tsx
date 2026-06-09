import type { View } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ALL_5MS } from './MultiSelectDealerships'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  selectedDealerships: string[]
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function MultiConfirmDetails({ setView, selectedDealerships, isLoggedIn, onLogout }: Props) {
  const dealers = ALL_5MS.filter(d => selectedDealerships.includes(d.id))

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="MULTI-3" name="Confirm Multi-Dealer Details" />
      <ACVHeader onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="max-w-4xl mx-auto w-full px-6 py-10">
        <div className="mb-6">
          <h2 className="font-bold text-3xl text-[#0E0E0F]">Confirm your dealership details</h2>
          <p className="text-[#55575C] text-sm mt-2 max-w-2xl">
            Please review the information below for each dealership. This data has been pulled from AuctionAccess and will be used to create your ACV accounts.
          </p>
        </div>

        <div className="bg-[#EFF6FF] border border-[#BFD9F7] rounded-xl p-4 mb-6 flex items-start gap-3 text-sm text-[#004E7D]">
          <span className="shrink-0 text-base">ℹ️</span>
          <span>All information is auto-filled from AuctionAccess and is <strong>non-editable</strong>. If any details are incorrect, please contact AuctionAccess to update your records before continuing.</span>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-8">
          {dealers.map((d, i) => (
            <div key={d.id} className="bg-white border-2 border-[#E8E9EB] rounded-2xl overflow-hidden">
              {/* Card header */}
              <div className="bg-[#F7F7F8] border-b border-[#E8E9EB] px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F26522] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </div>
                  <span className="font-semibold text-sm text-[#0E0E0F]">{d.name}</span>
                </div>
                <span className="bg-[#ECFDF5] text-[#00A576] text-[10px] font-semibold rounded-full px-2 py-0.5">
                  Auto-filled from AA
                </span>
              </div>

              {/* Card body */}
              <div className="px-5 py-4 grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-[10px] text-[#8D9199] uppercase tracking-wide mb-0.5">Dealership Name</p>
                  <p className="text-sm font-medium text-[#0E0E0F]">{d.name.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#8D9199] uppercase tracking-wide mb-0.5">Primary Contact</p>
                  <p className="text-sm font-medium text-[#0E0E0F]">{d.contactName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#8D9199] uppercase tracking-wide mb-0.5">Business Address</p>
                  <p className="text-sm text-[#0E0E0F]">{d.address}</p>
                </div>
                <div>
                  <p className="text-[10px] text-[#8D9199] uppercase tracking-wide mb-0.5">Office Phone</p>
                  <p className="text-sm text-[#0E0E0F]">{d.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-[#8D9199] uppercase tracking-wide mb-0.5">Email (from AuctionAccess)</p>
                  <p className="text-sm text-[#0E0E0F]">{d.email}</p>
                </div>
              </div>

              {/* SF records created badge */}
              <div className="border-t border-[#E8E9EB] px-5 py-3 bg-[#F7F7F8]">
                <p className="text-[10px] text-[#55575C]">
                  <span className="text-[#00A576] font-semibold">✓</span> Contact · Account · Affiliation · Application created &nbsp;·&nbsp; <span className="text-[#F26522] font-semibold">Multi-Dealer = ✓</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => setView('multi-select-dealerships')}
            className="text-sm text-[#004E7D] font-medium cursor-pointer hover:underline"
          >
            ← Back
          </button>
          <PrimaryButton onClick={() => setView('multi-success')}>
            Confirm & Submit →
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
