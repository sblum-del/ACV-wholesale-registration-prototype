import type { View } from '../../types'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function CancelInProgress({ setView }: Props) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="CANCEL-5" name="Cancel Existing Application" />
      <div className="bg-white border-b border-[#E8E9EB] h-16 flex items-center justify-between px-10 shrink-0">
        <div className="flex flex-col leading-none">
          <span className="font-black text-2xl text-[#F26522]">ACV</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
        </div>
        <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">← Lobby</button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl border border-[#E8E9EB] shadow-sm max-w-xl w-full p-8">

          <h2 className="font-bold text-xl text-[#0E0E0F] mb-1">Metro Ford of Albany — In Progress</h2>
          <p className="text-sm text-[#55575C] mb-5">
            This dealership's registration was started by another affiliated user. You are not able to complete their registration.
          </p>

          {/* Application details */}
          <div className="bg-[#F7F7F8] border border-[#E8E9EB] rounded-xl p-4 mb-5">
            <p className="text-xs font-semibold text-[#55575C] uppercase tracking-wide mb-3">Current application details</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#55575C]">Started by</span>
                <span className="font-semibold text-[#0E0E0F]">Sarah Mitchell</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#55575C]">Date started</span>
                <span className="font-semibold text-[#0E0E0F]">May 28, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#55575C]">Days active</span>
                <span className="font-semibold text-[#0E0E0F]">10 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#55575C]">Assigned specialist</span>
                <span className="font-semibold text-[#0E0E0F]">Rob Smyton</span>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">

            {/* Option 1 — wait */}
            <div className="flex items-start gap-3 bg-[#EFF6FF] border border-[#BFD9F7] rounded-xl p-4">
              <div className="w-6 h-6 rounded-full bg-[#0077D8] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">1</div>
              <div>
                <p className="text-sm font-semibold text-[#0E0E0F]">Wait for Sarah Mitchell to finish</p>
                <p className="text-xs text-[#55575C] mt-0.5">
                  Once the application is approved, this dealership will appear as <strong>Registered</strong> and you can <strong>Join</strong> to affiliate your account.
                </p>
              </div>
            </div>

            {/* Option 2 — call to cancel */}
            <div className="flex items-start gap-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl p-4">
              <div className="w-6 h-6 rounded-full bg-[#DC2626] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">2</div>
              <div>
                <p className="text-sm font-semibold text-[#0E0E0F]">Cancel this application</p>
                <p className="text-xs text-[#55575C] mt-1 leading-relaxed">
                  To cancel Sarah's application and start fresh, you must contact the registration specialist directly. Cancellations cannot be processed through this portal.
                </p>
                <div className="mt-3 bg-white border border-[#FED7AA] rounded-lg px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#55575C]">Registration Specialist</p>
                    <p className="text-sm font-bold text-[#0E0E0F]">Rob Smyton</p>
                  </div>
                  <a
                    href="tel:+17165550134"
                    className="flex items-center gap-2 bg-[#0077D8] text-white text-sm font-semibold rounded-lg px-4 py-2 cursor-pointer hover:bg-[#005BA8] transition-colors"
                  >
                    📞 (716) 555-0134
                  </a>
                </div>
                <p className="text-xs text-[#92400E] mt-2 font-medium">
                  ⚠️ All current progress will be lost if cancelled. This cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setView('in-progress-other-user')}
              className="flex-1 border border-[#D1D3D6] text-[#55575C] rounded-full py-3 text-sm font-semibold cursor-pointer hover:bg-[#F7F7F8]"
            >
              Go back
            </button>
            <button
              onClick={() => setView('mock-sf-cancel')}
              className="flex-1 border border-[#0077D8] text-[#0077D8] rounded-full py-3 text-sm font-semibold cursor-pointer hover:bg-[#EFF6FF] transition-colors"
            >
              View in Salesforce →
            </button>
          </div>

          <p className="text-xs text-center text-[#8D9199] mt-4">
            "View in Salesforce" is a stakeholder preview — cancellation must still be requested via phone.
          </p>
        </div>
      </div>
    </div>
  )
}
