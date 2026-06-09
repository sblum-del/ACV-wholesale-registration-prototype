import { useState } from 'react'
import type { View } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { ChipToggle } from '../shared/ChipToggle'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

const PRODUCTS = ['Buy', 'Sell', 'Capital']

const PRODUCT_DESC: Record<string, string> = {
  Buy: 'Purchase wholesale vehicles from dealers nationwide',
  Sell: 'List and sell vehicles to a network of verified dealers',
  Capital: 'Access financing and capital solutions for your inventory',
}

export function QualifyingQuestions({ setView, isLoggedIn, onLogout }: Props) {
  const [primaryContact, setPrimaryContact] = useState<'yes' | 'no' | null>(null)
  const [billingContact, setBillingContact] = useState<'yes' | 'no' | null>(null)
  const [hearAbout, setHearAbout] = useState('')
  const [products, setProducts] = useState<string[]>([])

  const toggleProduct = (p: string) =>
    setProducts(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  // Only the two contact questions are required — products and source are optional
  const canContinue = !!primaryContact && !!billingContact

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="REG-11" name="Qualifying Questions" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-2xl border border-[#E8E9EB] shadow-sm max-w-xl w-full p-10">

          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">A few quick questions</h2>
          <p className="text-sm text-[#55575C] mb-8">
            Help us tailor your ACV experience. This only takes a moment.
          </p>

          <div className="space-y-7">

            {/* Primary Contact */}
            <div>
              <p className="text-sm font-medium text-[#0E0E0F] mb-2">
                Are you the Primary Contact? <span className="text-[#E53E3E]">*</span>
              </p>
              <div className="flex gap-3">
                <ChipToggle label="Yes" selected={primaryContact === 'yes'} onToggle={() => setPrimaryContact('yes')} />
                <ChipToggle label="No" selected={primaryContact === 'no'} onToggle={() => setPrimaryContact('no')} />
              </div>
            </div>

            {/* Billing Contact */}
            <div>
              <p className="text-sm font-medium text-[#0E0E0F] mb-2">
                Is Primary Contact same as Billing Contact? <span className="text-[#E53E3E]">*</span>
              </p>
              <div className="flex gap-3">
                <ChipToggle label="Yes" selected={billingContact === 'yes'} onToggle={() => setBillingContact('yes')} />
                <ChipToggle label="No" selected={billingContact === 'no'} onToggle={() => setBillingContact('no')} />
              </div>
            </div>

            {/* How did you hear */}
            <div>
              <p className="text-sm font-medium text-[#0E0E0F] mb-2">How did you hear about ACV?</p>
              <select
                value={hearAbout}
                onChange={e => setHearAbout(e.target.value)}
                className="w-full border border-[#D1D3D6] rounded-lg px-3 py-2.5 text-sm text-[#0E0E0F] bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8] cursor-pointer"
              >
                <option value="">Select... (optional)</option>
                <option>Sales Rep</option>
                <option>Online Search</option>
                <option>Trade Show</option>
                <option>Word of Mouth</option>
                <option>Other</option>
              </select>
            </div>

            {/* Products multi-picklist */}
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
                      <span className="text-xs text-[#004E7D] hover:underline shrink-0">Learn more →</span>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <PrimaryButton
              disabled={!canContinue}
              onClick={() => setView('schedule-demo')}
              className="px-10"
            >
              Next →
            </PrimaryButton>
          </div>
          {!canContinue && (
            <p className="text-xs text-center text-[#8D9199] mt-3">
              Please answer the contact questions above to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
