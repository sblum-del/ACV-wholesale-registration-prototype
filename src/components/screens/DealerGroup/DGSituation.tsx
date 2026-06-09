import type { View } from '../../../types'
import { PrimaryButton } from '../../shared/PrimaryButton'
import { ScreenLabel } from '../../shared/ScreenLabel'

interface Props {
  setView: (v: View) => void
  dgSituation: 'net-new' | 'existing' | null
  setDGSituation: (s: 'net-new' | 'existing') => void
}

export function DGSituation({ setView, setDGSituation }: Props) {
  const handleSelect = (situation: 'net-new' | 'existing') => {
    setDGSituation(situation)
    setView('dg-select-rooftops')
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col">
      <ScreenLabel id="DG-6" name="Dealer Group — Select Situation" />
      <div className="bg-white border-b border-[#E8E9EB] h-20 flex items-center justify-between px-10 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex flex-col leading-none">
            <span className="font-black text-2xl text-[#F26522]">ACV</span>
            <span className="text-[9px] tracking-[0.25em] uppercase text-[#F26522] font-semibold">Auctions</span>
          </div>
          <span className="bg-[#0C2340] text-white text-[10px] font-semibold rounded px-2 py-1 uppercase tracking-wide">
            Dealer Group — Group One Automotive
          </span>
        </div>
        <button onClick={() => setView('lobby')} className="text-xs text-[#55575C] border border-[#D1D3D6] rounded-md px-3 py-1.5 hover:bg-[#F7F7F8] cursor-pointer">
          ← Lobby
        </button>
      </div>

      {/* NOT CUSTOMER FACING banner */}
      <div className="bg-[#FFF0F0] border-b border-[#FCA5A5] px-10 py-2 flex items-center gap-2">
        <span className="text-red-600 font-bold text-xs uppercase tracking-wide">⚠️ NOT CUSTOMER FACING</span>
        <span className="text-red-600 text-xs">— Internal stakeholder testing only</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full text-center mb-10">
          <h2 className="font-bold text-3xl text-[#0E0E0F]">Select your scenario</h2>
          <p className="text-[#55575C] text-base mt-2">
            Choose the path that matches Group One Automotive's situation.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Net-new */}
          <div className="bg-white border-2 border-[#E8E9EB] rounded-2xl p-8 flex flex-col hover:border-[#0077D8] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-2xl mb-5">🆕</div>
            <p className="font-bold text-base text-[#0E0E0F] mb-2">Net-New Dealer Group</p>
            <p className="text-sm text-[#55575C] leading-relaxed flex-1">
              Group One Automotive has no rooftops currently registered with ACV. All locations are available to register.
            </p>
            <div className="mt-4 text-xs text-[#55575C] bg-[#F7F7F8] rounded-lg p-3">
              <strong>SF note:</strong> Parent Dealer Group account record must be created manually by Janelle's team before child accounts can be configured.
            </div>
            <PrimaryButton onClick={() => handleSelect('net-new')} className="mt-5 w-full justify-center">
              Start →
            </PrimaryButton>
          </div>

          {/* Existing */}
          <div className="bg-white border-2 border-[#E8E9EB] rounded-2xl p-8 flex flex-col hover:border-[#F26522] hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-full bg-[#FFF3ED] flex items-center justify-center text-2xl mb-5">🏢</div>
            <p className="font-bold text-base text-[#0E0E0F] mb-2">Existing Group — Adding Rooftops</p>
            <p className="text-sm text-[#55575C] leading-relaxed flex-1">
              Group One Automotive already has some rooftops registered with ACV and is expanding. Some locations are already active.
            </p>
            <div className="mt-4 text-xs text-[#55575C] bg-[#F7F7F8] rounded-lg p-3">
              <strong>SF note:</strong> Janelle's team must configure new rooftops within the existing parent-child account structure.
            </div>
            <PrimaryButton onClick={() => handleSelect('existing')} className="mt-5 w-full justify-center">
              Start →
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  )
}
