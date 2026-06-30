import type { View, ActiveScenario } from '../../../types'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  isLoggedIn?: boolean
  onLogout?: () => void
  applicationCancelled?: boolean
  isExistingUser?: boolean
  activeScenario?: ActiveScenario
}

export function V2InProgressOtherUser({ setView, applicationCancelled, isExistingUser }: Props) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-IP" name="In Progress — Started by Another User (V2)" />

      {/* Header */}
      <div className="border-b border-[#E8E9EB] h-16 flex items-center justify-between px-10 shrink-0">
        <div className="flex flex-col leading-none">
          <span className="font-black text-2xl text-[#F26522]">ACV</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
        </div>
        <div className="flex items-center gap-4">
          {isExistingUser && (
            <button className="text-sm text-[#55575C] cursor-pointer hover:underline">Logout</button>
          )}
          <button className="border border-[#004E7D] text-[#004E7D] text-sm rounded-md px-4 py-2 hover:bg-[#F0F6FF] cursor-pointer">
            Save & Browse ACV
          </button>
          <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">
            ← Lobby
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 pt-10 pb-16">
        <h2 className="font-bold text-2xl text-[#0E0E0F] mb-1">Register Dealership</h2>
        <p className="text-sm text-[#55575C] mb-1">
          Your AuctionAccess account is linked to {isExistingUser ? '2 dealerships' : '1 dealership'}.
        </p>
        <p className="text-sm text-[#55575C] mb-6">Please choose a dealership to continue</p>

        {/* Post-cancel success banner */}
        {applicationCancelled && (
          <div className="bg-[#ECFDF5] border border-[#00A576] rounded-xl px-5 py-3 mb-5 flex items-center gap-3">
            <span className="text-[#00A576] font-bold">✓</span>
            <p className="text-sm text-[#065F46]">
              The previous application has been cancelled by your registration specialist. You can now start fresh.
            </p>
          </div>
        )}

        {/* ── V2-IP1 (existing user) ── */}
        {isExistingUser && (
          <>
            {!applicationCancelled && (
              <>
                <p className="text-sm text-[#55575C] mb-3">
                  These dealerships are already on ACV. Look for the Joined status to see where you're already active.
                </p>
                <div className="border border-[#E8E9EB] rounded-xl px-5 py-4 flex items-center justify-between bg-[#F9FAFB] mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-[15px] text-[#8D9199]">Speed Auto Group</span>
                      <span className="bg-[#ECFDF5] text-[#00A576] text-xs font-medium rounded px-2 py-0.5">Registered</span>
                      <span className="bg-[#EFF6FF] text-[#0077D8] text-xs font-medium rounded px-2 py-0.5">Joined</span>
                    </div>
                    <span className="text-sm text-[#8D9199]">Albany, New York</span>
                  </div>
                  <span className="text-xs text-[#8D9199] italic shrink-0 ml-4">You're already active here</span>
                </div>

                <p className="text-sm text-[#55575C] mb-3">
                  The following dealership has a registration in progress that was started by another user.
                </p>
              </>
            )}

            {/* In Progress card */}
            <div className="border border-[#E8E9EB] rounded-xl px-5 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-[15px] text-[#0E0E0F]">Metro Ford of Albany</span>
                  {applicationCancelled
                    ? <span className="bg-[#EBF5FF] text-[#0061A5] text-xs font-medium rounded px-2 py-0.5">Not started</span>
                    : <span className="bg-[#FFF7ED] text-[#C2410C] text-xs font-medium rounded px-2 py-0.5">In progress</span>
                  }
                </div>
                <span className="text-sm text-[#55575C]">Albany, Idaho</span>
              </div>
              <button
                onClick={() => applicationCancelled ? setView('v2-sf-interstitial-1') : setView('cancel-in-progress')}
                className={`text-sm font-semibold cursor-pointer hover:underline flex items-center gap-1 shrink-0 ml-4 ${applicationCancelled ? 'text-[#004E7D]' : 'text-[#DC2626]'}`}
              >
                {applicationCancelled ? 'Start Registration ›' : 'Cancel ›'}
              </button>
            </div>
          </>
        )}

        {/* ── V2-IP2 (net-new user) ── */}
        {!isExistingUser && (
          <>
            <p className="text-sm text-[#55575C] mb-3">
              {applicationCancelled
                ? 'The previous application has been cancelled. You can now start fresh.'
                : 'The following dealership has a registration already in progress that was started by another user.'}
            </p>

            <div className="border border-[#E8E9EB] rounded-xl px-5 py-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-[15px] text-[#0E0E0F]">Metro Ford of Albany</span>
                  {applicationCancelled
                    ? <span className="bg-[#EBF5FF] text-[#0061A5] text-xs font-medium rounded px-2 py-0.5">Not started</span>
                    : <span className="bg-[#FFF7ED] text-[#C2410C] text-xs font-medium rounded px-2 py-0.5">In progress</span>
                  }
                </div>
                <span className="text-sm text-[#55575C]">Albany, Idaho</span>
              </div>
              <button
                onClick={() => applicationCancelled ? setView('v2-sf-interstitial-1') : setView('cancel-in-progress')}
                className={`text-sm font-semibold cursor-pointer hover:underline flex items-center gap-1 shrink-0 ml-4 ${applicationCancelled ? 'text-[#004E7D]' : 'text-[#DC2626]'}`}
              >
                {applicationCancelled ? 'Start Registration ›' : 'Cancel ›'}
              </button>
            </div>
          </>
        )}
      </div>

      <div className="mt-auto px-10 py-5 flex justify-between text-xs text-[#8D9199] border-t border-[#E8E9EB]">
        <span>© 2021 ACV Auctions, Inc. All rights reserved.</span>
        <div className="flex gap-6">
          <span className="text-[#004E7D] cursor-pointer hover:underline">Terms of Service</span>
          <span className="text-[#004E7D] cursor-pointer hover:underline">Privacy Policy</span>
        </div>
      </div>
    </div>
  )
}
