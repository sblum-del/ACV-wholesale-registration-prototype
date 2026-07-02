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

// ── MAIN LOBBY ───────────────────────────────────────────────────
export function Lobby({ setView, startScenario }: Props) {
  const [activeTab, setActiveTab] = useState<'exec' | 'updated' | 'prototype'>('updated')

  const tabs = [
    { id: 'exec',      label: 'Executive Summary'                       },
    { id: 'updated',   label: 'Most Current Prototypes (end of June \'26)' },
    { id: 'prototype', label: 'Initial Prototype (early June)'           },
  ] as const

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E9EB] px-10 pt-5 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-black text-xl text-[#F26522]">ACV AUCTIONS</p>
            <p className="text-xs text-[#55575C] mt-0.5">ACV Dealer Registration Initiative — Customer-Facing Prototype</p>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex gap-1 items-end">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium cursor-pointer border-b-2 transition-colors
                ${tab.id === 'prototype'
                  ? activeTab === tab.id
                    ? 'border-[#9CA3AF] text-[#6B7280]'
                    : 'border-transparent text-[#9CA3AF] hover:text-[#6B7280]'
                  : activeTab === tab.id
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
          <h1 className="font-bold text-4xl text-[#0E0E0F] mb-2">ACV Dealer Registration Initiative</h1>
          <p className="text-[#55575C] text-base mb-8">Customer-facing prototype for internal review and alignment.</p>

          <div className="bg-white border border-[#E8E9EB] rounded-2xl p-8 space-y-5 text-sm text-[#55575C] leading-relaxed">
            <div>
              <p className="font-bold text-sm text-[#0E0E0F] mb-2">Why it exists</p>
              <p>ACV is moving away from FormAssembly and toward a custom registration UX integrated directly with Salesforce and NetSuite. This prototype aligns the team on exact process flows, language, and requirements — so that UX can produce ACV-branded designs from a well-defined spec.</p>
            </div>
            <div>
              <p className="font-bold text-sm text-[#0E0E0F] mb-2">Design intent</p>
              <p>The screens here are directional. They do not reflect final ACV brand design. Design alignment is not the goal — process alignment is.</p>
            </div>
            <div>
              <p className="font-bold text-sm text-[#0E0E0F] mb-2">What it demonstrates</p>
              <p>Each scenario shows the customer-facing UX <em>and</em> the backend data flow: how records are created in Salesforce, how integrations with NetSuite and AuctionAccess work, and how compliance documents (Limited Power of Attorney, Tax Resale Certs) are handled via DocuSign — routed based on the dealer's state.</p>
            </div>
            <div>
              <p className="font-bold text-sm text-[#0E0E0F] mb-2">Banking assumption</p>
              <p>The base scenario covers the majority of dealer registrations and provides the most straightforward walkthrough. Variant paths branch off the base to show nuances driven by factors like the dealer's state (which affects Tax Resale Cert collection), what bank accounts exist in AuctionAccess, whether the dealer is resuming a previous registration session, or whether another person from their dealership has already started the process.</p>
            </div>
            <div>
              <p className="font-bold text-sm text-[#0E0E0F] mb-2">How to leave feedback</p>
              <p>Message <strong>Seth Blum</strong> directly in Slack with feedback or questions about any specific screen.</p>
            </div>
          </div>

          <div className="mt-8">
            <PrimaryButton onClick={() => setActiveTab('updated')} className="px-10">
              View Prototypes →
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

      {/* ── UPDATED PROTOTYPES TAB ── */}
      {activeTab === 'updated' && (
        <div className="px-10 pt-8 pb-16">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Most Current Prototypes</h2>
          <p className="text-sm text-[#55575C] mb-4 max-w-3xl">
            Incorporates product, legal, and cross-functional feedback collected through June 2026.{' '}
            <a
              href="https://acvauctions.atlassian.net/wiki/spaces/SAL/pages/7061602306/ACV+Wholesale+Registration+Prototype+Feedback+Summary"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#004E7D] hover:underline font-medium"
            >
              View full feedback summary →
            </a>
          </p>

          {/* ── Base Scenario ── */}
          <div className="grid grid-cols-3 gap-5 mb-12">
            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0077D8] p-6 flex flex-col hover:shadow-md transition-shadow">
              <p className="font-semibold text-sm text-[#0E0E0F] mb-1">Base Flow</p>
              <p className="text-xs text-[#8D9199] flex-1">Full registration walkthrough from start to finish</p>
              <PrimaryButton onClick={() => startScenario('v2-base')} className="mt-4 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>
          </div>

          {/* ── Tax Resale Variation ── */}
          <div className="mb-3">
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-1">Tax Resale Variation</h3>
          </div>
          <div className="grid grid-cols-3 gap-5 mb-12">
            {/* 15% Cohort */}
            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#F26522] p-6 flex flex-col hover:shadow-md transition-shadow">
              <p className="font-semibold text-sm text-[#0E0E0F] mb-1">Manual Tax Resale</p>
              <p className="text-xs text-[#8D9199] flex-1">LPOA via DocuSign · Tax Resale collected by specialist</p>
              <PrimaryButton onClick={() => startScenario('v2-15pct')} className="mt-4 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>

            {/* 5% Cohort */}
            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#00A576] p-6 flex flex-col hover:shadow-md transition-shadow">
              <p className="font-semibold text-sm text-[#0E0E0F] mb-1">No Tax Resale Required</p>
              <p className="text-xs text-[#8D9199] flex-1">LPOA only via DocuSign</p>
              <PrimaryButton onClick={() => startScenario('v2-5pct')} className="mt-4 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>
          </div>

          {/* ── Banking Variation ── */}
          <div className="mb-3">
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-1">Banking Variation</h3>
          </div>

          {/* Row 1 — No accounts + Many accounts all open */}
          <div className="grid grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#8B5CF6] p-6 flex flex-col hover:shadow-md transition-shadow">
              <p className="font-semibold text-sm text-[#0E0E0F] mb-1">No Accounts on File</p>
              <p className="text-xs text-[#8D9199] flex-1">Dealer routed straight to ACH form</p>
              <PrimaryButton onClick={() => startScenario('v2-banking-no-accounts')} className="mt-4 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>

            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#8B5CF6] p-6 flex flex-col hover:shadow-md transition-shadow">
              <p className="font-semibold text-sm text-[#0E0E0F] mb-1">Multiple Accounts</p>
              <p className="text-xs text-[#8D9199] flex-1">3 open accounts returned — dealer picks primary</p>
              <PrimaryButton onClick={() => startScenario('v2-banking-many')} className="mt-4 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#8B5CF6] p-6 flex flex-col hover:shadow-md transition-shadow">
              <p className="font-semibold text-sm text-[#0E0E0F] mb-1">Mixed Account Status</p>
              <p className="text-xs text-[#8D9199] flex-1">One account shown as closed · not selectable</p>
              <PrimaryButton onClick={() => startScenario('v2-banking-mixed')} className="mt-4 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>

            <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#8B5CF6] p-6 flex flex-col hover:shadow-md transition-shadow">
              <p className="font-semibold text-sm text-[#0E0E0F] mb-1">Only Account Closed</p>
              <p className="text-xs text-[#8D9199] flex-1">ACH is the only path forward</p>
              <PrimaryButton onClick={() => startScenario('v2-banking-single-closed')} className="mt-4 w-full justify-center">
                Start →
              </PrimaryButton>
            </div>
          </div>

          {/* ── Resume Variation ── */}
          <div className="mt-10">
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-1">Resume Variation</h3>

            {/* Row 1 — R1, R2 */}
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">R1 — Dealership Info</p>
                <p className="text-xs text-[#8D9199] flex-1">Left before completing dealership information</p>
                <button onClick={() => startScenario('v2-r1')} className="mt-4 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">R2 — Terms of Service</p>
                <p className="text-xs text-[#8D9199] flex-1">Dealership info done, ToS not yet accepted</p>
                <button onClick={() => startScenario('v2-r2')} className="mt-4 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>
            </div>

            {/* Row 2 — R3a, R3b */}
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">R3a — Banking (AA Account)</p>
                <p className="text-xs text-[#8D9199] flex-1">ToS done · AuctionAccess account on file</p>
                <button onClick={() => startScenario('v2-r3a')} className="mt-4 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">R3b — Banking (ACH Form)</p>
                <p className="text-xs text-[#8D9199] flex-1">ToS done · no AA accounts, starts at ACH form</p>
                <button onClick={() => startScenario('v2-r3b')} className="mt-4 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>
            </div>

            {/* Row 3 — R4, R5 */}
            <div className="grid grid-cols-3 gap-5 mb-5">
              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">R4 — DocuSign</p>
                <p className="text-xs text-[#8D9199] flex-1">Banking done · LPOA + Tax Resale pending</p>
                <button onClick={() => startScenario('v2-r4')} className="mt-4 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">R5 — DocuSign (LPOA Only)</p>
                <p className="text-xs text-[#8D9199] flex-1">Banking done · LPOA only, no Tax Resale</p>
                <button onClick={() => startScenario('v2-r5')} className="mt-4 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>
            </div>

            {/* Row 4 — R6a, R6b (15% cohort) */}
            <div className="grid grid-cols-3 gap-5">
              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">R6a — LPOA Pending</p>
                <p className="text-xs text-[#8D9199] flex-1">Manual Tax Resale cohort · LPOA not yet signed</p>
                <button onClick={() => startScenario('v2-r6a')} className="mt-4 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>

              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0D9488] p-6 flex flex-col hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">R6b — Tax Resale Pending</p>
                <p className="text-xs text-[#8D9199] flex-1">Manual Tax Resale cohort · LPOA already signed</p>
                <button onClick={() => startScenario('v2-r6b')} className="mt-4 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>
            </div>
          </div>

          {/* ── Salesforce — Application Record ── */}
          <div className="mt-10">
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-1">Salesforce — Application Record</h3>
            <p className="text-xs text-[#8D9199] mb-4 max-w-2xl">Specialist-facing page layout. Shows all Application record fields, conditional Tax Resale section, approval gate status, and activity timeline. Two variants: one state that requires a Tax Resale Certificate, one that does not.</p>
            <div className="grid grid-cols-3 gap-5 mb-10">
              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0C2340] p-6 flex flex-col hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">With Tax Resale Cert</p>
                <p className="text-xs text-[#8D9199] flex-1">New York — all 5 sections shown · LPOA + Tax Resale both received</p>
                <button
                  onClick={() => setView('sf-app-record-tr')}
                  className="mt-4 w-full bg-[#0C2340] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#1a3a5c] transition-colors text-center"
                >
                  View →
                </button>
              </div>
              <div className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#0C2340] p-6 flex flex-col hover:shadow-md transition-shadow">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">Without Tax Resale Cert</p>
                <p className="text-xs text-[#8D9199] flex-1">Idaho — Tax Resale section hidden · LPOA only</p>
                <button
                  onClick={() => setView('sf-app-record-no-tr')}
                  className="mt-4 w-full bg-[#0C2340] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#1a3a5c] transition-colors text-center"
                >
                  View →
                </button>
              </div>
            </div>
          </div>

          {/* ── In Progress Variation ── */}
          <div className="mt-10">
            <h3 className="font-bold text-lg text-[#0E0E0F] mb-1">In Progress Variation</h3>
            <div className="grid grid-cols-2 gap-4">

              {/* V2-IP1 */}
              <div className="border border-[#E8E9EB] rounded-xl p-5 flex flex-col">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">Existing User — Blocked</p>
                <p className="text-xs text-[#8D9199] flex-1">Has a prior registered dealership · hits in-progress wall</p>
                <button onClick={() => startScenario('v2-ip1')} className="mt-4 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
                  Start →
                </button>
              </div>

              {/* V2-IP2 */}
              <div className="border border-[#E8E9EB] rounded-xl p-5 flex flex-col">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-1">New User — Blocked</p>
                <p className="text-xs text-[#8D9199] flex-1">Brand new to ACV · hits in-progress wall after creating credentials</p>
                <button onClick={() => startScenario('v2-ip2')} className="mt-4 w-full bg-[#0077D8] text-white rounded-lg py-2.5 text-sm font-semibold cursor-pointer hover:bg-[#005FAD] transition-colors text-center">
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
