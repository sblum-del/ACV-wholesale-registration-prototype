import { useState, useEffect } from 'react'
import type { View, DocSignStatus } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { StepSidebar } from '../shared/StepSidebar'
import { ChipToggle } from '../shared/ChipToggle'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  setAchVerified: (b: boolean) => void
  docSignStatus?: DocSignStatus
  isLoggedIn?: boolean
  onLogout?: () => void
}

const PRODUCTS = ['Buy', 'Sell', 'Capital']
const PRODUCT_DESC: Record<string, string> = {
  Buy: 'Purchase wholesale vehicles from dealers nationwide',
  Sell: 'List and sell vehicles to a network of verified dealers',
  Capital: 'Access financing and capital solutions for your inventory',
}

export function ACHProcessing({ setView, setAchVerified, docSignStatus, isLoggedIn, onLogout }: Props) {
  const [elapsed, setElapsed] = useState(0)
  const [done, setDone] = useState(false)

  // Simulate JPMorgan validation taking ~8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(prev => {
        if (prev >= 8) {
          clearInterval(interval)
          setDone(true)
          return 8
        }
        return prev + 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Qualifying questions state
  const [primaryContact, setPrimaryContact] = useState<'yes' | 'no' | null>(null)
  const [billingContact, setBillingContact] = useState<'yes' | 'no' | null>(null)
  const [hearAbout, setHearAbout] = useState('')
  const [products, setProducts] = useState<string[]>([])
  const toggleProduct = (p: string) =>
    setProducts(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])

  const questionsComplete = !!primaryContact && !!billingContact

  const progress = Math.min((elapsed / 8) * 100, 100)

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="REG-5" name="ACH Processing — Validation in Progress" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar activeStep={2} docSignStatus={docSignStatus} />

        <div className="flex-1 max-w-2xl ml-20 space-y-6">

          {/* Validation status card */}
          <div className={`rounded-2xl border-2 p-6 transition-all ${done ? 'border-[#00A576] bg-[#ECFDF5]' : 'border-[#0077D8] bg-[#EFF6FF]'}`}>
            <div className="flex items-start gap-4">
              {!done ? (
                <div className="w-10 h-10 border-4 border-[#0077D8] border-t-transparent rounded-full animate-spin shrink-0 mt-0.5" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#00A576] flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
              )}
              <div className="flex-1">
                <p className={`font-bold text-base mb-1 ${done ? 'text-[#065F46]' : 'text-[#004E7D]'}`}>
                  {done ? 'ACH submission received' : 'Validating your ACH account...'}
                </p>
                <p className={`text-sm leading-relaxed ${done ? 'text-[#065F46]' : 'text-[#004E7D]'}`}>
                  {done
                    ? 'Your ACH details have been submitted. JPMorgan validation results will be available shortly. In the meantime, please complete the questions on the right.'
                    : 'We\'ve submitted your account details to NetSuite and initiated JPMorgan validation. This typically takes a moment — please complete the questions below while you wait.'}
                </p>

                {/* Progress bar */}
                {!done && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-[#0077D8] mb-1">
                      <span>JPMorgan validation in progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-[#BFD9F7] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0077D8] rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {done && (
                  <div className="mt-3 space-y-1.5 text-xs text-[#065F46]">
                    <div className="flex items-center gap-2">
                      <span>✦</span>
                      <span>NetSuite bank account record created for Metro Ford of Albany</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✦</span>
                      <span>JPMorgan validation initiated — results processing</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Qualifying questions — fill out while waiting */}
          <div className="bg-white rounded-2xl border border-[#E8E9EB] p-6">
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-1">In the meantime — a few quick questions</h3>
            <p className="text-sm text-[#55575C] mb-6">
              Help us tailor your ACV experience while your account validates.
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-medium text-[#0E0E0F] mb-2">
                  Are you the Primary Contact? <span className="text-[#E53E3E]">*</span>
                </p>
                <div className="flex gap-3">
                  <ChipToggle label="Yes" selected={primaryContact === 'yes'} onToggle={() => setPrimaryContact('yes')} />
                  <ChipToggle label="No" selected={primaryContact === 'no'} onToggle={() => setPrimaryContact('no')} />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-[#0E0E0F] mb-2">
                  Is Primary Contact same as Billing Contact? <span className="text-[#E53E3E]">*</span>
                </p>
                <div className="flex gap-3">
                  <ChipToggle label="Yes" selected={billingContact === 'yes'} onToggle={() => setBillingContact('yes')} />
                  <ChipToggle label="No" selected={billingContact === 'no'} onToggle={() => setBillingContact('no')} />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-[#0E0E0F] mb-2">How did you hear about ACV?</p>
                <select
                  value={hearAbout}
                  onChange={e => setHearAbout(e.target.value)}
                  className="w-full border border-[#D1D3D6] rounded-lg px-3 py-2.5 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8] cursor-pointer"
                >
                  <option value="">Select... (optional)</option>
                  <option>Sales Rep</option>
                  <option>Online Search</option>
                  <option>Trade Show</option>
                  <option>Word of Mouth</option>
                  <option>Other</option>
                </select>
              </div>

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
          </div>

          {/* See results button — only enabled once validation is done AND required questions answered */}
          <div className="flex justify-end gap-4">
            {!done && (
              <p className="text-xs text-[#8D9199] self-center">Waiting for JPMorgan validation results...</p>
            )}
            <PrimaryButton
              disabled={!done || !questionsComplete}
              onClick={() => {
                // For prototype: randomly verified or rejected (70/30 split)
                // In demo we'll simulate verified — stakeholder can see rejection by refreshing
                setAchVerified(true)
                setView('ach-result')
              }}
            >
              {done ? 'See Validation Results →' : 'Validating...'}
            </PrimaryButton>
          </div>
          {done && !questionsComplete && (
            <p className="text-xs text-center text-[#8D9199] -mt-2">
              Please answer the required contact questions above to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
