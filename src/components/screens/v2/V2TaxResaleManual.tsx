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

export function V2TaxResaleManual({ setView, docSignStatus, isLoggedIn, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-7T" name="Tax Resale Certificate — Manual Collection" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar
          activeStep={4}
          docSignStatus={docSignStatus}
          showTimeEstimate={false}
          lpoaFullName={true}
          combineLpoaAndTax={false}
          showTaxResale={true}
        />

        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-2">Tax Resale Certificate</h2>
          <p className="text-sm text-[#55575C] mb-6">
            Your state requires a Tax Resale Certificate, but this document cannot be collected via DocuSign. Your ACV registration specialist will handle this step with you directly.
          </p>

          {/* Info callout */}
          <div className="border-2 border-[#0077D8] bg-[#EFF6FF] rounded-xl p-5 mb-6">
            <p className="font-semibold text-sm text-[#004E7D] mb-1">Your specialist is on it</p>
            <p className="text-sm text-[#004E7D] leading-relaxed">
              Here are the directions for collecting the Tax Resale Certificate from your state. Your registration specialist <span className="font-semibold">Sarah Martinez</span> will be reaching out to you — expect a call from{' '}
              <span className="font-semibold">(716) 555-0143</span>.
            </p>
          </div>

          {/* Steps card */}
          <div className="border border-[#E8E9EB] rounded-xl p-6 mb-6">
            <p className="font-semibold text-sm text-[#0E0E0F] mb-4">What to expect</p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EFF6FF] border-2 border-[#0077D8] flex items-center justify-center text-xs font-bold text-[#0077D8] shrink-0 mt-0.5">1</div>
                <p className="text-sm text-[#55575C]">Sarah will contact you by phone to walk you through your state's Tax Resale Certificate requirements.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EFF6FF] border-2 border-[#0077D8] flex items-center justify-center text-xs font-bold text-[#0077D8] shrink-0 mt-0.5">2</div>
                <p className="text-sm text-[#55575C]">You'll complete and submit the certificate using instructions she provides — no DocuSign required.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#EFF6FF] border-2 border-[#0077D8] flex items-center justify-center text-xs font-bold text-[#0077D8] shrink-0 mt-0.5">3</div>
                <p className="text-sm text-[#55575C]">Once received, ACV will update your account status and you'll be notified when you're fully activated.</p>
              </div>
            </div>
          </div>

          {/* Support line */}
          <p className="text-sm text-[#55575C] mb-8">
            Questions?{' '}
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
