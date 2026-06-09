import type { View, ActiveScenario } from '../../types'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  setActiveScenario: (s: ActiveScenario) => void
  startScenario: (s: ActiveScenario) => void
}

// Tag colors by use case type
const TAG: Record<string, { label: string; cls: string }> = {
  'standard':    { label: 'Standard Registration',   cls: 'bg-[#EFF6FF] text-[#0061A5]' },
  'state':       { label: 'State Variant',            cls: 'bg-[#F0FDF4] text-[#166534]' },
  'banking':     { label: 'Banking Variation',        cls: 'bg-[#FFF7ED] text-[#9A3412]' },
  'identity':    { label: 'Identity & Access',        cls: 'bg-[#FAF5FF] text-[#6B21A8]' },
  'join':        { label: 'Join Flow',                cls: 'bg-[#F0FDF4] text-[#166534]' },
  'existing':    { label: 'Existing User',            cls: 'bg-[#EEF2FF] text-[#3730A3]' },
  'dealer-group':{ label: 'Dealer Group',             cls: 'bg-[#0C2340] text-white' },
  'resume':      { label: 'Resume Registration',      cls: 'bg-[#EFF6FF] text-[#0077D8]' },
  'spotlight':   { label: 'Internal Spotlight',       cls: 'bg-[#F5F3FF] text-[#5B21B6]' },
}

const scenarios = [
  {
    id: 'S1', type: 'standard', scenario: 's1', clickable: true,
    title: 'Net-New User · Single Dealership · Single Verified Bank Account',
    state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign',
    desc: 'First-time ACV user. AA validates identity, one dealership available to register. One bank account on file and JPMorgan-verified. Full registration flow from start to finish.',
  },
  {
    id: 'S2', type: 'standard', scenario: 's2', clickable: true,
    title: 'Net-New User · Multiple Dealerships Available · Single Verified Bank Account',
    state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign',
    desc: 'First-time ACV user affiliated with 4 dealerships in AuctionAccess, all net-new to ACV. User selects one dealership to register. Remaining dealerships stay available for future sessions.',
  },
  {
    id: 'S3', type: 'banking', scenario: 's3', clickable: true,
    title: 'Net-New User · Single Dealership · Multiple Verified Bank Accounts',
    state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign',
    desc: 'Multiple bank accounts returned from AuctionAccess, all validated by JPMorgan. User selects one or more to bring in and must designate exactly one as primary payout account.',
  },
  {
    id: 'S4', type: 'state', scenario: 's4', clickable: true,
    title: 'Net-New User · Single Dealership · Alabama — Manual Tax Resale Collection',
    state: '📍 Alabama — LPOA via DocuSign · Tax Resale Cert via Specialist',
    desc: 'Alabama requires a Tax Resale Cert but it is not sent via DocuSign. LPOA is sent via DocuSign automatically. A registration specialist collects the Tax Resale Cert offline and uploads it manually.',
  },
  {
    id: 'S5', type: 'state', scenario: 's5', clickable: true,
    title: 'Net-New User · Single Dealership · Oregon — No Tax Resale Required',
    state: '📍 Oregon — LPOA Only via DocuSign',
    desc: 'Oregon does not require a Tax Resale Certificate. DocuSign sends LPOA only. The progress bar reflects this throughout — Tax Resale step is marked Not Required from the start.',
  },
  {
    id: 'S6', type: 'banking', scenario: 's6', clickable: true,
    title: 'Net-New User · Single Dealership · Mixed JPMorgan Results',
    state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign',
    desc: '4 bank accounts on file with AuctionAccess: 2 pass JPMorgan validation, 2 do not. User selects from verified accounts only. Option to flag that an intended account did not pass — triggers priority follow-up from an ACV teammate.',
  },
  {
    id: 'S9', type: 'existing', scenario: 's9', clickable: true,
    title: 'Existing ACV User · Registering a New Dealership',
    state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign',
    desc: 'User already has an ACV account. AA validation recognizes the email and routes to Sign In instead of account creation. Existing dealership shown as Registered/Joined. New dealership available to register — Contact record reused, no duplicate created.',
  },
  {
    id: 'S10', type: 'banking', scenario: 's10', clickable: true,
    title: 'Net-New User · No Bank Accounts on File in AuctionAccess',
    state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign',
    desc: 'AuctionAccess returns zero bank accounts. No NetSuite bank records created, no JPMorgan validation initiated. User completes an ACH form, triggering NetSuite record creation and JPMorgan validation in real time — results returned with next steps.',
  },
  {
    id: 'S11', type: 'banking', scenario: 's11', clickable: true,
    title: 'Net-New User · All Bank Accounts Fail JPMorgan Validation',
    state: '📍 Idaho — LPOA + Tax Resale Cert via DocuSign',
    desc: '3 accounts on file, all fail JPMorgan validation. User sees each rejection, can flag their intended account for investigation, then completes an ACH form. If ACH passes, it becomes primary with the flag pre-carried. If ACH also fails, a specialist reaches out directly.',
  },
  {
    id: 'S7', type: 'identity', scenario: 's7', clickable: true,
    title: 'AuctionAccess Identity Validation Fails',
    state: '— No state routing reached',
    desc: 'User enters an incorrect 100M ID or Last 4 digits of Photo ID. AuctionAccess returns no match. Error state surfaced on form fields. No Salesforce records are created — explicitly confirmed to the user before they try again.',
  },
  {
    id: 'S8', type: 'join', scenario: 's8', clickable: true,
    title: 'Net-New User · All Affiliated Dealerships Already Registered — Join Flow',
    state: '📍 New York',
    desc: 'AA validates but no dealerships are available to register — all are already on ACV. User sees both as Registered and can join either. Join is existing ACV functionality — no new Application or registration flow is triggered.',
  },
  {
    id: 'S8B', type: 'join', scenario: 's8b', clickable: true,
    title: 'Existing ACV User · All Affiliated Dealerships Already Registered — Sign In → Join Flow',
    state: '📍 New York',
    desc: 'AA recognizes an existing ACV account and prompts Sign In instead of account creation. After login, one dealership shows as already Joined (no action), one shows as Registered with an option to Join.',
  },
]

