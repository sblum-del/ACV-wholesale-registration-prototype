import { useState } from 'react'
import type { View, ActiveScenario } from '../../types'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  setLoggedIn: (b: boolean) => void
  onLobby?: () => void
  activeScenario?: ActiveScenario
}

export function ExistingUserLogin({ setView, setLoggedIn, onLobby, activeScenario }: Props) {
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)

  const handleSignIn = () => {
    setLoggedIn(true)
    if (activeScenario === 's8b') {
      setView('join-flow-existing')
    } else if (activeScenario === 'r6') {
      // r6 = existing user sees in-progress app started by someone else
      setView('in-progress-other-user')
    } else if (['r1','r2','r3','r4','r5'].includes(activeScenario ?? '')) {
      setView('resume-5m-select')
    } else {
      setView('existing-select-dealership')
    }
  }

  return (
    <div className="flex h-screen">
      <ScreenLabel id="AUTH-7" name="Existing User — Sign In" />
      {/* Left panel */}
      <div className="w-1/2 bg-white flex flex-col">
        <div className="h-20 px-10 flex items-center justify-between border-b border-[#E8E9EB] shrink-0">
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl text-[#F26522]">ACV</span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
          </div>
          {onLobby && (
            <button onClick={onLobby} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] transition-colors cursor-pointer">
              ← Lobby
            </button>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-center px-[125px]">
          <h2 className="font-bold text-2xl text-[#0E0E0F] mb-2">Welcome back</h2>
          <p className="text-sm text-[#55575C] mb-8">
            An account with this email exists. Please sign in to continue.
          </p>

          <div className="space-y-5">
            {/* Email — pre-filled, read-only */}
            <div className="relative bg-[#FAFAFA] border-b-2 border-[#E0E0E0] rounded-t-sm">
              <label className="absolute left-3 top-1 text-xs text-[#0077D8]">
                Email Address (Pre-filled from AuctionAccess)
              </label>
              <div className="pt-6 pb-2 px-3 text-sm text-[#0E0E0F]">
                jharlow@metrofordalbany.com
              </div>
            </div>

            {/* Password */}
            <div className="relative bg-[#FAFAFA] border-b-2 border-[#E0E0E0] focus-within:border-[#0077D8] rounded-t-sm transition-colors">
              <label className={`absolute left-3 transition-all duration-150 pointer-events-none text-[#545454] ${password ? 'top-1 text-xs text-[#0077D8]' : 'top-3.5 text-base'}`}>
                Password
              </label>
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-transparent pt-6 pb-2 px-3 text-sm text-[#0E0E0F] outline-none pr-10"
              />
              <button
                onClick={() => setShowPw(v => !v)}
                className="absolute right-3 top-4 text-[#8D9199] cursor-pointer hover:text-[#55575C] text-base"
              >
                {showPw ? '🙈' : '👁'}
              </button>
            </div>
          </div>

          <button className="text-sm text-[#004E7D] mt-3 text-left cursor-pointer hover:underline w-fit">
            Forgot password?
          </button>

          <div className="flex justify-end gap-6 items-center mt-8">
            <button onClick={() => setView('aa-validation')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton onClick={handleSignIn} disabled={!password}>
              Sign In
            </PrimaryButton>
          </div>
        </div>

        <div className="px-10 py-5 flex justify-between text-xs text-[#8D9199] shrink-0">
          <span>© 2021 ACV Auctions, Inc. All rights reserved.</span>
          <span>Need Assistance? <span className="text-[#004E7D]">1-800-553-4070</span></span>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-1/2 bg-[#121212] flex flex-col justify-center px-16">
        <h1 className="font-black text-6xl text-white tracking-tight leading-none">SIGN UP<br />TODAY</h1>
        <p className="text-xl text-[#999] mt-6 max-w-sm leading-relaxed">
          Register today to start bidding and winning used car auctions
        </p>
      </div>
    </div>
  )
}
