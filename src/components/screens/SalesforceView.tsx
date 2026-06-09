import type { View, DocSignStatus } from '../../types'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  sfReturnView: View
  dealerGroup: 'yes' | 'no' | null
  docSignStatus?: DocSignStatus
}

const fields = [
  { label: 'Account Name', value: 'Metro Ford of Albany', link: true },
  { label: 'Primary Contact', value: 'James Harlow', link: true },
  { label: 'Application Owner', value: 'Rob Smyton', link: false },
  { label: 'IST Account Rep', value: 'Mike Ziewicki', link: false },
  { label: 'Account Owner (TM)', value: 'Patty Vadella', link: false },
  { label: 'Dealer Type', value: 'Franchise', link: false },
  { label: 'ToS Accepted', value: '✓ Yes — Jun 1, 2026 2:14 PM | James Harlow', link: false, green: true },
  { label: 'ToS Status', value: 'Verified', link: false, green: true },
  { label: 'Banking Collection Status', value: '✓ Complete', link: false, green: true },
  { label: 'LPOA Status', value: 'DYNAMIC_LPOA', link: false, dynamicLpoa: true },
  { label: 'Tax Resale Status', value: 'DYNAMIC_TAX', link: false, dynamicTax: true },
  { label: 'AA Registration Status', value: '✓ Registered (Read-Only)', link: false, green: true },
  { label: 'NetSuite Account', value: '✓ Created — MFA-2026-00847', link: false, green: true },
  { label: 'Application Created', value: 'Jun 1, 2026', link: false },
  { label: 'Last Modified', value: 'Jun 1, 2026 2:59 PM', link: false },
]

const timeline = [
  { color: '#2D1D87', icon: '✍', time: '2:59 PM', title: 'DocuSign envelope sent — LPOA + Tax Resale Cert', sub: 'jharlow@metrofordalbany.com' },
  { color: '#00A576', icon: '✓', time: '2:45 PM', title: 'Terms of Service accepted', sub: 'James Harlow | ToS Status → Verified' },
  { color: '#0077D8', icon: '🏦', time: '2:30 PM', title: 'JPMorgan validation complete — Chase ••••4821 VERIFIED', sub: 'Banking Collection Status → Complete' },
  { color: '#F59600', icon: '⚡', time: '2:15 PM', title: 'Real-time notifications sent', sub: 'Mike Ziewicki (IST Rep) + Patty Vadella (TM — Franchise)' },
  { color: '#0C2340', icon: '✦', time: '2:10 PM', title: 'Salesforce records created', sub: 'Contact: James Harlow | Account: Metro Ford of Albany | Affiliation + Application' },
  { color: '#55575C', icon: '✦', time: '2:10 PM', title: 'Application assigned to Rob Smyton (round-robin)', sub: 'AA Registration API call sent — read-only access' },
  { color: '#55575C', icon: '✦', time: '2:08 PM', title: 'NetSuite account created — MFA-2026-00847', sub: 'Bank records pulled from AA → JPMorgan validation initiated' },
]

