import type { View, ActiveTab, GmailContext } from '../../types'
import { BrowserTabBar } from '../shared/BrowserTabBar'
import { ACVHeader } from '../shared/ACVHeader'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  activeTab: ActiveTab
  setActiveTab: (t: ActiveTab) => void
  gmailContext: GmailContext
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function DocusignNotification({ setView, activeTab, setActiveTab, gmailContext, isLoggedIn, onLogout }: Props) {
  return (
    <div className="h-screen flex flex-col">
      <ScreenLabel id="REG-9" name="DocuSign — Check Email" />
      <BrowserTabBar activeTab={activeTab} setActiveTab={setActiveTab} gmailContext={gmailContext} setView={setView} acvView="docusign-notification" />
      <ACVHeader onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex-1 flex items-center justify-center p-8 bg-[#F5F5F7]">
        <div className="bg-white rounded-2xl border border-[#E8E9EB] shadow-sm max-w-xl w-full p-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#EDE9FE] flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✍</span>
          </div>
          <h2 className="font-bold text-2xl text-[#0E0E0F]">Documents Sent for Signature</h2>
          <p className="text-sm text-[#55575C] mt-3">We require your signature on the following documents:</p>
          <div className="text-sm text-[#0E0E0F] mt-2">
            <p>• Limited Power of Attorney (LPOA)</p>
            <p>• Idaho Form ST-101 Tax Resale Certificate</p>
          </div>
          <p className="text-sm text-[#55575C] mt-4">We've sent them to:</p>
          <p className="font-semibold text-[#0E0E0F]">jharlow@metrofordalbany.com</p>
          <p className="text-sm text-[#55575C] mt-2">
            Please open your email, complete the DocuSign documents, then return here to continue.
          </p>

          <button
            onClick={() => { setActiveTab('gmail'); setView('gmail-docusign') }}
            className="mt-6 w-full bg-[#EFF6FF] hover:bg-[#DBEAFE] border border-[#BFD9F7] rounded-lg p-3 cursor-pointer flex items-center justify-center gap-2 transition-colors"
          >
            <span className="text-sm text-[#004E7D]">📧 Switch to the Gmail tab to sign your documents</span>
          </button>

          <div className="mt-6">
            <PrimaryButton onClick={() => setView('schedule-demo')} className="w-full justify-center">
              I've signed my documents →
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
