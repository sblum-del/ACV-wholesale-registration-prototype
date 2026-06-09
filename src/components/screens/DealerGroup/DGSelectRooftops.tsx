import type { View } from '../../../types'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  dgSituation: 'net-new' | 'existing' | null
  selectedRooftops: string[]
  setSelectedRooftops: (ids: string[]) => void
}

export const ALL_ROOFTOPS = [
  { id: 'rt-01', name: 'Group One BMW of Albany',       city: 'Albany, NY',         brand: 'BMW' },
  { id: 'rt-02', name: 'Group One Toyota of Troy',      city: 'Troy, NY',           brand: 'Toyota' },
  { id: 'rt-03', name: 'Group One Honda of Buffalo',    city: 'Buffalo, NY',        brand: 'Honda' },
  { id: 'rt-04', name: 'Group One Ford of Rochester',   city: 'Rochester, NY',      brand: 'Ford' },
  { id: 'rt-05', name: 'Group One Chevrolet of Syracuse', city: 'Syracuse, NY',     brand: 'Chevrolet' },
  { id: 'rt-06', name: 'Group One Hyundai of Utica',    city: 'Utica, NY',          brand: 'Hyundai' },
  { id: 'rt-07', name: 'Group One Nissan of Saratoga',  city: 'Saratoga Springs, NY', brand: 'Nissan' },
  { id: 'rt-08', name: 'Group One Subaru of Kingston',  city: 'Kingston, NY',       brand: 'Subaru' },
  { id: 'rt-09', name: 'Group One Kia of Binghamton',   city: 'Binghamton, NY',     brand: 'Kia' },
  { id: 'rt-10', name: 'Group One Volkswagen of Ithaca', city: 'Ithaca, NY',        brand: 'Volkswagen' },
  { id: 'rt-11', name: 'Group One Mazda of Poughkeepsie', city: 'Poughkeepsie, NY', brand: 'Mazda' },
  { id: 'rt-12', name: 'Group One Audi of White Plains', city: 'White Plains, NY',  brand: 'Audi' },
  { id: 'rt-13', name: 'Group One Mercedes of Yonkers', city: 'Yonkers, NY',        brand: 'Mercedes-Benz' },
  { id: 'rt-14', name: 'Group One Jeep of Newburgh',    city: 'Newburgh, NY',       brand: 'Jeep' },
  { id: 'rt-15', name: 'Group One Lexus of Schenectady', city: 'Schenectady, NY',   brand: 'Lexus' },
  { id: 'rt-16', name: 'Group One GMC of Plattsburgh',  city: 'Plattsburgh, NY',    brand: 'GMC' },
  { id: 'rt-17', name: 'Group One Chrysler of Glens Falls', city: 'Glens Falls, NY', brand: 'Chrysler' },
]

// Already registered in the "existing" scenario
const ALREADY_REGISTERED = ['rt-01', 'rt-02', 'rt-03', 'rt-04']

const BRAND_COLORS: Record<string, string> = {
  BMW: 'bg-[#EFF6FF] text-[#1D4ED8]',
  Toyota: 'bg-[#FFF0F0] text-[#DC2626]',
  Honda: 'bg-[#FFF3ED] text-[#EA580C]',
  Ford: 'bg-[#EFF6FF] text-[#2563EB]',
  Chevrolet: 'bg-[#FEFCE8] text-[#CA8A04]',
  Hyundai: 'bg-[#EFF6FF] text-[#2563EB]',
  Nissan: 'bg-[#F0FDF4] text-[#16A34A]',
  Subaru: 'bg-[#FFF0F0] text-[#DC2626]',
  Kia: 'bg-[#F0FDF4] text-[#16A34A]',
  Volkswagen: 'bg-[#EFF6FF] text-[#2563EB]',
  Mazda: 'bg-[#FFF0F0] text-[#DC2626]',
  Audi: 'bg-[#F0FDF4] text-[#16A34A]',
  'Mercedes-Benz': 'bg-[#F7F7F8] text-[#374151]',
  Jeep: 'bg-[#FFF0F0] text-[#DC2626]',
  Lexus: 'bg-[#F7F7F8] text-[#374151]',
  GMC: 'bg-[#FFF3ED] text-[#EA580C]',
  Chrysler: 'bg-[#EFF6FF] text-[#2563EB]',
}

