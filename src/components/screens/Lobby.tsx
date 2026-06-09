import { useState, useEffect } from 'react'
import type { View, ActiveScenario } from '../../types'
import { PrimaryButton } from '../shared/PrimaryButton'
import { CommentPanel } from '../shared/CommentPanel'
import { supabase } from '../../lib/supabase'
import type { Comment } from '../../lib/supabase'

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
  { num: 6, id: 'R6', scenario: 'r6', clickable: true,  title: 'Affiliated User — Application In Progress by Someone Else', desc: 'A different user initiated the application. Read-only status screen shown.' },
  { num: 7, id: 'CANCEL', scenario: null, clickable: false, title: 'Net-New User — Cancel Existing Application and Start Over', desc: 'User sees another user started registration. Option to cancel existing app and begin fresh.' },
]

// ── STAKEHOLDER FEEDBACK TAB ─────────────────────────────────────
function FeedbackTab() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [groupBy, setGroupBy] = useState<'person' | 'scenario'>('scenario')

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('comments').select('*').order('created_at', { ascending: true })
      if (data) setComments(data)
      setLoading(false)
    }
    fetch()
    // Real-time subscription
    const channel = supabase.channel('feedback-tab')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'comments' }, payload => {
        setComments(prev => [...prev, payload.new as Comment])
      })
      .subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [])

  const formatTime = (ts: string) => new Date(ts).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

  const topLevel = comments.filter(c => !c.parent_id)
  const getReplies = (id: string) => comments.filter(c => c.parent_id === id)

  // Group by scenario prefix (e.g. S1, S9, R2, LOBBY)
  const getScenarioGroup = (screenId: string) => {
    const match = screenId.match(/^([A-Z0-9]+B?)-/)
    return match ? match[1] : screenId
  }

  const byPerson = topLevel.reduce((acc, c) => {
    if (!acc[c.author]) acc[c.author] = []
    acc[c.author].push(c)
    return acc
  }, {} as Record<string, Comment[]>)

  const byScenario = topLevel.reduce((acc, c) => {
    const grp = getScenarioGroup(c.screen_id)
    if (!acc[grp]) acc[grp] = []
    acc[grp].push(c)
    return acc
  }, {} as Record<string, Comment[]>)

  const CommentCard = ({ c }: { c: Comment }) => {
    const replies = getReplies(c.id)
    return (
      <div className="mb-3">
        <div className="bg-white border border-[#E8E9EB] rounded-xl p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#0077D8] flex items-center justify-center text-white text-xs font-bold shrink-0">
                {c.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="text-sm font-semibold text-[#0E0E0F]">{c.author}</span>
                <span className="text-xs text-[#8D9199] ml-2">{formatTime(c.created_at)}</span>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-[#F7F7F8] border border-[#E8E9EB] rounded px-2 py-0.5 text-[#55575C] shrink-0">
              {c.screen_id}
            </span>
          </div>
          <p className="text-xs text-[#55575C] mb-1">{c.screen_name}</p>
          <p className="text-sm text-[#0E0E0F] leading-relaxed">{c.message}</p>
        </div>
        {replies.map(r => (
          <div key={r.id} className="ml-6 mt-2 bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#0E0E0F]">{r.author}</span>
              <span className="text-xs text-[#8D9199]">{formatTime(r.created_at)}</span>
            </div>
            <p className="text-sm text-[#0E0E0F]">{r.message}</p>
          </div>
        ))}
      </div>
    )
  }

  if (loading) return <div className="flex items-center justify-center py-20 text-[#55575C] text-sm">Loading feedback...</div>

  if (comments.length === 0) return (
    <div className="text-center py-20">
      <p className="text-3xl mb-3">💬</p>
      <p className="font-semibold text-[#0E0E0F]">No feedback yet</p>
      <p className="text-sm text-[#55575C] mt-1">Comments will appear here in real time as stakeholders leave feedback on the prototype screens.</p>
    </div>
  )

  const uniquePeople = Object.keys(byPerson)
  const totalComments = topLevel.length
  const totalReplies = comments.filter(c => c.parent_id).length

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Comments', value: totalComments },
          { label: 'Replies', value: totalReplies },
          { label: 'Contributors', value: uniquePeople.length },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#E8E9EB] rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-[#0077D8]">{s.value}</p>
            <p className="text-xs text-[#55575C] mt-1 font-medium uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-lg text-[#0E0E0F]">All Feedback</h2>
        <div className="flex border border-[#E8E9EB] rounded-lg overflow-hidden">
          <button onClick={() => setGroupBy('scenario')} className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${groupBy === 'scenario' ? 'bg-[#0077D8] text-white' : 'bg-white text-[#55575C] hover:bg-[#F7F7F8]'}`}>
            By Scenario
          </button>
          <button onClick={() => setGroupBy('person')} className={`px-4 py-2 text-sm font-medium cursor-pointer transition-colors border-l border-[#E8E9EB] ${groupBy === 'person' ? 'bg-[#0077D8] text-white' : 'bg-white text-[#55575C] hover:bg-[#F7F7F8]'}`}>
            By Person
          </button>
        </div>
      </div>

      {groupBy === 'scenario' && Object.entries(byScenario).sort().map(([grp, cmts]) => (
        <div key={grp} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold uppercase tracking-wide bg-[#0E0E0F] text-white rounded px-2 py-1 font-mono">{grp}</span>
            <span className="text-sm text-[#55575C]">{cmts.length} comment{cmts.length !== 1 ? 's' : ''}</span>
          </div>
          {cmts.map(c => <CommentCard key={c.id} c={c} />)}
        </div>
      ))}

      {groupBy === 'person' && Object.entries(byPerson).sort().map(([person, cmts]) => (
        <div key={person} className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#0077D8] flex items-center justify-center text-white text-sm font-bold shrink-0">
              {person.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-sm font-bold text-[#0E0E0F]">{person}</span>
              <span className="text-xs text-[#55575C] ml-2">{cmts.length} comment{cmts.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
          {cmts.map(c => <CommentCard key={c.id} c={c} />)}
        </div>
      ))}
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
  const [activeTab, setActiveTab] = useState<'exec' | 'prototype' | 'feedback' | 'wip'>('exec')

  const tabs = [
    { id: 'exec',      label: 'Executive Summary' },
    { id: 'prototype', label: 'Interactive Prototype' },
    { id: 'feedback',  label: 'Stakeholder Feedback' },
    { id: 'wip',       label: '🔒 Product WIP' },
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

      {/* Comment panel on exec + prototype tabs */}
      {(activeTab === 'exec' || activeTab === 'prototype') && (
        <CommentPanel
          screenId={activeTab === 'exec' ? 'EXEC-1' : 'LOBBY-1'}
          screenName={activeTab === 'exec' ? 'Executive Summary' : 'Lobby — Interactive Prototype'}
        />
      )}

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

          <p className="text-xs tracking-[0.12em] text-[#55575C] font-semibold uppercase mb-4">Returning User Scenarios</p>
          <div className="bg-white border border-[#E8E9EB] rounded-xl px-6 py-4 mb-5 max-w-4xl">
            <p className="text-sm text-[#55575C] leading-relaxed">
              <span className="font-semibold text-[#0E0E0F]">How resuming works.</span> Registration progress is tied to a single verified AuctionAccess user. The same user who initiated can return and resume. A different affiliated user cannot resume — they see the current status and can optionally cancel and start fresh.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5">
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
        </div>
      )}

      {/* ── FEEDBACK TAB ── */}
      {activeTab === 'feedback' && <FeedbackTab />}

      {/* ── WIP TAB ── */}
      {activeTab === 'wip' && <WIPTab setView={setView} />}
    </div>
  )
}
