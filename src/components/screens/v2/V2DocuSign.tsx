import type { View, DocSignStatus } from '../../../types'
import { ACVHeader } from '../../shared/ACVHeader'
import { StepSidebar } from '../../shared/StepSidebar'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  docSignStatus: DocSignStatus
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function V2DocuSign({ setView, docSignStatus, isLoggedIn, onLogout }: Props) {
  const bothComplete = docSignStatus.lpoa === 'received' && docSignStatus.taxResale === 'received'

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-7" name="Limited Power of Attorney & Tax Resale" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar
          activeStep={3}
          docSignStatus={docSignStatus}
          showTimeEstimate={false}
          lpoaFullName={true}
          combineLpoaAndTax={true}
        />

        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-6">Limited Power of Attorney & Tax Resale</h2>

          {/* Status callout — changes based on document completion */}
          {bothComplete ? (
            <div className="border-2 border-[#00A576] bg-[#ECFDF5] rounded-xl p-5 flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#00A576] flex items-center justify-center shrink-0">
                <span className="text-white text-lg font-bold">✓</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-[#065F46]">
                  You're all done — ACV is reviewing your registration.
                </p>
                <p className="text-sm text-[#065F46] mt-0.5 opacity-80">
                  We'll email you once approved — usually within 1–2 business days.
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
                  Check your email and sign both documents to complete your registration.
                </p>
                <p className="text-sm text-[#55575C] mt-0.5">
                  Documents were sent to your email address via DocuSign.
                </p>
              </div>
            </div>
          )}

          {/* Documents card */}
          <div className="border border-[#E8E9EB] rounded-xl overflow-hidden mb-4">
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-semibold text-sm text-[#0E0E0F]">Limited Power of Attorney</p>
                <p className="text-xs text-[#55575C] mt-0.5">Authorizes ACV Auctions to act on your behalf at auction.</p>
              </div>
              {docSignStatus.lpoa === 'received' ? (
                <span className="text-xs font-semibold bg-[#ECFDF5] text-[#065F46] rounded px-2.5 py-1 shrink-0 ml-4 flex items-center gap-1">
                  ✓ Complete
                </span>
              ) : (
                <span className="text-xs font-medium bg-[#FFFBEB] text-[#92400E] rounded px-2.5 py-1 shrink-0 ml-4">
                  Awaiting signature
                </span>
              )}
            </div>

            <div className="border-t border-[#E8E9EB]" />

            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-semibold text-sm text-[#0E0E0F]">Tax Resale Certificate</p>
                <p className="text-xs text-[#55575C] mt-0.5">Verifies your tax-exempt status for vehicle purchases.</p>
              </div>
              {docSignStatus.taxResale === 'received' ? (
                <span className="text-xs font-semibold bg-[#ECFDF5] text-[#065F46] rounded px-2.5 py-1 shrink-0 ml-4 flex items-center gap-1">
                  ✓ Complete
                </span>
              ) : (
                <span className="text-xs font-medium bg-[#FFFBEB] text-[#92400E] rounded px-2.5 py-1 shrink-0 ml-4">
                  Awaiting completion
                </span>
              )}
            </div>
          </div>

          {/* Support line */}
          <p className="text-sm text-[#55575C] mb-8">
            Didn't receive it?{' '}
            <span className="text-[#0077D8] font-semibold cursor-pointer hover:underline">
              CALL 1-800-553-4070
            </span>
          </p>

          <div className="flex justify-end">
            <PrimaryButton onClick={() => setView('v2-thank-you')}>
              Next →
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
