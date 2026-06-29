import { useState } from 'react'
import type { View } from '../../../types'
import { ACVHeader } from '../../shared/ACVHeader'
import { StepSidebar } from '../../shared/StepSidebar'
import { MaterialField } from '../../shared/MaterialField'
import { ChipToggle } from '../../shared/ChipToggle'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  mobileNumber: string
  setMobileNumber: (s: string) => void
  dealerGroup: 'yes' | 'no' | null
  setDealerGroup: (v: 'yes' | 'no' | null) => void
  dealerType: string
  setDealerType: (s: string) => void
  dealerGroupName: string
  setDealerGroupName: (s: string) => void
  isLoggedIn: boolean
  onLogout: () => void
}

const PRODUCTS = ['Buy', 'Sell', 'Capital']
const PRODUCT_DESC: Record<string, string> = {
  Buy: 'Purchase wholesale vehicles from dealers nationwide',
  Sell: 'List and sell vehicles to a network of verified dealers',
  Capital: 'Access financing and capital solutions for your inventory',
}

const fields = [
  { label: 'Contact Name', value: 'James Harlow' },
  { label: 'Dealership', value: 'METRO FORD OF ALBANY' },
  { label: 'Email', value: 'jharlow@metrofordalbany.com' },
  { label: 'Office Phone', value: '(518) 555-0192 ext. 101' },
  { label: 'Business Address', value: '1450 Central Ave, Albany, ID 83705' },
]

