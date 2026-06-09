import type { ActiveTab, GmailContext, View } from '../../types'

interface Props {
  activeTab: ActiveTab
  setActiveTab: (t: ActiveTab) => void
  gmailContext: GmailContext
  setView: (v: View) => void
  acvView: View
  onLobby?: () => void
}

export function BrowserTabBar({ activeTab, setActiveTab, gmailContext, setView, acvView, onLobby }: Props) {
  const handleGmailClick = () => {
    setActiveTab('gmail')
    setView(gmailContext === 'mfa' ? 'gmail-mfa' : 'gmail-docusign')
  }

  const handleACVClick = () => {
    setActiveTab('acv')
    setView(acvView)
  }

  return (
    <div className="bg-[#3D3D3D] flex flex-col shrink-0">
      <div className="flex items-end px-4 pt-2 gap-1">
        <button
          onClick={handleACVClick}
          className={`h-9 px-4 rounded-t-lg text-xs flex items-center gap-2 cursor-pointer transition-colors
            ${activeTab === 'acv' ? 'bg-white text-[#0E0E0F]' : 'bg-[#5a5a5a] text-[#ccc] hover:bg-[#666]'}`}
        >
          <span>🔒</span> ACV — Dealer Registration
        </button>
        <button
          onClick={handleGmailClick}
          className={`h-9 px-4 rounded-t-lg text-xs flex items-center gap-2 cursor-pointer transition-colors
            ${activeTab === 'gmail' ? 'bg-white text-[#0E0E0F]' : 'bg-[#5a5a5a] text-[#ccc] hover:bg-[#666]'}`}
        >
          📧 Gmail — jharlow@metrofordalbany.com
        </button>
      </div>
      <div className="bg-[#292929] mx-4 mb-2 rounded-full h-7 flex items-center justify-between px-4">
        <span className="text-xs text-[#999]">
          🔒 {activeTab === 'acv' ? 'acvauctions.com/register' : 'mail.google.com/mail/u/0/#inbox'}
        </span>
        {onLobby && (
          <button onClick={onLobby} className="text-xs text-[#aaa] hover:text-white border border-[#555] rounded px-2 py-0.5 cursor-pointer transition-colors">
            ← Lobby
          </button>
        )}
      </div>
    </div>
  )
}
