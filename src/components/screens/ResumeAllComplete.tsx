import { useState } from 'react'
import type { View, ActiveScenario } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ChipToggle } from '../shared/ChipToggle'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  activeScenario: ActiveScenario
  isLoggedIn?: boolean
  onLogout?: () => void
}

const DAYS = [
  { label: 'Mon', date: 'Jun 9',  slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
  { label: 'Tue', date: 'Jun 10', slots: ['9:00 AM', '10:00 AM', '1:00 PM', '3:30 PM'] },
  { label: 'Wed', date: 'Jun 11', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
  { label: 'Thu', date: 'Jun 12', slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
  { label: 'Fri', date: 'Jun 13', slots: ['9:00 AM', '10:30 AM'] },
]

export function ResumeAllComplete({ setView, activeScenario, isLoggedIn, onLogout }: Props) {
  const isR6 = activeScenario === 'r6' // Different user — slightly different messaging
  const demoAlreadyScheduled = activeScenario !== 'r5' // r5 = all done but no demo yet
  // For r5 we show qualifying questions + demo; for r6 we just show the status screen

  const [selectedDay, setSelectedDay] = useState<string | null>('Jun 10')
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [primaryContact, setPrimaryContact] = useState<'yes'|'no'|null>(null)
  const [billingContact, setBillingContact] = useState<'yes'|'no'|null>(null)
  const currentSlots = DAYS.find(d => d.date === selectedDay)?.slots ?? []

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="RESUME-4" name="Resume — All Steps Complete" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="max-w-4xl mx-auto w-full px-6 py-10">

        {/* Status banner */}
        <div className={`rounded-2xl border-2 p-7 mb-8 ${isR6 ? 'bg-[#FAF5FF] border-[#A855F7]' : 'bg-[#EFF6FF] border-[#0077D8]'}`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isR6 ? 'bg-[#A855F7]' : 'bg-[#0077D8]'}`}>
              <span className="text-white font-bold text-xl">✓</span>
            </div>
            <div>
              <h2 className={`font-bold text-xl mb-1 ${isR6 ? 'text-[#6B21A8]' : 'text-[#1E40AF]'}`}>
                {isR6
                  ? 'This application was initiated by another user'
                  : 'All required steps have been completed'}
              </h2>
              <p className={`text-sm leading-relaxed ${isR6 ? 'text-[#6B21A8]' : 'text-[#1E40AF]'}`}>
                {isR6
                  ? 'Another user affiliated with Metro Ford of Albany has already completed all registration requirements. ACV teammates are currently reviewing the application. No further action is required from you at this time.'
                  : 'You\'ve submitted everything required from your side — Dealership Information, Terms of Service, banking, and compliance documents. ACV teammates are now reviewing your application.'}
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2">
            {[
              { label: 'Dealership Information', done: true },
              { label: 'Terms of Service', done: true },
              { label: 'Bank Account', done: true },
              { label: 'LPOA — Signed & Received', done: true },
              { label: 'Tax Resale Cert — Signed & Received', done: true },
              { label: 'Demo Scheduled', done: demoAlreadyScheduled },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2 text-sm">
                <span className={item.done ? 'text-[#00A576]' : 'text-[#F59600]'}>
                  {item.done ? '✓' : '○'}
                </span>
                <span className={item.done ? 'text-[#065F46] font-medium' : 'text-[#92400E]'}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 bg-white/60 rounded-xl p-4 text-sm">
            <p className="font-semibold text-[#0E0E0F] mb-1">What ACV is reviewing</p>
            <p className="text-[#55575C] text-xs leading-relaxed">
              Your registration specialist <strong>Rob Smyton</strong> is verifying your compliance documents and confirming all requirements are met before approving your application.
              Once approved, your account will transition from read-only access to full buying and selling permissions.
            </p>
          </div>
        </div>

        {/* Show demo + qualifying questions if not yet scheduled (r5) */}
        {!demoAlreadyScheduled && !isR6 && (
          <div className="grid grid-cols-2 gap-8">
            {/* Calendar */}
            <div className="bg-white rounded-2xl border border-[#E8E9EB] overflow-hidden">
              <div className="bg-[#0077D8] px-5 py-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center font-bold text-[#0077D8] shrink-0">MZ</div>
                <div>
                  <p className="text-white font-bold text-sm">Mike Ziewicki</p>
                  <p className="text-blue-100 text-xs">IST Account Rep · 30 min</p>
                </div>
              </div>
              <div className="p-5">
                <p className="font-semibold text-sm text-[#0E0E0F] mb-4">Schedule a Demo — Optional</p>
                <div className="flex gap-2 mb-4">
                  {DAYS.map(d => (
                    <button
                      key={d.date}
                      onClick={() => { setSelectedDay(d.date); setSelectedSlot(null) }}
                      className={`flex-1 flex flex-col items-center py-2 rounded-xl cursor-pointer text-xs transition-all
                        ${selectedDay === d.date ? 'bg-[#0077D8] text-white' : 'bg-[#F7F7F8] text-[#55575C] border border-[#E8E9EB] hover:bg-[#EBEBEF]'}`}
                    >
                      <span className="text-[10px] opacity-70">{d.label}</span>
                      <span className="font-bold">{d.date.split(' ')[1]}</span>
                    </button>
                  ))}
                </div>
                {selectedDay && (
                  <div className="space-y-2">
                    {currentSlots.map(time => {
                      const slot = `${selectedDay} — ${time}`
                      const sel = selectedSlot === slot
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedSlot(slot)}
                          className={`w-full py-2.5 rounded-xl text-sm cursor-pointer border transition-all
                            ${sel ? 'bg-[#0077D8] text-white border-[#0077D8]' : 'bg-white text-[#0077D8] border-[#0077D8]/30 hover:bg-[#EFF6FF]'}`}
                        >
                          {time}{sel && ' ✓'}
                        </button>
                      )
                    })}
                  </div>
                )}
                {selectedSlot && (
                  <div className="mt-3 bg-[#ECFDF5] border border-[#00A576] rounded-lg p-2.5 text-xs text-[#065F46] font-medium">
                    ✓ {selectedSlot} with Mike Ziewicki
                  </div>
                )}
              </div>
            </div>

            {/* Qualifying questions */}
            <div className="bg-white rounded-2xl border border-[#E8E9EB] p-6">
              <h3 className="font-bold text-base text-[#0E0E0F] mb-1">A few quick questions</h3>
              <p className="text-xs text-[#55575C] mb-5">Help us tailor your ACV experience.</p>
              <div className="space-y-5">
                <div>
                  <p className="text-sm font-medium text-[#0E0E0F] mb-2">Are you the Primary Contact? <span className="text-[#E53E3E]">*</span></p>
                  <div className="flex gap-3">
                    <ChipToggle label="Yes" selected={primaryContact === 'yes'} onToggle={() => setPrimaryContact('yes')} />
                    <ChipToggle label="No" selected={primaryContact === 'no'} onToggle={() => setPrimaryContact('no')} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0E0E0F] mb-2">Is Primary Contact same as Billing Contact? <span className="text-[#E53E3E]">*</span></p>
                  <div className="flex gap-3">
                    <ChipToggle label="Yes" selected={billingContact === 'yes'} onToggle={() => setBillingContact('yes')} />
                    <ChipToggle label="No" selected={billingContact === 'no'} onToggle={() => setBillingContact('no')} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-[#0E0E0F] mb-2">How did you hear about ACV?</p>
                  <select className="w-full border border-[#D1D3D6] rounded-lg px-3 py-2.5 text-sm bg-[#FAFAFA] focus:outline-none focus:border-[#0077D8] cursor-pointer">
                    <option value="">Select... (optional)</option>
                    <option>Sales Rep</option>
                    <option>Online Search</option>
                    <option>Trade Show</option>
                    <option>Word of Mouth</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="mt-6">
                <PrimaryButton
                  disabled={!primaryContact || !billingContact}
                  onClick={() => setView('success')}
                  className="w-full justify-center"
                >
                  {selectedSlot ? 'Book Demo & Finish →' : 'Finish (Skip Demo) →'}
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}

        {/* If demo already scheduled or r6 — just show return to lobby */}
        {(demoAlreadyScheduled || isR6) && (
          <div className="text-center mt-4">
            <button onClick={() => setView('lobby')} className="text-sm text-[#004E7D] cursor-pointer hover:underline">
              ← Return to Lobby
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
