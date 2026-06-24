import type { View, DealerState, DocSignStatus, ActiveScenario } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { StepSidebar } from '../shared/StepSidebar'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  dealerState: DealerState
  mobileNumber: string
  docSignStatus: DocSignStatus
  isLoggedIn?: boolean
  onLogout?: () => void
  postBanking?: boolean
  activeScenario?: ActiveScenario
}


export function DocusignPrompt({ setView, dealerState, mobileNumber, docSignStatus, isLoggedIn, onLogout, postBanking, activeScenario }: Props) {
  const needsTaxResale = dealerState !== 'oregon'

  // s1b skips qualifying-questions screen (baked into dealership info) — go straight to demo
  const nextView: View = postBanking
    ? (activeScenario === 's1b' ? 'schedule-demo' : 'qualifying-questions')
    : 'banking'

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="REG-8" name="DocuSign — Documents Sent Notification" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex gap-0 px-10 pt-8 pb-12">
        <StepSidebar
          activeStep={postBanking ? 3 : 3}
          docSignStatus={docSignStatus}
          showTaxResale={needsTaxResale}
        />

        <div className="flex-1 max-w-2xl ml-20">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">
            {postBanking ? 'Complete Your Documents Before Finishing' : 'Documents Required Before Proceeding'}
          </h2>
          <p className="text-sm text-[#55575C] mb-6">
            {postBanking
              ? 'Before we can complete your registration, please ensure the following documents have been signed and returned.'
              : 'When your application was created, our system automatically sent the following documents to your email for signature. Please check your inbox.'}
          </p>

          {/* Sent-to box */}
          <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-4 flex items-center gap-3 mb-6">
            <span className="text-2xl">📧</span>
            <div>
              <p className="text-xs text-[#55575C]">Documents sent to</p>
              <p className="font-semibold text-sm text-[#0E0E0F]">jharlow@metrofordalbany.com</p>
              <p className="text-xs text-[#55575C] mt-0.5">via DocuSign from ACV Auctions (arichbart@acvauctions.com)</p>
            </div>
          </div>

          {/* Document sections */}
          <div className="space-y-4">

            {/* LPOA — always required */}
            <div className={`rounded-xl border-2 p-5 ${docSignStatus.lpoa === 'received' ? 'bg-[#ECFDF5] border-[#00A576]' : 'bg-white border-[#E8E9EB]'}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#0E0E0F]">Limited Power of Attorney (LPOA)</span>
                    {docSignStatus.lpoa === 'received' && (
                      <span className="bg-[#00A576] text-white text-[10px] font-semibold rounded-full px-2 py-0.5">✓ Received</span>
                    )}
                    {docSignStatus.lpoa === 'pending' && (
                      <span className="bg-[#FFF3ED] text-[#F26522] text-[10px] font-semibold rounded-full px-2 py-0.5">Pending Signature</span>
                    )}
                  </div>
                  <p className="text-xs text-[#55575C] leading-relaxed max-w-lg">
                    Giving ACV Power of Attorney allows titles to transfer more quickly from sellers to buyers,
                    and allows ACV to fix minor errors on behalf of the seller. <strong>This form is required.</strong>
                  </p>
                </div>
              </div>
              {docSignStatus.lpoa === 'pending' && (
                <p className="text-xs text-[#55575C] mt-2 italic">
                  Status: Salesforce Application Record → LPOA Status = <span className="text-[#F59600] font-medium">Sent — Pending Signature</span>
                  <br />Will update to <span className="text-[#00A576] font-medium">Received</span> once DocuSign confirms your signature.
                </p>
              )}
            </div>

            {/* Tax Resale — state conditional */}
            {dealerState === 'idaho' && (
              <div className={`rounded-xl border-2 p-5 ${docSignStatus.taxResale === 'received' ? 'bg-[#ECFDF5] border-[#00A576]' : 'bg-white border-[#E8E9EB]'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-[#0E0E0F]">Idaho Form ST-101 — Sales Tax Resale Certificate</span>
                      {docSignStatus.taxResale === 'received' && (
                        <span className="bg-[#00A576] text-white text-[10px] font-semibold rounded-full px-2 py-0.5">✓ Received</span>
                      )}
                      {docSignStatus.taxResale === 'pending' && (
                        <span className="bg-[#FFF3ED] text-[#F26522] text-[10px] font-semibold rounded-full px-2 py-0.5">Pending Signature</span>
                      )}
                    </div>
                    <p className="text-xs text-[#55575C] leading-relaxed max-w-lg">
                      Most states require this form as proof that no sales tax needs to be collected on inventory
                      purchased via ACV's auctions. Idaho requires the ST-101 form. <strong>This form is required.</strong>
                    </p>
                  </div>
                </div>
                {docSignStatus.taxResale === 'pending' && (
                  <p className="text-xs text-[#55575C] mt-2 italic">
                    Status: Salesforce Application Record → Tax Resale Status = <span className="text-[#F59600] font-medium">Sent — Pending Signature</span>
                    <br />Will update to <span className="text-[#00A576] font-medium">Received</span> once DocuSign confirms your signature.
                  </p>
                )}
              </div>
            )}

            {/* Alabama — manual DDCR */}
            {dealerState === 'alabama' && (
              <div className="rounded-xl border-2 border-[#F59600] bg-[#FFFBEB] p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="text-sm font-semibold text-[#0E0E0F] mb-1">Alabama Tax Resale Certificate — Manual Collection</p>
                    <p className="text-xs text-[#92400E] leading-relaxed">
                      Alabama requires a Tax Resale Certificate, however this is collected manually rather than via DocuSign.
                      Your registration specialist <strong>Rob Smyton</strong> will be reaching out to{' '}
                      <strong>{mobileNumber || '(your mobile number)'}</strong> to collect your Alabama Tax Resale Certificate.
                    </p>
                    <p className="text-xs text-[#55575C] mt-2 italic">
                      A manual DDCR record has been created in Salesforce. Status will be updated by Rob Smyton upon collection.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Oregon — not required */}
            {dealerState === 'oregon' && (
              <div className="rounded-xl border-2 border-[#E8E9EB] bg-[#F7F7F8] p-5">
                <div className="flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="text-sm font-semibold text-[#0E0E0F] mb-1">Tax Resale Certificate — Not Required</p>
                    <p className="text-xs text-[#55575C] leading-relaxed">
                      Oregon does not require a Tax Resale Certificate for wholesale vehicle transactions.
                      No additional action is needed on your part. Salesforce Tax Resale Status has been set to <strong>Not Required</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3">
            <PrimaryButton
              onClick={() => setView('gmail-docusign')}
              className="w-full justify-center"
            >
              📧 Open Email to Sign Documents Now
            </PrimaryButton>

            <button
              onClick={() => setView(nextView)}
              className="w-full text-center text-sm text-[#004E7D] border border-[#D1D3D6] rounded-full py-3 cursor-pointer hover:bg-[#F7F7F8] transition-colors"
            >
              {docSignStatus.lpoa === 'received'
                ? `Continue to ${postBanking ? (activeScenario === 's1b' ? 'Schedule Demo' : 'Qualifying Questions') : 'Banking'} →`
                : `Skip for now — go to ${postBanking ? (activeScenario === 's1b' ? 'Schedule Demo' : 'Qualifying Questions') : 'Banking'} →`}
            </button>

            {docSignStatus.lpoa !== 'received' && (
              <p className="text-xs text-center text-[#8D9199]">
                You can return to sign documents at any time. Your registration progress is saved.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
