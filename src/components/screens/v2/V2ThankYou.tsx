import type { View } from '../../../types'
import { ACVHeader } from '../../shared/ACVHeader'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function V2ThankYou({ setView, isLoggedIn, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="V2-8" name="Registration Submitted" />
      <ACVHeader onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />

      <div className="flex-1 flex flex-col items-center justify-start px-6 py-12 max-w-2xl mx-auto w-full">

        {/* Completion card */}
        <div className="bg-white rounded-2xl border border-[#E8E9EB] shadow-sm w-full p-10 text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#00A576] flex items-center justify-center mx-auto mb-5">
            <span className="text-white text-3xl font-bold">✓</span>
          </div>
          <h1 className="font-bold text-2xl text-[#0E0E0F]">You're all set, Metro Ford of Albany!</h1>
          <p className="text-sm text-[#55575C] mt-3 leading-relaxed max-w-md mx-auto">
            You've completed everything you need to do for now. ACV is reviewing your registration
            and will reach out if further verification is needed — usually within 1–2 business days.
          </p>
        </div>

        {/* BDR + Demo card */}
        <div className="bg-white rounded-2xl border border-[#E8E9EB] shadow-sm w-full overflow-hidden">

          {/* BDR header */}
          <div className="bg-[#0077D8] px-6 py-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center font-bold text-[#0077D8] text-lg shrink-0">
              MZ
            </div>
            <div>
              <p className="text-white font-bold text-base">Mike Ziewicki</p>
              <p className="text-blue-100 text-sm">IST Account Rep — ACV Auctions</p>
            </div>
          </div>

          <div className="p-6">
            <h2 className="font-bold text-lg text-[#0E0E0F] mb-2">Meet your ACV rep</h2>
            <p className="text-sm text-[#55575C] leading-relaxed mb-5">
              Mike is your dedicated ACV rep. He'll be your primary contact for getting started on
              the platform, answering questions, and helping you make your first purchase. Connecting
              with Mike now gets you to your first buy faster.
            </p>

            <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-4 mb-5 flex items-start gap-3">
              <span className="text-[#0077D8] text-xl shrink-0">📞</span>
              <div>
                <p className="text-sm font-semibold text-[#0E0E0F]">Schedule a live walkthrough of ACV</p>
                <p className="text-xs text-[#55575C] mt-0.5">
                  30 min · Phone or video call · Pick a time that works for you
                </p>
              </div>
            </div>

            <PrimaryButton onClick={() => setView('schedule-demo')} className="w-full justify-center">
              Schedule a Demo with Mike →
            </PrimaryButton>

            <button
              onClick={() => setView('lobby')}
              className="mt-3 w-full text-center text-sm text-[#55575C] cursor-pointer hover:text-[#004E7D] hover:underline"
            >
              Skip for now — I'll wait for Mike to reach out
            </button>
          </div>
        </div>

        <button
          onClick={() => setView('lobby')}
          className="text-sm text-[#8D9199] mt-6 cursor-pointer hover:underline"
        >
          ← Return to Lobby
        </button>
      </div>
    </div>
  )
}
