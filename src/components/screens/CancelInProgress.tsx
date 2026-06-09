import { useState, useEffect } from 'react'
import type { View } from '../../types'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

type Stage = 'confirm' | 'cancelling' | 'cancelled' | 'starting'

export function CancelInProgress({ setView }: Props) {
  const [stage, setStage] = useState<Stage>('confirm')
  const [step, setStep] = useState(0)

  const cancelSteps = [
    { text: 'Setting Application record to Cancelled in Salesforce...', detail: 'Application status → Cancelled' },
    { text: 'Voiding open DocuSign envelopes...', detail: 'LPOA envelope voided · Tax Resale envelope voided' },
    { text: 'Rejecting related DealerDoc records...', detail: 'All DealerDoc records marked Rejected' },
    { text: 'Checking AuctionAccess for updated bank account records...', detail: 'Querying AA for open accounts — checking for new or closed accounts since original pull' },
    { text: 'Updating NetSuite bank account records...', detail: 'Creating records for new accounts · Closing records for accounts no longer open in AA' },
    { text: 'Running JPMorgan validation on updated bank accounts...', detail: 'Fresh validation pass on all current open accounts' },
    { text: 'Preparing new registration for James Harlow...', detail: 'New Contact, Affiliation, and Application records created · Existing Account record maintained' },
  ]

  useEffect(() => {
    if (stage !== 'cancelling') return
    if (step >= cancelSteps.length) {
      setTimeout(() => setStage('cancelled'), 600)
      return
    }
    const t = setTimeout(() => setStep(s => s + 1), 900)
    return () => clearTimeout(t)
  }, [stage, step])

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="RESUME-2" name="Cancel Existing Application" />
      <div className="bg-white border-b border-[#E8E9EB] h-16 flex items-center justify-between px-10 shrink-0">
        <div className="flex flex-col leading-none">
          <span className="font-black text-2xl text-[#F26522]">ACV</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
        </div>
        <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">← Lobby</button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl border border-[#E8E9EB] shadow-sm max-w-xl w-full overflow-hidden">

          {/* ── CONFIRM ─────────────────────────────────── */}
          {stage === 'confirm' && (
            <div className="p-8">
              <h2 className="font-bold text-xl text-[#0E0E0F] mb-1">Metro Ford of Albany — In Progress</h2>
              <p className="text-sm text-[#55575C] mb-5">
                This dealership's registration was started by another affiliated user. You are not able to complete their registration.
              </p>

              {/* Who started it */}
              <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-4 mb-5">
                <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-3">Current application details</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#55575C]">Started by</span>
                    <span className="font-semibold text-[#0E0E0F]">Sarah Mitchell</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#55575C]">Date started</span>
                    <span className="font-semibold text-[#0E0E0F]">May 28, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#55575C]">Days active</span>
                    <span className="font-semibold text-[#0E0E0F]">10 days</span>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 bg-[#EFF6FF] border border-[#BFD9F7] rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-[#0077D8] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="text-sm font-semibold text-[#0E0E0F]">Wait for Sarah Mitchell to finish</p>
                    <p className="text-xs text-[#55575C] mt-0.5">
                      Once the application is approved, this dealership will appear as <strong>Registered</strong> and you can <strong>Join</strong> to affiliate your account.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-[#DC2626] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="text-sm font-semibold text-[#0E0E0F]">Cancel and start over</p>
                    <p className="text-xs text-[#55575C] mt-0.5">
                      Cancels Sarah's application and all associated documents. You can then initiate a fresh registration.
                      <span className="text-[#DC2626] font-semibold"> All current progress will be lost. This cannot be undone.</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setView('in-progress-other-user')}
                  className="flex-1 border border-[#D1D3D6] text-[#55575C] rounded-full py-3 text-sm font-semibold cursor-pointer hover:bg-[#F7F7F8]"
                >
                  Go back
                </button>
                <button
                  onClick={() => { setStage('cancelling'); setStep(0) }}
                  className="flex-1 bg-[#DC2626] text-white rounded-full py-3 text-sm font-semibold cursor-pointer hover:bg-[#B91C1C] transition-colors"
                >
                  Cancel existing application
                </button>
              </div>
            </div>
          )}

          {/* ── CANCELLING ──────────────────────────────── */}
          {stage === 'cancelling' && (
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 border-4 border-[#0077D8] border-t-transparent rounded-full animate-spin shrink-0" />
                <p className="font-semibold text-sm text-[#0077D8]">Processing cancellation...</p>
              </div>
              <div className="space-y-3">
                {cancelSteps.map((s, i) => {
                  const done = i < step
                  const active = i === step
                  return (
                    <div key={i} className={`flex items-start gap-3 transition-opacity ${i > step ? 'opacity-30' : ''}`}>
                      <div className={`w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center text-xs font-bold
                        ${done ? 'bg-[#00A576] text-white' : active ? 'border-2 border-[#0077D8] bg-white' : 'border-2 border-[#D1D3D6] bg-white'}`}>
                        {done ? '✓' : ''}
                      </div>
                      <div>
                        <p className={`text-sm ${done ? 'text-[#00A576] font-medium' : active ? 'text-[#0077D8] font-medium' : 'text-[#8D9199]'}`}>
                          {s.text}
                        </p>
                        {done && <p className="text-xs text-[#55575C] mt-0.5">{s.detail}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── CANCELLED ───────────────────────────────── */}
          {stage === 'cancelled' && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto mb-5">
                <span className="text-3xl text-[#00A576]">✓</span>
              </div>
              <h2 className="font-bold text-xl text-[#0E0E0F] mb-2">Application cancelled</h2>
              <p className="text-sm text-[#55575C] leading-relaxed mb-6">
                Sarah Mitchell's application has been cancelled and all related documents have been voided.
                AuctionAccess bank account data has been refreshed and JPMorgan validation has been re-run.
                You can now begin a fresh registration for Metro Ford of Albany.
              </p>

              <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-4 mb-6 text-xs text-[#55575C] space-y-1.5 text-left">
                <p className="font-semibold text-[#0E0E0F] mb-2 text-sm">What was preserved</p>
                <div className="flex items-center gap-2"><span className="text-[#00A576]">✓</span><span>Account record for Metro Ford of Albany — maintained</span></div>
                <div className="flex items-center gap-2"><span className="text-[#00A576]">✓</span><span>AA Registration call already occurred — account still active in AuctionAccess</span></div>
                <div className="flex items-center gap-2"><span className="text-[#00A576]">✓</span><span>NetSuite dealership record maintained — bank records refreshed</span></div>
                <div className="flex items-center gap-2"><span className="text-[#F59600]">↻</span><span>New Contact, Affiliation, and Application records created for you</span></div>
              </div>

              <PrimaryButton
                onClick={() => setView('sf-interstitial-cancel-restart')}
                className="w-full justify-center"
              >
                Begin Your Registration →
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
