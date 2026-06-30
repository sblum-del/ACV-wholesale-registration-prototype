import { useState } from 'react'
import type { View, DocSignStatus } from '../../../types'
import { ACVHeader } from '../../shared/ACVHeader'
import { StepSidebar } from '../../shared/StepSidebar'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  docSignStatus: DocSignStatus
  nextView: View
  showTaxResaleInSidebar: boolean
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function V2DocuSignLPOA({ setView, docSignStatus, nextView, showTaxResaleInSidebar, isLoggedIn, onLogout }: Props) {
  const [simSigned, setSimSigned] = useState(false)

  const effectiveLpoa: 'pending' | 'received' = simSigned ? 'received' : docSignStatus.lpoa
  const effectiveStatus: DocSignStatus = { ...docSignStatus, lpoa: effectiveLpoa }
  const lpoaComplete = effectiveLpoa === 'received'

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-7L" name="Limited Power of Attorney" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar
          activeStep={3}
          docSignStatus={effectiveStatus}
          showTimeEstimate={false}
          lpoaFullName={true}
          combineLpoaAndTax={false}
          showTaxResale={showTaxResaleInSidebar}
        />

        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-6">Limited Power of Attorney</h2>

          {/* Status callout */}
          {lpoaComplete ? (
            <div className="border-2 border-[#00A576] bg-[#ECFDF5] rounded-xl p-5 flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#00A576] flex items-center justify-center shrink-0">
                <span className="text-white text-lg font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-[#065F46]">
                  Limited Power of Attorney received — you're all set here.
                </p>
                <p className="text-sm text-[#065F46] mt-0.5 opacity-80">
                  Click Next to continue.
                </p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-[#0077D8] rounded-xl p-5 flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#0077D8] flex items-center justify-center shrink-0">
                <span className="text-white text-lg">✉</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-[#0E0E0F]">
                  Check your email and sign the Limited Power of Attorney to continue.
                </p>
                <p className="text-sm text-[#55575C] mt-0.5">
                  The document was sent to your email address via DocuSign.
                </p>
              </div>
            </div>
          )}

          {/* Document card */}
          <div className="border border-[#E8E9EB] rounded-xl overflow-hidden mb-4">
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-semibold text-sm text-[#0E0E0F]">Limited Power of Attorney</p>
                <p className="text-xs text-[#55575C] mt-0.5">Authorizes ACV Auctions to act on your behalf at auction.</p>
              </div>
              {lpoaComplete ? (
                <span className="text-xs font-semibold bg-[#ECFDF5] text-[#065F46] rounded px-2.5 py-1 shrink-0 ml-4 flex items-center gap-1">
                  ✓ Complete
                </span>
              ) : (
                <span className="text-xs font-medium bg-[#FFFBEB] text-[#92400E] rounded px-2.5 py-1 shrink-0 ml-4">
                  Awaiting signature
                </span>
              )}
            </div>
          </div>

          {/* Support line */}
          <p className="text-sm text-[#55575C] mb-6">
            Didn't receive it?{' '}
            <span className="text-[#0077D8] font-semibold cursor-pointer hover:underline">
              CALL 1-800-553-4070
            </span>
          </p>

          {/* Prototype simulation toggle */}
          <div className="border border-dashed border-[#D1D3D6] rounded-xl p-4 mb-8 flex items-center justify-between bg-[#FAFAFA]">
            <div>
              <p className="text-sm font-medium text-[#0E0E0F]">What if the dealer signed before getting to this screen?</p>
              <p className="text-xs text-[#8D9199] mt-0.5">Toggle to simulate the LPOA signed via DocuSign email</p>
            </div>
            <button
              onClick={() => setSimSigned(p => !p)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ml-6 cursor-pointer
                ${simSigned ? 'bg-[#00A576]' : 'bg-[#D1D3D6]'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
                ${simSigned ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex justify-end">
            <PrimaryButton onClick={() => setView(nextView)}>
              Next →
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
