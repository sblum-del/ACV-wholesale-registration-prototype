import { useState } from 'react'
import type { View } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  selectedDemoSlot: string | null
  setSelectedDemoSlot: (s: string | null) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

const DAYS = [
  { label: 'Mon', date: 'Jun 9', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] },
  { label: 'Tue', date: 'Jun 10', slots: ['9:00 AM', '10:00 AM', '1:00 PM', '3:30 PM'] },
  { label: 'Wed', date: 'Jun 11', slots: ['10:00 AM', '2:00 PM', '4:00 PM'] },
  { label: 'Thu', date: 'Jun 12', slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
  { label: 'Fri', date: 'Jun 13', slots: ['9:00 AM', '10:30 AM'] },
]

export function ScheduleDemo({ setView, selectedDemoSlot, setSelectedDemoSlot, isLoggedIn, onLogout }: Props) {
  const [selectedDay, setSelectedDay] = useState<string | null>('Jun 10')

  const currentDaySlots = DAYS.find(d => d.date === selectedDay)?.slots ?? []

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="REG-12" name="Schedule Demo" />
      <ACVHeader registering onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-2xl border border-[#E8E9EB] shadow-sm max-w-2xl w-full overflow-hidden">

          {/* Rep header */}
          <div className="bg-[#0077D8] px-6 py-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center font-bold text-[#0077D8] text-lg shrink-0">
              MZ
            </div>
            <div>
              <p className="text-white font-bold text-base">Mike Ziewicki</p>
              <p className="text-blue-100 text-sm">IST Account Rep — ACV Auctions</p>
              <p className="text-blue-100 text-xs mt-0.5">30 min • Phone / Video call</p>
            </div>
          </div>

          <div className="p-6">
            <h2 className="font-bold text-xl text-[#0E0E0F] mb-1">Schedule a Demo</h2>
            <p className="text-sm text-[#55575C] mb-6">
              Book a live walkthrough of the ACV platform with Mike. You can also skip this for now — Mike will reach out to coordinate.
            </p>

            {/* Month header */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-sm text-[#0E0E0F]">June 2026</span>
              <div className="flex gap-2">
                <button className="w-7 h-7 rounded-full border border-[#D1D3D6] text-[#55575C] hover:bg-[#F7F7F8] cursor-pointer text-sm">‹</button>
                <button className="w-7 h-7 rounded-full border border-[#D1D3D6] text-[#55575C] hover:bg-[#F7F7F8] cursor-pointer text-sm">›</button>
              </div>
            </div>

            {/* Day selector */}
            <div className="flex gap-2 mb-6">
              {DAYS.map(d => (
                <button
                  key={d.date}
                  onClick={() => { setSelectedDay(d.date); setSelectedDemoSlot(null) }}
                  className={`flex-1 flex flex-col items-center py-2 rounded-xl cursor-pointer transition-all
                    ${selectedDay === d.date
                      ? 'bg-[#0077D8] text-white'
                      : 'bg-[#F7F7F8] text-[#55575C] hover:bg-[#EBEBEF] border border-[#E8E9EB]'}`}
                >
                  <span className="text-[10px] opacity-80">{d.label}</span>
                  <span className="text-sm font-bold">{d.date.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            {/* Time slots */}
            {selectedDay && (
              <>
                <p className="text-xs text-[#55575C] mb-3 font-medium">Available Times — {selectedDay}</p>
                <div className="space-y-2 mb-4">
                  {currentDaySlots.map(time => {
                    const slot = `${selectedDay} — ${time}`
                    const sel = selectedDemoSlot === slot
                    return (
                      <button
                        key={time}
                        onClick={() => setSelectedDemoSlot(slot)}
                        className={`w-full py-3 rounded-xl text-sm font-medium cursor-pointer transition-all border
                          ${sel
                            ? 'bg-[#0077D8] text-white border-[#0077D8]'
                            : 'bg-white text-[#0077D8] border-[#0077D8]/30 hover:bg-[#EFF6FF] hover:border-[#0077D8]'}`}
                      >
                        {time}{sel && <span className="ml-2 text-xs opacity-80">✓ Selected</span>}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {selectedDemoSlot && (
              <div className="bg-[#ECFDF5] border border-[#00A576] rounded-xl p-3 text-sm text-[#065F46] font-medium mb-4">
                ✓ Demo confirmed: {selectedDemoSlot} with Mike Ziewicki
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2 border-t border-[#E8E9EB] mt-4">
              <PrimaryButton
                disabled={!selectedDemoSlot}
                onClick={() => setView('sf-interstitial-4')}
                className="w-full justify-center"
              >
                Book Demo & Complete Registration →
              </PrimaryButton>
              <button
                onClick={() => setView('success')}
                className="w-full text-center text-sm text-[#55575C] border border-[#D1D3D6] rounded-full py-3 cursor-pointer hover:bg-[#F7F7F8] transition-colors"
              >
                Skip for now — Browse the Marketplace
              </button>
              <p className="text-xs text-center text-[#8D9199]">
                Mike will reach out to schedule if you skip.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
