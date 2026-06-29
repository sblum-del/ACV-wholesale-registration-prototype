import type { View } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  onLobby?: () => void
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

export function CheckEmailMFA({ setView, onLobby }: Props) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="AUTH-4" name="Check Email for Verification Code" />
      <ACVHeader onLobby={onLobby} />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl border border-[#E8E9EB] shadow-sm max-w-md w-full p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#DBEAFE] flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✉</span>
          </div>
          <h2 className="font-bold text-2xl text-[#0E0E0F]">Check your email</h2>
          <p className="text-sm text-[#55575C] mt-3">We sent a confirmation code to:</p>
          <p className="font-semibold text-[#0E0E0F] mt-1">{maskEmail('jharlow@metrofordalbany.com')}</p>
          <p className="text-sm text-[#55575C] mt-3">
            Enter the 6-digit code from that email on the next screen.
          </p>
          <button
            onClick={() => setView('mfa-code-entry')}
            className="mt-6 w-full text-white rounded-full px-8 py-3 text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(160deg, #F26522 14%, #FC4243 86%)' }}
          >
            Enter Code →
          </button>
          <p className="text-xs text-[#8D9199] mt-4">
            Didn't receive an email? Check your spam folder or{' '}
            <span className="text-[#004E7D] cursor-pointer hover:underline">resend</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
