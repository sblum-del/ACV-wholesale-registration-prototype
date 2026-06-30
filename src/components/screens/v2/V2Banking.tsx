import { useState } from 'react'
import type { View, DocSignStatus, ActiveScenario } from '../../../types'
import { ACVHeader } from '../../shared/ACVHeader'
import { StepSidebar } from '../../shared/StepSidebar'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  activeScenario: ActiveScenario
  setPrimaryBankSelected: (b: boolean) => void
  setSelectedBankInfo: (info: { bank: string; type: string; last4: string; method: 'aa' | 'ach' }) => void
  docSignStatus?: DocSignStatus
  isLoggedIn?: boolean
  onLogout?: () => void
}

interface Account {
  id: string
  bank: string
  type: string
  last4: string
  routing: string
  status: 'open' | 'closed'
}

const SCENARIO_ACCOUNTS: Partial<Record<ActiveScenario, Account[]>> = {
  'v2-banking-many': [
    { id: 'ba-1', bank: 'Bank of America', type: 'Checking', last4: '5678', routing: '021000021', status: 'open' },
    { id: 'ba-2', bank: 'Chase Bank', type: 'Checking', last4: '4821', routing: '021000089', status: 'open' },
    { id: 'ba-3', bank: 'Regions Bank', type: 'Savings', last4: '3344', routing: '063100277', status: 'open' },
  ],
  'v2-banking-mixed': [
    { id: 'ba-1', bank: 'Bank of America', type: 'Checking', last4: '5678', routing: '021000021', status: 'open' },
    { id: 'ba-2', bank: 'Chase Bank', type: 'Checking', last4: '4821', routing: '021000089', status: 'open' },
    { id: 'ba-3', bank: 'Regions Bank', type: 'Savings', last4: '3344', routing: '063100277', status: 'closed' },
  ],
  'v2-banking-single-closed': [
    { id: 'ba-1', bank: 'Bank of America', type: 'Checking', last4: '5678', routing: '021000021', status: 'closed' },
  ],
}

const DEFAULT_ACCOUNTS: Account[] = [
  { id: 'ba-1', bank: 'Bank of America', type: 'Checking', last4: '5678', routing: '021000021', status: 'open' },
]