const resumeScenarios = [
  { id: 'R1', scenario: 'r1', clickable: true, title: 'Returning User — Resumes at Dealership Information', desc: 'User left before completing Dealership Information. On return after Sign In, system reads the SF Application record and routes directly to the Dealership Info screen. Prior steps show as incomplete.' },
  { id: 'R2', scenario: 'r2', clickable: true, title: 'Returning User — Resumes at Terms of Service', desc: 'Dealership Information is complete. ToS not yet accepted. System reads SF and routes directly to the Terms of Service screen with the Dealership Info step showing as complete.' },
  { id: 'R3', scenario: 'r3', clickable: true, title: 'Returning User — Resumes at Bank Account', desc: 'ToS is complete. Banking Collection Status is false. System routes directly to the banking screen. Progress bar shows steps 1–2 complete.' },
  { id: 'R4', scenario: 'r4', clickable: true, title: 'Returning User — Resumes at Documents (LPOA/Resale Cert)', desc: 'Banking complete. LPOA and Tax Resale Cert not yet signed. System routes to the DocuSign prompt screen where user can open Gmail and complete signing.' },
  { id: 'R5', scenario: 'r5', clickable: true, title: 'Returning User — All Steps Complete, Awaiting ACV Review', desc: 'User has completed all required steps. System reads SF and routes to a status screen: "ACV is reviewing your application." Qualifying questions and demo scheduling shown if not yet done.' },
  { id: 'R6', scenario: 'r6', clickable: true, title: 'Same User Returns — Application Awaiting Review, Nothing Left To Do', desc: 'The same user who started registration returns, but all steps are already complete. System reads SF and displays a status screen: ACV is reviewing. If demo not yet scheduled, qualifying questions and calendar appear.' },
  { id: 'R6N', scenario: 'r6n', clickable: true, title: 'Net-New User — Affiliated Dealership Has an In-Progress Application by Someone Else', desc: 'A first-time ACV user goes through registration and reaches the 5M selection screen. Their affiliated dealership already has an application in progress — initiated by a different person. They see who started it and when, with an option to cancel and start fresh.' },
]

const spotlights = [
  { id: 'J1', title: 'Dealer Group Flag → Janelle\'s Major Teams Report', desc: 'When Dealer Group = Yes is selected during registration, the application is flagged and routed to a dedicated Salesforce report. Real-time notification sent to Janelle\'s team.' },
  { id: 'J2', title: 'DocuSign 24hr Non-Response — Automated SLA Follow-up', desc: 'If DocuSign is not completed within 24 hours, an automated reminder email fires to the dealer. At 48 hours, a task is auto-assigned to the Application Owner (Rob Smyton) to call the dealer directly.' },
  { id: 'J3', title: 'Application Rejection by Registration Specialist', desc: 'A registration specialist manually rejects an application. Salesforce Application record shown in Rejected status. Exact field/record detail pending confirmation.' },
  { id: 'J4', title: 'Franchise Dealer Type — Account Owner Notification', desc: 'When Dealer Type = Franchise, the Account Owner (TM) receives a real-time notification. Non-franchise dealers do not trigger this notification.' },
]

