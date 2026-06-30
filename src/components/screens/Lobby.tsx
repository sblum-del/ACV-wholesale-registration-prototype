import { useState } from 'react'
import type { View, ActiveScenario } from '../../types'
import { PrimaryButton } from '../shared/PrimaryButton'

interface Props {
  setView: (v: View) => void
  setActiveScenario: (s: ActiveScenario) => void
  startScenario: (s: ActiveScenario) => void
}

const TAG: Record<string, { label: string; cls: string }> = {
  'standard':  { label: 'Standard Registration', cls: 'bg-[#EFF6FF] text-[#0061A5]' },
  'state':     { label: 'State Variant',          cls: 'bg-[#F0FDF4] text-[#166534]' },
  'banking':   { label: 'Banking Variation',      cls: 'bg-[#FFF7ED] text-[#9A3412]' },
  'identity':  { label: 'Identity & Access',      cls: 'bg-[#FAF5FF] text-[#6B21A8]' },
  'join':      { label: 'Join Flow',              cls: 'bg-[#F0FDF4] text-[#166534]' },
  'existing':  { label: 'Existing User',          cls: 'bg-[#EEF2FF] text-[#3730A3]' },
  'resume':    { label: 'Resume Registration',    cls: 'bg-[#EFF6FF] text-[#0077D8]' },
}