export function SalesforceView({ setView, sfReturnView, dealerGroup, docSignStatus }: Props) {
  const lpoaValue = docSignStatus?.lpoa === 'received' ? '✓ Received' : 'Sent — Pending Signature'
  const lpoaGreen = docSignStatus?.lpoa === 'received'
  const taxValue = docSignStatus?.taxResale === 'received' ? '✓ Received'
    : docSignStatus?.taxResale === 'not-required' ? '— Not Required'
    : docSignStatus?.taxResale === 'manual' ? 'Manual Collection — Specialist'
    : 'Sent — Pending Signature'
  const taxGreen = docSignStatus?.taxResale === 'received'
  const taxAmber = docSignStatus?.taxResale === 'pending' || docSignStatus?.taxResale === 'manual'
  return (
    <div className="min-h-screen bg-[#F3F6F9] flex flex-col">
      <ScreenLabel id="SF-1" name="Salesforce — Application Record" />
      {/* Top nav */}
      <div className="bg-[#0C2340] h-12 flex items-center px-6 gap-8 shrink-0">
        <span className="text-white font-bold text-base">⚡ Salesforce</span>
        {['Home', 'Accounts', 'Contacts', 'Applications', 'Reports'].map(item => (
          <span key={item} className={`text-sm cursor-pointer ${item === 'Applications' ? 'text-[#F59600] font-semibold' : 'text-[#8BAFD4] hover:text-white'}`}>
            {item}
          </span>
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="px-6 py-2 text-xs text-[#0071B9]">
        Applications / Metro Ford of Albany — New Registration
      </div>

      {/* Record header */}
      <div className="bg-white border-b border-[#E8E9EB] px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <h2 className="font-bold text-xl text-[#0E0E0F]">APP-2026-00847 — Metro Ford of Albany</h2>
          <p className="text-xs text-[#55575C] mt-1">Application • Created Jun 1, 2026 • Owner: Rob Smyton</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="bg-[#ECFDF5] text-[#00A576] text-xs font-semibold rounded-full px-4 py-1.5">In Progress</span>
          <button
            onClick={() => setView(sfReturnView)}
            className="text-sm text-[#0071B9] cursor-pointer hover:underline"
          >
            ← Back to registration flow
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex gap-6 p-6 flex-1">
        {/* Left: fields */}
        <div className="bg-white rounded-lg border border-[#E8E9EB] p-6 flex-1">
          <p className="font-semibold text-sm text-[#0E0E0F] border-b border-[#E8E9EB] pb-3 mb-4">Application Details</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {fields.map(f => {
              const isLpoa = (f as any).dynamicLpoa
              const isTax = (f as any).dynamicTax
              const value = isLpoa ? lpoaValue : isTax ? taxValue : f.value
              const isGreen = isLpoa ? lpoaGreen : isTax ? taxGreen : f.green
              const isAmber = isLpoa ? !lpoaGreen : isTax ? taxAmber : (f as any).amber
              return (
                <div key={f.label}>
                  <p className="text-xs text-[#55575C]">{f.label}</p>
                  <p className={`text-sm mt-0.5 ${f.link ? 'text-[#0071B9]' : isGreen ? 'text-[#00A576]' : isAmber ? 'text-[#F59600]' : 'text-[#0E0E0F]'}`}>
                    {value}
                  </p>
                </div>
              )
            })}
            {dealerGroup !== null && (
              <div>
                <p className="text-xs text-[#55575C]">Dealer Group</p>
                <p className={`text-sm mt-0.5 ${dealerGroup === 'yes' ? 'text-[#F59600]' : 'text-[#0E0E0F]'}`}>
                  {dealerGroup === 'yes' ? 'Yes' : 'No'}
                </p>
              </div>
            )}
          </div>

          {dealerGroup === 'yes' && (
            <div className="mt-5 bg-[#FFFBEB] border border-[#F59600] rounded-lg p-3">
              <p className="text-sm text-[#92400E]">
                ⚡ Dealer Group flagged → View in Janelle's Major Teams Report
              </p>
              <span className="text-[#0071B9] text-sm cursor-pointer hover:underline">Go to Report →</span>
            </div>
          )}
        </div>

        {/* Right: timeline */}
        <div className="bg-white rounded-lg border border-[#E8E9EB] p-6 w-[480px] shrink-0 overflow-y-auto">
          <p className="font-semibold text-sm text-[#0E0E0F] border-b border-[#E8E9EB] pb-3 mb-4">Activity & Notifications</p>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4 relative">
                {i < timeline.length - 1 && (
                  <div className="absolute left-3.5 top-7 w-0.5 bg-[#E8E9EB]" style={{ height: 'calc(100% - 4px)' }} />
                )}
                <div
                  className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-white text-xs font-bold z-10"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <div className="pb-6">
                  <p className="text-xs text-[#55575C]">{item.time}</p>
                  <p className="text-sm text-[#0E0E0F] font-medium">{item.title}</p>
                  <p className="text-xs text-[#55575C]">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* DocuSign SLA */}
          <div className="mt-4 pt-4 border-t border-[#E8E9EB]">
            <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-3">DocuSign Follow-up SLAs</p>
            <div className="bg-[#FFFBEB] border border-[#F59600] rounded-lg p-3 mb-2">
              <p className="text-xs text-[#92400E] font-semibold">⏰ 24hr SLA — Automated reminder email scheduled</p>
              <p className="text-xs text-[#92400E] mt-1">If unsigned by Jun 2, 2026 2:59 PM — reminder sends automatically to James Harlow, logged to Application record.</p>
            </div>
            <div className="bg-[#FFF0F0] border border-[#E53E3E] rounded-lg p-3">
              <p className="text-xs text-[#991B1B] font-semibold">📞 48hr SLA — Task auto-assigned to Rob Smyton</p>
              <p className="text-xs text-[#991B1B] mt-1">If still unsigned by Jun 3, 2026 2:59 PM — call task created and assigned to application owner.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
