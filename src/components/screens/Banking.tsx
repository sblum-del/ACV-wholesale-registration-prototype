import { useState } from 'react'
import type { View, DocSignStatus, ActiveScenario } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { StepSidebar } from '../shared/StepSidebar'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  setPrimaryBankSelected: (b: boolean) => void
  docSignStatus?: DocSignStatus
  activeScenario?: ActiveScenario
  isLoggedIn?: boolean
  onLogout?: () => void
}

const S1_ACCOUNTS = [
  { id: 'ba-1', bank: 'Bank of America', type: 'Checking', last4: '5678', routing: '021000021', status: 'verified' },
]

const S3_ACCOUNTS = [
  { id: 'ba-1', bank: 'Bank of America', type: 'Checking', last4: '5678', routing: '021000021', status: 'verified' },
  { id: 'ba-2', bank: 'TD Bank', type: 'Checking', last4: '1218', routing: '027677897', status: 'verified' },
  { id: 'ba-3', bank: 'Chase Bank', type: 'Savings', last4: '4821', routing: '021000021', status: 'verified' },
]

// S6: Mixed — 2 verified, 2 not verified
const S6_ACCOUNTS = [
  { id: 'ba-1', bank: 'Bank of America', type: 'Checking', last4: '5678', routing: '021000021', status: 'verified' },
  { id: 'ba-2', bank: 'Chase Bank', type: 'Checking', last4: '4821', routing: '021000021', status: 'verified' },
  { id: 'ba-3', bank: 'TD Bank', type: 'Checking', last4: '1218', routing: '027677897', status: 'not-verified' },
  { id: 'ba-4', bank: 'Wells Fargo', type: 'Savings', last4: '9034', routing: '121000248', status: 'not-verified' },
]