const scenarios = [
  { num: 1,  id: 'S1',  type: 'standard', scenario: 's1',  clickable: true,  title: 'Net-New User · Single Dealership · Single Verified Bank Account', state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign', desc: 'First-time ACV user. AA validates identity, one dealership available. Bank account on file and JPMorgan-verified. Full flow start to finish.' },
  { num: 1.1, id: 'S1B', type: 'standard', scenario: 's1b', clickable: true,  title: 'Scenario 1 — Qualifying Questions Baked into Dealership Info', state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign', desc: 'Same as Scenario 1, but contact & product questions are folded into the Dealership Information screen. Flow ends at Schedule Demo — no standalone Qualifying Questions screen.' },
  { num: 2,  id: 'S2',  type: 'standard', scenario: 's2',  clickable: true,  title: 'Net-New User · Multiple Dealerships Available · Single Verified Bank Account', state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign', desc: 'First-time ACV user affiliated with 4 dealerships, all net-new to ACV. User selects one dealership to register.' },
  { num: 3,  id: 'S3',  type: 'banking',  scenario: 's3',  clickable: true,  title: 'Net-New User · Single Dealership · Multiple Verified Bank Accounts', state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign', desc: 'Multiple bank accounts from AuctionAccess, all validated by JPMorgan. User designates one as primary.' },
  { num: 4,  id: 'S4',  type: 'state',    scenario: 's4',  clickable: true,  title: 'Net-New User · Single Dealership · Alabama — Manual Tax Resale Collection', state: '📍 Alabama — LPOA via DocuSign · Tax Resale via Specialist', desc: 'Alabama requires Tax Resale Cert but not via DocuSign. LPOA sent automatically. Specialist collects cert offline.' },
  { num: 5,  id: 'S5',  type: 'state',    scenario: 's5',  clickable: true,  title: 'Net-New User · Single Dealership · Oregon — No Tax Resale Required', state: '📍 Oregon — LPOA Only via DocuSign', desc: 'Oregon does not require Tax Resale Certificate. DocuSign sends LPOA only. Progress bar reflects throughout.' },
  { num: 6,  id: 'S6',  type: 'banking',  scenario: 's6',  clickable: true,  title: 'Net-New User · Single Dealership · Mixed JPMorgan Results', state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign', desc: '4 bank accounts on file: 2 pass JPMorgan, 2 do not. User selects from verified accounts only.' },
  { num: 7,  id: 'S9',  type: 'existing', scenario: 's9',  clickable: true,  title: 'Existing ACV User · Registering a New Dealership', state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign', desc: 'User already has an ACV account. AA recognizes email, routes to Sign In. Existing dealership shown as Registered/Joined.' },
  { num: 8,  id: 'S10', type: 'banking',  scenario: 's10', clickable: true,  title: 'Net-New User · No Bank Accounts on File in AuctionAccess', state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign', desc: 'AuctionAccess returns zero bank accounts. User completes ACH form, triggering NetSuite and JPMorgan validation.' },
  { num: 9,  id: 'S11', type: 'banking',  scenario: 's11', clickable: true,  title: 'Net-New User · All Bank Accounts Fail JPMorgan Validation', state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign', desc: '3 accounts on file, all fail. User flags their intended account, optionally submits ACH.' },
  { num: 10, id: 'S7',  type: 'identity', scenario: 's7',  clickable: true,  title: 'AuctionAccess Identity Validation Fails', state: '— No state routing reached', desc: 'User enters incorrect 100M ID or Last 4 digits. Error surfaced. No Salesforce records created.' },
  { num: 11, id: 'S8',  type: 'join',     scenario: 's8',  clickable: true,  title: 'Net-New User · All Affiliated Dealerships Already Registered — Join Flow', state: '📍 New York', desc: 'AA validates but no dealerships available to register — all already on ACV. User can join either.' },
  { num: 12, id: 'S8B', type: 'join',     scenario: 's8b', clickable: true,  title: 'Existing ACV User · All Affiliated Dealerships Already Registered — Sign In → Join', state: '📍 New York', desc: 'AA recognizes existing ACV account. After login, one dealership Joined (no action), one Registered (can join).' },
]

const resumeScenarios = [
  { num: 1, id: 'R1', scenario: 'r1', clickable: true,  title: 'Returning User — Resumes at Dealership Information', desc: 'Left before completing Dealership Info. System reads SF Application and routes directly.' },
  { num: 2, id: 'R2', scenario: 'r2', clickable: true,  title: 'Returning User — Resumes at Terms of Service', desc: 'Dealership Info complete. ToS not yet accepted. Routed directly to ToS screen.' },
  { num: 3, id: 'R3', scenario: 'r3', clickable: true,  title: 'Returning User — Resumes at Bank Account', desc: 'ToS complete. Banking Collection Status false. Routed to banking screen.' },
  { num: 4, id: 'R4', scenario: 'r4', clickable: true,  title: 'Returning User — Resumes at Documents (LPOA/Resale Cert)', desc: 'Banking complete. LPOA/Tax Resale not yet signed. Routed to DocuSign prompt.' },
  { num: 5, id: 'R5', scenario: 'r5', clickable: true,  title: 'Returning User — All Steps Complete, Awaiting ACV Review', desc: 'All steps done. Demo not yet scheduled. Status screen shown with qualifying questions + scheduling.' },
]

const inProgressScenarios = [
  { num: 1, id: 'R6',     scenario: 'r6',  clickable: true, title: 'Affiliated User — Application In Progress by Someone Else', desc: 'A different user affiliated with the same dealership sees an in-progress application they did not start. Read-only status shown — they must contact the registration specialist to take action.' },
  { num: 2, id: 'CANCEL', scenario: 'r6n', clickable: true, title: 'Net-New User — Requests Cancellation via Registration Specialist', desc: 'Net-new user encounters an in-progress application. They contact Rob Smyton to cancel. The specialist cancels via Salesforce — dealership then appears as available to register fresh.' },
]

// ── STAKEHOLDER FEEDBACK TAB ─────────────────────────────────────
function FeedbackTab() {
  return (
    <div className="flex items-center justify-center py-20 text-center px-6">
      <div>
        <p className="text-3xl mb-3">💬</p>
        <p className="font-semibold text-[#0E0E0F] text-lg">Stakeholder Feedback</p>
        <p className="text-sm text-[#55575C] mt-2 max-w-md">
          Feedback collection is being configured. Use Figma's native commenting on the prototype frames to leave feedback on specific screens.
        </p>
      </div>
    </div>
  )
}

// ── PRODUCT WIP TAB ──────────────────────────────────────────────
function WIPTab({ setView }: { setView: (v: View) => void }) {
  const [input, setInput] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)

  if (!unlocked) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white border border-[#E8E9EB] rounded-2xl p-10 max-w-sm w-full text-center shadow-sm">
        <div className="w-14 h-14 rounded-full bg-[#0C2340] flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl">🔒</span>
        </div>
        <h2 className="font-bold text-xl text-[#0E0E0F] mb-2">Product WIP</h2>
        <p className="text-sm text-[#55575C] mb-6">This section contains work-in-progress scenarios not ready for stakeholder review.</p>
        <input
          type="password"
          value={input}
          onChange={e => { setInput(e.target.value); setError(false) }}
          onKeyDown={e => e.key === 'Enter' && (input === 'seth' ? setUnlocked(true) : setError(true))}
          placeholder="Enter passcode"
          className={`w-full border rounded-lg px-4 py-3 text-sm text-center outline-none mb-3 ${error ? 'border-[#DC2626] bg-[#FFF0F0]' : 'border-[#D1D3D6] focus:border-[#0077D8]'}`}
        />
        {error && <p className="text-xs text-[#DC2626] mb-3">Incorrect passcode</p>}
        <PrimaryButton onClick={() => input === 'seth' ? setUnlocked(true) : setError(true)} className="w-full justify-center">
          Unlock
        </PrimaryButton>
      </div>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="bg-[#FFF0F0] border border-[#FCA5A5] rounded-xl px-5 py-3 mb-6 flex items-center gap-2">
        <span className="text-red-600 font-bold text-xs uppercase tracking-wide">⚠️ NOT FOR STAKEHOLDER REVIEW</span>
        <span className="text-red-600 text-xs">— Work in progress content</span>
      </div>
      <p className="text-sm text-[#55575C] mb-8">The following scenarios and features are under development and not yet ready for stakeholder review.</p>
      <div className="grid grid-cols-2 gap-5">
        {[
          { title: 'Dealer Group Registration — Centralized', desc: 'Full centralized operating model flow for Group One Automotive. 17 rooftops, net-new and existing paths.', action: () => setView('dg-intro') },
          { title: 'Dealer Group Registration — Decentralized', desc: 'Individual rooftop registration with group flag. Coming soon.', action: null },
          { title: 'Internal Spotlight: Dealer Group → Janelle\'s Team', desc: 'SF Application record flagged, report link surfaced.', action: null },
          { title: 'Internal Spotlight: DocuSign 24hr SLA', desc: 'Automated reminder email + 48hr specialist task.', action: null },
          { title: 'Internal Spotlight: Application Rejection', desc: 'SF Application in Rejected status. Pending SF detail.', action: null },
          { title: 'Internal Spotlight: Franchise Owner Notification', desc: 'Patty Vadella notification when Dealer Type = Franchise.', action: null },
        ].map((item, i) => (
          <div key={i} className="bg-white border border-[#E8E9EB] rounded-xl p-6 flex flex-col">
            <p className="font-semibold text-sm text-[#0E0E0F] mb-2">{item.title}</p>
            <p className="text-xs text-[#55575C] leading-relaxed flex-1">{item.desc}</p>
            {item.action ? (
              <PrimaryButton onClick={item.action} className="mt-4 w-full justify-center text-xs">
                Open →
              </PrimaryButton>
            ) : (
              <button className="mt-4 w-full bg-[#EBEBEF] text-[#55575C] rounded-full py-2.5 text-xs font-semibold cursor-not-allowed">
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── MAIN LOBBY ───────────────────────────────────────────────────
export function Lobby({ setView, startScenario }: Props) {
  const [activeTab, setActiveTab] = useState<'exec' | 'prototype' | 'feedback' | 'wip' | 'updated'>('exec')

  const tabs = [
    { id: 'exec',      label: 'Executive Summary' },
    { id: 'prototype', label: 'Interactive Prototype' },
    { id: 'feedback',  label: 'Stakeholder Feedback' },
    { id: 'wip',       label: '🔒 Product WIP' },
    { id: 'updated',   label: 'Updated Prototypes' },
  ] as const

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E9EB] px-10 pt-5 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-black text-xl text-[#F26522]">ACV AUCTIONS</p>
            <p className="text-xs text-[#55575C] mt-0.5">Dealer Registration Process — Interactive Prototype</p>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium cursor-pointer border-b-2 transition-colors
                ${activeTab === tab.id
                  ? 'border-[#F26522] text-[#F26522]'
                  : 'border-transparent text-[#55575C] hover:text-[#0E0E0F]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>



      {/* ── EXEC SUMMARY ── */}
      {activeTab === 'exec' && (
        <div className="max-w-4xl mx-auto px-6 py-10 w-full">
          <h1 className="font-bold text-4xl text-[#0E0E0F] mb-2">ACV Dealer Registration — V1</h1>
          <p className="text-[#55575C] text-base mb-8">Interactive prototype for internal stakeholder review.</p>

          <div className="bg-white border border-[#E8E9EB] rounded-2xl p-8 space-y-5 text-sm text-[#55575C] leading-relaxed">
            <div>
              <p className="font-bold text-sm text-[#0E0E0F] mb-2">Why it exists</p>
              <p>In V1, ACV is moving away from FormAssembly and toward a custom registration UX integrated directly with Salesforce and NetSuite. This prototype aligns the team on exact process flows, language, and requirements — so that UX can produce ACV-branded designs from a well-defined spec.</p>
            </div>
            <div>
              <p className="font-bold text-sm text-[#0E0E0F] mb-2">Design intent</p>
              <p>The screens here are directional. They do not reflect final ACV brand design. Design alignment is not the goal — process alignment is.</p>
            </div>
            <div>
              <p className="font-bold text-sm text-[#0E0E0F] mb-2">What it demonstrates</p>
              <p>Each scenario shows the customer-facing UX <em>and</em> the backend data flow: how records are created in Salesforce, how integrations with NetSuite and AuctionAccess work, and how compliance documents (POA, Tax Resale Certs) are handled via DocuSign — routed based on the dealer's state.</p>
            </div>
            <div>
              <p className="font-bold text-sm text-[#0E0E0F] mb-2">Banking assumption</p>
              <p>These flows assume JPMorgan validation completes quickly and does not create a poor customer experience. If latency becomes a concern during testing, screens can be reordered — for example, presenting demo scheduling before the banking step.</p>
            </div>
            <div>
              <p className="font-bold text-sm text-[#0E0E0F] mb-2">How to leave feedback</p>
              <p>A blue <strong>💬 Feedback</strong> button appears in the bottom-right corner of every screen. Click it, enter your name, and leave a comment on that specific screen. Others will see your comments in real time. Reference the screen label (e.g. <code className="bg-[#F7F7F8] px-1 rounded text-xs">S1-10</code>) in your comment for extra clarity.</p>
            </div>
          </div>

          <div className="mt-8">
            <PrimaryButton onClick={() => setActiveTab('prototype')} className="px-10">
              Go to Interactive Prototype →
            </PrimaryButton>
          </div>
        </div>
      )}

      {/* ── PROTOTYPE ── */}
      {activeTab === 'prototype' && (
        <div className="px-10 pt-8 pb-16">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Registration Scenarios</h2>
          <p className="text-sm text-[#55575C] mb-8 max-w-3xl">Select a scenario to begin. Each screen displays a label (e.g. <code className="bg-[#F7F7F8] px-1 rounded text-xs">S1-10</code>) in the bottom-left corner — reference it when leaving feedback.</p>

          <div className="grid grid-cols-3 gap-5 mb-12">
            {scenarios.map(s => {
              const tag = TAG[s.type] ?? TAG['standard']
              return (
                <div key={s.id} className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#F26522] p-6 flex flex-col hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-[#0E0E0F]">Scenario {s.num}</span>
                    <span className={`text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${tag.cls}`}>{tag.label}</span>
                  </div>
                  <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">{s.title}</p>
                  <p className="text-xs text-[#55575C] mb-2">{s.state}</p>
                  <p className="text-xs text-[#55575C] leading-relaxed flex-1">{s.desc}</p>
                  {s.clickable ? (
                    <PrimaryButton onClick={() => startScenario(s.scenario as ActiveScenario)} className="mt-5 w-full justify-center">
                      Start →
                    </PrimaryButton>
                  ) : (
                    <button className="mt-5 w-full bg-[#EBEBEF] text-[#55575C] rounded-full py-3 text-sm font-semibold cursor-not-allowed">Coming Soon</button>
                  )}
                </div>
              )
            })}
          </div>

          <p className="text-xs tracking-[0.12em] text-[#55575C] font-semibold uppercase mb-4">Returning User — Resume Registration</p>
          <div className="bg-white border border-[#E8E9EB] rounded-xl px-6 py-4 mb-5 max-w-4xl">
            <p className="text-sm text-[#55575C] leading-relaxed">
              <span className="font-semibold text-[#0E0E0F]">How resuming works.</span> Registration progress is tied to a single verified AuctionAccess user. The same user who initiated can return and resume at any checkpoint. A different affiliated user cannot resume — they see the current status and must contact a specialist to take further action.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 mb-12">
            {resumeScenarios.map(s => (
              <div key={s.id} className="bg-white rounded-xl border border-[#E8E9EB] p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0E0E0F]">Resume {s.num}</span>
                  <span className={`text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 ${TAG['resume'].cls}`}>{TAG['resume'].label}</span>
                </div>
                <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-2">{s.title}</p>
                <p className="text-xs text-[#55575C] leading-relaxed flex-1">{s.desc}</p>
                {s.clickable ? (
                  <PrimaryButton onClick={() => startScenario(s.scenario as ActiveScenario)} className="mt-5 w-full justify-center">
                    Start →
                  </PrimaryButton>
                ) : (
                  <button className="mt-5 w-full bg-[#EBEBEF] text-[#55575C] rounded-full py-3 text-sm font-semibold cursor-not-allowed">Coming Soon</button>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs tracking-[0.12em] text-[#55575C] font-semibold uppercase mb-4">Dealership Registration — Application Already In Progress</p>
          <div className="bg-white border border-[#E8E9EB] rounded-xl px-6 py-4 mb-5 max-w-4xl">
            <p className="text-sm text-[#55575C] leading-relaxed">
              <span className="font-semibold text-[#0E0E0F]">When another user already started registration.</span> If a different affiliated user initiated registration for the same dealership, the current user cannot resume or take over. They must either wait for that user to complete, or contact a registration specialist to cancel the existing application and start fresh.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {inProgressScenarios.map(s => (
              <div key={s.id} className="bg-white rounded-xl border border-[#E8E9EB] p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0E0E0F]">In Progress {s.num}</span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#FFF7ED] text-[#C2410C]">Application In Progress</span>
                </div>
                <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-2">{s.title}</p>
                <p className="text-xs text-[#55575C] leading-relaxed flex-1">{s.desc}</p>
                <PrimaryButton onClick={() => startScenario(s.scenario as ActiveScenario)} className="mt-5 w-full justify-center">
                  Start →
                </PrimaryButton>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── FEEDBACK TAB ── */}
      {activeTab === 'feedback' && <FeedbackTab />}

      {/* ── WIP TAB ── */}
      {activeTab === 'wip' && <WIPTab setView={setView} />}

      {/* ── UPDATED PROTOTYPES TAB ── */}
      {activeTab === 'updated' && (
        <div className="px-10 pt-8 pb-16">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Updated Prototypes</h2>
          <p className="text-sm text-[#55575C] mb-2 max-w-3xl">
            Revised flows incorporating product and legal updates. These run in parallel with the original scenarios — use them to review and validate changes before they replace the originals.
          </p>
          <div className="bg-[#EFF6FF] border border-[#BFD9F7] rounded-xl px-5 py-3 mb-8 max-w-3xl">
            <p className="text-sm text-[#004E7D]">
              <span className="font-semibold">What's updated:</span> Progress bar simplified · 5M ID on dealership selection · Editable email on credential creation · Consolidated dealership info screen with expanded contact collection · ToS streamlined to checkbox-only acceptance · "Limited Power of Attorney" used throughout.
            </p>
          </div>

          {/* ── Base Scenario ── */}
          <div className="grid grid-cols-3 gap-5 mb-12">
            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0077D8] p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#0E0E0F]">80% Cohort</span>
                <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#EFF6FF] text-[#0061A5]">Base Scenario</span>
              </div>
              <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">
                Net-New User · Single Dealership · Single Verified Bank Account
              </p>
              <p className="text-xs text-[#55575C] mb-2">📍 Idaho — Limited Power of Attorney + Tax Resale Cert via DocuSign</p>
              <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                States that require both LPOA and Tax Resale Cert — collected together in one DocuSign envelope. Progress bar shows them on a single combined row.
              </p>
              <PrimaryButton onClick={() => startScenario('v2-base')} className="mt-5 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>
          </div>

          {/* ── Tax Resale Variation ── */}
          <div className="mb-3">
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-1">Tax Resale Variation</h3>
            <p className="text-sm text-[#55575C] mb-6 max-w-2xl">
              Same base flow — differs only in how the Tax Resale Certificate is collected, which affects the progress bar and post-banking screens.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 mb-12">
            {/* 15% Cohort */}
            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#F26522] p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#0E0E0F]">15% Cohort</span>
                <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#FFF7ED] text-[#9A3412]">Tax Resale Variation</span>
              </div>
              <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">
                Net-New User · Single Dealership · Single Verified Bank Account
              </p>
              <p className="text-xs text-[#55575C] mb-2">📍 Alabama — LPOA via DocuSign · Tax Resale Cert via Specialist</p>
              <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                States that require Tax Resale Cert but collect it manually — LPOA via DocuSign, Tax Resale via specialist outreach. Progress bar shows separate rows for each.
              </p>
              <PrimaryButton onClick={() => startScenario('v2-15pct')} className="mt-5 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>

            {/* 5% Cohort */}
            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#00A576] p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#0E0E0F]">5% Cohort</span>
                <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F0FDF4] text-[#166534]">Tax Resale Variation</span>
              </div>
              <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">
                Net-New User · Single Dealership · Single Verified Bank Account
              </p>
              <p className="text-xs text-[#55575C] mb-2">📍 Oregon — Limited Power of Attorney Only via DocuSign</p>
              <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                States that don't require a Tax Resale Certificate at all. LPOA only via DocuSign. Progress bar shows no Tax Resale row.
              </p>
              <PrimaryButton onClick={() => startScenario('v2-5pct')} className="mt-5 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>
          </div>

          {/* ── Banking Variation ── */}
          <div className="mb-3">
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-1">Banking Variation</h3>
            <p className="text-sm text-[#55575C] mb-6 max-w-2xl">
              Same base flow and Tax Resale handling — differs only in the banking screen based on what AuctionAccess returns and JPMorgan validation results.
            </p>
          </div>

          {/* Row 1 — No accounts + Many accounts all open */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#8B5CF6] p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#0E0E0F]">No AA Bank Accounts</span>
                <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F5F3FF] text-[#5B21B6]">Banking Variation</span>
              </div>
              <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">
                Net-New User · Single Dealership · No Accounts on File
              </p>
              <p className="text-xs text-[#55575C] mb-2">📍 Idaho — Limited Power of Attorney + Tax Resale Cert via DocuSign</p>
              <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                AuctionAccess returns zero bank accounts. No NetSuite records created. User is routed directly to the ACH form — no banking selection screen shown.
              </p>
              <PrimaryButton onClick={() => startScenario('v2-banking-no-accounts')} className="mt-5 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>

            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#8B5CF6] p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#0E0E0F]">Multiple Accounts — All Open</span>
                <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F5F3FF] text-[#5B21B6]">Banking Variation</span>
              </div>
              <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">
                Net-New User · Single Dealership · 3 Verified Open Accounts
              </p>
              <p className="text-xs text-[#55575C] mb-2">📍 Idaho — Limited Power of Attorney + Tax Resale Cert via DocuSign</p>
              <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                AuctionAccess returns 3 bank accounts. JPMorgan confirms all are open and active. Dealer selects one as primary — ACH is still available as an alternative.
              </p>
              <PrimaryButton onClick={() => startScenario('v2-banking-many')} className="mt-5 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>
          </div>

          {/* Row 2 — Closed account display (sub-labeled) */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-4">
              If we display the closed bank account status confirmed by JPMorgan to the customer
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#8B5CF6] p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#0E0E0F]">Multiple Accounts — One Closed</span>
                <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F5F3FF] text-[#5B21B6]">Banking Variation</span>
              </div>
              <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">
                Net-New User · Single Dealership · 3 Accounts (1 Closed)
              </p>
              <p className="text-xs text-[#55575C] mb-2">📍 Idaho — Limited Power of Attorney + Tax Resale Cert via DocuSign</p>
              <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                3 accounts from AuctionAccess. JPMorgan confirmed one is closed — shown greyed out with explanatory text, not selectable. Dealer picks from the 2 open accounts.
              </p>
              <PrimaryButton onClick={() => startScenario('v2-banking-mixed')} className="mt-5 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>

            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#8B5CF6] p-6 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-[#0E0E0F]">Single Closed Account</span>
                <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F5F3FF] text-[#5B21B6]">Banking Variation</span>
              </div>
              <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">
                Net-New User · Single Dealership · 1 Account (Closed)
              </p>
              <p className="text-xs text-[#55575C] mb-2">📍 Idaho — Limited Power of Attorney + Tax Resale Cert via DocuSign</p>
              <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                1 account from AuctionAccess. JPMorgan confirmed it's closed — displayed greyed out, not selectable. Banking screen shown with ACH as the only path forward.
              </p>
              <PrimaryButton onClick={() => startScenario('v2-banking-single-closed')} className="mt-5 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>
          </div>

          {/* ── Resume Variation ── */}
          <div className="mt-10">
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-1">Resume Variation</h3>
            <p className="text-sm text-[#55575C] mb-6 max-w-2xl">
              Returning dealer who started registration and is picking up where they left off. Entry: AA lookup → login → dealership selection shows "In Progress" with a Resume button. R1–R4 use the base (80%) cohort. R5 uses the 5% (LPOA only) cohort. R6a–R6b use the 15% cohort (separate LPOA + manual Tax Resale).
            </p>

            {/* Row 1 — R1, R2 */}
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0E0E0F]">R1</span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F0FDFA] text-[#0F766E]">Resume</span>
                </div>
                <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">Resume at Dealership Information</p>
                <p className="text-xs text-[#55575C] mb-2">📍 Base (80%) — LPOA + Tax Resale via DocuSign</p>
                <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                  Dealer left before completing Dealership Information. Resumes at that screen with prior steps not yet complete.
                </p>
                <button onClick={() => startScenario('v2-r1')} className="mt-5 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0E0E0F]">R2</span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F0FDFA] text-[#0F766E]">Resume</span>
                </div>
                <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">Resume at Terms of Service</p>
                <p className="text-xs text-[#55575C] mb-2">📍 Base (80%) — LPOA + Tax Resale via DocuSign</p>
                <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                  Dealer completed Dealership Information but left before accepting Terms of Service.
                </p>
                <button onClick={() => startScenario('v2-r2')} className="mt-5 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>
            </div>

            {/* Row 2 — R3a, R3b */}
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0E0E0F]">R3a</span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F0FDFA] text-[#0F766E]">Resume</span>
                </div>
                <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">Resume at Banking — AA Account on File</p>
                <p className="text-xs text-[#55575C] mb-2">📍 Base (80%) — LPOA + Tax Resale via DocuSign</p>
                <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                  ToS accepted. Dealer resumes at the banking screen with one AuctionAccess account available to select as primary.
                </p>
                <button onClick={() => startScenario('v2-r3a')} className="mt-5 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0E0E0F]">R3b</span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F0FDFA] text-[#0F766E]">Resume</span>
                </div>
                <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">Resume at Banking — ACH Form</p>
                <p className="text-xs text-[#55575C] mb-2">📍 Base (80%) — LPOA + Tax Resale via DocuSign</p>
                <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                  ToS accepted. No AA bank accounts on file — dealer resumes directly at the ACH form to provide banking details.
                </p>
                <button onClick={() => startScenario('v2-r3b')} className="mt-5 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>
            </div>

            {/* Row 3 — R4, R5 */}
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0E0E0F]">R4</span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F0FDFA] text-[#0F766E]">Resume</span>
                </div>
                <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">Resume at DocuSign — Combined LPOA + Tax Resale</p>
                <p className="text-xs text-[#55575C] mb-2">📍 Base (80%) — LPOA + Tax Resale via DocuSign</p>
                <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                  Banking complete. Dealer resumes at the combined DocuSign screen — both LPOA and Tax Resale Cert pending in a single envelope.
                </p>
                <button onClick={() => startScenario('v2-r4')} className="mt-5 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0E0E0F]">R5</span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F0FDFA] text-[#0F766E]">Resume</span>
                </div>
                <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">Resume at DocuSign — LPOA Only</p>
                <p className="text-xs text-[#55575C] mb-2">📍 5% Cohort — LPOA only, no Tax Resale required</p>
                <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                  Banking complete. Dealer resumes at the LPOA-only DocuSign screen. No Tax Resale row appears in the progress bar.
                </p>
                <button onClick={() => startScenario('v2-r5')} className="mt-5 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>
            </div>

            {/* Row 4 — R6a, R6b (15% cohort) */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-4">
                15% Cohort — Separate LPOA & manual Tax Resale collection
              </p>
            </div>
            <div className="grid grid-cols-3 gap-5">
              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0E0E0F]">R6a</span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F0FDFA] text-[#0F766E]">Resume</span>
                </div>
                <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">Resume at LPOA Screen — LPOA Pending</p>
                <p className="text-xs text-[#55575C] mb-2">📍 15% Cohort — LPOA via DocuSign · Tax Resale via Specialist</p>
                <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                  Banking complete. LPOA not yet signed — dealer resumes at the LPOA DocuSign screen. Tax Resale is still pending manual collection by a specialist.
                </p>
                <button onClick={() => startScenario('v2-r6a')} className="mt-5 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-bold text-[#0E0E0F]">R6b</span>
                  <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2.5 py-0.5 bg-[#F0FDFA] text-[#0F766E]">Resume</span>
                </div>
                <p className="font-semibold text-sm text-[#0E0E0F] leading-snug mb-1">Resume at Tax Resale Screen — LPOA Signed</p>
                <p className="text-xs text-[#55575C] mb-2">📍 15% Cohort — LPOA via DocuSign · Tax Resale via Specialist</p>
                <p className="text-xs text-[#55575C] leading-relaxed flex-1">
                  Banking complete, LPOA already received. Dealer resumes at the Tax Resale manual screen — specialist contact info shown, LPOA marked as signed in the progress bar.
                </p>
                <button onClick={() => startScenario('v2-r6b')} className="mt-5 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  )
}
