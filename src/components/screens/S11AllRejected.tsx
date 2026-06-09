import { useState } from 'react'
import type { View, DocSignStatus } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { StepSidebar } from '../shared/StepSidebar'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  setPreferredFlagCarried: (b: boolean) => void
  docSignStatus?: DocSignStatus
  isLoggedIn?: boolean
  onLogout?: () => void
}

const REJECTED_ACCOUNTS = [
  { id: 'ba-1', bank: 'Bank of America', type: 'Checking', last4: '5678', routing: '021000021' },
  { id: 'ba-2', bank: 'TD Bank', type: 'Checking', last4: '1218', routing: '027677897' },
  { id: 'ba-3', bank: 'Chase Bank', type: 'Savings', last4: '4821', routing: '021000021' },
]

export function S11AllRejected({ setView, setPreferredFlagCarried, docSignStatus, isLoggedIn, onLogout }: Props) {
  const [preferredFlag, setPreferredFlag] = useState(false)

  const handleContinue = () => {
    setPreferredFlagCarried(preferredFlag)
    // Don't force ACH — go to sf-interstitial-3 with banking pending resolution
    setView('sf-interstitial-3')
  }

  const handleFillACH = () => {
    setPreferredFlagCarried(preferredFlag)
    setView('ach-form')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="REG-7" name="All Bank Accounts Rejected" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar activeStep={2} docSignStatus={docSignStatus} bankingPendingResolution={true} />

        <div className="flex-1 max-w-2xl ml-20 space-y-5">

          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Bank Account</h2>
          <p className="text-sm text-[#55575C]">
            We found the following bank accounts linked to your AuctionAccess profile and ran each through JPMorgan validation.
          </p>

          {/* Reassurance note */}
          <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-lg px-4 py-3 text-xs text-[#55575C]">
            This doesn't necessarily mean there's a problem with your accounts — verification occasionally requires additional confirmation.
          </div>

          {/* JPMorgan Unable to Validate header */}
          <div>
            <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-3">
              JPMorgan Unable to Validate
            </p>
            <div className="space-y-3">
              {REJECTED_ACCOUNTS.map(acct => (
                <div key={acct.id} className="border border-[#E8E9EB] bg-[#F9FAFB] rounded-xl p-4 flex items-center gap-4">
                  <input type="checkbox" disabled className="w-4 h-4 cursor-not-allowed shrink-0 opacity-30" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-[#55575C]">{acct.bank}</p>
                    <p className="text-xs text-[#8D9199] mt-0.5">
                      {acct.type} — ****{acct.last4}
                      <span className="ml-4">Routing: {acct.routing}</span>
                    </p>
                  </div>
                  <span className="text-xs text-[#DC2626] font-semibold shrink-0">Not validated</span>
                </div>
              ))}
            </div>
          </div>

          {/* All failed message */}
          <div className="bg-[#FFF0F0] border border-[#FCA5A5] rounded-xl p-5">
            <p className="font-semibold text-sm text-[#991B1B] mb-2">All accounts failed JPMorgan validation</p>
            <p className="text-sm text-[#991B1B] leading-relaxed">
              None of the accounts on file with AuctionAccess could be verified at this time. You can continue registration — an ACV teammate will follow up to resolve your banking before your account is activated.
            </p>
          </div>

          {/* Required flag — must check to proceed */}
          <div className={`rounded-xl border-2 p-4 transition-all ${preferredFlag ? 'bg-[#FFFBEB] border-[#F59600]' : 'bg-[#FFF7ED] border-[#FED7AA]'}`}>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={preferredFlag}
                onChange={e => setPreferredFlag(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-[#F59600] cursor-pointer shrink-0"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-[#0E0E0F]">
                    I understand none of my accounts were verified
                  </p>
                  <span className="text-[#DC2626] text-xs font-semibold">Required</span>
                </div>
                <p className="text-xs text-[#55575C] leading-relaxed">
                  By checking this, your application will be flagged so an ACV teammate can reach out directly to investigate and resolve your bank account verification before activation.
                </p>
                {preferredFlag && (
                  <p className="text-xs text-[#00A576] font-semibold mt-2">
                    ✓ Flag recorded — Banking status set to Pending Resolution
                  </p>
                )}
              </div>
            </label>
          </div>

          {/* Optional ACH */}
          <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-4">
            <p className="text-sm font-medium text-[#0E0E0F] mb-1">Have a different account to try?</p>
            <p className="text-xs text-[#55575C] mb-3">
              Optionally submit an ACH form with an alternative account. JPMorgan validation will run immediately.
            </p>
            <button
              onClick={handleFillACH}
              className="text-sm font-semibold text-[#0077D8] cursor-pointer hover:underline"
            >
              Fill out ACH form (optional) →
            </button>
          </div>

          <div className="flex justify-end">
            <PrimaryButton disabled={!preferredFlag} onClick={handleContinue}>
              Continue Registration →
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