export function DGSelectRooftops({ setView, dgSituation, selectedRooftops, setSelectedRooftops }: Props) {
  const isExisting = dgSituation === 'existing'
  const availableRooftops = isExisting
    ? ALL_ROOFTOPS.filter(r => !ALREADY_REGISTERED.includes(r.id))
    : ALL_ROOFTOPS
  const registeredRooftops = isExisting
    ? ALL_ROOFTOPS.filter(r => ALREADY_REGISTERED.includes(r.id))
    : []

  const toggle = (id: string) => {
    setSelectedRooftops(
      selectedRooftops.includes(id)
        ? selectedRooftops.filter(r => r !== id)
        : [...selectedRooftops, id]
    )
  }

  const allSelected = selectedRooftops.length === availableRooftops.length
  const toggleAll = () => {
    if (allSelected) setSelectedRooftops([])
    else setSelectedRooftops(availableRooftops.map(r => r.id))
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="DG-7" name="Dealer Group — Select Rooftops" />
      {/* Header */}
      <div className="bg-white border-b border-[#E8E9EB] h-20 flex items-center justify-between px-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl text-[#F26522]">ACV</span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
          </div>
          <span className="bg-[#0C2340] text-white text-[10px] font-semibold rounded px-2 py-1 uppercase tracking-wide">
            Dealer Group — Group One Automotive
          </span>
        </div>
        <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">
          ← Lobby
        </button>
      </div>

      {/* NOT CUSTOMER FACING banner */}
      <div className="bg-[#FFF0F0] border-b border-[#FCA5A5] px-10 py-2 flex items-center gap-2">
        <span className="text-red-600 font-bold text-xs uppercase tracking-wide">⚠️ NOT CUSTOMER FACING</span>
        <span className="text-red-600 text-xs">— Internal stakeholder testing only.</span>
      </div>

      <div className="max-w-4xl mx-auto w-full px-6 py-8">
        <div className="mb-6">
          <h2 className="font-bold text-3xl text-[#0E0E0F]">Select rooftops to register</h2>
          <p className="text-[#55575C] text-sm mt-2">
            {isExisting
              ? 'The following rooftops are not yet registered with ACV. Select those you would like to register now.'
              : 'All Group One Automotive rooftops are available for registration. Select the locations you would like to register.'}
          </p>
        </div>

        {/* Already registered (existing scenario only) */}
        {isExisting && registeredRooftops.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-3">
              Already Registered with ACV ({registeredRooftops.length})
            </p>
            <div className="space-y-2">
              {registeredRooftops.map(r => (
                <div key={r.id} className="bg-white border border-[#E8E9EB] rounded-xl px-5 py-3 flex items-center gap-4 opacity-60">
                  <span className="text-[#00A576] shrink-0">✓</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-[#0E0E0F]">{r.name}</p>
                    <p className="text-xs text-[#55575C]">{r.city}</p>
                  </div>
                  <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 shrink-0 ${BRAND_COLORS[r.brand] ?? 'bg-[#F3F4F6] text-[#374151]'}`}>{r.brand}</span>
                  <span className="bg-[#ECFDF5] text-[#00A576] text-[10px] font-semibold rounded-full px-2 py-0.5 shrink-0">Registered</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Select all toggle */}
        <div className="bg-white border border-[#E8E9EB] rounded-xl px-5 py-3 mb-3 flex items-center justify-between">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={allSelected} onChange={toggleAll} className="w-4 h-4 accent-[#0C2340] cursor-pointer" />
            <span className="text-sm font-semibold text-[#0E0E0F]">Select all available rooftops</span>
          </label>
          <span className="text-xs text-[#55575C]">{selectedRooftops.length} of {availableRooftops.length} selected</span>
        </div>

        {/* Available rooftops — single column, scrollable */}
        <div className="space-y-2 mb-8">
          {availableRooftops.map(r => {
            const selected = selectedRooftops.includes(r.id)
            return (
              <label
                key={r.id}
                className={`flex items-center gap-4 bg-white rounded-xl border-2 px-5 py-3 cursor-pointer transition-all
                  ${selected ? 'border-[#0C2340] bg-[#F0F4FF]' : 'border-[#E8E9EB] hover:border-[#D1D3D6]'}`}
              >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => toggle(r.id)}
                    className="w-4 h-4 accent-[#0C2340] cursor-pointer shrink-0"
                  />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0E0E0F]">{r.name}</p>
                  <p className="text-xs text-[#55575C]">{r.city}</p>
                </div>
                <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 shrink-0 ${BRAND_COLORS[r.brand] ?? 'bg-[#F3F4F6] text-[#374151]'}`}>
                  {r.brand}
                </span>
                {selected && (
                  <div className="w-5 h-5 rounded-full bg-[#0C2340] flex items-center justify-center text-white text-[10px] font-bold shrink-0">✓</div>
                )}
              </label>
            )
          })}
        </div>

        <div className="flex justify-between items-center">
          <button onClick={() => setView('dg-situation')} className="text-sm text-[#004E7D] font-medium cursor-pointer hover:underline">
            ← Back
          </button>
          <PrimaryButton
            disabled={selectedRooftops.length < 1}
            onClick={() => setView('dg-sf-interstitial')}
          >
            Register {selectedRooftops.length > 0 ? `${selectedRooftops.length} Rooftop${selectedRooftops.length > 1 ? 's' : ''}` : 'Selected'} →
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
