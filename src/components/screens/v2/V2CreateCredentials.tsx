import { useState } from 'react'
import type { View, ActiveScenario } from '../../../types'
import { MaterialField } from '../../shared/MaterialField'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  onLobby?: () => void
  activeScenario?: ActiveScenario
}

export function V2CreateCredentials({ setView, onLobby, activeScenario }: Props) {
  const [email, setEmail] = useState('jharlow@metrofordalbany.com')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const canContinue = password.length >= 1

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <ScreenLabel id="V2-AUTH-3" name="Create ACV Login Credentials" />
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

      <div className="flex-1 flex flex-col justify-center items-center px-6">
        <div className="max-w-lg w-full">
          <h2 className="font-bold text-3xl text-[#0E0E0F]">Create your ACV login</h2>
          <p className="text-sm text-[#55575C] mt-2 mb-6">
            Your identity has been verified. Set up your ACV login credentials to complete account creation.
          </p>

          <div className="bg-[#EFF6FF] border border-[#BFD9F7] rounded-lg p-3 flex items-start gap-2 mb-6">
            <span className="shrink-0 mt-0.5">💡</span>
            <span className="text-sm text-[#004E7D]">
              Your email address has been pre-populated from your AuctionAccess record. You can update it here if needed — this will be your ACV login email.
            </span>
          </div>

          <div className="space-y-6">
            <MaterialField label="Email Address" value={email} onChange={setEmail} />
            <MaterialField label="Password" type="password" value={password} onChange={setPassword} />
            <MaterialField label="Confirm Password" type="password" value={confirm} onChange={setConfirm} />
          </div>

          <div className="mt-5 bg-[#FFFBEB] border border-[#FDE68A] rounded-lg p-3 flex items-start gap-2">
            <span className="shrink-0 mt-0.5 text-[#92400E]">⚠</span>
            <span className="text-sm text-[#92400E]">
              Do not share these credentials with anyone.
            </span>
          </div>

          <div className="flex justify-end gap-6 items-center mt-8">
            <button onClick={() => setView('aa-validation')} className="text-[#004E7D] text-sm font-medium cursor-pointer hover:underline">
              Back
            </button>
            <PrimaryButton
              disabled={!canContinue}
              onClick={() => setView(activeScenario === 'v2-ip2' ? 'v2-in-progress-other-user' : 'v2-select-dealership')}
            >
              Continue →
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
