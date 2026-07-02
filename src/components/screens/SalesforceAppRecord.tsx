import type { ReactNode } from 'react'
import type { View } from '../../types'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  taxResaleRequired: boolean
}

interface FieldDef {
  label: string
  value: string
  link?: boolean
  green?: boolean
  amber?: boolean
  red?: boolean
  muted?: boolean
  integration?: boolean
  note?: string
  span?: boolean
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-lg border border-[#E8E9EB] p-6">
      <p className="font-semibold text-sm text-[#0E0E0F] border-b border-[#E8E9EB] pb-3 mb-4">{title}</p>
      {children}
    </div>
  )
}

function FieldGrid({ fields }: { fields: FieldDef[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-5">
      {fields.map(f => (
        <div key={f.label} className={f.span ? 'col-span-2' : ''}>
          <p className="text-xs text-[#55575C] flex items-center gap-1">
            {f.label}
            {f.integration && (
              <span className="text-[9px] font-semibold text-[#0071B9] bg-[#EFF6FF] rounded px-1.5 py-0.5 uppercase tracking-wide">🔒 Integration</span>
            )}
          </p>
          <p className={`text-sm mt-0.5 ${
            f.link ? 'text-[#0071B9]' :
            f.green ? 'text-[#00A576] font-medium' :
            f.amber ? 'text-[#F59600] font-medium' :
            f.red ? 'text-[#DC2626] font-medium' :
            f.muted ? 'text-[#8D9199] italic' :
            'text-[#0E0E0F]'
          }`}>
            {f.value}
          </p>
          {f.note && <p className="text-[10px] text-[#8D9199] mt-0.5">{f.note}</p>}
        </div>
      ))}
    </div>
  )
}

export function SalesforceAppRecord({ setView, taxResaleRequired }: Props) {
  const state    = taxResaleRequired ? 'New York' : 'Idaho'
  const stateAbbr = taxResaleRequired ? 'NY' : 'ID'
  const daysOpen = taxResaleRequired ? 12 : 7
  const recordNum = taxResaleRequired ? 'APP-2026-00847' : 'APP-2026-00851'

  const timelineEvents = [
    taxResaleRequired
      ? { icon: '✓', color: '#00A576', time: 'Jun 2',  text: 'Tax Resale Request Status → Received' }
      : null,
    { icon: '✓',  color: '#00A576', time: 'Jun 1',  text: 'LPOA Request Status → Received' },
    taxResaleRequired
      ? { icon: '📧', color: '#2D1D87', time: 'May 30', text: 'DocuSign envelope sent — LPOA + Tax Resale Cert' }
      : { icon: '📧', color: '#2D1D87', time: 'May 30', text: 'DocuSign envelope sent — LPOA only' },
    { icon: '✓',  color: '#00A576', time: 'May 29', text: 'Terms of Service accepted by Sarah Mitchell' },
    { icon: '🏦', color: '#0077D8', time: 'May 28', text: 'AA Account selected as primary — Banking complete' },
    { icon: '📋', color: '#55575C', time: 'May 26', text: 'Dealership Information complete' },
    { icon: '⚡', color: '#F59600', time: 'May 21', text: `Application created — assigned to Rob Smyton` },
  ].filter(Boolean) as { icon: string; color: string; time: string; text: string }[]

  return (
    <div className="min-h-screen bg-[#F3F6F9] flex flex-col">
      <ScreenLabel
        id={taxResaleRequired ? 'SF-APP-TR' : 'SF-APP-NO-TR'}
        name={`Salesforce — Application Record (${taxResaleRequired ? 'Tax Resale Required' : 'No Tax Resale'})`}
      />

      {/* SF top nav */}
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
        Applications / {recordNum} — Metro Ford of Albany, {stateAbbr}
      </div>

      {/* Record header */}
      <div className="bg-white border-b border-[#E8E9EB] px-6 py-4 shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-xl text-[#0E0E0F]">{recordNum} — Metro Ford of Albany, {state}</h2>
            <p className="text-xs text-[#55575C] mt-1">Application · Created May 21, 2026 · Owner: Rob Smyton · Initiated by: Sarah Mitchell</p>
          </div>
          <span className="text-xs font-semibold rounded-full px-4 py-1.5 bg-[#EFF6FF] text-[#0061A5]">Under Review</span>
        </div>

        {/* Highlights bar */}
        <div className="flex gap-10 mt-4 pt-4 border-t border-[#E8E9EB]">
          <div>
            <p className="text-xs text-[#55575C]">Document Collection</p>
            <p className="text-sm font-semibold text-[#00A576]">100%</p>
          </div>
          <div>
            <p className="text-xs text-[#55575C]">Days Open</p>
            <p className="text-sm font-semibold text-[#0E0E0F]">{daysOpen} days</p>
          </div>
          <div>
            <p className="text-xs text-[#55575C]">SLA Flag</p>
            <p className={`text-sm font-semibold ${taxResaleRequired ? 'text-[#F59600]' : 'text-[#00A576]'}`}>
              {taxResaleRequired ? 'At Risk' : 'On Track'}
            </p>
          </div>
          <div>
            <p className="text-xs text-[#55575C]">Banking Method</p>
            <p className="text-sm font-semibold text-[#0E0E0F]">AA Account</p>
          </div>
          <div>
            <p className="text-xs text-[#55575C]">Tax Resale Required</p>
            <p className={`text-sm font-semibold ${taxResaleRequired ? 'text-[#00A576]' : 'text-[#8D9199]'}`}>
              {taxResaleRequired ? `✓ Yes (${state})` : '— No (Idaho)'}
            </p>
          </div>
        </div>
      </div>

      {/* Specialist banner */}
      <div className="bg-[#FFF7ED] border-b border-[#FED7AA] px-6 py-2 flex items-center gap-2">
        <span className="text-[#92400E] font-bold text-xs uppercase tracking-wide">🔒 Reg Specialist View</span>
        <span className="text-[#92400E] text-xs">— Integration-written fields are read-only. Override requires Reg Specialist permission set.</span>
      </div>

      {/* Main content */}
      <div className="flex gap-6 p-6 flex-1 items-start">

        {/* Left — detail sections */}
        <div className="flex-1 space-y-5 min-w-0">

          {/* Application Information */}
          <Section title="Application Information">
            <FieldGrid fields={[
              { label: 'Account',            value: 'Metro Ford of Albany',  link: true },
              { label: 'Application Owner',  value: 'Rob Smyton' },
              { label: 'Primary Contact',    value: 'Sarah Mitchell',        link: true },
              { label: 'IST Account Rep',    value: 'Mike Ziewicki' },
              { label: 'Application Stage',  value: 'Under Review' },
              { label: 'Application Created', value: 'May 21, 2026' },
              { label: 'Initiated By',       value: 'Sarah Mitchell' },
              { label: 'Declined Reason',    value: '—', muted: true },
            ]} />
          </Section>

          {/* Dealership Information */}
          <Section title="Dealership Information">
            <div className="mb-5 pb-5 border-b border-[#F0F0F0]">
              <p className="text-[10px] text-[#8D9199] uppercase tracking-wider font-semibold mb-3">Auto-populated from AuctionAccess — read only</p>
              <FieldGrid fields={[
                { label: 'Contact Name',     value: 'Sarah Mitchell',                                muted: true },
                { label: 'Dealership',       value: `Metro Ford of Albany, ${state}`,                muted: true },
                { label: 'Email',            value: 'smitchell@metrofordalbany.com',                 muted: true },
                { label: 'Office Phone',     value: '(518) 555-0192 ext. 101',                       muted: true },
                { label: 'Business Address', value: `1450 Central Ave, Albany, ${stateAbbr} 83705`,  muted: true },
              ]} />
            </div>
            <FieldGrid fields={[
              { label: 'Dealership Info Complete',                value: '✓ Yes',            green: true },
              { label: 'Dealer Type',                            value: 'Franchise' },
              { label: 'Mobile Number',                          value: '(518) 555-0198' },
              { label: 'Dealer Group Name',                      value: 'Capital Auto Group' },
              { label: 'SMS Opt-In',                             value: '✓ Yes',            green: true },
              { label: 'Products of Interest',                   value: 'Buy, Sell' },
              { label: 'Are You the Primary Contact?',           value: 'Yes' },
              { label: 'Is Primary Contact = Billing Contact?',  value: 'Yes' },
            ]} />
          </Section>

          {/* Terms of Service */}
          <Section title="Terms of Service">
            <FieldGrid fields={[
              { label: 'ToS Accepted',      value: '✓ Yes',                green: true },
              { label: 'ToS Accepted Date', value: 'May 29, 2026 9:14 AM' },
              { label: 'ToS Accepted By',   value: 'Sarah Mitchell',        link: true },
            ]} />
          </Section>

          {/* Banking */}
          <Section title="Banking">
            <FieldGrid fields={[
              { label: 'Primary Account Banking Method',        value: 'AA Account' },
              { label: 'Bank Account Verified',                 value: '✓ Yes',  green: true, integration: true,
                note: 'Written by NetSuite (JPMorgan validation). Read-only.' },
              { label: 'Bank Account Verification Override',    value: '—',      muted: true,
                note: '🔒 Reg Specialist permission set required. Conditional feature — pending business sign-off.' },
              { label: 'Bank Account Verification Override Reason', value: '—',  muted: true },
              { label: 'Override Date',                         value: '—',      muted: true },
              { label: 'Override By',                           value: '—',      muted: true },
            ]} />
          </Section>

          {/* LPOA */}
          <Section title="LPOA">
            <FieldGrid fields={[
              { label: 'LPOA Request Status',       value: 'Received',  green: true,
                note: 'Driven by most recent DDCR where Method = LPOA or Both.' },
              { label: 'LPOA Dealer Doc Approved',  value: '✓ Yes',     green: true,
                note: 'Locked after approval. Drives approval gate — not progress bar.' },
            ]} />
          </Section>

          {/* Tax Resale Certificate — conditional */}
          {taxResaleRequired ? (
            <Section title="Tax Resale Certificate">
              <FieldGrid fields={[
                { label: 'Tax Resale Required',            value: `✓ Yes (${state})`,  green: true },
                { label: 'Tax Resale Collection Method',   value: 'DocuSign' },
                { label: 'Tax Resale Request Status',      value: 'Received',           green: true,
                  note: 'DocuSign path: Sent → Opened → Received. Manual path: New → Sent → Received.' },
                { label: 'Tax Resale Dealer Doc Approved', value: '✓ Yes',              green: true,
                  note: 'Locked after approval. Drives approval gate — not progress bar.' },
              ]} />
            </Section>
          ) : (
            <div className="bg-[#F7F7F8] border border-[#E8E9EB] border-l-4 border-l-[#8D9199] rounded-lg px-5 py-4">
              <p className="text-sm font-semibold text-[#55575C]">Tax Resale Certificate — Section Hidden</p>
              <p className="text-xs text-[#8D9199] mt-1 leading-relaxed">
                <strong>Tax Resale Required = false</strong> for Idaho. This entire section is hidden on the page layout via conditional logic.
                Tax Resale Dealer Doc Approved is excluded from the approval gate for this application.
                The progress bar renders 4 steps (no Tax Resale step).
              </p>
            </div>
          )}

          {/* Visibility & Monitoring */}
          <Section title="Visibility & Monitoring">
            <FieldGrid fields={[
              { label: 'Document Collection %', value: '100%',
                green: true, note: 'Reflects docs in hand (Request Status = Received), not merely sent.' },
              { label: 'Days Open',  value: `${daysOpen} days`,
                note: 'Formula: TODAY() − CreatedDate' },
              { label: 'SLA Flag',
                value: taxResaleRequired ? 'At Risk' : 'On Track',
                amber: taxResaleRequired,
                green: !taxResaleRequired,
                note: 'Thresholds: TBD — pending business + reg specialist leadership definition.' },
            ]} />
            <div className="mt-4 bg-[#FFF7ED] border border-[#FED7AA] rounded-lg p-3">
              <p className="text-xs text-[#92400E]">
                ⚠️ <strong>SLA thresholds are placeholder values.</strong> On Track / At Risk / Overdue day counts must be defined and confirmed by the business before this field can be built.
              </p>
            </div>
          </Section>

          {/* Approval gate summary */}
          <Section title="Approval Gate">
            <p className="text-xs text-[#55575C] mb-4">All conditions must be true before this application can be approved. Approval removes the Account's "Never Activated" inactive reason.</p>
            <div className="space-y-2">
              {[
                { label: 'ToS Accepted',                  met: true },
                { label: 'Primary Account Banking Method has value', met: true },
                { label: 'Bank Account Verified (or Override)', met: true },
                { label: 'LPOA Dealer Doc Approved',       met: true },
                { label: 'Tax Resale Dealer Doc Approved', met: taxResaleRequired, na: !taxResaleRequired },
              ].map(gate => (
                <div key={gate.label} className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 ${gate.na ? 'bg-[#D1D3D6]' : gate.met ? 'bg-[#00A576]' : 'bg-[#DC2626]'}`}>
                    {gate.na ? '—' : gate.met ? '✓' : '✗'}
                  </span>
                  <span className={`text-xs ${gate.na ? 'text-[#8D9199] italic' : 'text-[#0E0E0F]'}`}>
                    {gate.label}
                    {gate.na && ' — not required for this application'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-[#E8E9EB]">
              <div className="bg-[#ECFDF5] border border-[#00A576] rounded-lg p-3 inline-flex items-center gap-2">
                <span className="text-[#00A576] font-bold text-sm">✓</span>
                <span className="text-sm text-[#065F46] font-medium">All conditions met — eligible for approval</span>
              </div>
            </div>
          </Section>

        </div>

        {/* Right — activity timeline */}
        <div className="bg-white rounded-lg border border-[#E8E9EB] p-6 w-80 shrink-0">
          <p className="font-semibold text-sm text-[#0E0E0F] border-b border-[#E8E9EB] pb-3 mb-4">Activity Timeline</p>
          <div className="space-y-4 text-xs text-[#55575C]">
            {timelineEvents.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-[#0E0E0F] text-xs leading-snug">{item.text}</p>
                  <p className="text-[#8D9199] text-[10px] mt-0.5">{item.time}, 2026</p>
                </div>
              </div>
            ))}
          </div>

          {/* Related lists callout */}
          <div className="mt-6 pt-5 border-t border-[#E8E9EB]">
            <p className="font-semibold text-sm text-[#0E0E0F] mb-3">Related Lists</p>
            <div className="space-y-2">
              {[
                { label: 'DDCR Records', count: taxResaleRequired ? 2 : 1 },
                { label: 'DealerDoc Records', count: taxResaleRequired ? 2 : 1 },
              ].map(r => (
                <div key={r.label} className="flex items-center justify-between text-xs">
                  <span className="text-[#0071B9] cursor-pointer hover:underline">{r.label}</span>
                  <span className="bg-[#EFF6FF] text-[#0061A5] rounded-full px-2 py-0.5 font-semibold">{r.count}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#8D9199] mt-3 leading-relaxed">No lookup fields to DDCR or DealerDoc. Related lists only — Application record reads the most recent record per doc type via automation.</p>
          </div>
        </div>

      </div>
    </div>
  )
}