export function Banking({ setView, setPrimaryBankSelected, docSignStatus, activeScenario, isLoggedIn, onLogout }: Props) {
  const ACCOUNTS =
    activeScenario === 's3' ? S3_ACCOUNTS
    : activeScenario === 's6' ? S6_ACCOUNTS
    : activeScenario === 's10' ? [] // No accounts on file
    : activeScenario === 's11' ? [ // All rejected
        { id: 'ba-1', bank: 'Bank of America', type: 'Checking', last4: '5678', routing: '021000021', status: 'not-verified' },
        { id: 'ba-2', bank: 'TD Bank', type: 'Checking', last4: '1218', routing: '027677897', status: 'not-verified' },
        { id: 'ba-3', bank: 'Chase Bank', type: 'Savings', last4: '4821', routing: '021000021', status: 'not-verified' },
      ]
    : S1_ACCOUNTS
  const verified = ACCOUNTS.filter(a => a.status === 'verified')
  const unverified = ACCOUNTS.filter(a => a.status === 'not-verified')
  const hasNone = ACCOUNTS.length === 0
  const allFailed = ACCOUNTS.length > 0 && verified.length === 0

  const [primaryId, setPrimaryId] = useState<string | null>(null)
  const [preferredFlag, setPreferredFlag] = useState(false)
  const [achSubmittedFromBanking] = useState(false)

  // S11 all-failed: continue when checkbox acknowledged OR ach submitted
  // All other scenarios: just needs a primary set — no checkbox needed
  const canContinue = allFailed
    ? preferredFlag || achSubmittedFromBanking
    : primaryId !== null

  // When continuing S11 with checkbox, banking = pending resolution
  // When continuing with ACH submitted, banking = ACH submitted
  const handleContinue = () => {
    setPrimaryBankSelected(true)
    setView('sf-interstitial-3')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="REG-3" name="Bank Account Verification" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar activeStep={2} docSignStatus={docSignStatus} />

        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Bank Account</h2>

          {/* No accounts */}
          {hasNone && (
            <>
              <p className="text-sm text-[#55575C] mb-5">
                We checked AuctionAccess for bank accounts linked to your profile.
              </p>

              {/* Primary callout */}
              <div className="bg-[#FFF4F4] border border-[#FCA5A5] rounded-xl p-5 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-[#DC2626] text-xl shrink-0">⚠️</span>
                  <div>
                    <p className="font-semibold text-sm text-[#991B1B] mb-1">No bank accounts on file with AuctionAccess</p>
                    <p className="text-sm text-[#991B1B] leading-relaxed">
                      We weren't able to find any bank accounts associated with your AuctionAccess profile.
                    </p>
                  </div>
                </div>
              </div>

              {/* NetSuite / JPMorgan callout */}
              <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-4 mb-6 text-xs text-[#55575C] space-y-1.5">
                <p className="font-semibold text-[#0E0E0F] text-sm mb-2">What this means behind the scenes</p>
                <div className="flex items-start gap-2">
                  <span className="text-[#8D9199] shrink-0 mt-0.5">✦</span>
                  <span>No bank account records have been created in NetSuite for your dealership record</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#8D9199] shrink-0 mt-0.5">✦</span>
                  <span>No JPMorgan validation has been initiated — there are no accounts to validate yet</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-[#0077D8] shrink-0 mt-0.5">✦</span>
                  <span>Once you submit an ACH account below, NetSuite will create a bank account record and initiate JPMorgan validation automatically</span>
                </div>
              </div>

              <button
                onClick={() => setView('ach-form')}
                className="w-full border-2 border-[#0077D8] rounded-xl p-4 flex items-center justify-center gap-3 text-[#0077D8] text-sm font-semibold cursor-pointer hover:bg-[#EFF6FF] transition-colors"
              >
                <span className="text-lg">+</span> Add a bank account via ACH form
              </button>
            </>
          )}

          {/* Has accounts */}
          {!hasNone && (
            <>
              <p className="text-sm text-[#55575C] mb-6">
                {allFailed
                  ? 'All of the accounts have gone through our JPMorgan validation and none have been able to be validated. Requires further review.'
                  : unverified.length > 0 && verified.length > 0
                  ? `We found ${ACCOUNTS.length} accounts linked to your AuctionAccess profile. ${verified.length} ${verified.length === 1 ? 'has' : 'have'} been validated by JPMorgan and will all be available for use — please select one as your primary. ${unverified.length} could not be verified.`
                  : verified.length > 1
                  ? `All ${verified.length} accounts have been validated by JPMorgan and will be available for use during checkout. Please select one as your primary payout account.`
                  : 'This account has been validated by JPMorgan and will be available for use. Please confirm it as your primary payout account.'}
              </p>

              {/* Verified */}
              {verified.length > 0 && (
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide">
                      JPMorgan Validated — All Included
                    </p>
                    {verified.length > 1 && (
                      <p className="text-xs text-[#55575C]">Select one as primary</p>
                    )}
                  </div>

                  <div className="space-y-3">
                    {verified.map(acct => {
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

                  {/* Summary once primary is selected */}
                  {primaryId && verified.length > 1 && (
                    <div className="mt-3 bg-[#EFF6FF] rounded-lg px-4 py-2.5 text-xs text-[#0077D8] flex items-center gap-2">
                      <span>All {verified.length} accounts will be available for use ·</span>
                      <span className="font-semibold">Primary: {verified.find(a => a.id === primaryId)?.bank}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Unverified */}
              {unverified.length > 0 && (
                <div className="mb-5">
                  <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-3">
                    JPMorgan Unable to Validate
                  </p>
                  <div className="space-y-3">
                    {unverified.map(acct => (
                      <div key={acct.id} className="flex items-center gap-4 border border-[#E8E9EB] bg-[#F9FAFB] rounded-xl p-4 opacity-60">
                        <input type="radio" disabled className="w-4 h-4 cursor-not-allowed shrink-0 opacity-40" />
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-[#0E0E0F]">{acct.bank}</p>
                          <p className="text-xs text-[#55575C] mt-0.5">
                            {acct.type} — ****{acct.last4}
                            <span className="ml-4">Routing: {acct.routing}</span>
                          </p>
                        </div>
                        <span className="text-xs text-[#E53E3E] font-medium shrink-0">Not validated</span>
                      </div>
                    ))}
                  </div>

                  {allFailed && (
                    <div className="mt-5 space-y-4">
                      {/* Optional ACH */}
                      <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-4">
                        <p className="text-sm font-medium text-[#0E0E0F] mb-1">Have a different account to try?</p>
                        <p className="text-xs text-[#55575C] mb-3">
                          Optionally provide an alternative account via ACH form. JPMorgan validation will run immediately.
                        </p>
                        <button
                          onClick={() => setView('ach-form')}
                          className="text-sm font-semibold text-[#0077D8] cursor-pointer hover:underline"
                        >
                          Add an ACH account (optional) →
                        </button>
                      </div>

                      {/* Required acknowledgement checkbox */}
                      <div className={`rounded-xl border-2 p-4 transition-all ${preferredFlag ? 'bg-[#FFFBEB] border-[#F59600]' : 'bg-white border-[#E8E9EB]'}`}>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferredFlag}
                            onChange={e => setPreferredFlag(e.target.checked)}
                            className="mt-0.5 w-4 h-4 accent-[#F59600] cursor-pointer shrink-0"
                          />
                          <div>
                            <p className="text-sm font-semibold text-[#0E0E0F] mb-1">
                              I understand my accounts could not be verified at this time
                            </p>
                            <p className="text-xs text-[#55575C] leading-relaxed">
                              An ACV Registration Specialist will reach out to you directly to resolve your banking before your account can be activated. Checking this allows you to continue with the rest of registration now.
                            </p>
                            {preferredFlag && (
                              <p className="text-xs text-[#F59600] font-semibold mt-2">
                                ✓ Acknowledged — banking status will be set to Pending Resolution
                              </p>
                            )}
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Preferred account flag — shown whenever verified accounts exist */}
              {verified.length > 0 && (
                <div className={`rounded-xl border p-4 mb-5 transition-all ${preferredFlag ? 'bg-[#FFFBEB] border-[#F59600]' : 'bg-[#F7F7F8] border-[#E8E9EB]'}`}>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferredFlag}
                      onChange={e => setPreferredFlag(e.target.checked)}
                      className="mt-0.5 w-4 h-4 accent-[#F59600] cursor-pointer shrink-0"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#0E0E0F]">
                        {unverified.length > 0
                          ? 'The account I intended to use did not pass verification'
                          : 'The account I\'d prefer to use isn\'t verified and I can\'t select it'}
                      </p>
                      <p className="text-xs text-[#55575C] mt-1 leading-relaxed">
                        {unverified.length > 0
                          ? 'Optional — you can still register using a verified account above. Checking this box flags your application for priority follow-up. An ACV teammate will reach out directly to investigate and attempt to resolve the verification issue for your intended account.'
                          : 'Optional — select a verified account above to proceed. A specialist will reach out to help resolve the issue with your preferred account.'}
                      </p>
                      {preferredFlag && (
                        <div className="mt-3 space-y-1">
                          <p className="text-xs text-[#00A576] font-semibold">✓ Flag recorded on your application</p>
                          <p className="text-xs text-[#92400E]">
                            ⚡ This application will be routed to a priority queue in Salesforce. An ACV teammate will contact you directly to investigate.
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              )}

              {/* Or / ACH link */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-[#E8E9EB]" />
                <span className="text-xs text-[#8D9199]">Or</span>
                <div className="flex-1 h-px bg-[#E8E9EB]" />
              </div>

              <button
                onClick={() => setView('ach-form')}
                className="w-full border border-dashed border-[#0077D8] rounded-xl p-4 flex items-center justify-center gap-3 text-[#0077D8] text-sm font-semibold cursor-pointer hover:bg-[#EFF6FF] transition-colors"
              >
                <span className="text-lg">+</span> Add an ACH account
              </button>
            </>
          )}

          <div className="flex justify-end gap-6 items-center mt-8">
            <button onClick={() => setView('sf-interstitial-2')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton disabled={!canContinue} onClick={handleContinue}>
              Continue
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
