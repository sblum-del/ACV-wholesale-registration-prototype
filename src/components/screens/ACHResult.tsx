import { useState } from 'react'
import type { View, DocSignStatus } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { StepSidebar } from '../shared/StepSidebar'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  achVerified: boolean
  preferredFlagCarried?: boolean
  docSignStatus?: DocSignStatus
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function ACHResult({ setView, achVerified, preferredFlagCarried, docSignStatus, isLoggedIn, onLogout }: Props) {
  // Pre-check if user already flagged on S11 rejection screen
  const [preferredFlag, setPreferredFlag] = useState(preferredFlagCarried ?? false)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="REG-6" name="ACH Validation Result" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar activeStep={2} docSignStatus={docSignStatus} />

        <div className="flex-1 max-w-2xl ml-20">

          {achVerified ? (
            /* ── VERIFIED ─────────────────────────────────── */
            <>
              <div className="bg-[#ECFDF5] border-2 border-[#00A576] rounded-2xl p-7 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#00A576] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xl">✓</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-[#065F46] mb-1">Bank account verified</h2>
                    <p className="text-sm text-[#065F46] leading-relaxed">
                      Your ACH account has been validated by JPMorgan and set as your primary bank account for Metro Ford of Albany.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2 text-xs text-[#065F46]">
                  <div className="flex items-center gap-2">
                    <span>✦</span>
                    <span>NetSuite bank account record validated — set as primary automatically</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✦</span>
                    <span>Banking Collection Status on Application → TRUE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✦</span>
                    <span>No additional action needed — JPMorgan verification confirms this is your primary</span>
                  </div>
                </div>
              </div>

              {/* Optional flag — pre-checked if carried from S11 rejection screen */}
              <div className={`rounded-xl border p-4 mt-2 transition-all ${preferredFlag ? 'bg-[#FFFBEB] border-[#F59600]' : 'bg-[#F7F7F8] border-[#E8E9EB]'}`}>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferredFlag}
                    onChange={e => setPreferredFlag(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[#F59600] cursor-pointer shrink-0"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#0E0E0F]">
                      My intended account was one of the ones that previously failed validation
                    </p>
                    <p className="text-xs text-[#55575C] mt-1 leading-relaxed">
                      {preferredFlagCarried
                        ? 'You flagged this earlier. Your application is already marked for priority investigation of your intended account.'
                        : 'Optional — check this if you intended to use one of the accounts that failed verification. An ACV teammate will investigate and reach out to you directly.'}
                    </p>
                    {preferredFlag && (
                      <p className="text-xs text-[#00A576] font-semibold mt-2">
                        ✓ Flag recorded on your application — priority follow-up assigned
                      </p>
                    )}
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-4">
                <PrimaryButton onClick={() => setView('sf-interstitial-3')}>
                  Continue →
                </PrimaryButton>
              </div>
            </>

          ) : (
            /* ── REJECTED ─────────────────────────────────── */
            <>
              <div className="bg-[#FFF0F0] border-2 border-[#FCA5A5] rounded-2xl p-7 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#DC2626] flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xl">✕</span>
                  </div>
                  <div>
                    <h2 className="font-bold text-xl text-[#991B1B] mb-1">Bank account could not be verified</h2>
                    <p className="text-sm text-[#991B1B] leading-relaxed">
                      JPMorgan was unable to validate the account information you submitted. This sometimes happens due to account number discrepancies, routing number mismatches, or account status issues.
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2 text-xs text-[#991B1B]">
                  <div className="flex items-center gap-2">
                    <span>✦</span>
                    <span>NetSuite bank account record created but marked as unverified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✦</span>
                    <span>Banking Collection Status on Application → Pending Resolution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✦</span>
                    <span>Application flagged for priority follow-up in Salesforce</span>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-5 mb-6">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-3">What happens next</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0077D8] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">1</div>
                    <p className="text-sm text-[#0E0E0F]">
                      Someone from our team will reach out to you directly at <strong>(518) 555-0847</strong> to investigate and resolve the verification issue.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0077D8] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">2</div>
                    <p className="text-sm text-[#0E0E0F]">
                      You can continue with the rest of your registration. Banking will be finalized before your account is activated.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0077D8] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">3</div>
                    <p className="text-sm text-[#0E0E0F]">
                      If you have another account you'd like to try, you can submit it now.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => setView('ach-form')}
                  className="text-sm text-[#004E7D] font-medium cursor-pointer hover:underline border border-[#004E7D] rounded-full px-6 py-2.5"
                >
                  Try a different account
                </button>
                <PrimaryButton onClick={() => setView('sf-interstitial-3')}>
                  Continue anyway →
                </PrimaryButton>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
