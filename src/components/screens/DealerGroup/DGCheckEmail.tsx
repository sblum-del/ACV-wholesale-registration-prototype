import { useState } from 'react'
import type { View } from '../../../types'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
}

export function DGCheckEmail({ setView }: Props) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [verified, setVerified] = useState(false)

  const handleVerify = () => {
    if (code.length === 6) {
      setError(false)
      setVerified(true)
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="DG-4" name="Dealer Group — Verify Email" />
      {/* Header */}
      <div className="bg-white border-b border-[#E8E9EB] h-20 flex items-center justify-between px-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl text-[#F26522]">ACV</span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
          </div>
          <span className="bg-[#0C2340] text-white text-[10px] font-semibold rounded px-2 py-1 uppercase tracking-wide">
            Dealer Group
          </span>
        </div>
        <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">
          ← Lobby
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl border border-[#E8E9EB] shadow-sm max-w-md w-full p-10 text-center">

          {!verified ? (
            <>
              <div className="w-16 h-16 rounded-full bg-[#DBEAFE] flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🔐</span>
              </div>
              <h2 className="font-bold text-2xl text-[#0E0E0F]">Verify your email</h2>
              <p className="text-sm text-[#55575C] mt-3">
                We sent a 6-digit confirmation code to:
              </p>
              <p className="font-semibold text-[#0E0E0F] mt-1">corporate@grouponeauto.com</p>
              <p className="text-sm text-[#55575C] mt-1">Enter the code below to continue.</p>

              <div className="mt-7">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={e => {
                    setError(false)
                    setCode(e.target.value.replace(/\D/g, '').slice(0, 6))
                  }}
                  placeholder="— — — — — —"
                  className={`w-full text-center text-3xl font-bold tracking-[0.5em] border-2 rounded-xl py-4 px-6 outline-none transition-colors
                    ${error ? 'border-[#E53E3E] bg-[#FFF0F0]' : code.length > 0 ? 'border-[#0077D8] bg-[#EFF6FF]' : 'border-[#E8E9EB] bg-[#FAFAFA]'}`}
                />
                {error && <p className="text-xs text-[#E53E3E] mt-2">Please enter a valid 6-digit code</p>}
              </div>

              <p className="text-xs text-[#8D9199] mt-3">For this prototype, enter any 6 digits (e.g. 123456)</p>

              <PrimaryButton onClick={handleVerify} disabled={code.length < 6} className="w-full justify-center mt-6">
                Verify Code
              </PrimaryButton>

              <button onClick={() => setCode('')} className="mt-4 text-sm text-[#004E7D] cursor-pointer hover:underline block mx-auto">
                Didn't receive a code? Resend
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-[#00A576]">✓</span>
              </div>
              <h2 className="font-bold text-2xl text-[#0E0E0F]">Email verified!</h2>
              <p className="text-sm text-[#55575C] mt-3 mb-8">
                Your account is confirmed. Continue to select your rooftops.
              </p>
              <PrimaryButton onClick={() => setView('dg-situation')} className="w-full justify-center">
                Continue →
              </PrimaryButton>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
