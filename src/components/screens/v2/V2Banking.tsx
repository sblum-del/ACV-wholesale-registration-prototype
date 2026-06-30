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
  docSignStatus?: DocSignStatus
  isLoggedIn?: boolean
  onLogout?: () => void
}

const ACCOUNTS = [
  { id: 'ba-1', bank: 'Bank of America', type: 'Checking', last4: '5678', routing: '021000021' },
]

export function V2Banking({ setView, activeScenario, setPrimaryBankSelected, docSignStatus, isLoggedIn, onLogout }: Props) {
  const combineLpoaAndTax = activeScenario === 'v2-base'
  const showTaxResale = activeScenario !== 'v2-5pct'
  const [primaryId, setPrimaryId] = useState<string | null>(null)

  const handleContinue = () => {
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
          <p className="text-sm text-[#55575C] mb-6">
            We found the following account on file with AuctionAccess for your dealership. Select it as your primary payout account, or add a different account below.
          </p>

          <div className="space-y-3 mb-6">
            {ACCOUNTS.map(acct => {
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
            <PrimaryButton disabled={primaryId === null} onClick={handleContinue}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
