import { useState } from 'react'
import type { View } from '../../types'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  setApplicationCancelled?: (b: boolean) => void
  returnView?: View
}

export function MockSFCancel({ setView, setApplicationCancelled, returnView }: Props) {
  const [cancelling, setCancelling] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const handleCancel = () => {
    setCancelling(true)
    setTimeout(() => {
      setCancelling(false)
      setCancelled(true)
      setApplicationCancelled?.(true)
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-[#F3F6F9] flex flex-col">
      <ScreenLabel id="CANCEL-SF" name="Salesforce — Application Record (Specialist View)" />

      {/* SF Top nav */}
      <div className="bg-[#0C2340] h-12 flex items-center px-6 gap-8 shrink-0">
        <span className="text-white font-bold text-base">⚡ Salesforce</span>
        {['Home', 'Accounts', 'Contacts', 'Applications', 'Reports'].map(item => (
          <span key={item} className={`text-sm cursor-pointer ${item === 'Applications' ? 'text-[#F59600] font-semibold' : 'text-[#8BAFD4] hover:text-white'}`}>
            {item}
          </span>
        ))}
        <button onClick={() => setView('lobby')} className="ml-auto text-xs text-[#8BAFD4] border border-[#8BAFD4] rounded px-3 py-1 hover:text-white hover:border-white cursor-pointer">
          ← Lobby
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="px-6 py-2 text-xs text-[#0071B9]">
        Applications / Metro Ford of Albany — In Progress (Sarah Mitchell)
      </div>

      {/* Record header */}
      <div className="bg-white border-b border-[#E8E9EB] px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-bold text-xl text-[#0E0E0F]">APP-2026-00847 — Metro Ford of Albany</h2>
          <p className="text-xs text-[#55575C] mt-1">
            Application · Created May 28, 2026 · Owner: Rob Smyton · Initiated by: Sarah Mitchell
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-xs font-semibold rounded-full px-4 py-1.5 ${cancelled ? 'bg-[#FFF0F0] text-[#DC2626]' : 'bg-[#ECFDF5] text-[#00A576]'}`}>
            {cancelled ? 'Cancelled' : 'In Progress'}
          </span>
        </div>
      </div>

      {/* Specialist-only banner */}
      <div className="bg-[#FFF7ED] border-b border-[#FED7AA] px-6 py-2 flex items-center gap-2">
        <span className="text-[#92400E] font-bold text-xs uppercase tracking-wide">🔒 Reg Specialist View</span>
        <span className="text-[#92400E] text-xs">— Cancel Application button is only visible to users with the Registration Specialist role</span>
      </div>

      {/* Content */}
      <div className="flex gap-6 p-6 flex-1">

        {/* Left — fields */}
        <div className="bg-white rounded-lg border border-[#E8E9EB] p-6 flex-1">
          <p className="font-semibold text-sm text-[#0E0E0F] border-b border-[#E8E9EB] pb-3 mb-4">Application Details</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {[
              { label: 'Account Name',       value: 'Metro Ford of Albany',          link: true },
              { label: 'Primary Contact',    value: 'Sarah Mitchell',                link: true },
              { label: 'Application Owner',  value: 'Rob Smyton',                    link: false },
              { label: 'IST Account Rep',    value: 'Mike Ziewicki',                 link: false },
              { label: 'Initiated By',       value: 'Sarah Mitchell',                link: false },
              { label: 'ToS Accepted',       value: '✓ Yes — May 29, 2026',          link: false, green: true },
              { label: 'Banking Status',     value: '✓ Complete',                    link: false, green: true },
              { label: 'LPOA Status',        value: 'Sent — Pending Signature',      link: false, amber: true },
              { label: 'Application Status', value: cancelled ? 'Cancelled' : 'In Progress', link: false, red: cancelled },
              { label: 'Application Created', value: 'May 28, 2026',                link: false },
            ].map(f => (
              <div key={f.label}>
                <p className="text-xs text-[#55575C]">{f.label}</p>
                <p className={`text-sm mt-0.5 ${f.link ? 'text-[#0071B9]' : f.green ? 'text-[#00A576]' : f.amber ? 'text-[#F59600]' : (f as any).red ? 'text-[#DC2626] font-semibold' : 'text-[#0E0E0F]'}`}>
                  {f.value}
                </p>
              </div>
            ))}
          </div>

          {/* Cancel button — specialist only */}
          {!cancelled && (
            <div className="mt-8 pt-6 border-t border-[#E8E9EB]">
              <div className="bg-[#FFF0F0] border border-[#FCA5A5] rounded-xl p-4 mb-4">
                <p className="text-xs font-semibold text-[#991B1B] uppercase tracking-wide mb-1">🔒 Specialist Action Only</p>
                <p className="text-xs text-[#991B1B] leading-relaxed">
                  Cancelling this application will void all open DocuSign envelopes, reject related DealerDoc records,
                  and allow a new user to initiate fresh registration for this dealership. The Account record and
                  AuctionAccess registration are preserved. This action cannot be undone.
                </p>
              </div>
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="bg-[#DC2626] text-white rounded-lg px-6 py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#B91C1C] transition-colors disabled:opacity-60 flex items-center gap-2"
              >
                {cancelling ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Cancelling application...
                  </>
                ) : (
                  '⚠️ Cancel Application'
                )}
              </button>
            </div>
          )}

          {/* Post-cancel state */}
          {cancelled && (
            <div className="mt-8 pt-6 border-t border-[#E8E9EB]">
              <div className="bg-[#ECFDF5] border border-[#00A576] rounded-xl p-4 mb-5">
                <p className="text-sm font-semibold text-[#065F46] mb-2">✓ Application successfully cancelled</p>
                <div className="space-y-1.5 text-xs text-[#065F46]">
                  <div className="flex items-center gap-2"><span>✦</span><span>Application status → Cancelled</span></div>
                  <div className="flex items-center gap-2"><span>✦</span><span>Open DocuSign envelopes → Voided</span></div>
                  <div className="flex items-center gap-2"><span>✦</span><span>Related DealerDoc records → Rejected</span></div>
                  <div className="flex items-center gap-2"><span>✦</span><span>Account record → Maintained</span></div>
                  <div className="flex items-center gap-2"><span>✦</span><span>Dealership now available for fresh registration</span></div>
                </div>
              </div>
              <button
                onClick={() => setView(returnView ?? 'in-progress-other-user')}
                className="text-sm font-semibold text-white rounded-full px-8 py-3 cursor-pointer hover:opacity-90"
                style={{ background: 'linear-gradient(160deg, #F26522 14%, #FC4243 86%)' }}
              >
                Return to Register Dealership →
              </button>
              <p className="text-xs text-[#8D9199] mt-2">
                The dealership will now appear as available to register.
              </p>
            </div>
          )}
        </div>

        {/* Right — timeline */}
        <div className="bg-white rounded-lg border border-[#E8E9EB] p-6 w-80 shrink-0">
          <p className="font-semibold text-sm text-[#0E0E0F] border-b border-[#E8E9EB] pb-3 mb-4">Activity Timeline</p>
          <div className="space-y-4 text-xs text-[#55575C]">
            {[
              { icon: '📧', color: '#2D1D87', time: 'May 30',  text: 'DocuSign envelope sent — LPOA + Tax Resale Cert' },
              { icon: '✓',  color: '#00A576', time: 'May 30',  text: 'Terms of Service accepted by Sarah Mitchell' },
              { icon: '🏦', color: '#0077D8', time: 'May 29',  text: 'JPMorgan validation complete — Chase ••••4821 VERIFIED' },
              { icon: '⚡', color: '#F59600', time: 'May 28',  text: 'Application created — assigned to Rob Smyton' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: item.color }}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-[#0E0E0F] text-xs leading-snug">{item.text}</p>
                  <p className="text-[#8D9199] text-[10px] mt-0.5">{item.time}, 2026</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