export function V2Banking({ setView, activeScenario, setPrimaryBankSelected, setSelectedBankInfo, docSignStatus, isLoggedIn, onLogout }: Props) {
  const [primaryId, setPrimaryId] = useState<string | null>(null)

  const accounts = SCENARIO_ACCOUNTS[activeScenario] ?? DEFAULT_ACCOUNTS
  const hasSelectableAccount = accounts.some(a => a.status === 'open')
  const allClosed = accounts.every(a => a.status === 'closed')

  const combineLpoaAndTax = activeScenario !== 'v2-15pct' && activeScenario !== 'v2-5pct'
  const showTaxResale = activeScenario !== 'v2-5pct'

  const handleContinue = () => {
    const acct = accounts.find(a => a.id === primaryId)
    if (acct) setSelectedBankInfo({ bank: acct.bank, type: acct.type, last4: acct.last4, method: 'aa' })
    setPrimaryBankSelected(true)
    setView('sf-interstitial-3')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-5" name="Bank Account" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar activeStep={2} docSignStatus={docSignStatus} showTimeEstimate={false} lpoaFullName={true} combineLpoaAndTax={combineLpoaAndTax} showTaxResale={showTaxResale} />

        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Bank Account</h2>

          {allClosed ? (
            <>
              <p className="text-sm text-[#55575C] mb-4">
                We found the following account on file with AuctionAccess for your dealership.
              </p>

              {/* Single closed account notice */}
              <div className="border-2 border-[#E53E3E] bg-[#FFF5F5] rounded-xl p-5 mb-5 flex items-start gap-3">
                <span className="text-[#E53E3E] text-lg shrink-0 mt-0.5">⚠</span>
                <div>
                  <p className="font-semibold text-sm text-[#C53030]">Account on file could not be verified</p>
                  <p className="text-sm text-[#C53030] mt-0.5 leading-relaxed">
                    The account below appears to be closed and cannot be used. Please add a bank account via ACH to continue.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {accounts.map(acct => (
                  <div key={acct.id} className="border-2 border-[#E8E9EB] bg-[#F7F7F8] rounded-xl p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full border-2 border-[#D1D3D6] bg-[#E8E9EB] shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-[#8D9199]">{acct.bank}</p>
                        <p className="text-xs text-[#8D9199] mt-0.5">
                          {acct.type} — ****{acct.last4}
                          <span className="ml-4">Routing: {acct.routing}</span>
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-[#C53030] bg-[#FFF5F5] border border-[#FEB2B2] rounded px-2.5 py-1 shrink-0">
                        Account closed
                      </span>
                    </div>
                    <p className="text-xs text-[#8D9199] mt-3 ml-8 leading-relaxed">
                      This account could not be verified as active and is not available for selection.
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setView('v2-ach-form')}
                className="w-full border-2 border-[#0077D8] rounded-xl p-4 flex items-center justify-center gap-3 text-[#0077D8] text-sm font-semibold cursor-pointer hover:bg-[#EFF6FF] transition-colors"
              >
                <span className="text-lg">+</span> Add a bank account via ACH to continue
              </button>

              <div className="flex justify-end gap-6 items-center mt-8">
                <button onClick={() => setView('sf-interstitial-2')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
                  Back
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-[#55575C] mb-6">
                We found the following account{accounts.length > 1 ? 's' : ''} on file with AuctionAccess for your dealership. Select one as your primary payout account, or add a different account below.
              </p>

              <div className="space-y-3 mb-6">
                {accounts.map(acct => {
                  if (acct.status === 'closed') {
                    return (
                      <div key={acct.id} className="border-2 border-[#E8E9EB] bg-[#F7F7F8] rounded-xl p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-4 h-4 rounded-full border-2 border-[#D1D3D6] bg-[#E8E9EB] shrink-0" />
                          <div className="flex-1">
                            <p className="font-semibold text-sm text-[#8D9199]">{acct.bank}</p>
                            <p className="text-xs text-[#8D9199] mt-0.5">
                              {acct.type} — ****{acct.last4}
                              <span className="ml-4">Routing: {acct.routing}</span>
                            </p>
                          </div>
                          <span className="text-xs font-semibold text-[#C53030] bg-[#FFF5F5] border border-[#FEB2B2] rounded px-2.5 py-1 shrink-0">
                            Account closed
                          </span>
                        </div>
                        <p className="text-xs text-[#8D9199] mt-3 ml-8 leading-relaxed">
                          This account could not be verified as active and is not available for selection.
                        </p>
                      </div>
                    )
                  }

                  const isPrimary = primaryId === acct.id
                  return (
                    <label
                      key={acct.id}
                      className={`flex items-center gap-4 border-2 rounded-xl p-4 cursor-pointer transition-all
                        ${isPrimary ? 'border-[#0077D8] bg-[#F0F8FF]' : 'border-[#E8E9EB] bg-white hover:border-[#D1D3D6]'}`}
                    >
                      <input
                        type="radio"
                        name="bank-primary"
                        checked={isPrimary}
                        onChange={() => setPrimaryId(acct.id)}
                        className="w-4 h-4 accent-[#0077D8] cursor-pointer shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-[#0E0E0F]">{acct.bank}</p>
                        <p className="text-xs text-[#55575C] mt-0.5">
                          {acct.type} — ****{acct.last4}
                          <span className="ml-4">Routing: {acct.routing}</span>
                        </p>
                      </div>
                      {isPrimary && (
                        <span className="text-xs font-semibold text-[#0077D8] shrink-0">✓ Primary</span>
                      )}
                    </label>
                  )
                })}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-[#E8E9EB]" />
                <span className="text-xs text-[#8D9199]">Or</span>
                <div className="flex-1 h-px bg-[#E8E9EB]" />
              </div>

              <button
                onClick={() => setView('v2-ach-form')}
                className="w-full border border-dashed border-[#0077D8] rounded-xl p-4 flex items-center justify-center gap-3 text-[#0077D8] text-sm font-semibold cursor-pointer hover:bg-[#EFF6FF] transition-colors"
              >
                <span className="text-lg">+</span> Add a different bank account via ACH
              </button>

              <div className="flex justify-end gap-6 items-center mt-8">
                <button onClick={() => setView('sf-interstitial-2')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
                  Back
                </button>
                <PrimaryButton disabled={primaryId === null || !hasSelectableAccount} onClick={handleContinue}>
                  Continue
                </PrimaryButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