export function V2DealershipInfo({ setView, mobileNumber, setMobileNumber, dealerGroup, setDealerGroup, dealerType, setDealerType, dealerGroupName, setDealerGroupName, isLoggedIn, onLogout }: Props) {
  const [smsOptIn, setSmsOptIn] = useState(false)

  const [primaryContact, setPrimaryContact] = useState<'yes' | 'no' | null>(null)
  const [primaryContactName, setPrimaryContactName] = useState('')
  const [primaryContactPhone, setPrimaryContactPhone] = useState('')
  const [primaryContactEmail, setPrimaryContactEmail] = useState('')

  const [billingContact, setBillingContact] = useState<'yes' | 'no' | null>(null)
  const [billingContactName, setBillingContactName] = useState('')
  const [billingContactPhone, setBillingContactPhone] = useState('')
  const [billingContactEmail, setBillingContactEmail] = useState('')

  const [products, setProducts] = useState<string[]>([])
  const toggleProduct = (p: string) =>
    setProducts(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  const primaryContactDetailsValid =
    primaryContact === 'no'
      ? primaryContactName.trim().length > 0 && primaryContactPhone.trim().length > 0 && primaryContactEmail.trim().includes('@')
      : true

  const billingContactDetailsValid =
    billingContact === 'no'
      ? billingContactName.trim().length > 0 && billingContactPhone.trim().length > 0 && billingContactEmail.trim().includes('@')
      : true

  const canContinue =
    mobileNumber.length > 0 &&
    dealerType !== '' &&
    dealerGroup !== null &&
    (dealerGroup === 'no' || dealerGroupName.trim().length > 0) &&
    primaryContact !== null &&
    primaryContactDetailsValid &&
    billingContact !== null &&
    billingContactDetailsValid

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-3" name="Dealership Information" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar activeStep={0} showTaxResale={true} showTimeEstimate={false} lpoaFullName={true} />
        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Dealership Information</h2>
          <p className="text-sm text-[#55575C] mb-4">Account Info Auto-filled from AuctionAccess</p>

          <div className="bg-[#F7F7F8] border-2 border-[#E8E9EB] rounded-xl p-6 mb-6">
            <div className="grid grid-cols-3 gap-x-6 gap-y-5">
              {fields.map(f => (
                <div key={f.label}>
                  <p className="text-xs text-[#55575C] mb-1">{f.label}</p>
                  <p className="text-sm text-[#0E0E0F]">{f.value}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-[#55575C] mb-4">Please complete the fields below</p>

          {/* Mobile number */}
          <div>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-sm text-[#0E0E0F]">Mobile Number</span>
              <span className="text-[#E53E3E] text-sm">*</span>
            </div>
            <MaterialField label="Your Mobile Number" value={mobileNumber} onChange={setMobileNumber} />
          </div>

          {mobileNumber.length > 0 && (
            <div className="mt-3 bg-[#EFF6FF] border border-[#BFD9F7] rounded-lg p-3 flex items-start gap-3">
              <input
                type="checkbox"
                id="sms-opt"
                checked={smsOptIn}
                onChange={e => setSmsOptIn(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#0077D8] cursor-pointer shrink-0"
              />
              <label htmlFor="sms-opt" className="text-sm text-[#004E7D] cursor-pointer leading-relaxed">
                📱 Get instant SMS alerts for new stock, winning bids, and exclusive dealer deals!
              </label>
            </div>
          )}

          {/* Dealer Type */}
          <div className="mt-6">
            <div className="flex items-center gap-1 mb-2">
              <p className="text-sm text-[#0E0E0F]">Dealer Type</p>
              <span className="text-[#E53E3E] text-sm">*</span>
            </div>
            <select
              value={dealerType}
              onChange={e => setDealerType(e.target.value)}
              className="w-full border border-[#D1D3D6] rounded-lg px-3 py-2.5 text-sm text-[#0E0E0F] bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8] cursor-pointer"
            >
              <option value="">Select dealer type...</option>
              <option>Independent</option>
              <option>Wholesaler</option>
              <option>Franchise</option>
            </select>
          </div>

          {/* Dealer Group */}
          <div className="mt-6">
            <div className="flex items-center gap-1 mb-3">
              <p className="text-sm text-[#0E0E0F]">Is this rooftop part of a Dealer Group?</p>
              <span className="text-[#E53E3E] text-sm">*</span>
            </div>
            <div className="flex gap-4">
              <ChipToggle label="Yes" selected={dealerGroup === 'yes'} onToggle={() => setDealerGroup('yes')} />
              <ChipToggle label="No" selected={dealerGroup === 'no'} onToggle={() => { setDealerGroup('no'); setDealerGroupName('') }} />
            </div>
            {dealerGroup === 'yes' && (
              <div className="mt-4">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-sm text-[#0E0E0F]">Dealer Group Name</span>
                  <span className="text-[#E53E3E] text-sm">*</span>
                </div>
                <input
                  type="text"
                  value={dealerGroupName}
                  onChange={e => setDealerGroupName(e.target.value)}
                  placeholder="e.g. Group One Automotive"
                  className="w-full border border-[#D1D3D6] rounded-lg px-3 py-2.5 text-sm text-[#0E0E0F] bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8] mt-1"
                />
              </div>
            )}
          </div>

          {/* ── Contact & Billing Questions ── */}
          <div className="mt-8 pt-8 border-t border-[#E8E9EB] space-y-6">

            {/* Primary Contact */}
            <div>
              <p className="text-sm font-medium text-[#0E0E0F] mb-2">
                Are you the Primary Contact? <span className="text-[#E53E3E]">*</span>
              </p>
              <div className="flex gap-3">
                <ChipToggle label="Yes" selected={primaryContact === 'yes'} onToggle={() => setPrimaryContact('yes')} />
                <ChipToggle label="No" selected={primaryContact === 'no'} onToggle={() => setPrimaryContact('no')} />
              </div>
              {primaryContact === 'no' && (
                <div className="mt-4 space-y-4 bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-5">
                  <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide">Primary Contact Details</p>
                  <MaterialField label="Primary Contact Name" value={primaryContactName} onChange={setPrimaryContactName} />
                  <MaterialField label="Primary Contact Phone" value={primaryContactPhone} onChange={setPrimaryContactPhone} />
                  <MaterialField label="Primary Contact Email" value={primaryContactEmail} onChange={setPrimaryContactEmail} />
                </div>
              )}
            </div>

            {/* Billing Contact */}
            <div>
              <p className="text-sm font-medium text-[#0E0E0F] mb-2">
                Is the Primary Contact also the Billing Contact? <span className="text-[#E53E3E]">*</span>
              </p>
              <div className="flex gap-3">
                <ChipToggle label="Yes" selected={billingContact === 'yes'} onToggle={() => setBillingContact('yes')} />
                <ChipToggle label="No" selected={billingContact === 'no'} onToggle={() => setBillingContact('no')} />
              </div>
              {billingContact === 'no' && (
                <div className="mt-4 space-y-4 bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-5">
                  <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide">Billing Contact Details</p>
                  <MaterialField label="Billing Contact Name" value={billingContactName} onChange={setBillingContactName} />
                  <MaterialField label="Billing Contact Phone" value={billingContactPhone} onChange={setBillingContactPhone} />
                  <MaterialField label="Billing Contact Email" value={billingContactEmail} onChange={setBillingContactEmail} />
                </div>
              )}
            </div>

            {/* Products */}
            <div>
              <p className="text-sm font-medium text-[#0E0E0F] mb-1">Which ACV products are you interested in?</p>
              <p className="text-xs text-[#8D9199] mb-3">Select all that apply (optional)</p>
              <div className="space-y-2">
                {PRODUCTS.map(p => {
                  const selected = products.includes(p)
                  return (
                    <label
                      key={p}
                      className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-all
                        ${selected ? 'border-[#F26522] bg-[#FFF3ED]' : 'border-[#E8E9EB] bg-white hover:border-[#D1D3D6]'}`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => toggleProduct(p)}
                        className="w-4 h-4 accent-[#F26522] cursor-pointer shrink-0"
                      />
                      <div className="flex-1">
                        <span className={`text-sm font-semibold ${selected ? 'text-[#F26522]' : 'text-[#0E0E0F]'}`}>{p}</span>
                        <span className="text-xs text-[#55575C] ml-2">{PRODUCT_DESC[p]}</span>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-6 items-center mt-8">
            <button onClick={() => setView('v2-select-dealership')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton disabled={!canContinue} onClick={() => setView('v2-sf-interstitial-dealership')}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
