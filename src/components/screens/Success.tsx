import type { View } from '../../types'
import { PrimaryButton } from '../shared/PrimaryButton'
import { ACVHeader } from '../shared/ACVHeader'
import { ScreenLabel } from '../shared/ScreenLabel'

interface Props { setView: (v: View) => void; isLoggedIn?: boolean; onLogout?: () => void }

export function Success({ setView, isLoggedIn, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-[#F0FDF4] flex flex-col">
      <ScreenLabel id="REG-13" name="Registration Complete" />
      <ACVHeader onLobby={() => setView('lobby')} isLoggedIn={isLoggedIn} onLogout={onLogout} />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="bg-white rounded-2xl border-2 border-[#00A576] max-w-xl w-full p-12 text-center shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#00A576] flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-4xl font-bold">✓</span>
          </div>
          <h1 className="font-bold text-3xl text-[#0E0E0F]">Registration Complete!</h1>
          <p className="text-[#55575C] mt-3">Welcome to ACV, Metro Ford of Albany!</p>
          <p className="text-sm text-[#55575C] mt-3 leading-relaxed max-w-sm mx-auto">
            Your registration is now in review. You have read-only access to the marketplace while your account is being finalized.
            Mike Ziewicki will be in touch to confirm your demo on Jun 10.
          </p>
          <div className="mt-8">
            <PrimaryButton className="w-full justify-center">
              Browse the Marketplace →
            </PrimaryButton>
          </div>
          <button
            onClick={() => setView('lobby')}
            className="text-sm text-[#004E7D] mt-4 cursor-pointer hover:underline block mx-auto"
          >
            ← Return to Lobby
          </button>
        </div>
      </div>
    </div>
  )
}
