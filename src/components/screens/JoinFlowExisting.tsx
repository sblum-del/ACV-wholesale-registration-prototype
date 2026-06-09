import { useState } from 'react'
import type { View } from '../../types'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  isLoggedIn?: boolean
  onLogout?: () => void
}

export function JoinFlowExisting({ setView, onLogout }: Props) {
  const [joinedId, setJoinedId] = useState<string | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleJoin = () => {
    setJoinedId('d-8b-2')
    setShowConfirm(true)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="JOIN-2" name="Join Flow — Existing User" />
      {/* Header */}
      <div className="border-b border-[#E8E9EB] h-16 flex items-center justify-between px-10 shrink-0">
        <div className="flex flex-col leading-none">
          <span className="font-black text-2xl text-[#F26522]">ACV</span>
          <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onLogout} className="text-sm text-[#55575C] cursor-pointer hover:underline">
            Logout
          </button>
          <button className="border border-[#004E7D] text-[#004E7D] text-sm rounded-md px-4 py-2 hover:bg-[#F0F6FF] transition-colors cursor-pointer">
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
          Your AuctionAccess account is linked to 2 dealerships.
        </p>
        <p className="text-sm text-[#55575C] mb-6">Please choose a dealership to continue</p>

        {/* Existing process callout */}
        <div className="bg-[#EFF6FF] border border-[#BFD9F7] rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
          <span className="text-[#0077D8] text-lg shrink-0 mt-0.5">ℹ️</span>
          <div>
            <p className="text-sm font-semibold text-[#004E7D] mb-1">These dealerships are already registered on ACV</p>
            <p className="text-sm text-[#004E7D] leading-relaxed">
              The <strong>Join</strong> process is not new functionality — it already exists in ACV today. Joining affiliates your contact record to an existing dealership account without creating a new Application or registration flow.
            </p>
          </div>
        </div>

        <p className="text-sm text-[#55575C] mb-3">
          These dealerships are already on ACV. Join to get access, or look for the Joined status to see where you're already active.
        </p>

        <div className="space-y-3">

          {/* Registered + Joined — already active, greyed, no action */}
          <div className="border border-[#E8E9EB] rounded-xl px-5 py-4 flex items-center justify-between bg-[#F9FAFB]">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-semibold text-[15px] text-[#8D9199]">Speed Auto Group</span>
                <span className="bg-[#ECFDF5] text-[#00A576] text-xs font-medium rounded px-2 py-0.5">Registered</span>
                <span className="bg-[#EFF6FF] text-[#0077D8] text-xs font-medium rounded px-2 py-0.5">Joined</span>
              </div>
              <span className="text-sm text-[#8D9199]">Albany, New York</span>
            </div>
            <span className="text-xs text-[#8D9199] italic">You're already active here</span>
          </div>

          {/* Registered — can join */}
          <div className={`border-2 rounded-xl px-5 py-4 flex items-center justify-between transition-all
            ${joinedId === 'd-8b-2' ? 'border-[#00A576] bg-[#ECFDF5]' : 'border-[#E8E9EB] bg-white'}`}>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`font-semibold text-[15px] ${joinedId === 'd-8b-2' ? 'text-[#065F46]' : 'text-[#0E0E0F]'}`}>
                  Valley View Auto Sales
                </span>
                <span className="bg-[#ECFDF5] text-[#00A576] text-xs font-medium rounded px-2 py-0.5">Registered</span>
                {joinedId === 'd-8b-2' && (
                  <span className="bg-[#0077D8] text-white text-xs font-medium rounded px-2 py-0.5">Joined ✓</span>
                )}
              </div>
              <span className={`text-sm ${joinedId === 'd-8b-2' ? 'text-[#065F46]' : 'text-[#55575C]'}`}>
                Albany, New York
              </span>
            </div>
            {joinedId !== 'd-8b-2' ? (
              <button
                onClick={handleJoin}
                className="text-sm font-semibold text-[#004E7D] cursor-pointer hover:underline flex items-center gap-1"
              >
                Join <span className="text-base">›</span>
              </button>
            ) : (
              <span className="text-sm font-semibold text-[#00A576]">✓ Joined</span>
            )}
          </div>
        </div>

        {/* Confirmation panel */}
        {showConfirm && (
          <div className="mt-6 bg-[#ECFDF5] border border-[#00A576] rounded-xl p-5">
            <p className="font-semibold text-sm text-[#065F46] mb-2">✓ You've joined Valley View Auto Sales</p>
            <p className="text-sm text-[#55575C] leading-relaxed mb-4">
              A new <strong>Affiliation record</strong> has been created in Salesforce linking your existing contact to this dealership account. No new Application record is needed.
            </p>
            <div className="bg-white border border-[#E8E9EB] rounded-lg p-3 mb-4 text-xs text-[#55575C] space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[#00A576]">✦</span>
                <span>Affiliation record created — existing Contact ↔ Valley View Auto Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0077D8]">✦</span>
                <span>No new Account, Application, or DocuSign triggered — existing process</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#0077D8]">✦</span>
                <span>Access granted based on existing dealership account permissions</span>
              </div>
            </div>
            <button
              onClick={() => setView('success')}
              className="text-sm font-semibold text-white rounded-full px-8 py-3 cursor-pointer hover:opacity-90"
              style={{ background: 'linear-gradient(160deg, #F26522 14%, #FC4243 86%)' }}
            >
              Browse the Marketplace →
            </button>
          </div>
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
