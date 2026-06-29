import { useState } from 'react'
import type { View, ActiveScenario } from '../../types'
import { ACVHeader } from '../shared/ACVHeader'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  setLoggedIn: (b: boolean) => void
  onLobby?: () => void
  activeScenario?: ActiveScenario
}

export function MFACodeEntry({ setView, setLoggedIn, onLobby, activeScenario }: Props) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [verified, setVerified] = useState(false)

  const existingUserScenarios = ['s9', 's8b', 'r1', 'r2', 'r3', 'r4', 'r5', 'r6']
  const isExistingUser = existingUserScenarios.includes(activeScenario ?? '')

  const handleVerify = () => {
    if (code.length === 6) {
      setError(false)
      setVerified(true)
      if (isExistingUser) setLoggedIn(true)
    } else {
      setError(true)
    }
  }

  const getNextView = (): View => {
    if (isExistingUser) return 'existing-user-login'
    if (activeScenario === 's8') return 'join-flow'
    if (activeScenario === 'v2-base') return 'v2-create-credentials'
    // r6n = net-new user, must create credentials before seeing in-progress screen
    return 'create-credentials'
  }

  const handleResend = () => {
    setCode('')
    setError(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="AUTH-5" name="Enter Email Verification Code" />
      <ACVHeader onLobby={onLobby} />
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
              <p className="font-semibold text-[#0E0E0F] mt-1">jharlow@metrofordalbany.com</p>
              <p className="text-sm text-[#55575C] mt-1">Enter the code below to continue.</p>

              {/* Code input */}
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
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                />
                {error && (
                  <p className="text-xs text-[#E53E3E] mt-2">Please enter a valid 6-digit code</p>
                )}
              </div>

              {/* Hint for prototype */}
              <p className="text-xs text-[#8D9199] mt-3">
                For this prototype, enter any 6 digits (e.g. 123456)
              </p>

              <PrimaryButton
                onClick={handleVerify}
                disabled={code.length < 6}
                className="w-full justify-center mt-6"
              >
                Verify Code
              </PrimaryButton>

              <button
                onClick={handleResend}
                className="mt-4 text-sm text-[#004E7D] cursor-pointer hover:underline block mx-auto"
              >
                Didn't receive a code? Resend
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-[#00A576]">✓</span>
              </div>
              <h2 className="font-bold text-2xl text-[#0E0E0F]">Identity Verified!</h2>
              <p className="text-sm text-[#55575C] mt-3 mb-2">
                {isExistingUser
                  ? 'We found an existing ACV account linked to this AuctionAccess ID. Please sign in to continue.'
                  : 'Your AuctionAccess identity has been confirmed. Let\'s set up your ACV login credentials.'}
              </p>
              {!isExistingUser && (
                <p className="text-xs text-[#8D9199] mb-8">
                  This is your first time registering with ACV.
                </p>
              )}
              {isExistingUser && <div className="mb-8" />}
              <PrimaryButton
                onClick={() => setView(getNextView())}
                className="w-full justify-center"
              >
                {isExistingUser ? 'Sign In to ACV →' : 'Create ACV Login →'}
              </PrimaryButton>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