export function Lobby({ setView, startScenario }: Props) {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <ScreenLabel id="LOBBY-1" name="Lobby — Scenario Selection" />
      {/* Header */}
      <div className="bg-white border-b border-[#E8E9EB] h-16 flex items-center justify-between px-10">
        <span className="font-bold text-lg text-[#F26522]">ACV AUCTIONS</span>
        <span className="text-sm text-[#55575C]">Dealer Registration Process — Interactive Prototype</span>
        <div className="flex gap-2">
          {['V1', 'V2', 'V3'].map((v, i) => (
            <button key={v} className={`rounded-full px-5 py-1.5 text-xs font-semibold ${i === 0 ? 'text-white' : 'bg-[#EBEBEF] text-[#55575C]'}`}
              style={i === 0 ? { background: 'linear-gradient(160deg, #F26522 14%, #FC4243 86%)' } : {}}>
              {v}
            </button>
          ))}
        </div>
      </div>

      <div className="px-10 pt-8 pb-16">

        {/* Hero */}
        <h1 className="font-bold text-4xl text-[#0E0E0F]">ACV Dealer Registration — V1</h1>
        <p className="text-[#55575C] text-base max-w-3xl mt-2 mb-8">
          Select a scenario below to begin. Each path demonstrates the dealer-facing experience alongside how data flows into Salesforce, NetSuite, and integrated systems.
        </p>

        {/* Context panel */}
        <div className="bg-white border border-[#E8E9EB] rounded-2xl p-7 mb-10 max-w-5xl">
          <p className="font-bold text-sm text-[#0E0E0F] mb-3 uppercase tracking-wide text-xs text-[#55575C]">About This Prototype</p>
          <div className="space-y-3 text-sm text-[#55575C] leading-relaxed">
            <p>
              <span className="font-semibold text-[#0E0E0F]">Why it exists.</span> In V1, ACV is moving away from FormAssembly and toward a custom registration UX integrated directly with Salesforce and NetSuite. This prototype aligns the team on exact process flows, language, and requirements — so that UX can produce ACV-branded designs from a well-defined spec.
            </p>
            <p>
              <span className="font-semibold text-[#0E0E0F]">Design intent.</span> The screens here are directional. They do not reflect final ACV brand design. Design alignment is not the goal — process alignment is.
            </p>
            <p>
              <span className="font-semibold text-[#0E0E0F]">What it demonstrates.</span> Each scenario shows the customer-facing UX <em>and</em> the backend data flow: how records are created in Salesforce, how integrations with NetSuite and AuctionAccess work, and how compliance documents (POA, Tax Resale Certs) are handled via DocuSign — routed based on the dealer's state.
            </p>
            <p>
              <span className="font-semibold text-[#0E0E0F]">Banking assumption.</span> These flows assume JPMorgan validation completes quickly and does not create a poor customer experience. If latency becomes a concern during testing, screens can be reordered — for example, presenting demo scheduling before the banking step.
            </p>
          </div>
        </div>

        {/* Main scenarios */}
        <p className="text-xs tracking-[0.12em] text-[#55575C] font-semibold uppercase mb-4">REGISTRATION SCENARIOS — V1</p>
        <div className="grid grid-cols-3 gap-5">
          {scenarios.map(s => {
            const tag = TAG[s.type] ?? TAG['standard']
            return (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-[#E8E9EB] border-l-4 border-l-[#F26522] p-6 flex flex-col transition-shadow hover:shadow-md"
              >
                <span className={`text-[10px] font-semibold tracking-wide uppercase rounded-full px-3 py-1 w-fit ${tag.cls}`}>
                  {tag.label}
                </span>
                <p className="font-semibold text-sm text-[#0E0E0F] mt-3 leading-snug">{s.title}</p>
                <p className="text-xs text-[#55575C] mt-1">{s.state}</p>
                <p className="text-xs text-[#55575C] mt-2 leading-relaxed flex-1">{s.desc}</p>
                {s.clickable ? (
                  <PrimaryButton
                    onClick={() => startScenario((s as any).scenario ?? 's1')}
                    className="mt-5 w-full justify-center"
                  >
                    Start →
                  </PrimaryButton>
                ) : (
                  <button className="mt-5 w-full bg-[#EBEBEF] text-[#55575C] rounded-full px-8 py-3 text-sm font-semibold cursor-not-allowed">
                    Coming Soon
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* Resume scenarios */}
        <p className="text-xs tracking-[0.12em] text-[#55575C] font-semibold uppercase mt-12 mb-3">RETURNING USER SCENARIOS</p>

        {/* Context */}
        <div className="bg-white border border-[#E8E9EB] rounded-xl px-6 py-4 mb-5 max-w-5xl">
          <p className="text-sm text-[#55575C] leading-relaxed">
            <span className="font-semibold text-[#0E0E0F]">How resuming works.</span> The registration process ties progress to a single verified AuctionAccess user. The same user who initiated registration can return and resume at any point — the system reads their Salesforce Application record to identify exactly where they left off.
            A different user affiliated with the same dealership cannot resume that application. Instead, they are shown the current status and — if applicable — given the option to discard the existing application and start fresh.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {resumeScenarios.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-[#E8E9EB] p-6 flex flex-col">
              <span className={`text-[10px] font-semibold tracking-wide uppercase rounded-full px-3 py-1 w-fit ${TAG['resume'].cls}`}>
                {TAG['resume'].label}
              </span>
              <p className="font-semibold text-sm text-[#0E0E0F] mt-3 leading-snug">{s.title}</p>
              <p className="text-xs text-[#55575C] mt-2 leading-relaxed flex-1">{s.desc}</p>
              {(s as any).clickable ? (
                <PrimaryButton
                  onClick={() => startScenario((s as any).scenario)}
                  className="mt-5 w-full justify-center"
                >
                  Start →
                </PrimaryButton>
              ) : (
                <button className="mt-5 w-full bg-[#EBEBEF] text-[#55575C] rounded-full px-8 py-3 text-sm font-semibold cursor-not-allowed">
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Dealer Group */}
        <p className="text-xs tracking-[0.12em] text-[#55575C] font-semibold uppercase mt-12 mb-4">DEALER GROUP REGISTRATION</p>
        <div className="grid grid-cols-3 gap-5 mb-4">
          <div
            className="bg-white rounded-xl border-l-4 border-l-[#0C2340] border border-[#E8E9EB] p-6 flex flex-col hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setView('dg-intro')}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-[10px] font-semibold tracking-wide uppercase rounded-full px-3 py-1 ${TAG['dealer-group'].cls}`}>
                {TAG['dealer-group'].label}
              </span>
              <span className="text-[10px] font-semibold tracking-wide uppercase rounded-full px-2 py-1 bg-[#F59600]/20 text-[#92400E]">
                Janelle's Team
              </span>
            </div>
            <p className="font-semibold text-sm text-[#0E0E0F] leading-snug">Dealer Group Registration — Centralized Operation Model</p>
            <p className="text-xs text-[#55575C] mt-1">📍 Group One Automotive — All States</p>
            <p className="text-xs text-[#55575C] mt-2 leading-relaxed flex-1">
              One corporate contact facilitates registration for all rooftops simultaneously. Supports net-new dealer groups and existing groups adding locations. Dedicated white glove support from Janelle's team.
            </p>
            <button
              className="mt-5 w-full text-white rounded-full px-8 py-3 text-sm font-semibold cursor-pointer"
              style={{ background: 'linear-gradient(160deg, #0C2340 14%, #1a3556 86%)' }}
            >
              Start →
            </button>
          </div>

        </div>

        {/* Internal spotlights */}
        <p className="text-xs tracking-[0.12em] text-[#55575C] font-semibold uppercase mt-12 mb-4">INTERNAL SPOTLIGHTS</p>
        <div className="grid grid-cols-4 gap-5">
          {spotlights.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-[#E8E9EB] p-6 flex flex-col">
              <span className={`text-[10px] font-semibold tracking-wide uppercase rounded-full px-3 py-1 w-fit ${TAG['spotlight'].cls}`}>
                {TAG['spotlight'].label}
              </span>
              <p className="font-semibold text-sm text-[#0E0E0F] mt-3 leading-snug">{s.title}</p>
              <p className="text-xs text-[#55575C] mt-2 leading-relaxed flex-1">{s.desc}</p>
              <button className="mt-5 w-full bg-[#EBEBEF] text-[#55575C] rounded-full px-8 py-3 text-sm font-semibold cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
