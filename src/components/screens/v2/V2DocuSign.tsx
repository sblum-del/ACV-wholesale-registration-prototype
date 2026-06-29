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

function maskEmail(email: string): string {
  const atIdx = email.indexOf('@')
  if (atIdx < 0) return email
  const local = email.slice(0, atIdx)
  const rest = email.slice(atIdx + 1)
  const dotIdx = rest.lastIndexOf('.')
  const host = dotIdx > 0 ? rest.slice(0, dotIdx) : rest
  const tld = dotIdx > 0 ? rest.slice(dotIdx) : ''
  const maskedLocal = local.length <= 2 ? local[0] + '***' : local.slice(0, 2) + '*'.repeat(local.length - 2)
  const maskedHost = host.length <= 2 ? host[0] + '***' : host.slice(0, 2) + '*'.repeat(host.length - 2)
  return `${maskedLocal}@${maskedHost}${tld}`
}

const LPOA_STATUS_LABEL: Record<string, string> = {
  received: 'Received',
  pending: 'Awaiting signature',
}

const TAX_STATUS_LABEL: Record<string, string> = {
  received: 'Received',
  pending: 'Awaiting completion',
  'not-required': 'Not required',
  manual: 'Manual collection',
}

const BADGE_CLASS = 'text-xs font-medium rounded px-2.5 py-1 shrink-0 ml-4'
const BADGE_PENDING = `${BADGE_CLASS} bg-[#FFFBEB] text-[#92400E]`
const BADGE_DONE = `${BADGE_CLASS} bg-[#ECFDF5] text-[#065F46]`
const BADGE_NEUTRAL = `${BADGE_CLASS} bg-[#F7F7F8] text-[#55575C]`

function getBadgeClass(status: string) {
  if (status === 'received') return BADGE_DONE
  if (status === 'not-required' || status === 'manual') return BADGE_NEUTRAL
  return BADGE_PENDING
}

export function V2DocuSign({ setView, docSignStatus, isLoggedIn, onLogout }: Props) {
  const email = maskEmail('jharlow@metrofordalbany.com')

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

          {/* Email callout */}
          <div className="border-2 border-[#0077D8] rounded-xl p-5 flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#0077D8] flex items-center justify-center shrink-0">
              <span className="text-white text-lg">✉</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-[#0E0E0F]">
                Check your email and sign both documents to complete your registration.
              </p>
              <p className="text-sm text-[#55575C] mt-0.5">
                Email sent to <span className="text-[#0077D8] font-medium">{email}</span>
              </p>
            </div>
          </div>

          {/* Documents card */}
          <div className="border border-[#E8E9EB] rounded-xl overflow-hidden mb-4">
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-semibold text-sm text-[#0E0E0F]">Limited Power of Attorney</p>
                <p className="text-xs text-[#55575C] mt-0.5">Authorizes ACV Auctions to act on your behalf at auction.</p>
              </div>
              <span className={getBadgeClass(docSignStatus.lpoa)}>
                {LPOA_STATUS_LABEL[docSignStatus.lpoa] ?? 'Awaiting signature'}
              </span>
            </div>

            <div className="border-t border-[#E8E9EB]" />

            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="font-semibold text-sm text-[#0E0E0F]">Tax Resale Certificate</p>
                <p className="text-xs text-[#55575C] mt-0.5">Verifies your tax-exempt status for vehicle purchases.</p>
              </div>
              <span className={getBadgeClass(docSignStatus.taxResale)}>
                {TAX_STATUS_LABEL[docSignStatus.taxResale] ?? 'Awaiting completion'}
              </span>
            </div>
          </div>

          {/* Support line */}
          <p className="text-sm text-[#55575C] mb-8">
            Didn't receive it?{' '}
            <span className="text-[#0077D8] font-semibold cursor-pointer hover:underline">
              CALL 1-800-553-4070
            </span>
          </p>

          <div className="flex flex-col gap-3">
            <PrimaryButton onClick={() => setView('docusign-notification')} className="w-full justify-center">
              📧 Open Email to Sign Documents Now
            </PrimaryButton>
            <button
              onClick={() => setView('schedule-demo')}
              className="w-full text-center text-sm text-[#004E7D] border border-[#D1D3D6] rounded-full py-3 cursor-pointer hover:bg-[#F7F7F8] transition-colors"
            >
              Skip for now — continue to Schedule Demo →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
